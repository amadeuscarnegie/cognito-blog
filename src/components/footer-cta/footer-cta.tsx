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

	// Card moves down slightly as you scroll (parallax offset)
	const cardY = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);

	return (
		<section ref={sectionRef} className="relative isolate">
			{/* CTA Card — moves with parallax */}
			<Container>
				<motion.div
					style={{ y: cardY }}
					className="relative z-10 -mb-72 lg:-mb-[450px]"
				>
					<CTACard />
				</motion.div>
			</Container>

			{/* Background Illustration — static */}
			<div className="relative z-0 w-full">
				{/* Desktop */}
				<img
					src="/assets/blog-cta-battle-desktop.jpg"
					alt=""
					className="hidden lg:block w-full h-auto object-cover"
					aria-hidden="true"
				/>
				{/* Mobile */}
				<img
					src="/assets/blog-cta-battle-mobile.jpg"
					alt=""
					className="lg:hidden w-full h-auto object-cover"
					aria-hidden="true"
				/>
			</div>
		</section>
	);
}
