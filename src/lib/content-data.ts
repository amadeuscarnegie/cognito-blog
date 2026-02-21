import type { Article, FAQ, Theme } from "@/types/blog";

export const themes: Theme[] = [
	{
		id: "1",
		name: "All articles",
		slug: "all",
		description:
			"Free revision tips, study guides and exam preparation articles for GCSE and A-Level students.",
	},
	{
		id: "2",
		name: "Study tips",
		slug: "study-tips",
		description:
			"Proven revision techniques and study strategies to help GCSE and A-Level students prepare for exams effectively.",
	},
	{
		id: "3",
		name: "Science",
		slug: "science",
		description:
			"Biology, Chemistry and Physics revision guides and explanations for GCSE and A-Level students.",
	},
	{
		id: "4",
		name: "Maths",
		slug: "maths",
		description:
			"Maths revision guides covering algebra, geometry, trigonometry and more for GCSE and A-Level exam preparation.",
	},
	{
		id: "5",
		name: "Wellbeing",
		slug: "wellbeing",
		description:
			"Mental health, motivation and wellbeing advice for UK students managing GCSE and A-Level revision stress.",
	},
];

export const articles: Article[] = [
	{
		id: "1",
		title: "How to revise effectively for your GCSEs",
		slug: "how-to-revise-effectively-gcses",
		theme: "Study tips",
		readingTime: 5,
		thumbnailUrl: "/assets/Thumbnail-variant-1.png",
		illustrationUrl: "/assets/thumbnails/fox.png",
		thumbnailBg: "#fef3e2",
	},
	{
		id: "2",
		title: "Understanding photosynthesis: A complete guide",
		slug: "understanding-photosynthesis",
		theme: "Science",
		readingTime: 7,
		thumbnailUrl: "/assets/Thumbnail-variant-2.png",
		illustrationUrl: "/assets/thumbnails/lungs.png",
		thumbnailBg: "#fce4ec",
	},
	{
		id: "3",
		title: "Top 10 revision mistakes students make",
		slug: "top-10-revision-mistakes",
		theme: "Study tips",
		readingTime: 4,
		thumbnailUrl: "/assets/Thumbnail-variant-1.png",
		illustrationUrl: "/assets/thumbnails/cyan-dice.png",
		thumbnailBg: "#e0f2f1",
	},
	{
		id: "4",
		title: "How to solve quadratic equations step by step",
		slug: "solve-quadratic-equations",
		theme: "Maths",
		readingTime: 6,
		thumbnailUrl: "/assets/Thumbnail-variant-2.png",
		illustrationUrl: "/assets/thumbnails/disc-brake.png",
		thumbnailBg: "#fff3e0",
	},
	{
		id: "5",
		title: "Managing exam stress and anxiety",
		slug: "managing-exam-stress",
		theme: "Wellbeing",
		readingTime: 5,
		thumbnailUrl: "/assets/Thumbnail-variant-1.png",
		illustrationUrl: "/assets/thumbnails/labrador.png",
		thumbnailBg: "#fef9e7",
	},
	{
		id: "6",
		title: "The periodic table explained simply",
		slug: "periodic-table-explained",
		theme: "Science",
		readingTime: 8,
		thumbnailUrl: "/assets/Thumbnail-variant-2.png",
		illustrationUrl: "/assets/thumbnails/heart.png",
		thumbnailBg: "#fce4ec",
	},
	{
		id: "7",
		title: "Creating the perfect revision timetable",
		slug: "perfect-revision-timetable",
		theme: "Study tips",
		readingTime: 4,
		thumbnailUrl: "/assets/Thumbnail-variant-1.png",
		illustrationUrl: "/assets/thumbnails/cyan-mask.png",
		thumbnailBg: "#e0f2f1",
	},
	{
		id: "8",
		title: "Trigonometry basics you need to know",
		slug: "trigonometry-basics",
		theme: "Maths",
		readingTime: 6,
		thumbnailUrl: "/assets/Thumbnail-variant-2.png",
	},
	{
		id: "9",
		title: "How to stay motivated during revision",
		slug: "stay-motivated-revision",
		theme: "Wellbeing",
		readingTime: 3,
		thumbnailUrl: "/assets/Thumbnail-variant-1.png",
	},
	{
		id: "10",
		title: "Forces and motion: Key concepts for GCSE",
		slug: "forces-motion-gcse",
		theme: "Science",
		readingTime: 7,
		thumbnailUrl: "/assets/Thumbnail-variant-2.png",
	},
	{
		id: "11",
		title: "Active recall: The most effective study method",
		slug: "active-recall-study-method",
		theme: "Study tips",
		readingTime: 5,
		thumbnailUrl: "/assets/Thumbnail-variant-1.png",
	},
	{
		id: "12",
		title: "Algebra foundations for year 10 and 11",
		slug: "algebra-foundations",
		theme: "Maths",
		readingTime: 6,
		thumbnailUrl: "/assets/Thumbnail-variant-2.png",
	},
	{
		id: "13",
		title: "How to use flashcards effectively",
		slug: "flashcards-effectively",
		theme: "Study tips",
		readingTime: 4,
		thumbnailUrl: "/assets/Thumbnail-variant-1.png",
	},
	{
		id: "14",
		title: "Cell biology fundamentals",
		slug: "cell-biology-fundamentals",
		theme: "Science",
		readingTime: 7,
		thumbnailUrl: "/assets/Thumbnail-variant-2.png",
	},
];

export const faqs: FAQ[] = [
	{
		id: "1",
		question: "What is Cognito?",
		answer:
			"Cognito is a free online learning platform designed to help GCSE and A-Level students revise more effectively with videos, quizzes and interactive content.",
	},
	{
		id: "2",
		question: "Is Cognito free to use?",
		answer:
			"Yes! Cognito is completely free for all students. We believe everyone deserves access to high-quality educational resources.",
	},
	{
		id: "3",
		question: "What subjects does Cognito cover?",
		answer:
			"Cognito covers the main GCSE and A-Level subjects including Maths, Biology, Chemistry, Physics, English, and more. We're always adding new content.",
	},
	{
		id: "4",
		question: "How does Cognito help with revision?",
		answer:
			"Cognito uses a combination of short, focused video lessons, practice questions with instant feedback, and spaced repetition to help you learn and retain information effectively.",
	},
	{
		id: "5",
		question: "Can I use Cognito on my phone?",
		answer:
			"Absolutely! Cognito works on any device with a web browser. Our mobile-friendly design means you can revise anywhere, anytime.",
	},
	{
		id: "6",
		question: "Do I need to create an account?",
		answer:
			"While you can browse some content without an account, signing up (for free!) lets you track your progress, save your quiz results, and get personalised recommendations.",
	},
	{
		id: "7",
		question: "How are the video lessons structured?",
		answer:
			"Each video lesson is typically 3-5 minutes long and focuses on a single concept. This makes it easy to fit revision into your schedule and review specific topics you need help with.",
	},
	{
		id: "8",
		question: "Can teachers use Cognito for their classes?",
		answer:
			"Yes! Many teachers use Cognito to supplement their teaching. We offer tools for setting assignments and tracking student progress across your class.",
	},
];
