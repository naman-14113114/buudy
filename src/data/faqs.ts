export type FaqItem = {
  question: string;
  answerHtml: string;
};

export const faqsData: FaqItem[] = [
  {
    question: "What is a return policy?",
    answerHtml: `
      <ul class="list-disc pl-5 space-y-2 text-sm leading-6">
        <li>If you have any issues with your order, please contact us via our <strong>Contact Form</strong> within 07 business days of order delivery to explain your grievance. Our customer service department will then help provide a replacement or refund if deemed appropriate.</li>
        <li>There is no need to return your item under any circumstances. Please note that if you return your item without our prior request, we will not be responsible for any loss or additional costs resulting from your unapproved return.</li>
      </ul>
    `
  },
  {
    question: "What is the Shipping Policy?",
    answerHtml: `
      <div class="space-y-4 text-sm leading-6 text-[var(--muted)]">
        <h4 class="font-bold text-base text-[var(--plum)]">Overview</h4>
        <p>We currently offer free shipping to the United Kingdom, United States, Australia and Canada. Our warehouse is located in Rickmansworth.</p>
        <p>All orders are processed within 1 to 3 business days and shipped out using a fully tracked courier service.</p>
        <p>Rest-assured we are doing everything in our power to get your order to you as soon as possible. Once your order is dispatched, depending on your country or region, transit time is between 3 to 10 business days. Please consider any holidays that might impact delivery times.</p>
        <p>Due to the nature of the shipping business, delays are often inevitable, all our shipping times are therefore guidelines only and specific delivery dates are not guaranteed.</p>
        
        <h4 class="font-bold text-base text-[var(--plum)]">For pre-ordered or back-ordered items:</h4>
        <p>If your order contains a pre-ordered or back-ordered item, we will ship any items we have available immediately and ship the items that are pre-ordered or back-ordered immediately when we have them available. So if you ordered more than one item in a single order and received only a part of your item don't worry, you will receive your other items shortly after.</p>
        
        <h4 class="font-bold text-base text-[var(--plum)]">Tracking your order:</h4>
        <p>You will receive a confirmation email and/or text message containing a tracking ID and a link to follow the journey of your package. To track your package you can visit our Tracking Page. Please allow 1 to 2 business days for the tracking information to show.</p>
        
        <h4 class="font-bold text-base text-[var(--plum)]">Wrong address disclaimer:</h4>
        <p>It is the responsibility of the buyer to make sure that the shipping address entered is correct. We do our best to speed up processing and shipping time, so there is always a small window to correct an incorrect shipping address. Please contact us immediately if you believe you have provided an incorrect shipping address.</p>
        
        <h4 class="font-bold text-base text-[var(--plum)]">Contact Us</h4>
        <p>If you have any questions about our Shipping Policy, please contact us:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>By email: <a href="mailto:support@buudy.com" class="underline text-[var(--plum)] font-semibold">support@buudy.com</a></li>
          <li>By phone: <a href="tel:+9109310680342" class="underline text-[var(--plum)] font-semibold">+91 093106 80342</a></li>
          <li>Customer Service Hours: Monday to Friday, 9:00 AM to 5:00 PM EST</li>
        </ul>
      </div>
    `
  },
  {
    question: "How do I place my order?",
    answerHtml: `
      <p class="text-sm leading-6">Simply choose your style on the product page, then click the “Add To Cart” button and follow the simple steps to complete your order.</p>
      <p class="mt-2 text-sm leading-6">We’ll prepare your order and let you know when it's on its way!</p>
    `
  },
  {
    question: "When will my orders be delivered?",
    answerHtml: `
      <p class="text-sm leading-6">Orders are typically delivered within 4-13 days. The delivery time may vary depending on your location and the product.</p>
    `
  },
  {
    question: "What are shipping costs?",
    answerHtml: `
      <p class="text-sm leading-6">Shipping is free for all orders within the USA as well as internationally. If you have any questions, please feel free to <a href="/pages/contact" class="underline text-[var(--plum)] font-semibold">contact us</a>.</p>
    `
  },
  {
    question: "How can I contact customer service?",
    answerHtml: `
      <p class="text-sm leading-6">You can reach our customer service through our <a href="/pages/contact" class="underline text-[var(--plum)] font-semibold">Contact Us</a> page or by emailing <a href="mailto:support@buudy.com" class="underline text-[var(--plum)] font-semibold">support@buudy.com</a>.</p>
    `
  },
  {
    question: "My tracking number isn’t working",
    answerHtml: `
      <p class="text-sm leading-6">Tracking numbers can take 1-2 days to appear in the shipping carrier's system. Occasionally, the shipping carrier can lose an order. If the tracking number is still not working within a few days, please contact the shipping carrier or email us.</p>
    `
  },
  {
    question: "What type of payments do you accept?",
    answerHtml: `
      <p class="text-sm leading-6">We accept Visa, Mastercard as well as Paypal.</p>
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
