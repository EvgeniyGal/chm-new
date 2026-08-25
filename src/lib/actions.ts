"use server";

import { z } from "zod";
import Mailgun from "mailgun.js";
import MailgunFormData from "form-data";
import { site } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10),
  // Honeypot — must stay empty. Do not name this "website" (browsers autofill it).
  company_url_hp: z.string().optional(),
});

export type ContactResult = {
  success: boolean;
  error?: "validation" | "config" | "send";
};

export async function sendContactMessage(
  _prev: ContactResult,
  formData: globalThis.FormData,
): Promise<ContactResult> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
    company_url_hp: formData.get("company_url_hp") || "",
  });

  if (!parsed.success) {
    return { success: false, error: "validation" };
  }

  if (parsed.data.company_url_hp) {
    return { success: true };
  }

  const apiKey = process.env.MAILGUN_API_KEY?.trim();
  const domain = process.env.MAILGUN_DOMAIN?.trim();
  const from = process.env.MAILGUN_FROM?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.email;
  const apiUrl =
    process.env.MAILGUN_API_URL?.trim() || "https://api.mailgun.net";

  if (!apiKey || !domain || !from) {
    console.error("Mailgun is not configured: missing MAILGUN_API_KEY, MAILGUN_DOMAIN, or MAILGUN_FROM");
    return { success: false, error: "config" };
  }

  if (from.includes("your-mailgun-domain") || from.includes("your-verified-mailgun-domain")) {
    console.error("Mailgun MAILGUN_FROM still uses a placeholder domain");
    return { success: false, error: "config" };
  }

  const { name, email, phone, message } = parsed.data;

  try {
    const mailgun = new Mailgun(MailgunFormData);
    const client = mailgun.client({ username: "api", key: apiKey, url: apiUrl });

    await client.messages.create(domain, {
      from,
      to: [to],
      "h:Reply-To": email,
      subject: `Заявка з сайту Чорномормонтаж — ${name}`,
      html: `
        <h2>Нова заявка з сайту</h2>
        <p><strong>Ім’я:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Телефон:</strong> ${escapeHtml(phone || "—")}</p>
        <p><strong>Повідомлення:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Mailgun send failed:", error);
    return { success: false, error: "send" };
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
