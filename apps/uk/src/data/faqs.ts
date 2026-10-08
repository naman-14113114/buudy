export type FaqItem = {
  question: string;
  answerHtml: string;
};

export const faqsData: FaqItem[] = [
  {
    question: "What is a return policy?",
    answerHtml: `
      <ul class="list-disc pl-5 space-y-2 text-sm leading-6">
        <li>Returns are accepted within 30 days of delivery strictly for damaged, defective, incorrect, or missing products with photo or video evidence and prior written return authorization from <a href="mailto:support@buudy.co.uk" class="underline text-[var(--plum)] font-semibold">support@buudy.co.uk</a>.</li>
        <li>Change-of-mind or personal-preference returns are not accepted. Items must never be returned to the package or sender address without written authorization.</li>
        <li>Once an authorized return is received and inspected, approved refunds are initiated within 5–10 business days to the original payment method. Read our complete <a href="/policies/return-policy" class="underline text-[var(--plum)] font-semibold">Return Policy</a>.</li>
      </ul>
    `
  },
  {
    question: "What is the Shipping Policy?",
    answerHtml: `
      <div class="space-y-4 text-sm leading-6 text-[var(--muted)]">
        <p>We offer free tracked shipping on qualifying orders. Orders are processed within 1–3 business days and shipped with a fully tracked courier service.</p>
        <p>After dispatch, standard transit takes 7–20 business days. Tracking information may take 24–72 hours after dispatch to update in the carrier system.</p>
        <p>Read the complete <a href="/policies/shipping-policy" class="underline text-[var(--plum)] font-semibold">Shipping Policy</a> for pre-order guidance, tracking details, and address-change instructions (within 2 hours of order placement).</p>
      </div>
    `
  },
  {
    question: "How do I place my order?",
    answerHtml: `
      <p class="text-sm leading-6">Simply choose your style on the product page, then click the "Add to cart" button and follow the simple steps to complete your order.</p>
      <p class="mt-2 text-sm leading-6">We'll prepare your order and let you know when it is on its way.</p>
    `
  },
  {
    question: "When will my orders be delivered?",
    answerHtml: `
      <p class="text-sm leading-6">Orders are processed within 1–3 business days and sent with a fully tracked courier service. Once dispatched, standard delivery transit takes 7–20 business days depending on the destination. Read the complete <a href="/policies/shipping-policy" class="underline text-[var(--plum)] font-semibold">Shipping Policy</a>.</p>
    `
  },
  {
    question: "How do I track my order?",
    answerHtml: `
      <p class="text-sm leading-6">Once your order has been dispatched, you will automatically receive a shipping confirmation email containing your tracking number and direct courier link to track your parcel's journey.</p>
    `
  },
  {
    question: "What are shipping costs?",
    answerHtml: `
      <p class="text-sm leading-6">We offer free tracked shipping on qualifying orders. Orders are processed within 1–3 business days and sent with a tracked courier service. Once dispatched, standard transit takes 7–20 business days. Read the full <a href="/policies/shipping-policy" class="underline text-[var(--plum)] font-semibold">Shipping Policy</a> or <a href="/pages/contact-us#contact-form" class="underline text-[var(--plum)] font-semibold">contact us</a> with questions.</p>
    `
  },
  {
    question: "How can I contact customer service?",
    answerHtml: `
      <p class="text-sm leading-6">You can reach our customer service through our <a href="/pages/contact-us#contact-form" class="underline text-[var(--plum)] font-semibold">Contact Us</a> page or by emailing <a href="mailto:support@buudy.co.uk" class="underline text-[var(--plum)] font-semibold">support@buudy.co.uk</a>.</p>
    `
  },
  {
    question: "My tracking number isn't working",
    answerHtml: `
      <p class="text-sm leading-6">Tracking updates can take 24–72 hours to appear in the shipping carrier's system after dispatch. If your tracking number is still not updating after that window, please email <a href="mailto:support@buudy.co.uk" class="underline text-[var(--plum)] font-semibold">support@buudy.co.uk</a> or use our <a href="/pages/contact-us#contact-form" class="underline text-[var(--plum)] font-semibold">Contact Form</a>.</p>
    `
  },
  {
    question: "What type of payments do you accept?",
    answerHtml: `
      <p class="text-sm leading-6">We accept Visa, Mastercard, American Express, JCB as well as Paypal.</p>
    `
  },
  {
    question: "When will my card be charged?",
    answerHtml: `
      <p class="text-sm leading-6">Just after your order has been successfully placed.</p>
    `
  },
  {
    question: "Why is Cleopatra written on the mask?",
    answerHtml: `
      <p class="text-sm leading-6">This is the genuine Cleopatra Edition LED Face Mask, supplied and distributed exclusively by Buudy in the UK. When you order from Buudy, you receive the authentic clinical multi-spectrum mask, backed by our official UK warranty, fast tracked UK delivery, and dedicated local customer support.</p>
    `
  },
  {
    question: "How secure is my personal information?",
    answerHtml: `
      <p class="text-sm leading-6">We adhere to the highest industry standards to protect your personal information when you checkout and purchase.</p>
      <p class="mt-2 text-sm leading-6">Your credit card information is encrypted during transmission using secure socket layer (SSL) technology, which is widely used on the Internet for processing payments. Your credit card information is only used to complete the requested transaction and is not subsequently stored.</p>
    `
  }
];
