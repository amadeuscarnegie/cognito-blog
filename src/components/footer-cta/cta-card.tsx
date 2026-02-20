import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDescription } from "@/components/ui/section-description";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@/components/ui/login-link";

export function CTACard() {
	return (
		<div className="bg-bg-secondary border border-border-brand rounded-md px-8 py-10 lg:px-12 lg:py-12 text-center max-w-[480px] mx-auto">
			<div className="flex flex-col items-center gap-4">
				<SectionLabel>Students improve 2.5 grades on average</SectionLabel>
				<SectionHeading as="h2" className="text-[26px] lg:text-[40px]">
					Don&apos;t let another term slip by
				</SectionHeading>
				<SectionDescription className="text-text-primary text-base lg:text-lg">
					Join 1,000,000+ students using our all-in-one platform with video
					lessons, AI feedback, practice questions, and progress tracking.
				</SectionDescription>
				<div className="pt-2 w-full lg:w-auto">
					<Button
						variant="primary"
						icon={<ArrowUpRight className="h-4 w-4" />}
						className="w-full lg:w-auto"
					>
						Get started - it&apos;s FREE
					</Button>
				</div>
				<LoginLink />
			</div>
		</div>
	);
}
