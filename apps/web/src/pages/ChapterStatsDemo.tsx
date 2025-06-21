import React from 'react';
import ChapterStats from '@/components/ChapterStats';
import { getEnhancedChapterStats } from '@/utils/chapterUtils';

// Sample verse data for demonstration
const sampleVerses = [
  {
    text: "The Revelation of Jesus Christ, which God gave Him to show His servants—things which must shortly take place. And He sent and signified it by His angel to His servant John, who bore witness to the word of God, and to the testimony of Jesus Christ, to all things that he saw.",
    commentary: "This opening verse establishes the divine origin and purpose of the book of Revelation. The Greek word 'apokalypsis' means 'unveiling' or 'disclosure,' indicating that this book reveals rather than conceals truth about Jesus Christ and future events.",
    keyPoints: ["Divine revelation", "Prophetic urgency", "Apostolic witness"],
    application: "As we study Revelation, we should approach it with reverence, knowing it comes directly from God through Jesus Christ. We should also maintain a sense of urgency about the spiritual realities it reveals."
  },
  {
    text: "Blessed is he who reads and those who hear the words of this prophecy, and keep those things which are written in it; for the time is near.",
    commentary: "This is the first of seven beatitudes in Revelation. The blessing comes not just from reading but from hearing (understanding) and keeping (obeying) the words. The phrase 'the time is near' emphasizes the imminence of God's prophetic plan.",
    keyPoints: ["Blessed reading", "Active obedience", "Prophetic urgency"],
    application: "We should not just read Revelation as an interesting book, but actively seek to understand and obey its teachings in our daily lives."
  },
  {
    text: "John, to the seven churches which are in Asia: Grace to you and peace from Him who is and who was and who is to come, and from the seven Spirits who are before His throne, and from Jesus Christ, the faithful witness, the firstborn from the dead, and the ruler over the kings of the earth.",
    commentary: "John addresses specific historical churches but the number seven represents completeness, suggesting the message applies to all churches. The description of God emphasizes His eternal nature, while the seven Spirits likely refer to the Spirit's perfect ministry (Isaiah 11:2).",
    keyPoints: ["Historical context", "Universal application", "Trinity revealed"],
    application: "The grace and peace offered to these ancient churches is available to us today. We can trust in the eternal, unchanging nature of God in our times of uncertainty."
  }
];

const ChapterStatsDemo: React.FC = () => {
  // Get enhanced stats for Revelation Chapter 1
  const chapterStats = getEnhancedChapterStats(1, sampleVerses, 65); // 65% progress for demo

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Enhanced Chapter Statistics Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            This demonstrates the comprehensive reading metrics and study analytics for Revelation Chapter 1
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Content Area */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Sample Chapter Content
              </h2>
              <div className="space-y-4">
                {sampleVerses.map((verse, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Verse {index + 1}
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 mb-2">
                      "{verse.text}"
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Commentary: {verse.commentary.substring(0, 100)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Key Features of Enhanced Statistics:
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• <strong>NKJV Word Count:</strong> Accurate biblical text word counts</li>
                <li>• <strong>Commentary Analysis:</strong> Study material word counts and reading time</li>
                <li>• <strong>Book Page Equivalent:</strong> Shows how much content this represents in print</li>
                <li>• <strong>Reading Time Estimates:</strong> Multiple reading speeds (quick, study, deep)</li>
                <li>• <strong>Difficulty Assessment:</strong> Beginner, Intermediate, or Advanced</li>
                <li>• <strong>Theme Analysis:</strong> Key theological themes identified</li>
                <li>• <strong>Cross-References:</strong> Number of related biblical passages</li>
                <li>• <strong>Study Progress:</strong> Visual progress tracking</li>
                <li>• <strong>Key Terms:</strong> Important words and concepts highlighted</li>
              </ul>
            </div>
          </div>

          {/* Enhanced Statistics Sidebar */}
          <div>
            <ChapterStats
              chapterNumber={1}
              scriptureWordCount={chapterStats.scriptureWords}
              commentaryWordCount={chapterStats.commentaryWords}
              verseCount={chapterStats.verseCount}
              themes={chapterStats.themes}
              crossReferences={chapterStats.crossReferences}
              keyWords={chapterStats.keyWords}
              difficultyLevel={chapterStats.difficulty}
              studyProgress={chapterStats.studyProgress}
            />
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Implementation Notes:
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <p>
              <strong>Word Counts:</strong> Based on NKJV text with actual word counting algorithms
              that handle punctuation and formatting properly.
            </p>
            <p>
              <strong>Reading Times:</strong> Calculated using industry-standard reading speeds:
              200 WPM for normal reading, 100 WPM for study reading with reflection.
            </p>
            <p>
              <strong>Page Estimates:</strong> Based on 250 words per typical book page,
              giving students a sense of the content volume.
            </p>
            <p>
              <strong>Difficulty Levels:</strong> Assessed based on theological complexity,
              symbolic content, and historical context requirements.
            </p>
            <p>
              <strong>Study Progress:</strong> Tracks completion percentage with visual indicators
              and personalized study tips based on progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterStatsDemo;
