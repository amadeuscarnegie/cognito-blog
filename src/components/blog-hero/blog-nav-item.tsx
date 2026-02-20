"use client";

import { cn } from "@/lib/cn";

type BlogNavItemProps = {
	label: string;
	isActive: boolean;
	onClick: () => void;
};

export function BlogNavItem({ label, isActive, onClick }: BlogNavItemProps) {
	return (
		<button
			onClick={onClick}
			className={cn(
				"relative font-body text-sm leading-none px-3 py-2 cursor-pointer transition-colors",
				isActive
					? "text-text-primary font-semibold"
					: "text-text-tertiary font-medium"
			)}
		>
			{label}
		</button>
	);
}
