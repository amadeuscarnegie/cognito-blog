import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/articles";
import { SectionRenderer } from "@/components/article/section-renderer";

interface ArticlePageProps {
	params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
	const { slug } = await params;
	const article = getArticleBySlug(slug);

	if (!article) {
		notFound();
	}

	return (
		<main className="mx-auto max-w-[720px] px-4 py-12 lg:py-16">
			<h1 className="font-heading font-bold text-3xl lg:text-4xl leading-[1.15] text-text-primary mb-8 lg:mb-10">
				{article.title}
			</h1>
			<SectionRenderer sections={article.sections} />
		</main>
	);
}
