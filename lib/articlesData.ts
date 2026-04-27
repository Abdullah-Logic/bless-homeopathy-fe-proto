export type Article = {
  slug: string;
  tag: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  author: string;
  imageSrc: string;
  content: string[];
};

export const articles: Article[] = [
  {
    slug: "what-is-homeopathy-and-how-it-works",
    tag: "Foundations",
    title: "What Is Homeopathy and How Does It Work?",
    description:
      "A simple overview of the homeopathic approach and why treatment focuses on the root cause.",
    date: "April 2026",
    readTime: "4 min read",
    author: "Bless Homeopathy Team",
    imageSrc: "/home/wellness1.svg",
    content: [
      "Homeopathy is a holistic healing system that uses highly diluted substances to support the body's natural healing response.",
      "At Bless Homeopathy, treatment is designed to address the root cause of symptoms instead of only short-term relief.",
      "This approach is used for children, adults, and seniors through personalized case assessment and follow-up.",
    ],
  },
  {
    slug: "how-long-homeopathic-treatment-takes",
    tag: "Treatment Timeline",
    title: "How Long Does Homeopathic Treatment Take?",
    description:
      "What to expect in acute and long-term cases, and why timelines differ from person to person.",
    date: "April 2026",
    readTime: "3 min read",
    author: "Bless Homeopathy Team",
    imageSrc: "/home/wellness2.svg",
    content: [
      "Treatment timelines vary by condition, duration, and individual response.",
      "Acute concerns can improve quickly, while deeper chronic concerns often require a more gradual and steady plan.",
      "During consultation, the practitioner sets a practical expectation and adjusts the remedy plan based on follow-up progress.",
    ],
  },
  {
    slug: "is-homeopathy-safe-for-everyone",
    tag: "Patient Safety",
    title: "Is Homeopathy Safe for Everyone?",
    description:
      "A practical safety overview for families, including children and older adults.",
    date: "April 2026",
    readTime: "3 min read",
    author: "Bless Homeopathy Team",
    imageSrc: "/home/wellness3.svg",
    content: [
      "Homeopathic care is generally considered gentle and is commonly used across age groups when guided by a qualified practitioner.",
      "Bless Homeopathy emphasizes personalized case-taking before selecting remedies.",
      "For the safest outcomes, treatment should always be discussed in the context of each patient's health history.",
    ],
  },
];
