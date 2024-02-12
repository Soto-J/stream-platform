import { DataTable } from "./_components/data-table";
import { type Payment, columns } from "./_components/columns";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

export default async function CommunityPage() {
  const data = await getData();

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Community settings</h1>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
