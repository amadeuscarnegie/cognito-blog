import { FooterColumns, FooterLegal } from "./footer-links";
import { FooterSocial } from "./footer-social";

export function Footer() {
	return (
		<footer className="p-5">
			<div className="mx-auto rounded-2xl bg-footer-bg px-6 py-10 lg:px-12 lg:py-14">
				{/* Top: brand + link columns */}
				<div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
					{/* Brand column */}
					<div className="flex flex-col gap-5 lg:max-w-[280px] shrink-0">
						<div className="flex items-center gap-2">
							<img
								src="/assets/Logo.svg"
								alt="Cognito"
								className="w-8 h-8 brightness-0 invert"
							/>
							<span className="font-body font-bold text-lg tracking-wide text-footer-text uppercase">
								Cognito
							</span>
						</div>
						<p className="font-body text-sm leading-relaxed text-footer-text">
							Empowering students to achieve their academic goals with expert-designed
							courses and comprehensive learning resources.
						</p>
						<FooterSocial />
					</div>

					{/* Link columns */}
					<div className="flex-1">
						<FooterColumns />
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-10 border-t border-footer-text/10 pt-6 flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
					<p className="font-body text-sm text-footer-text">
						&copy; 2025 Cognito. All rights reserved.
					</p>
					<FooterLegal />
				</div>
			</div>
		</footer>
	);
}
