import Link from "next/link";

type FooterColumn = {
	title: string;
	links: { label: string; href: string }[];
};

const COGNITO_BASE = "https://www.cognito.org";

const mainColumns: FooterColumn[] = [
	{
		title: "How we help...",
		links: [
			{ label: "Schools", href: `${COGNITO_BASE}/schools` },
			{ label: "Students", href: `${COGNITO_BASE}/students` },
			{ label: "Teachers", href: `${COGNITO_BASE}/teachers` },
			{ label: "Parents", href: `${COGNITO_BASE}/parents` },
		],
	},
	{
		title: "Features",
		links: [
			{ label: "Video Lessons", href: `${COGNITO_BASE}/features/video-lessons` },
			{ label: "Flashcards", href: `${COGNITO_BASE}/features/flashcards` },
			{ label: "Revision Notes", href: `${COGNITO_BASE}/features/revision-notes` },
			{ label: "Quizzes", href: `${COGNITO_BASE}/features/quizzes` },
			{ label: "Past Papers", href: `${COGNITO_BASE}/features/past-papers` },
		],
	},
	{
		title: "Resources",
		links: [
			{ label: "Blog", href: "/blog/theme/all" },
			{ label: "Help Center", href: `${COGNITO_BASE}/help` },
		],
	},
	{
		title: "Company",
		links: [
			{ label: "About Us", href: `${COGNITO_BASE}/about` },
			{ label: "Team", href: `${COGNITO_BASE}/team` },
			{ label: "Pricing", href: `${COGNITO_BASE}/pricing` },
			{ label: "Careers", href: `${COGNITO_BASE}/careers` },
			{ label: "Contact", href: `${COGNITO_BASE}/contact` },
			{ label: "Terms", href: `${COGNITO_BASE}/terms` },
			{ label: "Privacy", href: `${COGNITO_BASE}/privacy` },
			{ label: "Cookies", href: `${COGNITO_BASE}/cookies` },
		],
	},
];

const courseColumns: FooterColumn[] = [
	{
		title: "Concepts",
		links: [
			{ label: "Biology", href: `${COGNITO_BASE}/concepts/biology` },
			{ label: "Chemistry", href: `${COGNITO_BASE}/concepts/chemistry` },
			{ label: "Physics", href: `${COGNITO_BASE}/concepts/physics` },
			{ label: "Mathematics", href: `${COGNITO_BASE}/concepts/mathematics` },
			{ label: "English Language", href: `${COGNITO_BASE}/concepts/english-language` },
			{ label: "English Literature", href: `${COGNITO_BASE}/concepts/english-literature` },
			{ label: "See all >", href: `${COGNITO_BASE}/concepts` },
		],
	},
	{
		title: "A-Level",
		links: [
			{ label: "A-Level Biology", href: `${COGNITO_BASE}/a-level/biology` },
			{ label: "A-Level Chemistry", href: `${COGNITO_BASE}/a-level/chemistry` },
			{ label: "A-Level Physics", href: `${COGNITO_BASE}/a-level/physics` },
			{ label: "A-Level Mathematics", href: `${COGNITO_BASE}/a-level/mathematics` },
			{ label: "A-Level English Language", href: `${COGNITO_BASE}/a-level/english-language` },
			{ label: "A-Level English Literature", href: `${COGNITO_BASE}/a-level/english-literature` },
			{ label: "See all >", href: `${COGNITO_BASE}/a-level` },
		],
	},
	{
		title: "GCSE",
		links: [
			{ label: "GCSE Biology", href: `${COGNITO_BASE}/gcse/biology` },
			{ label: "GCSE Chemistry", href: `${COGNITO_BASE}/gcse/chemistry` },
			{ label: "GCSE Physics", href: `${COGNITO_BASE}/gcse/physics` },
			{ label: "GCSE Mathematics", href: `${COGNITO_BASE}/gcse/mathematics` },
			{ label: "GCSE English Language", href: `${COGNITO_BASE}/gcse/english-language` },
			{ label: "GCSE English Literature", href: `${COGNITO_BASE}/gcse/english-literature` },
			{ label: "See all >", href: `${COGNITO_BASE}/gcse` },
		],
	},
	{
		title: "Other Courses",
		links: [
			{ label: "KS3", href: `${COGNITO_BASE}/courses/ks3` },
			{ label: "IB", href: `${COGNITO_BASE}/courses/ib` },
			{ label: "Entrance Exams", href: `${COGNITO_BASE}/courses/entrance-exams` },
			{ label: "US Sciences", href: `${COGNITO_BASE}/courses/us-sciences` },
			{ label: "US AP", href: `${COGNITO_BASE}/courses/us-ap` },
		],
	},
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
	const isExternal = href.startsWith("http");
	const className = "font-body text-sm text-footer-text hover:text-white transition-colors";

	if (isExternal) {
		return (
			<a href={href} className={className}>
				{children}
			</a>
		);
	}

	return (
		<Link href={href} className={className}>
			{children}
		</Link>
	);
}

function ColumnGroup({ columns }: { columns: FooterColumn[] }) {
	return (
		<div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
			{columns.map((col) => (
				<div key={col.title}>
					<div className="font-body text-xs font-bold uppercase tracking-wider text-white mb-4">
						{col.title}
					</div>
					<ul className="flex flex-col gap-2.5">
						{col.links.map((link) => (
							<li key={link.label}>
								<FooterLink href={link.href}>{link.label}</FooterLink>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

export function FooterMainColumns() {
	return <ColumnGroup columns={mainColumns} />;
}

export function FooterCourseColumns() {
	return <ColumnGroup columns={courseColumns} />;
}
