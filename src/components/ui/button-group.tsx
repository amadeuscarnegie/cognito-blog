import { cn } from "@/lib/cn";

interface ButtonGroupProps {
	children: React.ReactNode;
	className?: string;
}

export function ButtonGroup({ children, className }: ButtonGroupProps) {
	return (
		<div className={cn("flex flex-row items-center gap-5", className)}>
			{children}
		</div>
	);
}
