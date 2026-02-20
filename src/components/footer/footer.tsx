import { FooterLinks } from "./footer-links";
import { FooterSocial } from "./footer-social";

export function Footer() {
	return (
		<footer className="px-4 lg:px-6 pb-4 lg:pb-6">
			<div className="mx-auto max-w-[1080px] rounded-2xl bg-footer-bg px-6 py-5 lg:px-10">
				<div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
					<p className="text-sm text-footer-text">
						&copy; 2026 Cognito Education. All rights reserved.
					</p>
					<div className="flex items-center gap-4">
						<FooterLinks />
						<FooterSocial />
					</div>
				</div>
			</div>
		</footer>
	);
}
