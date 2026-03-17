"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  BarChart,
  Bar,
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
} from "@/lib/dummyData";

export default function LogPage() {
  const [weekOffset, setWeekOffset] = useState(0); // 0 = this week, 1 = prev week

  const currentWeekly = weekOffset === 0 ? weeklyLog : prevWeeklyLog;
  const currentDaily = weekOffset === 0 ? dailyLog : prevDailyLog;

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

      {/* 日別折れ線グラフ */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
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

      {/* タイムライン */}
      <div className="space-y-4">
        {currentDaily.map((day, di) => (
          <div key={di}>
            <p className="text-lg font-bold text-gray-700 mb-2">{day.date}</p>
            {day.records.length === 0 ? (
              <p className="text-lg text-gray-400 ml-2">この日は休みました</p>
            ) : (
              <div className="space-y-2">
                {day.records.map((rec, ri) => (
                  <div
                    key={ri}
                    className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0" />
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-800">
                        {rec.menu}
                      </p>
                      <p className="text-sm text-gray-500">{rec.time}</p>
                    </div>
                    <div className="flex gap-1">
                      {rec.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
