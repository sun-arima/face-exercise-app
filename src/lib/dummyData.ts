export const user = {
  name: "田中 花子",
  streak: 7,
  totalMinutes: 124,
  goal: 15,
};

export const weeklyLog = [
  { day: "月", minutes: 5 },
  { day: "火", minutes: 0 },
  { day: "水", minutes: 8 },
  { day: "木", minutes: 3 },
  { day: "金", minutes: 7 },
  { day: "土", minutes: 5 },
  { day: "日", minutes: 0 },
];

export const prevWeeklyLog = [
  { day: "月", minutes: 3 },
  { day: "火", minutes: 0 },
  { day: "水", minutes: 4 },
  { day: "木", minutes: 2 },
  { day: "金", minutes: 5 },
  { day: "土", minutes: 3 },
  { day: "日", minutes: 3 },
];

export const badges = [
  {
    id: "1",
    name: "3日連続",
    emoji: "🎉",
    acquiredDate: "2025-03-10",
    condition: "3日連続で体操を達成",
  },
  {
    id: "2",
    name: "7日連続",
    emoji: "🏅",
    acquiredDate: "2025-03-16",
    condition: "7日連続で体操を達成",
  },
  {
    id: "3",
    name: "初回達成",
    emoji: "⭐",
    acquiredDate: "2025-03-08",
    condition: "初めて体操を完了",
  },
];

export const exerciseSteps = [
  {
    name: "口を大きく開ける",
    effect: "表情を豊かにする動きです！",
    duration: 3,
    repeatCount: 1,
  },
  {
    name: "舌を出す",
    effect: "飲み込む力をきたえる動きです！",
    duration: 3,
    repeatCount: 1,
  },
  {
    name: "頬を膨らませる",
    effect: "頬の力を強くする動きです！",
    duration: 3,
    repeatCount: 1,
  },
];

export const menus = [
  {
    id: "1",
    name: "ほっぺ膨らまし",
    category: "表情の豊かさ",
    duration: "約2分",
    emoji: "😊",
    description: "頬の筋肉を鍛えます",
  },
  {
    id: "2",
    name: "舌回し体操",
    category: "飲み込む力",
    duration: "約3分",
    emoji: "👅",
    description: "飲み込む力を高めます",
  },
  {
    id: "3",
    name: "あいうえお体操",
    category: "声を出す力",
    duration: "約2分",
    emoji: "🗣️",
    description: "声のハリを取り戻します",
  },
  {
    id: "4",
    name: "目の体操",
    category: "脳の刺激",
    duration: "約3分",
    emoji: "👁️",
    description: "脳への刺激と集中力向上",
  },
];

export const familyReactions = [
  {
    date: "3月16日",
    message: "体操3回達成しました！",
    seen: true,
    stamps: [
      { emoji: "❤️", from: "美咲", relation: "娘", icon: "👩" },
      { emoji: "👏", from: "健太", relation: "息子", icon: "👨" },
    ],
  },
  {
    date: "3月15日",
    message: "体操2回達成しました！",
    seen: true,
    stamps: [
      { emoji: "😊", from: "美咲", relation: "娘", icon: "👩" },
      { emoji: "💪", from: "健太", relation: "息子", icon: "👨" },
    ],
  },
  {
    date: "3月14日",
    message: "体操1回達成しました！",
    seen: true,
    stamps: [
      { emoji: "👏", from: "美咲", relation: "娘", icon: "👩" },
    ],
  },
  {
    date: "3月13日",
    message: "体操2回達成しました！",
    seen: true,
    stamps: [
      { emoji: "❤️", from: "健太", relation: "息子", icon: "👨" },
      { emoji: "😊", from: "美咲", relation: "娘", icon: "👩" },
    ],
  },
  {
    date: "3月11日",
    message: "体操1回達成しました！",
    seen: true,
    stamps: [
      { emoji: "💪", from: "美咲", relation: "娘", icon: "👩" },
    ],
  },
  {
    date: "3月10日",
    message: "7日連続達成！",
    seen: true,
    stamps: [
      { emoji: "👏", from: "健太", relation: "息子", icon: "👨" },
      { emoji: "❤️", from: "美咲", relation: "娘", icon: "👩" },
    ],
  },
];

export const analysisReport = {
  month: "3月",
  beforePhotoLabel: "1ヶ月前",
  afterPhotoLabel: "今日",
  aiComment:
    "口角の動きが改善されています。引き続き表情筋トレーニングを続けましょう。",
  suggestedMenu: "ほっぺ膨らまし",
  suggestedReason:
    "表情筋の改善が顕著です。さらに鍛えることでより効果的です。",
  totalTrainingTime: "2時間18分",
  totalSessions: 12,
  indicators: [
    {
      name: "飲み込む力",
      score: 72,
      trainingTime: "32分",
      sessions: 3,
      comment: "飲み込む力が安定しています。舌回し体操を継続しましょう。",
    },
    {
      name: "脳の刺激",
      score: 65,
      trainingTime: "28分",
      sessions: 3,
      comment: "集中力が向上しています。目の体操も取り入れてみましょう。",
    },
    {
      name: "表情の豊かさ",
      score: 85,
      trainingTime: "45分",
      sessions: 4,
      comment: "大きな改善が見られます！この調子で続けましょう。",
    },
    {
      name: "声を出す力",
      score: 70,
      trainingTime: "33分",
      sessions: 2,
      comment: "声のハリが出てきています。あいうえお体操を続けましょう。",
    },
  ],
};

