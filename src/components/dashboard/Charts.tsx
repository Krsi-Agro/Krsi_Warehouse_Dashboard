// Pure-SVG charts — no chart library dependency.

type Segment = { label: string; value: number; color: string };

export function DonutChart({
  data,
  size = 170,
  thickness = 24,
  centerTop,
  centerBottom,
}: {
  data: Segment[];
  size?: number;
  thickness?: number;
  centerTop?: string;
  centerBottom?: string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {data.map((d) => {
          const dash = (d.value / total) * c;
          const el = (
            <circle
              key={d.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-acc}
            />
          );
          acc += dash;
          return el;
        })}
      </g>
      {centerTop ? (
        <text
          x="50%"
          y="50%"
          dy={centerBottom ? "-0.1em" : "0.35em"}
          textAnchor="middle"
          className="fill-gray-900 text-xl font-bold"
        >
          {centerTop}
        </text>
      ) : null}
      {centerBottom ? (
        <text
          x="50%"
          y="50%"
          dy="1.1em"
          textAnchor="middle"
          className="fill-gray-400 text-[10px]"
        >
          {centerBottom}
        </text>
      ) : null}
    </svg>
  );
}

export function BarChart({
  data,
  color,
  max = 500,
  step = 100,
  height = 230,
}: {
  data: { label: string; value: number }[];
  color: string;
  max?: number;
  step?: number;
  height?: number;
}) {
  const plotH = height - 28; // leave room for x labels
  const gridLines = Array.from({ length: max / step + 1 }, (_, i) => i * step);

  return (
    <div className="flex w-full">
      {/* y-axis labels */}
      <div
        className="mr-2 flex flex-col-reverse justify-between text-[10px] text-gray-400"
        style={{ height: plotH }}
      >
        {gridLines.map((g) => (
          <span key={g} className="leading-none">
            {g}
          </span>
        ))}
      </div>

      <div className="relative flex-1">
        {/* gridlines */}
        <div
          className="absolute inset-x-0 top-0 flex flex-col-reverse justify-between"
          style={{ height: plotH }}
        >
          {gridLines.map((g) => (
            <div key={g} className="border-t border-dashed border-gray-100" />
          ))}
        </div>

        {/* bars */}
        <div
          className="relative flex items-end justify-between gap-2"
          style={{ height: plotH }}
        >
          {data.map((d) => (
            <div
              key={d.label}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${Math.min(100, (d.value / max) * 100)}%`,
                backgroundColor: color,
              }}
              title={`${d.label}: ${d.value} MT`}
            />
          ))}
        </div>

        {/* x labels */}
        <div className="mt-2 flex justify-between gap-2 text-[10px] text-gray-400">
          {data.map((d) => (
            <span key={d.label} className="flex-1 text-center">
              {d.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
