export const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "msclkid",
  "gclid",
  "gbraid",
  "wbraid",
  "journey_id",
  "fbclid",
  "source",
  "blfm_source",
  "blfm_cta",
] as const;

export type Attribution = Partial<
  Record<(typeof attributionKeys)[number], string>
>;

export function normalizeAttribution(
  input: Record<string, unknown> | null | undefined,
): Attribution {
  if (!input) return {};
  const normalized: Attribution = {};
  attributionKeys.forEach((key) => {
    const raw = input[key];
    if (typeof raw !== "string") return;
    const value = raw.trim().slice(0, 500);
    if (value) normalized[key] = value;
  });
  return normalized;
}

export type GoogleClickIdentifier =
  | { gclid: string }
  | { gbraid: string }
  | { wbraid: string };

export function selectGoogleClickIdentifier(
  attribution: Attribution,
): GoogleClickIdentifier | null {
  if (attribution.gclid) return { gclid: attribution.gclid };
  if (attribution.gbraid) return { gbraid: attribution.gbraid };
  if (attribution.wbraid) return { wbraid: attribution.wbraid };
  return null;
}

export function buildPlusbaseAttributionProperties(
  attribution: Attribution,
) {
  const propertyOrder: readonly (keyof Attribution)[] = [
    "gclid",
    "gbraid",
    "wbraid",
    "journey_id",
    "msclkid",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "blfm_source",
    "blfm_cta",
  ];
  return propertyOrder.flatMap((key) => {
    const value = attribution[key];
    return value ? [{ name: `_blfm_${key}`, value }] : [];
  });
}
