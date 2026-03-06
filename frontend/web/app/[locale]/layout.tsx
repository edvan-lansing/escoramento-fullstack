import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import type { Locale } from "../../i18n/routing";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (locale !== "pt" && locale !== "en") {
    notFound();
  }

  const typedLocale: Locale = locale;
  const messages = await getMessages({ locale: typedLocale });

  return (
    <NextIntlClientProvider locale={typedLocale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
