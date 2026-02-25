import type { Metadata } from "next";
import { nunito, lora } from "@/lib/fonts";
import { JsonLd, organizationJsonLd, webSiteJsonLd } from "@/lib/json-ld";
import { BASE_URL } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	title: {
		default: "Cognito Blog | Free GCSE & A-Level Revision Tips",
		template: "%s | Cognito Blog",
	},
	description:
		"Free revision tips, study guides and exam preparation articles for GCSE and A-Level students across the UK. Written by the Cognito team.",
	openGraph: {
		locale: "en_GB",
		url: BASE_URL,
		type: "website",
		siteName: "Cognito",
	},
	twitter: {
		card: "summary_large_image",
		site: "@CognitoEdu",
	},
	alternates: {
		canonical: BASE_URL,
		types: {
			"application/rss+xml": `${BASE_URL}/feed.xml`,
		},
	},
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${nunito.variable} ${lora.variable}`}>
			<body className="overflow-x-hidden">
				<JsonLd data={organizationJsonLd()} />
				<JsonLd data={webSiteJsonLd()} />
				{children}
			</body>
		</html>
	);
}
