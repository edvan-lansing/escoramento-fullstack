export type NavItem = {
  label: string;
  items: Array<{ label: string; href: string }>;
};

export function getDefaultNavItems(
  locale: "pt" | "en",
  t: (key: string) => string
): NavItem[] {
  const baseUrl = `https://escoramento.com/${locale}`;

  return [
    {
      label: t("equipment"),
      items: [
        { label: t("rent"), href: `${baseUrl}/shop/rent/` },
        { label: t("buy"), href: `${baseUrl}/shop/buy/` },
      ],
    },
    {
      label: t("technicalMaterial"),
      items: [
        { label: t("catalogs"), href: `${baseUrl}/catalogs/` },
        { label: t("blog"), href: "https://blog.escoramento.com/" },
      ],
    },
    {
      label: t("about"),
      items: [
        { label: t("company"), href: `${baseUrl}/about/` },
        { label: t("privacyPolicy"), href: `${baseUrl}/privacy-policy/` },
        { label: t("termsOfUse"), href: `${baseUrl}/terms-of-use/` },
      ],
    },
  ];
}
