"use client";

import { useState, useEffect } from "react";

type Mood = "happy" | "neutral" | "sleepy";

export default function AnimatedCat({
  mood = "neutral",
  bounce = false,
  onClick,
  mainColor = "#F5A623",
  innerColor = "#FFD4A8",
  bellyColor = "#FFF3E0",
}: {
  mood?: Mood;
  bounce?: boolean;
  onClick?: () => void;
  mainColor?: string;
  innerColor?: string;
  bellyColor?: string;
}) {
  const [blink, setBlink] = useState(false);
  const [tailWag, setTailWag] = useState(false);

  // 定期的にまばたき
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  // しっぽを振る
  useEffect(() => {
    const interval = setInterval(() => {
      setTailWag((prev) => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const eyeOpen = mood === "sleepy" || blink;

  return (
    <button
      onClick={onClick}
      className={`transition-transform duration-300 ${
        bounce ? "scale-110" : "scale-100"
      }`}
      style={{ width: 280, height: 280 }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* しっぽ */}
        <path
          d={
            tailWag
              ? "M 145 140 Q 180 100 170 80"
              : "M 145 140 Q 185 110 165 85"
          }
          stroke={mainColor}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          style={{ transition: "d 0.8s ease-in-out" }}
        />

        {/* 体 */}
        <ellipse cx="100" cy="145" rx="50" ry="35" fill={mainColor} />

        {/* 頭 */}
        <circle cx="100" cy="90" r="42" fill={mainColor} />

        {/* 左耳 */}
        <polygon points="65,55 55,20 85,45" fill={mainColor} />
        <polygon points="68,52 60,28 82,47" fill={innerColor} />

        {/* 右耳 */}
        <polygon points="135,55 145,20 115,45" fill={mainColor} />
        <polygon points="132,52 140,28 118,47" fill={innerColor} />

        {/* お腹 */}
        <ellipse cx="100" cy="150" rx="32" ry="22" fill={bellyColor} />

        {/* 顔の白い部分 */}
        <ellipse cx="100" cy="98" rx="30" ry="25" fill={bellyColor} />

        {/* 目 */}
        {eyeOpen ? (
          <>
            {/* 閉じ目 */}
            <path d="M 82 85 Q 85 90 88 85" stroke="#5D4037" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 112 85 Q 115 90 118 85" stroke="#5D4037" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* 開き目 */}
            <ellipse cx="85" cy="85" rx="6" ry="7" fill="#5D4037" />
            <ellipse cx="115" cy="85" rx="6" ry="7" fill="#5D4037" />
            {/* ハイライト */}
            <circle cx="83" cy="83" r="2" fill="white" />
            <circle cx="113" cy="83" r="2" fill="white" />
          </>
        )}

        {/* 鼻 */}
        <ellipse cx="100" cy="95" rx="3.5" ry="2.5" fill="#E8967A" />

        {/* 口 */}
        {mood === "happy" ? (
          <>
            <path d="M 93 100 Q 100 108 107 100" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M 100 97 L 100 100" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 94 101 Q 97 103 100 100" stroke="#5D4037" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 106 101 Q 103 103 100 100" stroke="#5D4037" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </>
        )}

        {/* ひげ */}
        <line x1="60" y1="90" x2="78" y2="93" stroke="#5D4037" strokeWidth="1.2" />
        <line x1="58" y1="97" x2="78" y2="97" stroke="#5D4037" strokeWidth="1.2" />
        <line x1="122" y1="93" x2="140" y2="90" stroke="#5D4037" strokeWidth="1.2" />
        <line x1="122" y1="97" x2="142" y2="97" stroke="#5D4037" strokeWidth="1.2" />

        {/* 前足 */}
        <ellipse cx="80" cy="168" rx="12" ry="8" fill={mainColor} />
        <ellipse cx="120" cy="168" rx="12" ry="8" fill={mainColor} />

        {/* 頬の赤み（happyの時） */}
        {mood === "happy" && (
          <>
            <circle cx="72" cy="95" r="6" fill="#FFCDD2" opacity="0.6" />
            <circle cx="128" cy="95" r="6" fill="#FFCDD2" opacity="0.6" />
          </>
        )}

        {/* 呼吸アニメーション */}
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,-2;0,0"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </svg>
    </button>
  );
}
