"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface ProfileViewProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function ProfileView({ user }: ProfileViewProps) {
  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Account Information
          </CardTitle>
          <CardDescription>
            Your personal information and account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user.name && (
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Name
                </p>
                <p className="text-base font-semibold">{user.name}</p>
              </div>
              <Badge variant="outline">User</Badge>
            </div>
          )}

          {user.email && (
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <p className="text-base font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
              </div>
              <Badge variant="secondary">Verified</Badge>
            </div>
          )}

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                User ID
              </p>
              <p className="text-sm font-mono text-muted-foreground">
                {user.id}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
          <CardDescription>
            Manage your account settings and security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base">About Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your account is secured with NextAuth.js authentication. All your
            reading progress and preferences are safely stored and synced across
            devices.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
