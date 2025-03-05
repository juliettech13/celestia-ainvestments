"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  fetchHighValueTransactions,
  fetchStakingTransactions
} from "./api/transactions/requests";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "../components/DataTable";
import { transactionColumns, stakingColumns } from "../components/Columns";
import Form from "../components/Form";
import { Transaction } from "../types";

const loadingMessages = [
  "Counting TIA tokens one by one...",
  "Asking the blockchain for gossip...",
  "Mining for financial wisdom...",
  "Consulting with crypto fortune tellers...",
  "Analyzing moon phases for price predictions...",
  "Teaching AI to HODL...",
  "Calculating how many lambos you could buy...",
  "Checking if your portfolio is going to the moon...",
  "Dusting off the crystal ball...",
];

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stakingData, setStakingData] = useState<Transaction[]>([]);
  const [insights, setInsights] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const [transactionCount, setTransactionCount] = useState<number>(100);
  const [minTransactionValue, setMinTransactionValue] = useState<number>(1000);

  async function fetchDataWithParams(count: number, minValue: number) {
    try {
      setLoading(true);
      setError(null);

      const txData = await fetchHighValueTransactions(count, minValue);
      const stakingTxData = await fetchStakingTransactions(count);

      setTransactions([...txData]);
      setStakingData([...stakingTxData]);

      if (txData.length > 0 || stakingTxData.length > 0) {
        const response = await fetch('/api/insights', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            transactions,
            stakingData
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch insights');
        }

        const data = await response.json();
        setInsights(data.insights);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsFormSubmitted(true);
    fetchDataWithParams(transactionCount, minTransactionValue);
  };

  function handleReset() {
    setIsFormSubmitted(false);
    setTransactions([]);
    setStakingData([]);
    setInsights('');
  };

  useEffect(() => {
    if (loading) {
      setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);

      const intervalId = setInterval(() => {
        setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [loading]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-lg">{loadingMessage}</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
          <Button className="mt-4" onClick={handleReset}>Try Again</Button>
        </CardContent>
      </Card>
    </div>
  );

  if (!isFormSubmitted) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Form
          transactionCount={transactionCount}
          setTransactionCount={setTransactionCount}
          minTransactionValue={minTransactionValue}
          setMinTransactionValue={setMinTransactionValue}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Celestia Blockchain Insights</h1>
      <div className="flex space-x-4 mb-6">
        <Button variant="outline" onClick={handleReset}>
          New Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        <Card className="col-span-1">
          <CardHeader>
            <CardDescription>
              Insights based on {transactionCount} transactions with minimum value of {minTransactionValue}
            </CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl font-bold mt-6 mb-3 text-primary" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-6 my-3" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="mb-1" {...props} />
                )
              }}
            >
              {insights}
            </ReactMarkdown>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight mb-4">High-Value Transactions</h2>
        {transactions.length === 0 ? (
          <Card>
            <CardContent className="py-6">
              <p className="text-center text-muted-foreground">No high-value transactions found</p>
            </CardContent>
          </Card>
        ) : (
          <DataTable columns={transactionColumns} data={transactions} />
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Staking Activity</h2>
        {stakingData.length === 0 ? (
          <Card>
            <CardContent className="py-6">
              <p className="text-center text-muted-foreground">No staking activity found</p>
            </CardContent>
          </Card>
        ) : (
          <DataTable columns={stakingColumns} data={stakingData} />
        )}
      </div>

      <p>This is not legal or investment advice. Please do your own research.</p>
    </div>
  );
}
