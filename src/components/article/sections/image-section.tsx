import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ImageSection as ImageSectionType } from "@/types/article";

export function ImageSection({ src, alt, caption, variant = "full" }: ImageSectionType) {
	return (
		<figure
			className={cn(
				"flex flex-col gap-2",
				variant === "medium" && "max-w-[480px] mx-auto",
			)}
		>
			<div
				className={cn(
					"relative overflow-hidden border-[1.5px] border-border-quaternary rounded-md",
					variant === "full" ? "aspect-video" : "aspect-[4/3]",
				)}
			>
				<Image
					src={src}
					alt={alt}
					fill
					className="object-cover"
					sizes={variant === "full" ? "720px" : "480px"}
				/>
			</div>
			{caption && (
				<figcaption className="font-body font-medium text-sm text-text-secondary text-center">
					{caption}
				</figcaption>
			)}
		</figure>
	);
}
