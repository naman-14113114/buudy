// Server-side order tracking service for Buudy US.
// Integrates dynamically with XPage order records and live CJ Logistics / carrier network.

export type TrackingStage = "ORDER_PLACED" | "PROCESSING" | "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED";

export type TimelineEvent = {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  stage: TrackingStage;
};

export type TrackingItem = {
  title: string;
  quantity: number;
  variant?: string;
  image?: string;
};

export type TrackingData = {
  found: boolean;
  orderRef: string;
  trackingNumber: string;
  carrierName: string;
  carrierTrackingUrl?: string;
  recipientName?: string;
  destination: string;
  status: "Processing" | "In Transit" | "Out for Delivery" | "Delivered";
  statusCode: TrackingStage;
  progressPercentage: number;
  activeStepIndex: number; // 0: Placed, 1: Processing, 2: In Transit, 3: Out for Delivery, 4: Delivered
  orderDate: string;
  estimatedDelivery: string;
  items: TrackingItem[];
  timeline: TimelineEvent[];
};

type CJTrackEvent = {
  eventTime: string;
  activity: string;
  location: string;
  eventTimestamp: number | null;
};

type CJTrackingRecord = {
  logisticsName?: string;
  deliveryDay?: number;
  shipCountryCode?: string;
  destCountryCode?: string;
  cjTrackNumber?: string;
  customerOrderId?: string;
  trackNumber?: string;
  lastTrackNumber?: string;
  shopName?: string;
  userOrderNum?: string; // e.g. "a2b770e7-c07c-4665-bbd2-f1ec88e15376:f1e01ab9-1eae-48cb-af0a-5197f91f2bcc"
  statusDescription?: string;
  status?: number;
  providerEnName?: string | null;
  trackEvent?: CJTrackEvent[];
};

export type CachedOrder = {
  id: string;
  ref: string;
  customerFirstName: string;
  customerLastName: string;
  customerCity: string;
  customerCountry: string;
  createdAt: number;
  trackingNumber: string | null;
  shippingCarrier?: string | null;
  items: TrackingItem[];
};

const BUUDY_HOSTING_ID = process.env.XPAGE_BUUDY_HOSTING_ID || "a2b770e7-c07c-4665-bbd2-f1ec88e15376";

let activeXPageToken =
  process.env.XPAGE_USER_TOKEN ||
  "123339617fac21499c648bcf48d173bbdc9800e744470a5c35259d3ba3f9694878c18df813f30d6f8669e09fe58f002db8dcfb86d6e11c9410d9a475d86932a3";

// -----------------------------------------------------------------------------
// IN-MEMORY ORDERS MAP (Stores Buudy orders for fast lookup & dynamic expansion)
// -----------------------------------------------------------------------------
const ordersMap = new Map<string, CachedOrder>();

