"use client";
import { Button } from "@/components/ui/button";
import BillingHistory from "./BillingHistory";
import Plan from "./Plan";

function BillingForm() {
  function handleCancel() {
    setPaymentMethod("");
  }

  function handleSave(e) {
    e.preventDefault();
    alert("Billing details saved!");
  }
  return (
    <form onSubmit={handleSave} className="max-w-3xl p-6 mx-auto space-y-10">
      {/* Billing Details Section */}
      <Plan />

      <hr />

      {/* Billing History Section */}
      <BillingHistory />

      {/* Buttons */}
      <div className="flex justify-end max-w-3xl space-x-4">
        <Button variant="outline" type="button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

export default BillingForm;
