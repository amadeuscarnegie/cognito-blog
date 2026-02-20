import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface NavItemProps {
	label: string;
	href?: string;
	hasDropdown?: boolean;
	isActive?: boolean;
	onClick?: () => void;
}

export function NavItem({
	label,
	href,
	hasDropdown,
	isActive,
	onClick,
}: NavItemProps) {
	const Tag = href ? "a" : "button";

	return (
		<Tag
			href={href}
			onClick={onClick}
			className={cn(
				"flex items-center gap-1 font-body font-semibold text-base leading-none transition-colors cursor-pointer",
				isActive ? "text-text-primary" : "text-text-primary hover:text-text-secondary",
			)}
		>
			{label}
			{hasDropdown && (
				<ChevronDown className="h-4 w-4" />
			)}
		</Tag>
	);
}
