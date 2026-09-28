export default function Mangekyou({ className }: { className?: string }) {
  const blades = [0, 120, 240]
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" fill="currentColor">
      {blades.map((deg) => (
        <path
          key={deg}
          d="M50 50 C 56 36, 72 26, 90 30 C 88 44, 72 56, 55 53 Z"
          transform={`rotate(${deg}, 50, 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="7" />
    </svg>
  )
}
