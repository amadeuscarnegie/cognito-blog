import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function SidebarCTA() {
	return (
		<div className="relative overflow-visible bg-bg-secondary border-[1.5px] border-border-brand rounded-md pt-10 pb-8 px-6 flex flex-col gap-3">
			<Image
				src="/assets/cta-tile-character.svg"
				alt=""
				width={80}
				height={80}
				className="absolute right-[14.5px] top-[-33.5px] w-[80px] h-[80px]"
			/>
			<span className="font-body font-bold text-[12px] uppercase tracking-[1.2px] text-text-primary">
				Free account
			</span>
			<h3 className="font-heading font-medium text-[24px] leading-[1.2]">
				Start revising with Cognito
			</h3>
			<p className="font-body text-[14px] text-text-secondary leading-[1.6]">
				Free videos, quizzes and interactive content for GCSE and A-Level
				students.
			</p>
			<a
				href="https://cognito.org/signup"
				className="inline-flex items-center gap-1.5 font-body font-bold text-[14px] text-text-primary hover:underline mt-1"
			>
				Get started
				<ArrowRight className="w-4 h-4" />
			</a>
		</div>
	);
}
