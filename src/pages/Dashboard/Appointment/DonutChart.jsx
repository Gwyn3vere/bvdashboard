function DonutChart({ data, size = 120, strokeWidth = 12 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  let cumulative = 0;

  return (
    <svg width={size} height={size}>
      {/* background circle */}
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f3f4f6" strokeWidth={strokeWidth} />

      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {data.map((item, index) => {
          const percent = item.value / total;
          const dash = percent * circumference;

          const offset = cumulative;
          cumulative += dash;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference}`}
              strokeDashoffset={-offset}
              style={{
                transition: "all 0.8s ease",
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}

export default DonutChart;
