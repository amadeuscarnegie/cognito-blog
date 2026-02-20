import { Container } from "./container";

export function SectionDivider() {
	return (
		<div className="py-6 lg:py-10">
			<Container>
				<hr className="border-t border-border-quaternary" />
			</Container>
		</div>
	);
}
