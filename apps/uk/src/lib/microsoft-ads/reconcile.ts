import "server-only";

import { fetchRecentPlusbaseOrders } from "@/lib/shopbase";
import {
  buildMicrosoftPurchaseEvent,
  sendMicrosoftPurchases,
} from "./capi";

export async function reconcileMicrosoftPurchases() {
  const updatedAtMin = new Date(
    Date.now() - 6 * 24 * 60 * 60 * 1000,
  ).toISOString();
  const orders = await fetchRecentPlusbaseOrders({ updatedAtMin, limit: 250 });
  const events = [];
  const summary = {
    checked: orders.length,
    ready: 0,
    sent: 0,
    notAuthorizedOrPaid: 0,
    missingMsclkid: 0,
    invalidOrder: 0,
    stale: 0,
  };

  for (const order of orders) {
    const result = buildMicrosoftPurchaseEvent(order);
    if (result.status === "ready") {
      events.push(result.event);
      summary.ready += 1;
    } else if (result.status === "not_authorized_or_paid") {
      summary.notAuthorizedOrPaid += 1;
    } else if (result.status === "missing_msclkid") {
      summary.missingMsclkid += 1;
    } else if (result.status === "invalid_order") {
      summary.invalidOrder += 1;
    } else {
      summary.stale += 1;
    }
  }

  summary.sent = await sendMicrosoftPurchases(events);
  return summary;
}
