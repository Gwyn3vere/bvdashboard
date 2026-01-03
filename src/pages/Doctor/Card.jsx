export default function Card({ doctor, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, doctor.id)}
      className={`bg-[var(--color-purple)] text-white p-3 rounded-lg cursor-move hover:opacity-90 transition-opacity mb-2`}
    >
      <div className="font-semibold">{doctor.firstName + " " + doctor.lastName}</div>
      <div className="text-xs opacity-90 mt-1">{doctor.specialty}</div>
    </div>
  );
}
