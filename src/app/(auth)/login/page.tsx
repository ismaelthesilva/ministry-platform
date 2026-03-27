"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
import { sendMagicLink } from "./actions";
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
import { MailCheck, Fingerprint } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Sending link…" : "Send magic link"}
    </Button>
  );
}

export default function LoginPage() {
  const [state, dispatch] = useActionState(sendMagicLink, undefined);

  if (state?.sent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
        <Card className="w-full max-w-sm shadow-lg text-center">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex justify-center mb-2">
              <MailCheck className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Check your email
            </CardTitle>
            <CardDescription>
              We sent a magic link to your inbox. Click it to sign in — no
              password needed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              ← Back to home
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      {/* Logo */}
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
            Sign in
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and we&apos;ll send you a magic link
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={dispatch} className="space-y-4">
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
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase text-muted-foreground">
              <span className="bg-background px-2">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full gap-2"
            onClick={() => signIn("passkey")}
          >
            <Fingerprint className="h-4 w-4 text-blue-500" />
            Sign in with Passkey
          </Button>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              ← Back to home
            </Link>
          </div>
        </CardContent>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground text-center max-w-xs">
        This platform is restricted to registered members of the Ministry.
      </p>
    </div>
  );
}
