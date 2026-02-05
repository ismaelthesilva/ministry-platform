"use client";

import { useState, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { authenticate, register } from "./actions";
import { useRouter } from "next/navigation";

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
    >
      {pending ? "Creating account..." : "Create account"}
    </button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginErrorMessage, loginDispatch] = useActionState(
    authenticate,
    undefined,
  );
  const [registerState, registerDispatch] = useActionState(register, undefined);

  // Redirect on successful login
  useEffect(() => {
    if (loginErrorMessage === null) {
      router.push("/dashboard");
    }
  }, [loginErrorMessage, router]);

  if (registerState?.success) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded shadow">
          <h1 className="text-2xl font-semibold mb-4 text-green-600">
            Account created!
          </h1>
          <p className="mb-4">
            Your account has been created successfully. Please sign in.
          </p>
          <button
            onClick={() => {
              setIsRegistering(false);
              window.location.reload();
            }}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Sign In
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">
          {isRegistering ? "Create Account" : "Sign in"}
        </h1>

        {!isRegistering ? (
          <form action={loginDispatch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border rounded px-3 py-2"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="w-full border rounded px-3 py-2"
                placeholder="••••••••"
                required
              />
            </div>

            {loginErrorMessage && (
              <p className="text-sm text-red-600">{loginErrorMessage}</p>
            )}

            <LoginButton />

            <p className="text-sm text-center">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="text-blue-600 hover:underline"
              >
                Create one
              </button>
            </p>
          </form>
        ) : (
          <form action={registerDispatch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                className="w-full border rounded px-3 py-2"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border rounded px-3 py-2"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="w-full border rounded px-3 py-2"
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>

            {registerState?.error && (
              <p className="text-sm text-red-600">{registerState.error}</p>
            )}

            <RegisterButton />

            <p className="text-sm text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="text-blue-600 hover:underline"
              >
                Sign in
              </button>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
