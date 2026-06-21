import {
  selectGoogleClickIdentifier,
  type Attribution,
} from "./attribution";
import { getGooglePurchaseConfig } from "./config";
import { getGoogleDataManagerAccessToken } from "./google-auth";

const destinationReference = "google-ads-purchase";

export type GooglePurchaseEvent = {
  destinationReferences: string[];
  transactionId: string;
  eventTimestamp: string;
  adIdentifiers: NonNullable<ReturnType<typeof selectGoogleClickIdentifier>>;
  currency: "INR";
  conversionValue: number;
  conversionCount: 1;
  eventSource: "WEB";
};

export function buildGooglePurchaseEvent(input: {
  transactionId: string;
  eventTimestamp: string;
  attribution: Attribution;
  conversionValueInr: number;
}): GooglePurchaseEvent | null {
  const adIdentifiers = selectGoogleClickIdentifier(input.attribution);
  if (!adIdentifiers) return null;
  return {
    destinationReferences: [destinationReference],
    transactionId: input.transactionId,
    eventTimestamp: new Date(input.eventTimestamp).toISOString(),
    adIdentifiers,
    currency: "INR",
    conversionValue: input.conversionValueInr,
    conversionCount: 1,
    eventSource: "WEB",
  };
}

export function buildGooglePurchaseRequest(input: {
  customerId: string;
  conversionActionId: string;
  event: GooglePurchaseEvent;
}) {
  const customerId = input.customerId.replace(/\D/g, "");
  return {
    destinations: [
      {
        reference: destinationReference,
        loginAccount: { accountType: "GOOGLE_ADS", accountId: customerId },
        operatingAccount: { accountType: "GOOGLE_ADS", accountId: customerId },
        productDestinationId: input.conversionActionId.replace(/\D/g, ""),
      },
    ],
    encoding: "JSON",
    events: [input.event],
  };
}

export async function uploadGooglePurchase(event: GooglePurchaseEvent) {
  const config = getGooglePurchaseConfig();
  const accessToken = await getGoogleDataManagerAccessToken({
    email: config.serviceAccountEmail,
    privateKey: config.serviceAccountPrivateKey,
  });
  const response = await fetch(
    "https://datamanager.googleapis.com/v1/events:ingest",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        buildGooglePurchaseRequest({
          customerId: config.customerId,
          conversionActionId: config.conversionActionId,
          event,
        }),
      ),
      cache: "no-store",
    },
  );
  const body = (await response.json().catch(() => ({}))) as {
    requestId?: string;
    error?: { message?: string };
  };
  if (!response.ok) {
    throw new Error(
      body.error?.message ||
        `Google Data Manager upload failed (${response.status}).`,
    );
  }
  return { requestId: body.requestId || null };
}
