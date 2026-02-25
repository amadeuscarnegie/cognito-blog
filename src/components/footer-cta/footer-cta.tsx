import Image from "next/image";
import { Container } from "@/components/layout/container";
import { CTACard } from "./cta-card";

export function FooterCTA() {
	return (
		<section className="relative isolate pt-16 lg:pt-0">
			{/* ===== MOBILE / TABLET LAYOUT ===== */}
			<div className="lg:hidden">
				{/* Card in normal flow, z-10 so it sits above the overlapping image */}
				<Container className="relative z-10 -mb-10">
					<CTACard />
				</Container>
				{/* Battle image: 2:1 aspect, 100% width, min-height 360px, -80px overlap */}
				<div className="-mt-20 overflow-hidden aspect-[2/1] min-h-[360px] max-w-full">
					<Image
						src="/assets/blog-cta-battle-mobile.jpg"
						alt=""
						width={400}
						height={300}
						sizes="100vw"
						className="w-full h-full object-cover object-bottom block scale-[1.005]"
						aria-hidden="true"
					/>
				</div>
			</div>

			{/* ===== DESKTOP LAYOUT ===== */}
			<div className="hidden lg:block relative w-full">
				<div className="overflow-hidden">
					<Image
						src="/assets/blog-cta-battle-desktop.jpg"
						alt=""
						width={800}
						height={400}
						sizes="100vw"
						className="w-full h-auto block scale-[1.005]"
						aria-hidden="true"
					/>
				</div>
				{/* CTA Card — absolutely positioned, centered on the illustration */}
				<div className="absolute inset-x-0 -top-[6%] bottom-0 flex items-start justify-center z-10">
					<Container>
						<div>
							<CTACard />
						</div>
					</Container>
				</div>
			</div>
		</section>
	);
}
