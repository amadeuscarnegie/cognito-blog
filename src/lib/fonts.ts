import { Nunito, Playfair_Display } from "next/font/google";

export const nunito = Nunito({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-body",
	display: "swap",
});

export const playfairDisplay = Playfair_Display({
	subsets: ["latin"],
	weight: ["600"],
	variable: "--font-heading",
	display: "swap",
});
