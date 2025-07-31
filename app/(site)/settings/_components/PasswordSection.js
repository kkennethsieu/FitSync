import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function PasswordSection() {
  return (
    <section>
      <h2 className="mb-1 text-xl font-semibold">Password</h2>
      <p className="mb-4 text-sm text-muted-foreground">Update your password</p>

      <div className="max-w-md space-y-4">
        <div>
          <Label htmlFor="current-password">Current Password</Label>
          <Input id="current-password" type="password" placeholder="••••••••" />
        </div>

        <div>
          <Label htmlFor="new-password">New Password</Label>
          <Input id="new-password" type="password" placeholder="••••••••" />
        </div>

        <div>
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input id="confirm-password" type="password" placeholder="••••••••" />
        </div>
      </div>
    </section>
  );
}

export default PasswordSection;
