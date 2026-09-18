"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { requestPasswordReset } from "./actions";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Sending…" : "Send reset link"}
    </Button>
  );
}

export default function ForgotPasswordPage() {
  const [state, formAction] = useActionState(requestPasswordReset, undefined);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <Link href="/" className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 relative">
          <Image
            src="/logo-ministry1.png"
            alt="Ismael Silva Ministry Logo"
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-gray-900 dark:text-white text-sm leading-tight">
            ISMAEL SILVA
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
            Ministry Platform
          </span>
        </div>
      </Link>

      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold text-center">
            Forgot password?
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and we&apos;ll send you a reset link.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {state?.message ? (
            <div className="space-y-4">
              <p className="text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md px-3 py-2">
                {state.message}
              </p>
              <Link
                href="/login"
                className="block text-center text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                ← Back to sign in
              </Link>
            </div>
          ) : (
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              {state?.error && (
                <p
                  role="alert"
                  className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md px-3 py-2"
                >
                  {state.error}
                </p>
              )}

              <SubmitButton />

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                >
                  ← Back to sign in
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
