import { CircleCheck } from "lucide-react";
import type { ChecklistSection as ChecklistSectionType } from "@/types/article";

export function ChecklistSection({ title, description, items }: ChecklistSectionType) {
	return (
		<div className="border-[1.5px] border-border-brand rounded-md p-6">
			<h3 className="font-heading font-semibold text-xl leading-[1.2] text-text-primary">
				{title}
			</h3>
			{description && (
				<p className="mt-2 font-body font-medium text-base leading-[1.6] text-text-secondary">
					{description}
				</p>
			)}
			<ul className="mt-4 flex flex-col gap-3">
				{items.map((item, i) => (
					<li key={i} className="flex items-start gap-3">
						<CircleCheck className="h-5 w-5 flex-shrink-0 mt-0.5 text-border-brand" />
						<span className="font-body font-medium text-base leading-[1.5] text-text-primary">
							{item}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
