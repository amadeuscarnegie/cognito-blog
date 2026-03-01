import type { Article, FAQ, FAQCategory, Theme, ThemeFilterSlug } from "@/types/blog";

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
		themeSlug: "study-tips",
		readingTime: 5,
		thumbnailUrl: "/assets/Thumbnail-variant-1.png",
		illustrationUrl: "/assets/thumbnails/fox.png",
		thumbnailBg: "#fef3e2",
	},
	{
		id: "2",
		title: "Understanding photosynthesis: A complete guide",
		slug: "understanding-photosynthesis",
		themeSlug: "science",
		readingTime: 7,
		thumbnailUrl: "/assets/Thumbnail-variant-2.png",
		illustrationUrl: "/assets/thumbnails/lungs.png",
		thumbnailBg: "#fce4ec",
	},
	{
		id: "3",
		title: "Top 10 revision mistakes students make",
		slug: "top-10-revision-mistakes",
		themeSlug: "study-tips",
		readingTime: 4,
		thumbnailUrl: "/assets/Thumbnail-variant-1.png",
		illustrationUrl: "/assets/thumbnails/cyan-dice.png",
		thumbnailBg: "#e0f2f1",
	},
	{
		id: "4",
		title: "How to solve quadratic equations step by step",
		slug: "solve-quadratic-equations",
		themeSlug: "maths",
		readingTime: 6,
		thumbnailUrl: "/assets/Thumbnail-variant-2.png",
		illustrationUrl: "/assets/thumbnails/disc-brake.png",
		thumbnailBg: "#fff3e0",
	},
	{
		id: "5",
		title: "Managing exam stress and anxiety",
		slug: "managing-exam-stress",
		themeSlug: "wellbeing",
		readingTime: 5,
		thumbnailUrl: "/assets/Thumbnail-variant-1.png",
		illustrationUrl: "/assets/thumbnails/labrador.png",
		thumbnailBg: "#fef9e7",
	},
	{
		id: "6",
		title: "The periodic table explained simply",
		slug: "periodic-table-explained",
		themeSlug: "science",
		readingTime: 8,
		thumbnailUrl: "/assets/Thumbnail-variant-2.png",
		illustrationUrl: "/assets/thumbnails/heart.png",
		thumbnailBg: "#fce4ec",
	},
	{
		id: "7",
		title: "Creating the perfect revision timetable",
		slug: "perfect-revision-timetable",
		themeSlug: "study-tips",
		readingTime: 4,
		thumbnailUrl: "/assets/Thumbnail-variant-1.png",
		illustrationUrl: "/assets/thumbnails/cyan-mask.png",
		thumbnailBg: "#e0f2f1",
	},
	{
		id: "8",
		title: "Trigonometry basics you need to know",
		slug: "trigonometry-basics",
		themeSlug: "maths",
		readingTime: 6,
		thumbnailUrl: "/assets/Thumbnail-variant-2.png",
	},
	{
		id: "9",
		title: "How to stay motivated during revision",
		slug: "stay-motivated-revision",
		themeSlug: "wellbeing",
		readingTime: 3,
		thumbnailUrl: "/assets/Thumbnail-variant-1.png",
	},
	{
		id: "10",
		title: "Forces and motion: Key concepts for GCSE",
		slug: "forces-motion-gcse",
		themeSlug: "science",
		readingTime: 7,
		thumbnailUrl: "/assets/Thumbnail-variant-2.png",
	},
	{
		id: "11",
		title: "Active recall: The most effective study method",
		slug: "active-recall-study-method",
		themeSlug: "study-tips",
		readingTime: 5,
		thumbnailUrl: "/assets/Thumbnail-variant-1.png",
	},
	{
		id: "12",
		title: "Algebra foundations for year 10 and 11",
		slug: "algebra-foundations",
		themeSlug: "maths",
		readingTime: 6,
		thumbnailUrl: "/assets/Thumbnail-variant-2.png",
	},
	{
		id: "13",
		title: "How to use flashcards effectively",
		slug: "flashcards-effectively",
		themeSlug: "study-tips",
		readingTime: 4,
		thumbnailUrl: "/assets/Thumbnail-variant-1.png",
	},
	{
		id: "14",
		title: "Cell biology fundamentals",
		slug: "cell-biology-fundamentals",
		themeSlug: "science",
		readingTime: 7,
		thumbnailUrl: "/assets/Thumbnail-variant-2.png",
	},
];

export function themeNameFromSlug(slug: ThemeFilterSlug): string {
	const theme = themes.find((t) => t.slug === slug);
	return theme?.name ?? slug;
}

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

