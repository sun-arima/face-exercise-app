export default function CharacterSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 体（ピンクのトップス） */}
      <ellipse cx="90" cy="210" rx="55" ry="30" fill="#F5A0A0" />

      {/* 左腕（案内するポーズ） */}
      <path
        d="M135 185 Q160 160 175 140"
        stroke="#3D3D3D"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* 左手のひら */}
      <ellipse cx="178" cy="136" rx="12" ry="8" fill="#FCEBD5" stroke="#3D3D3D" strokeWidth="2.5" />
      {/* 指 */}
      <line x1="170" y1="130" x2="167" y2="124" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" />
      <line x1="175" y1="128" x2="174" y2="121" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" />
      <line x1="180" y1="128" x2="181" y2="121" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" />
      <line x1="185" y1="130" x2="188" y2="124" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round" />

      {/* 右腕 */}
      <path
        d="M45 185 Q30 195 25 200"
        stroke="#3D3D3D"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* 首 */}
      <rect x="80" y="150" width="20" height="20" rx="5" fill="#FCEBD5" />

      {/* 髪の毛（後ろ） */}
      <ellipse cx="90" cy="90" rx="52" ry="60" fill="#4A4A4A" />

      {/* 顔 */}
      <ellipse cx="90" cy="95" rx="42" ry="48" fill="#FCEBD5" />

      {/* 髪の毛（前髪） */}
      <path
        d="M48 75 Q55 50 90 45 Q125 50 132 75 Q130 60 115 55 Q100 52 90 55 Q80 52 65 55 Q50 60 48 75Z"
        fill="#4A4A4A"
      />
      {/* 左サイド髪 */}
      <path
        d="M48 75 Q42 95 44 120 Q46 135 52 145 Q48 130 48 110 Q48 90 48 75Z"
        fill="#4A4A4A"
      />
      {/* 右サイド髪 */}
      <path
        d="M132 75 Q138 95 136 120 Q134 135 128 145 Q132 130 132 110 Q132 90 132 75Z"
        fill="#4A4A4A"
      />

      {/* 眉毛 */}
      <path d="M68 82 Q75 78 82 82" stroke="#4A4A4A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M98 82 Q105 78 112 82" stroke="#4A4A4A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* 目 */}
      <circle cx="75" cy="92" r="4" fill="#3D3D3D" />
      <circle cx="105" cy="92" r="4" fill="#3D3D3D" />
      {/* 目のハイライト */}
      <circle cx="76.5" cy="90.5" r="1.5" fill="white" />
      <circle cx="106.5" cy="90.5" r="1.5" fill="white" />

      {/* ほっぺ */}
      <ellipse cx="65" cy="105" rx="8" ry="5" fill="#FBBFBF" opacity="0.5" />
      <ellipse cx="115" cy="105" rx="8" ry="5" fill="#FBBFBF" opacity="0.5" />

      {/* 鼻 */}
      <circle cx="90" cy="102" r="2" fill="#E8C9A8" />

      {/* 口（にっこり） */}
      <path
        d="M80 113 Q90 122 100 113"
        stroke="#4A4A4A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
