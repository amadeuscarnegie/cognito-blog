import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDescription } from "@/components/ui/section-description";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@/components/ui/login-link";

export function FooterCTA() {
	return (
		<section className="relative isolate overflow-hidden">
			{/* Battle illustration — full-bleed background */}
			<img
				src="/assets/blog-cta-battle-mobile.jpg"
				alt=""
				className="absolute inset-0 -z-20 h-full w-full object-cover object-bottom"
				aria-hidden="true"
			/>

			{/* Brand navy gradient overlay for legibility */}
			<div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b3c61]/85 via-[#0b3c61]/55 to-[#0b3c61]/30" />

			{/* CTA content */}
			<Container>
				<div className="flex flex-col items-center gap-4 py-20 lg:py-28 text-center max-w-[540px] mx-auto">
					<SectionLabel className="text-white/90">
						Students improve 2.5 grades on average
					</SectionLabel>
					<SectionHeading as="h2" className="text-white">
						Don&apos;t let another term slip by
					</SectionHeading>
					<SectionDescription className="text-white/80 lg:text-lg">
						Join 1,000,000+ students using our all-in-one platform with video
						lessons, AI feedback, practice questions, and progress tracking.
					</SectionDescription>
					<div className="pt-2 w-full lg:w-auto">
						<Button
							variant="primary"
							icon={<ArrowUpRight className="h-4 w-4" />}
							className="w-full lg:w-auto bg-white text-[#0b3c61] hover:bg-white/90"
						>
							Get started - it&apos;s FREE
						</Button>
					</div>
					<LoginLink className="text-white/70" />
				</div>
			</Container>
		</section>
	);
}
