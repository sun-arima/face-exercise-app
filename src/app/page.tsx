"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashPage() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
    const navTimer = setTimeout(() => {
      router.replace("/onboarding/intro");
    }, 2800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [router]);

  return (
    <div
      className={`bg-amber-50 h-full flex flex-col items-center justify-center transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src="/character.png"
        alt="キャラクター"
        width={120}
        height={120}
        className="mb-6"
      />
      <h1 className="text-3xl font-bold text-orange-500 mb-2">顔まわり体操</h1>
      <p className="text-lg text-gray-500">毎日をいきいきと</p>
    </div>
  );
}
