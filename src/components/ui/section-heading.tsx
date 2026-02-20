import { type ElementType } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
	as?: ElementType;
	children: React.ReactNode;
	className?: string;
}

export function SectionHeading({
	as: Tag = "h2",
	children,
	className,
}: SectionHeadingProps) {
	return (
		<Tag
			className={cn(
				"font-heading text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-text-primary lg:text-[40px]",
				className,
			)}
		>
			{children}
		</Tag>
	);
}
