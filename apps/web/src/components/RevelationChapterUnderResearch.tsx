import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { BookOpen } from "lucide-react";

interface RevelationChapterUnderResearchProps {
  chapterNumber: number;
}

const RevelationChapterUnderResearch: React.FC<
  RevelationChapterUnderResearchProps
> = ({ chapterNumber }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <Card className="max-w-xl w-full border-l-4 border-l-purple-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-purple-700 dark:text-purple-300">
            <BookOpen className="h-8 w-8 text-purple-600" />
            Revelation {chapterNumber}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg text-gray-700 dark:text-gray-300">
            This chapter is under research and will be available soon.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevelationChapterUnderResearch;
