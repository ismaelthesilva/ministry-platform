import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, ArrowLeft, Construction, Book } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface RevelationChapterUnderResearchProps {
  chapterNumber: number;
}

const RevelationChapterUnderResearch: React.FC<
  RevelationChapterUnderResearchProps
> = ({ chapterNumber }) => {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/Revelation")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("revelation.backToIndex", "Back to Revelation Index")}
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-full mb-6">
            <Construction className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("revelation.title", "Revelation")} {chapterNumber}
          </h1>
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
            <Search className="h-4 w-4 mr-2" />
            {t("common.underResearch", "Under Research")}
          </Badge>
        </div>

        {/* Main Content */}
        <div className="grid gap-8">
          {/* Research Notice */}
          <Card className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800 dark:text-orange-300">
                <Book className="h-6 w-6 mr-2" />
                {t("revelation.research.title", "Study in Progress")}
              </CardTitle>
              <CardDescription className="text-orange-700 dark:text-orange-400">
                {t(
                  "revelation.research.subtitle",
                  "Preparing comprehensive biblical analysis"
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-orange-800 dark:text-orange-300">
                  {t(
                    "revelation.research.message",
                    "This chapter is currently under deep theological research and study. I am preparing a comprehensive analysis that will include:"
                  )}
                </p>
                <ul className="list-disc list-inside space-y-2 text-orange-700 dark:text-orange-400">
                  <li>
                    {t(
                      "revelation.research.verse",
                      "Verse-by-verse exposition"
                    )}
                  </li>
                  <li>
                    {t(
                      "revelation.research.greek",
                      "Original Greek text analysis"
                    )}
                  </li>
                  <li>
                    {t(
                      "revelation.research.historical",
                      "Historical and cultural context"
                    )}
                  </li>
                  <li>
                    {t(
                      "revelation.research.practical",
                      "Practical applications for today"
                    )}
                  </li>
                  <li>
                    {t(
                      "revelation.research.prophecy",
                      "Prophetic significance and interpretation"
                    )}
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-white dark:bg-orange-900/30 rounded-lg border border-orange-200 dark:border-orange-700">
                  <p className="text-sm text-orange-800 dark:text-orange-300 italic">
                    "
                    {t(
                      "revelation.research.quote",
                      "Every Scripture is God-breathed and profitable for teaching, for reproof, for correction, and for instruction in righteousness."
                    )}
                    " - 2 Timothy 3:16
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chapter Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-6 w-6 mr-2" />
                {t("revelation.chapter", "Chapter")} {chapterNumber}{" "}
                {t("common.info", "Information")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                    {t("revelation.coming.soon", "Coming Soon")}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t(
                      "revelation.preparation.message",
                      "This study is being carefully prepared with prayer and thorough research to provide the most accurate and spiritually enriching content possible."
                    )}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                    {t("revelation.notify.title", "Get Notified")}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t(
                      "revelation.notify.message",
                      "Check back regularly for updates, or follow our ministry for notifications when new studies are published."
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Button
              variant="outline"
              onClick={() =>
                chapterNumber > 1
                  ? router.push(`/Revelation/Revelation${chapterNumber - 1}`)
                  : router.push("/Revelation")
              }
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {chapterNumber > 1
                ? `${t("revelation.chapter", "Chapter")} ${chapterNumber - 1}`
                : t("revelation.index", "Index")}
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                chapterNumber < 22
                  ? router.push(`/Revelation/Revelation${chapterNumber + 1}`)
                  : router.push("/Revelation")
              }
              disabled={chapterNumber >= 22}
            >
              {chapterNumber < 22
                ? `${t("revelation.chapter", "Chapter")} ${chapterNumber + 1}`
                : t("revelation.index", "Index")}
              {chapterNumber < 22 && (
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevelationChapterUnderResearch;
