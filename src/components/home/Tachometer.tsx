/**
 * Decorative tachometer — the hero's motorsport centrepiece. Pure SVG + one CSS animation,
 * so it costs nothing at runtime. It is art direction, not a product image.
 */
const CX = 200;
const CY = 200;
const START = 135; // degrees, 0 rpm (lower left)
const SWEEP = 270;
const MAX = 12;

const rad = (deg: number) => (deg * Math.PI) / 180;
const angleFor = (v: number) => START + (v / MAX) * SWEEP;
const point = (v: number, r: number) => {
  const a = rad(angleFor(v));
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
};

function arc(from: number, to: number, r: number) {
  const a = point(from, r);
  const b = point(to, r);
  const large = ((to - from) / MAX) * SWEEP > 180 ? 1 : 0;
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

export function Tachometer({ className = "" }: { className?: string }) {
  const ticks = Array.from({ length: MAX * 2 + 1 }, (_, i) => i / 2);
  const needleTip = point(0, 138);

  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Decorative tachometer" className={className}>
      <defs>
        <radialGradient id="tach-face" cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="#25262B" />
          <stop offset="1" stopColor="#0B0B0D" />
        </radialGradient>
      </defs>
      <circle cx={CX} cy={CY} r="190" fill="url(#tach-face)" stroke="#B8BDC5" strokeOpacity="0.35" strokeWidth="2" />
      <circle cx={CX} cy={CY} r="176" fill="none" stroke="#B8BDC5" strokeOpacity="0.12" strokeWidth="1" />
      <path d={arc(10, 12, 160)} fill="none" stroke="#E10600" strokeWidth="8" strokeLinecap="butt" />

      {ticks.map((v) => {
        const major = Number.isInteger(v);
        const a = point(v, major ? 142 : 150);
        const b = point(v, 160);
        return (
          <line
            key={v}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={v >= 10 ? "#E10600" : "#F5F5F5"}
            strokeOpacity={major ? 0.95 : 0.45}
            strokeWidth={major ? 3 : 1.5}
          />
        );
      })}

      {Array.from({ length: MAX + 1 }, (_, v) => {
        const p = point(v, 120);
        return (
          <text
            key={v}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill={v >= 10 ? "#E10600" : "#F5F5F5"}
            fontFamily="var(--font-rajdhani), sans-serif"
            fontWeight="700"
            fontStyle="italic"
            fontSize="22"
          >
            {v}
          </text>
        );
      })}

      <text x={CX} y="262" textAnchor="middle" fill="#B8BDC5" fontFamily="var(--font-rajdhani), sans-serif" fontWeight="600" fontSize="13" letterSpacing="4">
        RPM ×1000
      </text>
      <text x={CX} y="318" textAnchor="middle" fill="#F5F5F5" fontFamily="var(--font-rajdhani), sans-serif" fontWeight="700" fontStyle="italic" fontSize="30" letterSpacing="3">
        GEARFORCE
      </text>

      <g className="needle">
        <line x1={CX} y1={CY} x2={needleTip.x} y2={needleTip.y} stroke="#E10600" strokeWidth="4" strokeLinecap="round" />
        <line x1={CX} y1={CY} x2={CX - (needleTip.x - CX) * 0.18} y2={CY - (needleTip.y - CY) * 0.18} stroke="#E10600" strokeWidth="8" strokeLinecap="round" />
      </g>
      <circle cx={CX} cy={CY} r="12" fill="#0B0B0D" stroke="#B8BDC5" strokeWidth="3" />
    </svg>
  );
}
