import { Accordion } from "@/components/ui/accordion/accordion";
import type { AccordionSection as AccordionSectionType } from "@/types/article";

export function AccordionSection({ title, items }: AccordionSectionType) {
	const accordionItems = items.map((item, i) => ({
		id: `accordion-${i}`,
		question: item.title,
		answer: item.content,
	}));

	return (
		<div className="flex flex-col gap-4">
			<h3 className="font-heading font-semibold text-xl lg:text-2xl leading-[1.2] text-text-primary">
				{title}
			</h3>
			<Accordion items={accordionItems} />
		</div>
	);
}
