import type { Section } from "@/types/article";
import { TextSection } from "./sections/text-section";
import { ImageSection } from "./sections/image-section";
import { AlertSection } from "./sections/alert-section";
import { AccordionSection } from "./sections/accordion-section";
import { BenefitsSection } from "./sections/benefits-section";
import { ChecklistSection } from "./sections/checklist-section";
import { TableSection } from "./sections/table-section";
import { CtaSection } from "./sections/cta-section";
import { RelatedContentSection } from "./sections/related-content-section";
import { DividerSection } from "./sections/divider-section";

function renderSection(section: Section, index: number) {
	switch (section.type) {
		case "text":
			return <TextSection key={index} {...section} />;
		case "image":
			return <ImageSection key={index} {...section} />;
		case "alert":
			return <AlertSection key={index} {...section} />;
		case "accordion":
			return <AccordionSection key={index} {...section} />;
		case "benefits":
			return <BenefitsSection key={index} {...section} />;
		case "checklist":
			return <ChecklistSection key={index} {...section} />;
		case "table":
			return <TableSection key={index} {...section} />;
		case "cta":
			return <CtaSection key={index} {...section} />;
		case "related-content":
			return <RelatedContentSection key={index} {...section} />;
		case "divider":
			return <DividerSection key={index} />;
		default:
			return null;
	}
}

interface SectionRendererProps {
	sections: Section[];
}

export function SectionRenderer({ sections }: SectionRendererProps) {
	return (
		<div className="flex flex-col gap-8 lg:gap-10">
			{sections.map((section, i) => renderSection(section, i))}
		</div>
	);
}
