"use server ";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmails = async (emailInfo) => {
  try {
    await resend.send({
      recipient: emailInfo.email,
      templateId: emailInfo.templateId,
      substitutions: emailInfo.substitutions,
    });
    return { message: "Email sent successfully", ok: true };
  } catch (error) {
    return { error: error.message || "Failed to send email", ok: false };
  }
};
