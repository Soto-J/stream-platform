"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { ArrowUpDown } from "lucide-react";
import { UnblockButton } from "./unblock-button";
import Link from "next/link";

export type blockedUser = {
  id: string;
  userId: string;
  imageUrl: string;
  username: string;
  createdAt: string;
};

export const columns: ColumnDef<blockedUser>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Username
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Link
        href={`/${row.original.username}`}
        className="flex items-center gap-x-4 pl-3 max-w-fit"
      >
        <UserAvatar
          username={row.original.username}
          imageUrl={row.original.imageUrl}
        />

        <span>{row.original.username}</span>
      </Link>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date Blocked
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <p className="pl-4">{row.original.createdAt}</p>,
  },
  {
    id: "actions",
    header: () => <h2 className="pl-3">Action</h2>,
    cell: ({ row }) => <UnblockButton userId={row.original.userId} />,
  },
];
