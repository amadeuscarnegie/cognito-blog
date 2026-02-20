import { cn } from "@/lib/cn";

interface SectionLabelProps {
	children: React.ReactNode;
	className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
	return (
		<p
			className={cn(
				"font-body text-[13px] font-bold leading-[1.2] text-text-primary lg:text-sm",
				className,
			)}
		>
			{children}
		</p>
	);
}
