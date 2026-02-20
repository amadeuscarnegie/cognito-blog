import Image from "next/image";

const themeImageMap: Record<string, string> = {
	all: "/assets/hero-illustration.png",
	"study-tips": "/assets/hero-laidback.png",
	science: "/assets/hero-toilet.png",
	maths: "/assets/hero-squished.png",
	wellbeing: "/assets/hero-chair-light.png",
};

interface HeroIllustrationProps {
	themeSlug: string;
}

export function HeroIllustration({ themeSlug }: HeroIllustrationProps) {
	const src = themeImageMap[themeSlug] ?? themeImageMap.all;

	return (
		<div className="flex-shrink-0 w-[200px] lg:w-[300px] h-[75px] lg:h-[112px] flex items-end">
			<Image
				src={src}
				alt="Cognito characters reading and studying"
				width={300}
				height={112}
				className="max-w-full max-h-full h-auto object-contain object-bottom"
				priority
			/>
		</div>
	);
}
