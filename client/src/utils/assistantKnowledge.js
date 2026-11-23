export const SUGGESTED_QUESTIONS = [
  "Tell me about Prashant.",
  "What are his technical skills?",
  "Tell me about his work experience.",
  "What projects has he built?",
  "How can I contact him?",
];

const FALLBACK = "I'm currently configured to answer questions about Prashant's portfolio, skills, experience, projects, and contact information. Please try one of these topics.";

const topics = [
  {
    id: "profile",
    phrases: ["tell me about prashant", "who is prashant", "tell me about yourself", "introduce prashant", "about prashant", "who are you"],
    keywords: ["prashant", "introduce", "yourself", "background", "profile"],
  },
  {
    id: "skills",
    phrases: ["technical skills", "programming languages", "what technologies", "what tech", "which languages", "what skills", "tech stack"],
    keywords: ["skills", "technologies", "technology", "programming", "languages", "tools", "stack", "know", "work"],
  },
  {
    id: "experience",
    phrases: ["work experience", "professional experience", "tell me about his work", "where has he worked", "job history", "ethara"],
    keywords: ["experience", "internship", "career", "ethara", "employer", "job", "worked", "work"],
  },
  {
    id: "projects",
    phrases: ["what projects", "projects has he built", "what has he built", "his projects", "portfolio projects", "things he built"],
    keywords: ["projects", "project", "built", "build", "apps", "application", "applications"],
  },
  {
    id: "contact",
    phrases: ["how can i contact", "contact information", "contact him", "get in touch", "reach prashant", "his email", "social links"],
    keywords: ["contact", "email", "phone", "linkedin", "github", "reach", "connect", "social"],
  },
];

function normalize(value) {
  return value
    .toLocaleLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function findTopic(question) {
  const normalized = normalize(question);
  if (!normalized) return null;

  const scores = topics.map((topic) => {
    const phraseMatch = topic.phrases.some((phrase) => normalized.includes(normalize(phrase)));
    const questionWords = new Set(normalized.split(" "));
    const keywordMatches = topic.keywords.filter((keyword) => questionWords.has(keyword)).length;
    return { topic, score: (phraseMatch ? 4 : 0) + keywordMatches };
  }).sort((left, right) => right.score - left.score);

  return scores[0].score > 0 ? scores[0].topic.id : null;
}

export function answerPortfolioQuestion(question, { profile, projects = [], skillGroups = [], journey = [] }) {
  const topic = findTopic(question);

  if (topic === "profile") {
    return "Prashant is a Software Engineer focused on full-stack development and AI/LLM evaluation. He has a Computer Science engineering background and 6 months of professional experience at Ethara.ai.";
  }

  if (topic === "skills") {
    return "Prashant's technical skills include Python, AI/LLM evaluation, SQL, JavaScript, Git, and Docker. He has also worked on generative AI assessment, instruction evaluation, and response quality analysis.";
  }

  if (topic === "experience") {
    return "Prashant has 6 months of professional experience at Ethara.ai as a Software Engineer. His work involved LLM evaluation, AI quality assessment, generative AI tasks, and instruction and safety evaluation.";
  }

  if (topic === "projects") {
    if (!projects.length) return "Project information is not available right now.";
    return `Prashant's portfolio includes:\n\n${projects.map((project) => `${project.name}\n${project.description}\nTechnologies: ${project.technologies.join(", ")}`).join("\n\n")}`;
  }

  if (topic === "contact") {
    const links = [];
    if (profile?.linkedin) links.push(`LinkedIn: ${profile.linkedin}`);
    if (profile?.phone) links.push(`Phone: ${profile.phone}`);
    return links.length ? `You can contact Prashant here:\n${links.join("\n")}` : "Contact details are not listed in the portfolio.";
  }

  return FALLBACK;
}
