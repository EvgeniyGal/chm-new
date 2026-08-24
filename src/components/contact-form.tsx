"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { sendContactMessage, type ContactResult } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initial: ContactResult = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("contacts");

  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? t("sending") : t("send")}
    </Button>
  );
}

export function ContactForm() {
  const t = useTranslations("contacts");
  const [state, formAction] = useActionState(sendContactMessage, initial);

  useEffect(() => {
    if (state.success) {
      toast.success(t("success"));
    } else if (state.error) {
      toast.error(t("error"));
    }
  }, [state, t]);

  return (
    <form action={formAction} className="relative space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t("name")}</Label>
          <Input id="name" name="name" required minLength={2} autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">{t("phone")}</Label>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea id="message" name="message" required minLength={10} />
      </div>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <SubmitButton />
    </form>
  );
}
