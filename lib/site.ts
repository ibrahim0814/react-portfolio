// Canonical site URL, used to build absolute URLs for social preview images.
// og:image / twitter:image MUST be absolute, so this needs to match the
// deployed domain.
export const SITE_URL = "https://ibrahim0814.com";

export const ogImage = (slug?: string) =>
  `${SITE_URL}/og/${slug ?? "default"}.png`;
