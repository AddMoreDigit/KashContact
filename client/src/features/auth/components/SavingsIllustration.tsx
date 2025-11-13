export function SavingsIllustration() {
  return (
    <svg width="300" height="300" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ground */}
      <path d="M50 350 H350" stroke="#E5E7EB" strokeWidth="2" />

      {/* Jar */}
      <rect x="120" y="200" width="160" height="120" rx="20" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="4" />
      <rect x="110" y="180" width="180" height="30" rx="15" fill="#4B5563" />
      <rect x="170" y="185" width="60" height="10" rx="5" fill="#374151" />

      {/* Coins in Jar */}
      <circle cx="160" cy="250" r="20" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
      <text x="155" y="255" fontFamily="Arial" fontSize="16" fill="#B45309">$</text>
      <circle cx="200" cy="260" r="22" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
      <text x="195" y="265" fontFamily="Arial" fontSize="16" fill="#B45309">$</text>
      <circle cx="240" cy="240" r="18" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
      <text x="235" y="245" fontFamily="Arial" fontSize="16" fill="#B45309">$</text>
      <circle cx="180" cy="280" r="25" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
      <text x="175" y="285" fontFamily="Arial" fontSize="16" fill="#B45309">$</text>

      {/* Person */}
      <g>
        <rect x="250" y="120" width="60" height="120" rx="30" fill="#FFF7ED" />
        <circle cx="280" cy="100" r="30" fill="#FFE4C4" />
        <path d="M260 90 Q 280 70 300 90" stroke="#4A2C2A" strokeWidth="4" fill="none" />
        <circle cx="270" cy="95" r="3" fill="black" />
        <circle cx="290" cy="95" r="3" fill="black" />
        <rect x="250" y="240" width="20" height="50" fill="#4A5568" />
        <rect x="290" y="240" width="20" height="50" fill="#4A5568" />
      </g>

      {/* Floating Coin */}
      <g transform="rotate(-15, 240, 150)">
        <circle cx="240" cy="150" r="25" fill="#FBBF24" stroke="#F59E0B" strokeWidth="3" />
        <text x="232" y="158" fontFamily="Arial" fontSize="24" fill="#B45309" fontWeight="bold">$</text>
      </g>

      {/* Background elements */}
      <g>
        {/* Calculator */}
        <rect x="280" y="50" width="70" height="90" rx="10" fill="#E0E7FF" stroke="#C7D2FE" strokeWidth="2" />
        <rect x="290" y="60" width="50" height="20" fill="white" rx="5" />
        <circle cx="298" cy="90" r="4" fill="#A5B4FC" />
        <circle cx="313" cy="90" r="4" fill="#A5B4FC" />
        <circle cx="328" cy="90" r="4" fill="#A5B4FC" />
        <circle cx="298" cy="105" r="4" fill="#A5B4FC" />
        <circle cx="313" cy="105" r="4" fill="#A5B4FC" />
        <circle cx="328" cy="105" r="4" fill="#A5B4FC" />

        {/* Dollar Bill */}
        <rect x="80" y="80" width="50" height="25" rx="5" fill="#A7F3D0" stroke="#6EE7B7" strokeWidth="2" transform="rotate(-20, 80, 80)" />
        <text x="98" y="98" fontFamily="Arial" fontSize="14" fill="#065F46" transform="rotate(-20, 80, 80)">$</text>
      </g>
    </svg>
  );
}