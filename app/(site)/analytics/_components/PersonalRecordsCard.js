import NoWorkoutFound from "@/app/_components/NoWorkoutFound";
import PersonalRecordItem from "./PersonalRecordItem";

function PersonalRecordsCard({ prRecords }) {
  return (
    <div className="max-w-3xl p-6 mx-auto space-y-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl">
      <h5 className="pb-3 text-2xl font-extrabold text-orange-600 border-b-4 border-orange-400 dark:text-orange-400 dark:border-orange-500">
        Personal Records{" "}
        <span className="text-lg font-normal text-gray-500 dark:text-gray-300">
          (Most Recent)
        </span>
      </h5>

      <div className="space-y-2 divide-y divide-gray-200 dark:divide-gray-700">
        {prRecords.length > 0 ? (
          prRecords.map((record) => (
            <PersonalRecordItem key={record.id} record={record} />
          ))
        ) : (
          <NoWorkoutFound />
        )}
      </div>
    </div>
  );
}

export default PersonalRecordsCard;
