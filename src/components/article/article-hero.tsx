import Image from "next/image";
import type { ArticleData } from "@/types/article";
import { themeNameFromSlug } from "@/lib/content-data";
import type { ThemeFilterSlug } from "@/types/blog";
import { CopyLinkButton } from "./copy-link-button";

function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

interface ArticleHeroProps {
	article: ArticleData;
}

export function ArticleHero({ article }: ArticleHeroProps) {
	const themeSlug = article.tags.theme?.[0];
	const themeName = themeSlug
		? themeNameFromSlug(themeSlug as ThemeFilterSlug)
		: null;

	const dateDisplay = article.lastUpdated
		? `Updated ${formatDate(article.lastUpdated)}`
		: `Published ${formatDate(article.date)}`;

	return (
		<div className="flex flex-col mb-8 lg:mb-12">
			{/* Theme badge */}
			{themeName && (
				<span className="inline-flex self-start bg-[#d1eafd] text-border-brand text-xs font-body font-bold px-2.5 py-1 rounded-full mb-2 lg:mb-3">
					{themeName}
				</span>
			)}

			{/* Title */}
			<h1 className="font-heading text-[28px] lg:text-[40px] leading-[1.15] tracking-[-0.01em] font-bold text-text-primary mb-4 lg:mb-5">
				{article.title}
			</h1>

			{/* Excerpt */}
			<p className="font-body font-medium text-[17px] lg:text-lg leading-[1.8] text-text-primary mb-5 lg:mb-6">
				{article.excerpt}
			</p>

			{/* Meta row */}
			<div className="flex items-center justify-between mb-5 lg:mb-8">
				<div className="flex items-center gap-3">
					{/* Author avatar */}
					{article.author.avatarUrl && (
						<div className="relative w-10 h-10 rounded-full border-2 border-border-primary overflow-hidden flex-shrink-0">
							<Image
								src={article.author.avatarUrl}
								alt={article.author.name}
								fill
								className="object-cover"
							/>
						</div>
					)}

					<div className="flex items-center gap-2 text-sm font-body text-text-secondary flex-wrap">
						<span>
							Written by{" "}
							<strong className="font-semibold text-text-primary">
								{article.author.name}
							</strong>
						</span>
						<span className="text-text-tertiary">·</span>
						<span>{dateDisplay}</span>
						<span className="text-text-tertiary">·</span>
						<span>{article.readingTime} min</span>
					</div>
				</div>

				<CopyLinkButton />
			</div>

			{/* Hero image */}
			<div className="relative aspect-video border-[1.5px] border-border-primary rounded-md lg:rounded-lg overflow-hidden">
				<Image
					src={article.heroImageUrl}
					alt={article.title}
					fill
					priority
					className="object-cover"
				/>
			</div>
		</div>
	);
}
