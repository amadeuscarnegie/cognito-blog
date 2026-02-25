import { articles } from "@/lib/content-data";
import { ArticleCard } from "@/components/articles-grid/article-card";
import type { RelatedContentSection as RelatedContentSectionType } from "@/types/article";

export function RelatedContentSection({ title, slugs }: RelatedContentSectionType) {
	const resolved = slugs
		.map((slug) => articles.find((a) => a.slug === slug))
		.filter((a): a is (typeof articles)[number] => a !== undefined);

	if (resolved.length === 0) return null;

	return (
		<div className="flex flex-col gap-6">
			<h3 className="font-heading font-semibold text-xl lg:text-2xl leading-[1.2] text-text-primary">
				{title}
			</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{resolved.map((article) => (
					<ArticleCard key={article.slug} article={article} />
				))}
			</div>
		</div>
	);
}
