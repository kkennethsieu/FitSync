"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function ThemeSection({ settings, onChange }) {
  const { darkMode } = settings;
  return (
    <section>
      <h2 className="mb-1 text-xl font-semibold">Theme</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Change the appearance of the application by selecting between light or
        dark mode
      </p>

      <RadioGroup
        value={darkMode ? "dark" : "light"}
        onValueChange={(value) => onChange("darkMode", value === "dark")}
        className="flex space-x-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="light" id="light-mode" />
          <Label htmlFor="light-mode" className="cursor-pointer">
            Light Mode
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="dark" id="dark-mode" />
          <Label htmlFor="dark-mode" className="cursor-pointer">
            Dark Mode
          </Label>
        </div>
      </RadioGroup>
    </section>
  );
}

export default ThemeSection;
