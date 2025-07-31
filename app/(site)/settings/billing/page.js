import BillingForm from "./BillingForm";

export default function page() {
  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold">Billing Details</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Manage your subscription plan and payment method.
      </p>
      <BillingForm />
    </div>
  );
}
