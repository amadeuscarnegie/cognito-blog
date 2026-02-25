import Image from "next/image";
import type { ThemeFilterSlug } from "@/types/blog";

const themeImageMap = {
	all: "/assets/hero-illustration.png",
	"study-tips": "/assets/hero-laidback.png",
	science: "/assets/hero-toilet.png",
	maths: "/assets/hero-squished.png",
	wellbeing: "/assets/hero-chair-light.png",
} satisfies Record<ThemeFilterSlug, string>;

interface HeroIllustrationProps {
	themeSlug: ThemeFilterSlug;
}

export function HeroIllustration({ themeSlug }: HeroIllustrationProps) {
	const src = themeImageMap[themeSlug] ?? themeImageMap.all ?? "/assets/hero-illustration.png";

	return (
		<div className="flex-shrink-0 w-[200px] lg:w-[300px] h-[75px] lg:h-[112px] flex items-end">
			<Image
				src={src}
				alt="Cognito characters reading and studying"
				width={300}
				height={112}
				className="w-full h-full object-contain object-bottom"
				priority
			/>
		</div>
	);
}
