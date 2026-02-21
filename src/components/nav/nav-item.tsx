import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface NavItemProps {
	label: string;
	href?: string;
	hasDropdown?: boolean;
	isExpanded?: boolean;
	onClick?: () => void;
}

const navItemClassName =
	"flex items-center gap-1 font-body font-semibold text-base leading-none text-text-primary hover:text-text-secondary transition-colors cursor-pointer";

export function NavItem({
	label,
	href,
	hasDropdown,
	isExpanded,
	onClick,
}: NavItemProps) {
	const content = (
		<>
			{label}
			{hasDropdown && <ChevronDown className="h-4 w-4" />}
		</>
	);

	if (href) {
		return (
			<Link href={href} onClick={onClick} className={navItemClassName}>
				{content}
			</Link>
		);
	}

	return (
		<button
			type="button"
			onClick={onClick}
			aria-expanded={isExpanded}
			aria-haspopup={hasDropdown ? "true" : undefined}
			className={navItemClassName}
		>
			{content}
		</button>
	);
}
