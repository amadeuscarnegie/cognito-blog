import { notFound } from "next/navigation";
import { themes, articles } from "@/lib/mock-data";
import { BlogThemeClient } from "./client";
import type { Metadata } from "next";

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
			? "Cognito Blog"
			: `${theme.name} — Cognito Blog`;

	return {
		title,
		description: theme.description,
		openGraph: {
			title,
			description: theme.description,
			type: "website",
			siteName: "Cognito",
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

	return <BlogThemeClient initialTheme={initialTheme} allArticles={articles} />;
}
