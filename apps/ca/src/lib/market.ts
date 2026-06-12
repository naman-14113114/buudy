export const market = {
  siteUrl: "https://ca.buudy.com",
  locale: "en-CA",
  currency: "CAD",
  country: "Canada",
  marketLabel: "CA",
  madeInLabel: "Made in Canada",
  checkoutSource: "ca_buudy",
  checkoutUtmSource: "ca.buudy.com",
  checkoutUtmCampaign: "ca_led_mask",
  supportHours: "Monday to Friday, 9:00 AM to 5:00 PM EST",
} as const;

export type StoreCurrency = "USD" | "GBP" | "CAD" | "AUD";