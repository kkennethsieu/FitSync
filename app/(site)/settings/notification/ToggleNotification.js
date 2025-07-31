import { Switch } from "@/components/ui/switch";

function ToggleNotification({ label, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <Switch checked={enabled} onCheckedChange={onChange} />
    </div>
  );
}

export default ToggleNotification;
