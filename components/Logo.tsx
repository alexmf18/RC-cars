/** Logo "RC CARS": placa inclinada naranja con "RC" calado y "CARS" con subrayado lima. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 32" className={className} role="img" aria-label="RC Cars">
      <path d="M8 2h40l-8 28H0z" fill="#ff5b1f" />
      <text
        x="22"
        y="24"
        textAnchor="middle"
        fontFamily="var(--font-barlow), 'Arial Narrow', sans-serif"
        fontStyle="italic"
        fontWeight="800"
        fontSize="24"
        fill="#090b0e"
      >
        RC
      </text>
      <text
        x="52"
        y="24"
        fontFamily="var(--font-barlow), 'Arial Narrow', sans-serif"
        fontStyle="italic"
        fontWeight="800"
        fontSize="24"
        fill="#f4f5f7"
      >
        CARS
      </text>
      <path d="M53 28.5h62l-1 2.5H52z" fill="#c8f54a" />
    </svg>
  );
}
