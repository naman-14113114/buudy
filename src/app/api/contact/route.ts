import { NextResponse } from "next/server";
import { contactRecipientEmail, publicSupportEmail } from "@/data/contact";

type ContactPayload = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  botcheck?: unknown;
  sourceOrigin?: unknown;
  sourcePath?: unknown;
  sourceUrl?: unknown;
};

const web3FormsEndpoint = "https://api.web3forms.com/submit";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function jsonResponse(
  body: {
    success: boolean;
    message: string;
    code?: string;
  },
  status: number,
) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return jsonResponse(
      {
        success: false,
        message: "Please submit the contact form again.",
        code: "INVALID_JSON",
      },
      400,
    );
  }

  if (getValue(payload.botcheck)) {
    return jsonResponse(
      {
        success: true,
        message: "Thanks for contacting us. We will get back to you soon.",
      },
      200,
    );
  }

  const firstName = getValue(payload.firstName);
  const lastName = getValue(payload.lastName);
  const email = getValue(payload.email);
  const phone = getValue(payload.phone);
  const subject = getValue(payload.subject);
  const message = getValue(payload.message);
  const sourceOrigin = getValue(payload.sourceOrigin);
  const sourcePath = getValue(payload.sourcePath) || "/pages/contact-us";
  const sourceUrl = getValue(payload.sourceUrl) || sourcePath;

  if (!firstName || !lastName || !email || !message) {
    return jsonResponse(
      {
        success: false,
        message: "Please complete your name, email, and message.",
        code: "MISSING_FIELDS",
      },
      400,
    );
  }

  if (!emailPattern.test(email)) {
    return jsonResponse(
      {
        success: false,
        message: "Please enter a valid email address.",
        code: "INVALID_EMAIL",
      },
      400,
    );
  }

  if (message.length > 300) {
    return jsonResponse(
      {
        success: false,
        message: "Please keep your message under 300 characters.",
        code: "MESSAGE_TOO_LONG",
      },
      400,
    );
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return jsonResponse(
      {
        success: false,
        message:
          "The contact form is not configured yet. Please email support@buudy.com directly.",
        code: "CONFIG_MISSING",
      },
      503,
    );
  }

  try {
    const response = await fetch(web3FormsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[Buudy Contact] ${subject || "New support request"}`,
        from_name: `${firstName} ${lastName}`,
        email,
        replyto: email,
        first_name: firstName,
        last_name: lastName,
        phone,
        inquiry_subject: subject,
        message,
        page: sourcePath,
        source_url: sourceUrl,
        source_origin: sourceOrigin,
        submitted_at: new Date().toISOString(),
        public_support_email: publicSupportEmail,
        notification_recipient: contactRecipientEmail,
      }),
    });

    const result = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    if (!response.ok || result?.success === false) {
      return jsonResponse(
        {
          success: false,
          message:
            result?.message ||
            "We could not send your message right now. Please email support@buudy.com directly.",
          code: "WEB3FORMS_ERROR",
        },
        response.ok ? 502 : response.status,
      );
    }

    return jsonResponse(
      {
        success: true,
        message:
          "Thanks for contacting us. We will get back to you as soon as possible.",
      },
      200,
    );
  } catch {
    return jsonResponse(
      {
        success: false,
        message:
          "We could not send your message right now. Please email support@buudy.com directly.",
        code: "NETWORK_ERROR",
      },
      502,
    );
  }
}
