import Link from "next/link";
import Image from "next/image";

export function NavLogo() {
	return (
		<Link href="/" className="flex items-center gap-2">
			<Image
				src="/assets/Logo.svg"
				alt="Cognito"
				width={122}
				height={36}
				priority
				className="w-[106px] h-[31px] lg:w-[122px] lg:h-[36px]"
			/>
			<span className="font-body font-bold text-lg tracking-wide text-text-primary uppercase">
				COGNITO
			</span>
		</Link>
	);
}
