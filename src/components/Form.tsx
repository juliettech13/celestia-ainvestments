import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormProps {
  transactionCount: number;
  setTransactionCount: (count: number) => void;
  minTransactionValue: number;
  setMinTransactionValue: (value: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function Form({
  transactionCount,
  setTransactionCount,
  minTransactionValue,
  setMinTransactionValue,
  onSubmit
}: FormProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          <h2 className="text-2xl font-bold text-center tracking-tight mb-4">
            Generate Celestia Report
          </h2>
        </CardTitle>
        <CardDescription>
          Based on your transaction research, we'll generate a report on the market trends and potential opportunities for the Celestia ecosystem.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transactionCount" className="text-sm font-bold">Number of transactions to analyze</Label>
            <p className="text-xs text-muted-foreground">
              The more transactions you analyze, the more accurate the report will be but also the longer it will take. We assess transactions dating back from today.
            </p>
            <Input
              id="transactionCount"
              type="number"
              min="1"
              value={transactionCount}
              onChange={(e) => setTransactionCount(parseInt(e.target.value) || 100)}
              required
            />
          </div>

          <div className="space-y-2 mt-3">
            <Label htmlFor="minValue" className="text-sm font-bold">Minimum transaction value</Label>
            <p className="text-xs text-muted-foreground">
              We filter transactions with value greater than this TIA amount to get a better signal.
            </p>
            <Input
              id="minValue"
              type="number"
              min="0"
              value={minTransactionValue}
              onChange={(e) => setMinTransactionValue(parseInt(e.target.value) || 1000)}
              required
            />
          </div>

          <Button
            type="submit"
            variant="outline"
            className="w-full bg-primary text-white font-semibold cursor-pointer py-6 text-lg hover:bg-primary/70 transition-colors"
          >
            Generate Report
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

