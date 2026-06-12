import {
  privacyPolicyHtml,
  returnPolicyHtml,
  refundPolicyHtml,
  termsOfServiceHtml,
  cookiesPolicyHtml
} from "@/data/policies";
import { shippingPolicyHtml } from "@/data/shippingPolicy";
import { HelpCircle, Shield, FileText, Truck, RefreshCw } from "lucide-react";

export type PolicyType =
  | "privacy-policy"
  | "return-policy"
  | "shipping-policy"
  | "refund-policy"
  | "terms-of-service"
  | "cookies-policy";

type PolicyPageProps = {
  policyType: PolicyType;
};

const policyDataMap = {
  "privacy-policy": {
    title: "Privacy Policy",
    html: privacyPolicyHtml,
    icon: Shield,
    subtitle: "How we collect, protect and process your personal information."
  },
  "return-policy": {
    title: "Return Policy",
    html: returnPolicyHtml,
    icon: RefreshCw,
    subtitle: "Simple, easy, and stress-free replacement guidelines."
  },
  "shipping-policy": {
    title: "Shipping Policy",
    html: shippingPolicyHtml,
    icon: Truck,
    subtitle: "Processing times, delivery estimates and transit methods."
  },
  "refund-policy": {
    title: "Refund Policy",
    html: refundPolicyHtml,
    icon: RefreshCw,
    subtitle: "Information on order cancellations, replacements, and refunds."
  },
  "terms-of-service": {
    title: "Terms of Service",
    html: termsOfServiceHtml,
    icon: FileText,
    subtitle: "Operating guidelines, conditions, and store agreements."
  },
  "cookies-policy": {
    title: "Cookies Policy",
    html: cookiesPolicyHtml,
    icon: HelpCircle,
    subtitle: "How we use cookies to personalize and enhance your storefront experience."
  }
};

export function PolicyPage({ policyType }: PolicyPageProps) {
  const policy = policyDataMap[policyType];
  const IconComponent = policy.icon;

  return (
    <div className="bg-[var(--cream)] min-h-screen py-16 md:py-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="buudy-glow -left-24 top-12 h-[380px] w-[380px] bg-[#f4a17b] opacity-10" />
      <div className="buudy-glow -right-20 bottom-12 h-[420px] w-[420px] bg-[#a05080] opacity-10" />

      <div className="buudy-wrap relative z-10 max-w-4xl px-4 sm:px-6">
        {/* Header Block */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[rgba(58,31,61,0.05)] text-[var(--plum)] mb-4 shadow-sm">
            <IconComponent size={24} className="stroke-[1.5]" />
          </span>
          <p className="buudy-mono text-[var(--gold)] tracking-[0.2em] uppercase text-xs font-semibold">
            Store Policies
          </p>
          <h1 className="buudy-display mt-3 text-[2.5rem] leading-[1.08] text-[var(--plum)] sm:text-5xl md:text-6xl font-light">
            {policy.title}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[var(--muted)] font-light max-w-2xl mx-auto">
            {policy.subtitle}
          </p>
        </div>

        {/* Content Container */}
        <article className="rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-10 md:p-12 shadow-[0_16px_40px_-24px_rgba(58,31,61,0.08)]">
          <div
            className="buudy-policy-content prose max-w-none text-sm sm:text-base leading-8 text-[var(--muted)] font-light space-y-6"
            dangerouslySetInnerHTML={{ __html: policy.html }}
          />
        </article>

        {/* Custom CSS overrides specifically for legal document spacing */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .buudy-policy-content h2,
              .buudy-policy-content h3,
              .buudy-policy-content h4,
              .buudy-policy-content strong {
                font-family: var(--font-fraunces), serif;
                color: var(--plum);
                font-weight: 500;
                display: block;
                margin-top: 1.8rem;
                margin-bottom: 0.8rem;
              }
              .buudy-policy-content h2 {
                font-size: 1.5rem;
                line-height: 1.3;
              }
              .buudy-policy-content h3 {
                font-size: 1.25rem;
                line-height: 1.3;
              }
              .buudy-policy-content h4 {
                font-size: 1.1rem;
                line-height: 1.4;
              }
              .buudy-policy-content p {
                margin-bottom: 1.2rem;
                line-height: 1.8;
              }
              .buudy-policy-content ul {
                list-style-type: disc;
                padding-left: 1.5rem;
                margin-bottom: 1.2rem;
              }
              .buudy-policy-content li {
                margin-bottom: 0.5rem;
              }
              .buudy-policy-content a {
                color: var(--plum);
                text-decoration: underline;
                font-weight: 400;
              }
              .buudy-policy-content a:hover {
                color: var(--ink);
              }
              .buudy-policy-table-wrap {
                margin-bottom: 1.5rem;
                overflow-x: auto;
                width: 100%;
              }
              .buudy-policy-content table {
                border-collapse: collapse;
                min-width: 38rem;
                width: 100%;
              }
              .buudy-policy-content th,
              .buudy-policy-content td {
                border: 1px solid var(--border);
                padding: 0.75rem 1rem;
                text-align: left;
                vertical-align: top;
              }
              .buudy-policy-content th {
                background: rgba(58, 31, 61, 0.05);
                color: var(--plum);
                font-weight: 600;
              }
            `,
          }}
        />
      </div>
    </div>
  );
}
