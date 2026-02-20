import { cn } from "@/lib/cn";

interface ChipProps {
	children: React.ReactNode;
	className?: string;
}

export function Chip({ children, className }: ChipProps) {
	return (
		<span
			className={cn(
				"font-body font-medium text-xs leading-none text-text-primary",
				className,
			)}
		>
			{children}
		</span>
	);
}
