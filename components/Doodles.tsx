/**
 * Small original line-art accents, in the spirit of the reference's
 * hand-drawn scribbles (steam, arrows, ingredient sketches), drawn from
 * scratch, not traced from their artwork or mascot.
 */

export function SteamDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden fill="none">
      <path
        d="M14 50 Q6 40 16 32 Q26 24 16 14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M32 50 Q24 40 34 32 Q44 24 34 14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function SwirlArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={className} aria-hidden fill="none">
      <path
        d="M6 12 Q30 6 34 24 Q38 42 58 34"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M48 30 L60 35 L56 22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function BeanDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden fill="none">
      <path
        d="M20 10 C40 10 48 24 44 38 C40 52 20 54 14 42 C8 30 6 10 20 10 Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M18 44 C24 30 24 22 32 14"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
