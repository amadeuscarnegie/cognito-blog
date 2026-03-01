export function logFaqSearch(query: string, resultCount: number) {
	if (process.env.NODE_ENV === "development") {
		console.log(`[FAQ Search] query="${query}" results=${resultCount}`);
	}

	// Plausible:
	// window.plausible?.("FAQ Search", { props: { query, resultCount } });

	// PostHog:
	// posthog.capture("faq_search", { query, result_count: resultCount });

	// sendBeacon:
	// navigator.sendBeacon("/api/analytics", JSON.stringify({ event: "faq_search", query, resultCount }));
}
