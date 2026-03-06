"use client";

import Script from "next/script";

export default function ChatWidget() {
  const widgetId = process.env.NEXT_PUBLIC_JIVOCHAT_ID;

  if (!widgetId) return null;

  return (
    <Script
      src={`https://code.jivosite.com/widget/${widgetId}`}
      strategy="afterInteractive"
    />
  );
}
