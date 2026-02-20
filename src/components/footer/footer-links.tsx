import { footerLinks } from "@/lib/mock-data";

export function FooterLinks() {
	return (
		<nav className="flex items-center gap-[15px]">
			{footerLinks.map((link) => (
				<a
					key={link.label}
					href={link.href}
					className="font-body font-normal text-sm leading-[1.6] text-footer-muted hover:text-footer-text transition-colors"
				>
					{link.label}
				</a>
			))}
		</nav>
	);
}
