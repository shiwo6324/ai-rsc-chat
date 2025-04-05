import React from "react";
import { TrendingUp } from "lucide-react";

interface PriceProps {
	price: number;
	symbol: string;
}

const Price = ({ price = 1, symbol = "" }: PriceProps) => {
	return (
		<div className="flex flex-col p-4 rounded-lg border border-border bg-card shadow-sm">
			<div className="flex items-center gap-2 mb-2 text-muted-foreground text-sm">
				<TrendingUp className="w-4 h-4" />
				<span>Current Price</span>
			</div>

			<div className="flex flex-col space-y-1">
				<div className="text-lg font-medium">{symbol.toUpperCase()}</div>
				<div className="text-2xl font-bold text-primary">
					{price.toLocaleString("en-US", {
						style: "currency",
						currency: "USD",
					})}
				</div>
				<div className="text-xs text-muted-foreground">
					Last updated: {new Date().toLocaleTimeString()}
				</div>
			</div>
		</div>
	);
};

export default Price;
