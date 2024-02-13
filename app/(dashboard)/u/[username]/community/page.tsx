import { format } from "date-fns";

import { getAllBlockedUsers } from "@/lib/block-service";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export default async function CommunityPage() {
  const blockedUsers = await getAllBlockedUsers();

  const formattedData = blockedUsers.map((block) => ({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.imageUrl,
    username: block.blocked.username,
    createdAt: format(new Date(block.blocked.createdAt), "MM/dd/yyyy"),
  }));

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Community settings</h1>

      <DataTable columns={columns} data={formattedData} />
    </div>
  );
}
