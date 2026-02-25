import { iconMap, fallbackIcon } from "./icon-map";
import type { BenefitsSection as BenefitsSectionType } from "@/types/article";

export function BenefitsSection({ items }: BenefitsSectionType) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
			{items.map((item, i) => {
				const Icon = iconMap[item.icon] ?? fallbackIcon;
				return (
					<div key={i} className="flex items-start gap-4">
						<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-bg-secondary border border-border-quaternary">
							<Icon className="h-5 w-5 text-border-brand" />
						</div>
						<div className="flex flex-col gap-1">
							<h4 className="font-heading font-semibold text-base leading-[1.3] text-text-primary">
								{item.title}
							</h4>
							<p className="font-body font-medium text-sm leading-[1.6] text-text-secondary">
								{item.description}
							</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}
