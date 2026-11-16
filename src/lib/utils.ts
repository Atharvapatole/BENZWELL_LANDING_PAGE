import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateWhatsAppSalesLink(productName?: string) {
  const base = "https://wa.me/919923407176";
  if (!productName) {
    const text = encodeURIComponent(
      "Hello ATHANG IMPEX,\n\nI visited your website and would like to discuss your dehydrated food products.\n\nPlease share further information about your products and business."
    );
    return `${base}?text=${text}`;
  }
  const text = encodeURIComponent(
    `Hello ATHANG IMPEX,\n\nI visited your website and would like to enquire about ${productName}.\n\nPlease share product specifications, packaging options, and commercial details.`
  );
  return `${base}?text=${text}`;
}

export function generateWhatsAppChatbotLink() {
  const base = "https://wa.me/17111647464";
  const text = encodeURIComponent(
    "Hello ATHANG IMPEX AI Assistant. I would like to learn more about your company and products."
  );
  return `${base}?text=${text}`;
}
