"use client";

import { useState } from "react";
import { Heart, Send, Sparkles } from "lucide-react";
import { dailyLog } from "@/lib/dummyData";
import AnimatedCat from "@/components/AnimatedCat";

const familyMember = {
  name: "美咲",
  relation: "娘",
  image: "/family-misaki.png",
};

export default function FamilyViewPage() {
  const logs = dailyLog.filter((d) => d.records.length > 0).slice(0, 4);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [openMsg, setOpenMsg] = useState<Record<string, boolean>>({});
  const [messages, setMessages] = useState<Record<string, string>>({});

  const handleLike = (key: string) => {
    setLiked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMsg = (key: string) => {
    setOpenMsg((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSend = (key: string) => {
    setMessages((prev) => ({ ...prev, [key]: "" }));
    setOpenMsg((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <div className="bg-amber-50 min-h-screen px-5 py-6 space-y-4">
      {/* ヘッダー */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-200 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={familyMember.image} alt={familyMember.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {familyMember.relation} {familyMember.name}の体操記録
          </h1>
          <p className="text-base text-gray-500 mt-0.5">
            {familyMember.relation} {familyMember.name}の体操記録が確認できます
          </p>
        </div>
      </div>

      {/* 猫の育成状況 */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center">
        <p className="text-base font-bold text-gray-700 self-start mb-2">娘 美咲の猫の育成状況</p>
        <AnimatedCat
          mood="neutral"
          mainColor="#9B59B6"
          innerColor="#D7BDE2"
          bellyColor="#F5EEF8"
        />
        <p className="text-lg font-bold text-purple-600 mt-1">やんちゃ猫 🐾</p>
        <div className="w-full max-w-xs mt-2">
          <div className="flex items-center gap-2">
            <Sparkles className="text-yellow-500 shrink-0" size={16} />
            <div className="flex-1">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Lv.2</span>
                <span>次のレベルまで 35exp</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-400 rounded-full" style={{ width: "55%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 記録カード一覧 */}
      {logs.map((dayLog) =>
        dayLog.records.map((rec, i) => {
          const cardKey = `${dayLog.date}-${i}`;
          return (
            <div key={cardKey}>
              {i === 0 && (
                <p className="text-base font-bold text-gray-600 mb-1 px-1">{dayLog.date}</p>
              )}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* 体操記録 */}
                <div className="px-4 pt-4 pb-3 flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-gray-800">{rec.menu}</p>
                    <p className="text-base text-gray-500 mt-0.5">{rec.time}</p>
                  </div>
                  {dayLog.mentalScore > 0 && (
                    <div className="flex items-center gap-1 bg-pink-50 px-3 py-1.5 rounded-full">
                      <span className="text-2xl">{dayLog.mentalEmoji}</span>
                      <span className="text-lg font-bold text-pink-500">{dayLog.mentalScore}点</span>
                    </div>
                  )}
                </div>

                {/* 区切り線 */}
                <div className="h-px bg-gray-100 mx-4" />

                {/* ボタン行 */}
                <div className="px-4 py-3 flex items-center gap-3">
                  <button
                    onClick={() => handleLike(cardKey)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all duration-200 ${
                      liked[cardKey]
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 bg-white active:bg-gray-50"
                    }`}
                  >
                    <Heart size={22} className={liked[cardKey] ? "text-red-400 fill-red-400" : "text-gray-400"} />
                    <span className={`text-base font-medium ${liked[cardKey] ? "text-red-400" : "text-gray-500"}`}>
                      いいね！
                    </span>
                  </button>

                  <button
                    onClick={() => toggleMsg(cardKey)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-gray-200 bg-white active:bg-gray-50 transition-all duration-200"
                  >
                    <Send size={20} className="text-gray-400" />
                    <span className="text-base font-medium text-gray-500">メッセージ</span>
                  </button>
                </div>

                {/* メッセージ入力（展開） */}
                {openMsg[cardKey] && (
                  <div className="px-4 pb-4 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-orange-200 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/after.png" alt="自分" className="w-full h-full object-cover" />
                    </div>
                    <input
                      type="text"
                      value={messages[cardKey] || ""}
                      onChange={(e) => setMessages((prev) => ({ ...prev, [cardKey]: e.target.value }))}
                      placeholder={`${familyMember.name}にメッセージを送る`}
                      className="flex-1 text-base text-gray-700 placeholder-gray-400 bg-gray-100 rounded-full px-4 py-2 outline-none"
                    />
                    <button
                      onClick={() => handleSend(cardKey)}
                      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        (messages[cardKey] || "").trim() ? "bg-orange-500 active:bg-orange-600" : "bg-gray-200"
                      }`}
                    >
                      <Send size={16} className={(messages[cardKey] || "").trim() ? "text-white" : "text-gray-400"} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
