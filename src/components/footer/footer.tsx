import { Container } from "@/components/layout/container";
import { FooterLinks } from "./footer-links";
import { FooterSocial } from "./footer-social";

export function Footer() {
	return (
		<footer className="bg-footer-bg py-8 lg:py-10">
			<Container>
				{/* Mobile: stacked centered layout */}
				<div className="flex flex-col items-center gap-6 lg:hidden">
					<div className="flex items-center gap-2">
						<img
							src="/assets/Logo.svg"
							alt="Cognito"
							className="w-[106px] h-[31px] brightness-0 invert"
						/>
						<span className="font-body font-bold text-lg tracking-wide text-footer-text uppercase">
							COGNITO
						</span>
					</div>

					<div className="flex items-center gap-5">
						<FooterLinks />
						<FooterSocial />
					</div>

					<p className="text-sm text-footer-muted">
						&copy; 2026 Cognito Education. All rights reserved.
					</p>
				</div>

				{/* Desktop: row layout — logo+copyright left, links+social right */}
				<div className="hidden lg:flex lg:items-center lg:justify-between">
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2">
							<img
								src="/assets/Logo.svg"
								alt="Cognito"
								className="w-[122px] h-[36px] brightness-0 invert"
							/>
							<span className="font-body font-bold text-lg tracking-wide text-footer-text uppercase">
								COGNITO
							</span>
						</div>
						<p className="text-sm text-footer-muted">
							&copy; 2026 Cognito Education. All rights reserved.
						</p>
					</div>

					<div className="flex items-center gap-6">
						<FooterLinks />
						<div className="h-4 w-px bg-footer-border" />
						<FooterSocial />
					</div>
				</div>
			</Container>
		</footer>
	);
}
