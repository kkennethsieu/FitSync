import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LanguageSection() {
  return (
    <section>
      <h2 className="mb-1 text-xl font-semibold">Language & Time Zone</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Let us know the time zone and format
      </p>

      <div className="max-w-md space-y-4">
        <div>
          <Label htmlFor="language">Language</Label>
          <Input id="language" type="text" placeholder="English" />
        </div>

        <div>
          <Label htmlFor="timezone">Time Zone</Label>
          <Input id="timezone" type="text" placeholder="America/Los_Angeles" />
        </div>
      </div>
    </section>
  );
}

export default LanguageSection;
