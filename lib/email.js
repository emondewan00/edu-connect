"use server ";

import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (emailInfo) => {
  if (!emailInfo) return null;
  // Send emails here using resend.dev API and EmailTemplate component.
  const responses = await Promise.all(
    emailInfo.map(async (info) => {
      try {
        if (!info) return null;
        const { to, subject, message } = info;
        const sendIfo = await resend.emails.send({
          from: "EDUCONNECT <onboarding@resend.dev>",
          to,
          subject,
          react: EmailTemplate({ message }),
        });
        return sendIfo;
      } catch (error) {
        return { error: error.message || "Failed to send email", ok: false };
      }
    })
  );
  return responses;
};
