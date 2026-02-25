import fs from "node:fs";
import path from "node:path";
import type { ArticleData } from "@/types/article";

const contentDir = path.join(process.cwd(), "content", "blog");

export function getArticleBySlug(slug: string): ArticleData | null {
	const filePath = path.join(contentDir, `${slug}.json`);

	if (!fs.existsSync(filePath)) {
		return null;
	}

	const raw = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(raw) as ArticleData;
}

export function getAllArticles(): ArticleData[] {
	if (!fs.existsSync(contentDir)) {
		return [];
	}

	const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".json"));

	const articles = files
		.map((file) => {
			const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
			return JSON.parse(raw) as ArticleData;
		})
		.filter((article) => article.published);

	// Sort by date descending
	articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return articles;
}
