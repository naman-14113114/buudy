import { NextResponse } from "next/server";

const web3FormsEndpoint = "https://api.web3forms.com/submit";

function jsonResponse(
  body: {
    success: boolean;
    accessKey?: string;
    endpoint?: string;
    message?: string;
  },
  status: number,
) {
  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "no-store",
    },
    status,
  });
}

export async function GET() {
  const accessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ||
    process.env.WEB3FORMS_ACCESS_KEY?.trim();

  if (!accessKey) {
    return jsonResponse(
      {
        success: false,
        message:
          "The contact form is not configured yet. Please use the email fallback below.",
      },
      503,
    );
  }

  return jsonResponse(
    {
      success: true,
      accessKey,
      endpoint: web3FormsEndpoint,
    },
    200,
  );
}
