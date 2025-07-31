function formatDayNumber(date) {
  return date.getDate(); // returns day (1-31)
}

function SingleDay({ setSelectedIndex }) {
  return (
    <button
      key={day}
      onClick={() => setSelectedIndex(i)}
      className={`flex flex-col items-center px-3 py-2 rounded-md border transition
                ${
                  isSelected
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-200"
                }`}
    >
      <span className="text-xs font-medium">{day}</span>
      <span className="text-sm font-semibold">{formatDayNumber(date)}</span>
    </button>
  );
}

export default SingleDay;
