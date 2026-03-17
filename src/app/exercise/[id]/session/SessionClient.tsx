"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { exerciseSteps, menus } from "@/lib/dummyData";

export default function SessionClient() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const menu = menus.find((m) => m.id === id) || menus[0];

  const [stepIndex, setStepIndex] = useState(0);
  const [repeatIndex, setRepeatIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3000);
  const [isTransition, setIsTransition] = useState(false);
  const [transitionText, setTransitionText] = useState("");
  const [borderGreen, setBorderGreen] = useState(false);

  const currentStep = exerciseSteps[stepIndex];
  const totalSteps = exerciseSteps.length;

  useEffect(() => {
    if (isTransition) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 100) return 0;
        return prev - 100;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isTransition, stepIndex, repeatIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBorderGreen((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (repeatIndex < currentStep.repeatCount - 1) {
      setRepeatIndex((prev) => prev + 1);
      setTimeLeft(3000);
    } else if (stepIndex < totalSteps - 1) {
      setIsTransition(true);
      setTransitionText(`次の動き：${exerciseSteps[stepIndex + 1].name}`);
      setTimeout(() => {
        setStepIndex((prev) => prev + 1);
        setRepeatIndex(0);
        setTimeLeft(3000);
        setIsTransition(false);
      }, 2000);
    } else {
      router.push(`/exercise/${id}/result`);
    }
  };

  if (isTransition) {
    return (
      <div className="bg-amber-50 min-h-screen flex items-center justify-center px-6">
        <p className="text-2xl font-bold text-orange-500 text-center animate-pulse">
          {transitionText}
        </p>
      </div>
    );
  }

  const isLastAction =
    stepIndex === totalSteps - 1 &&
    repeatIndex === currentStep.repeatCount - 1;

  return (
    <div className="bg-amber-50 h-full px-6 py-6 flex flex-col overflow-hidden">
      <div className="flex gap-2 mb-3 shrink-0">
        {exerciseSteps.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full transition-colors duration-300 ${
              i < stepIndex
                ? "bg-orange-500"
                : i === stepIndex
                ? "bg-orange-400 animate-pulse"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mb-2 shrink-0">
        <span className="text-base text-gray-600">
          第{stepIndex + 1}ステップ / 全{totalSteps}ステップ
        </span>
        <span className="text-base text-gray-600">
          {repeatIndex + 1} / {currentStep.repeatCount}回目
        </span>
      </div>

      <Progress
        value={(timeLeft / 3000) * 100}
        className="h-3 mb-3 shrink-0 [&>div]:bg-orange-500"
      />

      <div className="bg-gray-300 rounded-2xl flex-[3] min-h-0 flex flex-col items-center justify-center shrink-0">
        <span className="text-4xl mb-2">{menu.emoji}</span>
        <p className="text-xl text-gray-600 font-bold">{currentStep.name}</p>
      </div>

      <div className="h-3 shrink-0" />

      <div
        className={`rounded-2xl flex-[3] min-h-0 flex flex-col items-center justify-center transition-colors duration-300 relative shrink-0 ${
          borderGreen
            ? "bg-gray-200 border-4 border-green-500"
            : "bg-gray-300 border-4 border-gray-400"
        }`}
      >
        <span className="text-lg text-gray-500">あなたの顔</span>
        <p className="absolute bottom-2 left-0 right-0 text-base text-orange-500 font-medium text-center bg-white/80 mx-2 rounded-xl py-1 px-2">
          {currentStep.effect}
        </p>
      </div>

      <div className="h-3 shrink-0" />

      <button
        onClick={handleNext}
        className="w-full h-[56px] bg-orange-500 text-white text-xl font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300 shrink-0"
      >
        {isLastAction ? "体操を終了する" : "次へ進む"}
      </button>
    </div>
  );
}
