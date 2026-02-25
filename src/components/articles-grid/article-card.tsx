import Link from "next/link";
import { CardImage } from "./card-image";
import { themeNameFromSlug } from "@/lib/content-data";
import type { Article } from "@/types/blog";

interface ArticleCardProps {
	article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
	return (
		<Link
			href={`/blog/${article.slug}`}
			className="flex flex-row lg:flex-col gap-3 lg:gap-0 group"
		>
			<CardImage
				src={article.thumbnailUrl}
				illustrationUrl={article.illustrationUrl}
				bgColor={article.thumbnailBg}
				alt={article.title}
				className="w-[100px] h-[100px] lg:w-full lg:h-auto"
			/>
			<div className="flex flex-col gap-2 lg:pt-4">
				<div className="flex items-center gap-2">
					<span className="font-body font-medium text-xs leading-none text-text-primary">
						{themeNameFromSlug(article.themeSlug)}
					</span>
					<span aria-hidden="true" className="h-[2px] w-[2px] shrink-0 rounded-full bg-text-primary" />
					<span className="font-body font-medium text-xs leading-none text-text-primary">
						{article.readingTime} min
					</span>
				</div>
				<h3 className="font-heading font-semibold text-[17px] lg:text-xl leading-[1.2] text-text-primary group-hover:text-border-brand transition-colors">
					{article.title}
				</h3>
			</div>
		</Link>
	);
}
