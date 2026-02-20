import Link from "next/link";

export function NavLogo() {
	return (
		<Link href="/" className="flex items-center gap-2">
			<img
				src="/assets/Logo.svg"
				alt="Cognito"
				className="w-[106px] h-[31px] lg:w-[122px] lg:h-[36px]"
			/>
			<span className="font-body font-bold text-lg tracking-wide text-text-primary uppercase">
				COGNITO
			</span>
		</Link>
	);
}
