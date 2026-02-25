import Image from "next/image";
import { cn } from "@/lib/cn";

interface CardImageProps {
	src: string;
	alt: string;
	illustrationUrl?: string;
	bgColor?: string;
	className?: string;
}

export function CardImage({ src, alt, illustrationUrl, bgColor, className }: CardImageProps) {
	if (illustrationUrl && bgColor) {
		return (
			<div
				className={cn(
					"relative overflow-hidden border-[1.5px] border-border-primary",
					"rounded-md lg:rounded-lg",
					"aspect-square lg:aspect-video",
					"flex-shrink-0",
					"flex items-center justify-center",
					"transition-transform duration-300 ease-out group-hover:scale-[1.03]",
					className,
				)}
				style={{
					backgroundColor: bgColor,
					backgroundImage: `
						linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
						linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
					`,
					backgroundSize: "40px 40px",
				}}
			>
				<Image
					src={illustrationUrl}
					alt={alt}
					width={200}
					height={200}
					className="object-contain w-[60%] h-[60%]"
					sizes="(max-width: 1023px) 60px, 200px"
				/>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"relative overflow-hidden border-[1.5px] border-border-primary",
				"rounded-md lg:rounded-lg",
				"aspect-square lg:aspect-video",
				"flex-shrink-0",
				"transition-transform duration-300 ease-out group-hover:scale-[1.03]",
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
