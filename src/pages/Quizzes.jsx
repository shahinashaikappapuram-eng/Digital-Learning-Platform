import React, { useState, useEffect } from "react";
import StudentSidebar from "../components/StudentSidebar";
import { useNavigate } from "react-router-dom";

export default function Quizzes() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const [user, setUser] = useState(null);
  const [activeQuizToTake, setActiveQuizToTake] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [viewDetailsQuiz, setViewDetailsQuiz] = useState(null);

  // Comprehensive Class-wise Quizzes Mapping covering ALL subjects for Classes 6 to 10
  const classQuizzesMap = {
    "6": [
      {
        id: "6-q1",
        subject: "Mathematics",
        title: "Knowing Our Numbers Quiz",
        chapter: "Chapter 1: Knowing Our Numbers",
        date: "10 Jun 2026",
        time: "11:00 AM",
        icon: "+-÷=",
        iconBg: "#2563eb",
        questions: [
          { q: "What is the place value of 7 in the number 47,820?", options: ["70", "700", "7,000", "70,000"], correct: 2 },
          { q: "Which of the following is the greatest 5-digit number using digits 5, 2, 8, 0, 1?", options: ["85,210", "80,521", "85,120", "58,210"], correct: 0 }
        ]
      },
      {
        id: "6-q2",
        subject: "Science",
        title: "Food & Its Components Quiz",
        chapter: "Chapter 2: Mindful Eating",
        date: "12 Jun 2026",
        time: "10:00 AM",
        icon: "🔬",
        iconBg: "#10b981",
        questions: [
          { q: "Which nutrient deficiency causes scurvy?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], correct: 2 },
          { q: "Which of these is an energy-giving food component?", options: ["Proteins and Minerals", "Carbohydrates and Fats", "Vitamins and Water", "Roughage"], correct: 1 }
        ]
      },
      {
        id: "6-q3",
        subject: "English",
        title: "Honeysuckle Chapter 1 Quiz",
        chapter: "Unit 1: Who Did Patrick's Homework?",
        date: "08 Jun 2026",
        time: "02:00 PM",
        icon: "📖",
        iconBg: "#8b5cf6",
        questions: [
          { q: "What did Patrick think his cat was playing with?", options: ["A ball of wool", "A little doll", "A mouse", "A stuffed toy"], correct: 1 },
          { q: "Who actually did Patrick's homework in the end?", options: ["The elf", "His teacher", "Patrick himself", "His parents"], correct: 2 }
        ]
      },
      {
        id: "6-q4",
        subject: "Hindi",
        title: "वसंत - वह चिड़िया जो Quiz",
        chapter: "पाठ 1: वह चिड़िया जो",
        date: "06 Jun 2026",
        time: "09:00 AM",
        icon: "🇮🇳",
        iconBg: "#e11d48",
        questions: [
          { q: "चिड़िया के पंख किस रंग के हैं?", options: ["लाल", "हरे", "नीले", "पीले"], correct: 2 },
          { q: "चिड़िया किसके लिए गाती है?", options: ["बूढ़े बाबा के लिए", "वन के लिए", "अपने साथी के लिए", "नदी के लिए"], correct: 1 }
        ]
      },
      {
        id: "6-q5",
        subject: "Telugu",
        title: "అమ్మ ఒడి గేయం Quiz",
        chapter: "Lesson 1: అమ్మ ఒడి",
        date: "04 Jun 2026",
        time: "10:00 AM",
        icon: "🪶",
        iconBg: "#0284c7",
        questions: [
          { q: "అమ్మ ఒడి పాఠ్యభాగ ప్రక్రియ ఏమిటి?", options: ["కథ", "గేయం", "వ్యాసం", "నాటిక"], correct: 1 },
          { q: "అమ్మ ఒడి మనకు దేనిని ప్రసాదిస్తుంది?", options: ["భయం", "అమృతధారలు / దీవెనలు", "కష్టాలు", "నిద్ర"], correct: 1 }
        ]
      },
      {
        id: "6-q6",
        subject: "Social Science",
        title: "Locating Places on Earth Quiz",
        chapter: "Theme A: Exploring Society",
        date: "05 Jun 2026",
        time: "11:00 AM",
        icon: "🌍",
        iconBg: "#D97706",
        questions: [
          { q: "What is the 0° longitude line called?", options: ["Equator", "Prime Meridian", "Tropic of Cancer", "International Date Line"], correct: 1 },
          { q: "How many time zones is the world divided into?", options: ["12", "24", "36", "18"], correct: 1 }
        ]
      }
    ],
    "7": [
      {
        id: "7-q1",
        subject: "Mathematics",
        title: "Integers & Equations Quiz",
        chapter: "Chapter 1 & 3: Integers & Simple Equations",
        date: "10 Jun 2026",
        time: "11:00 AM",
        icon: "+-÷=",
        iconBg: "#2563eb",
        questions: [
          { q: "Evaluate: (-30) ÷ [(-5) + (-1)]", options: ["5", "-5", "6", "-6"], correct: 0 },
          { q: "Solve for x: 2x + 5 = 15", options: ["x = 3", "x = 5", "x = 10", "x = 7.5"], correct: 1 }
        ]
      },
      {
        id: "7-q2",
        subject: "Science",
        title: "Nutrition & Light Quiz",
        chapter: "Chapter 3 & 8: General Science",
        date: "12 Jun 2026",
        time: "10:00 AM",
        icon: "🔬",
        iconBg: "#10b981",
        questions: [
          { q: "What is the ultimate source of energy for all living organisms?", options: ["Water", "Sun", "Wind", "Soil"], correct: 1 },
          { q: "Which mirror is used as a rear-view mirror in vehicles?", options: ["Concave mirror", "Convex mirror", "Plane mirror", "Inverted mirror"], correct: 1 }
        ]
      },
      {
        id: "7-q3",
        subject: "English",
        title: "Town Mouse & Country Mouse Quiz",
        chapter: "Unit 1: Our World Through English",
        date: "08 Jun 2026",
        time: "02:00 PM",
        icon: "📖",
        iconBg: "#8b5cf6",
        questions: [
          { q: "Who invited whom in the story?", options: ["Town mouse invited country mouse", "Country mouse invited town mouse", "Both met randomly", "Farmer invited both"], correct: 1 },
          { q: "Where did country mouse feel safer?", options: ["In the busy town kitchen", "In his quiet country hole", "Under a bridge", "In a palace"], correct: 1 }
        ]
      },
      {
        id: "7-4",
        subject: "Hindi",
        title: "लहर-2 Quiz",
        chapter: "पाठ 1: ज्ञान हम को दीजिए",
        date: "06 Jun 2026",
        time: "09:00 AM",
        icon: "🇮🇳",
        iconBg: "#e11d48",
        questions: [
          { q: "हम ईश्वर से क्या मांगते हैं?", options: ["धन", "ज्ञान", "शत्रुता", "अंधकार"], correct: 1 },
          { q: "पाठ 'होशियार कौआ' किस विधा से संबंधित है?", options: ["कविता", "कहानी", "नाटक", "निबंध"], correct: 1 }
        ]
      },
      {
        id: "7-5",
        subject: "Telugu",
        title: "అక్షరం పాఠ్యభాగ Quiz",
        chapter: "Lesson 1: అక్షరం",
        date: "04 Jun 2026",
        time: "10:00 AM",
        icon: "🪶",
        iconBg: "#0284c7",
        questions: [
          { q: "అక్షరం పాఠం యొక్క ఉద్దేశం ఏమిటి?", options: ["ఆటలు నేర్పడం", "చదువు యొక్క ప్రాముఖ్యత", "ద్రవ్యోర్బణం", "వ్యవసాయం"], correct: 1 },
          { q: "సిరిమానోత్సవం ఏ ప్రాంతంలో ప్రసిద్ధి?", options: ["విజయనగరం", "హైదరాబాద్", "వరంగల్", "తిరుపతి"], correct: 0 }
        ]
      },
      {
        id: "7-6",
        subject: "Social Science",
        title: "Kakatiyas & Earth Quiz",
        chapter: "Semester 1 Social Studies",
        date: "05 Jun 2026",
        time: "11:00 AM",
        icon: "🌍",
        iconBg: "#D97706",
        questions: [
          { q: "Who was the famous queen of Kakatiya dynasty?", options: ["Rani Rudramadevi", "Jhansi Rani", "Razia Sultan", "Katakshi"], correct: 0 },
          { q: "What is the innermost layer of the earth called?", options: ["Crust", "Mantle", "Core", "Magma"], correct: 2 }
        ]
      }
    ],
    "8": [
      {
        id: "8-q1",
        subject: "Mathematics",
        title: "Rational Numbers & Equations Quiz",
        chapter: "Chapter 1 & 2: Algebra",
        date: "10 Jun 2026",
        time: "11:00 AM",
        icon: "+-÷=",
        iconBg: "#2563eb",
        questions: [
          { q: "What is the multiplicative inverse of -13?", options: ["13", "-1/13", "1/13", "0"], correct: 1 },
          { q: "Solve: 3x = 2x + 18", options: ["x = 9", "x = 18", "x = 6", "x = 12"], correct: 1 }
        ]
      },
      {
        id: "8-q2",
        subject: "Physical Science",
        title: "Force, Pressure & Friction Quiz",
        chapter: "Chapter 1 & 2: Physics",
        date: "12 Jun 2026",
        time: "10:00 AM",
        icon: "⚗️",
        iconBg: "#059669",
        questions: [
          { q: "Pressure is equal to:", options: ["Force × Area", "Force / Area", "Area / Force", "Force + Area"], correct: 1 },
          { q: "Which friction is less: sliding or rolling?", options: ["Sliding", "Rolling", "Both are equal", "Depends on weight"], correct: 1 }
        ]
      },
      {
        id: "8-q3",
        subject: "Biology",
        title: "Cell Structure & Microorganisms Quiz",
        chapter: "Chapter 1 & 2: Biology",
        date: "08 Jun 2026",
        time: "02:00 PM",
        icon: "🧬",
        iconBg: "#10B981",
        questions: [
          { q: "Who discovered the cell in 1665?", options: ["Robert Hooke", "Louis Pasteur", "Charles Darwin", "Gregor Mendel"], correct: 0 },
          { q: "Which microorganism causes malaria?", options: ["Bacteria", "Virus", "Protozoa", "Fungi"], correct: 2 }
        ]
      },
      {
        id: "8-q4",
        subject: "English",
        title: "Honeydew - The Best Christmas Present Quiz",
        chapter: "Unit 1: Honeydew",
        date: "06 Jun 2026",
        time: "09:00 AM",
        icon: "📖",
        iconBg: "#8b5cf6",
        questions: [
          { q: "Where did the author find the tin box?", options: ["In a junk shop in Bridport", "In an old library", "Under his bed", "In a museum"], correct: 0 },
          { q: "What date was written on the letter inside?", options: ["Dec 25, 1914", "January 6, 1915", "December 26, 1914", "November 11, 1918"], correct: 0 }
        ]
      },
      {
        id: "8-q5",
        subject: "Hindi",
        title: "वसंत - हम होंगे कामयाब Quiz",
        chapter: "पाठ 1",
        date: "04 Jun 2026",
        time: "10:00 AM",
        icon: "🇮🇳",
        iconBg: "#e11d48",
        questions: [
          { q: "'हम होंगे कामयाब' गीत के रचनाकार कौन हैं?", options: ["ചार चने", "गिरिजेश कुमार", "ಚಾರ್ ಚನೆ (translated from English we shall overcome)", "सुमित्रानंदन पंत"], correct: 2 },
          { q: "गीत में किस दिन की बात की गई है?", options: ["कल की", "आज की", "नयी सुबह की", "रात की"], correct: 2 }
        ]
      },
      {
        id: "8-q6",
        subject: "Telugu",
        title: "ఆంధ్ర వైభవం Quiz",
        chapter: "Lesson 1",
        date: "03 Jun 2026",
        time: "11:00 AM",
        icon: "🪶",
        iconBg: "#0284c7",
        questions: [
          { q: "ఆంధ్ర వైభవం పాఠం ఏ ప్రక్రియకు చెందింది?", options: ["గేయం", "వ్యాసం", "కథ", "నాటిక"], correct: 0 },
          { q: "ఆంధ్రుల ప్రత్యేకత ఏమిటి?", options: ["వీరత్వం మరియు సంస్కృతి", "సోమరితనం", "వ్యాపారం మాత్రమే", "చదువులేకపోవడం"], correct: 0 }
        ]
      },
      {
        id: "8-q7",
        subject: "History",
        title: "How, When and Where Quiz",
        chapter: "History Chapter 1",
        date: "02 Jun 2026",
        time: "01:00 PM",
        icon: "🏛️",
        iconBg: "#D97706",
        questions: [
          { q: "Who wrote 'A History of British India'?", options: ["James Mill", "Lord Dalhousie", "Warren Hastings", "Mahatma Gandhi"], correct: 0 },
          { q: "Into how many periods did James Mill divide Indian history?", options: ["2", "3", "4", "5"], correct: 1 }
        ]
      },
      {
        id: "8-q8",
        subject: "Geography",
        title: "Resources Quiz",
        chapter: "Geography Chapter 1",
        date: "01 Jun 2026",
        time: "10:00 AM",
        icon: "🌍",
        iconBg: "#0D9488",
        questions: [
          { q: "Resources derived from living things are called:", options: ["Abiotic", "Biotic", "Natural", "Human-made"], correct: 1 },
          { q: "Coal is an example of which type of resource?", options: ["Renewable", "Non-renewable", "Potential", "Ubiquitous"], correct: 1 }
        ]
      },
      {
        id: "8-q9",
        subject: "Civics",
        title: "The Indian Constitution Quiz",
        chapter: "Civics Chapter 1",
        date: "31 May 2026",
        time: "02:00 PM",
        icon: "⚖️",
        iconBg: "#4F46E5",
        questions: [
          { q: "Who is known as the Father of the Indian Constitution?", options: ["Mahatma Gandhi", "Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel"], correct: 1 },
          { q: "What does secularism mean in the Indian context?", options: ["State has an official religion", "State treats all religions with equal respect", "State bans religion", "State follows only one religion"], correct: 1 }
        ]
      }
    ],
    "9": [
      {
        id: "9-q1",
        subject: "Mathematics",
        title: "Number Systems & Polynomials Quiz",
        chapter: "Chapter 1 & 2: Algebra",
        date: "10 Jun 2026",
        time: "11:00 AM",
        icon: "+-÷=",
        iconBg: "#2563eb",
        questions: [
          { q: "Every rational number is:", options: ["A natural number", "An integer", "A real number", "A whole number"], correct: 2 },
          { q: "What is the degree of a zero polynomial?", options: ["0", "1", "Not defined", "Any natural number"], correct: 2 }
        ]
      },
      {
        id: "9-q2",
        subject: "Physical Science",
        title: "Matter & Atoms Quiz",
        chapter: "Chapter 1 & 3: Chemistry",
        date: "12 Jun 2026",
        time: "10:00 AM",
        icon: "⚗️",
        iconBg: "#059669",
        questions: [
          { q: "What is the SI unit of mass?", options: ["Gram", "Kilogram", "Newton", "Pound"], correct: 1 },
          { q: "What is the atomic mass of Carbon?", options: ["12 u", "14 u", "16 u", "1 u"], correct: 0 }
        ]
      },
      {
        id: "9-q3",
        subject: "Biology",
        title: "The Fundamental Unit of Life Quiz",
        chapter: "Chapter 10: Biology",
        date: "08 Jun 2026",
        time: "02:00 PM",
        icon: "🧬",
        iconBg: "#10B981",
        questions: [
          { q: "Who discovered cells in cork in 1665?", options: ["Leeuwenhoek", "Robert Hooke", "Schleiden", "Virchow"], correct: 1 },
          { q: "Which cell organelle is known as the powerhouse of the cell?", options: ["Ribosome", "Mitochondria", "Lysosome", "Golgi apparatus"], correct: 1 }
        ]
      },
      {
        id: "9-q4",
        subject: "English",
        title: "Beehive - The Fun They Had Quiz",
        chapter: "Unit 1: Beehive",
        date: "06 Jun 2026",
        time: "09:00 AM",
        icon: "📖",
        iconBg: "#8b5cf6",
        questions: [
          { q: "In what year is the story set?", options: ["2020", "2157", "3000", "2050"], correct: 1 },
          { q: "What was strange about the book Margie found?", options: ["It had moving pictures", "The pages were yellow and crinkly", "It was a computer file", "It spoke out loud"], correct: 1 }
        ]
      },
      {
        id: "9-5",
        subject: "Hindi",
        title: "हिन्दी वल्लरी Quiz",
        chapter: "पाठ 1: जिस देश में गंगा बहती है",
        date: "04 Jun 2026",
        time: "10:00 AM",
        icon: "🇮🇳",
        iconBg: "#e11d48",
        questions: [
          { q: "'जिस देश में गंगा बहती है' गीत किस फिल्म का है?", options: ["संगम", "जिस देश में गंगा बहती है", "श्री 420", "आवारा"], correct: 1 },
          { q: "भारत के लोगों की मुख्य विशेषता क्या है?", options: ["ईमानदारी और प्रेम", "क्रूरता", "लोभ", "अज्ञानता"], correct: 0 }
        ]
      },
      {
        id: "9-6",
        subject: "Telugu",
        title: "ధర్మబోధ Quiz",
        chapter: "Lesson 1: ధర్మబోధ",
        date: "03 Jun 2026",
        time: "11:00 AM",
        icon: "🪶",
        iconBg: "#0284c7",
        questions: [
          { q: "ధర్మబోధ పాఠ్యభాగం ద్వారా విద్యార్థులు నేర్చుకోవాల్సిన గుణం ఏమిటి?", options: ["అబద్ధాలు చెప్పడం", "ధర్మవర్తనం", "సోమరితనం", "ద్వేషం"], correct: 1 },
          { q: "సత్పురుషుల సంపర్కం ఎటువంటిది?", options: ["విషంలాంటిది", "అమృతంలాంటిది", "హానికరమైనది", "నిరుపయోగం"], correct: 1 }
        ]
      },
      {
        id: "9-7",
        subject: "History",
        title: "The French Revolution Quiz",
        chapter: "History Chapter 1",
        date: "02 Jun 2026",
        time: "01:00 PM",
        icon: "🏛️",
        iconBg: "#D97706",
        questions: [
          { q: "When did the French Revolution begin?", options: ["14 July 1789", "15 August 1947", "10 June 1799", "1 January 1800"], correct: 0 },
          { q: "Who was the king of France during the Revolution?", options: ["Louis XVI", "Napoleon Bonaparte", "Louis XIV", "Robespierre"], correct: 0 }
        ]
      },
      {
        id: "9-8",
        subject: "Geography",
        title: "India Size and Location Quiz",
        chapter: "Geography Chapter 1",
        date: "01 Jun 2026",
        time: "10:00 AM",
        icon: "🌍",
        iconBg: "#0D9488",
        questions: [
          { q: "What is the total land area of India?", options: ["3.28 million square km", "7.69 million square km", "9.59 million square km", "8.51 million square km"], correct: 0 },
          { q: "The southernmost point of Indian Union is:", options: ["Kanyakumari", "Indira Point", "Pamban Island", "Port Blair"], correct: 1 }
        ]
      },
      {
        id: "9-9",
        subject: "Civics",
        title: "What is Democracy? Quiz",
        chapter: "Civics Chapter 1",
        date: "31 May 2026",
        time: "02:00 PM",
        icon: "⚖️",
        iconBg: "#4F46E5",
        questions: [
          { q: "In a democracy, the final decision-making power rests with:", options: ["The military generals", "The elected representatives", "The richest citizens", "Foreign advisors"], correct: 1 },
          { q: "Which country held elections where women could not vote until recently?", options: ["Saudi Arabia", "India", "USA", "France"], correct: 0 }
        ]
      },
      {
        id: "9-10",
        subject: "Economics",
        title: "Village Palampur Quiz",
        chapter: "Economics Chapter 1",
        date: "30 May 2026",
        time: "03:00 PM",
        icon: "📈",
        iconBg: "#EA580C",
        questions: [
          { q: "What is the main production activity in Village Palampur?", options: ["Manufacturing", "Farming", "Transport", "Shop-keeping"], correct: 1 },
          { q: "What are the four factors of production?", options: ["Land, Labor, Capital, Enterprise", "Water, Soil, Seeds, Tractor", "Money, Power, Transport, Market", "Sun, Rain, Soil, Fertilizer"], correct: 0 }
        ]
      }
    ],
    "10": [
      {
        id: "10-q1",
        subject: "Mathematics",
        title: "Real Numbers & Trigonometry Quiz",
        chapter: "Chapter 1 & 8: Board Prep",
        date: "10 Jun 2026",
        time: "11:00 AM",
        icon: "+-÷=",
        iconBg: "#2563eb",
        questions: [
          { q: "HCF × LCM of two numbers is equal to:", options: ["Sum of numbers", "Product of numbers", "Difference of numbers", "Zero"], correct: 1 },
          { q: "What is the value of sin²θ + cos²θ?", options: ["0", "1", "2", "-1"], correct: 1 }
        ]
      },
      {
        id: "10-q2",
        subject: "Physical Science",
        title: "Chemical Reactions & Light Quiz",
        chapter: "Chapter 1 & 5: Physics & Chemistry",
        date: "12 Jun 2026",
        time: "10:00 AM",
        icon: "⚗️",
        iconBg: "#059669",
        questions: [
          { q: "When a magnesium ribbon is burnt, it produces a dazzling white flame and a white powder of:", options: ["Magnesium nitride", "Magnesium oxide", "Magnesium hydroxide", "Magnesium carbonate"], correct: 1 },
          { q: "The refractive index of diamond is:", options: ["1.33", "1.52", "2.42", "2.00"], correct: 2 }
        ]
      },
      {
        id: "10-q3",
        subject: "Biology",
        title: "Life Processes & Heredity Quiz",
        chapter: "Chapter 1 & 4: Biology",
        date: "08 Jun 2026",
        time: "02:00 PM",
        icon: "🧬",
        iconBg: "#10B981",
        questions: [
          { q: "The breakdown of glucose to yield energy takes place in:", options: ["Nucleus", "Mitochondria", "Chloroplast", "Cytoplasm"], correct: 1 },
          { q: "Who is known as the Father of Genetics?", options: ["Charles Darwin", "Gregor Mendel", "Watson and Crick", "Jean Lamarck"], correct: 1 }
        ]
      },
      {
        id: "10-q4",
        subject: "English",
        title: "First Flight - A Letter to God Quiz",
        chapter: "Unit 1: First Flight Reader",
        date: "06 Jun 2026",
        time: "09:00 AM",
        icon: "📖",
        iconBg: "#8b5cf6",
        questions: [
          { q: "Where was Lencho's house located?", options: ["Top of a low hill", "In the middle of valley", "Near the ocean", "In a bustling city"], correct: 0 },
          { q: "How much money did Lencho ask God for?", options: ["50 pesos", "100 pesos", "1000 pesos", "10 pesos"], correct: 1 }
        ]
      },
      {
        id: "10-5",
        subject: "Hindi",
        title: "स्पर्श - बरसते बदल Quiz",
        chapter: "पाठ 1",
        date: "04 Jun 2026",
        time: "10:00 AM",
        icon: "🇮🇳",
        iconBg: "#e11d48",
        questions: [
          { q: "'बरसते बदल' कविता के रचयिता कौन हैं?", options: ["सुमित्रानंदन पंत", "कबीर", "रहीम", "सूरदास"], correct: 0 },
          { q: "दादुर का अर्थ क्या होता है?", options: ["मोर", "मेंढक", "पक्षी", "बादल"], correct: 1 }
        ]
      },
      {
        id: "10-6",
        subject: "Telugu",
        title: "మాతృభావన Quiz",
        chapter: "Lesson 1",
        date: "03 Jun 2026",
        time: "11:00 AM",
        icon: "🪶",
        iconBg: "#0284c7",
        questions: [
          { q: "మాతృభావన పాఠ్యభాగ కవి ఎవరు?", options: ["గడియారం శేషశాస్త్రి", "బాపూజీ", "తిక్కన", "శ్రీనాథుడు"], correct: 0 },
          { q: "అహ్మద్ నగర్ కోటను జయించిన నాయకుడు ఎవరు?", options: ["ఛత్రపతి శివాజీ", "అక్బర్", "ఔరంగజేబ్", "కృష్ణదేవరాయలు"], correct: 0 }
        ]
      },
      {
        id: "10-7",
        subject: "History",
        title: "Nationalism in Europe Quiz",
        chapter: "History Chapter 1",
        date: "02 Jun 2026",
        time: "01:00 PM",
        icon: "🏛️",
        iconBg: "#D97706",
        questions: [
          { q: "Who painted 'The Dream of Worldwide Democratic and Social Republics'?", options: ["Frédéric Sorrieu", "Giuseppe Mazzini", "Otto von Bismarck", "Napoleon"], correct: 0 },
          { q: "When was the Treaty of Vienna signed?", options: ["1815", "1830", "1848", "1871"], correct: 0 }
        ]
      },
      {
        id: "10-8",
        subject: "Geography",
        title: "Resources and Development Quiz",
        chapter: "Geography Chapter 1",
        date: "01 Jun 2026",
        time: "10:00 AM",
        icon: "🌍",
        iconBg: "#0D9488",
        questions: [
          { q: "Resources which are surveyed and their quality and quantity have been determined for utilization are called:", options: ["Potential resources", "Developed resources", "Stock", "Reserves"], correct: 1 },
          { q: "Which soil is best suited for growing cotton?", options: ["Laterite soil", "Red soil", "Black soil", "Alluvial soil"], correct: 2 }
        ]
      },
      {
        id: "10-9",
        subject: "Civics",
        title: "Power Sharing Quiz",
        chapter: "Civics Chapter 1",
        date: "31 May 2026",
        time: "02:00 PM",
        icon: "⚖️",
        iconBg: "#4F46E5",
        questions: [
          { q: "What percentage of Belgium's population lives in the Flemish region and speaks Dutch?", options: ["59%", "40%", "1% ", "80%"], correct: 0 },
          { q: "Capital city of Belgium is:", options: ["Brussels", "Antwerp", "Bruges", "Ghent"], correct: 0 }
        ]
      },
      {
        id: "10-10",
        subject: "Economics",
        title: "Development & Sectors Quiz",
        chapter: "Economics Chapter 1 & 2",
        date: "30 May 2026",
        time: "03:00 PM",
        icon: "📈",
        iconBg: "#EA580C",
        questions: [
          { q: "What criterion is used by World Bank in classifying countries?", options: ["Per Capita Income", "Life Expectancy", "Literacy Rate", "Gross Enrolment Ratio"], correct: 0 },
          { q: "Activities connected to agriculture and dairy belong to which sector?", options: ["Primary sector", "Secondary sector", "Tertiary sector", "Quaternary sector"], correct: 0 }
        ]
      }
    ]
  };

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const rawUser = localStorage.getItem("current_user");
    if (!rawUser) {
      navigate("/student-login");
      return;
    }
    try {
      const parsed = JSON.parse(rawUser);
      setUser(parsed);

      const currentClass = String(parsed.class || "10");
      const classSpecificQuizzes = classQuizzesMap[currentClass] || classQuizzesMap["10"];

      const savedSubmissions = parsed.quizSubmissions || {};
      const merged = classSpecificQuizzes.map((item) => {
        const submission = savedSubmissions[item.id];
        if (submission) {
          return {
            ...item,
            status: "Completed",
            statusColor: "#15803d",
            statusBg: "#dcfce7",
            score: `${submission.score}%`,
            submittedOn: submission.date,
            userChoices: submission.userChoices,
            actionType: "result"
          };
        }
        return {
          ...item,
          status: "Upcoming",
          statusColor: "#2563eb",
          statusBg: "#eff6ff",
          attempts: "0/1",
          actionType: "start"
        };
      });
      setQuizzes(merged);
    } catch {
      navigate("/student-login");
    }
  }, [navigate]);

  if (!user) return null;

  const studentName = user.name || "Student";
  const studentClass = String(user.class || "10");

  const completedList = quizzes.filter((q) => q.status === "Completed");
  const completedCount = completedList.length;
  const upcomingCount = quizzes.filter((q) => q.status === "Upcoming").length;
  const attemptedCount = quizzes.filter((q) => q.status === "Attempted").length;

  const averageScore =
    completedCount > 0
      ? Math.round(
          completedList.reduce((acc, curr) => acc + parseInt(curr.score || "0", 10), 0) /
            completedCount
        )
      : 0;

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    localStorage.removeItem("studentLoggedIn");
    navigate("/student-login");
  };

  const filtered = quizzes.filter((item) => {
    if (filter === "All") return true;
    return item.status.toLowerCase() === filter.toLowerCase();
  });


  const handleQuizSubmit = (quiz) => {
    const questions = quiz.questions;
    let correctCount = 0;

    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);
    const submissionDate = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

    const updatedSubmissions = {
      ...(user.quizSubmissions || {}),
      [quiz.id]: {
        score: scorePercentage,
        date: submissionDate,
        userChoices: selectedAnswers
      }
    };

    const newCompletedCount = Object.keys(updatedSubmissions).length;
    const newAverage = Math.round(
      Object.values(updatedSubmissions).reduce((a, b) => a + b.score, 0) / newCompletedCount
    );

    const updatedUser = {
      ...user,
      quizSubmissions: updatedSubmissions,
      quizScore: `${newAverage}%`,
      overallProgress: Math.min(100, (user.overallProgress || 0) + 12),
      recentActivities: [
        {
          id: `act-quiz-${Date.now()}`,
          type: "Quiz",
          title: `Completed: ${quiz.title}`,
          time: "Just now",
          icon: "🎯",
          color: "#EA580C",
          matter: {
            heading: `${quiz.subject} Quiz Result`,
            summary: `You scored ${scorePercentage}% in ${quiz.title}.`,
            score: `Score: ${scorePercentage}%`,
            actionPath: "/quizzes",
            actionText: "Review Quizzes"
          }
        },
        ...(user.recentActivities || [])
      ]
    };

    setUser(updatedUser);
    localStorage.setItem("current_user", JSON.stringify(updatedUser));

    const allStudents = JSON.parse(localStorage.getItem("all_students") || "[]");
    localStorage.setItem("all_students", JSON.stringify(allStudents.map((s) => (s.id === user.id ? updatedUser : s))));

    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === quiz.id
          ? {
              ...q,
              status: "Completed",
              statusColor: "#15803d",
              statusBg: "#dcfce7",
              score: `${scorePercentage}%`,
              submittedOn: submissionDate,
              userChoices: selectedAnswers,
              actionType: "result"
            }
          : q
      )
    );

    setActiveQuizToTake(null);
    setSelectedAnswers({});
    alert(`Quiz completed! You scored ${scorePercentage}%.`);
  };

  return (
    <div className="qz-container">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .qz-container { display: flex; min-height: 100vh; background: #f8fafc; color: #0f172a; width: 100%; }

        .qz-sidebar { width: 240px; background: #081B38; color: #94A3B8; display: flex; flex-direction: column; flex-shrink: 0; padding: 22px 14px; position: fixed; top: 0; bottom: 0; left: 0; z-index: 120; }
        .qz-brand { display: flex; align-items: center; gap: 12px; padding: 0 0 18px 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); margin-bottom: 18px; }
        .qz-brand-badge { width: 38px; height: 38px; border-radius: 10px; background: #1E60F8; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #ffffff; }
        .qz-brand-text h2 { font-size: 15px; font-weight: 700; color: #FFFFFF; }
        .qz-brand-text p { font-size: 12px; color: #60A5FA; display: block; }
        .qz-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; overflow-y: auto; }
        .qz-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; color: #94A3B8; text-decoration: none; border-radius: 9px; font-size: 13px; font-weight: 500; transition: all 0.15s; border: none; background: transparent; cursor: pointer; width: 100%; text-align: left; }
        .qz-link:hover { background-color: rgba(255, 255, 255, 0.06); color: #FFFFFF; }
        .qz-link.active { background-color: #1E60F8; color: #FFFFFF; font-weight: 600; box-shadow: 0 4px 12px rgba(30,96,248,0.3); }
        .qz-logout-wrap { padding: 14px 14px 18px 14px; border-top: 1px solid rgba(255, 255, 255, 0.07); margin-top: auto; }
        .qz-logout-btn { width: 100%; display: flex; align-items: center; gap: 12px; background: transparent; border: none; color: #EF4444; padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }

        .qz-main { flex: 1; margin-left: 240px; display: flex; flex-direction: column; min-width: 0; padding-bottom: 50px; }
        .qz-header { height: 64px; background: #fff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; position: sticky; top: 0; z-index: 100; }
        .qz-header-title h2 { font-size: 15.5px; font-weight: 700; color: #0f172a; }
        .qz-header-title p { font-size: 11.5px; color: #64748b; }
        .qz-header-right { display: flex; align-items: center; gap: 20px; }
        .qz-notif-btn { position: relative; width: 36px; height: 36px; border-radius: 50%; border: 1px solid #e2e8f0; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .qz-notif-badge { position: absolute; top: -3px; right: -3px; background: #ef4444; color: #fff; border-radius: 50%; width: 16px; height: 16px; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
        .qz-user-badge { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .qz-avatar { width: 38px; height: 38px; border-radius: 50%; background: #fed7aa; display: flex; align-items: center; justify-content: center; font-size: 18px; }

        .qz-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; max-width: 1200px; margin: 0 auto; width: 100%; }

        .qz-hero { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; }
        .qz-hero-left { display: flex; align-items: center; gap: 16px; }
        .qz-hero-icon { width: 48px; height: 48px; border-radius: 12px; background: #f43f5e; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .qz-hero-left h1 { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 3px; }
        .qz-hero-left p { font-size: 13px; color: #64748b; }
        .qz-hero-stat { display: flex; align-items: center; gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px 18px; }
        .qz-hero-stat small { display: block; font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: 700; }
        .qz-hero-stat strong { font-size: 16px; font-weight: 800; color: #0f172a; }

        .qz-filters { display: flex; gap: 12px; flex-wrap: wrap; }
        .qz-filter-pill { display: flex; align-items: center; gap: 8px; padding: 9px 22px; border-radius: 10px; font-size: 13px; font-weight: 600; border: 1px solid #e2e8f0; background: #fff; color: #475569; cursor: pointer; transition: all 0.15s; }
        .qz-filter-pill.active { background: #2563eb; color: #fff; border-color: #2563eb; box-shadow: 0 4px 12px rgba(37,99,235,0.25); }
        .qz-count-badge { padding: 2px 8px; border-radius: 99px; font-size: 11px; font-weight: 700; }

        .qz-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .qz-stat-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px; text-align: center; }
        .qz-stat-icon { width: 36px; height: 36px; border-radius: 50%; margin: 0 auto 8px auto; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .qz-stat-card span { font-size: 11px; color: #64748b; font-weight: 600; display: block; margin-bottom: 2px; }
        .qz-stat-card strong { font-size: 20px; font-weight: 800; color: #0f172a; }

        .qz-list { display: flex; flex-direction: column; gap: 14px; }
        .qz-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .qz-card-left { display: flex; align-items: center; gap: 16px; }
        .qz-subject-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 16px; font-weight: 700; flex-shrink: 0; }
        .qz-card-meta h4 { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 2px; }
        .qz-card-meta h3 { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 3px; }
        .qz-card-meta p { font-size: 12px; color: #64748b; margin-bottom: 6px; }
        .qz-time-tag { font-size: 11.5px; color: #64748b; font-weight: 500; }
        .qz-card-right { display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }
        .qz-badge { font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 6px; }
        .qz-meta-right { font-size: 12px; color: #64748b; font-weight: 600; }
        .qz-btn-blue { background: #2563eb; color: #fff; border: none; padding: 8px 18px; border-radius: 8px; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
        .qz-btn-blue:hover { background: #1d4ed8; }
        .qz-btn-outline { background: #fff; border: 1px solid #2563eb; color: #2563eb; padding: 8px 18px; border-radius: 8px; font-size: 12.5px; font-weight: 600; cursor: pointer; }
        .qz-btn-outline:hover { background: #eff6ff; }

        .qz-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .qz-modal-box { background: #FFFFFF; border-radius: 16px; width: 100%; max-width: 600px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2); }
        .qz-modal-head { padding: 18px 22px; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; }
        .qz-modal-body { padding: 22px; max-height: 520px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
        .qz-opt-btn { width: 100%; text-align: left; padding: 10px 14px; border-radius: 8px; border: 1px solid #CBD5E1; background: #F8FAFC; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; margin-top: 6px; }
        .qz-opt-btn.selected { background: #EFF6FF; border-color: #2563EB; color: #1D4ED8; font-weight: 700; }

        @media (max-width: 1024px) {
          .qz-sidebar { display: none; }
          .qz-main { margin-left: 0; }
          .qz-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <StudentSidebar onLogout={handleLogout} />

      <main className="qz-main">
        <header className="qz-header">
          <div className="qz-header-title">
            <h2>Digital Learning Platform</h2>
            <p>Online Learning Portal for Students</p>
          </div>
          <div className="qz-header-right">
            <button className="qz-notif-btn" onClick={() => navigate("/announcements")}>
              🔔<span className="qz-notif-badge">5</span>
            </button>
            <div className="qz-user-badge" onClick={() => navigate("/settings")}>
              <div className="qz-avatar">👨‍🎓</div>
              <div>
                <strong style={{ fontSize: 13, display: "block" }}>{studentName}</strong>
                <span style={{ fontSize: 11, color: "#64748b" }}>Class {studentClass}th</span>
              </div>
            </div>
          </div>
        </header>

        <div className="qz-body">
          <div className="qz-hero">
            <div className="qz-hero-left">
              <div className="qz-hero-icon">❓</div>
              <div>
                <h1>Quizzes (Class {studentClass})</h1>
                <p>Test your knowledge, improve your grades, and review answer details!</p>
              </div>
            </div>
            <div className="qz-hero-stat">
              <span style={{ fontSize: 22 }}>📅</span>
              <div>
                <small>Total Quizzes</small>
                <strong>{quizzes.length} Available</strong>
              </div>
              <span style={{ fontSize: 24, marginLeft: 6 }}>📋</span>
            </div>
          </div>

          <div className="qz-filters">
            <button className={`qz-filter-pill ${filter === "All" ? "active" : ""}`} onClick={() => setFilter("All")}>
              All ({quizzes.length})
            </button>
            <button className={`qz-filter-pill ${filter === "Upcoming" ? "active" : ""}`} onClick={() => setFilter("Upcoming")}>
              Upcoming <span className="qz-count-badge" style={{ background: "#f59e0b", color: "#fff" }}>{upcomingCount}</span>
            </button>
            <button className={`qz-filter-pill ${filter === "Completed" ? "active" : ""}`} onClick={() => setFilter("Completed")}>
              Completed <span className="qz-count-badge" style={{ background: "#10b981", color: "#fff" }}>{completedCount}</span>
            </button>
            <button className={`qz-filter-pill ${filter === "Attempted" ? "active" : ""}`} onClick={() => setFilter("Attempted")}>
              Attempted <span className="qz-count-badge" style={{ background: "#8b5cf6", color: "#fff" }}>{attemptedCount}</span>
            </button>
          </div>

          <div className="qz-stats-grid">
            <div className="qz-stat-card">
              <div className="qz-stat-icon" style={{ background: "#ffe4e6", color: "#e11d48" }}>📋</div>
              <span>Total Quizzes</span>
              <strong>{quizzes.length}</strong>
            </div>
            <div className="qz-stat-card">
              <div className="qz-stat-icon" style={{ background: "#dcfce7", color: "#15803d" }}>✓</div>
              <span>Completed</span>
              <strong>{completedCount}</strong>
            </div>
            <div className="qz-stat-card">
              <div className="qz-stat-icon" style={{ background: "#f3e8ff", color: "#9333ea" }}>🕒</div>
              <span>Upcoming</span>
              <strong>{upcomingCount}</strong>
            </div>
            <div className="qz-stat-card">
              <div className="qz-stat-icon" style={{ background: "#eff6ff", color: "#2563eb" }}>⭐</div>
              <span>Average Score</span>
              <strong>{averageScore}%</strong>
            </div>
          </div>

          <div className="qz-list">
            {filtered.map((item) => (
              <div className="qz-card" key={item.id}>
                <div className="qz-card-left">
                  <div className="qz-subject-icon" style={{ background: item.iconBg }}>
                    {item.icon}
                  </div>
                  <div className="qz-card-meta">
                    <h4>{item.subject}</h4>
                    <h3>{item.title}</h3>
                    <p>{item.chapter}</p>
                    <span className="qz-time-tag">📅 {item.date} | {item.time}</span>
                  </div>
                </div>

                <div className="qz-card-right">
                  <span className="qz-badge" style={{ background: item.statusBg, color: item.statusColor }}>
                    {item.status}
                  </span>

                  {item.attempts && <span className="qz-meta-right">Attempts: {item.attempts}</span>}
                  {item.score && <span className="qz-meta-right">Score: {item.score}</span>}

                  {item.status === "Completed" ? (
                    <button className="qz-btn-outline" onClick={() => setViewDetailsQuiz(item)}>
                      View Details ›
                    </button>
                  ) : (
                    <button
                      className="qz-btn-blue"
                      onClick={() => {
                        setActiveQuizToTake(item);
                        setSelectedAnswers({});
                      }}
                    >
                      Start Quiz ›
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {activeQuizToTake && (
        <div className="qz-modal-overlay" onClick={() => setActiveQuizToTake(null)}>
          <div className="qz-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="qz-modal-head">
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>{activeQuizToTake.title}</h3>
                <span style={{ fontSize: 11, color: "#64748B" }}>{activeQuizToTake.subject} • Answer all questions</span>
              </div>
              <button
                onClick={() => setActiveQuizToTake(null)}
                style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#64748B" }}
              >
                ✕
              </button>
            </div>

            <div className="qz-modal-body">
              {activeQuizToTake.questions.map((q, qIndex) => (
                <div key={qIndex} style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: 12 }}>
                  <strong style={{ fontSize: 13, color: "#0F172A", display: "block", marginBottom: 6 }}>
                    {qIndex + 1}. {q.q}
                  </strong>
                  <div>
                    {q.options.map((opt, optIndex) => (
                      <button
                        key={optIndex}
                        className={`qz-opt-btn ${selectedAnswers[qIndex] === optIndex ? "selected" : ""}`}
                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [qIndex]: optIndex })}
                      >
                        {String.fromCharCode(65 + optIndex)}. {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
                <button
                  style={{ background: "#F1F5F9", color: "#475569", border: "1px solid #CBD5E1", padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                  onClick={() => setActiveQuizToTake(null)}
                >
                  Cancel
                </button>
                <button
                  className="qz-btn-blue"
                  style={{ background: "#10B981" }}
                  onClick={() => handleQuizSubmit(activeQuizToTake)}
                >
                  Submit Quiz Answers ✓
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewDetailsQuiz && (
        <div className="qz-modal-overlay" onClick={() => setViewDetailsQuiz(null)}>
          <div className="qz-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="qz-modal-head">
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>Quiz Result & Details</h3>
                <span style={{ fontSize: 11, color: "#64748B" }}>{viewDetailsQuiz.title} ({viewDetailsQuiz.subject})</span>
              </div>
              <button
                onClick={() => setViewDetailsQuiz(null)}
                style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#64748B" }}
              >
                ✕
              </button>
            </div>

            <div className="qz-modal-body">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#DCFCE7", border: "1px solid #86EFAC", padding: "14px 18px", borderRadius: 12 }}>
                <div>
                  <span style={{ fontSize: 11, color: "#166534", fontWeight: 700, textTransform: "uppercase" }}>Your Final Score</span>
                  <strong style={{ fontSize: 24, display: "block", color: "#15803D" }}>{viewDetailsQuiz.score}</strong>
                  <span style={{ fontSize: 10, color: "#166534" }}>Submitted on {viewDetailsQuiz.submittedOn || "Recently"}</span>
                </div>
                <span style={{ fontSize: 36 }}>🎯</span>
              </div>

              <div>
                <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: "#0F172A" }}>Review Submission:</h4>
                {viewDetailsQuiz.questions.map((q, idx) => {
                  const userChoice = viewDetailsQuiz.userChoices?.[idx];
                  const isCorrect = userChoice === q.correct;
                  return (
                    <div key={idx} style={{ padding: "10px 12px", border: "1px solid #E2E8F0", borderRadius: 10, marginBottom: 8, background: "#F8FAFC" }}>
                      <strong style={{ fontSize: 12, display: "block", color: "#1E293B", marginBottom: 4 }}>
                        {idx + 1}. {q.q}
                      </strong>
                      <p style={{ fontSize: 11.5, color: isCorrect ? "#15803D" : "#DC2626" }}>
                        Your Answer: {userChoice !== undefined ? q.options[userChoice] : "Not Answered"}{" "}
                        {isCorrect ? "✓ (Correct)" : "✗ (Incorrect)"}
                      </p>
                      {!isCorrect && (
                        <p style={{ fontSize: 11, color: "#2563EB", marginTop: 2 }}>
                          Correct Answer: {q.options[q.correct]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
                <button
                  className="qz-btn-blue"
                  onClick={() => setViewDetailsQuiz(null)}
                >
                  Done Reviewing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}