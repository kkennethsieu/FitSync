import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SetInputs({ selectedType, sets, setSets }) {
  const handleSetChange = (index, field, value) => {
    const updatedSets = [...sets];
    updatedSets[index][field] = value;
    setSets(updatedSets);
  };

  const handleAddSet = () => {
    const newSet =
      selectedType === "Cardio"
        ? { time: "", distance: "" }
        : { reps: "", weight: "" };
    setSets([...sets, newSet]);
  };

  const handleRemoveSet = (index) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-3 mt-2">
      {sets.map((set, index) => (
        <div key={index} className="flex items-center gap-2">
          {selectedType === "Cardio" ? (
            <>
              <Input
                placeholder="Time: EX: HH:MM:SS"
                type="text"
                value={set.time}
                onChange={(e) => handleSetChange(index, "time", e.target.value)}
                className="w-1/2"
              />
              <Input
                placeholder="Distance EX: 1.5 (Miles/KM)"
                type="text"
                value={set.distance}
                onChange={(e) =>
                  handleSetChange(index, "distance", e.target.value)
                }
                className="w-1/2"
              />
            </>
          ) : (
            <>
              <Input
                placeholder="Reps EX: 5"
                type="number"
                value={set.reps}
                onChange={(e) => handleSetChange(index, "reps", e.target.value)}
                className="w-1/2"
              />
              <Input
                placeholder="Weight EX: 155 (lbs/kg)"
                type="number"
                value={set.weight}
                onChange={(e) =>
                  handleSetChange(index, "weight", e.target.value)
                }
                className="w-1/2"
              />
            </>
          )}

          <Button
            type="button"
            variant="ghost"
            className="text-red-500 hover:text-red-700"
            onClick={() => handleRemoveSet(index)}
          >
            ✕
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        className="px-0 text-blue-600 hover:text-blue-800 w-fit"
        onClick={handleAddSet}
      >
        + Add Set
      </Button>
    </div>
  );
}
