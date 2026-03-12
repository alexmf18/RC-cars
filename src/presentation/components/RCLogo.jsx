function RCLogo({ mode = "card" }) {
  const isWordmark = mode === "wordmark";

  return (
    <svg
      viewBox={isWordmark ? "0 0 360 100" : "0 0 420 280"}
      className="w-full"
      role="img"
      aria-label="RC Cars logo"
    >
      <defs>
        <linearGradient id="rcWarmGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D08A5B" />
          <stop offset="100%" stopColor="#B65E3C" />
        </linearGradient>
      </defs>

      {!isWordmark && (
        <rect
          x="16"
          y="16"
          width="388"
          height="248"
          rx="24"
          fill="#FFFDF9"
          stroke="#EADBCB"
          strokeWidth="2"
        />
      )}

      <g
        transform={isWordmark ? "translate(8,0) scale(0.4)" : "translate(0,0)"}
      >
        <path
          d="M76 186 L120 126 L162 186"
          fill="none"
          stroke="url(#rcWarmGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M188 186 V126 H242"
          fill="none"
          stroke="#2D201A"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M242 126 L188 156"
          fill="none"
          stroke="#2D201A"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect x="254" y="112" width="98" height="20" rx="10" fill="#E7A764" />
        <circle cx="278" cy="188" r="18" fill="#2D201A" />
        <circle cx="332" cy="188" r="18" fill="#2D201A" />
        <circle cx="278" cy="188" r="7" fill="#FFFDF9" />
        <circle cx="332" cy="188" r="7" fill="#FFFDF9" />
      </g>
    </svg>
  );
}

export default RCLogo;
