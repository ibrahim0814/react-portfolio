// Canonical site URL, used to build absolute URLs for social preview images.
// og:image / twitter:image MUST be absolute AND must resolve with no redirect
// (scrapers like WhatsApp won't follow a 301). The apex domain 301-redirects to
// www, so the canonical host is www.
export const SITE_URL = "https://www.ibrahim0814.com";

export const ogImage = (slug?: string) =>
  `${SITE_URL}/og/${slug ?? "default"}.png`;
