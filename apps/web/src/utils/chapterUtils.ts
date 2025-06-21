// Utility functions for counting words and calculating reading statistics

export const countWords = (text: string): number => {
  if (!text || typeof text !== 'string') return 0;
  // Remove extra whitespace and split by whitespace
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

export const countWordsInVerses = (verses: Array<{text: string; commentary: string}>): {
  scriptureWords: number;
  commentaryWords: number;
  totalWords: number;
} => {
  let scriptureWords = 0;
  let commentaryWords = 0;

  verses.forEach(verse => {
    scriptureWords += countWords(verse.text);
    commentaryWords += countWords(verse.commentary);
  });

  return {
    scriptureWords,
    commentaryWords,
    totalWords: scriptureWords + commentaryWords
  };
};

// Sample word counts for each Revelation chapter (NKJV approximate)
export const revelationChapterStats: Record<number, {
  scriptureWords: number;
  verses: number;
  // Commentary words will be calculated dynamically
}> = {
  1: { scriptureWords: 566, verses: 20 },
  2: { scriptureWords: 608, verses: 29 },
  3: { scriptureWords: 475, verses: 22 },
  4: { scriptureWords: 245, verses: 11 },
  5: { scriptureWords: 307, verses: 14 },
  6: { scriptureWords: 374, verses: 17 },
  7: { scriptureWords: 373, verses: 17 },
  8: { scriptureWords: 285, verses: 13 },
  9: { scriptureWords: 467, verses: 21 },
  10: { scriptureWords: 244, verses: 11 },
  11: { scriptureWords: 411, verses: 19 },
  12: { scriptureWords: 382, verses: 17 },
  13: { scriptureWords: 398, verses: 18 },
  14: { scriptureWords: 448, verses: 20 },
  15: { scriptureWords: 182, verses: 8 },
  16: { scriptureWords: 463, verses: 21 },
  17: { scriptureWords: 389, verses: 18 },
  18: { scriptureWords: 533, verses: 24 },
  19: { scriptureWords: 468, verses: 21 },
  20: { scriptureWords: 339, verses: 15 },
  21: { scriptureWords: 584, verses: 27 },
  22: { scriptureWords: 465, verses: 21 }
};

export const getChapterStats = (chapterNumber: number, verses: Array<{text: string; commentary: string; keyPoints?: string[]; application: string}>) => {
  const baseStats = revelationChapterStats[chapterNumber] || { scriptureWords: 0, verses: 0 };
  
  // Calculate commentary words from actual data
  let commentaryWords = 0;
  verses.forEach(verse => {
    commentaryWords += countWords(verse.commentary);
    commentaryWords += countWords(verse.application);
    if (verse.keyPoints) {
      verse.keyPoints.forEach(point => {
        commentaryWords += countWords(point);
      });
    }
  });

  return {
    scriptureWords: baseStats.scriptureWords,
    commentaryWords,
    verseCount: baseStats.verses,
    totalWords: baseStats.scriptureWords + commentaryWords
  };
};

// Enhanced chapter analysis functions

// Chapter difficulty mapping based on theological complexity and symbolism
export const chapterDifficultyLevels: Record<number, 'Beginner' | 'Intermediate' | 'Advanced'> = {
  1: 'Beginner',     // Introduction to John's vision
  2: 'Intermediate', // Letters to churches - practical
  3: 'Intermediate', // Letters to churches - practical  
  4: 'Advanced',     // Heavenly throne room - symbolic
  5: 'Advanced',     // The scroll and the Lamb - symbolic
  6: 'Advanced',     // Six seals - apocalyptic imagery
  7: 'Advanced',     // 144,000 and great multitude - symbolic numbers
  8: 'Advanced',     // Seven trumpets begin - judgments
  9: 'Advanced',     // Demonic locusts and armies - complex imagery
  10: 'Intermediate', // Angel with little scroll - transition
  11: 'Advanced',     // Two witnesses - prophetic symbolism
  12: 'Advanced',     // Woman and dragon - cosmic conflict
  13: 'Advanced',     // Beast from sea/land - end times prophecy
  14: 'Advanced',     // 144,000 and three angels - symbolic
  15: 'Intermediate', // Seven bowls preparation - shorter chapter
  16: 'Advanced',     // Seven bowls of wrath - final judgments
  17: 'Advanced',     // Babylon the great - complex symbolism
  18: 'Advanced',     // Fall of Babylon - detailed prophecy
  19: 'Advanced',     // Return of Christ - apocalyptic victory
  20: 'Advanced',     // Millennium and final judgment - end times
  21: 'Intermediate', // New heaven and earth - hopeful conclusion
  22: 'Beginner'      // River of life and final words - encouraging
};

// Key themes for each chapter
export const chapterThemes: Record<number, string[]> = {
  1: ['Vision of Christ', 'Seven Churches', 'Divine Authority', 'Prophecy'],
  2: ['Church Evaluation', 'Perseverance', 'False Teaching', 'Spiritual Warfare'],
  3: ['Lukewarmness', 'Open Doors', 'Overcoming', 'Invitation to Fellowship'],
  4: ['Heavenly Worship', 'God\'s Throne', 'Twenty-four Elders', 'Holy, Holy, Holy'],
  5: ['The Scroll', 'Lamb of God', 'Redemption', 'Heavenly Worship'],
  6: ['Seals of Judgment', 'Four Horsemen', 'Martyrs', 'Wrath of the Lamb'],
  7: ['144,000 Sealed', 'Great Tribulation', 'Palm Branches', 'No More Tears'],
  8: ['Seven Trumpets', 'Incense and Prayers', 'Environmental Judgments', 'Woe, Woe, Woe'],
  9: ['Demonic Locusts', 'Sixth Trumpet', 'Euphrates Angels', 'Lack of Repentance'],
  10: ['Mighty Angel', 'Little Scroll', 'Sweet and Bitter', 'No More Delay'],
  11: ['Two Witnesses', 'Jerusalem Trampled', 'Resurrection Power', 'Seventh Trumpet'],
  12: ['Woman and Child', 'Dragon\'s Pursuit', 'War in Heaven', 'Satan Cast Down'],
  13: ['Beast from Sea', 'Beast from Earth', 'Mark of the Beast', '666'],
  14: ['144,000 Redeemed', 'Three Angels', 'Harvest of Earth', 'Wine Press of Wrath'],
  15: ['Seven Angels', 'Sea of Glass', 'Song of Moses', 'Temple Filled with Smoke'],
  16: ['Seven Bowls', 'Armageddon', 'Great Earthquake', 'Babylon Remembered'],
  17: ['Babylon the Harlot', 'Seven Hills', 'Beast with Seven Heads', 'Kings of Earth'],
  18: ['Fall of Babylon', 'Economic Collapse', 'Lament of Kings', 'Rejoicing in Heaven'],
  19: ['Heavenly Hallelujahs', 'Marriage Supper', 'Faithful and True', 'King of Kings'],
  20: ['Thousand Years', 'Satan Bound', 'First Resurrection', 'Great White Throne'],
  21: ['New Heaven and Earth', 'New Jerusalem', 'God\'s Dwelling', 'No More Death'],
  22: ['River of Life', 'Tree of Life', 'Throne of God', 'Come, Lord Jesus']
};

// Key theological and symbolic words for each chapter
export const chapterKeyWords: Record<number, string[]> = {
  1: ['Alpha', 'Omega', 'Lampstands', 'Seven Stars', 'Sharp Sword'],
  2: ['Ephesus', 'Smyrna', 'Pergamos', 'Thyatira', 'First Love', 'Crown of Life'],
  3: ['Sardis', 'Philadelphia', 'Laodicea', 'Hot', 'Cold', 'Lukewarm', 'White Garments'],
  4: ['Throne', 'Rainbow', 'Lightning', 'Thunder', 'Four Living Creatures', 'Elders'],
  5: ['Scroll', 'Seven Seals', 'Lamb', 'Lion of Judah', 'Root of David', 'Worthy'],
  6: ['White Horse', 'Red Horse', 'Black Horse', 'Pale Horse', 'Souls', 'Altar'],
  7: ['144,000', 'Twelve Tribes', 'Great Multitude', 'White Robes', 'Palm Branches'],
  8: ['Golden Censer', 'Fire', 'Hail', 'Blood', 'Mountain', 'Star Called Wormwood'],
  9: ['Bottomless Pit', 'Locusts', 'Scorpions', 'Euphrates', 'Four Angels', '200 Million'],
  10: ['Rainbow', 'Little Book', 'Seven Thunders', 'Sweet as Honey', 'Bitter'],
  11: ['Two Witnesses', 'Olive Trees', 'Lampstands', '1260 Days', 'Fire', 'Resurrection'],
  12: ['Woman', 'Twelve Stars', 'Dragon', 'Seven Heads', 'Michael', 'Wilderness'],
  13: ['Beast', 'Seven Heads', 'Ten Horns', 'Mark', 'Number', '666'],
  14: ['Mount Zion', 'New Song', 'First Fruits', 'Harvest', 'Sickle', 'Winepress'],
  15: ['Seven Plagues', 'Sea of Glass', 'Harps', 'Song of Moses', 'Tabernacle'],
  16: ['Seven Bowls', 'Sores', 'Blood', 'Scorching Heat', 'Darkness', 'Armageddon'],
  17: ['Harlot', 'Scarlet Beast', 'Seven Mountains', 'Ten Kings', 'Babylon'],
  18: ['Fallen', 'Babylon', 'Merchants', 'Ships', 'Millstone', 'Blood of Prophets'],
  19: ['Alleluia', 'Marriage', 'Bride', 'White Horse', 'Faithful and True', 'Word of God'],
  20: ['Thousand Years', 'Bottomless Pit', 'First Resurrection', 'Gog and Magog', 'Lake of Fire'],
  21: ['New Heaven', 'New Earth', 'Holy City', 'Bride', 'Tabernacle', 'No More Sea'],
  22: ['River', 'Tree of Life', 'Throne', 'Face', 'Name', 'Come Quickly']
};

// Calculate cross-references (approximate counts based on typical study Bibles)
export const crossReferencesCounts: Record<number, number> = {
  1: 45, 2: 52, 3: 48, 4: 38, 5: 42, 6: 55, 
  7: 48, 8: 35, 9: 41, 10: 28, 11: 46, 12: 58,
  13: 62, 14: 44, 15: 25, 16: 47, 17: 51, 18: 49,
  19: 53, 20: 45, 21: 67, 22: 39
};

export const getChapterAnalysis = (chapterNumber: number) => {
  return {
    difficulty: chapterDifficultyLevels[chapterNumber] || 'Intermediate',
    themes: chapterThemes[chapterNumber] || [],
    keyWords: chapterKeyWords[chapterNumber] || [],
    crossReferences: crossReferencesCounts[chapterNumber] || 0
  };
};

// Enhanced chapter stats with analysis
export const getEnhancedChapterStats = (
  chapterNumber: number, 
  verses: Array<{text: string; commentary: string; keyPoints?: string[]; application: string}>,
  studyProgress: number = 0
) => {
  const baseStats = getChapterStats(chapterNumber, verses);
  const analysis = getChapterAnalysis(chapterNumber);
  
  return {
    ...baseStats,
    ...analysis,
    studyProgress
  };
};
