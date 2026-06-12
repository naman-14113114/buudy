export type FaqItem = {
  question: string;
  answerHtml: string;
};

export const faqsData: FaqItem[] = [
  {
    question: "What is a return policy?",
    answerHtml: `
      <ul class="list-disc pl-5 space-y-2 text-sm leading-6">
        <li>If you have any issues with your order, please contact us via our <a href="/pages/contact-us#contact-form" class="underline text-[var(--plum)] font-semibold">Contact Form</a> within 07 business days of order delivery to explain your grievance. Our customer service department will then help provide a replacement or refund if deemed appropriate.</li>
        <li>There is no need to return your item under any circumstances. Please note that if you return your item without our prior request, we will not be responsible for any loss or additional costs resulting from your unapproved return.</li>
      </ul>
    `
  },
  {
    question: "What is the Shipping Policy?",
    answerHtml: `
      <div class="space-y-4 text-sm leading-6 text-[var(--muted)]">
        <p>We offer free worldwide tracked shipping. Orders are processed within 1 to 3 business days and shipped with a fully tracked courier service.</p>
        <p>After dispatch, transit normally takes 3 to 10 business days depending on the destination. Tracking information may take 1 to 2 business days to appear.</p>
        <p>Read the complete <a href="/shipping-policy" class="underline text-[var(--plum)] font-semibold">Shipping Policy</a> for pre-order guidance, tracking details, and address-change instructions.</p>
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
      <p class="text-sm leading-6">Orders are processed within 1 to 3 business days and sent with a fully tracked courier service. Once dispatched, transit normally takes 3 to 10 business days depending on the destination. Read the complete <a href="/shipping-policy" class="underline text-[var(--plum)] font-semibold">Shipping Policy</a>.</p>
    `
  },
  {
    question: "What are shipping costs?",
    answerHtml: `
      <p class="text-sm leading-6">Shipping is free worldwide. Orders are processed within 1 to 3 business days and sent with a tracked courier service. Once dispatched, transit usually takes 3 to 10 business days. Read the full <a href="/shipping-policy" class="underline text-[var(--plum)] font-semibold">Shipping Policy</a> or <a href="/pages/contact-us#contact-form" class="underline text-[var(--plum)] font-semibold">contact us</a> with questions.</p>
    `
  },
  {
    question: "How can I contact customer service?",
    answerHtml: `
      <p class="text-sm leading-6">You can reach our customer service through our <a href="/pages/contact-us#contact-form" class="underline text-[var(--plum)] font-semibold">Contact Us</a> page or by emailing <a href="mailto:support@buudy.com" class="underline text-[var(--plum)] font-semibold">support@buudy.com</a>.</p>
    `
  },
  {
    question: "My tracking number isn't working",
    answerHtml: `
      <p class="text-sm leading-6">Tracking numbers can take 1 to 2 business days to appear in the shipping carrier's system. If your tracking number is still not working after that window, please email <a href="mailto:support@buudy.com" class="underline text-[var(--plum)] font-semibold">support@buudy.com</a> or use our <a href="/pages/contact-us#contact-form" class="underline text-[var(--plum)] font-semibold">Contact Form</a>.</p>
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
    question: "How secure is my personal information?",
    answerHtml: `
      <p class="text-sm leading-6">We adhere to the highest industry standards to protect your personal information when you checkout and purchase.</p>
      <p class="mt-2 text-sm leading-6">Your credit card information is encrypted during transmission using secure socket layer (SSL) technology, which is widely used on the Internet for processing payments. Your credit card information is only used to complete the requested transaction and is not subsequently stored.</p>
    `
  }
];
