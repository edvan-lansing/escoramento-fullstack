"use client";

import { FormEvent, useState } from "react";

export interface CarouselFormValues {
  displayOrder: string;
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  image: string;
  imageFile: File | null;
}

interface CarouselFormErrors {
  title?: string;
  displayOrder?: string;
}

interface CarouselFormProps {
  initialValues?: Partial<CarouselFormValues>;
  isSubmitting?: boolean;
  canEditOrder?: boolean;
  onSubmit: (values: CarouselFormValues) => void | Promise<void>;
}

const CarouselForm = ({
  initialValues,
  isSubmitting = false,
  canEditOrder = true,
  onSubmit,
}: CarouselFormProps) => {
  const [values, setValues] = useState<CarouselFormValues>({
    displayOrder: initialValues?.displayOrder ?? "0",
    title: initialValues?.title ?? "",
    subtitle: initialValues?.subtitle ?? "",
    description: initialValues?.description ?? "",
    ctaLabel: initialValues?.ctaLabel ?? "",
    ctaLink: initialValues?.ctaLink ?? "",
    image: initialValues?.image ?? "",
    imageFile: null,
  });
  const [errors, setErrors] = useState<CarouselFormErrors>({});

  const handleChange = (field: keyof CarouselFormValues, value: string | File | null) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    const nextErrors: CarouselFormErrors = {};

    const parsedOrder = Number(values.displayOrder);

    if (!values.title.trim()) {
      nextErrors.title = "Title is required";
    }

    if (!values.displayOrder.trim()) {
      nextErrors.displayOrder = "Order is required";
    } else if (!Number.isInteger(parsedOrder) || parsedOrder < 0) {
      nextErrors.displayOrder = "Order must be a non-negative integer";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    await onSubmit(values);
  };

  const inputClassName =
    "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Display Order *</label>
        <input
          type="number"
          min="0"
          step="1"
          value={values.displayOrder}
          onChange={(event) => handleChange("displayOrder", event.target.value)}
          disabled={!canEditOrder}
          required
          className={inputClassName}
        />
        {errors.displayOrder ? (
          <p className="mt-1 text-xs text-rose-600">{errors.displayOrder}</p>
        ) : null}
        {!canEditOrder ? <p className="mt-1 text-xs text-slate-500">Only admin and manager can edit order.</p> : null}
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
        <label className="mb-1 block text-sm font-medium text-slate-700">Subtitle</label>
        <input
          value={values.subtitle}
          onChange={(event) => handleChange("subtitle", event.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
        <textarea
          value={values.description}
          onChange={(event) => handleChange("description", event.target.value)}
          rows={4}
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
          placeholder="/contato or https://..."
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
        {isSubmitting ? "Saving..." : "Save Carousel Item"}
      </button>
    </form>
  );
};

export default CarouselForm;
