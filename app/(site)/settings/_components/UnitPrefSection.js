import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function UnitPrefSection({ settings, onChange }) {
  const { unit_weight, unit_distance, unit_height } = settings;

  return (
    <section>
      <h2 className="mb-1 text-xl font-semibold">Unit Preference</h2>
      <p className="mb-4 text-sm text-muted-foreground">Set unit preferences</p>

      <div className="max-w-md space-y-6">
        <div>
          <Label htmlFor="weight-unit">Weight</Label>
          <Select
            value={unit_weight}
            onValueChange={(value) => onChange("unit_weight", value)}
          >
            <SelectTrigger id="weight-unit" className="w-full">
              <SelectValue placeholder="Select weight unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kilograms (kg)</SelectItem>
              <SelectItem value="lbs">Pounds (lbs)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="distance-unit">Distance</Label>
          <Select
            value={unit_distance}
            onValueChange={(value) => onChange("unit_distance", value)}
          >
            <SelectTrigger id="distance-unit" className="w-full">
              <SelectValue placeholder="Select distance unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="km">Kilometers (km)</SelectItem>
              <SelectItem value="mi">Miles (mi)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="height-unit">Height</Label>
          <Select
            value={unit_height}
            onValueChange={(value) => onChange("unit_height", value)}
          >
            <SelectTrigger id="height-unit" className="w-full">
              <SelectValue placeholder="Select height unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cm">Centimeters (cm)</SelectItem>
              <SelectItem value="in">Feet/Inches (ft/in)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}

export default UnitPrefSection;
