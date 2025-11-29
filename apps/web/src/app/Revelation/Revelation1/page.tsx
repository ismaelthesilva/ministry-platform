import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Heart,
  Lightbulb,
  Quote,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface GreekTerm {
  term: string;
  meaning: string;
}

interface ChristTitle {
  title: string;
  meaning: string;
}

interface ChristDescription {
  feature: string;
  meaning: string;
  reference?: string;
}

interface Section {
  title: string;
  content: string;
  keyPoints?: string[];
  keyInsights?: string[];
  greekTerms?: GreekTerm[];
  theologicalInsights?: string[];
  christTitles?: ChristTitle[];
  christDescription?: ChristDescription[];
  practicalApplication?: string;
  crossReferences?: string[];
  symbolism?: Record<string, string>;
  response?: string;
  authority?: string;
  doxology?: string;
  alphaOmega?: string;
}

interface Verse {
  text: string;
  commentary: string;
  keyPoints: string[];
  application: string;
  greekNotes?: string;
  crossReferences?: string[];
}

interface ChapterData {
  title: string;
  subtitle?: string;
  summary: string;
  themes: string[];
  keyVerses: string[];
  epigraph?: string;
  sections: Record<string, Section>;
  verses: Record<string, Verse>;
  conclusion?: string;
  references?: string[];
}

