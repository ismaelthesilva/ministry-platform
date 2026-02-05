"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { selectPlan } from "@/app/dashboard/actions";
import { useState } from "react";
import { CheckCircle2, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  language: string;
}

interface PlansViewProps {
  plans: Plan[];
  userId: string;
  currentPlanId?: string;
}

export function PlansView({ plans, userId, currentPlanId }: PlansViewProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSelectPlan = async (planSlug: string, language: string) => {
    setLoading(planSlug);
    const result = await selectPlan(userId, planSlug, language);

    if (result.success) {
      router.push("/dashboard/readings");
      router.refresh();
    }
    setLoading(null);
  };

  // Group plans by slug (combining languages)
  const groupedPlans = plans.reduce(
    (acc, plan) => {
      if (!acc[plan.slug]) {
        acc[plan.slug] = [];
      }
      acc[plan.slug].push(plan);
      return acc;
    },
    {} as Record<string, Plan[]>,
  );

  const planDescriptions: Record<
    string,
    { title: string; description: string }
  > = {
    "bible-only": {
      title: "Bible Only",
      description:
        "Focus on daily Bible readings through the entire scripture in one year.",
    },
    prophetic: {
      title: "Prophetic Reading",
      description:
        "Combine Bible readings with prophetic commentary and devotional insights.",
    },
    classical: {
      title: "Classical Reading",
      description:
        "Bible readings paired with classical Christian literature and commentary.",
    },
  };

  return (
    <div className="container max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reading Plans</h1>
        <p className="text-muted-foreground">
          Choose a reading plan to guide your daily Bible study
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(groupedPlans).map(([slug, planGroup]) => {
          const info = planDescriptions[slug] || {
            title: planGroup[0].title,
            description: planGroup[0].description || "",
          };
          const isCurrentPlan = planGroup.some((p) => p.id === currentPlanId);

          return (
            <Card
              key={slug}
              className={cn(
                "flex flex-col transition-all hover:shadow-lg",
                isCurrentPlan && "border-primary",
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <BookOpen className="h-8 w-8 text-primary" />
                  {isCurrentPlan && (
                    <Badge variant="default">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Active
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-4">{info.title}</CardTitle>
                <CardDescription>{info.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Duration:</span> 366 days
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Available in:</span>
                  </div>
                  <div className="flex gap-2">
                    {planGroup.map((plan) => (
                      <Badge key={plan.id} variant="outline">
                        {plan.language === "pt" ? "🇧🇷 PT" : "🇺🇸 EN"}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                {planGroup.map((plan) => (
                  <Button
                    key={plan.id}
                    variant={
                      plan.id === currentPlanId ? "secondary" : "default"
                    }
                    className="flex-1"
                    onClick={() => handleSelectPlan(plan.slug, plan.language)}
                    disabled={
                      loading === plan.slug || plan.id === currentPlanId
                    }
                  >
                    {plan.id === currentPlanId
                      ? "Current Plan"
                      : plan.language === "pt"
                        ? "Select PT"
                        : "Select EN"}
                  </Button>
                ))}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>How it works</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>
                Select a reading plan that fits your spiritual growth goals
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>
                Follow daily readings designed to take you through the entire
                Bible in one year
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>
                Track your progress and mark readings as complete as you go
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>
                Switch plans anytime to explore different reading approaches
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
