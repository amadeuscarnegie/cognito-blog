import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { articles, themeNameFromSlug } from "@/lib/content-data";
import type { ThemeFilterSlug } from "@/types/blog";
import type { RelatedContentSection as RelatedContentSectionType } from "@/types/article";

export function RelatedContentSection({ title, slugs }: RelatedContentSectionType) {
	const resolved = slugs
		.map((slug) => articles.find((a) => a.slug === slug))
		.filter((a): a is (typeof articles)[number] => a !== undefined);

	if (resolved.length === 0) return null;

	return (
		<div className="flex flex-col gap-4">
			<h3 className="font-body font-bold text-xs uppercase tracking-wider text-text-primary">
				{title}
			</h3>
			<div className="flex flex-col divide-y divide-border-quaternary border-y border-border-quaternary">
				{resolved.map((article) => {
					const themeName = themeNameFromSlug(article.themeSlug as ThemeFilterSlug);

					return (
						<Link
							key={article.slug}
							href={`/blog/${article.slug}`}
							className="flex items-center gap-3 py-3 group"
						>
							<div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
								<Image
									src={article.thumbnailUrl}
									alt={article.title}
									fill
									className="object-cover"
								/>
							</div>
							<div className="flex flex-col gap-0.5 min-w-0 flex-1">
								<span className="font-body font-semibold text-sm leading-tight text-text-primary group-hover:text-border-brand transition-colors truncate">
									{article.title}
								</span>
								<span className="font-body text-xs text-text-secondary">
									{themeName} · {article.readingTime} min
								</span>
							</div>
							<ChevronRight className="w-4 h-4 flex-shrink-0 text-text-tertiary group-hover:text-border-brand transition-colors" />
						</Link>
					);
				})}
			</div>
		</div>
	);
}