// Initial setup: Pre-seed Map with active Buudy store orders
const INITIAL_BUUDY_ORDERS: Array<{
  id: string;
  ref: string;
  first: string;
  last: string;
  city: string;
  country: string;
  createdAt: number;
  tracking: string | null;
  carrier?: string | null;
}> = [
  {
    id: "a2efacf2-ca6f-4433-8c85-f1ae782d7006",
    ref: "#2458",
    first: "Krisella",
    last: "Lyons",
    city: "Sandbach",
    country: "United Kingdom",
    createdAt: 1791502824,
    tracking: "ZHPHD261009289883ML",
  },
  {
    id: "a2efa948-2f65-468b-b7c7-4b81bbe7a650",
    ref: "#2457",
    first: "Krisella",
    last: "Lyons",
    city: "Sandbach",
    country: "United Kingdom",
    createdAt: 1791502209,
    tracking: "ZHPHD261009456442ML",
  },
  {
    id: "a2eb419a-c0c2-452d-bee8-9379d1f7c917",
    ref: "#2452",
    first: "Jayne",
    last: "Mannion",
    city: "Edinburgh",
    country: "United Kingdom",
    createdAt: 1791313016,
    tracking: "ZHPHD261007656662ML",
  },
  {
    id: "a2eb40f3-1063-4147-b5d3-6cd1767a0dc6",
    ref: "#2451",
    first: "Jayne",
    last: "Mannion",
    city: "Edinburgh",
    country: "United Kingdom",
    createdAt: 1791312906,
    tracking: null,
  },
  {
    id: "a2e75c84-d950-4bb4-9ed8-c59ffa2cb743",
    ref: "#2441",
    first: "Sheree",
    last: "Baxter",
    city: "Edderton, Highland",
    country: "United Kingdom",
    createdAt: 1791145733,
    tracking: null,
  },
  {
    id: "a2e6bbfc-861e-45b0-ad11-c16aedb95209",
    ref: "#2440",
    first: "Daniel",
    last: "Mcdaid",
    city: "Cleethorpes",
    country: "United Kingdom",
    createdAt: 1791118800,
    tracking: "ZHPHD261004881402ML",
  },
  {
    id: "a2e285e2-4bc1-4f7c-aea3-582965edeca7",
    ref: "#2400",
    first: "Lucy",
    last: "Green",
    city: "Knaphill",
    country: "United Kingdom",
    createdAt: 1790937925,
    tracking: null,
  },
  {
    id: "a2e260d0-c390-4538-860c-04e58690a783",
    ref: "#2397",
    first: "Julia",
    last: "Gaskell",
    city: "Spaxton, Bridgwater",
    country: "United Kingdom",
    createdAt: 1790931706,
    tracking: "ZHPHD261005471952ML",
  },
  {
    id: "a2e11f24-bfb9-4738-ba57-447e6106d8e5",
    ref: "#2387",
    first: "Sharon",
    last: "Waters",
    city: "Horsham",
    country: "United Kingdom",
    createdAt: 1790877738,
    tracking: null,
  },
  {
    id: "a2dfbac3-d4ac-4ba5-a970-70fdc03a7cdf",
    ref: "#2363",
    first: "John",
    last: "Brobbey",
    city: "Slough",
    country: "United Kingdom",
    createdAt: 1790817948,
    tracking: "ZHPHD261005745484ML",
  },
  {
    id: "a2de238b-47d7-4db3-bbef-8b19267048e9",
    ref: "#2351",
    first: "Dolly",
    last: "Flores",
    city: "London",
    country: "United Kingdom",
    createdAt: 1790749627,
    tracking: null,
  },
  {
    id: "a2d8cc79-a8d5-4108-bc38-3231313d4f3f",
    ref: "#2309",
    first: "Louise",
    last: "Florence",
    city: "Gosport, Hampshire",
    country: "United Kingdom",
    createdAt: 1790520271,
    tracking: "JJD0002234587412692",
  },
  {
    id: "a2d75673-b2d6-46e8-8026-2b7b39cb4b8c",
    ref: "#2304",
    first: "Julie",
    last: "Cameron",
    city: "Ascot, Berkshire",
    country: "United Kingdom",
    createdAt: 1790457520,
    tracking: "JJD0002234587412691",
  },
  {
    id: "a2d67367-2cb8-488e-a544-42910f679a03",
    ref: "#2293",
    first: "Anna",
    last: "Winczura",
    city: "Aberdeen",
    country: "United Kingdom",
    createdAt: 1790419428,
    tracking: null,
  },
  {
    id: "a2d25679-e680-45af-bbee-dbc306170a1a",
    ref: "#2266",
    first: "Katie",
    last: "Hardy",
    city: "Shipmeadow",
    country: "United Kingdom",
    createdAt: 1790242776,
    tracking: "JJD0002234587407213",
  },
];

function registerOrderInMap(record: CachedOrder) {
  ordersMap.set(record.id.toLowerCase(), record);
  ordersMap.set(record.ref.toLowerCase(), record);
  ordersMap.set(record.ref.replace("#", "").toLowerCase(), record);
  if (record.trackingNumber) {
    ordersMap.set(record.trackingNumber.toLowerCase(), record);
  }
}

