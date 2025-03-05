export async function fetchHighValueTransactions(limit = 25, minValue = 1000) {
  try {
    const response = await fetch(
      `/api/transactions?limit=${limit}&minValue=${minValue}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export async function fetchStakingTransactions(limit = 25) {
  try {
    const response = await fetch(`/api/transactions?limit=${limit}&type=stake`);

    if (!response.ok) {
      throw new Error("Failed to fetch staking transactions");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching staking transactions:", error);
    return [];
  }
}
