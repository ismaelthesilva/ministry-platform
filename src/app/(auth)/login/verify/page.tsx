import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MailCheck } from "lucide-react";

export default function VerifyPage() {
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

      <Card className="w-full max-w-sm shadow-lg text-center">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex justify-center mb-2">
            <MailCheck className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>
            A magic link has been sent to your inbox. Click it to sign in — no
            password needed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Didn&apos;t receive it? Check your spam folder or{" "}
            <Link
              href="/login"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              try again
            </Link>
            .
          </p>
          <Link
            href="/"
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
          >
            ← Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
