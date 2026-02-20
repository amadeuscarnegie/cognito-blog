import Image from "next/image";

export function HeroIllustration() {
	return (
		<div className="flex-shrink-0">
			<Image
				src="/assets/hero-illustration.png"
				alt="Cognito characters reading and studying"
				width={300}
				height={150}
				className="w-[200px] lg:w-[300px] h-auto object-contain"
				priority
			/>
		</div>
	);
}
