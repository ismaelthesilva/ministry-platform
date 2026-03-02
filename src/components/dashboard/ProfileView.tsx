"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail, LogOut, Save, Edit2, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  updateProfile,
  type UpdateProfileData,
} from "@/app/dashboard/profile/actions";
import { useRouter } from "next/navigation";

interface ProfileViewProps {
  user: {
    id?: string;
    name?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    image?: string | null;
    country?: string | null;
    phone?: string | null;
    gender?: string | null;
    religion?: string | null;
    age?: number | null;
    favBook?: string | null;
    favVerse?: string | null;
  };
}

export function ProfileView({ user }: ProfileViewProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [formData, setFormData] = useState<UpdateProfileData>({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    country: user.country || "",
    phone: user.phone || "",
    gender: user.gender || "",
    religion: user.religion || "",
    age: user.age || undefined,
    favBook: user.favBook || "",
    favVerse: user.favVerse || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const result = await updateProfile(formData);

    if (result.success) {
      setMessage({ type: "success", text: result.message });
      setIsEditing(false);
      router.refresh();
    } else {
      setMessage({ type: "error", text: result.message });
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      country: user.country || "",
      phone: user.phone || "",
      gender: user.gender || "",
      religion: user.religion || "",
      age: user.age || undefined,
      favBook: user.favBook || "",
      favVerse: user.favVerse || "",
    });
    setIsEditing(false);
    setMessage(null);
  };

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit2 className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Message Display */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-900 border border-green-200"
              : "bg-red-50 text-red-900 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Personal Information Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Your basic personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email (Read-only) */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={user.email || ""}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                {isEditing ? (
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="Enter your first name"
                  />
                ) : (
                  <p className="text-base p-2 rounded border bg-muted/50">
                    {user.firstName || "-"}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                {isEditing ? (
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder="Enter your last name"
                  />
                ) : (
                  <p className="text-base p-2 rounded border bg-muted/50">
                    {user.lastName || "-"}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gender */}
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                {isEditing ? (
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-base p-2 rounded border bg-muted/50 capitalize">
                    {user.gender?.replace("-", " ") || "-"}
                  </p>
                )}
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                {isEditing ? (
                  <Input
                    id="age"
                    type="number"
                    min="1"
                    max="150"
                    value={formData.age || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        age: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    placeholder="Enter your age"
                  />
                ) : (
                  <p className="text-base p-2 rounded border bg-muted/50">
                    {user.age || "-"}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                {isEditing ? (
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    placeholder="Enter your country"
                  />
                ) : (
                  <p className="text-base p-2 rounded border bg-muted/50">
                    {user.country || "-"}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="text-base p-2 rounded border bg-muted/50">
                    {user.phone || "-"}
                  </p>
                )}
              </div>
            </div>

            {/* Religion */}
            <div className="space-y-2">
              <Label htmlFor="religion">Religion</Label>
              {isEditing ? (
                <Input
                  id="religion"
                  value={formData.religion}
                  onChange={(e) =>
                    setFormData({ ...formData, religion: e.target.value })
                  }
                  placeholder="Enter your religion"
                />
              ) : (
                <p className="text-base p-2 rounded border bg-muted/50">
                  {user.religion || "-"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bible Preferences Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Bible Preferences</CardTitle>
            <CardDescription>
              Your favorite Bible passages and books
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Favorite Book */}
            <div className="space-y-2">
              <Label htmlFor="favBook">Favorite Bible Book</Label>
              {isEditing ? (
                <Input
                  id="favBook"
                  value={formData.favBook}
                  onChange={(e) =>
                    setFormData({ ...formData, favBook: e.target.value })
                  }
                  placeholder="e.g., Psalms, John, Genesis"
                />
              ) : (
                <p className="text-base p-2 rounded border bg-muted/50">
                  {user.favBook || "-"}
                </p>
              )}
            </div>

            {/* Favorite Verse */}
            <div className="space-y-2">
              <Label htmlFor="favVerse">Favorite Bible Verse</Label>
              {isEditing ? (
                <Input
                  id="favVerse"
                  value={formData.favVerse}
                  onChange={(e) =>
                    setFormData({ ...formData, favVerse: e.target.value })
                  }
                  placeholder="e.g., John 3:16, Psalms 23:1"
                />
              ) : (
                <p className="text-base p-2 rounded border bg-muted/50">
                  {user.favVerse || "-"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {isEditing && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Button type="submit" disabled={loading} className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>

      {/* Account Actions Card */}
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
    </div>
  );
}
