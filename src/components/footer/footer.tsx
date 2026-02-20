import { Container } from "@/components/layout/container";
import { FooterLinks } from "./footer-links";
import { FooterSocial } from "./footer-social";

export function Footer() {
	return (
		<footer className="bg-footer-bg border-t border-footer-border py-5">
			<Container>
				<div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
					<p className="text-sm text-footer-text">
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
