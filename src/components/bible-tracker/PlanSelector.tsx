"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { selectPlan } from "@/app/bible-tracker/actions";
import { handleSignOut } from "@/app/bible-tracker/logout-action";
import { useState } from "react";
import { Globe, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface Plan {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  language: string;
}

export default function PlanSelector({
  plans,
  userId,
}: {
  plans: Plan[];
  userId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [language, setLanguage] = useState<"pt" | "en">("pt");

  const filteredPlans = plans.filter((p) => p.language === language);

  const handleSelect = async (slug: string) => {
    setLoading(true);
    setSelectedSlug(slug);

    const result = await selectPlan(userId, slug, language);

    if (!result.success) {
      alert(result.error);
      setLoading(false);
      setSelectedSlug(null);
    } else {
      // Force a refresh to show the dashboard
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl w-full">
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSignOut()}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            {language === "pt" ? "Sair" : "Sign Out"}
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {language === "pt"
              ? "Escolha seu Plano de Leitura"
              : "Choose Your Reading Plan"}
          </h1>
          <p className="text-gray-600">
            {language === "pt"
              ? "Selecione o plano que melhor se adapta ao seu estudo bíblico"
              : "Select the plan that best fits your Bible study"}
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => setLanguage("pt")}
            variant={language === "pt" ? "default" : "outline"}
            className="gap-2"
          >
            <Globe className="h-4 w-4" />
            🇧🇷 Português
          </Button>
          <Button
            onClick={() => setLanguage("en")}
            variant={language === "en" ? "default" : "outline"}
            className="gap-2"
          >
            <Globe className="h-4 w-4" />
            🇺🇸 English
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <Card
              key={plan.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <CardTitle className="text-xl">{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => handleSelect(plan.slug)}
                  disabled={loading}
                  className="w-full"
                  variant={selectedSlug === plan.slug ? "default" : "outline"}
                >
                  {loading && selectedSlug === plan.slug
                    ? language === "pt"
                      ? "Selecionando..."
                      : "Selecting..."
                    : language === "pt"
                    ? "Selecionar"
                    : "Select"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
