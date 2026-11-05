import React, { useState, useEffect } from "react";
import StudentSidebar from "../components/StudentSidebar";
import { useNavigate } from "react-router-dom";
import { gradeClass10MathAssignment } from "../utils/assignmentGrading";

const splitClass10Answers = (answer = "") => {
  const secondAnswerMarker = /(?:^|\n)\s*2[.)]\s*/i;
  const match = secondAnswerMarker.exec(answer);
  if (!match) {
    return [answer.replace(/^\s*1[.)]\s*/i, ""), ""];
  }

  return [
    answer.slice(0, match.index).replace(/^\s*1[.)]\s*/i, "").trim(),
    answer.slice(match.index + match[0].length).trim(),
  ];
};

export default function Assignments() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  // User and assignment states
  const [user, setUser] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState("");
  const [class10Answers, setClass10Answers] = useState(["", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // SVG Renderer identical to Dashboard
  const renderSvgIcon = (name, size = 18, stroke = "currentColor") => {
    switch (name) {
      case "dashboard":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
            <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
            <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
            <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
          </svg>
        );
      case "book-open":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        );
      case "video":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2"></rect>
          </svg>
        );
      case "clipboard":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1"></rect>
          </svg>
        );
      case "check-circle":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case "library":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        );
      case "file-text":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        );
      case "help-circle":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case "bot":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
            <circle cx="12" cy="5" r="2"></circle>
          </svg>
        );
      case "trending-up":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          </svg>
        );
      case "award":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
        );
      case "bell":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        );
      case "life-buoy":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="4"></circle>
          </svg>
        );
      case "settings":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  // Comprehensive Class-wise Assignments Mapping covering ALL subjects
  const classAssignmentsMap = {
    "6": [
      {
        id: "6-1",
        subject: "Mathematics",
        title: "Knowing Our Numbers & Factors",
        chapter: "Chapter 1 & 3: Number Systems",
        due: "Due: 15 Jul 2026",
        instructions: "Practice writing number names in Indian & International systems and find HCF and LCM.",
        questions: ["1. Write 7,892,105 in words.", "2. Find HCF of 36 and 48."],
        icon: "+-÷=",
        iconBg: "#2563eb",
      },
      {
        id: "6-2",
        subject: "Science",
        title: "Mindful Eating & Plant Diversity",
        chapter: "Chapter 2 & 3: Curiosity Textbook",
        due: "Due: 18 Jul 2026",
        instructions: "List nutrients required for a balanced diet and categorize local plant habitats.",
        questions: ["1. Name major components of food.", "2. What are the key adaptations of desert plants?"],
        icon: "🔬",
        iconBg: "#10b981",
      },
      {
        id: "6-3",
        subject: "English",
        title: "Honeysuckle Reading & Summary",
        chapter: "Unit 1: Who Did Patrick's Homework?",
        due: "Due: 20 Jul 2026",
        instructions: "Read Chapter 1 carefully and write a summary of Patrick's journey.",
        questions: ["1. Who helped Patrick?", "2. Describe the elf."],
        icon: "📖",
        iconBg: "#8b5cf6",
      },
      {
        id: "6-4",
        subject: "Hindi",
        title: "वसंत - वह चिड़िया जो अभ्यास",
        chapter: "पाठ 1: वह चिड़िया जो",
        due: "Due: 22 Jul 2026",
        instructions: "कविता के आधार पर चिड़िया के स्वभाव का वर्णन करें।",
        questions: ["1. चिड़िया के पंख किस रंग के हैं?", "2. कविता के कवि कौन हैं?"],
        icon: "🇮🇳",
        iconBg: "#e11d48",
      },
      {
        id: "6-5",
        subject: "Telugu",
        title: "అమ్మ ఒడి - భావ గ్రహణం",
        chapter: "Lesson 1: అమ్మ ఒడి",
        due: "Due: 24 Jul 2026",
        instructions: "అమ్మ ఒడి గేయం ఆధారంగా అమ్మ గొప్పతనాన్ని రాయండి.",
        questions: ["1. అమ్మ ఒడి మనకెలాంటిది?", "2. గేయ సారాంశం తెలపండి."],
        icon: "🪶",
        iconBg: "#0284c7",
      },
      {
        id: "6-6",
        subject: "Social Science",
        title: "Locating Places on Earth",
        chapter: "Theme A: Exploring Society",
        due: "Due: 26 Jul 2026",
        instructions: "Define latitudes, longitudes, and identify major global time zones.",
        questions: ["1. What is the Prime Meridian?", "2. Why do we have standard time?"],
        icon: "🌍",
        iconBg: "#D97706",
      }
    ],
    "7": [
      {
        id: "7-1",
        subject: "Mathematics",
        title: "Integers & Rational Numbers",
        chapter: "Chapter 1 & 2: Arithmetic",
        due: "Due: 15 Jul 2026",
        instructions: "Solve operations on negative integers and rational number lines.",
        questions: ["1. Evaluate: (-30) ÷ [(-5) + (-1)]", "2. Represent 3/4 on a number line."],
        icon: "+-÷=",
        iconBg: "#2563eb",
      },
      {
        id: "7-2",
        subject: "Science",
        title: "Nutrition in Organisms & Light",
        chapter: "Chapter 3 & 8: General Science",
        due: "Due: 18 Jul 2026",
        instructions: "Describe autotrophic nutrition and reflection principles of spherical mirrors.",
        questions: ["1. Define photosynthesis.", "2. State laws of reflection."],
        icon: "🔬",
        iconBg: "#10b981",
      },
      {
        id: "7-3",
        subject: "English",
        title: "Town Mouse & Country Mouse",
        chapter: "Unit 1: Our World Through English",
        due: "Due: 20 Jul 2026",
        instructions: "Compare rural and urban life based on the story.",
        questions: ["1. Why did the town mouse visit the country mouse?", "2. What did they eat?"],
        icon: "📖",
        iconBg: "#8b5cf6",
      },
      {
        id: "7-4",
        subject: "Hindi",
        title: "लहर-2 - ज्ञान हम को दीजिए",
        chapter: "पाठ 1: ज्ञान हम को दीजिए",
        due: "Due: 22 Jul 2026",
        instructions: "कविता के माध्यम से ज्ञान प्राप्ति के महत्व को लिखिए।",
        questions: ["1. हम ईश्वर से क्या प्रार्थना करते हैं?", "2. ज्ञान का हमारे जीवन में क्या स्थान है?"],
        icon: "🇮🇳",
        iconBg: "#e11d48",
      },
      {
        id: "7-5",
        subject: "Telugu",
        title: "అక్షరం పాఠ్యభాగ విశేషాలు",
        chapter: "Lesson 1: అక్షరం",
        due: "Due: 24 Jul 2026",
        instructions: "విద్య మరియు అక్షర జ్ఞానం యొక్క గొప్పతనాన్ని రాయండి.",
        questions: ["1. అక్షరం మనకు ఏ విధంగా మార్గదర్శకం?", "2. చదువు ప్రాముఖ్యత ఏమిటి?"],
        icon: "🪶",
        iconBg: "#0284c7",
      },
      {
        id: "7-6",
        subject: "Social Science",
        title: "The Universe and Kakatiyas",
        chapter: "Semester 1: Geography & History",
        due: "Due: 26 Jul 2026",
        instructions: "Summarize the architectural achievements of the Kakatiya dynasty.",
        questions: ["1. Name major structures built by Kakatiyas.", "2. What are inner layers of the Earth?"],
        icon: "🌍",
        iconBg: "#D97706",
      }
    ],
    "8": [
      {
        id: "8-1",
        subject: "Mathematics",
        title: "Rational Numbers & Linear Equations",
        chapter: "Chapter 1 & 2: Algebra",
        due: "Due: 15 Jul 2026",
        instructions: "Solve algebraic equations and apply rational number properties.",
        questions: ["1. Solve: 2x - 3 = x + 2", "2. Find 3 rational numbers between 1/4 and 1/2."],
        icon: "+-÷=",
        iconBg: "#2563eb",
      },
      {
        id: "8-2",
        subject: "Physical Science",
        title: "Force, Pressure and Friction",
        chapter: "Chapter 1 & 2: Physics",
        due: "Due: 18 Jul 2026",
        instructions: "Explain contact forces, atmospheric pressure, and friction reduction methods.",
        questions: ["1. Why is friction necessary?", "2. Explain atmospheric pressure."],
        icon: "⚗️",
        iconBg: "#059669",
      },
      {
        id: "8-3",
        subject: "Biology",
        title: "Cell Structure and Microorganisms",
        chapter: "Chapter 1 & 2: Biological Science",
        due: "Due: 20 Jul 2026",
        instructions: "Differentiate plant and animal cells with labeled diagrams.",
        questions: ["1. State two differences between plant and animal cells.", "2. Name useful microorganisms."],
        icon: "🧬",
        iconBg: "#10B981",
      },
      {
        id: "8-4",
        subject: "English",
        title: "Honeydew - The Best Christmas Present",
        chapter: "Unit 1: Honeydew Reader",
        due: "Due: 22 Jul 2026",
        instructions: "Write a character sketch of Jim Macpherson.",
        questions: ["1. What did Jim write in his letter?", "2. What is the historic event mentioned?"],
        icon: "📖",
        iconBg: "#8b5cf6",
      },
      {
        id: "8-5",
        subject: "Hindi",
        title: "वसंत - हम होंगे कामयाब",
        chapter: "पाठ 1: हम होंगे कामयाब",
        due: "Due: 24 Jul 2026",
        instructions: "गीत का केंद्रीय भाव अपने शब्दों में लिखिए।",
        questions: ["1. हम किस बात में कामयाब होंगे?", "2. मन में विश्वास होना क्यों जरूरी है?"],
        icon: "🇮🇳",
        iconBg: "#e11d48",
      },
      {
        id: "8-6",
        subject: "Telugu",
        title: "ఆంధ్ర వైభవం విశేషాలు",
        chapter: "Lesson 1: ఆంధ్ర వైభవం",
        due: "Due: 25 Jul 2026",
        instructions: "ఆంధ్రప్రదేశ్ సాంస్కృతిక విశేషాలను తెలపండి.",
        questions: ["1. ఆంధ్ర వైభవం గేయ సారాంశం రాయండి.", "2. రాష్ట్ర ప్రముఖులు ఎవరు?"],
        icon: "🪶",
        iconBg: "#0284c7",
      },
      {
        id: "8-7",
        subject: "History",
        title: "How, When and Where",
        chapter: "History Chapter 1",
        due: "Due: 26 Jul 2026",
        instructions: "Explain how historians periodized Indian history under British rule.",
        questions: ["1. Why did British preserve official documents?", "2. What are limitations of official records?"],
        icon: "🏛️",
        iconBg: "#D97706",
      },
      {
        id: "8-8",
        subject: "Geography",
        title: "Resources and Development",
        chapter: "Geography Chapter 1",
        due: "Due: 27 Jul 2026",
        instructions: "Classify resources based on origin, exhaustibility, and ownership.",
        questions: ["1. What is sustainable development?", "2. Differentiate biotic and abiotic resources."],
        icon: "🌍",
        iconBg: "#0D9488",
      },
      {
        id: "8-9",
        subject: "Civics",
        title: "The Indian Constitution",
        chapter: "Civics Chapter 1",
        due: "Due: 28 Jul 2026",
        instructions: "Why does a democratic country need a constitution?",
        questions: ["1. Define key features of Indian Constitution.", "2. What are Fundamental Rights?"],
        icon: "⚖️",
        iconBg: "#4F46E5",
      }
    ],
    "9": [
      {
        id: "9-1",
        subject: "Mathematics",
        title: "Number Systems & Polynomials",
        chapter: "Chapter 1 & 2: Algebra",
        due: "Due: 15 Jul 2026",
        instructions: "Rationalize denominators and evaluate polynomial identities.",
        questions: ["1. Simplify: 1 / (√7 + √2)", "2. Factorize: x³ - 23x² + 142x - 120"],
        icon: "+-÷=",
        iconBg: "#2563eb",
      },
      {
        id: "9-2",
        subject: "Physical Science",
        title: "Matter and Atomic Structure",
        chapter: "Chapter 1 & 4: Physics & Chemistry",
        due: "Due: 18 Jul 2026",
        instructions: "Explain states of matter and Bohr's atomic model.",
        questions: ["1. State factors affecting evaporation.", "2. Write electronic configuration of Sodium (Na=11)."],
        icon: "⚗️",
        iconBg: "#059669",
      },
      {
        id: "9-3",
        subject: "Biology",
        title: "The Fundamental Unit of Life",
        chapter: "Chapter 10: Cell Biology",
        due: "Due: 20 Jul 2026",
        instructions: "Describe the function of mitochondria and chloroplasts.",
        questions: ["1. Why is mitochondria called the powerhouse of the cell?", "2. Draw a neat diagram of an animal cell."],
        icon: "🧬",
        iconBg: "#10B981",
      },
      {
        id: "9-4",
        subject: "English",
        title: "Beehive - The Fun They Had",
        chapter: "Unit 1: Beehive Reader",
        due: "Due: 22 Jul 2026",
        instructions: "Compare futuristic schools in the story with your own school.",
        questions: ["1. What did Margie write in her diary?", "2. Why did Margie hate school?"],
        icon: "📖",
        iconBg: "#8b5cf6",
      },
      {
        id: "9-5",
        subject: "Hindi",
        title: "हिन्दी वल्लरी - जिस देश में गंगा बहती है",
        chapter: "पाठ 1: जिस देश में गंगा बहती है",
        due: "Due: 24 Jul 2026",
        instructions: "कविता के आधार पर देश की महिमा का वर्णन करें।",
        questions: ["1. भारतवासियों की क्या विशेषता है?", "2. कविता का केंद्रीय भाव लिखिए।"],
        icon: "🇮🇳",
        iconBg: "#e11d48",
      },
      {
        id: "9-6",
        subject: "Telugu",
        title: "ధర్మబోధ - పద్య భావం",
        chapter: "Lesson 1: ధర్మబోధ",
        due: "Due: 25 Jul 2026",
        instructions: "ధర్మబోధ పాఠంలోని పద్యాల భావాన్ని సొంత మాటలలో రాయండి.",
        questions: ["1. ధర్మం అంటే ఏమిటి?", "2. పద్య సారాంశం తెలపండి."],
        icon: "🪶",
        iconBg: "#0284c7",
      },
      {
        id: "9-7",
        subject: "History",
        title: "The French Revolution",
        chapter: "History Chapter 1",
        due: "Due: 26 Jul 2026",
        instructions: "Explain the causes of the outbreak of the French Revolution in 1789.",
        questions: ["1. Describe role of philosophers in French Revolution.", "2. What was the significance of Storming of Bastille?"],
        icon: "🏛️",
        iconBg: "#D97706",
      },
      {
        id: "9-8",
        subject: "Geography",
        title: "India – Size and Location",
        chapter: "Geography Chapter 1",
        due: "Due: 27 Jul 2026",
        instructions: "Describe India's latitudinal and longitudinal extent and its strategic location.",
        questions: ["1. What is the standard meridian of India?", "2. Why is Indian Ocean location important?"],
        icon: "🌍",
        iconBg: "#0D9488",
      },
      {
        id: "9-9",
        subject: "Civics",
        title: "What is Democracy? Why Democracy?",
        chapter: "Civics Chapter 1",
        due: "Due: 28 Jul 2026",
        instructions: "List features of a democratic government and arguments against democracy.",
        questions: ["1. Define democracy in simple terms.", "2. Give arguments for democracy."],
        icon: "⚖️",
        iconBg: "#4F46E5",
      },
      {
        id: "9-10",
        subject: "Economics",
        title: "The Story of Village Palampur",
        chapter: "Economics Chapter 1",
        due: "Due: 29 Jul 2026",
        instructions: "Explain farming and non-farming activities in Village Palampur.",
        questions: ["1. What are factors of production?", "2. How is electricity transformed Palampur farming?"],
        icon: "📈",
        iconBg: "#EA580C",
      }
    ],
    "10": [
      {
        id: "10-1",
        subject: "Mathematics",
        title: "Real Numbers & Trigonometry",
        chapter: "Chapter 1 & 8: Board Exam Prep",
        due: "Due: 15 Jul 2026",
        instructions: "Solve proofs of irrationality and evaluate trigonometric identities.",
        questions: ["1. Prove that √3 is irrational.", "2. Evaluate: sin 30° cos 60° + cos 30° sin 60°"],
        icon: "+-÷=",
        iconBg: "#2563eb",
      },
      {
        id: "10-2",
        subject: "Physical Science",
        title: "Chemical Reactions & Light Refraction",
        chapter: "Chapter 1 & 5: Physics & Chemistry",
        due: "Due: 18 Jul 2026",
        instructions: "Balance chemical equations and solve spherical mirror/lens formulas.",
        questions: ["1. Balance: BaCl₂ + Al₂(SO₄)₃ → AlCl₃ + BaSO₄", "2. Find focal length of a concave lens with power -2D."],
        icon: "⚗️",
        iconBg: "#059669",
      },
      {
        id: "10-3",
        subject: "Biology",
        title: "Life Processes & Heredity",
        chapter: "Chapter 1 & 4: Biological Science",
        due: "Due: 20 Jul 2026",
        instructions: "Explain human digestive system and Mendel's dihybrid crosses.",
        questions: ["1. Draw and label human nephron structure.", "2. State Mendel's law of independent assortment."],
        icon: "🧬",
        iconBg: "#10B981",
      },
      {
        id: "10-4",
        subject: "English",
        title: "First Flight - A Letter to God",
        chapter: "Unit 1: First Flight Reader",
        due: "Due: 22 Jul 2026",
        instructions: "Write character sketch of Lencho and analyze his immense faith.",
        questions: ["1. Why did Lencho write a letter to God?", "2. Who received the letter and what did they do?"],
        icon: "📖",
        iconBg: "#8b5cf6",
      },
      {
        id: "10-5",
        subject: "Hindi",
        title: "स्पर्श - बरसते बदल अभ्यास",
        chapter: "पाठ 1: बरसते बदल",
        due: "Due: 24 Jul 2026",
        instructions: "सुमित्रानंदन पंत की कविता 'बरसते बदल' का सारांश लिखिए।",
        questions: ["1. वर्षा ऋतु का प्रकृति पर क्या प्रभाव पड़ता है?", "2. बादलों के आने से आकाश का दृश्य कैसा होता है?"],
        icon: "🇮🇳",
        iconBg: "#e11d48",
      },
      {
        id: "10-6",
        subject: "Telugu",
        title: "మాతృభావన - సమగ్ర విశ్లేషణ",
        chapter: "Lesson 1: మాతృభావన",
        due: "Due: 25 Jul 2026",
        instructions: "మాతృభావన పాఠం ఆధారంగా శివుని గొప్పతనాన్ని వివరించండి.",
        questions: ["1. శివుడు అప్పాజీని ఏమని ఆదేశించాడు?", "2. స్త్రీల పట్ల మన వైఖరి ఎలా ఉండాలి?"],
        icon: "🪶",
        iconBg: "#0284c7",
      },
      {
        id: "10-7",
        subject: "History",
        title: "The Rise of Nationalism in Europe",
        chapter: "History Chapter 1",
        due: "Due: 26 Jul 2026",
        instructions: "Discuss the process of unification of Italy and Germany.",
        questions: ["1. Who played key role in unification of Germany?", "2. What was Treaty of Vienna of 1815?"],
        icon: "🏛️",
        iconBg: "#D97706",
      },
      {
        id: "10-8",
        subject: "Geography",
        title: "Resources and Development",
        chapter: "Geography Chapter 1",
        due: "Due: 27 Jul 2026",
        instructions: "Explain resource planning in India and soil erosion types.",
        questions: ["1. What is resource planning?", "2. Differentiate sheet erosion and gully erosion."],
        icon: "🌍",
        iconBg: "#0D9488",
      },
      {
        id: "10-9",
        subject: "Civics",
        title: "Power Sharing and Federalism",
        chapter: "Civics Chapter 1 & 2",
        due: "Due: 28 Jul 2026",
        instructions: "Compare power-sharing arrangements in Belgium and Sri Lanka.",
        questions: ["1. Why is power sharing desirable?", "2. What makes India a federal country?"],
        icon: "⚖️",
        iconBg: "#4F46E5",
      },
      {
        id: "10-10",
        subject: "Economics",
        title: "Development & Sectors of Economy",
        chapter: "Economics Chapter 1 & 2",
        due: "Due: 29 Jul 2026",
        instructions: "Compare national development goals and primary, secondary, and tertiary sectors.",
        questions: ["1. Why is per capita income calculated in USD?", "2. Why is tertiary sector growing rapidly in India?"],
        icon: "📈",
        iconBg: "#EA580C",
      }
    ]
  };

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const rawUser = localStorage.getItem("current_user");
    if (!rawUser) {
      navigate("/student-login");
      return;
    }
    try {
      const parsed = JSON.parse(rawUser);
      const currentClass = String(parsed.class || "10");
      const savedStatuses = parsed.assignmentStatuses || {};
      const savedGrade = parsed.assignmentGrades?.["10-1"];
      const shouldReopenOldMathSubmission =
        currentClass === "10" &&
        savedStatuses["10-1"] === "Submitted" &&
        savedGrade?.autoGraded !== true;
      const loadedUser = shouldReopenOldMathSubmission
        ? {
            ...parsed,
            assignmentStatuses: {
              ...savedStatuses,
              "10-1": "Pending",
            },
          }
        : parsed;

      if (shouldReopenOldMathSubmission) {
        localStorage.setItem("current_user", JSON.stringify(loadedUser));
        const allStudents = JSON.parse(localStorage.getItem("all_students") || "[]");
        if (Array.isArray(allStudents)) {
          localStorage.setItem(
            "all_students",
            JSON.stringify(allStudents.map((student) =>
              student.id === loadedUser.id ? loadedUser : student
            ))
          );
        }
      }

      setUser(loadedUser);
      const classSpecificAssignments = classAssignmentsMap[currentClass] || classAssignmentsMap["10"];

      const mergedList = classSpecificAssignments.map((item) => {
        const userStatus = loadedUser.assignmentStatuses?.[item.id] || "Pending";
        const grade = loadedUser.assignmentGrades?.[item.id] || null;
        return {
          ...item,
          status: userStatus,
          statusColor: grade ? "#1d4ed8" : userStatus === "Submitted" ? "#15803d" : "#d97706",
          statusBg: grade ? "#dbeafe" : userStatus === "Submitted" ? "#dcfce7" : "#fef3c7",
          submittedOn: loadedUser.assignmentSubmissionDates?.[item.id] || null,
          userAnswer: loadedUser.assignmentAnswers?.[item.id] || "",
          attempt: loadedUser.assignmentAttempts?.[item.id] || null,
          grade,
        };
      });
      setAssignments(mergedList);
    } catch {
      navigate("/student-login");
    }
  }, [navigate]);

  if (!user) return null;

  const studentName = user.name || "Student";
  const studentClass = String(user.class || "10");

  const pendingCount = assignments.filter((a) => a.status === "Pending").length;
  const submittedCount = assignments.filter((a) => a.status === "Submitted").length;
  const overdueCount = assignments.filter((a) => a.status === "Overdue").length;
  const assignmentMarks = Object.values(user.assignmentGrades || {}).reduce(
    (total, grade) => total + (Number.isFinite(grade?.score) ? grade.score : 0),
    0
  );
  const assignmentMaxMarks = Object.values(user.assignmentGrades || {}).reduce(
    (total, grade) => total + (Number.isFinite(grade?.maxScore) ? grade.maxScore : 0),
    0
  );

  const filtered = assignments.filter((item) => {
    if (filter === "All") return true;
    return item.status.toLowerCase() === filter.toLowerCase();
  });

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    localStorage.removeItem("studentLoggedIn");
    navigate("/student-login");
  };

  const handleSubmitAssignment = (assignmentId) => {
    const isAutoGraded = assignmentId === "10-1";
    const answers = isAutoGraded ? class10Answers.map((answer) => answer.trim()) : [];
    if (isAutoGraded ? answers.some((answer) => !answer) : !submissionText.trim()) {
      alert(isAutoGraded
        ? "Please answer both questions before submitting."
        : "Please enter your answer or notes before submitting.");
      return;
    }

    const answerToSave = isAutoGraded
      ? `1. ${answers[0]}\n2. ${answers[1]}`
      : submissionText.trim();
    const gradingResult = isAutoGraded ? gradeClass10MathAssignment(answers) : null;
    setIsSubmitting(true);

    setTimeout(() => {
      const updatedAnswers = {
        ...(user.assignmentAnswers || {}),
        [assignmentId]: answerToSave,
      };

      if (isAutoGraded && !gradingResult.passed) {
        const attempt = {
          score: gradingResult.score,
          maxScore: gradingResult.maxScore,
          questionResults: gradingResult.questionResults,
          attemptedOn: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        };
        const updatedAttempts = {
          ...(user.assignmentAttempts || {}),
          [assignmentId]: attempt,
        };
        const updatedUser = {
          ...user,
          assignmentAnswers: updatedAnswers,
          assignmentAttempts: updatedAttempts,
        };

        setUser(updatedUser);
        localStorage.setItem("current_user", JSON.stringify(updatedUser));
        const allStudents = JSON.parse(localStorage.getItem("all_students") || "[]");
        if (Array.isArray(allStudents)) {
          localStorage.setItem(
            "all_students",
            JSON.stringify(allStudents.map((student) =>
              student.id === user.id ? updatedUser : student
            ))
          );
        }
        setAssignments((previous) => previous.map((assignment) =>
          assignment.id === assignmentId
            ? { ...assignment, userAnswer: answerToSave, attempt }
            : assignment
        ));
        setSelectedAssignment((previous) =>
          previous ? { ...previous, userAnswer: answerToSave, attempt } : previous
        );
        setIsSubmitting(false);
        return;
      }

      const updatedStatuses = {
        ...(user.assignmentStatuses || {}),
        [assignmentId]: "Submitted"
      };
      const updatedGrades = isAutoGraded
        ? {
            ...(user.assignmentGrades || {}),
            [assignmentId]: {
              score: gradingResult.score,
              maxScore: gradingResult.maxScore,
              feedback: "All answers are correct.",
              gradedAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
              autoGraded: true,
            },
          }
        : user.assignmentGrades || {};
      const updatedAttempts = { ...(user.assignmentAttempts || {}) };
      delete updatedAttempts[assignmentId];
      const updatedAssignmentMarks = Object.values(updatedGrades).reduce(
        (total, grade) => total + (Number.isFinite(grade?.score) ? grade.score : 0),
        0
      );

      const updatedDates = {
        ...(user.assignmentSubmissionDates || {}),
        [assignmentId]: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
      };
      const updatedDetails = {
        ...(user.assignmentSubmissionDetails || {}),
        [assignmentId]: {
          title: selectedAssignment.title,
          subject: selectedAssignment.subject,
        },
      };

      const newlySubmittedCount = Object.values(updatedStatuses).filter((s) => s === "Submitted").length;

      const updatedUser = {
        ...user,
        assignmentStatuses: updatedStatuses,
        assignmentAnswers: updatedAnswers,
        assignmentSubmissionDates: updatedDates,
        assignmentSubmissionDetails: updatedDetails,
        assignmentGrades: updatedGrades,
        assignmentAttempts: updatedAttempts,
        assignmentScoreTotal: updatedAssignmentMarks,
        assignmentsCompleted: `${newlySubmittedCount}/${assignments.length}`,
        overallProgress: Math.min(100, (user.overallProgress || 0) + (isAutoGraded ? 10 : 0)),
        recentActivities: [
          {
            id: `act-assign-${Date.now()}`,
            type: "Assignment",
            title: `Submitted: ${selectedAssignment.title}`,
            time: "Just now",
            icon: "📑",
            color: "#16A34A",
            matter: {
              heading: `${selectedAssignment.subject} Assignment`,
              summary: isAutoGraded
                ? `You answered ${selectedAssignment.title} correctly.`
                : `You submitted ${selectedAssignment.title}. Teacher will review shortly.`,
              score: isAutoGraded
                ? `Score: ${gradingResult.score}/${gradingResult.maxScore} marks`
                : "Status: Submitted (Pending Review)",
              actionPath: "/assignments",
              actionText: "View Submissions"
            }
          },
          ...(user.recentActivities || [])
        ]
      };

      setUser(updatedUser);
      localStorage.setItem("current_user", JSON.stringify(updatedUser));

      const allStudents = JSON.parse(localStorage.getItem("all_students") || "[]");
      const updatedAll = allStudents.map((s) => (s.id === user.id ? updatedUser : s));
      localStorage.setItem("all_students", JSON.stringify(updatedAll));

      setAssignments((prev) =>
        prev.map((a) =>
          a.id === assignmentId
            ? {
                ...a,
                status: "Submitted",
                statusColor: "#15803d",
                statusBg: "#dcfce7",
                submittedOn: updatedDates[assignmentId],
                userAnswer: answerToSave,
                attempt: null,
                grade: updatedGrades[assignmentId] || null,
              }
            : a
        )
      );

      setIsSubmitting(false);
      setSelectedAssignment(null);
      setSubmissionText("");
      setClass10Answers(["", ""]);
    }, 500);
  };

  return (
    <div className="as-container">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .as-container { display: flex; min-height: 100vh; background: #f8fafc; color: #0f172a; width: 100%; }
        
        /* SIDEBAR SYNCHRONIZED */
        .as-sidebar { width: 240px; background: #081B38; color: #94A3B8; display: flex; flex-direction: column; flex-shrink: 0; padding: 22px 14px; position: fixed; top: 0; bottom: 0; left: 0; z-index: 120; }
        .as-brand { display: flex; align-items: center; gap: 12px; padding: 0 0 18px 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); margin-bottom: 18px; }
        .as-brand-icon { width: 38px; height: 38px; background: #1E60F8; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; }
        .as-brand h3 { font-size: 15px; font-weight: 700; color: #fff; }
        .as-brand span { font-size: 12px; color: #60A5FA; display: block; }
        .as-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; overflow-y: auto; }
        .as-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; color: #94A3B8; text-decoration: none; border-radius: 9px; font-size: 13px; font-weight: 500; transition: all 0.15s; border: none; background: transparent; cursor: pointer; width: 100%; text-align: left; }
        .as-link:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .as-link.active { background: #1E60F8; color: #fff; font-weight: 600; box-shadow: 0 4px 12px rgba(30,96,248,0.3); }
        .as-logout { margin-top: auto; color: #ef4444 !important; }

        /* MAIN CONTENT */
        .as-main { flex: 1; margin-left: 250px; display: flex; flex-direction: column; min-width: 0; padding-bottom: 50px; }
        .as-header { height: 64px; background: #fff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; position: sticky; top: 0; z-index: 100; }
        .as-header-title h2 { font-size: 15.5px; font-weight: 700; color: #0f172a; }
        .as-header-title p { font-size: 11.5px; color: #64748b; }
        .as-header-right { display: flex; align-items: center; gap: 20px; }
        .as-notif-btn { position: relative; width: 36px; height: 36px; border-radius: 50%; border: 1px solid #e2e8f0; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .as-notif-badge { position: absolute; top: -3px; right: -3px; background: #ef4444; color: #fff; border-radius: 50%; width: 16px; height: 16px; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
        .as-user-badge { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .as-avatar { width: 38px; height: 38px; border-radius: 50%; background: #fed7aa; display: flex; align-items: center; justify-content: center; font-size: 18px; }

        /* BODY */
        .as-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; max-width: 1200px; margin: 0 auto; width: 100%; }

        /* HERO CARD */
        .as-hero { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; }
        .as-hero-left { display: flex; align-items: center; gap: 16px; }
        .as-hero-icon { width: 48px; height: 48px; border-radius: 12px; background: #2563eb; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .as-hero-left h1 { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 3px; }
        .as-hero-left p { font-size: 13px; color: #64748b; }
        .as-hero-stat { display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px 18px; }
        .as-hero-stat small { display: block; font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: 700; }
        .as-hero-stat strong { font-size: 16px; font-weight: 800; color: #0f172a; }

        /* DYNAMIC FILTERS */
        .as-filters { display: flex; gap: 12px; flex-wrap: wrap; }
        .as-filter-pill { display: flex; align-items: center; gap: 8px; padding: 9px 22px; border-radius: 10px; font-size: 13px; font-weight: 600; border: 1px solid #e2e8f0; background: #fff; color: #475569; cursor: pointer; transition: all 0.15s; }
        .as-filter-pill.active { background: #2563eb; color: #fff; border-color: #2563eb; box-shadow: 0 4px 12px rgba(37,99,235,0.25); }
        .as-count-badge { padding: 2px 8px; border-radius: 99px; font-size: 11px; font-weight: 700; }

        /* LIST */
        .as-list { display: flex; flex-direction: column; gap: 14px; }
        .as-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: transform 0.15s; }
        .as-card:hover { transform: translateY(-1px); border-color: #cbd5e1; }
        .as-card-left { display: flex; align-items: center; gap: 16px; }
        .as-subject-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 16px; font-weight: 700; flex-shrink: 0; }
        .as-card-meta h4 { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 2px; }
        .as-card-meta h3 { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 3px; }
        .as-card-meta p { font-size: 12px; color: #64748b; margin-bottom: 6px; }
        .as-due-tag { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; color: #64748b; font-weight: 500; }
        .as-card-right { display: flex; flex-direction: column; align-items: flex-end; gap: 14px; }
        .as-badge { font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 6px; }
        .as-details-btn { background: #2563eb; color: #fff; border: none; padding: 8px 18px; border-radius: 8px; font-size: 12.5px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.15s; }
        .as-details-btn:hover { background: #1d4ed8; }

        /* MODAL */
        .as-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .as-modal-box { background: #FFFFFF; border-radius: 16px; width: 100%; max-width: 620px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2); }
        .as-modal-head { padding: 18px 24px; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; }
        .as-modal-body { padding: 22px 24px; max-height: 520px; overflow-y: auto; display: flex; flex-direction: column; gap: 14px; }
        .as-textarea { width: 100%; height: 110px; border-radius: 8px; border: 1px solid #CBD5E1; padding: 10px; font-size: 12.5px; outline: none; font-family: inherit; resize: vertical; }

        @media (max-width: 1024px) {
          .as-sidebar { display: none; }
          .as-main { margin-left: 0; }
        }
      `}</style>

      {/* SIDEBAR NAVIGATION */}
      <StudentSidebar onLogout={handleLogout} />

      {/* MAIN CONTAINER */}
      <main className="as-main">
        <header className="as-header">
          <div className="as-header-title">
            <h2>Digital Learning Platform</h2>
            <p>Online Learning Portal for Students</p>
          </div>
          <div className="as-header-right">
            <button className="as-notif-btn" onClick={() => navigate("/announcements")} title="View Announcements">
              {renderSvgIcon("bell", 20, "#475569")}
              <div className="as-notif-badge">3</div>
            </button>
            <div className="as-user-badge" onClick={() => navigate("/settings")}>
              <div className="as-avatar">👨‍🎓</div>
              <div>
                <strong style={{ fontSize: 13, display: "block" }}>{studentName}</strong>
                <span style={{ fontSize: 11, color: "#64748b" }}>Class {studentClass}th</span>
              </div>
            </div>
          </div>
        </header>

        <div className="as-body">
          {/* Top Banner */}
          <div className="as-hero">
            <div className="as-hero-left">
              <div className="as-hero-icon">📋</div>
              <div>
                <h1>Assignments (Class {studentClass})</h1>
                <p>Complete your Class {studentClass} homework, submit assignments and get teacher remarks.</p>
              </div>
            </div>
            <div className="as-hero-stat">
              <span style={{ fontSize: 22 }}>📅</span>
              <div>
                <small>Total Assignments</small>
                <strong>{assignments.length} Assigned</strong>
              </div>
              <div>
                <small>Marks Earned</small>
                <strong>{assignmentMarks}/{assignmentMaxMarks}</strong>
              </div>
              <span style={{ fontSize: 24, marginLeft: 6 }}>📝</span>
            </div>
          </div>

          {/* Dynamic Filter Pills */}
          <div className="as-filters">
            <button className={`as-filter-pill ${filter === "All" ? "active" : ""}`} onClick={() => setFilter("All")}>
              All ({assignments.length})
            </button>
            <button className={`as-filter-pill ${filter === "Pending" ? "active" : ""}`} onClick={() => setFilter("Pending")}>
              Pending <span className="as-count-badge" style={{ background: "#f59e0b", color: "#fff" }}>{pendingCount}</span>
            </button>
            <button className={`as-filter-pill ${filter === "Submitted" ? "active" : ""}`} onClick={() => setFilter("Submitted")}>
              Submitted <span className="as-count-badge" style={{ background: "#10b981", color: "#fff" }}>{submittedCount}</span>
            </button>
            <button className={`as-filter-pill ${filter === "Overdue" ? "active" : ""}`} onClick={() => setFilter("Overdue")}>
              Overdue <span className="as-count-badge" style={{ background: "#ef4444", color: "#fff" }}>{overdueCount}</span>
            </button>
          </div>

          {/* Assignments Cards List */}
          <div className="as-list">
            {filtered.map((item) => (
              <div className="as-card" key={item.id}>
                <div className="as-card-left">
                  <div className="as-subject-icon" style={{ background: item.iconBg }}>
                    {item.icon}
                  </div>
                  <div className="as-card-meta">
                    <h4>{item.subject}</h4>
                    <h3>{item.title}</h3>
                    <p>{item.chapter}</p>
                    <span className="as-due-tag">📅 {item.due}</span>
                  </div>
                </div>

                <div className="as-card-right">
                  <span className="as-badge" style={{ background: item.statusBg, color: item.statusColor }}>
                    {item.status}
                  </span>
                  {Number.isFinite(item.grade?.score) && (
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#1D4ED8" }}>
                      Marks: {item.grade.score}/{item.grade.maxScore}
                    </span>
                  )}
                  <button
                    className="as-details-btn"
                    onClick={() => {
                      setSelectedAssignment(item);
                      setSubmissionText(item.id === "10-1" ? "" : item.userAnswer || "");
                      setClass10Answers(
                        item.id === "10-1" && item.attempt
                          ? splitClass10Answers(item.userAnswer)
                          : ["", ""]
                      );
                    }}
                  >
                    View Details ›
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ASSIGNMENT DETAILS & SUBMISSION MODAL */}
      {selectedAssignment && (
        <div className="as-modal-overlay" onClick={() => setSelectedAssignment(null)}>
          <div className="as-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="as-modal-head">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: selectedAssignment.iconBg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                  {selectedAssignment.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>{selectedAssignment.title}</h3>
                  <span style={{ fontSize: 11, color: "#64748B" }}>{selectedAssignment.subject} • {selectedAssignment.chapter}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedAssignment(null)}
                style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#64748B" }}
              >
                ✕
              </button>
            </div>

            <div className="as-modal-body">
              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "12px 14px", borderRadius: 10 }}>
                <strong style={{ fontSize: 12, color: "#0F172A", display: "block", marginBottom: 4 }}>Instructions:</strong>
                <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.5 }}>{selectedAssignment.instructions}</p>
              </div>

              <div>
                <strong style={{ fontSize: 12, color: "#334155", display: "block", marginBottom: 6 }}>Assignment Questions:</strong>
                {selectedAssignment.questions.map((q, idx) => (
                  <p key={idx} style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>{q}</p>
                ))}
              </div>

              {selectedAssignment.status === "Submitted" ? (
                <div style={{ background: "#DCFCE7", border: "1px solid #86EFAC", padding: "12px 14px", borderRadius: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#15803D", display: "block", marginBottom: 4 }}>
                    ✓ Assignment Submitted on {selectedAssignment.submittedOn || "Recently"}
                  </span>
                  <p style={{ fontSize: 11.5, color: "#166534" }}>
                    Your submission: "{selectedAssignment.userAnswer}"
                  </p>
                  {selectedAssignment.grade && (
                    <div style={{ borderTop: "1px solid #86EFAC", marginTop: 8, paddingTop: 8 }}>
                      <strong style={{ fontSize: 12, color: "#1D4ED8" }}>
                        {Number.isFinite(selectedAssignment.grade.score)
                          ? `Marks: ${selectedAssignment.grade.score}/${selectedAssignment.grade.maxScore}`
                          : `Teacher feedback: ${selectedAssignment.grade.feedback}`}
                      </strong>
                      {selectedAssignment.grade.feedback && (
                        <p style={{ fontSize: 11, color: "#1E40AF", marginTop: 4 }}>
                          {selectedAssignment.grade.feedback}
                        </p>
                      )}
                      <p style={{ fontSize: 11, color: "#1E40AF", marginTop: 4 }}>
                        Graded {selectedAssignment.grade.gradedAt || ""}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {selectedAssignment.attempt && (
                    <div role="alert" style={{ background: "#FEF2F2", border: "1px solid #FECACA", padding: "12px 14px", borderRadius: 10, color: "#B91C1C" }}>
                      <strong style={{ fontSize: 12, display: "block", marginBottom: 5 }}>
                        Not accepted — no marks recorded ({selectedAssignment.attempt.score}/{selectedAssignment.attempt.maxScore})
                      </strong>
                      <p style={{ fontSize: 11.5, marginBottom: 5 }}>
                        Correct all answers to earn marks. You can try again.
                      </p>
                      {selectedAssignment.attempt.questionResults.map((correct, index) => (
                        <p key={index} style={{ fontSize: 11.5 }}>
                          Question {index + 1}: {correct ? "Correct" : "Incorrect"}
                        </p>
                      ))}
                    </div>
                  )}
                  {selectedAssignment.id === "10-1" ? (
                    selectedAssignment.questions.map((question, index) => (
                      <div key={question} style={{ marginTop: 10 }}>
                        <strong style={{ fontSize: 12, color: "#0F172A", display: "block", marginBottom: 6 }}>
                          {question}
                        </strong>
                        <textarea
                          className="as-textarea"
                          placeholder={index === 0
                            ? "Write the proof, including the contradiction..."
                            : "Enter the evaluated value (for example, 1)..."}
                          value={class10Answers[index]}
                          onChange={(event) => setClass10Answers((previous) =>
                            previous.map((answer, answerIndex) =>
                              answerIndex === index ? event.target.value : answer
                            )
                          )}
                        />
                      </div>
                    ))
                  ) : (
                    <div>
                      <strong style={{ fontSize: 12, color: "#0F172A", display: "block", marginBottom: 6 }}>
                        Your Solution / Answer:
                      </strong>
                      <textarea
                        className="as-textarea"
                        placeholder="Type your assignment answers, steps, or explanation here..."
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                <button
                  style={{ background: "#F1F5F9", color: "#475569", border: "1px solid #CBD5E1", padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                  onClick={() => setSelectedAssignment(null)}
                >
                  Close
                </button>

                {selectedAssignment.status !== "Submitted" && (
                  <button
                    className="as-details-btn"
                    style={{ background: "#16A34A" }}
                    onClick={() => handleSubmitAssignment(selectedAssignment.id)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Checking..."
                      : selectedAssignment.id === "10-1"
                        ? "Check Answers & Submit ✓"
                        : "Submit Assignment Now ✓"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}