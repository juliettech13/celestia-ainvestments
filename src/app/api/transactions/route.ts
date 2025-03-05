import { NextResponse } from "next/server";
import axios from "axios";

import { Transaction } from "@/types";

const CELENIUM_API_BASE = "https://api-mainnet.celenium.io/v1/";
const ENDPOINTS = {
  TRANSACTIONS: `${CELENIUM_API_BASE}/tx`
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "25");
  const minValue = parseInt(searchParams.get("minValue") || "1000");
  const type = searchParams.get("type");

  try {
    const params: Record<string, any> = {
      limit,
      sort: "desc"
    };

    if (type === "stake") {
      params.type = "stake";
    } else if (minValue) {
      params.min_value = minValue;
    }

    const response = await axios.get(ENDPOINTS.TRANSACTIONS, { params });

    if (Array.isArray(response.data)) {
      const transactions = response.data.map((tx: any): Transaction => ({
        signers: tx.signers || [],
        gas_used: parseInt(tx.gas_used) || 0,
        fee: tx.fee,
        time: tx.time,
        message_types: tx.message_types,
        status: tx.status,
        events_count: tx.events_count,
        messages_count: tx.messages_count
      }));

      return NextResponse.json(transactions);
    }

    return NextResponse.json([]);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
