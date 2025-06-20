import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  MessageSquare, 
  Lightbulb,
  Heart,
  Star,
  Eye,
  Target,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Verse {
  number: number;
  text: string;
  commentary: string;
  keyPoints: string[];
  application: string;
  greekNotes?: string;
  crossReferences?: string[];
}

const RevelationChapter: React.FC = () => {
  const { chapterNumber } = useParams<{ chapterNumber: string }>();
  const { tr } = useLanguage();
  const [selectedVerse, setSelectedVerse] = useState<number | null>(1);
  const [completedVerses, setCompletedVerses] = useState<Set<number>>(new Set());
  
  const chapter = parseInt(chapterNumber || '1');
  
  // Get chapter data from translations
  const chapterData = tr(`revelation.chapters.${chapter}`);
  const title = chapterData?.title || `Chapter ${chapter}`;
  const summary = chapterData?.summary || 'Verse by verse study';
  const themes = chapterData?.themes || [];
  
  // Sample verses - replace with actual data from translations
  const verses: Verse[] = [
    {
      number: 1,
      text: tr(`revelation.chapters.${chapter}.verses.1.text`) || "The revelation from Jesus Christ, which God gave him to show his servants what must soon take place.",
      commentary: tr(`revelation.chapters.${chapter}.verses.1.commentary`) || "This opening verse establishes the divine origin and purpose of the entire book.",
      keyPoints: tr(`revelation.chapters.${chapter}.verses.1.keyPoints`) || [
        "Divine origin - from Jesus Christ",
        "Purpose - to show future events", 
        "Method - through angelic messenger"
      ],
      application: tr(`revelation.chapters.${chapter}.verses.1.application`) || "God desires to reveal His plans to His people.",
      greekNotes: "Ἀποκάλυψις (apokalypsis) - unveiling, revelation",
      crossReferences: ["Dan 2:28-29", "Rev 22:6", "Amos 3:7"]
    },
    {
      number: 2,
      text: tr(`revelation.chapters.${chapter}.verses.2.text`) || "who testifies to everything he saw—that is, the word of God and the testimony of Jesus Christ.",
      commentary: tr(`revelation.chapters.${chapter}.verses.2.commentary`) || "John serves as a faithful witness, emphasizing the reliability of what he records.",
      keyPoints: tr(`revelation.chapters.${chapter}.verses.2.keyPoints`) || [
        "John as faithful witness",
        "Word of God's authority", 
        "Jesus Christ's testimony"
      ],
      application: tr(`revelation.chapters.${chapter}.verses.2.application`) || "We too are called to be faithful witnesses.",
      crossReferences: ["John 19:35", "1 John 1:1-3", "John 21:24"]
    }
  ];

  const nextChapter = chapter < 22 ? chapter + 1 : null;
  const prevChapter = chapter > 1 ? chapter - 1 : null;

  const toggleVerseCompletion = (verseNumber: number) => {
    const newCompleted = new Set(completedVerses);
    if (newCompleted.has(verseNumber)) {
      newCompleted.delete(verseNumber);
    } else {
      newCompleted.add(verseNumber);
    }
    setCompletedVerses(newCompleted);
  };

  const currentVerse = verses.find(v => v.number === selectedVerse);
  const progress = (completedVerses.size / verses.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link to="/revelation">
                <Button variant="outline" size="sm" className="hover:bg-blue-50">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {tr('revelation.navigation.backToOverview')}
                </Button>
              </Link>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Revelation Chapter {chapter}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Progress: {Math.round(progress)}%
              </div>
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {summary}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Study Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="interactive" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="interactive" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Interactive
                </TabsTrigger>
                <TabsTrigger value="verses" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Scripture
                </TabsTrigger>
                <TabsTrigger value="commentary" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Commentary
                </TabsTrigger>
                <TabsTrigger value="application" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Application
                </TabsTrigger>
              </TabsList>
              
              {/* Interactive Study Tab */}
              <TabsContent value="interactive">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Verse Selection */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Select Verse to Study
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-2">
                          {verses.map((verse) => (
                            <div
                              key={verse.number}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                selectedVerse === verse.number
                                  ? 'bg-blue-50 border-blue-300 dark:bg-blue-900/20'
                                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                              }`}
                              onClick={() => setSelectedVerse(verse.number)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="min-w-8 h-6">
                                    {verse.number}
                                  </Badge>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleVerseCompletion(verse.number);
                                    }}
                                    className={`p-1 rounded ${
                                      completedVerses.has(verse.number)
                                        ? 'text-green-600'
                                        : 'text-gray-400 hover:text-green-600'
                                    }`}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                                  {verse.text}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Selected Verse Study */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Verse {selectedVerse} Study
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {currentVerse ? (
                        <ScrollArea className="h-[400px]">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Scripture</h4>
                              <p className="text-gray-800 dark:text-gray-200 leading-relaxed bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                                {currentVerse.text}
                              </p>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h4 className="font-semibold mb-2">Commentary</h4>
                              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                {currentVerse.commentary}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Lightbulb className="h-4 w-4" />
                                Key Points
                              </h4>
                              <ul className="space-y-1">
                                {currentVerse.keyPoints.map((point, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {currentVerse.greekNotes && (
                              <div>
                                <h4 className="font-semibold mb-2">Greek Notes</h4>
                                <p className="text-gray-700 dark:text-gray-300 text-sm italic bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                                  {currentVerse.greekNotes}
                                </p>
                              </div>
                            )}

                            {currentVerse.crossReferences && (
                              <div>
                                <h4 className="font-semibold mb-2">Cross References</h4>
                                <div className="flex flex-wrap gap-1">
                                  {currentVerse.crossReferences.map((ref, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {ref}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <Separator />
                            
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Heart className="h-4 w-4" />
                                Application
                              </h4>
                              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed bg-green-50 dark:bg-green-900/20 p-3 rounded">
                                {currentVerse.application}
                              </p>
                            </div>
                          </div>
                        </ScrollArea>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Select a verse to begin studying</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Scripture Tab */}
              <TabsContent value="verses">
                <Card>
                  <CardHeader>
                    <CardTitle>Chapter {chapter} - Complete Text</CardTitle>
                    <CardDescription>Read through the entire chapter</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-4">
                        {verses.map((verse) => (
                          <div key={verse.number} className="flex gap-3 p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-800">
                            <Badge variant="outline" className="min-w-8 h-6 flex items-center justify-center">
                              {verse.number}
                            </Badge>
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                              {verse.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Commentary Tab */}
              <TabsContent value="commentary">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Commentary</CardTitle>
                    <CardDescription>In-depth theological insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-6">
                        {verses.map((verse) => (
                          <div key={verse.number} className="border-l-4 border-blue-500 pl-4">
                            <h3 className="font-semibold text-lg mb-2">Verse {verse.number}</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                              {verse.commentary}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Key Points</h4>
                                <ul className="space-y-1">
                                  {verse.keyPoints.map((point, index) => (
                                    <li key={index} className="flex items-start gap-2"></li>
                                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-gray-700 dark:text-gray-300 text-sm">{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {verse.crossReferences && (
                                <div>
                                  <h4 className="font-semibold mb-2">Cross References</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {verse.crossReferences.map((ref, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {ref}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Application Tab */}
              <TabsContent value="application">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Practical Applications
                    </CardTitle>
                    <CardDescription>How to apply these truths to your life</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-6">
                        {verses.map((verse) => (
                          <div key={verse.number} className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg"></div>
                            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                              <Badge variant="outline">{verse.number}</Badge>
                              Personal Application
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {verse.application}
                            </p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            
            {/* Study Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Study Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Completed</span>
                    <span>{completedVerses.size}/{verses.length} verses</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-600 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Chapter Navigation */}
            <Card></Card>
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
                  {themes.map((theme: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/revelation">
                  <Button variant="ghost" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    All Chapters
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setCompletedVerses(new Set())}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Reset Progress
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevelationChapter;