const Revelation1: React.FC = () => {
  const { trObj, language } = useLanguage();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const chapterData = trObj("revelation.chapters.1") as ChapterData;
  const title =
    chapterData?.title || (language === "br" ? "Apocalipse 1" : "Revelation 1");
  const subtitle = chapterData?.subtitle || "";
  const summary =
    chapterData?.summary ||
    (language === "br"
      ? "João recebe a revelação divina"
      : "John receives the divine revelation");
  const themes = chapterData?.themes || [];
  const keyVerses = chapterData?.keyVerses || [];
  const epigraph = chapterData?.epigraph || "";
  const sections = chapterData?.sections || {};
  const verses = chapterData?.verses || {};

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const getText = (enText: string, ptText: string) => {
    return language === "br" ? ptText : enText;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-5xl mx-auto">
        <Card className="mb-8 border-l-4 border-l-blue-600">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl text-gray-800 dark:text-white flex items-center gap-3 mb-2">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  {title}
                </CardTitle>
                {subtitle && (
                  <div className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-2">
                    {subtitle}
                  </div>
                )}
                <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                  {summary}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  {getText("~16 min study", "~16 min de estudo")}
                </div>
              </div>
            </div>
            {epigraph && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-l-blue-500">
                <Quote className="h-5 w-5 text-blue-600 mb-2" />
                <p className="text-gray-700 dark:text-gray-300 italic text-sm leading-relaxed">
                  {epigraph}
                </p>
              </div>
            )}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  {getText("Key Themes", "Temas Principais")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {themes.map((theme: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 border-blue-200"
                    >
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-green-500" />
                  {getText("Key Verses", "Versículos-Chave")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {keyVerses.map((verse: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-green-200 text-green-700"
                    >
                      {verse}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-purple-600" />
            {getText("Detailed Commentary", "Comentário Detalhado")}
          </h2>
          {Object.entries(sections).map(
            ([sectionId, section]: [string, Section]) => (
              <Card key={sectionId} className="overflow-hidden">
                <CardHeader
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => toggleSection(sectionId)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">
                          {sectionId}
                        </span>
                      </div>
                      {section.title}
                    </CardTitle>
                    {expandedSections[sectionId] ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
                {expandedSections[sectionId] && (
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {section.content}
                    </p>
                    {section.keyInsights && section.keyInsights.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          {getText("Key Insights", "Pontos-Chave")}
                        </h4>
                        <ul className="space-y-1 ml-4">
                          {section.keyInsights.map(
                            (insight: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700 dark:text-gray-300 text-sm">
                                  {insight}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                    {section.keyPoints && section.keyPoints.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          {getText("Key Points", "Pontos Principais")}
                        </h4>
                        <ul className="space-y-1 ml-4">
                          {section.keyPoints.map(
                            (point: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700 dark:text-gray-300 text-sm">
                                  {point}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                    {section.greekTerms && section.greekTerms.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">
                          {getText("Greek Terms", "Termos Gregos")}
                        </h4>
                        <div className="space-y-2">
                          {section.greekTerms.map(
                            (term: GreekTerm, index: number) => (
                              <div
                                key={index}
                                className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg"
                              >
                                <span className="font-medium text-purple-700 dark:text-purple-300">
                                  {term.term}
                                </span>
                                <span className="text-gray-600 dark:text-gray-400 ml-2">
                                  - {term.meaning}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                    {section.theologicalInsights &&
                      section.theologicalInsights.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">
                            {getText(
                              "Theological Insights",
                              "Insights Teológicos"
                            )}
                          </h4>
                          <ul className="space-y-1 ml-4">
                            {section.theologicalInsights.map(
                              (insight: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <Star className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                                    {insight}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    {section.christTitles &&
                      section.christTitles.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">
                            {getText("Titles of Christ", "Títulos de Cristo")}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {section.christTitles.map(
                              (title: ChristTitle, index: number) => (
                                <div
                                  key={index}
                                  className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
                                >
                                  <div className="font-medium text-green-700 dark:text-green-300">
                                    {title.title}
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {title.meaning}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    {section.christDescription &&
                      section.christDescription.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">
                            {getText(
                              "Description of Christ",
                              "Descrição de Cristo"
                            )}
                          </h4>
                          <div className="space-y-3">
                            {section.christDescription.map(
                              (desc: ChristDescription, index: number) => (
                                <div
                                  key={index}
                                  className="border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-r-lg"
                                >
                                  <div className="font-medium text-yellow-800 dark:text-yellow-300">
                                    {desc.feature}
                                  </div>
                                  <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                    {desc.meaning}
                                  </div>
                                  {desc.reference && (
                                    <Badge
                                      variant="outline"
                                      className="mt-2 text-xs"
                                    >
                                      {desc.reference}
                                    </Badge>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    {section.alphaOmega && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          {getText("Alpha and Omega", "Alfa e Ômega")}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {section.alphaOmega}
                        </p>
                      </div>
                    )}
                    {section.doxology && (
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          {getText("Doxology", "Doxologia")}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {section.doxology}
                        </p>
                      </div>
                    )}
                    {section.symbolism &&
                      Object.keys(section.symbolism).length > 0 && (
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">
                            {getText("Symbolism", "Simbolismo")}
                          </h4>
                          <div className="space-y-2 text-sm">
                            {Object.entries(section.symbolism).map(
                              ([key, value]) => (
                                <p key={key}>
                                  <strong>{key.replace("_", " ")}:</strong>{" "}
                                  {value}
                                </p>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    {section.response && (
                      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          {getText("Response", "Resposta")}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {section.response}
                        </p>
                      </div>
                    )}
                    {section.authority && (
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          {getText("Authority", "Autoridade")}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {section.authority}
                        </p>
                      </div>
                    )}
                    {section.practicalApplication && (
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Heart className="h-4 w-4 text-green-600" />
                          {getText(
                            "Practical Application",
                            "Aplicação Prática"
                          )}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {section.practicalApplication}
                        </p>
                      </div>
                    )}
                    {section.crossReferences &&
                      section.crossReferences.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">
                            {getText(
                              "Cross References",
                              "Referências Cruzadas"
                            )}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {section.crossReferences.map(
                              (ref: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {ref}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </CardContent>
                )}
              </Card>
            )
          )}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            {getText("Verse by Verse Study", "Estudo Versículo por Versículo")}
          </h2>
          <div className="space-y-4">
            {Object.entries(verses).map(
              ([verseNum, verse]: [string, Verse]) => (
                <Card key={verseNum} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-blue-600">
                          {getText(
                            `Verse ${verseNum}`,
                            `Versículo ${verseNum}`
                          )}
                        </Badge>
                        {verse.crossReferences &&
                          verse.crossReferences.length > 0 && (
                            <div className="flex gap-1">
                              {verse.crossReferences
                                .slice(0, 3)
                                .map((ref: string, index: number) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {ref}
                                  </Badge>
                                ))}
                            </div>
                          )}
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                          &quot;{verse.text}&quot;
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">
                          {getText("Commentary", "Comentário")}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {verse.commentary}
                        </p>
                      </div>
                      {verse.keyPoints && verse.keyPoints.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">
                            {getText("Key Points", "Pontos-Chave")}
                          </h4>
                          <ul className="space-y-1">
                            {verse.keyPoints.map(
                              (point: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                                    {point}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                      {verse.greekNotes && (
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                          <h4 className="font-semibold mb-2">
                            {getText("Greek Notes", "Notas do Grego")}
                          </h4>
                          <p className="text-purple-700 dark:text-purple-300 text-sm italic">
                            {verse.greekNotes}
                          </p>
                        </div>
                      )}
                      {verse.application && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Heart className="h-4 w-4 text-green-600" />
                            {getText("Application", "Aplicação")}
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {verse.application}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
        {chapterData?.conclusion && (
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardHeader>
              <CardTitle className="text-xl">
                {getText("Conclusion", "Conclusão")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {chapterData.conclusion}
              </p>
            </CardContent>
          </Card>
        )}
        {chapterData?.references && chapterData.references.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">
                {getText(
                  "Bibliographic References",
                  "Referências Bibliográficas"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {chapterData.references.map((ref: string, index: number) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    • {ref}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Revelation1;
