import { ImageResponse } from "next/og";
import { themes } from "@/lib/content-data";

export const alt = "Cognito Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
	params,
}: {
	params: Promise<{ themeName: string }>;
}) {
	const { themeName } = await params;
	const theme = themes.find((t) => t.slug === themeName);

	const title = theme?.name ?? "Blog";
	const description = theme?.description ?? "Educational articles from Cognito";

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#0b3c61",
				color: "#ecf7ff",
			}}
		>
			<div
				style={{
					fontSize: 24,
					opacity: 0.7,
					marginBottom: 12,
				}}
			>
				Cognito Blog
			</div>
			<div
				style={{
					fontSize: 64,
					fontWeight: 700,
					marginBottom: 16,
				}}
			>
				{title}
			</div>
			<div
				style={{
					fontSize: 26,
					opacity: 0.8,
					maxWidth: 800,
					textAlign: "center",
				}}
			>
				{description}
			</div>
		</div>,
		{ ...size },
	);
}
