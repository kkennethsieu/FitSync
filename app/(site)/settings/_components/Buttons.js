"use client";
import { Button } from "@/components/ui/button";

function Buttons({ onCancel }) {
  return (
    <div className="flex justify-end max-w-md mt-6 space-x-4">
      <Button variant="outline" type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">Save</Button>
    </div>
  );
}

export default Buttons;