export const faqCategories: FAQCategory[] = [
	{
		id: "getting-started",
		name: "Getting Started",
		questions: [
			{
				id: "gs-1",
				question: "What is Cognito?",
				answer: "Cognito is a free online learning platform designed to help GCSE and A-Level students revise more effectively with videos, quizzes and interactive content.",
			},
			{
				id: "gs-2",
				question: "Can I use Cognito for free?",
				answer: "Yes! Cognito is completely free for all students. We believe everyone deserves access to high-quality educational resources. Cognito Pro is available as an optional upgrade with additional features.",
			},
			{
				id: "gs-3",
				question: "What levels and subjects do you cover?",
				answer: "Cognito covers the main GCSE and A-Level subjects including Maths, Biology, Chemistry, Physics, English, and more. We're always adding new content and subjects.",
			},
			{
				id: "gs-4",
				question: "Is Cognito specific to my course?",
				answer: "Yes — Cognito content is mapped to specific UK exam boards (AQA, Edexcel, OCR, etc.) so you only see content relevant to your course. You can select your exam board when you sign up.",
			},
			{
				id: "gs-5",
				question: "What if I don't know which course or exam board I'm studying?",
				answer: "No worries! You can ask your teacher or check your school's website to find out which exam board you're on. You can also change your exam board selection in your account settings at any time.",
			},
			{
				id: "gs-6",
				question: "How do I use the interactive study tools?",
				answer: "Each topic has video lessons, practice questions, and flashcards. Watch the videos to learn the content, then test yourself with the questions. Your progress is tracked automatically so you can see which areas need more work.",
			},
		],
	},
	{
		id: "account",
		name: "Your Account",
		questions: [
			{
				id: "ac-1",
				question: "Do I need to create an account?",
				answer: "While you can browse some content without an account, signing up (for free!) lets you track your progress, save your quiz results, and get personalised recommendations.",
			},
			{
				id: "ac-2",
				question: "I forgot my password. How do I recover it?",
				answer: "Click 'Sign in' and then 'Forgot password'. Enter the email address you registered with and we'll send you a link to reset your password. Check your spam folder if you don't see the email within a few minutes.",
			},
			{
				id: "ac-3",
				question: "How do I reset my account progress?",
				answer: "You can reset your progress for individual topics or courses from your account settings. Go to Settings > Progress and choose what you'd like to reset. Please note this action cannot be undone.",
			},
			{
				id: "ac-4",
				question: "Can multiple students share a Cognito account?",
				answer: "Each student should have their own account so that progress tracking and recommendations work correctly. Accounts are free to create, so there's no need to share.",
			},
			{
				id: "ac-5",
				question: "Can I use Cognito on my phone?",
				answer: "Absolutely! Cognito works on any device with a web browser. Our mobile-friendly design means you can revise anywhere, anytime.",
			},
		],
	},
	{
		id: "teachers",
		name: "For Teachers & Schools",
		questions: [
			{
				id: "tc-1",
				question: "Can teachers use Cognito for their classes?",
				answer: "Yes! Many teachers use Cognito to supplement their teaching. We offer tools for setting assignments and tracking student progress across your class.",
			},
			{
				id: "tc-2",
				question: "I signed up as a teacher, but I seem to have a student account?",
				answer: "This can happen if you signed up using the student registration flow. Please contact us at hello@cognitoedu.org and we'll convert your account to a teacher account.",
			},
			{
				id: "tc-3",
				question: "Do you offer a bulk subscription for schools?",
				answer: "Yes — we offer school-wide licences that give all students and teachers access to Cognito Pro. Visit our Schools page or contact us at schools@cognitoedu.org for pricing and details.",
			},
			{
				id: "tc-4",
				question: "What teacher functionality do you offer?",
				answer: "Teachers can set assignments, track student progress, view class analytics, and identify students who may need additional support. You can also create custom playlists of content for your students.",
			},
		],
	},
	{
		id: "billing",
		name: "Billing & Subscription",
		questions: [
			{
				id: "bl-1",
				question: "How do I cancel my Pro subscription?",
				answer: "You can cancel your subscription at any time from your account settings. Go to Settings > Subscription > Cancel. Your access will continue until the end of your current billing period.",
			},
			{
				id: "bl-2",
				question: "How do I change my subscription plan?",
				answer: "Go to Settings > Subscription to view and change your current plan. You can upgrade, downgrade, or switch between monthly and annual billing at any time.",
			},
			{
				id: "bl-3",
				question: "How do I stop my subscription from renewing automatically?",
				answer: "Your subscription renews automatically by default. To stop this, go to Settings > Subscription and turn off auto-renewal. Your access will continue until the end of your current billing period.",
			},
			{
				id: "bl-4",
				question: "Can I pause my subscription?",
				answer: "We don't currently offer a pause feature, but you can cancel and re-subscribe at any time. If you're on an annual plan, you'll retain access until the end of your billing period.",
			},
			{
				id: "bl-5",
				question: "Can I pay per subject?",
				answer: "Cognito Pro gives you access to all subjects in one subscription — there's no need to pay per subject. This means you can explore and revise across all your subjects for one price.",
			},
			{
				id: "bl-6",
				question: "Do you offer a discount for multiple subscriptions or bundles?",
				answer: "For individual subscriptions, our annual plan offers the best value. For schools looking to purchase multiple licences, we offer bulk pricing — contact schools@cognitoedu.org for details.",
			},
			{
				id: "bl-7",
				question: "What is your refund policy?",
				answer: "If you're not happy with Cognito Pro, you can request a refund within 14 days of purchase. Contact us at hello@cognitoedu.org with your account email and reason for the refund.",
			},
			{
				id: "bl-8",
				question: "How can I change my subscription from monthly to annual?",
				answer: "Go to Settings > Subscription and select the annual plan. The annual plan is better value — you get 12 months for the price of 10. The change will take effect at the start of your next billing period.",
			},
		],
	},
];
