"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminLayout from "@/src/layouts/AdminLayout";
import AuthGuard from "@/src/components/organisms/AuthGuard";
import ProductForm, { type ProductFormValues } from "@/src/components/organisms/ProductForm";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/src/services/products/product.service";
import type { Product, ProductPayload } from "@/src/types/product";
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

const toPayload = (values: ProductFormValues): ProductPayload => ({
  category: values.category || undefined,
  image: values.image,
  imageFile: values.imageFile,
  title: values.title,
  description: values.description,
  priceFrom: values.priceFrom.trim(),
  ctaLabel: values.ctaLabel,
  ctaLink: values.ctaLink,
});

const ProductsPageTemplate = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSwitchUserOpen, setIsSwitchUserOpen] = useState(false);
  const [switchEmail, setSwitchEmail] = useState("");
  const [switchPassword, setSwitchPassword] = useState("");
  const [switchUserError, setSwitchUserError] = useState<string | null>(null);
  const [switchUserLoading, setSwitchUserLoading] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const formInitialValues = useMemo<Partial<ProductFormValues>>(() => {
    if (!selectedProduct) return {};

    return {
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

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getProducts();
      setProducts(response);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUserRole(currentUser?.role ?? null);
    setSwitchEmail(currentUser?.email ?? "");
    void fetchProducts();
  }, []);

  const canCreateAndEdit = userRole === "admin" || userRole === "editor" || userRole === "manager";
  const canDelete = userRole === "admin" || userRole === "manager";

  const openCreateDialog = () => {
    if (!canCreateAndEdit) {
      setError("You do not have permission to create products.");
      return;
    }

    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const openEditDialog = (product: Product) => {
    if (!canCreateAndEdit) {
      setError("You do not have permission to edit products.");
      return;
    }

    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const closeFormDialog = () => {
    if (submitting) return;
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  const handleSubmit = async (values: ProductFormValues) => {
    setSubmitting(true);
    setError(null);

    try {
      const payload = toPayload(values);

      if (selectedProduct) {
        await updateProduct(selectedProduct._id, payload);
      } else {
        await createProduct(payload);
      }

      closeFormDialog();
      await fetchProducts();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
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

  return (
    <AuthGuard>
      <AdminLayout onSwitchUserRequest={() => setIsSwitchUserOpen(true)}>
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Product Management</h2>

            <button
              type="button"
              onClick={openCreateDialog}
              disabled={!canCreateAndEdit}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create New Product
            </button>
          </div>

          {error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
          ) : null}

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-800" />
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-slate-700">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Image</th>
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Price From</th>
                      <th className="px-4 py-3">CTA Label</th>
                      <th className="px-4 py-3">CTA Link</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                          No products found
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <tr key={product._id} className="hover:bg-slate-50/70">
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
                          <td className="px-4 py-3">{product.priceFrom || "-"}</td>
                          <td className="px-4 py-3">{product.ctaLabel || "-"}</td>
                          <td className="px-4 py-3">{product.ctaLink || "-"}</td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => openEditDialog(product)}
                                disabled={!canCreateAndEdit}
                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(product._id)}
                                disabled={!canDelete}
                                className="rounded-lg border border-rose-300 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {isSwitchUserOpen ? (
                <div className="absolute left-4 right-4 top-4 z-10 rounded-xl border border-slate-200 bg-white p-4 shadow-xl sm:left-auto sm:right-4 sm:w-80">
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

                  <p className="mb-3 text-sm text-slate-600">
                    Sign in with another user without leaving this page.
                  </p>

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
              ) : null}
            </div>
          )}
        </div>

        {isFormOpen ? (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 p-4"
            onClick={closeFormDialog}
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
                  onClick={closeFormDialog}
                  className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
              </div>

              <ProductForm
                key={selectedProduct?._id ?? "new"}
                initialValues={formInitialValues}
                isSubmitting={submitting}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        ) : null}
      </AdminLayout>
    </AuthGuard>
  );
};

export default ProductsPageTemplate;
