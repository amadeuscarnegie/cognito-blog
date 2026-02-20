import { Button } from "@/components/ui/button";

interface LoadMoreButtonProps {
	onClick: () => void;
}

export function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
	return (
		<div className="flex justify-center pt-8 lg:pt-10">
			<Button variant="secondary" onClick={onClick}>
				Load more
			</Button>
		</div>
	);
}
