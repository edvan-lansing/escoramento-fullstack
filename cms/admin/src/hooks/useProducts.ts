"use client";

import { useCallback, useEffect, useState } from "react";
import { getProducts } from "@/src/services/products/product.service";
import type { Product } from "@/src/types/product";
import { getApiErrorMessage } from "@/src/utils/api-error";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refresh: fetchProducts,
  };
};
