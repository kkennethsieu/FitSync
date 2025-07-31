"use client";
import { Button } from "@/components/ui/button";

const invoices = [
  {
    id: "INV-001",
    amount: "$29.99",
    status: "Paid",
    date: "2025-06-01",
  },
  {
    id: "INV-002",
    amount: "$29.99",
    status: "Paid",
    date: "2025-05-01",
  },
  {
    id: "INV-003",
    amount: "$29.99",
    status: "Pending",
    date: "2025-04-01",
  },
];

function BillingHistory() {
  return (
    <section>
      <h2 className="mb-1 text-xl font-semibold">Billing History</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Review your past invoices and payment status.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-3 border-b">Invoice #</th>
              <th className="p-3 border-b">Amount</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(({ id, amount, status, date }) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{id}</td>
                <td className="p-3 border-b">{amount}</td>
                <td className="p-3 border-b">{status}</td>
                <td className="p-3 border-b">{date}</td>
                <td className="p-3 text-right border-b">
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => alert(`Viewing invoice ${id}`)}
                  >
                    View Invoice
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default BillingHistory;
