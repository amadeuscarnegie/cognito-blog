import { ChevronDown } from "lucide-react";

interface NavItemProps {
	label: string;
	href?: string;
	hasDropdown?: boolean;
	onClick?: () => void;
}

export function NavItem({
	label,
	href,
	hasDropdown,
	onClick,
}: NavItemProps) {
	if (href) {
		return (
			<a
				href={href}
				onClick={onClick}
				className="flex items-center gap-1 font-body font-semibold text-base leading-none text-text-primary hover:text-text-secondary transition-colors cursor-pointer"
			>
				{label}
				{hasDropdown && <ChevronDown className="h-4 w-4" />}
			</a>
		);
	}

	return (
		<button
			type="button"
			onClick={onClick}
			className="flex items-center gap-1 font-body font-semibold text-base leading-none text-text-primary hover:text-text-secondary transition-colors cursor-pointer"
		>
			{label}
			{hasDropdown && <ChevronDown className="h-4 w-4" />}
		</button>
	);
}
