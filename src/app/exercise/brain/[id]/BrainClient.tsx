"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";

// ========== 色読みテスト ==========
const colorWords = [
  { text: "あか", color: "text-blue-500", answer: "blue" },
  { text: "あお", color: "text-red-500", answer: "red" },
  { text: "みどり", color: "text-yellow-500", answer: "yellow" },
  { text: "きいろ", color: "text-green-500", answer: "green" },
  { text: "あか", color: "text-red-500", answer: "red" },
  { text: "あお", color: "text-blue-500", answer: "blue" },
];

function ColorTest({ onComplete }: { onComplete: (score: number) => void }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const current = colorWords[index];
  const isLast = index >= colorWords.length - 1;

  const handleAnswer = (answer: string) => {
    if (feedback) return;
    const correct = answer === current.answer;
    if (correct) setScore((s) => s + 1);
    setFeedback(correct ? "correct" : "wrong");
    setTimeout(() => {
      setFeedback(null);
      if (isLast) {
        onComplete(score + (correct ? 1 : 0));
      } else {
        setIndex((i) => i + 1);
      }
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-0">
      <p className="text-base text-gray-500 mb-4">文字の「色」をタップしてください</p>
      <p className={`text-6xl font-bold mb-8 ${current.color}`}>{current.text}</p>
      {feedback && (
        <p className={`text-2xl font-bold mb-4 ${feedback === "correct" ? "text-green-500" : "text-red-500"}`}>
          {feedback === "correct" ? "⭕ 正解！" : "❌ 不正解"}
        </p>
      )}
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {[
          { label: "あか", value: "red", bg: "bg-red-500" },
          { label: "あお", value: "blue", bg: "bg-blue-500" },
          { label: "みどり", value: "green", bg: "bg-green-500" },
          { label: "きいろ", value: "yellow", bg: "bg-yellow-500" },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => handleAnswer(btn.value)}
            disabled={!!feedback}
            className={`${btn.bg} text-white text-lg font-bold py-4 rounded-2xl active:opacity-80 disabled:opacity-60`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-400 mt-4">{index + 1} / {colorWords.length}</p>
    </div>
  );
}

// ========== 計算チャレンジ ==========
function CalcChallenge({ onComplete }: { onComplete: (score: number) => void }) {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [problem, setProblem] = useState({ a: 0, b: 0, op: "+", answer: 0, choices: [0] });
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const totalRounds = 6;

  const generateProblem = useCallback(() => {
    const a = Math.floor(Math.random() * 20) + 5;
    const b = Math.floor(Math.random() * 15) + 3;
    const isAdd = Math.random() > 0.5;
    const answer = isAdd ? a + b : a - b;
    const wrong1 = answer + Math.floor(Math.random() * 5) + 1;
    const wrong2 = answer - Math.floor(Math.random() * 5) - 1;
    const choices = [answer, wrong1, wrong2].sort(() => Math.random() - 0.5);
    setProblem({ a, b, op: isAdd ? "+" : "−", answer, choices });
  }, []);

  useEffect(() => {
    generateProblem();
  }, [round, generateProblem]);

  const handleAnswer = (choice: number) => {
    if (feedback) return;
    const correct = choice === problem.answer;
    if (correct) setScore((s) => s + 1);
    setFeedback(correct ? "correct" : "wrong");
    setTimeout(() => {
      setFeedback(null);
      if (round >= totalRounds - 1) {
        onComplete(score + (correct ? 1 : 0));
      } else {
        setRound((r) => r + 1);
      }
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-0">
      <p className="text-base text-gray-500 mb-4">答えをタップしてください</p>
      <p className="text-5xl font-bold text-gray-800 mb-8">
        {problem.a} {problem.op} {problem.b} = ?
      </p>
      {feedback && (
        <p className={`text-2xl font-bold mb-4 ${feedback === "correct" ? "text-green-500" : "text-red-500"}`}>
          {feedback === "correct" ? "⭕ 正解！" : `❌ 答えは ${problem.answer}`}
        </p>
      )}
      <div className="flex gap-4">
        {problem.choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(choice)}
            disabled={!!feedback}
            className="w-20 h-20 bg-purple-500 text-white text-2xl font-bold rounded-2xl active:bg-purple-600 disabled:opacity-60"
          >
            {choice}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-400 mt-4">{round + 1} / {totalRounds}</p>
    </div>
  );
}

// ========== 記憶カード ==========
function MemoryCards({ onComplete }: { onComplete: (score: number) => void }) {
  const emojis = ["🍎", "🌸", "🐱", "⭐", "🍎", "🌸", "🐱", "⭐"];
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    setCards(emojis.sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      setMoves((m) => m + 1);
      if (cards[flipped[0]] === cards[flipped[1]]) {
        setMatched((m) => [...m, flipped[0], flipped[1]]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setTimeout(() => onComplete(Math.max(0, 6 - Math.floor(moves / 2))), 500);
    }
  }, [matched, cards.length, moves, onComplete]);

  const handleFlip = (i: number) => {
    if (flipped.length >= 2 || flipped.includes(i) || matched.includes(i)) return;
    setFlipped((f) => [...f, i]);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-0">
      <p className="text-base text-gray-500 mb-4">同じ絵柄のペアを見つけましょう</p>
      <div className="grid grid-cols-4 gap-3 w-full max-w-xs">
        {cards.map((emoji, i) => {
          const isVisible = flipped.includes(i) || matched.includes(i);
          return (
            <button
              key={i}
              onClick={() => handleFlip(i)}
              className={`h-20 rounded-2xl text-3xl flex items-center justify-center transition-all duration-300 ${
                matched.includes(i)
                  ? "bg-green-100 border-2 border-green-400"
                  : isVisible
                  ? "bg-white border-2 border-purple-400"
                  : "bg-purple-200 active:bg-purple-300"
              }`}
            >
              {isVisible ? emoji : "?"}
            </button>
          );
        })}
      </div>
      <p className="text-sm text-gray-400 mt-4">{moves}回タップ</p>
    </div>
  );
}

// ========== 言葉つなぎ ==========
function WordChain({ onComplete }: { onComplete: (score: number) => void }) {
  const topics = ["果物の名前", "動物の名前", "花の名前"];
  const [topicIndex] = useState(Math.floor(Math.random() * topics.length));
  const [words, setWords] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete(words.length);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, words.length, onComplete]);

  const handleAdd = () => {
    if (input.trim() && !words.includes(input.trim())) {
      setWords((w) => [...w, input.trim()]);
      setInput("");
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="text-center mb-4">
        <p className="text-base text-gray-500">お題</p>
        <p className="text-2xl font-bold text-purple-600">{topics[topicIndex]}</p>
        <p className="text-lg text-gray-500 mt-1">をできるだけ多く入力してください</p>
      </div>

      <div className="text-center mb-4">
        <span className="text-4xl font-bold text-orange-500">{timeLeft}</span>
        <span className="text-lg text-gray-500">秒</span>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className="flex-1 h-12 border-2 border-gray-300 rounded-xl px-4 text-lg focus:border-purple-500 outline-none"
          placeholder="入力してください"
        />
        <button
          onClick={handleAdd}
          className="px-6 h-12 bg-purple-500 text-white text-lg font-bold rounded-xl active:bg-purple-600"
        >
          追加
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {words.map((w, i) => (
          <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-base">
            {w}
          </span>
        ))}
      </div>

      <div className="mt-auto text-center">
        <p className="text-2xl font-bold text-gray-800">{words.length}個</p>
      </div>
    </div>
  );
}

// ========== メインページ ==========
const brainInfo: Record<string, { name: string; emoji: string }> = {
  "brain-1": { name: "色読みテスト", emoji: "🎨" },
  "brain-2": { name: "計算チャレンジ", emoji: "🧮" },
  "brain-3": { name: "記憶カード", emoji: "🃏" },
  "brain-4": { name: "言葉つなぎ", emoji: "📝" },
};

export default function BrainExercisePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const info = brainInfo[id] || brainInfo["brain-1"];

  const [phase, setPhase] = useState<"intro" | "playing" | "result">("intro");
  const [score, setScore] = useState(0);

  const handleComplete = useCallback((s: number) => {
    setScore(s);
    setPhase("result");
  }, []);

  // ========== イントロ画面 ==========
  if (phase === "intro") {
    return (
      <div className="bg-amber-50 h-full px-6 py-6 flex flex-col items-center justify-center overflow-hidden">
        <span className="text-7xl mb-4">{info.emoji}</span>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{info.name}</h1>
        <p className="text-base text-gray-500 text-center mb-8">
          {id === "brain-1" && "表示される文字の「色」を素早く判断しましょう"}
          {id === "brain-2" && "簡単な計算を素早く解きましょう"}
          {id === "brain-3" && "同じ絵柄のカードのペアを見つけましょう"}
          {id === "brain-4" && "お題に合う言葉をたくさん思い出しましょう"}
        </p>
        <button
          onClick={() => setPhase("playing")}
          className="w-full h-[56px] bg-purple-500 text-white text-xl font-bold rounded-2xl active:bg-purple-600"
        >
          はじめる
        </button>
      </div>
    );
  }

  // ========== 結果画面 ==========
  if (phase === "result") {
    const maxScore = id === "brain-1" ? 6 : id === "brain-2" ? 6 : id === "brain-3" ? 6 : score;
    const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    const comment =
      pct >= 80 ? "素晴らしい！よくできました！" :
      pct >= 50 ? "いい調子です！続けましょう！" :
      "また挑戦しましょう！";

    // 正確性パラメーター (ゲームごとに項目を変える)
    const accuracyParams: Record<string, { label: string; score: number }[]> = {
      "brain-1": [
        { label: "反応速度", score: Math.min(100, 60 + pct * 0.4) | 0 },
        { label: "正確性", score: pct },
        { label: "集中力", score: Math.min(100, 55 + pct * 0.45) | 0 },
        { label: "認知の柔軟性", score: 100 },
      ],
      "brain-2": [
        { label: "計算スピード", score: Math.min(100, 58 + pct * 0.42) | 0 },
        { label: "正確性", score: pct },
        { label: "集中力", score: Math.min(100, 60 + pct * 0.4) | 0 },
        { label: "作業記憶", score: 100 },
      ],
      "brain-3": [
        { label: "記憶力", score: Math.min(100, 55 + pct * 0.45) | 0 },
        { label: "空間認識", score: pct },
        { label: "集中力", score: Math.min(100, 62 + pct * 0.38) | 0 },
        { label: "注意力", score: 100 },
      ],
      "brain-4": [
        { label: "語彙力", score: Math.min(100, score * 10) },
        { label: "発想力", score: Math.min(100, score * 12) },
        { label: "集中力", score: Math.min(100, 60 + score * 4) },
        { label: "流暢性", score: 100 },
      ],
    };
    const params = accuracyParams[id] || accuracyParams["brain-1"];

    // 心の状態スコア
    const mentalScore = Math.min(100, 50 + pct * 0.4 + Math.floor(Math.random() * 10)) | 0;
    const mentalEmoji =
      mentalScore >= 80 ? "😄" : mentalScore >= 65 ? "😊" : mentalScore >= 50 ? "🙂" : "😐";
    const mentalMessage =
      mentalScore >= 80 ? "とても元気な状態です！" :
      mentalScore >= 65 ? "良い調子ですね！" :
      mentalScore >= 50 ? "まあまあ普通の状態ですね。" :
      "少し疲れていますね。ゆっくり休みましょう。";

    return (
      <div className="bg-amber-50 h-full px-4 py-4 flex flex-col overflow-y-auto">
        <div className="flex flex-col items-center mb-4">
          <span className="text-5xl mb-1">🧠</span>
          <h1 className="text-xl font-bold text-gray-800">結果</h1>
          <p className="text-4xl font-bold text-purple-500 my-2">
            {id === "brain-4" ? `${score}個` : `${score} / ${maxScore}`}
          </p>
          <p className="text-base text-gray-600">{comment}</p>
        </div>

        {/* 心の状態スコア */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-3">
          <p className="text-sm text-gray-500 mb-2">心の状態スコア</p>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{mentalEmoji}</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-base text-gray-700 font-bold">{mentalScore}点</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-400 rounded-full transition-all duration-500"
                  style={{ width: `${mentalScore}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">{mentalMessage}</p>
            </div>
          </div>
        </div>

        {/* 正確性パラメーター */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-3">
          <p className="text-sm text-gray-500 mb-3">今回の正確性</p>
          <div className="space-y-3">
            {params.map((item) => {
              const colorClass = item.score >= 90 ? "text-green-500" : item.score >= 75 ? "text-orange-500" : "text-red-400";
              const barColor = item.score >= 90 ? "bg-green-400" : item.score >= 75 ? "bg-orange-400" : "bg-red-400";
              return (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <span className={`text-sm font-bold ${colorClass}`}>{item.score}点</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full transition-all duration-500`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full space-y-3 mt-auto">
          <button
            onClick={() => { setPhase("intro"); setScore(0); }}
            className="w-full h-[52px] bg-purple-500 text-white text-xl font-bold rounded-2xl active:bg-purple-600"
          >
            もう一度
          </button>
          <button
            onClick={() => router.push("/exercise/menu-brain")}
            className="w-full h-[52px] bg-gray-100 text-gray-700 border border-gray-300 text-lg font-medium rounded-2xl"
          >
            メニューに戻る
          </button>
          <button
            onClick={() => router.push("/home-panda")}
            className="w-full h-[52px] bg-gray-100 text-gray-700 border border-gray-300 text-lg font-medium rounded-2xl"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    );
  }

  // ========== プレイ中 ==========
  return (
    <div className="bg-amber-50 h-full px-6 py-6 flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 mb-4 shrink-0">
        <span className="text-2xl">{info.emoji}</span>
        <h1 className="text-lg font-bold text-gray-800">{info.name}</h1>
      </div>
      {id === "brain-1" && <ColorTest onComplete={handleComplete} />}
      {id === "brain-2" && <CalcChallenge onComplete={handleComplete} />}
      {id === "brain-3" && <MemoryCards onComplete={handleComplete} />}
      {id === "brain-4" && <WordChain onComplete={handleComplete} />}
    </div>
  );
}
