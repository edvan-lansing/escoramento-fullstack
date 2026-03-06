import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales, type Locale } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  const rawLocale = typeof locale === "string" ? locale : defaultLocale;

  const resolvedLocale = (locales as readonly string[]).includes(rawLocale)
    ? (rawLocale as Locale)
    : defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default
  };
});
