import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Heart
} from 'lucide-react';

interface Verse {
  number: number;
  text: string;
  commentary: string;
  keyPoints: string[];
  application: string;
}

interface RevelationChapterProps {
  chapterNumber: number;
  title: string;
  summary: string;
  verses: Verse[];
  themes: string[];
}

const RevelationChapter: React.FC<RevelationChapterProps> = ({
  chapterNumber,
  title,
  summary,
  verses,
  themes
}) => {
  const nextChapter = chapterNumber < 22 ? chapterNumber + 1 : null;
  const prevChapter = chapterNumber > 1 ? chapterNumber - 1 : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/revelation">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Overview
              </Button>
            </Link>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Revelation Chapter {chapterNumber}
            </Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {summary}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Scripture & Study</CardTitle>
                <CardDescription>Verse by verse study and commentary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {verses.map((verse) => (
                    <div key={verse.number} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex gap-3 mb-3">
                        <Badge variant="outline" className="min-w-8 h-6 flex items-center justify-center">
                          {verse.number}
                        </Badge>
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                          {verse.text}
                        </p>
                      </div>
                      
                      <div className="ml-11 space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Commentary</h4>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {verse.commentary}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Points</h4>
                          <ul className="space-y-1">
                            {verse.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700 dark:text-gray-300 text-sm">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            Application
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {verse.application}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Chapter Navigation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chapter Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {prevChapter && (
                  <Link to={`/revelation/${prevChapter}`}>
                    <Button variant="outline" className="w-full justify-start">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Chapter {prevChapter}
                    </Button>
                  </Link>
                )}
                {nextChapter && (
                  <Link to={`/revelation/${nextChapter}`}>
                    <Button variant="outline" className="w-full justify-start">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Chapter {nextChapter}
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Key Themes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Themes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {themes.map((theme, index) => (
                    <Badge key={index} variant="secondary">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Access */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/revelation">
                  <Button variant="ghost" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    All Chapters
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevelationChapter;
