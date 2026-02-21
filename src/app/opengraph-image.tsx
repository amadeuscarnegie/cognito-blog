import { ImageResponse } from "next/og";

export const alt = "Cognito Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
					fontSize: 72,
					fontWeight: 700,
					marginBottom: 16,
				}}
			>
				Cognito Blog
			</div>
			<div
				style={{
					fontSize: 28,
					opacity: 0.8,
				}}
			>
				Educational articles and revision tips
			</div>
		</div>,
		{ ...size },
	);
}
