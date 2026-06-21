import { getGooglePurchaseConfig } from "./config";
import { selectGoogleClickIdentifier } from "./attribution";
import {
  buildGooglePurchaseEvent,
  uploadGooglePurchase,
} from "./google-data-manager";
import {
  getPlusbaseOrderAttribution,
  hasGoogleAdsUploadTag,
  summarizePaidPlusbaseOrder,
  type PlusbaseOrder,
} from "./plusbase";
import {
  fetchRecentPlusbaseOrders,
  markPlusbaseOrderGoogleAdsUploaded,
} from "./shopbase";

export async function uploadPaidPlusbaseOrder(
  order: PlusbaseOrder,
  options: { dryRun?: boolean } = {},
) {
  const paid = summarizePaidPlusbaseOrder(order);
  if (!paid) return "not_paid" as const;
  if (hasGoogleAdsUploadTag(order)) return "already_uploaded" as const;
  const attribution = getPlusbaseOrderAttribution(order);
  if (!selectGoogleClickIdentifier(attribution)) return "no_google_click" as const;
  if (options.dryRun) return "would_upload" as const;
  const event = buildGooglePurchaseEvent({
    transactionId: paid.orderId,
    eventTimestamp: paid.paidAt,
    attribution,
    conversionValueInr: getGooglePurchaseConfig().conversionValueInr,
  });
  if (!event) return "no_google_click" as const;
  await uploadGooglePurchase(event);
  await markPlusbaseOrderGoogleAdsUploaded(order);
  return "uploaded" as const;
}

export async function reconcilePurchaseConversions(options: {
  dryRun?: boolean;
  lookbackDays?: number;
} = {}) {
  const dryRun = Boolean(options.dryRun);
  const lookbackDays = Math.max(1, Math.min(90, options.lookbackDays ?? 30));
  const orders = await fetchRecentPlusbaseOrders({
    createdAtMin: new Date(
      Date.now() - lookbackDays * 24 * 60 * 60 * 1000,
    ).toISOString(),
  });
  const summary = {
    checked: orders.length,
    paid: 0,
    attributed: 0,
    wouldUpload: 0,
    uploaded: 0,
    alreadyUploaded: 0,
    skippedWithoutGoogleClick: 0,
    failed: 0,
    dryRun,
  };
  for (const order of orders) {
    if (!summarizePaidPlusbaseOrder(order)) continue;
    summary.paid += 1;
    try {
      const result = await uploadPaidPlusbaseOrder(order, { dryRun });
      if (result === "already_uploaded") summary.alreadyUploaded += 1;
      else if (result === "no_google_click") summary.skippedWithoutGoogleClick += 1;
      else if (result === "would_upload") {
        summary.attributed += 1;
        summary.wouldUpload += 1;
      } else if (result === "uploaded") {
        summary.attributed += 1;
        summary.uploaded += 1;
      }
    } catch (error) {
      summary.failed += 1;
      console.error(
        "Google Ads purchase upload failed",
        order.id,
        error instanceof Error ? error.message : error,
      );
    }
  }
  return summary;
}
