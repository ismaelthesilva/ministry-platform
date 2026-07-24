import type { ChapterBlock } from "../content/types";

export const bookMeta = {
  title: "The Fifth Gospel",
  subtitle:
    "The final chapter of Jesus' biography that turns fear of the end into hope",
  series: "The Cosmic Conflict",
  volume: 5,
  edition: "1st Edition — 2026",
  author: "Ismael Silva",
};

export const introTitle = "The End Is Just the Beginning";
export const introSubtitle = "Why You Don't Need to Fear the Future";

export const authorBio: string[] = [
  `**Author**`,
  `Ismael Silva is an inspiring leader, entrepreneur, and Brazilian Jiu-Jitsu World Champion, winning **Double Gold** at a competition in Japan. He combines rigorous discipline with a genuine passion for helping people reach their highest potential — physically, mentally, and emotionally.`,
  `Married to Jackie, a doctor dedicated to well-being, specializing in identifying health issues and guiding transformations toward more balanced, healthy, and fulfilling lives. Son of Mariza and Paulo, Ismael has built a diverse and impactful journey.`,
  `He holds a bachelor's degree in Theology, a master's degree in Leadership, and a certification in Computer Science from Harvard University, where he qualified as a Software Engineer. His professional experience includes international leadership, over 1,000 motivational and inspirational talks to thousands of people around the world, the composition of more than 30 original songs, and a literary career with 2 published books and several others in development.`,
  `Currently, as a successful entrepreneur, he balances a dynamic life with a commitment to promoting personal growth, resilience, and meaningful connections. Passionate about sports, healthy living, and human development, Ismael dedicates his time to motivating individuals from all walks of life to overcome challenges, find purpose, and live with greater fullness and hope.`,
  `If you are looking for inspiration to transform your journey — whether in health, career, emotional balance, or the search for meaning — follow the work of Ismael Silva.`,
  `To learn more, visit: **ismaelsilva.org**`,
];

export const introductionBlocks: ChapterBlock[] = [
  {
    type: "paragraph",
    text: `Have you ever had the feeling that the world is heading toward some kind of ending?`,
  },
  {
    type: "paragraph",
    text: `Looking around us, we see the pieces of the geopolitical board moving with frightening speed. Wars that once seemed impossible, pandemics that paralyzed the planet, the runaway advance of artificial intelligence, extreme political polarization, and a moral crisis eroding the foundations of society. There is an anxiety in the air. Even people who aren't religious sense that *something* big is about to happen.`,
  },
  {
    type: "paragraph",
    text: `Pop culture has hijacked the word "Apocalypse." For most people, that word conjures images of zombies, asteroids colliding with Earth, underground bunkers, and the end of humanity. Hollywood has taught us that the Apocalypse is a horror movie where everyone dies in the end.`,
  },
  {
    type: "paragraph",
    text: `But what if I told you that Revelation is not a book about the end of the world, but about the **restart** of life? What if I told you that, theologically, Revelation is the **Fifth Gospel**?`,
  },
  {
    type: "paragraph",
    text: `Matthew, Mark, Luke, and John told the story of Jesus as the Suffering Servant, the Lamb who died for our sins. But the story didn't end at the cross, nor at the empty tomb. A chapter was still missing. We still needed to be introduced to Jesus — not as the Carpenter of Nazareth, but as the **King of Kings and Lord of Lords**. The book of Revelation is, literally, "The Revelation of Jesus Christ." It is the moment He pulls back the curtain of history and says: "Do not be afraid. I am in control."`,
  },
  {
    type: "paragraph",
    text: `In this book — Volume 5 of *The Cosmic Conflict* series — we will take a deep, verse-by-verse journey through these fascinating prophecies. If you've ever felt confused by the symbols of beasts, dragons, seals, and trumpets, this book is for you. We will decode this language not based on guesswork or conspiracy theories, but by using the Bible itself, and history, as the keys to interpretation.`,
  },
  { type: "paragraph", text: `In the pages ahead, you will discover:` },
  {
    type: "paragraph",
    text: `— The identity of the global powers shaping today's landscape (the mysterious "Eighth King").`,
  },
  {
    type: "paragraph",
    text: `— What the Mark of the Beast really is, and how to avoid being deceived by it.`,
  },
  {
    type: "paragraph",
    text: `— The beauty of God's Judgment, and why it is good news for those who seek justice.`,
  },
  {
    type: "paragraph",
    text: `— The truth about Armageddon (which is not what the movies show).`,
  },
  {
    type: "paragraph",
    text: `— And the most detailed, most thrilling description of our future home: the New Jerusalem.`,
  },
  {
    type: "paragraph",
    text: `I wrote this book with the heart of a pastor and the mind of a researcher, with one clear goal: **to turn your fear into hope**. Will the world go through hard times? Yes — prophecy is clear about that. The system will fall. The illusions of financial and political security will crumble. But for those who carry the "Seal of God," the end of this old world is only the prelude to an eternity of peace.`,
  },
  {
    type: "paragraph",
    text: `Do not read this book merely as an intellectual pursuit. Read it as a manual for spiritual survival, and, above all, as a love letter from your King, who is coming back to get you.`,
  },
  {
    type: "paragraph",
    text: `Get ready. Time is short, but hope is eternal. Welcome to *The Return of the King of Kings*.`,
  },
  { type: "paragraph", text: `**Ismael Silva**` },
];

