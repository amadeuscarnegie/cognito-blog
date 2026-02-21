"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { ArticleCard } from "./article-card";
import { LoadMoreButton } from "./load-more-button";
import type { Article } from "@/types/blog";

interface ArticlesGridProps {
	articles: Article[];
	tabId?: string;
}

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 6;

export function ArticlesGrid({ articles, tabId }: ArticlesGridProps) {
	const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
	const visibleArticles = articles.slice(0, visibleCount);
	const hasMore = visibleCount < articles.length;

	return (
		<section
			id="blog-tabpanel"
			role="tabpanel"
			aria-labelledby={tabId}
			className="py-6 lg:py-10"
		>
			<Container>
				<h2 className="sr-only">Articles</h2>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8">
					{visibleArticles.map((article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</div>
				{visibleArticles.length === 0 && (
					<p className="text-center font-body text-text-secondary py-12">
						No articles found matching your search.
					</p>
				)}
				{hasMore && (
					<LoadMoreButton
						onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
					/>
				)}
			</Container>
		</section>
	);
}
