import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Cognito Blog",
		short_name: "Cognito",
		description:
			"Free revision tips, study guides and exam preparation articles for GCSE and A-Level students.",
		start_url: "/blog/theme/all",
		display: "standalone",
		theme_color: "#0b3c61",
		background_color: "#ffffff",
		icons: [
			{
				src: "/favicon.ico",
				sizes: "any",
				type: "image/x-icon",
			},
		],
	};
}
