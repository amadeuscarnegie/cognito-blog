import { Container } from "@/components/layout/container";
import { FooterLinks } from "./footer-links";
import { FooterSocial } from "./footer-social";

export function Footer() {
	return (
		<footer className="bg-nav-bg border-t border-nav-border">
			<Container>
				<div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-4 pt-8 pb-8 lg:py-8">
					<p className="font-body font-normal text-sm leading-[1.6] text-text-primary">
						&copy; 2026 Cognito Education. All rights reserved.
					</p>
					<div className="flex items-center gap-4">
						<FooterLinks />
						<FooterSocial />
					</div>
				</div>
			</Container>
		</footer>
	);
}