export const familyStamps = [
  { id: "1", emoji: "❤️", label: "いいね" },
  { id: "2", emoji: "👏", label: "すごい！" },
  { id: "3", emoji: "😊", label: "うれしい" },
  { id: "4", emoji: "💪", label: "がんばれ" },
];

export const dailyLog = [
  {
    date: "3月16日（土）",
    mentalScore: 78,
    mentalEmoji: "😊",
    records: [
      { menu: "ほっぺ膨らまし", time: "3分12秒", startTime: "10:15", tags: ["表情の豊かさ"], viewers: ["美咲", "健太"] },
      { menu: "舌回し体操", time: "2分45秒", startTime: "10:20", tags: ["飲み込む力"], viewers: ["美咲"] },
    ],
  },
  {
    date: "3月15日（金）",
    mentalScore: 85,
    mentalEmoji: "😄",
    records: [
      { menu: "あいうえお体操", time: "2分30秒", tags: ["声を出す力"] },
      { menu: "目の体操", time: "3分10秒", tags: ["脳の刺激"] },
      { menu: "ほっぺ膨らまし", time: "2分55秒", tags: ["表情の豊かさ"] },
    ],
  },
  {
    date: "3月14日（木）",
    mentalScore: 65,
    mentalEmoji: "😐",
    records: [{ menu: "舌回し体操", time: "3分00秒", tags: ["飲み込む力"] }],
  },
  {
    date: "3月13日（水）",
    mentalScore: 80,
    mentalEmoji: "😊",
    records: [
      { menu: "あいうえお体操", time: "2分20秒", tags: ["声を出す力"] },
      { menu: "ほっぺ膨らまし", time: "3分42秒", tags: ["表情の豊かさ"] },
    ],
  },
  {
    date: "3月12日（火）",
    mentalScore: 0,
    mentalEmoji: "",
    records: [],
  },
  {
    date: "3月11日（月）",
    mentalScore: 72,
    mentalEmoji: "🙂",
    records: [{ menu: "目の体操", time: "3分15秒", tags: ["脳の刺激"] }],
  },
  {
    date: "3月10日（日）",
    mentalScore: 0,
    mentalEmoji: "",
    records: [],
  },
];

export const prevDailyLog = [
  {
    date: "3月9日（土）",
    mentalScore: 65,
    mentalEmoji: "🙂",
    records: [{ menu: "ほっぺ膨らまし", time: "2分50秒", tags: ["表情の豊かさ"] }],
  },
  {
    date: "3月8日（金）",
    mentalScore: 70,
    mentalEmoji: "😊",
    records: [
      { menu: "舌回し体操", time: "3分00秒", tags: ["飲み込む力"] },
    ],
  },
  {
    date: "3月7日（木）",
    mentalScore: 0,
    mentalEmoji: "",
    records: [],
  },
  {
    date: "3月6日（水）",
    mentalScore: 68,
    mentalEmoji: "🙂",
    records: [{ menu: "あいうえお体操", time: "2分10秒", tags: ["声を出す力"] }],
  },
  {
    date: "3月5日（火）",
    mentalScore: 0,
    mentalEmoji: "",
    records: [],
  },
  {
    date: "3月4日（月）",
    mentalScore: 60,
    mentalEmoji: "😐",
    records: [{ menu: "目の体操", time: "3分00秒", tags: ["脳の刺激"] }],
  },
  {
    date: "3月3日（日）",
    mentalScore: 62,
    mentalEmoji: "🙂",
    records: [{ menu: "ほっぺ膨らまし", time: "2分30秒", tags: ["表情の豊かさ"] }],
  },
];

export const weeklyMentalScore = [
  { day: "月", score: 72 },
  { day: "火", score: 0 },
  { day: "水", score: 80 },
  { day: "木", score: 65 },
  { day: "金", score: 85 },
  { day: "土", score: 78 },
  { day: "日", score: 0 },
];

export const prevWeeklyMentalScore = [
  { day: "月", score: 60 },
  { day: "火", score: 0 },
  { day: "水", score: 68 },
  { day: "木", score: 55 },
  { day: "金", score: 70 },
  { day: "土", score: 65 },
  { day: "日", score: 62 },
];

export const weeklyIndicators = [
  { name: "飲み込む力", minutes: 8 },
  { name: "脳の刺激", minutes: 6 },
  { name: "表情の豊かさ", minutes: 10 },
  { name: "声を出す力", minutes: 4 },
];

export const prevWeeklyIndicators = [
  { name: "飲み込む力", minutes: 5 },
  { name: "脳の刺激", minutes: 4 },
  { name: "表情の豊かさ", minutes: 7 },
  { name: "声を出す力", minutes: 4 },
];
