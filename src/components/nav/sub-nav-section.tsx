import { SubNavItem } from "./sub-nav-item";

interface SubNavSectionProps {
	label: string;
	items: { label: string; href: string }[];
}

export function SubNavSection({ label, items }: SubNavSectionProps) {
	return (
		<div className="px-2 py-2">
			<div className="px-2 py-1.5 font-body font-bold text-xs text-text-tertiary uppercase tracking-wide">
				{label}
			</div>
			<div className="flex flex-col">
				{items.map((item) => (
					<SubNavItem key={item.label} label={item.label} href={item.href} />
				))}
			</div>
		</div>
	);
}
