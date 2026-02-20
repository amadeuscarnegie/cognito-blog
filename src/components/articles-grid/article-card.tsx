import Link from "next/link";
import { CardImage } from "./card-image";
import { CardMeta } from "./card-meta";
import type { Article } from "@/types/blog";

interface ArticleCardProps {
	article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
	return (
		<Link
			href={`/blog/${article.slug}`}
			className="group flex flex-row lg:flex-col gap-3 lg:gap-0 transition-transform duration-200 lg:hover:scale-[1.02]"
		>
			<CardImage
				src={article.thumbnailUrl}
				alt={article.title}
				className="w-[100px] h-[100px] lg:w-full lg:h-auto"
			/>
			<div className="flex flex-col gap-2 lg:pt-4">
				<CardMeta theme={article.theme} readingTime={article.readingTime} />
				<h3 className="font-heading font-semibold text-[17px] lg:text-xl leading-[1.2] text-text-primary">
					{article.title}
				</h3>
			</div>
		</Link>
	);
}
