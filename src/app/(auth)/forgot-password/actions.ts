"use server";

import prisma from "@/lib/prisma";
import resend from "@/lib/resend";
import crypto from "crypto";

export async function requestPasswordReset(
  _prevState: { message?: string; error?: string } | undefined,
  formData: FormData
): Promise<{ message?: string; error?: string }> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  if (!email) return { error: "Email is required." };

  // Always return the same message to prevent email enumeration
  const ok = {
    message:
      "If this email is registered, you'll receive a reset link shortly.",
  };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return ok;

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.user.update({
    where: { email },
    data: { resetToken: token, resetTokenExpiry: expiry },
  });

  const baseUrl = process.env.AUTH_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: "Reset your Ministry Platform password",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#1e40af">Reset Your Password</h2>
        <p>You requested a password reset for your Ministry Platform account.</p>
        <p style="margin:24px 0">
          <a href="${resetUrl}"
             style="background:#2563eb;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:600">
            Reset Password
          </a>
        </p>
        <p style="color:#6b7280;font-size:14px">This link expires in 1 hour.</p>
        <p style="color:#6b7280;font-size:14px">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });

  return ok;
}
