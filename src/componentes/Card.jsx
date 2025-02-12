export default function Card({ titulo = "", className = "", children }) {
  return (
    <div className={`p-6 ${className}`}>
      {titulo && (
        <h5 className="mb-2 text-2xl font-bold tracking-tight">{titulo}</h5>
      )}
      <p className="font-normal">{children}</p>
    </div>
  );
}
