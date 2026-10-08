// Full-bleed diamond-lattice strip used to separate sections. Same
// decorative pattern that used to frame the Signature/Gallery blocks,
// reduced to a horizontal band at the old frame's thickness.
export default function PatternBanner() {
  return (
    <div
      aria-hidden
      className="pattern-frame h-3 w-full border-t-2 border-cream sm:h-5"
    />
  );
}
