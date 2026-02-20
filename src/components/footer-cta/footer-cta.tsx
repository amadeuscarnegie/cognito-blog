"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/layout/container";
import { CTACard } from "./cta-card";

export function FooterCTA() {
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	// Card moves down slightly as you scroll (parallax offset) — desktop only
	const cardY = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);

	return (
		<section ref={sectionRef} className="relative isolate">
			{/* ===== MOBILE / TABLET LAYOUT ===== */}
			<div className="lg:hidden">
				{/* Card in normal flow, z-10 so it sits above the overlapping image */}
				<Container className="relative z-10">
					<CTACard />
				</Container>
				{/* Battle image: 2:1 aspect, 100% width, min-height 360px, -80px overlap */}
				<div className="-mt-20">
					<img
						src="/assets/blog-cta-battle-mobile.jpg"
						alt=""
						className="w-full min-h-[360px] object-cover aspect-[2/1]"
						aria-hidden="true"
					/>
				</div>
			</div>

			{/* ===== DESKTOP LAYOUT ===== */}
			<div className="hidden lg:block relative w-full">
				<img
					src="/assets/blog-cta-battle-desktop.jpg"
					alt=""
					className="w-full h-auto object-cover"
					aria-hidden="true"
				/>
				{/* CTA Card — absolutely positioned, centered on the illustration */}
				<div className="absolute inset-0 flex items-center justify-center z-10">
					<Container>
						<motion.div style={{ y: cardY }}>
							<CTACard />
						</motion.div>
					</Container>
				</div>
			</div>
		</section>
	);
}
