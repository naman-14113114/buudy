"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button, cn } from "@/components/ui/Button";
import { publicSupportEmail } from "@/data/contact";

type FormState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
  mailtoHref?: string;
};

type ContactConfig = {
  accessKey: string;
  endpoint: string;
};

const initialState: FormState = {
  status: "idle",
  message: "",
};

const inputClasses =
  "mt-2 min-h-12 w-full rounded-xl border border-[var(--border)] bg-[rgba(247,241,232,.72)] px-4 text-sm text-[var(--plum)] outline-none transition placeholder:text-[rgba(78,55,78,.48)] focus:border-[var(--gold)] focus:bg-[var(--cream)] focus:ring-4 focus:ring-[rgba(183,141,72,.12)]";
const web3FormsEndpoint = "https://api.web3forms.com/submit";
const contactConfigEndpoint = "/api/contact/config";

let contactConfigPromise: Promise<ContactConfig> | null = null;

function buildMailto(formData: FormData) {
  const subject =
    (formData.get("subject")?.toString().trim() || "Buudy contact request");
  const body = [
    `First name: ${formData.get("firstName") ?? ""}`,
    `Last name: ${formData.get("lastName") ?? ""}`,
    `Email: ${formData.get("email") ?? ""}`,
    `Phone: ${formData.get("phone") ?? ""}`,
    `Subject: ${subject}`,
    "",
    formData.get("message") ?? "",
  ].join("\n");

  return `mailto:${publicSupportEmail}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

async function getContactConfig() {
  const bundledAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

  contactConfigPromise ??= fetch(contactConfigEndpoint, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  })
    .then(async (response) => {
      const result = (await response.json().catch(() => null)) as
        | {
            success?: boolean;
            accessKey?: string;
            endpoint?: string;
            message?: string;
          }
        | null;

      if (!response.ok || !result?.success || !result.accessKey) {
        if (bundledAccessKey) {
          return {
            accessKey: bundledAccessKey,
            endpoint: web3FormsEndpoint,
          };
        }

        throw new Error(
          result?.message ||
            "The contact form is not configured yet. Please use the email fallback below.",
        );
      }

      return {
        accessKey: result.accessKey,
        endpoint: result.endpoint || web3FormsEndpoint,
      };
    })
    .catch((error) => {
      contactConfigPromise = null;
      if (bundledAccessKey) {
        return {
          accessKey: bundledAccessKey,
          endpoint: web3FormsEndpoint,
        };
      }

      throw error;
    });

  return contactConfigPromise;
}

function getSourceMeta() {
  if (typeof window === "undefined") {
    return {
      sourceOrigin: "",
      sourcePath: "/pages/contact-us",
      sourceUrl: "/pages/contact-us",
    };
  }

  return {
    sourceOrigin: window.location.origin,
    sourcePath: `${window.location.pathname}${window.location.search}`,
    sourceUrl: window.location.href,
  };
}

function buildWeb3FormsData(
  formData: FormData,
  accessKey: string,
  sourceMeta: ReturnType<typeof getSourceMeta>,
) {
  const web3FormsData = new FormData();
  const firstName = formData.get("firstName")?.toString().trim() || "";
  const lastName = formData.get("lastName")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const subject =
    formData.get("subject")?.toString().trim() || "New support request";

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      web3FormsData.append(key, value);
    }
  }

  web3FormsData.set("access_key", accessKey);
  web3FormsData.set("subject", `[Buudy Contact] ${subject}`);
  web3FormsData.set("from_name", `${firstName} ${lastName}`.trim() || "Buudy customer");
  web3FormsData.set("name", `${firstName} ${lastName}`.trim());
  web3FormsData.set("email", email);
  web3FormsData.set("replyto", email);
  web3FormsData.set("page", sourceMeta.sourcePath);
  web3FormsData.set("source_url", sourceMeta.sourceUrl);
  web3FormsData.set("source_origin", sourceMeta.sourceOrigin);
  web3FormsData.set("submitted_at", new Date().toISOString());

  return web3FormsData;
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  autoComplete,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="buudy-mono text-[var(--plum)]">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        autoComplete={autoComplete}
        className={inputClasses}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}

export function ContactForm() {
  const [state, setState] = useState<FormState>(initialState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const sourceMeta = getSourceMeta();
    const mailtoHref = buildMailto(formData);

    setState({ status: "submitting", message: "" });

    try {
      const config = await getContactConfig();
      const response = await fetch(config.endpoint, {
        method: "POST",
        body: buildWeb3FormsData(formData, config.accessKey, sourceMeta),
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
        body?: {
          message?: string;
        };
      };

      if (!response.ok || !result.success) {
        setState({
          status: "error",
          message:
            result.message ||
            result.body?.message ||
            "We could not send your message right now. Please use the email fallback below.",
          mailtoHref,
        });
        return;
      }

      form.reset();
      setState({
        status: "success",
        message:
          result.message ||
          "Thanks for contacting us. We will get back to you as soon as possible.",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "We could not send your message right now. Please use the email fallback below.";

      setState({
        status: "error",
        message: errorMessage,
        mailtoHref,
      });
    }
  }

  const isSubmitting = state.status === "submitting";

  return (
    <form
      className="rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[0_22px_55px_-35px_rgba(58,31,61,.35)] sm:p-7"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          autoComplete="given-name"
          label="First Name"
          name="firstName"
          placeholder="Your first name"
          required
        />
        <Field
          autoComplete="family-name"
          label="Last Name"
          name="lastName"
          placeholder="Your last name"
          required
        />
        <Field
          autoComplete="email"
          label="Email"
          name="email"
          placeholder="Enter your email"
          required
          type="email"
        />
        <Field
          autoComplete="tel"
          label="Phone"
          name="phone"
          placeholder="Your phone"
          type="tel"
        />
        <Field
          className="sm:col-span-2"
          label="Subject"
          name="subject"
          placeholder="What can we help with?"
        />
      </div>

      <label className="mt-4 block">
        <span className="buudy-mono text-[var(--plum)]">Message *</span>
        <textarea
          className={`${inputClasses} min-h-36 resize-y py-3 leading-7`}
          maxLength={300}
          name="message"
          placeholder="Your message"
          required
        />
      </label>

      <label className="hidden">
        Do not fill this out
        <input autoComplete="off" name="botcheck" tabIndex={-1} type="text" />
      </label>

      {state.status !== "idle" && state.status !== "submitting" ? (
        <div
          className={`mt-5 rounded-2xl border p-4 text-sm leading-6 ${
            state.status === "success"
              ? "border-[rgba(40,132,84,.24)] bg-[rgba(40,132,84,.08)] text-[var(--plum)]"
              : "border-[rgba(160,68,68,.24)] bg-[rgba(160,68,68,.08)] text-[var(--plum)]"
          }`}
          role="status"
        >
          <div className="flex gap-3">
            {state.status === "success" ? (
              <CheckCircle2 className="mt-0.5 flex-none text-[var(--success)]" size={18} />
            ) : (
              <AlertCircle className="mt-0.5 flex-none text-[#9d3f3f]" size={18} />
            )}
            <div>
              <p>{state.message}</p>
              {state.mailtoHref ? (
                <a
                  className="mt-2 inline-block font-semibold underline underline-offset-4"
                  href={state.mailtoHref}
                >
                  Email {publicSupportEmail}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <Button className="mt-6 w-full text-base" disabled={isSubmitting} type="submit">
        {isSubmitting ? <Loader2 className="animate-spin" size={17} /> : <Send size={17} />}
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
