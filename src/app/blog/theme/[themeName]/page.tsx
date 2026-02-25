import { notFound } from "next/navigation";
import { themes, articles, faqs } from "@/lib/content-data";
import {
	JsonLd,
	faqPageJsonLd,
	breadcrumbJsonLd,
} from "@/lib/json-ld";
import { BlogThemeClient } from "./client";
import type { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";

export function generateStaticParams() {
	return themes.map((t) => ({ themeName: t.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ themeName: string }>;
}): Promise<Metadata> {
	const { themeName } = await params;
	const theme = themes.find((t) => t.slug === themeName);
	if (!theme) return {};

	const title =
		theme.slug === "all"
			? "Free GCSE & A-Level Revision Tips"
			: `${theme.name} — GCSE & A-Level Revision`;

	return {
		title,
		description: theme.description,
		openGraph: {
			title,
			description: theme.description,
			type: "website",
			siteName: "Cognito",
		},
		twitter: {
			card: "summary_large_image",
			site: "@CognitoEdu",
			title,
			description: theme.description,
		},
		alternates: {
			canonical: `${BASE_URL}/blog/theme/${themeName}`,
		},
	};
}

export default async function BlogThemePage({
	params,
}: {
	params: Promise<{ themeName: string }>;
}) {
	const { themeName } = await params;

	const initialTheme = themes.find((t) => t.slug === themeName);
	if (!initialTheme) notFound();

	const breadcrumbItems = [
		{ name: "Home", url: BASE_URL },
		{ name: "Blog", url: `${BASE_URL}/blog/theme/all` },
		...(initialTheme.slug !== "all"
			? [
					{
						name: initialTheme.name,
						url: `${BASE_URL}/blog/theme/${initialTheme.slug}`,
					},
				]
			: []),
	];

	return (
		<>
			<JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
			<JsonLd data={faqPageJsonLd(faqs)} />
			<BlogThemeClient initialTheme={initialTheme} allArticles={articles} />
		</>
	);
}
