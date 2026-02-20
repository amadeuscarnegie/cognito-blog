import Image from "next/image";
import { cn } from "@/lib/cn";

interface CardImageProps {
	src: string;
	alt: string;
	className?: string;
}

export function CardImage({ src, alt, className }: CardImageProps) {
	return (
		<div
			className={cn(
				"relative overflow-hidden border-[1.5px] border-border-primary",
				"rounded-md lg:rounded-lg",
				"aspect-square lg:aspect-video",
				"flex-shrink-0",
				className,
			)}
		>
			<Image
				src={src}
				alt={alt}
				fill
				className="object-cover"
				sizes="(max-width: 1023px) 100px, 33vw"
			/>
		</div>
	);
}
