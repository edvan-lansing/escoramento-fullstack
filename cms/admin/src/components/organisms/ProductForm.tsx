"use client";

import { FormEvent, useState } from "react";
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

  const inputClassName =
    "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Category *</label>
        <select
          value={values.category}
          onChange={(event) => handleChange("category", event.target.value)}
          required
          className={inputClassName}
        >
          <option value="">Selecione</option>
          <option value="estaca">Estaca</option>
          <option value="blindagem">Blindagem</option>
        </select>
        {errors.category ? <p className="mt-1 text-xs text-rose-600">{errors.category}</p> : null}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Title *</label>
        <input
          value={values.title}
          onChange={(event) => handleChange("title", event.target.value)}
          required
          className={inputClassName}
        />
        {errors.title ? <p className="mt-1 text-xs text-rose-600">{errors.title}</p> : null}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
        <textarea
          value={values.description}
          onChange={(event) => handleChange("description", event.target.value)}
          rows={3}
          className={inputClassName}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Price From</label>
        <input
          type="text"
          value={values.priceFrom}
          onChange={(event) => handleChange("priceFrom", event.target.value)}
          placeholder="Ex: a partir de R$ 350,00"
          inputMode="text"
          className={inputClassName}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">CTA Label</label>
        <input
          value={values.ctaLabel}
          onChange={(event) => handleChange("ctaLabel", event.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">CTA Link</label>
        <input
          value={values.ctaLink}
          onChange={(event) => handleChange("ctaLink", event.target.value)}
          placeholder="https://..."
          className={inputClassName}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Current Image URL</label>
        <input
          value={values.image}
          onChange={(event) => handleChange("image", event.target.value)}
          placeholder="https://..."
          className={inputClassName}
        />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-700">Upload Image</p>
        <label className="inline-flex cursor-pointer items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          Escolher arquivo
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0] ?? null;
              handleChange("imageFile", file);
            }}
          />
        </label>
        <p className="text-xs text-slate-500">
          {values.imageFile ? values.imageFile.name : "Nenhum arquivo escolhido"}
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
};

export default ProductForm;
