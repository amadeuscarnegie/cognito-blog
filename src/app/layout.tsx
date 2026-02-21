import type { Metadata } from "next";
import { nunito, stratford } from "@/lib/fonts";
import { JsonLd, organizationJsonLd, webSiteJsonLd } from "@/lib/json-ld";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://cognitolearning.co.uk"),
	title: {
		default: "Cognito Blog | Free GCSE & A-Level Revision Tips",
		template: "%s | Cognito Blog",
	},
	description:
		"Free revision tips, study guides and exam preparation articles for GCSE and A-Level students across the UK. Written by the Cognito team.",
	openGraph: {
		locale: "en_GB",
		url: "https://cognitolearning.co.uk",
		type: "website",
		siteName: "Cognito",
	},
	twitter: {
		card: "summary_large_image",
		site: "@CognitoEdu",
	},
	alternates: {
		canonical: "https://cognitolearning.co.uk",
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
		<html lang="en" className={`${nunito.variable} ${stratford.variable}`}>
			<body className="overflow-x-hidden">
				<JsonLd data={organizationJsonLd()} />
				<JsonLd data={webSiteJsonLd()} />
				{children}
			</body>
		</html>
	);
}