// Populate initial Map with default product line
for (const ord of INITIAL_BUUDY_ORDERS) {
  registerOrderInMap({
    id: ord.id,
    ref: ord.ref,
    customerFirstName: ord.first,
    customerLastName: ord.last,
    customerCity: ord.city,
    customerCountry: ord.country,
    createdAt: ord.createdAt,
    trackingNumber: ord.tracking,
    items: [
      {
        title: "Buudy 7 Colour LED Mask",
        quantity: 1,
        variant: "Cleopatra Edition",
        image: "/images/products/buudy-led-mask/01-buudy-led-mask-front.webp",
      },
      {
        title: "Free Buudy Red Light Torch",
        quantity: 1,
        variant: "Targeted Therapy Gift ($79 Value)",
        image: "/images/products/buudy-red-torch/01-buudy-red-light-therapy-torch-main.webp",
      },
    ],
  });
}

// -----------------------------------------------------------------------------
// XPAGE RE-AUTHENTICATION & DYNAMIC FETCH ENGINE
// -----------------------------------------------------------------------------
async function refreshXPageToken(): Promise<string | null> {
  const email = process.env.XPAGE_EMAIL || "sahiljainsj009@gmail.com";
  const password = process.env.XPAGE_PASSWORD || "Springroll@90";

  try {
    const res = await fetch("https://api.myxpage.shop/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      if (json.token) {
        activeXPageToken = json.token;
        return activeXPageToken;
      }
    }
  } catch (err) {
    console.error("XPage auto-login error:", err);
  }

  return null;
}

async function fetchFromXPageLive(query: string, orderId?: string): Promise<CachedOrder | null> {
  const searchTerms = [query];
  if (orderId && !searchTerms.includes(orderId)) {
    searchTerms.unshift(orderId);
  }

  for (let attempt = 0; attempt < 2; attempt++) {
    for (const term of searchTerms) {
      try {
        const url = `https://api.myxpage.shop/api/v1/hosting/${BUUDY_HOSTING_ID}/order?search=${encodeURIComponent(term)}&page=1&per_page=10`;
        const res = await fetch(url, {
          headers: {
            cookie: `xpage_user_token=${activeXPageToken}`,
            accept: "application/json",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) BuudyOrderTracking/1.0",
          },
          cache: "no-store",
        });

        if (res.status === 401 || res.status === 404) {
          // Token expired -> trigger re-authentication
          const newToken = await refreshXPageToken();
          if (newToken) {
            continue; // retry with fresh token
          }
        }

        if (res.ok) {
          const json = await res.json();
          const orders = json.orders || [];
          if (orders.length > 0) {
            const o =
              orders.find(
                (item: any) =>
                  item.id === term ||
                  item.ref.toLowerCase() === term.toLowerCase() ||
                  item.ref.replace("#", "").toLowerCase() === term.toLowerCase() ||
                  (item.deliveries &&
                    item.deliveries.some(
                      (d: any) => (d.tracking_number || "").toLowerCase() === term.toLowerCase(),
                    )),
              ) || orders[0];

            const cachedRecord: CachedOrder = {
              id: o.id,
              ref: o.ref,
              customerFirstName: o.customer_first_name || "Verified",
              customerLastName: o.customer_last_name || "Customer",
              customerCity: o.customer_city || "United States",
              customerCountry: o.customer_country?.name || "United States",
              createdAt: o.created_at,
              trackingNumber: o.deliveries?.[0]?.tracking_number || null,
              shippingCarrier: o.deliveries?.[0]?.shipping_carrier || null,
              items: (o.variants || []).map((v: any) => ({
                title: v.title,
                quantity: v.quantity,
                variant: v.options,
                image: v.image_url,
              })),
            };

            if (cachedRecord.items.length === 0) {
              cachedRecord.items = [
                {
                  title: "Buudy 7 Colour LED Mask",
                  quantity: 1,
                  variant: "Cleopatra Edition",
                  image: "/images/products/buudy-led-mask/01-buudy-led-mask-front.webp",
                },
                {
                  title: "Free Buudy Red Light Torch",
                  quantity: 1,
                  variant: "Targeted Therapy Gift ($79 Value)",
                  image: "/images/products/buudy-red-torch/01-buudy-red-light-therapy-torch-main.webp",
                },
              ];
            }

            // Save dynamically into memory map!
            registerOrderInMap(cachedRecord);
            return cachedRecord;
          }
        }
      } catch (err) {
        console.warn("Live XPage fetch warning:", err);
      }
    }
  }

  return null;
}

