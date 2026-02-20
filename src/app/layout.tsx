import type { Metadata } from "next";
import { nunito, stratford } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
	title: "Cognito Blog",
	description: "Educational articles and revision tips from Cognito",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${nunito.variable} ${stratford.variable}`}>
			<body>{children}</body>
		</html>
	);
}
