import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

function ProfileSection({ settings, onChange }) {
  const { name, email, avatar } = settings;

  return (
    <section>
      <h2 className="mb-1 text-xl font-semibold">Profile</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Set your account details
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name || ""}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email || ""} disabled />
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;
