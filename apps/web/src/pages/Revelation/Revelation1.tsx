import React from 'react';
import RevelationChapter from './RevelationChapter-simple';

const Revelation1: React.FC = () => {
  const verses = [
    {
      number: 1,
      text: "The revelation from Jesus Christ, which God gave him to show his servants what must soon take place. He made it known by sending his angel to his servant John,",
      commentary: "This opening verse establishes the divine origin and purpose of the entire book. The word 'revelation' (apokalypsis) means 'unveiling' or 'disclosure.' This is not merely human speculation about the future, but a divine communication from Jesus Christ himself.",
      keyPoints: [
        "Divine origin - directly from Jesus Christ",
        "Purpose - to show future events to God's servants",
        "Method - through angelic messenger to John",
        "The events 'must soon take place' - indicating certainty and urgency"
      ],
      application: "God desires to reveal His plans to His people. We should approach this book with reverence, expectation, and a heart ready to receive divine truth. As servants of God, we are intended recipients of this revelation."
    },
    {
      number: 2,
      text: "who testifies to everything he saw—that is, the word of God and the testimony of Jesus Christ.",
      commentary: "John serves as a faithful witness, emphasizing the reliability and completeness of what he records. He testifies to 'everything' he saw, holding nothing back. This testimony carries the weight of both God's word and Jesus Christ's direct witness.",
      keyPoints: [
        "John as faithful and complete witness",
        "Testimony includes both word of God and Jesus' witness",
        "Nothing is omitted from the revelation",
        "Dual authentication - divine word and Christ's testimony"
      ],
      application: "We too are called to be faithful witnesses of what God has revealed to us. Like John, we should testify completely and accurately to God's truth, holding nothing back when sharing the Gospel."
    },
    {
      number: 3,
      text: "Blessed is the one who reads aloud the words of this prophecy, and blessed are those who hear it and take to heart what is written in it, because the time is near.",
      commentary: "This is the first of seven beatitudes in Revelation. It promises blessing for three actions: reading aloud, hearing, and taking to heart. The public reading suggests the book was meant for congregational worship. The nearness of time adds urgency to heeding its message.",
      keyPoints: [
        "First beatitude - blessing promised",
        "Three blessed actions: read, hear, obey",
        "Designed for public worship setting",
        "Urgency emphasized - 'the time is near'"
      ],
      application: "God blesses those who engage seriously with His prophetic word. We should not just read or hear, but 'take to heart' - allow it to transform our lives. The nearness of Christ's return should motivate our obedience."
    }
  ];

  const themes = [
    "Divine Revelation",
    "Christ's Authority", 
    "Faithful Witness",
    "Blessed Obedience",
    "Prophetic Urgency"
  ];

  return (
    <RevelationChapter
      chapterNumber={1}
      title="The Revelation of Jesus Christ"
      summary="John receives the divine revelation and introduces the prophetic visions that will follow. This chapter establishes the authority, purpose, and blessed nature of the entire book."
      verses={verses}
      themes={themes}
    />
  );
};

export default Revelation1;
