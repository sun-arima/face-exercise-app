"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { analysisReport } from "@/lib/dummyData";

export default function AnalysisPage() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [openIndicator, setOpenIndicator] = useState<number | null>(null);

  return (
    <div className="bg-amber-50 min-h-screen px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {analysisReport.month}の分析レポート
        </h1>
        <p className="text-lg text-gray-500">3月1日〜3月16日</p>
      </div>

      {/* ビフォーアフター比較 */}
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="relative w-full h-36 bg-gray-300 rounded-2xl overflow-hidden">
            {showOverlay && (
              <svg className="absolute inset-0 w-full h-full">
                <ellipse
                  cx="50%"
                  cy="70%"
                  rx="25"
                  ry="12"
                  fill="rgba(249,115,22,0.4)"
                />
                <text
                  x="50%"
                  y="70%"
                  textAnchor="middle"
                  dy="4"
                  fontSize="10"
                  fill="#c2410c"
                >
                  改善
                </text>
              </svg>
            )}
          </div>
          <span className="text-lg text-gray-600">
            {analysisReport.beforePhotoLabel}
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="relative w-full h-36 bg-gray-300 rounded-2xl overflow-hidden">
            {showOverlay && (
              <svg className="absolute inset-0 w-full h-full">
                {/* 口角 */}
                <ellipse
                  cx="50%"
                  cy="72%"
                  rx="28"
                  ry="14"
                  fill="rgba(249,115,22,0.4)"
                />
                <text
                  x="50%"
                  y="72%"
                  textAnchor="middle"
                  dy="4"
                  fontSize="10"
                  fill="#c2410c"
                >
                  改善
                </text>
                {/* 頬 */}
                <ellipse
                  cx="30%"
                  cy="55%"
                  rx="20"
                  ry="15"
                  fill="rgba(249,115,22,0.3)"
                />
                <text
                  x="30%"
                  y="55%"
                  textAnchor="middle"
                  dy="4"
                  fontSize="10"
                  fill="#c2410c"
                >
                  改善
                </text>
                {/* 目元 */}
                <ellipse
                  cx="50%"
                  cy="35%"
                  rx="30"
                  ry="10"
                  fill="rgba(249,115,22,0.3)"
                />
                <text
                  x="50%"
                  y="35%"
                  textAnchor="middle"
                  dy="4"
                  fontSize="10"
                  fill="#c2410c"
                >
                  改善
                </text>
              </svg>
            )}
          </div>
          <span className="text-lg text-gray-600">
            {analysisReport.afterPhotoLabel}
          </span>
        </div>
      </div>

      {/* オーバーレイ切替ボタン */}
      <button
        onClick={() => setShowOverlay(!showOverlay)}
        className="w-full h-[60px] bg-gray-100 text-gray-700 border border-gray-300 text-lg font-medium rounded-2xl"
      >
        {showOverlay ? "変化を隠す" : "変化を見る"}
      </button>

      {/* AIアドバイスカード */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-orange-300">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-orange-500" size={24} />
          <span className="text-xl font-bold text-orange-500">
            AIからのアドバイス
          </span>
        </div>
        <p className="text-xl text-gray-700">{analysisReport.aiComment}</p>
        <div className="mt-4 bg-orange-50 rounded-2xl p-4">
          <p className="text-lg font-medium text-gray-700">
            おすすめ：{analysisReport.suggestedMenu}
          </p>
          <p className="text-base text-gray-500 mt-1">
            {analysisReport.suggestedReason}
          </p>
        </div>
      </div>

      {/* 4指標アコーディオン */}
      <div className="space-y-3">
        {analysisReport.indicators.map((ind, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button
              onClick={() =>
                setOpenIndicator(openIndicator === i ? null : i)
              }
              className="w-full p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-gray-800">
                  {ind.name}
                </span>
                <span className="text-lg text-orange-500 font-medium">
                  +{ind.improvement}%
                </span>
              </div>
              {openIndicator === i ? (
                <ChevronUp size={24} className="text-gray-400" />
              ) : (
                <ChevronDown size={24} className="text-gray-400" />
              )}
            </button>
            {openIndicator === i && (
              <div className="px-5 pb-5">
                <p className="text-lg text-gray-600">{ind.comment}</p>
                <div className="mt-2 bg-gray-100 rounded-xl h-3 overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-xl"
                    style={{ width: `${ind.score}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1 text-right">
                  スコア: {ind.score}/100
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