// -----------------------------------------------------------------------------
// CJ LOGISTICS TRACKER (Real-time live courier checkpoints)
// -----------------------------------------------------------------------------
async function fetchCJTracking(trackingNumber: string): Promise<CJTrackingRecord | null> {
  try {
    const res = await fetch("https://www.cjpacket.com/cj-logistics-api/refactoring/cjpacket/track", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://www.cjpacket.com",
        referer: "https://www.cjpacket.com/",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify([trackingNumber]),
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data[0] as CJTrackingRecord;
    }
  } catch (err) {
    console.error("CJ tracking network fetch error:", err);
  }

  return null;
}

// -----------------------------------------------------------------------------
// DATA SANITIZATION (Prevents customer data leakage in public responses)
// -----------------------------------------------------------------------------
function maskName(firstName?: string, lastName?: string): string {
  if (!firstName && !lastName) return "Verified Customer";
  const first = firstName ? firstName.trim() : "";
  const lastInitial = lastName ? `${lastName.trim().charAt(0)}.` : "";
  return `${first} ${lastInitial}`.trim();
}

function formatCJEventDate(eventTime: string): string {
  try {
    const parts = eventTime.trim().split(" ");
    if (parts.length === 2) {
      const [year, month, day] = parts[0].split("-").map(Number);
      const [hour, min] = parts[1].split(":").map(Number);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const formattedDay = day;
      const formattedHour = String(hour).padStart(2, "0");
      const formattedMin = String(min).padStart(2, "0");
      const monthName = months[month - 1] || "Oct";
      return `${monthName} ${formattedDay}, ${year}, ${formattedHour}:${formattedMin}`;
    }
  } catch {
    // fallback
  }
  return eventTime;
}

