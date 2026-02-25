import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { CtaSection as CtaSectionType } from "@/types/article";

export function CtaSection({ variant, title, description, buttonText, buttonUrl }: CtaSectionType) {
	if (variant === "large") {
		return (
			<div className="flex flex-col items-center gap-4 rounded-md bg-bg-secondary border border-border-brand p-8 text-center">
				<h3 className="font-heading font-semibold text-xl lg:text-2xl leading-[1.2] text-text-primary">
					{title}
				</h3>
				<p className="font-body font-medium text-base leading-[1.6] text-text-secondary max-w-md">
					{description}
				</p>
				<a href={buttonUrl}>
					<Button variant="primary">{buttonText}</Button>
				</a>
			</div>
		);
	}

	return (
		<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-md bg-bg-subtle border border-border-quaternary p-6">
			<div className="flex flex-col gap-1">
				<h4 className="font-heading font-semibold text-base leading-[1.3] text-text-primary">
					{title}
				</h4>
				<p className="font-body font-medium text-sm leading-[1.6] text-text-secondary">
					{description}
				</p>
			</div>
			<a href={buttonUrl} className="flex-shrink-0">
				<Button variant="secondary">{buttonText}</Button>
			</a>
		</div>
	);
}
