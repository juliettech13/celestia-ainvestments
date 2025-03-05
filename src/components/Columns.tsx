"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../../types";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "signers[0].hash",
    header: "Sender",
    cell: ({ row }) => {
      const sender = row.original.signers[0]?.hash || "";
      return <div className="font-medium">{truncateHash(sender)}</div>;
    }
  },
  {
    accessorKey: "fee",
    header: () => <div className="text-right">Amount (TIA)</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("fee") || "0");
      return <div className="text-right font-medium">{amount.toFixed(2)}</div>;
    }
  }
];

export const stakingColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "signers[0].hash",
    header: "Staker",
    cell: ({ row }) => {
      const staker = row.original.signers[0]?.hash || "";
      return <div className="font-medium">{truncateHash(staker)}</div>;
    }
  },
  {
    accessorKey: "fee",
    header: () => <div className="text-right">Amount Staked (TIA)</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("fee") || "0");
      return <div className="text-right font-medium">{amount.toFixed(2)}</div>;
    }
  }
];

// Helper function to truncate long hash values
function truncateHash(hash: string): string {
  if (!hash) return "";
  return hash.length > 12 ? `${hash.substring(0, 6)}...${hash.substring(hash.length - 6)}` : hash;
}
