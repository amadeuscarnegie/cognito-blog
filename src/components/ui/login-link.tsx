import { cn } from "@/lib/cn";

interface LoginLinkProps {
	className?: string;
}

export function LoginLink({ className }: LoginLinkProps) {
	return (
		<p className={cn("font-body text-sm font-normal text-text-primary", className)}>
			Already have an account?{" "}
			<a href="/login" className="underline">
				Log in
			</a>
		</p>
	);
}
