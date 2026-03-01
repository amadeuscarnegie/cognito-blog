"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface AccordionProps {
	items: { id: string; question: string; answer: string }[];
	className?: string;
	value?: string;
	onValueChange?: (value: string) => void;
}

export function Accordion({
	items,
	className,
	value,
	onValueChange,
}: AccordionProps) {
	const controlledProps =
		value !== undefined
			? { value, onValueChange: onValueChange ?? (() => {}) }
			: {};

	return (
		<AccordionPrimitive.Root
			type="single"
			collapsible
			{...controlledProps}
			className={cn(
				"border-[1.5px] border-border-quaternary rounded-md overflow-hidden",
				className,
			)}
		>
			{items.map((item, index) => (
				<AccordionPrimitive.Item
					key={item.id}
					value={item.id}
					id={item.id}
					className={cn(
						"px-6 py-6",
						index < items.length - 1 && "border-b-[1.5px] border-border-quaternary",
					)}
				>
					<AccordionPrimitive.Trigger className="flex w-full items-center justify-between gap-4 cursor-pointer group">
						<span className="font-heading font-semibold text-lg leading-[1.2] text-text-primary text-left">
							{item.question}
						</span>
						<ChevronDown className="h-5 w-5 flex-shrink-0 text-text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
					</AccordionPrimitive.Trigger>
					<AccordionPrimitive.Content
						data-accordion-content=""
						className="overflow-hidden"
					>
						<p className="pt-4 font-body font-medium text-base leading-[1.6] text-text-secondary">
							{item.answer}
						</p>
					</AccordionPrimitive.Content>
				</AccordionPrimitive.Item>
			))}
		</AccordionPrimitive.Root>
	);
}
