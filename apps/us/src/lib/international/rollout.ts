// The owner rejected the separate localized landing-page design.
// Keep drafts out of public routing/indexing until the existing storefront is translated in place.
export const localizedStorefrontEnabled = false;

// Only original-template translations are published. Other language drafts stay disabled.
export const publishedLocalizedPaths: Record<string, readonly string[]> = {
  fr: ['/products/buudy-led-mask', '/cart', '/policies/shipping-policy', '/policies/return-policy', '/policies/refund-policy', '/policies/privacy-policy', '/policies/terms-of-service', '/policies/cookies-policy'],
};
export function isPublishedLocalizedPath(locale: string, path: string) {
  return publishedLocalizedPaths[locale]?.includes(path) ?? false;
}
