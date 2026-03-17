"use client";

import { useRouter } from "next/navigation";
import { Camera, ShieldCheck } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function PermissionPage() {
  const router = useRouter();
  const { setCameraPermission } = useAppContext();

  return (
    <div className="bg-amber-50 h-full px-6 py-6 flex flex-col items-center justify-center overflow-hidden">
      {/* カメラアイコン */}
      <div className="w-28 h-28 bg-orange-100 rounded-full flex items-center justify-center mb-8">
        <Camera className="text-orange-500" size={56} />
      </div>

      {/* 説明文 */}
      <p className="text-lg text-gray-700 text-center leading-relaxed mb-8">
        お顔の体操中に、あなたの顔をカメラで確認します。
        <br />
        正しく動けているかをチェックするために使います。
      </p>

      {/* ボタン */}
      <div className="w-full space-y-4">
        <button
          onClick={() => {
            setCameraPermission(true);
            router.push("/onboarding/family");
          }}
          className="w-full h-[56px] bg-orange-500 text-white text-xl font-bold rounded-2xl active:bg-orange-600 transition-colors duration-300"
        >
          許可する
        </button>
        <button
          onClick={() => router.push("/onboarding/family")}
          className="w-full h-[56px] bg-gray-100 text-gray-700 border border-gray-300 text-xl font-medium rounded-2xl"
        >
          あとで設定する
        </button>
      </div>

      {/* 安心テキスト */}
      <div className="flex items-center gap-2 mt-6">
        <ShieldCheck className="text-gray-400" size={18} />
        <p className="text-sm text-gray-400">データは外部に送信されません</p>
      </div>
    </div>
  );
}
