import { Container } from "./container";

export function SectionDivider() {
	return (
		<div className="hidden lg:block py-10">
			<Container>
				<hr className="border-t border-border-quaternary" />
			</Container>
		</div>
	);
}
