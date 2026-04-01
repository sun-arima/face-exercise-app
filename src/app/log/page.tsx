"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  weeklyLog,
  prevWeeklyLog,
  dailyLog,
  prevDailyLog,
  weeklyMentalScore,
  prevWeeklyMentalScore,
} from "@/lib/dummyData";

export default function LogPage() {
  const [weekOffset, setWeekOffset] = useState(0);

  const currentWeekly = weekOffset === 0 ? weeklyLog : prevWeeklyLog;
  const currentDaily = weekOffset === 0 ? dailyLog : prevDailyLog;
  const currentMental = weekOffset === 0 ? weeklyMentalScore : prevWeeklyMentalScore;

  const totalMinutes = currentWeekly.reduce((sum, d) => sum + d.minutes, 0);
  const prevTotal = prevWeeklyLog.reduce((sum, d) => sum + d.minutes, 0);
  const diff = weekOffset === 0 ? totalMinutes - prevTotal : 0;

  const weekLabel =
    weekOffset === 0 ? "3/10〜3/16" : "3/3〜3/9";

  return (
    <div className="bg-amber-50 min-h-screen px-6 py-8 space-y-6">
      {/* 週切替ヘッダー */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWeekOffset(1)}
          className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white shadow"
          disabled={weekOffset === 1}
        >
          <ChevronLeft size={24} className={weekOffset === 1 ? "text-gray-300" : "text-gray-600"} />
        </button>
        <span className="text-2xl font-bold text-gray-800">{weekLabel}</span>
        <button
          onClick={() => setWeekOffset(0)}
          className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white shadow"
          disabled={weekOffset === 0}
        >
          <ChevronRight size={24} className={weekOffset === 0 ? "text-gray-300" : "text-gray-600"} />
        </button>
      </div>

      {/* 累計時間カード */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <p className="text-xl text-gray-700">
          今週の体操時間：<span className="font-bold text-2xl">{totalMinutes}分</span>
        </p>
        {weekOffset === 0 && (
          <p className="text-lg text-green-500 mt-1">
            先週より＋{diff}分 ↑
          </p>
        )}
      </div>

      {/* 体操時間グラフ */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <p className="text-base font-bold text-gray-700 mb-2">📊 日別の体操時間</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={currentWeekly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fontSize: 14 }} />
            <YAxis unit="分" tick={{ fontSize: 12 }} />
            <Bar
              dataKey="minutes"
              fill="#f97316"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 心の状態スコア推移グラフ */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <p className="text-base font-bold text-gray-700 mb-2">😊 心の状態スコア</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={currentMental}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fontSize: 14 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#ec4899"
              strokeWidth={3}
              dot={{ fill: "#ec4899", r: 4 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 mt-1">※ 0の日は体操をお休みした日です</p>
      </div>

      {/* タイムライン */}
      <div className="space-y-4">
        {currentDaily.map((day, di) => (
          <div key={di}>
            <p className="text-lg font-bold text-gray-700 mb-2">{day.date}</p>
            {day.records.length === 0 ? (
              <p className="text-lg text-gray-400 ml-2">この日は休みました</p>
            ) : (
              <div className="space-y-2">
                {day.records.map((rec, ri) => {
                  const emoji =
                    day.mentalScore >= 80 ? "😄" :
                    day.mentalScore >= 65 ? "😊" :
                    day.mentalScore >= 50 ? "😌" :
                    day.mentalScore > 0 ? "😩" : "";
                  return (
                    <div
                      key={ri}
                      className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3"
                    >
                      <div className="flex-1">
                        <p className="text-lg font-medium text-gray-800">{rec.menu}</p>
                        <p className="text-sm text-gray-500">{rec.time}</p>
                      </div>
                      {day.mentalScore > 0 && (
                        <div className="shrink-0 flex items-center gap-1 bg-pink-50 px-3 py-1.5 rounded-full">
                          <span className="text-xl">{emoji}</span>
                          <span className="text-base font-bold text-pink-500">{day.mentalScore}点</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
