import { Container } from "@/components/layout/container";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDescription } from "@/components/ui/section-description";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion/accordion";
import { faqs } from "@/lib/mock-data";

export function FAQsSection() {
	return (
		<section className="hidden lg:block pt-16 pb-24">
			<Container>
				<div className="flex gap-10">
					{/* Left - Sticky */}
					<div className="sticky top-[76px] self-start max-w-[400px] flex flex-col gap-4 pt-16">
						<SectionLabel>Frequently asked questions</SectionLabel>
						<SectionHeading>Got questions? We've got answers</SectionHeading>
						<SectionDescription>
							Everything you need to know about Cognito, from getting started to
							making the most of your revision.
						</SectionDescription>
						<ButtonGroup className="pt-2">
							<Button variant="secondary">Visit our FAQ</Button>
							<Button variant="ghost">Contact us</Button>
						</ButtonGroup>
					</div>

					{/* Right - Accordion */}
					<div className="flex-1 pt-16 max-w-[800px]">
						<Accordion items={faqs} />
					</div>
				</div>
			</Container>
		</section>
	);
}
