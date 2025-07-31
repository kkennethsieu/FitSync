export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="space-y-2 text-center">
        <div className="w-10 h-10 mx-auto border-4 border-gray-300 rounded-full border-t-gray-900 animate-spin" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
