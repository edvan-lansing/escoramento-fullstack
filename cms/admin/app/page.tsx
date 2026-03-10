"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AdminLayout from "@/src/layouts/AdminLayout";
import AuthGuard from "@/src/components/AuthGuard";
import ProductForm, { type ProductFormValues } from "@/src/components/ProductForm";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/src/services/products/product.service";
import type { Product, ProductPayload } from "@/src/types/product";
import { getApiErrorMessage } from "@/src/utils/api-error";
import { getCurrentUserRole, type UserRole } from "@/src/utils/auth";

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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setUserRole(getCurrentUserRole());
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

  return (
    <AuthGuard>
      <AdminLayout>
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4" fontWeight={700}>
              Product Management
            </Typography>

            <Button variant="contained" onClick={openCreateDialog} disabled={!canCreateAndEdit}>
              Create New Product
            </Button>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Logged role: {userRole ?? "unknown"}
          </Typography>

          {error ? <Alert severity="error">{error}</Alert> : null}

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Price From</TableCell>
                    <TableCell>CTA Label</TableCell>
                    <TableCell>CTA Link</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No products found
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow key={product._id} hover>
                        <TableCell>{product.category || "-"}</TableCell>
                        <TableCell>
                          {product.image ? (
                            <a href={product.image} target="_blank" rel="noreferrer">
                              View image
                            </a>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>{product.title}</TableCell>
                        <TableCell>
                          {product.priceFrom || "-"}
                        </TableCell>
                        <TableCell>{product.ctaLabel || "-"}</TableCell>
                        <TableCell>{product.ctaLink || "-"}</TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button
                              variant="outlined"
                              onClick={() => openEditDialog(product)}
                              disabled={!canCreateAndEdit}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDelete(product._id)}
                              disabled={!canDelete}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>

        <Dialog open={isFormOpen} onClose={closeFormDialog} fullWidth maxWidth="sm">
          <DialogTitle>{selectedProduct ? "Edit Product" : "Create Product"}</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <ProductForm
                key={selectedProduct?._id ?? "new"}
                initialValues={formInitialValues}
                isSubmitting={submitting}
                onSubmit={handleSubmit}
              />
            </Box>
          </DialogContent>
        </Dialog>
      </AdminLayout>
    </AuthGuard>
  );
}
