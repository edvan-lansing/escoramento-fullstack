"use client";

import { FormEvent, useState } from "react";
import { Box, Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import {
  createProduct,
  updateProduct,
} from "@/src/services/products/product.service";
import type { ProductPayload } from "@/src/types/product";

export interface ProductFormValues {
  category: "estaca" | "blindagem" | "";
  title: string;
  description: string;
  priceFrom: string;
  image: string;
  imageFile: File | null;
  ctaLabel: string;
  ctaLink: string;
}

interface ProductFormErrors {
  category?: string;
  title?: string;
}

interface ProductFormProps {
  productId?: string;
  initialValues?: Partial<ProductFormValues>;
  isSubmitting?: boolean;
  onSuccess?: () => void | Promise<void>;
  onSubmit?: (values: ProductFormValues) => void | Promise<void>;
}

const ProductForm = ({
  productId,
  initialValues,
  isSubmitting = false,
  onSuccess,
  onSubmit,
}: ProductFormProps) => {
  const [values, setValues] = useState<ProductFormValues>({
    category: (initialValues?.category as "estaca" | "blindagem" | "") ?? "",
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    priceFrom: initialValues?.priceFrom ?? "",
    image: initialValues?.image ?? "",
    imageFile: null,
    ctaLabel: initialValues?.ctaLabel ?? "",
    ctaLink: initialValues?.ctaLink ?? "",
  });
  const [errors, setErrors] = useState<ProductFormErrors>({});

  const handleChange = (
    field: keyof ProductFormValues,
    value: string | boolean | File | null,
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    const nextErrors: ProductFormErrors = {};

    if (!values.category) {
      nextErrors.category = "Category is required";
    }

    if (!values.title.trim()) {
      nextErrors.title = "Title is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const toPayload = (): ProductPayload => ({
    category: values.category || undefined,
    title: values.title.trim(),
    description: values.description,
    priceFrom: values.priceFrom.trim(),
    image: values.image,
    imageFile: values.imageFile,
    ctaLabel: values.ctaLabel.trim(),
    ctaLink: values.ctaLink.trim(),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    if (onSubmit) {
      await onSubmit(values);
      return;
    }

    const payload = toPayload();

    if (productId) {
      await updateProduct(productId, payload);
    } else {
      await createProduct(payload);
    }

    await onSuccess?.();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <TextField
          select
          label="Category"
          value={values.category}
          onChange={(event) => handleChange("category", event.target.value)}
          required
          error={Boolean(errors.category)}
          helperText={errors.category}
          fullWidth
        >
          <MenuItem value="">Selecione</MenuItem>
          <MenuItem value="estaca">Estaca</MenuItem>
          <MenuItem value="blindagem">Blindagem</MenuItem>
        </TextField>

        <TextField
          label="Title"
          value={values.title}
          onChange={(event) => handleChange("title", event.target.value)}
          required
          error={Boolean(errors.title)}
          helperText={errors.title}
          fullWidth
        />

        <TextField
          label="Description"
          value={values.description}
          onChange={(event) => handleChange("description", event.target.value)}
          multiline
          minRows={3}
          fullWidth
        />

        <TextField
          label="Price From"
          type="text"
          value={values.priceFrom}
          onChange={(event) => handleChange("priceFrom", event.target.value)}
          placeholder="Ex: a partir de R$ 350,00"
          inputProps={{ inputMode: "text" }}
          fullWidth
        />

        <TextField
          label="CTA Label"
          value={values.ctaLabel}
          onChange={(event) => handleChange("ctaLabel", event.target.value)}
          fullWidth
        />

        <TextField
          label="CTA Link"
          value={values.ctaLink}
          onChange={(event) => handleChange("ctaLink", event.target.value)}
          placeholder="https://..."
          fullWidth
        />

        <TextField
          label="Current Image URL"
          value={values.image}
          onChange={(event) => handleChange("image", event.target.value)}
          placeholder="https://..."
          fullWidth
        />

        <Stack spacing={1}>
          <Typography variant="body2" fontWeight={500}>
            Upload Image
          </Typography>

          <Button variant="outlined" component="label">
            Escolher arquivo
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0] ?? null;
                handleChange("imageFile", file);
              }}
            />
          </Button>

          <Typography variant="caption" color="text.secondary">
            {values.imageFile
              ? values.imageFile.name
              : "Nenhum arquivo escolhido"}
          </Typography>
        </Stack>

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Product"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductForm;
