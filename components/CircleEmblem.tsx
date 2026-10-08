"use client";

/**
 * Rotating circular text badge — the "moving circle" stamp mechanic from
 * the reference, rebuilt with our own text via an SVG textPath spun by CSS.
 */
export default function CircleEmblem({
  text,
  size = 96,
  className = "",
}: {
  text: string;
  size?: number;
  className?: string;
}) {
  const id = `emblem-path-${size}`;
  const r = size / 2 - 4;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="motion-safe:animate-[spin_10s_linear_infinite]"
        aria-hidden
      >
        <path
          id={id}
          fill="none"
          d={`M ${size / 2},${size / 2} m -${r},0 a ${r},${r} 0 1,1 ${2 * r},0 a ${r},${r} 0 1,1 -${2 * r},0`}
        />
        <text className="fill-ink" fontSize={size * 0.095} letterSpacing="1.5">
          <textPath href={`#${id}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute h-[38%] w-[38%] rounded-full bg-orange" />
    </div>
  );
}
