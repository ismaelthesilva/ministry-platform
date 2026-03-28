"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
// Future providers (kept for re-activation):
// import { signIn as signInWebAuthn } from "next-auth/webauthn";
import { loginWithCredentials, registerAccount } from "./actions";
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

function SubmitButton({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? pendingLabel : label}
    </Button>
  );
}

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loginState, loginDispatch] = useActionState(
    loginWithCredentials,
    undefined
  );
  const [registerState, registerDispatch] = useActionState(
    registerAccount,
    undefined
  );

  const error = mode === "login" ? loginState?.error : registerState?.error;

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
            {mode === "login" ? "Sign in" : "Create account"}
          </CardTitle>
          <CardDescription className="text-center">
            {mode === "login"
              ? "Enter your credentials to access the platform"
              : "Fill in the details below to create your account"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {mode === "login" ? (
            <form action={loginDispatch} className="space-y-4">
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

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md px-3 py-2"
                >
                  {error}
                </p>
              )}

              <SubmitButton label="Sign in" pendingLabel="Signing in…" />
            </form>
          ) : (
            <form action={registerDispatch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input
                  id="reg-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <Input
                  id="reg-password"
                  type="password"
                  name="password"
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input
                  id="confirm"
                  type="password"
                  name="confirm"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md px-3 py-2"
                >
                  {error}
                </p>
              )}

              <SubmitButton
                label="Create account"
                pendingLabel="Creating account…"
              />
            </form>
          )}

          {/* Future: Magic link & Passkey buttons go here */}

          <div className="mt-5 text-center space-y-2">
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              {mode === "login"
                ? "Don't have an account? Create one"
                : "Already have an account? Sign in"}
            </button>

            <div>
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="mt-6 text-xs text-muted-foreground text-center max-w-xs">
        This platform is restricted to registered members of the Ministry.
      </p>
    </div>
  );
}
