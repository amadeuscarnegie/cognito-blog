import Image from "next/image";
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
		<section className="py-10 lg:pt-16 lg:pb-6">
			<Container>
				<div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
					{/* Left */}
					<div className="max-w-full lg:max-w-[400px] flex flex-col gap-4">
						<Image
							src="/assets/avatar-sherlock.svg"
							alt=""
							width={80}
							height={80}
							className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px]"
							aria-hidden="true"
						/>
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
					<div className="flex-1 lg:max-w-[800px]">
						<Accordion items={faqs} />
					</div>
				</div>
			</Container>
		</section>
	);
}
