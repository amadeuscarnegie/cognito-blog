import { Nunito, Petrona } from "next/font/google";

export const nunito = Nunito({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-body",
	display: "swap",
});

export const petrona = Petrona({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-heading",
	display: "swap",
});