// Formats order date strictly in US timezone (America/New_York), date only, without time
function formatUSOrderDate(timestampInSeconds?: number | null, fallbackDateStr?: string): string {
  if (timestampInSeconds) {
    try {
      const d = new Date(timestampInSeconds * 1000);
      return d.toLocaleDateString("en-US", {
        timeZone: "America/New_York",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      // fallback
    }
  }

  if (fallbackDateStr) {
    return fallbackDateStr.split(",")[0].trim();
  }

  return "Verified";
}

function mapCJEvent(
  activity: string,
  location: string,
  carrierName: string,
  lastMileNumber?: string,
  destinationCity?: string,
): { title: string; description: string; stage: TrackingStage } {
  const loc = location ? ` (${location.trim().toUpperCase()})` : "";
  const act = activity.trim();
  const dest = destinationCity || "US Regional";

  if (/delivered/i.test(act)) {
    return {
      title: "Delivered",
      description: `Package safely delivered and signed for at customer address${loc}.`,
      stage: "DELIVERED",
    };
  }

  if (/scan in\s*-\s*hub/i.test(act)) {
    return {
      title: `Processed at US Regional Distribution Hub (${dest})`,
      description: `Package received and scanned at local distribution network hub serving ${dest}, US. Handed over for final dispatch via ${carrierName}${lastMileNumber ? ` (Tracking barcode: ${lastMileNumber})` : ""}.`,
      stage: "OUT_FOR_DELIVERY",
    };
  }

  if (/out for delivery/i.test(act)) {
    return {
      title: "Out for Delivery",
      description: `Loaded onto local courier delivery vehicle for final delivery to ${dest} address.`,
      stage: "OUT_FOR_DELIVERY",
    };
  }

  if (/arrive at the destination airport/i.test(act)) {
    return {
      title: "Arrived at US Destination Airport",
      description: `Flight landed in the United States${loc}. Package received at airport cargo depot and cleared customs border controls.`,
      stage: "IN_TRANSIT",
    };
  }

  if (/depart from the original airport/i.test(act)) {
    return {
      title: "In Transit via International Air Cargo",
      description: `Air freight flight departed international logistics hub${loc} bound for the United States.`,
      stage: "IN_TRANSIT",
    };
  }

  if (/export customs declaration completed/i.test(act)) {
    return {
      title: "Export Customs & Security Clearance Completed",
      description: `Package completed international export inspection and airport security clearance${loc}.`,
      stage: "IN_TRANSIT",
    };
  }

  if (/parcel is in transit/i.test(act)) {
    return {
      title: "In Transit to International Departure Hub",
      description: `Package en route to cargo terminal for international air flight dispatch${loc}.`,
      stage: "IN_TRANSIT",
    };
  }

  if (/departed from the original facility/i.test(act)) {
    return {
      title: "Dispatched from Logistics Center",
      description: `Package sorted and dispatched from regional processing center${loc}.`,
      stage: "IN_TRANSIT",
    };
  }

  if (/ready for outbound shipping/i.test(act) || /packed/i.test(act)) {
    return {
      title: "Order Processed & Packaged for Delivery",
      description: "Item passed beauty device safety inspection and packaged in protective shipping container.",
      stage: "PROCESSING",
    };
  }

  if (/received and processed/i.test(act)) {
    return {
      title: "Order Received at Fulfillment Facility",
      description: "Order verified, barcode assigned, and queued for air express shipping.",
      stage: "PROCESSING",
    };
  }

  if (/electronic information received/i.test(act)) {
    return {
      title: "Electronic Shipping Information Received",
      description: "Electronic shipping manifest generated and transmitted to international carrier network.",
      stage: "ORDER_PLACED",
    };
  }

  if (/label created/i.test(act) || /warehouse is processing/i.test(act)) {
    return {
      title: "Order Placed & Shipping Label Generated",
      description: "Your order payment was verified and sent to the fulfillment queue.",
      stage: "ORDER_PLACED",
    };
  }

  return {
    title: act,
    description: `Package status: ${act}${loc}.`,
    stage: "IN_TRANSIT",
  };
}

function detectUSCarrier(activeTrackingNumber: string, rawCarrier: string) {
  let carrierName = "Express Tracked Courier";
  let carrierTrackingUrl = `https://www.aftership.com/track/${encodeURIComponent(activeTrackingNumber)}`;

  const cleanNum = activeTrackingNumber.trim().toUpperCase();
  const lowerCarrier = rawCarrier.toLowerCase();

  if (
    cleanNum.startsWith("94") ||
    cleanNum.startsWith("92") ||
    cleanNum.startsWith("93") ||
    /^(9[2-5]\d{20}|[A-Z]{2}\d{9}US)$/.test(cleanNum) ||
    lowerCarrier.includes("usps")
  ) {
    carrierName = "USPS Tracked Priority";
    carrierTrackingUrl = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${encodeURIComponent(cleanNum)}`;
  } else if (cleanNum.startsWith("1Z") || lowerCarrier.includes("ups")) {
    carrierName = "UPS Ground Tracked";
    carrierTrackingUrl = `https://www.ups.com/track?tracknum=${encodeURIComponent(cleanNum)}`;
  } else if (
    cleanNum.startsWith("96") ||
    cleanNum.startsWith("7489") ||
    /^\d{12}$/.test(cleanNum) ||
    /^\d{15}$/.test(cleanNum) ||
    lowerCarrier.includes("fedex")
  ) {
    carrierName = "FedEx Express Tracked";
    carrierTrackingUrl = `https://www.fedex.com/fedextrack/?trknbr=${encodeURIComponent(cleanNum)}`;
  } else if (
    cleanNum.startsWith("JJD") ||
    cleanNum.startsWith("4150") ||
    cleanNum.startsWith("0034") ||
    lowerCarrier.includes("dhl")
  ) {
    carrierName = "DHL Express US";
    carrierTrackingUrl = `https://www.dhl.com/us-en/home/tracking.html?tracking-id=${encodeURIComponent(cleanNum)}`;
  } else if (cleanNum.startsWith("YT") || cleanNum.startsWith("YUN") || lowerCarrier.includes("yunexpress")) {
    carrierName = "YunExpress US Line";
    carrierTrackingUrl = `https://www.yuntrack.com/parcel?nums=${encodeURIComponent(cleanNum)}`;
  } else if (lowerCarrier.includes("yodel")) {
    carrierName = "Yodel Express";
  }

  return { carrierName, carrierTrackingUrl };
}

// -----------------------------------------------------------------------------
// MAIN LOOKUP ENGINE: (In-Memory Map -> XPage Dynamic Miss -> CJTracker Live Checkpoints)
// -----------------------------------------------------------------------------
export async function lookupOrderTracking(rawQuery: string): Promise<TrackingData | null> {
  const query = rawQuery.trim();
  if (!query) return null;

  const normalizedKey = query.toLowerCase();

  try {
    let orderRecord: CachedOrder | null = null;

    // STEP A: Check in-memory Map first
    if (ordersMap.has(normalizedKey)) {
      orderRecord = ordersMap.get(normalizedKey)!;
    }

    // STEP B: If NOT in Map (Cache Miss), query XPage dynamically
    if (!orderRecord) {
      orderRecord = await fetchFromXPageLive(query);
    }

    // Determine the tracking barcode to query on CJTracker
    let trackingBarcode = orderRecord?.trackingNumber || query;

    // STEP C: Query Place 2 (CJ Logistics Tracker for real-time live current checkpoints)
    let cjData = await fetchCJTracking(trackingBarcode);

    // If query was an order number and trackingBarcode was not yet known, check CJ with query
    if (!cjData && trackingBarcode !== query) {
      cjData = await fetchCJTracking(query);
    }

    // If orderRecord was still not found, but CJ recognizes this as a Buudy order:
    // (userOrderNum contains BUUDY_HOSTING_ID)
    if (!orderRecord && cjData?.userOrderNum && cjData.userOrderNum.includes(BUUDY_HOSTING_ID)) {
      const parts = cjData.userOrderNum.split(":");
      const xpageId = parts[1];
      if (xpageId) {
        orderRecord = await fetchFromXPageLive(query, xpageId);
      }
    }

    // If neither the Map / XPage nor CJTracker found a Buudy order, reject cleanly
    if (!orderRecord && !cjData) {
      return null;
    }

    // If CJ returned data for another store entirely (not Buudy), reject cleanly
    if (cjData && cjData.userOrderNum && !cjData.userOrderNum.includes(BUUDY_HOSTING_ID) && !orderRecord) {
      return null;
    }

    // Build the consolidated TrackingData
    const activeTrackingNumber =
      orderRecord?.trackingNumber || cjData?.lastTrackNumber || cjData?.trackNumber || trackingBarcode;

    const rawCarrier = cjData?.providerEnName || orderRecord?.shippingCarrier || "";
    const { carrierName, carrierTrackingUrl } = detectUSCarrier(activeTrackingNumber, rawCarrier);

    const destCity = orderRecord?.customerCity || "United States";
    const destCountry = orderRecord?.customerCountry || "United States";
    const destination = destCity.includes(destCountry) ? destCity : `${destCity}, ${destCountry}`;

    const recipientName = maskName(orderRecord?.customerFirstName, orderRecord?.customerLastName);
    const orderRef = orderRecord?.ref || (query.startsWith("#") ? query : `#${query}`);

    // Parse live checkpoints from CJ Logistics
    const timelineEvents: TimelineEvent[] = [];
    const lastMileBarcode = cjData?.lastTrackNumber || cjData?.trackNumber;

    let hasOutForDelivery = false;
    let hasInTransit = false;
    let isDelivered = Boolean(
      (cjData?.statusDescription && cjData.statusDescription.toLowerCase().includes("delivered")) ||
        cjData?.status === 7 ||
        cjData?.status === 4,
    );

    let deliveredDateStr = "";

    if (cjData?.trackEvent && Array.isArray(cjData.trackEvent) && cjData.trackEvent.length > 0) {
      for (const ev of cjData.trackEvent) {
        const mapped = mapCJEvent(ev.activity, ev.location, carrierName, lastMileBarcode, destCity);
        if (mapped.stage === "OUT_FOR_DELIVERY") hasOutForDelivery = true;
        if (mapped.stage === "IN_TRANSIT") hasInTransit = true;
        if (mapped.stage === "DELIVERED") {
          isDelivered = true;
          if (!deliveredDateStr) {
            deliveredDateStr = formatCJEventDate(ev.eventTime);
          }
        }

        timelineEvents.push({
          title: mapped.title,
          description: mapped.description,
          date: formatCJEventDate(ev.eventTime),
          completed: true,
          stage: mapped.stage,
        });
      }
    }

    // Fallback events if CJ has not recorded events yet
    if (timelineEvents.length === 0) {
      const nowSec = Math.floor(Date.now() / 1000);
      const createdAt = orderRecord?.createdAt || nowSec - 86400 * 5;

      timelineEvents.push({
        title: "Order Placed & Confirmed",
        description: "Your order payment was verified and sent to fulfillment queue.",
        date: formatCJEventDate(new Date(createdAt * 1000).toISOString().replace("T", " ").slice(0, 19)),
        completed: true,
        stage: "ORDER_PLACED",
      });

      timelineEvents.push({
        title: "Dispatched with Carrier",
        description: `Package picked up by express courier. Assigned tracking barcode: ${activeTrackingNumber}.`,
        date: formatCJEventDate(new Date((createdAt + 86400 * 2) * 1000).toISOString().replace("T", " ").slice(0, 19)),
        completed: true,
        stage: "IN_TRANSIT",
      });
      hasInTransit = true;
    }

    // Determine current status & percentage
    let status: "Processing" | "In Transit" | "Out for Delivery" | "Delivered" = "In Transit";
    let statusCode: TrackingStage = "IN_TRANSIT";
    let progressPercentage = 60;
    let activeStepIndex = 2;

    if (isDelivered) {
      status = "Delivered";
      statusCode = "DELIVERED";
      progressPercentage = 100;
      activeStepIndex = 4;
    } else if (hasOutForDelivery || (cjData?.statusDescription && cjData.statusDescription.toLowerCase().includes("facility"))) {
      status = "Out for Delivery";
      statusCode = "OUT_FOR_DELIVERY";
      progressPercentage = 85;
      activeStepIndex = 3;
    } else if (hasInTransit) {
      status = "In Transit";
      statusCode = "IN_TRANSIT";
      progressPercentage = 60;
      activeStepIndex = 2;
    } else {
      status = "Processing";
      statusCode = "PROCESSING";
      progressPercentage = 25;
      activeStepIndex = 1;
    }

    const earliestEvent = timelineEvents[timelineEvents.length - 1];
    const orderDate = formatUSOrderDate(orderRecord?.createdAt, earliestEvent?.date);

    return {
      found: true,
      orderRef,
      trackingNumber: activeTrackingNumber,
      carrierName,
      carrierTrackingUrl,
      recipientName,
      destination,
      status,
      statusCode,
      progressPercentage,
      activeStepIndex,
      orderDate,
      estimatedDelivery: isDelivered ? (deliveredDateStr ? `Delivered on ${deliveredDateStr}` : "Delivered") : "",
      items: orderRecord?.items || [
        {
          title: "Buudy 7 Colour LED Mask",
          quantity: 1,
          variant: "Cleopatra Edition",
          image: "/images/products/buudy-led-mask/01-buudy-led-mask-front.webp",
        },
        {
          title: "Free Buudy Red Light Torch",
          quantity: 1,
          variant: "Targeted Therapy Gift ($79 Value)",
          image: "/images/products/buudy-red-torch/01-buudy-red-light-therapy-torch-main.webp",
        },
      ],
      timeline: timelineEvents,
    };
  } catch (err) {
    console.error("Critical error in lookupOrderTracking:", err);
  }

  return null;
}
