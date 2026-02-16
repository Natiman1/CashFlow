"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { StatsRange } from "@/actions/statistics";

export function StatsPeriodSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentRange =
    (searchParams.get("range") as StatsRange) || "this_month";

  const handleRangeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", value);
    router.push(`/dashboard/statistics?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Period:</span>
      <Select value={currentRange} onValueChange={handleRangeChange}>
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="this_month">This Month</SelectItem>
          <SelectItem value="last_month">Last Month</SelectItem>
          <SelectItem value="last_3_months">Last 3 Months</SelectItem>
          <SelectItem value="last_6_months">Last 6 Months</SelectItem>
          <SelectItem value="this_year">This Year</SelectItem>
          <SelectItem value="all">All Time</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
