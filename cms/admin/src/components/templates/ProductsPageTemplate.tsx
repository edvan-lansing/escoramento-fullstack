"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminLayout from "@/src/layouts/AdminLayout";
import AuthGuard from "@/src/components/organisms/AuthGuard";
import ProductForm, { type ProductFormValues } from "@/src/components/organisms/ProductForm";
import CarouselForm, { type CarouselFormValues } from "@/src/components/organisms/CarouselForm";
import {
  activateProduct,
  createProduct,
  deactivateProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/src/services/products/product.service";
import {
  activateCarouselItem,
  createCarouselItem,
  deactivateCarouselItem,
  deleteCarouselItem,
  getCarouselItems,
  updateCarouselItem,
} from "@/src/services/carousels/carousel.service";
import type { Product, ProductPayload } from "@/src/types/product";
import type { CarouselItem, CarouselPayload } from "@/src/types/carousel";
import { getApiErrorMessage } from "@/src/utils/api-error";
import { getCurrentUser, setAuthSession, type UserRole } from "@/src/utils/auth";
import apiClient from "@/src/services/api/client";

type LoginResponse = {
  token: string;
  user?: {
    id?: string;
    email?: string;
    role?: UserRole;
  };
};

const toProductPayload = (values: ProductFormValues): ProductPayload => ({
  displayOrder: Number(values.displayOrder),
  category: values.category || undefined,
  image: values.image,
  imageFile: values.imageFile,
  title: values.title,
  description: values.description,
  priceFrom: values.priceFrom.trim(),
  ctaLabel: values.ctaLabel,
  ctaLink: values.ctaLink,
});

const toCarouselPayload = (values: CarouselFormValues): CarouselPayload => ({
  displayOrder: Number(values.displayOrder),
  title: values.title.trim(),
  subtitle: values.subtitle.trim(),
  description: values.description.trim(),
  ctaLabel: values.ctaLabel.trim(),
  ctaLink: values.ctaLink.trim(),
  image: values.image,
  imageFile: values.imageFile,
});

const ProductsPageTemplate = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCarousel, setLoadingCarousel] = useState(true);
  const [submittingProduct, setSubmittingProduct] = useState(false);
  const [submittingCarousel, setSubmittingCarousel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSwitchUserOpen, setIsSwitchUserOpen] = useState(false);
  const [switchEmail, setSwitchEmail] = useState("");
  const [switchPassword, setSwitchPassword] = useState("");
  const [switchUserError, setSwitchUserError] = useState<string | null>(null);
  const [switchUserLoading, setSwitchUserLoading] = useState(false);

  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCarouselFormOpen, setIsCarouselFormOpen] = useState(false);
  const [selectedCarouselItem, setSelectedCarouselItem] = useState<CarouselItem | null>(null);

  const productFormInitialValues = useMemo<Partial<ProductFormValues>>(() => {
    if (!selectedProduct) return {};

    return {
      displayOrder: String(selectedProduct.displayOrder ?? 0),
      category: (selectedProduct.category as "estaca" | "blindagem" | "") ?? "",
      image: selectedProduct.image ?? "",
      title: selectedProduct.title,
      description: selectedProduct.description ?? "",
      priceFrom: selectedProduct.priceFrom ?? "",
      imageFile: null,
      ctaLabel: selectedProduct.ctaLabel ?? "",
      ctaLink: selectedProduct.ctaLink ?? "",
    };
  }, [selectedProduct]);

  const carouselFormInitialValues = useMemo<Partial<CarouselFormValues>>(() => {
    if (!selectedCarouselItem) return {};

    return {
      displayOrder: String(selectedCarouselItem.displayOrder ?? 0),
      title: selectedCarouselItem.title,
      subtitle: selectedCarouselItem.subtitle ?? "",
      description: selectedCarouselItem.description ?? "",
      ctaLabel: selectedCarouselItem.ctaLabel ?? "",
      ctaLink: selectedCarouselItem.ctaLink ?? "",
      image: selectedCarouselItem.image ?? "",
      imageFile: null,
    };
  }, [selectedCarouselItem]);

  const fetchProducts = async () => {
    setLoadingProducts(true);

    try {
      const response = await getProducts();
      setProducts(response);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchCarouselItems = async () => {
    setLoadingCarousel(true);

    try {
      const response = await getCarouselItems();
      setCarouselItems(response);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoadingCarousel(false);
    }
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUserRole(currentUser?.role ?? null);
    setSwitchEmail(currentUser?.email ?? "");

    void Promise.all([fetchProducts(), fetchCarouselItems()]);
  }, []);

  const canCreateAndEdit = userRole === "admin" || userRole === "editor" || userRole === "manager";
  const canEditOrder = userRole === "admin" || userRole === "manager";
  // const canDelete = userRole === "admin" || userRole === "manager"; 
  // Only admin can delete, but manager can deactivate instead.
  // This is because deactivation also hides the item from the frontend,
  // achieving the same result as deletion without actually removing data from the system.
  const canDelete = userRole === "admin";
  const canDeactivate = userRole === "admin" || userRole === "manager";

  const openCreateProductDialog = () => {
    if (!canCreateAndEdit) {
      setError("You do not have permission to create products.");
      return;
    }

    setSelectedProduct(null);
    setIsProductFormOpen(true);
  };

  const openEditProductDialog = (product: Product) => {
    if (!canCreateAndEdit) {
      setError("You do not have permission to edit products.");
      return;
    }

    setSelectedProduct(product);
    setIsProductFormOpen(true);
  };

  const closeProductFormDialog = () => {
    if (submittingProduct) return;
    setIsProductFormOpen(false);
    setSelectedProduct(null);
  };

  const handleProductSubmit = async (values: ProductFormValues) => {
    setSubmittingProduct(true);
    setError(null);

    try {
      const payload = toProductPayload(values);

      if (!canEditOrder) {
        delete payload.displayOrder;
      }

      if (selectedProduct) {
        await updateProduct(selectedProduct._id, payload);
      } else {
        await createProduct(payload);
      }

      closeProductFormDialog();
      await fetchProducts();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setSubmittingProduct(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!canDelete) {
      setError("You do not have permission to delete products.");
      return;
    }

    setError(null);

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleToggleProductActive = async (product: Product) => {
    if (!canDeactivate) {
      setError("Only administrator can deactivate or activate products.");
      return;
    }

    setError(null);

    try {
      const isActive = product.isActive !== false;

      if (isActive) {
        await deactivateProduct(product._id);
      } else {
        await activateProduct(product._id);
      }

      await fetchProducts();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const openCreateCarouselDialog = () => {
    if (!canCreateAndEdit) {
      setError("You do not have permission to create carousel items.");
      return;
    }

    setSelectedCarouselItem(null);
    setIsCarouselFormOpen(true);
  };

  const openEditCarouselDialog = (item: CarouselItem) => {
    if (!canCreateAndEdit) {
      setError("You do not have permission to edit carousel items.");
      return;
    }

    setSelectedCarouselItem(item);
    setIsCarouselFormOpen(true);
  };

  const closeCarouselFormDialog = () => {
    if (submittingCarousel) return;
    setIsCarouselFormOpen(false);
    setSelectedCarouselItem(null);
  };

  const handleCarouselSubmit = async (values: CarouselFormValues) => {
    setSubmittingCarousel(true);
    setError(null);

    try {
      const payload = toCarouselPayload(values);

      if (!canEditOrder) {
        delete payload.displayOrder;
      }

      if (selectedCarouselItem) {
        await updateCarouselItem(selectedCarouselItem._id, payload);
      } else {
        await createCarouselItem(payload);
      }

      closeCarouselFormDialog();
      await fetchCarouselItems();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setSubmittingCarousel(false);
    }
  };

  const handleToggleCarouselActive = async (item: CarouselItem) => {
    if (!canDeactivate) {
      setError("Only administrator can deactivate or activate carousel items.");
      return;
    }

    setError(null);

    try {
      const isActive = item.isActive !== false;

      if (isActive) {
        await deactivateCarouselItem(item._id);
      } else {
        await activateCarouselItem(item._id);
      }

      await fetchCarouselItems();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleDeleteCarouselItem = async (id: string) => {
    if (!canDelete) {
      setError("You do not have permission to delete carousel items.");
      return;
    }

    setError(null);

    try {
      await deleteCarouselItem(id);
      setCarouselItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  const handleSwitchUser = async () => {
    setSwitchUserLoading(true);
    setSwitchUserError(null);

    try {
      const response = await apiClient.post<LoginResponse>("/auth/login", {
        email: switchEmail,
        password: switchPassword,
      });

      setAuthSession(response.data.token, response.data.user);
      setUserRole(response.data.user?.role ?? null);
      setIsSwitchUserOpen(false);
      setSwitchPassword("");
      await Promise.all([fetchProducts(), fetchCarouselItems()]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setSwitchUserError(err.response?.data?.message || "Invalid email or password.");
      } else {
        setSwitchUserError("Unexpected error while trying to switch user.");
      }
    } finally {
      setSwitchUserLoading(false);
    }
  };

  const loading = loadingProducts || loadingCarousel;

  return (
    <AuthGuard>
      <AdminLayout onSwitchUserRequest={() => setIsSwitchUserOpen(true)}>
        <div className="space-y-8">
          {error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
          ) : null}

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-800" />
            </div>
          ) : (
            <>
              <section className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Product Management</h3>
                  <button
                    type="button"
                    onClick={openCreateProductDialog}
                    disabled={!canCreateAndEdit}
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Create New Product
                  </button>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-slate-700">
                      <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                          <th className="px-4 py-3">Order</th>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Image</th>
                          <th className="px-4 py-3">Title</th>
                          <th className="px-4 py-3">Description</th>
                          <th className="px-4 py-3">Price From</th>
                          <th className="px-4 py-3">CTA Label</th>
                          <th className="px-4 py-3">CTA Link</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="min-w-55 px-6 py-3 text-right">Actions</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {products.length === 0 ? (
                          <tr>
                            <td colSpan={10} className="px-4 py-10 text-center text-slate-500">
                              No products found
                            </td>
                          </tr>
                        ) : (
                          products.map((product) => (
                            <tr key={product._id} className="hover:bg-slate-50/70">
                              <td className="px-4 py-3 font-medium text-slate-900">{product.displayOrder ?? 0}</td>
                              <td className="px-4 py-3">{product.category || "-"}</td>
                              <td className="px-4 py-3">
                                {product.image ? (
                                  <a
                                    href={product.image}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sky-700 underline-offset-2 hover:underline"
                                  >
                                    View image
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </td>
                              <td className="px-4 py-3">{product.title}</td>
                              <td className="px-4 py-3">{product.description || "-"}</td>
                              <td className="px-4 py-3">{product.priceFrom || "-"}</td>
                              <td className="px-4 py-3">{product.ctaLabel || "-"}</td>
                              <td className="px-4 py-3">{product.ctaLink || "-"}</td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                    product.isActive !== false
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "bg-slate-200 text-slate-700"
                                  }`}
                                >
                                  {product.isActive !== false ? "Active" : "Inactive"}
                                </span>
                              </td>
                              <td className="px-6 py-3">
                                <div className="flex justify-end gap-2 whitespace-nowrap">
                                  <button
                                    type="button"
                                    onClick={() => openEditProductDialog(product)}
                                    disabled={!canCreateAndEdit}
                                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteProduct(product._id)}
                                    disabled={!canDelete}
                                    className="rounded-lg border border-rose-300 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    Delete
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleProductActive(product)}
                                    disabled={!canDeactivate}
                                    className="rounded-lg border border-amber-300 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    {product.isActive !== false ? "Deactivate" : "Activate"}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Carousel Management</h3>
                  <button
                    type="button"
                    onClick={openCreateCarouselDialog}
                    disabled={!canCreateAndEdit}
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Create New Carousel Item
                  </button>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-slate-700">
                      <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                          <th className="px-4 py-3">Order</th>
                          <th className="px-4 py-3">Image</th>
                          <th className="px-4 py-3">Title</th>
                          <th className="px-4 py-3">Subtitle</th>
                          <th className="px-4 py-3">Description</th>
                          <th className="px-4 py-3">CTA Label</th>
                          <th className="px-4 py-3">CTA Link</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="min-w-55 px-6 py-3 text-right">Actions</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {carouselItems.length === 0 ? (
                          <tr>
                            <td colSpan={9} className="px-4 py-10 text-center text-slate-500">
                              No carousel items found
                            </td>
                          </tr>
                        ) : (
                          carouselItems.map((item) => (
                            <tr key={item._id} className="hover:bg-slate-50/70">
                              <td className="px-4 py-3 font-medium text-slate-900">{item.displayOrder ?? 0}</td>
                              <td className="px-4 py-3">
                                {item.image ? (
                                  <a
                                    href={item.image}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sky-700 underline-offset-2 hover:underline"
                                  >
                                    View image
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </td>
                              <td className="px-4 py-3">{item.title}</td>
                              <td className="px-4 py-3">{item.subtitle || "-"}</td>
                              <td className="px-4 py-3">{item.description || "-"}</td>
                              <td className="px-4 py-3">{item.ctaLabel || "-"}</td>
                              <td className="px-4 py-3">{item.ctaLink || "-"}</td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                    item.isActive !== false
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "bg-slate-200 text-slate-700"
                                  }`}
                                >
                                  {item.isActive !== false ? "Active" : "Inactive"}
                                </span>
                              </td>
                              <td className="px-6 py-3">
                                <div className="flex justify-end gap-2 whitespace-nowrap">
                                  <button
                                    type="button"
                                    onClick={() => openEditCarouselDialog(item)}
                                    disabled={!canCreateAndEdit}
                                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteCarouselItem(item._id)}
                                    disabled={!canDelete}
                                    className="rounded-lg border border-rose-300 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    Delete
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleCarouselActive(item)}
                                    disabled={!canDeactivate}
                                    className="rounded-lg border border-amber-300 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    {item.isActive !== false ? "Deactivate" : "Activate"}
                                  </button>
                                  
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </>
          )}

          {isSwitchUserOpen ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
              <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Switch User</h3>
                  <button
                    type="button"
                    onClick={() => setIsSwitchUserOpen(false)}
                    className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
                  >
                    Close
                  </button>
                </div>

                <p className="mb-3 text-sm text-slate-600">Sign in with another user without leaving this page.</p>

                {switchUserError ? (
                  <div className="mb-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                    {switchUserError}
                  </div>
                ) : null}

                <div className="space-y-3">
                  <input
                    type="email"
                    value={switchEmail}
                    onChange={(event) => setSwitchEmail(event.target.value)}
                    autoComplete="email"
                    placeholder="Email"
                    className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500"
                  />

                  <input
                    type="password"
                    value={switchPassword}
                    onChange={(event) => setSwitchPassword(event.target.value)}
                    autoComplete="current-password"
                    placeholder="Password"
                    className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-slate-500"
                  />

                  <button
                    type="button"
                    onClick={handleSwitchUser}
                    disabled={switchUserLoading || !switchEmail || !switchPassword}
                    className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {switchUserLoading ? "Switching..." : "Switch User"}
                  </button>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-md border border-slate-300 px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-100"
                      onClick={() => {
                        setSwitchEmail("admin@email.com");
                      }}
                    >
                      Admin
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-slate-300 px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-100"
                      onClick={() => {
                        setSwitchEmail("editor@email.com");
                      }}
                    >
                      Editor
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-slate-300 px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-100"
                      onClick={() => {
                        setSwitchEmail("manager@email.com");
                      }}
                    >
                      Manager
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {isProductFormOpen ? (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 p-4"
            onClick={closeProductFormDialog}
            role="presentation"
          >
            <div
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedProduct ? "Edit Product" : "Create Product"}
                </h3>
                <button
                  type="button"
                  onClick={closeProductFormDialog}
                  className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
              </div>

              <ProductForm
                key={selectedProduct?._id ?? "new"}
                initialValues={productFormInitialValues}
                isSubmitting={submittingProduct}
                canEditOrder={canEditOrder}
                onSubmit={handleProductSubmit}
              />
            </div>
          </div>
        ) : null}

        {isCarouselFormOpen ? (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 p-4"
            onClick={closeCarouselFormDialog}
            role="presentation"
          >
            <div
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedCarouselItem ? "Edit Carousel Item" : "Create Carousel Item"}
                </h3>
                <button
                  type="button"
                  onClick={closeCarouselFormDialog}
                  className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
              </div>

              <CarouselForm
                key={selectedCarouselItem?._id ?? "new"}
                initialValues={carouselFormInitialValues}
                isSubmitting={submittingCarousel}
                canEditOrder={canEditOrder}
                onSubmit={handleCarouselSubmit}
              />
            </div>
          </div>
        ) : null}
      </AdminLayout>
    </AuthGuard>
  );
};

export default ProductsPageTemplate;
