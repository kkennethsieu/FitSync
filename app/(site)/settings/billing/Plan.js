"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

function Plan() {
  const [paymentMethod, setPaymentMethod] = useState("");

  return (
    <section>
      <div className="flex flex-wrap max-w-3xl gap-6">
        {/* Current Plan Card */}
        <div className="flex-1 min-w-[280px] border rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
          <Label className="block mb-2 text-sm font-medium text-muted-foreground">
            Current Plan
          </Label>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            Explorer Plan
          </p>
        </div>

        {/* Payment Method Card */}
        <div className="flex-1 min-w-[280px] border rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
          <Label
            htmlFor="payment-method"
            className="block mb-2 text-sm font-medium text-muted-foreground"
          >
            Payment Method
          </Label>
          <Input
            id="payment-method"
            type="text"
            placeholder="Card number, PayPal email, etc."
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}

export default Plan;
