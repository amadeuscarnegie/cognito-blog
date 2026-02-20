import { cn } from "@/lib/cn";

interface DotSeparatorProps {
	className?: string;
}

export function DotSeparator({ className }: DotSeparatorProps) {
	return (
		<div
			className={cn(
				"h-[2px] w-[2px] shrink-0 rounded-full bg-text-primary",
				className,
			)}
		/>
	);
}
