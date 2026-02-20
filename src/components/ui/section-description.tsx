import { cn } from "@/lib/cn";

interface SectionDescriptionProps {
	children: React.ReactNode;
	className?: string;
}

export function SectionDescription({
	children,
	className,
}: SectionDescriptionProps) {
	return (
		<p
			className={cn(
				"font-body text-base font-medium leading-[1.6] text-text-secondary",
				className,
			)}
		>
			{children}
		</p>
	);
}
