export default function CustomTooltip({ active, payload }) {
  if (!active || !payload) return null;

  const linePayload = payload.filter((entry) => entry.stroke && entry.stroke !== "none");

  return (
    <div className="bg-white px-3 py-2 border border-gray-300 rounded shadow-lg text-sm">
      {linePayload.map((entry) => (
        <div key={entry.dataKey} style={{ color: entry.stroke }}>
          {entry.name ?? PATIENT_LABELS[entry.dataKey]}: {entry.value}
        </div>
      ))}
    </div>
  );
}
