type FooterColumn = {
	title: string;
	links: { label: string; href: string }[];
};

const mainColumns: FooterColumn[] = [
	{
		title: "How we help...",
		links: [
			{ label: "Schools", href: "/schools" },
			{ label: "Students", href: "/students" },
			{ label: "Teachers", href: "/teachers" },
			{ label: "Parents", href: "/parents" },
		],
	},
	{
		title: "Features",
		links: [
			{ label: "Video Lessons", href: "/features/video-lessons" },
			{ label: "Flashcards", href: "/features/flashcards" },
			{ label: "Revision Notes", href: "/features/revision-notes" },
			{ label: "Quizzes", href: "/features/quizzes" },
			{ label: "Past Papers", href: "/features/past-papers" },
		],
	},
	{
		title: "Resources",
		links: [
			{ label: "Blog", href: "/blog" },
			{ label: "Help Center", href: "/help" },
		],
	},
	{
		title: "Company",
		links: [
			{ label: "About Us", href: "/about" },
			{ label: "Team", href: "/team" },
			{ label: "Pricing", href: "/pricing" },
			{ label: "Careers", href: "/careers" },
			{ label: "Contact", href: "/contact" },
			{ label: "Terms", href: "/terms" },
			{ label: "Privacy", href: "/privacy" },
			{ label: "Cookies", href: "/cookies" },
		],
	},
];

const courseColumns: FooterColumn[] = [
	{
		title: "Concepts",
		links: [
			{ label: "Biology", href: "/concepts/biology" },
			{ label: "Chemistry", href: "/concepts/chemistry" },
			{ label: "Physics", href: "/concepts/physics" },
			{ label: "Mathematics", href: "/concepts/mathematics" },
			{ label: "English Language", href: "/concepts/english-language" },
			{ label: "English Literature", href: "/concepts/english-literature" },
			{ label: "See all >", href: "/concepts" },
		],
	},
	{
		title: "A-Level",
		links: [
			{ label: "A-Level Biology", href: "/a-level/biology" },
			{ label: "A-Level Chemistry", href: "/a-level/chemistry" },
			{ label: "A-Level Physics", href: "/a-level/physics" },
			{ label: "A-Level Mathematics", href: "/a-level/mathematics" },
			{ label: "A-Level English Language", href: "/a-level/english-language" },
			{ label: "A-Level English Literature", href: "/a-level/english-literature" },
			{ label: "See all >", href: "/a-level" },
		],
	},
	{
		title: "GCSE",
		links: [
			{ label: "GCSE Biology", href: "/gcse/biology" },
			{ label: "GCSE Chemistry", href: "/gcse/chemistry" },
			{ label: "GCSE Physics", href: "/gcse/physics" },
			{ label: "GCSE Mathematics", href: "/gcse/mathematics" },
			{ label: "GCSE English Language", href: "/gcse/english-language" },
			{ label: "GCSE English Literature", href: "/gcse/english-literature" },
			{ label: "See all >", href: "/gcse" },
		],
	},
	{
		title: "Other Courses",
		links: [
			{ label: "KS3", href: "/courses/ks3" },
			{ label: "IB", href: "/courses/ib" },
			{ label: "Entrance Exams", href: "/courses/entrance-exams" },
			{ label: "US Sciences", href: "/courses/us-sciences" },
			{ label: "US AP", href: "/courses/us-ap" },
		],
	},
];

function ColumnGroup({ columns }: { columns: FooterColumn[] }) {
	return (
		<div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
			{columns.map((col) => (
				<div key={col.title}>
					<h3 className="font-body text-xs font-bold uppercase tracking-wider text-white mb-4">
						{col.title}
					</h3>
					<ul className="flex flex-col gap-2.5">
						{col.links.map((link) => (
							<li key={link.label}>
								<a
									href={link.href}
									className="font-body text-sm text-footer-text hover:text-white transition-colors"
								>
									{link.label}
								</a>
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
