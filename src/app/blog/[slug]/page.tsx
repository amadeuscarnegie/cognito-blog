import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { Nav } from "@/components/nav/nav";
import { Footer } from "@/components/footer/footer";
import { FooterCTA } from "@/components/footer-cta/footer-cta";
import { Container } from "@/components/layout/container";
import { ArticleHero } from "@/components/article/article-hero";
import { SectionRenderer } from "@/components/article/section-renderer";
import { BlogSidePanel } from "@/components/article/blog-side-panel";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { extractHeadings } from "@/lib/extract-headings";
import { BASE_URL } from "@/lib/constants";

interface ArticlePageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: ArticlePageProps): Promise<Metadata> {
	const { slug } = await params;
	const article = getArticleBySlug(slug);

	if (!article) return {};

	const imageUrl = article.heroImageUrl.startsWith("http")
		? article.heroImageUrl
		: `${BASE_URL}${article.heroImageUrl}`;

	return {
		title: article.title,
		description: article.excerpt,
		alternates: {
			canonical: `${BASE_URL}/blog/${slug}`,
		},
		openGraph: {
			type: "article",
			title: article.title,
			description: article.excerpt,
			url: `${BASE_URL}/blog/${slug}`,
			publishedTime: article.date,
			...(article.lastUpdated ? { modifiedTime: article.lastUpdated } : {}),
			authors: [article.author.name],
			images: [imageUrl],
		},
		twitter: {
			card: "summary_large_image",
			title: article.title,
			description: article.excerpt,
			images: [imageUrl],
		},
	};
}

export function generateStaticParams() {
	const articles = getAllArticles();
	return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
	const { slug } = await params;
	const article = getArticleBySlug(slug);

	if (!article) {
		notFound();
	}

	const headings = extractHeadings(article.sections);

	const breadcrumbs = [
		{ name: "Home", url: BASE_URL },
		{ name: "Blog", url: `${BASE_URL}/blog` },
		{ name: article.title, url: `${BASE_URL}/blog/${slug}` },
	];

	return (
		<>
			<JsonLd data={articleJsonLd(article)} />
			<JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
			<Nav />
			<main>
				<Container>
					<div className="flex gap-10 py-10 lg:py-16">
						{/* Main column */}
						<article className="min-w-0 max-w-[720px] flex-1">
							<ArticleHero article={article} />
							<SectionRenderer sections={article.sections} />
						</article>
						{/* Sidebar */}
						<aside className="hidden lg:block w-[280px] flex-shrink-0">
							<BlogSidePanel headings={headings} />
						</aside>
					</div>
				</Container>
			</main>
			<FooterCTA />
			<Footer />
		</>
	);
}
