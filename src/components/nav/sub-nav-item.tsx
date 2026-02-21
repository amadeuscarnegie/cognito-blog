import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SubNavItemProps {
	label: string;
	href: string;
}

export function SubNavItem({ label, href }: SubNavItemProps) {
	return (
		<Link
			href={href}
			className="flex items-center justify-between py-2 px-4 font-body font-semibold text-sm leading-[1.3] text-text-primary hover:bg-bg-subtle rounded-sm transition-colors"
		>
			{label}
			<ChevronRight className="h-4 w-4 text-text-tertiary" />
		</Link>
	);
}
