import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import PhoneLayout from "@/components/PhoneLayout";
import "./globals.css";

const noto = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "顔まわり体操",
  description: "シニア向け顔まわり体操アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={noto.variable}>
      <body className={`${noto.className} antialiased bg-gray-200 h-screen flex items-center justify-center overflow-hidden p-2`}>
        <AppProvider>
          <div className="relative mx-auto" style={{ aspectRatio: '430 / 932', height: '98vh', maxHeight: '932px', maxWidth: '95vw' }}>
            {/* スマホ外枠 */}
            <div className="absolute inset-0 rounded-[3rem] border-[12px] border-gray-900 pointer-events-none z-50" />
            {/* ノッチ */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[3.2%] bg-gray-900 rounded-b-2xl z-50" />
            {/* ホームインジケーター */}
            <div className="absolute bottom-[1%] left-1/2 -translate-x-1/2 w-[30%] h-1 bg-gray-900 rounded-full z-50" />
            {/* コンテンツエリア */}
            <PhoneLayout>{children}</PhoneLayout>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
