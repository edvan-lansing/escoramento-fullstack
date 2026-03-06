"use client";

/* eslint-disable react-hooks/immutability */

import type { ReactNode } from "react";
import { useMemo } from "react";
import { useServerInsertedHTML } from "next/navigation";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

type EmotionCacheProviderProps = {
  children: ReactNode;
};

export default function EmotionCacheProvider({
  children,
}: EmotionCacheProviderProps) {
  const { cache, flush } = useMemo(() => {
    const nextCache = createCache({ key: "css", prepend: true });
    // Required for some SSR scenarios with Emotion + React 18+.
    nextCache.compat = true;

    let inserted: string[] = [];
    const prevInsert = nextCache.insert;

    nextCache.insert = (...args) => {
      const serialized = args[1];
      if (nextCache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };

    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache: nextCache, flush };
  }, []);

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;

    let styles = "";
    for (const name of names) {
      const style = cache.inserted[name];
      if (typeof style === "string") {
        styles += style;
      }
    }

    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
