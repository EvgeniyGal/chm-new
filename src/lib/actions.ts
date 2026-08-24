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
  website: z.string().optional(),
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
    website: formData.get("website") || "",
  });

  if (!parsed.success) {
    return { success: false, error: "validation" };
  }

  if (parsed.data.website) {
    return { success: true };
  }

  const apiKey = process.env.MAILGUN_API_KEY?.trim();
  const domain = process.env.MAILGUN_DOMAIN?.trim();
  const from = process.env.MAILGUN_FROM?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.email;

  if (!apiKey || !domain || !from) {
    console.error("Mailgun is not configured: missing MAILGUN_API_KEY, MAILGUN_DOMAIN, or MAILGUN_FROM");
    return { success: false, error: "config" };
  }

  const { name, email, phone, message } = parsed.data;

  try {
    const mailgun = new Mailgun(MailgunFormData);
    const client = mailgun.client({ username: "api", key: apiKey });

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
