function TitleCard({ title, quote }) {
  return (
    <div className="px-4 py-4 space-y-5 rounded-lg ">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm ">{quote}</p>
    </div>
  );
}

export default TitleCard;
