import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Clock, 
  FileText, 
  BarChart3,
  Timer,
  ScrollText,
  Star,
  TrendingUp,
  Brain,
  Target,
  Lightbulb
} from 'lucide-react';

interface ChapterStatsProps {
  chapterNumber: number;
  scriptureWordCount: number;
  commentaryWordCount: number;
  verseCount: number;
  estimatedReadingTime?: number; // in minutes
  themes?: string[];
  crossReferences?: number;
  keyWords?: string[];
  difficultyLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  studyProgress?: number; // percentage 0-100
}

// Average reading speeds (words per minute)
const AVERAGE_READING_SPEED = 200; // WPM for adults
const STUDY_READING_SPEED = 100; // WPM for careful study reading
const WORDS_PER_PAGE = 250; // Typical book page

const ChapterStats: React.FC<ChapterStatsProps> = ({
  chapterNumber,
  scriptureWordCount,
  commentaryWordCount,
  verseCount,
  themes = [],
  crossReferences = 0,
  keyWords = [],
  difficultyLevel = 'Intermediate',
  studyProgress = 0
}) => {
  const totalWords = scriptureWordCount + commentaryWordCount;
  const estimatedPages = Math.ceil(totalWords / WORDS_PER_PAGE);
  
  // Calculate reading times
  const scriptureReadingTime = Math.ceil(scriptureWordCount / AVERAGE_READING_SPEED);
  const commentaryReadingTime = Math.ceil(commentaryWordCount / STUDY_READING_SPEED);
  const totalReadingTime = scriptureReadingTime + commentaryReadingTime;
  
  // Calculate complexity metrics
  const averageVerseLength = Math.round(scriptureWordCount / verseCount);
  const commentaryRatio = Math.round((commentaryWordCount / scriptureWordCount) * 100);
  
  // Difficulty level styling
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
    }
  };
  
  // Format time display
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          Chapter {chapterNumber} Statistics
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge className={getDifficultyColor(difficultyLevel)}>
            {difficultyLevel}
          </Badge>
          {studyProgress > 0 && (
            <Badge variant="outline" className="text-xs">
              <Target className="h-3 w-3 mr-1" />
              {studyProgress}% Complete
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Study Progress Bar */}
        {studyProgress > 0 && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Study Progress</span>
                <span>{studyProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${studyProgress}%` }}
                ></div>
              </div>
            </div>
            <Separator />
          </>
        )}
        
        {/* Scripture Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Scripture (NKJV)</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {formatNumber(scriptureWordCount)} words
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <ScrollText className="h-3 w-3" />
              {verseCount} verses ({averageVerseLength} avg/verse)
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTime(scriptureReadingTime)} read
            </span>
          </div>
        </div>

        <Separator />

        {/* Commentary Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Commentary</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {formatNumber(commentaryWordCount)} words
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {commentaryRatio}% vs scripture
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTime(commentaryReadingTime)} study
            </span>
          </div>
        </div>

        <Separator />

        {/* Chapter Analysis */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-medium">Chapter Analysis</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <div className="text-lg font-bold text-indigo-700 dark:text-indigo-300">
                {themes.length}
              </div>
              <div className="text-xs text-indigo-600 dark:text-indigo-400">
                Key Themes
              </div>
            </div>
            
            <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
                {crossReferences}
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400">
                Cross Refs
              </div>
            </div>
          </div>

          {/* Key Words */}
          {keyWords.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Lightbulb className="h-3 w-3 text-amber-600" />
                <span className="text-xs font-medium">Key Terms:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {keyWords.slice(0, 4).map((word, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {word}
                  </Badge>
                ))}
                {keyWords.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{keyWords.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Total Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Total Content</span>
            <Badge variant="outline" className="font-semibold">
              {formatNumber(totalWords)} words
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                {estimatedPages}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Book Pages
              </div>
            </div>
            
            <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-lg font-bold text-green-700 dark:text-green-300">
                {formatTime(totalReadingTime)}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                Total Time
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Reading Guide */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Reading Guide:
          </div>
          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>• Quick overview:</span>
              <span>{formatTime(Math.ceil(totalWords / (AVERAGE_READING_SPEED * 1.5)))}</span>
            </div>
            <div className="flex justify-between">
              <span>• Study read:</span>
              <span>{formatTime(totalReadingTime)}</span>
            </div>
            <div className="flex justify-between">
              <span>• Deep meditation:</span>
              <span>{formatTime(Math.ceil(totalWords / (STUDY_READING_SPEED * 0.6)))}</span>
            </div>
          </div>
        </div>

        {/* Study Tips */}
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-500" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Study Tips:
            </span>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            {difficultyLevel === 'Beginner' && (
              <div>• Start with the Scripture tab, then explore commentary</div>
            )}
            {difficultyLevel === 'Advanced' && (
              <div>• Pay attention to Greek notes and cross-references</div>
            )}
            <div>• Use the Interactive tab to track your progress</div>
            <div>• Take notes in the Application section</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1 mb-1">
            <Timer className="h-3 w-3" />
            Reading speeds: 200 WPM normal, 100 WPM study
          </div>
          <div>Study time includes reflection & application</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChapterStats;
