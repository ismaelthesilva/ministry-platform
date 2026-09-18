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
import { useLanguage } from "@/context/LanguageContext";
import {
  updateProfile,
  updateEmail,
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
  const { t } = useLanguage();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Email update state
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email || "");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState<{
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

  const handleEmailSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setEmailLoading(true);
    setEmailMessage(null);
    const result = await updateEmail(newEmail);
    if (result.success) {
      setEmailMessage({ type: "success", text: result.message });
      setIsEditingEmail(false);
      router.refresh();
    } else {
      setEmailMessage({ type: "error", text: result.message });
    }
    setEmailLoading(false);
  };

  return (
    <div className="container max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("profile.title")}
          </h1>
          <p className="text-muted-foreground">{t("profile.subtitle")}</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit2 className="mr-2 h-4 w-4" />
            {t("profile.editProfile")}
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
              {t("profile.personalInfo")}
            </CardTitle>
            <CardDescription>{t("profile.personalInfoDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {t("profile.email")}
              </Label>
              {isEditingEmail ? (
                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder={t("profile.enterEmail")}
                    required
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleEmailSubmit();
                      }
                    }}
                  />
                  {emailMessage && (
                    <p
                      className={`text-xs px-3 py-2 rounded border ${
                        emailMessage.type === "success"
                          ? "text-green-700 bg-green-50 border-green-200"
                          : "text-red-700 bg-red-50 border-red-200"
                      }`}
                    >
                      {emailMessage.text}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      disabled={emailLoading}
                      onClick={() => handleEmailSubmit()}
                    >
                      <Save className="mr-1 h-3 w-3" />
                      {emailLoading ? t("profile.saving") : t("profile.save")}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={emailLoading}
                      onClick={() => {
                        setIsEditingEmail(false);
                        setNewEmail(user.email || "");
                        setEmailMessage(null);
                      }}
                    >
                      <X className="mr-1 h-3 w-3" />
                      {t("profile.cancel")}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={user.email || ""}
                    disabled
                    className="bg-muted"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="min-w-[44px] min-h-[44px]"
                    onClick={() => {
                      setNewEmail(user.email || "");
                      setEmailMessage(null);
                      setIsEditingEmail(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              {!isEditingEmail && emailMessage && (
                <p
                  className={`text-xs px-3 py-2 rounded border ${
                    emailMessage.type === "success"
                      ? "text-green-700 bg-green-50 border-green-200"
                      : "text-red-700 bg-red-50 border-red-200"
                  }`}
                >
                  {emailMessage.text}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("profile.firstName")}</Label>
                {isEditing ? (
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder={t("profile.firstNamePlaceholder")}
                  />
                ) : (
                  <p className="text-base p-2 rounded border bg-muted/50">
                    {user.firstName || "-"}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("profile.lastName")}</Label>
                {isEditing ? (
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder={t("profile.lastNamePlaceholder")}
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
                <Label htmlFor="gender">{t("profile.gender")}</Label>
                {isEditing ? (
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder={t("profile.selectGender")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t("profile.male")}</SelectItem>
                      <SelectItem value="female">
                        {t("profile.female")}
                      </SelectItem>
                      <SelectItem value="other">
                        {t("profile.other")}
                      </SelectItem>
                      <SelectItem value="prefer-not-to-say">
                        {t("profile.preferNotToSay")}
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
                <Label htmlFor="age">{t("profile.age")}</Label>
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
                    placeholder={t("profile.agePlaceholder")}
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
                <Label htmlFor="country">{t("profile.country")}</Label>
                {isEditing ? (
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    placeholder={t("profile.countryPlaceholder")}
                  />
                ) : (
                  <p className="text-base p-2 rounded border bg-muted/50">
                    {user.country || "-"}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">{t("profile.phone")}</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder={t("profile.phonePlaceholder")}
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
              <Label htmlFor="religion">{t("profile.religion")}</Label>
              {isEditing ? (
                <Input
                  id="religion"
                  value={formData.religion}
                  onChange={(e) =>
                    setFormData({ ...formData, religion: e.target.value })
                  }
                  placeholder={t("profile.religionPlaceholder")}
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
            <CardTitle>{t("profile.biblePreferences")}</CardTitle>
            <CardDescription>
              {t("profile.biblePreferencesDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Favorite Book */}
            <div className="space-y-2">
              <Label htmlFor="favBook">{t("profile.favBook")}</Label>
              {isEditing ? (
                <Input
                  id="favBook"
                  value={formData.favBook}
                  onChange={(e) =>
                    setFormData({ ...formData, favBook: e.target.value })
                  }
                  placeholder={t("profile.favBookPlaceholder")}
                />
              ) : (
                <p className="text-base p-2 rounded border bg-muted/50">
                  {user.favBook || "-"}
                </p>
              )}
            </div>

            {/* Favorite Verse */}
            <div className="space-y-2">
              <Label htmlFor="favVerse">{t("profile.favVerse")}</Label>
              {isEditing ? (
                <Input
                  id="favVerse"
                  value={formData.favVerse}
                  onChange={(e) =>
                    setFormData({ ...formData, favVerse: e.target.value })
                  }
                  placeholder={t("profile.favVersePlaceholder")}
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
                  {loading ? t("profile.saving") : t("profile.saveChanges")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1"
                >
                  <X className="mr-2 h-4 w-4" />
                  {t("profile.cancel")}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>

      {/* Account Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t("profile.accountActions")}</CardTitle>
          <CardDescription>{t("profile.accountActionsDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t("profile.signOut")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
