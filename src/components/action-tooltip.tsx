"use client";

import { FC, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui";

interface ActionTooltipProps {
	label: string;
	children: ReactNode;
	side?: "top" | "right" | "bottom" | "left";
	align?: "start" | "center" | "end";
	// Define prop types here
}

export const ActionTooltip: FC<ActionTooltipProps> = ({
	label,
	children,
	side = "right",
	align = "center",
}) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={50}>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent side={side} align={align}>
					<p className="font-semibold text-sm capitalize">{label.toLocaleLowerCase()}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