export const backCoverBlurb: string[] = [
  `**You know the Jesus of the manger and the cross. But do you know the King of Kings?**`,
  `Most Christians stop reading the biography of Christ at the end of the book of John. But the story didn't end at the empty tomb. A chapter was missing. The glorious conclusion was missing.`,
  `Revelation is not a horror book about the end of the world; it is the **Fifth Gospel**. While the first four gospels present Jesus in His earthly humiliation, the Fifth Gospel reveals Him in His cosmic glory.`,
  `In this vibrant, deeply homiletic commentary, pastor and theologian Ismael Silva guides you, chapter by chapter, through the corridors of the Heavenly Sanctuary, across the battlefields of Armageddon, and along the golden streets of the New Jerusalem.`,
];

export interface SeriesBook {
  title: string;
  description: string;
  available: boolean;
}

export const seriesBooks: SeriesBook[] = [
  {
    title: "The Lord of the Covenant",
    description:
      "Finding Jesus in the stories, symbols, and promises of the Old Testament.",
    available: false,
  },
  {
    title: "The Return of the King of Kings",
    description:
      "The epic journey of the Church, from Pentecost to the New Jerusalem.",
    available: true,
  },
  {
    title: "The Incomparable Jesus",
    description:
      "A deep dive into the mind, heart, and mission of Jesus Christ.",
    available: false,
  },
  {
    title: "The Society of the Book",
    description:
      "How the Bible survived empires, bonfires, and skeptics to reach you.",
    available: false,
  },
  {
    title: "The Fifth Gospel",
    description:
      "The final chapter of Jesus' biography that turns fear of the end into hope.",
    available: true,
  },
  {
    title: "The Code of Revelation",
    description:
      "Deciphering every symbol, every seal, and every prophecy, verse by verse.",
    available: false,
  },
  {
    title: "Encounters with the Lamb",
    description:
      "365 days hearing the voice of the King of Kings amid the world's chaos.",
    available: false,
  },
  {
    title: "The Eternal Kingdom",
    description:
      "How to live with unshakable faith in a culture trying to erase your identity.",
    available: false,
  },
  {
    title: "The Key to History",
    description:
      "A deep analysis of Daniel's prophecies that mapped out the world's empires.",
    available: false,
  },
  {
    title: "I Will Not Bow",
    description:
      "Daily reflections for staying on your feet when the world wants you to bow.",
    available: false,
  },
  {
    title: "The Gospel According to Middle-earth",
    description:
      "What Tolkien, hobbits, and rings teach us about Revelation's final battle.",
    available: false,
  },
  {
    title: "The Voice That Cries Out",
    description:
      "The history of preaching, and how to communicate the gospel with power in the 21st century.",
    available: false,
  },
];

export const references: string[] = [
  `DOUGLASS, F. **Life and Times of Frederick Douglass.** Hartford: Park Publishing Co., 1881. *(Source for the account of the 1833 meteor shower cited in Chapter 13).*`,
  `JOSEPHUS, F. ***The Wars of the Jews***. *(Historical source on the destruction of Jerusalem in A.D. 70).*`,
  `TERTULLIAN. **Apologeticus** (The Apology). 2nd century. *(Source of the phrase "The blood of the martyrs is the seed of the church," cited in Chapter 4).*`,
  `VOLTAIRE. **The Complete Works of Voltaire.** Paris: Garnier Frères, 1877. *(Source of the quotation about the end of the Bible, cited in Chapter 21).*`,
  `WHITE, E. G. **The Great Controversy**. Pacific Press: egwwritings.org, 1911, GC.`,
];
