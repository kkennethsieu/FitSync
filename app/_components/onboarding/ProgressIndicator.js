export default function ProgressIndicator({ current, total }) {
  return (
    <div className="flex justify-center mt-4 space-x-2">
      {[...Array(total)].map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${
            i === current ? "bg-blue-600" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
