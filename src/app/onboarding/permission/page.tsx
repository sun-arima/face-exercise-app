"use client";

import { useRouter } from "next/navigation";
import { Camera, ShieldCheck, CheckCircle } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function PermissionPage() {
  const router = useRouter();
  const { setCameraPermission } = useAppContext();

  return (
    <div className="bg-amber-50 h-full px-6 py-6 flex flex-col items-center overflow-hidden">
      {/* カメラアイコン */}
      <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mt-4 shrink-0">
        <Camera className="text-orange-500" size={40} />
      </div>

      {/* タイトル */}
      <h1 className="text-xl font-bold text-gray-800 mt-4 shrink-0">
        カメラの使用を許可してください
      </h1>

      {/* 説明文 */}
      <p className="text-base text-gray-600 text-center mt-3 shrink-0">
        お顔の体操中にカメラを使用します
      </p>

      {/* 理由リスト */}
      <div className="w-full bg-white rounded-2xl shadow-sm p-4 mt-4 space-y-3 shrink-0">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle className="text-green-600" size={14} />
          </div>
          <p className="text-base text-gray-700">
            正しく動けているかチェックするため
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle className="text-green-600" size={14} />
          </div>
          <p className="text-base text-gray-700">
            心の状態を分析するため
          </p>
        </div>
      </div>

      <div className="flex-1" />

      {/* ボタン */}
      <div className="w-full space-y-3 shrink-0">
        <button
          onClick={() => {
            setCameraPermission(true);
            router.push("/onboarding/family-simple");
          }}
          className="w-full h-[52px] bg-orange-500 text-white text-lg font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300"
        >
          許可する
        </button>
        <button
          onClick={() => router.push("/onboarding/family-simple")}
          className="w-full h-[52px] bg-gray-100 text-gray-700 border border-gray-300 text-lg font-medium rounded-2xl"
        >
          あとで設定する
        </button>
      </div>

      {/* 安心テキスト */}
      <div className="flex items-center gap-2 mt-3 shrink-0">
        <ShieldCheck className="text-gray-400" size={16} />
        <p className="text-sm text-gray-400">データは外部に送信されません</p>
      </div>
    </div>
  );
}
