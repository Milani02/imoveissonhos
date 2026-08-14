/**
 * Ambient topographic contour lines — an honest, non-photographic way to
 * evoke "land" for terreno listings without implying any specific real plot.
 */
export function ContourLines({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 500"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M-50,90 C150,40 300,140 500,90 S850,20 1250,80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M-50,160 C200,110 380,210 600,160 S900,90 1250,150" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M-50,230 C250,180 420,280 650,230 S950,160 1250,220" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M-50,300 C220,250 460,350 680,300 S1000,230 1250,290" stroke="currentColor" strokeWidth="1" opacity="0.22" />
      <path d="M-50,370 C260,320 480,420 700,370 S1020,300 1250,360" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <path d="M-50,440 C280,390 500,490 720,440 S1040,370 1250,430" stroke="currentColor" strokeWidth="1" opacity="0.1" />
    </svg>
  )
}
