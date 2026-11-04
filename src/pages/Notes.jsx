
import React, { useState } from "react";
import StudentSidebar from "../components/StudentSidebar";
import { useNavigate } from "react-router-dom";
import { downloadStudyPdf } from "../utils/studyPdf";
import { buildStudyPdfSections } from "../utils/studyPdfContent";

export default function Notes() {
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState("All Notes");
  const [selectedClass, setSelectedClass] = useState("Class 6");
  const [selectedType, setSelectedType] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");

  const currentUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("current_user") || "null")
      : null;

  const studentName =
    currentUser?.name ||
    (typeof window !== "undefined"
      ? localStorage.getItem("studentName") || "Student"
      : "Student");

  const studentClass =
    currentUser?.class ||
    (typeof window !== "undefined"
      ? localStorage.getItem("studentClass") || "6"
      : "6");

  const schoolName =
    currentUser?.school ||
    (typeof window !== "undefined"
      ? localStorage.getItem("studentSchool") || "Govt High School"
      : "Govt High School");

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    localStorage.removeItem("studentLoggedIn");
    navigate("/student-login");
  };


  const subjectPills = [
    { label: "All Notes", icon: "▦" },
    { label: "Mathematics", icon: "📐" },
    { label: "Science", icon: "🔬" },
    { label: "Physical Science", icon: "⚗️" },
    { label: "Biology", icon: "🧬" },
    { label: "Social Science", icon: "🌐" },
    { label: "History", icon: "🏛️" },
    { label: "Geography", icon: "🌍" },
    { label: "Civics", icon: "⚖️" },
    { label: "Economics", icon: "📈" },
    { label: "Computer Basics", icon: "💻" },
    { label: "English", icon: "📖" },
    { label: "Hindi", icon: "🇮🇳" },
    { label: "Telugu", icon: "🪶" }
  ];

  const classFilters = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

  const typeFilters = [
    { label: "All Types", icon: "▦" },
    { label: "Handwritten Notes", icon: "✍️" },
    { label: "Chapter Notes", icon: "📖" },
    { label: "Revision Notes", icon: "📑" },
    { label: "Important Questions", icon: "❓" }
  ];

  // Comprehensive Notes Database with All Subjects (including Computer Basics) and all 4 types per class
  const notesData = [
    // ==================== CLASS 6 ====================
    { id: "6-m-cn", title: "Class 6 Mathematics - Chapter Notes (Knowing Our Numbers)", subject: "Mathematics", chapter: "Chapter 1 & 2", grade: "Class 6", type: "Chapter Notes", date: "01 Sep 2026", icon: "√x", bg: "#2563eb", details: "Place value charts, estimation rules, natural numbers, properties of whole numbers." },
    { id: "6-m-rn", title: "Class 6 Mathematics - Revision Notes (Playing with Numbers)", subject: "Mathematics", chapter: "Chapter 3 & 4", grade: "Class 6", type: "Revision Notes", date: "02 Sep 2026", icon: "√x", bg: "#2563eb", details: "Factors, multiples, divisibility tests (2 to 11), HCF, and LCM quick review." },
    { id: "6-m-hn", title: "Class 6 Mathematics - Handwritten Notes (Fractions & Algebra)", subject: "Mathematics", chapter: "Chapter 7 & 11", grade: "Class 6", type: "Handwritten Notes", date: "03 Sep 2026", icon: "√x", bg: "#2563eb", details: "Student handwritten flashcards and shortcuts for fraction addition and decimal conversions." },
    { id: "6-m-iq", title: "Class 6 Mathematics - Important Questions", subject: "Mathematics", chapter: "Full Syllabus", grade: "Class 6", type: "Important Questions", date: "04 Sep 2026", icon: "√x", bg: "#2563eb", details: "Important word problems on integers, mensuration, and ratio proportion." },

    { id: "6-s-cn", title: "Class 6 Science - Chapter Notes (Curiosity World of Science)", subject: "Science", chapter: "Chapter 1 & 2", grade: "Class 6", type: "Chapter Notes", date: "01 Sep 2026", icon: "🔬", bg: "#10b981", details: "Introduction to scientific inquiry, observation, habitats, plant and animal diversity around us." },
    { id: "6-s-rn", title: "Class 6 Science - Revision Notes (Magnets & Motion)", subject: "Science", chapter: "Chapter 4 & 5", grade: "Class 6", type: "Revision Notes", date: "02 Sep 2026", icon: "🔬", bg: "#10b981", details: "Magnetic materials, poles of a magnet, standard units of measurement, and types of motion." },
    { id: "6-s-hn", title: "Class 6 Science - Handwritten Notes (Water & Separation)", subject: "Science", chapter: "Chapter 8 & 9", grade: "Class 6", type: "Handwritten Notes", date: "03 Sep 2026", icon: "🔬", bg: "#10b981", details: "Evaporation, condensation, water cycle, handpicking, sedimentation, and filtration diagrams." },
    { id: "6-s-iq", title: "Class 6 Science - Important Questions", subject: "Science", chapter: "Full Syllabus", grade: "Class 6", type: "Important Questions", date: "04 Sep 2026", icon: "🔬", bg: "#10b981", details: "Crucial questions on balanced diet, magnet poles, and separation techniques." },

    { id: "6-t-cn", title: "Class 6 Telugu - Chapter Notes (Amma Odi & Trupti)", subject: "Telugu", chapter: "Lesson 1 & 2", grade: "Class 6", type: "Chapter Notes", date: "01 Sep 2026", icon: "🪶", bg: "#0284c7", details: "అమ్మ ఒడి గేయం మరియు తృప్తి కథానిక భావాలు, పదజార్థాలు మరియు ప్రశ్న జవాబులు." },
    { id: "6-t-rn", title: "Class 6 Telugu - Revision Notes (Shataka Madhurima)", subject: "Telugu", chapter: "Lesson 6", grade: "Class 6", type: "Revision Notes", date: "02 Sep 2026", icon: "🪶", bg: "#0284c7", details: "శతక పద్యాల భావాలు మరియు నైతిక విలువల సారాంశం." },
    { id: "6-t-hn", title: "Class 6 Telugu - Handwritten Notes (Vyakaran)", subject: "Telugu", chapter: "Vyakaran", grade: "Class 6", type: "Handwritten Notes", date: "03 Sep 2026", icon: "🪶", bg: "#0284c7", details: "వర్ణమాల, అచ్చులు-హల్లులు, భాషాభాగాలు మరియు ప్రకృతి-వికృతులు हस्तलिखित नोट्स।" },
    { id: "6-t-iq", title: "Class 6 Telugu - Important Questions", subject: "Telugu", chapter: "Full Syllabus", grade: "Class 6", type: "Important Questions", date: "04 Sep 2026", icon: "🪶", bg: "#0284c7", details: "ముఖ్యమైన పద్య భావాలు మరియు వ్యాసరూప ప్రశ్న జవాబులు." },

    { id: "6-e-cn", title: "Class 6 English - Chapter Notes (Honeysuckle Unit 1)", subject: "English", chapter: "Unit 1", grade: "Class 6", type: "Chapter Notes", date: "01 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Detailed summary of Who Did Patrick's Homework? and accompanying poem A House, A Home." },
    { id: "6-e-rn", title: "Class 6 English - Revision Notes (Grammar & Tenses)", subject: "English", chapter: "Grammar", grade: "Class 6", type: "Revision Notes", date: "02 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Nouns, pronouns, verbs, tenses, and formal/informal letter writing formats." },
    { id: "6-e-hn", title: "Class 6 English - Handwritten Notes (Space Journey)", subject: "English", chapter: "Unit 4", grade: "Class 6", type: "Handwritten Notes", date: "03 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Handwritten summary notes on An Indian-American Woman in Space: Kalpana Chawla." },
    { id: "6-e-iq", title: "Class 6 English - Important Questions", subject: "English", chapter: "Full Syllabus", grade: "Class 6", type: "Important Questions", date: "04 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Important questions and answers from Honeysuckle reader and supplementary." },

    { id: "6-h-cn", title: "Hindi Vasant - Chapter Notes (Vah Chidiya Jo & Bachpan)", subject: "Hindi", chapter: "पाठ 1 व 2", grade: "Class 6", type: "Chapter Notes", date: "02 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "'वह चिड़िया जो' कविता और कृष्णा सोबती के संस्मरण का सारांश।" },
    { id: "6-h-rn", title: "Hindi Vasant - Revision Notes", subject: "Hindi", chapter: "व्याकरण", grade: "Class 6", type: "Revision Notes", date: "03 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "संज्ञा, सर्वनाम, विशेषण और पत्र लेखन के नियम।" },
    { id: "6-h-hn", title: "Hindi - Handwritten Notes", subject: "Hindi", chapter: "शब्दार्थ", grade: "Class 6", type: "Handwritten Notes", date: "04 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "महत्वपूर्ण शब्दार्थ और मुहावरे हस्तलिखित।" },
    { id: "6-h-iq", title: "Hindi - Important Questions", subject: "Hindi", chapter: "सप्रीम पाठ्यक्रम", grade: "Class 6", type: "Important Questions", date: "05 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "परीक्षा की दृष्टि से महत्वपूर्ण प्रश्न और उत्तर।" },

    { id: "6-ss-cn", title: "Social Science - Chapter Notes (Locating Places on Earth)", subject: "Social Science", chapter: "Chapter 1 & 2", grade: "Class 6", type: "Chapter Notes", date: "04 Sep 2026", icon: "🌐", bg: "#ea580c", details: "Concepts of latitudes, longitudes, hemispheres, tracking global timelines, oceans, and continents." },
    { id: "6-ss-rn", title: "Social Science - Revision Notes", subject: "Social Science", chapter: "Full Syllabus", grade: "Class 6", type: "Revision Notes", date: "05 Sep 2026", icon: "🌐", bg: "#ea580c", details: "Quick revision notes on grassroots democracy and economic activities." },
    { id: "6-ss-hn", title: "Social Science - Handwritten Notes (Indus Valley)", subject: "Social Science", chapter: "Chapter 6", grade: "Class 6", type: "Handwritten Notes", date: "06 Sep 2026", icon: "🌐", bg: "#ea580c", details: "Handwritten notes on the beginnings of Indian civilisation and Harappan architecture." },
    { id: "6-ss-iq", title: "Social Science - Important Questions", subject: "Social Science", chapter: "Full Syllabus", grade: "Class 6", type: "Important Questions", date: "07 Sep 2026", icon: "🌐", bg: "#ea580c", details: "Important map work and civics questions." },

    { id: "6-cb-cn", title: "Computer Basics - Chapter Notes (Introduction to Computers)", subject: "Computer Basics", chapter: "Chapter 1 & 2", grade: "Class 6", type: "Chapter Notes", date: "05 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Hardware & software fundamentals, input/output devices, and operating system basics." },
    { id: "6-cb-rn", title: "Computer Basics - Revision Notes (MS Word)", subject: "Computer Basics", chapter: "Chapter 3", grade: "Class 6", type: "Revision Notes", date: "06 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Summary of text formatting tools, creating documents, uploading and saving files in MS Word." },
    { id: "6-cb-hn", title: "Computer Basics - Handwritten Notes (Shortcuts)", subject: "Computer Basics", chapter: "Shortcuts & Tools", grade: "Class 6", type: "Handwritten Notes", date: "07 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Handwritten keyboard shortcuts, folder management, and digital safety tips." },
    { id: "6-cb-iq", title: "Computer Basics - Important Questions", subject: "Computer Basics", chapter: "Full Syllabus", grade: "Class 6", type: "Important Questions", date: "08 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Important objective questions on computer fundamentals and MS Office." },


    // ==================== CLASS 7 ====================
    { id: "7-m-cn", title: "Class 7 Mathematics - Chapter Notes (Integers & Fractions)", subject: "Mathematics", chapter: "Chapter 1 & 2", grade: "Class 7", type: "Chapter Notes", date: "02 Sep 2026", icon: "√x", bg: "#2563eb", details: "Properties of integers, multiplication/division of integers, fraction multiplication, and decimal operations." },
    { id: "7-m-rn", title: "Class 7 Mathematics - Revision Notes", subject: "Mathematics", chapter: "Chapter 3 & 4", grade: "Class 7", type: "Revision Notes", date: "03 Sep 2026", icon: "√x", bg: "#2563eb", details: "Simple equations and lines and angles revision summary." },
    { id: "7-m-hn", title: "Class 7 Mathematics - Handwritten Notes", subject: "Mathematics", chapter: "Chapter 5 & 6", grade: "Class 7", type: "Handwritten Notes", date: "04 Sep 2026", icon: "√x", bg: "#2563eb", details: "Triangles and integer calculations handwritten steps." },
    { id: "7-m-iq", title: "Class 7 Mathematics - Important Questions", subject: "Mathematics", chapter: "Full Syllabus", grade: "Class 7", type: "Important Questions", date: "05 Sep 2026", icon: "√x", bg: "#2563eb", details: "Important practice problems on simple equations, lines and angles, and triangles." },

    { id: "7-s-cn", title: "Class 7 Science - Chapter Notes (Nutrition in Plants)", subject: "Science", chapter: "Chapter 1 & 2", grade: "Class 7", type: "Chapter Notes", date: "02 Sep 2026", icon: "🔬", bg: "#10b981", details: "Autotrophic and heterotrophic nutrition, photosynthesis, digestion in humans." },
    { id: "7-s-rn", title: "Class 7 Science - Revision Notes (Light & Heat)", subject: "Science", chapter: "Chapter 8 & 9", grade: "Class 7", type: "Revision Notes", date: "03 Sep 2026", icon: "🔬", bg: "#10b981", details: "Summary notes on mirrors, lenses, temperature, and climatic changes." },
    { id: "7-s-hn", title: "Class 7 Science - Handwritten Notes", subject: "Science", chapter: "Chapter 4", grade: "Class 7", type: "Handwritten Notes", date: "04 Sep 2026", icon: "🔬", bg: "#10b981", details: "Handwritten experiments on heat transfer and circuits." },
    { id: "7-s-iq", title: "Class 7 Science - Important Questions", subject: "Science", chapter: "Full Syllabus", grade: "Class 7", type: "Important Questions", date: "05 Sep 2026", icon: "🔬", bg: "#10b981", details: "Exam model paper with objective and subjective questions." },

    { id: "7-t-cn", title: "Class 7 Telugu - Chapter Notes (Aksharam)", subject: "Telugu", chapter: "Lesson 1", grade: "Class 7", type: "Chapter Notes", date: "02 Sep 2026", icon: "🪶", bg: "#0284c7", details: "అక్షరం పాఠ్యభాగ సారాంశం మరియు భావాలు." },
    { id: "7-t-rn", title: "Class 7 Telugu - Revision Notes", subject: "Telugu", chapter: "Vyakaran", grade: "Class 7", type: "Revision Notes", date: "03 Sep 2026", icon: "🪶", bg: "#0284c7", details: "సంధులు మరియు సమాసాలు రివిజన్ నోట్స్." },
    { id: "7-t-hn", title: "Class 7 Telugu - Handwritten Notes", subject: "Telugu", chapter: "Padyaalu", grade: "Class 7", type: "Handwritten Notes", date: "04 Sep 2026", icon: "🪶", bg: "#0284c7", details: "పద్య భావాలు हस्तलिखित नोट्स।" },
    { id: "7-t-iq", title: "Class 7 Telugu - Important Questions", subject: "Telugu", chapter: "Full Syllabus", grade: "Class 7", type: "Important Questions", date: "05 Sep 2026", icon: "🪶", bg: "#0284c7", details: "ముఖ్యమైన ప్రశ్నలు మరియు జవాబులు." },

    { id: "7-e-cn", title: "Class 7 English - Chapter Notes", subject: "English", chapter: "Unit 1", grade: "Class 7", type: "Chapter Notes", date: "02 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Detailed notes on Our World Through English unit 1 prose and poem." },
    { id: "7-e-rn", title: "Class 7 English - Revision Notes", subject: "English", chapter: "Grammar", grade: "Class 7", type: "Revision Notes", date: "03 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Degrees of comparison and modal auxiliaries review." },
    { id: "7-e-hn", title: "Class 7 English - Handwritten Notes", subject: "English", chapter: "Unit 2", grade: "Class 7", type: "Handwritten Notes", date: "04 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Summary notes on C.V. Raman handwritten." },
    { id: "7-e-iq", title: "Class 7 English - Important Questions", subject: "English", chapter: "Full Syllabus", grade: "Class 7", type: "Important Questions", date: "05 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Comprehension test and writing questions." },

    { id: "7-h-cn", title: "Class 7 Hindi - Chapter Notes", subject: "Hindi", chapter: "पाठ 1", grade: "Class 7", type: "Chapter Notes", date: "02 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "ज्ञान हम को दीजिए कविता और शब्दार्थ।" },
    { id: "7-h-rn", title: "Class 7 Hindi - Revision Notes", subject: "Hindi", chapter: "व्याकरण", grade: "Class 7", type: "Revision Notes", date: "03 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "संज्ञा, वचन, विलोम शब्द।" },
    { id: "7-h-hn", title: "Class 7 Hindi - Handwritten Notes", subject: "Hindi", chapter: "लेखन", grade: "Class 7", type: "Handwritten Notes", date: "04 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "पत्र लेखन प्रारूप हस्तलिखित।" },
    { id: "7-h-iq", title: "Class 7 Hindi - Important Questions", subject: "Hindi", chapter: "संपूर्ण पाठ्यक्रम", grade: "Class 7", type: "Important Questions", date: "05 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "महत्वपूर्ण प्रश्न और उत्तर।" },

    { id: "7-ss-cn", title: "Class 7 Social Science - Chapter Notes", subject: "Social Science", chapter: "Semester 1", grade: "Class 7", type: "Chapter Notes", date: "03 Sep 2026", icon: "🌐", bg: "#ea580c", details: "Solar system, interior of the earth, and Kakatiya dynasty architectural achievements." },
    { id: "7-ss-rn", title: "Class 7 Social Science - Revision Notes", subject: "Social Science", chapter: "Semester 2", grade: "Class 7", type: "Revision Notes", date: "04 Sep 2026", icon: "🌐", bg: "#ea580c", details: "State assembly and district administration summary." },
    { id: "7-ss-hn", title: "Class 7 Social Science - Handwritten Notes", subject: "Social Science", chapter: "Maps", grade: "Class 7", type: "Handwritten Notes", date: "05 Sep 2026", icon: "🌐", bg: "#ea580c", details: "Handwritten map reading symbols and directions." },
    { id: "7-ss-iq", title: "Class 7 Social Science - Important Questions", subject: "Social Science", chapter: "Full Syllabus", grade: "Class 7", type: "Important Questions", date: "06 Sep 2026", icon: "🌐", bg: "#ea580c", details: "Important questions on medieval kingdoms." },

    { id: "7-cb-cn", title: "Class 7 Computer Basics - Chapter Notes", subject: "Computer Basics", chapter: "Chapter 1", grade: "Class 7", type: "Chapter Notes", date: "05 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Computer hardware components and software classification notes." },
    { id: "7-cb-rn", title: "Class 7 Computer Basics - Revision Notes", subject: "Computer Basics", chapter: "Chapter 2", grade: "Class 7", type: "Revision Notes", date: "06 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Spreadsheets and presentation tools quick summary." },
    { id: "7-cb-hn", title: "Class 7 Computer Basics - Handwritten Notes", subject: "Computer Basics", chapter: "Chapter 3", grade: "Class 7", type: "Handwritten Notes", date: "07 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Internet safety and email basics handwritten notes." },
    { id: "7-cb-iq", title: "Class 7 Computer Basics - Important Questions", subject: "Computer Basics", chapter: "Full Syllabus", grade: "Class 7", type: "Important Questions", date: "08 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Important questions on internet protocols and software." },


    // ==================== CLASS 8 ====================
    { id: "8-m-cn", title: "Class 8 Mathematics - Chapter Notes (Rational Numbers)", subject: "Mathematics", chapter: "Chapter 1 & 2", grade: "Class 8", type: "Chapter Notes", date: "01 Sep 2026", icon: "√x", bg: "#2563eb", details: "Properties of rational numbers, number line representation, and solving linear equations." },
    { id: "8-m-rn", title: "Class 8 Mathematics - Revision Notes (Quadrilaterals)", subject: "Mathematics", chapter: "Chapter 3 & 4", grade: "Class 8", type: "Revision Notes", date: "02 Sep 2026", icon: "√x", bg: "#2563eb", details: "Polygon classification, angle sum properties, and data handling frequency distribution." },
    { id: "8-m-hn", title: "Class 8 Mathematics - Handwritten Notes (Squares & Cubes)", subject: "Mathematics", chapter: "Chapter 5 & 6", grade: "Class 8", type: "Handwritten Notes", date: "03 Sep 2026", icon: "√x", bg: "#2563eb", details: "Handwritten square root factorization and cube root tricks." },
    { id: "8-m-iq", title: "Class 8 Mathematics - Important Questions", subject: "Mathematics", chapter: "Full Syllabus", grade: "Class 8", type: "Important Questions", date: "04 Sep 2026", icon: "√x", bg: "#2563eb", details: "Important exam questions on compound interest, mensuration, and factorization." },

    { id: "8-ps-cn", title: "Class 8 Physical Science - Chapter Notes (Force & Pressure)", subject: "Physical Science", chapter: "Chapter 1 & 2", grade: "Class 8", type: "Chapter Notes", date: "02 Sep 2026", icon: "⚗️", bg: "#059669", details: "Contact/non-contact forces, atmospheric pressure, and friction reduction methods." },
    { id: "8-ps-rn", title: "Class 8 Physical Science - Revision Notes", subject: "Physical Science", chapter: "Chapter 3 & 4", grade: "Class 8", type: "Revision Notes", date: "03 Sep 2026", icon: "⚗️", bg: "#059669", details: "Coal and petroleum refining, combustion conditions, and flame structure." },
    { id: "8-ps-hn", title: "Class 8 Physical Science - Handwritten Notes", subject: "Physical Science", chapter: "Chapter 5 & 6", grade: "Class 8", type: "Handwritten Notes", date: "04 Sep 2026", icon: "⚗️", bg: "#059669", details: "Metals reactivity series and synthetic fibers handwritten flowcharts." },
    { id: "8-ps-iq", title: "Class 8 Physical Science - Important Questions", subject: "Physical Science", chapter: "Full Syllabus", grade: "Class 8", type: "Important Questions", date: "05 Sep 2026", icon: "⚗️", bg: "#059669", details: "Important questions on sound waves and electroplating." },

    { id: "8-b-cn", title: "Class 8 Biology - Chapter Notes (Cell Structure)", subject: "Biology", chapter: "Chapter 1 & 2", grade: "Class 8", type: "Chapter Notes", date: "02 Sep 2026", icon: "🧬", bg: "#10B981", details: "Cell organelle functions, plant vs animal cells, and friendly/harmful microorganisms." },
    { id: "8-b-rn", title: "Class 8 Biology - Revision Notes", subject: "Biology", chapter: "Chapter 3 & 4", grade: "Class 8", type: "Revision Notes", date: "03 Sep 2026", icon: "🧬", bg: "#10B981", details: "Crop production management and animal reproduction summary." },
    { id: "8-b-hn", title: "Class 8 Biology - Handwritten Notes", subject: "Biology", chapter: "Chapter 5", grade: "Class 8", type: "Handwritten Notes", date: "04 Sep 2026", icon: "🧬", bg: "#10B981", details: "Adolescence hormonal changes handwritten mind maps." },
    { id: "8-b-iq", title: "Class 8 Biology - Important Questions", subject: "Biology", chapter: "Full Syllabus", grade: "Class 8", type: "Important Questions", date: "05 Sep 2026", icon: "🧬", bg: "#10B981", details: "Important questions on biodiversity and conservation." },

    { id: "8-t-cn", title: "Class 8 Telugu - Chapter Notes (Andhra Vaibhavam)", subject: "Telugu", chapter: "Lesson 1", grade: "Class 8", type: "Chapter Notes", date: "01 Sep 2026", icon: "🪶", bg: "#0284c7", details: "ఆంధ్ర వైభవం గేయం మరియు సాంస్కృతిక వారసత్వ విశేషాలు." },
    { id: "8-t-rn", title: "Class 8 Telugu - Revision Notes", subject: "Telugu", chapter: "Vyakaran", grade: "Class 8", type: "Revision Notes", date: "02 Sep 2026", icon: "🪶", bg: "#0284c7", details: "సంధులు మరియు సమాసాలు రివిజన్." },
    { id: "8-t-hn", title: "Class 8 Telugu - Handwritten Notes", subject: "Telugu", chapter: "Shatakam", grade: "Class 8", type: "Handwritten Notes", date: "03 Sep 2026", icon: "🪶", bg: "#0284c7", details: "శతక పద్యాల భావాలు हस्तलिखित नोट्स।" },
    { id: "8-t-iq", title: "Class 8 Telugu - Important Questions", subject: "Telugu", chapter: "Full Syllabus", grade: "Class 8", type: "Important Questions", date: "04 Sep 2026", icon: "🪶", bg: "#0284c7", details: "ముఖ్యమైన ప్రశ్నలు మరియు జవాబులు." },

    { id: "8-e-cn", title: "Class 8 English - Chapter Notes", subject: "English", chapter: "Unit 1", grade: "Class 8", type: "Chapter Notes", date: "01 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Summary and question answers for The Best Christmas Present in the World." },
    { id: "8-e-rn", title: "Class 8 English - Revision Notes", subject: "English", chapter: "Grammar", grade: "Class 8", type: "Revision Notes", date: "02 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Active/Passive voice and reported speech review." },
    { id: "8-e-hn", title: "Class 8 English - Handwritten Notes", subject: "English", chapter: "Unit 2", grade: "Class 8", type: "Handwritten Notes", date: "03 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Handwritten summary of The Tsunami." },
    { id: "8-e-iq", title: "Class 8 English - Important Questions", subject: "English", chapter: "Full Syllabus", grade: "Class 8", type: "Important Questions", date: "04 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Important questions from Honeydew reader." },

    { id: "8-h-cn", title: "Class 8 Hindi - Chapter Notes", subject: "Hindi", chapter: "पाठ 1", grade: "Class 8", type: "Chapter Notes", date: "01 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "'हम होंगे कामयाब' गीत का सार और शब्दार्थ।" },
    { id: "8-h-rn", title: "Class 8 Hindi - Revision Notes", subject: "Hindi", chapter: "व्याकरण", grade: "Class 8", type: "Revision Notes", date: "02 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "संज्ञा, सर्वनाम और विशेषण।" },
    { id: "8-h-hn", title: "Class 8 Hindi - Handwritten Notes", subject: "Hindi", chapter: "लेखन", grade: "Class 8", type: "Handwritten Notes", date: "03 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "अनुच्छेद और पत्र लेखन हस्तलिखित।" },
    { id: "8-h-iq", title: "Class 8 Hindi - Important Questions", subject: "Hindi", chapter: "संपूर्ण पाठ्यक्रम", grade: "Class 8", type: "Important Questions", date: "04 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "महत्वपूर्ण प्रश्न और उत्तर।" },

    { id: "8-his-cn", title: "Class 8 History - Chapter Notes (How, When and Where)", subject: "History", chapter: "Chapter 1", grade: "Class 8", type: "Chapter Notes", date: "04 Sep 2026", icon: "🏛️", bg: "#D97706", details: "Colonial records, periodisation in history, and surveying administrative mapping." },
    { id: "8-his-rn", title: "Class 8 History - Revision Notes", subject: "History", chapter: "Chapter 5", grade: "Class 8", type: "Revision Notes", date: "05 Sep 2026", icon: "🏛️", bg: "#D97706", details: "Revolt of 1857 causes, outspread, and aftermath summary." },
    { id: "8-his-hn", title: "Class 8 History - Handwritten Notes", subject: "History", chapter: "Chapter 3", grade: "Class 8", type: "Handwritten Notes", date: "06 Sep 2026", icon: "🏛️", bg: "#D97706", details: "Handwritten notes on ruling the countryside and permanent settlement." },
    { id: "8-his-iq", title: "Class 8 History - Important Questions", subject: "History", chapter: "Full Syllabus", grade: "Class 8", type: "Important Questions", date: "07 Sep 2026", icon: "🏛️", bg: "#D97706", details: "Important questions on tribal rebellions and the national movement." },

    { id: "8-geo-cn", title: "Class 8 Geography - Chapter Notes (Resources)", subject: "Geography", chapter: "Chapter 1", grade: "Class 8", type: "Chapter Notes", date: "05 Sep 2026", icon: "🌍", bg: "#0D9488", details: "Types of resources, resource planning in India, and sustainable development." },
    { id: "8-geo-rn", title: "Class 8 Geography - Revision Notes", subject: "Geography", chapter: "Chapter 2 & 3", grade: "Class 8", type: "Revision Notes", date: "06 Sep 2026", icon: "🌍", bg: "#0D9488", details: "Land, soil, water resources, and agricultural farming types summary." },
    { id: "8-geo-hn", title: "Class 8 Geography - Handwritten Notes", subject: "Geography", chapter: "Chapter 4", grade: "Class 8", type: "Handwritten Notes", date: "07 Sep 2026", icon: "🌍", bg: "#0D9488", details: "Handwritten classification of industries and location factors." },
    { id: "8-geo-iq", title: "Class 8 Geography - Important Questions", subject: "Geography", chapter: "Full Syllabus", grade: "Class 8", type: "Important Questions", date: "08 Sep 2026", icon: "🌍", bg: "#0D9488", details: "Important questions on population distribution and agriculture." },

    { id: "8-civ-cn", title: "Class 8 Civics - Chapter Notes (The Constitution)", subject: "Civics", chapter: "Chapter 1", grade: "Class 8", type: "Chapter Notes", date: "06 Sep 2026", icon: "⚖️", bg: "#4F46E5", details: "Key features of the Indian Constitution, fundamental rights, and secularism." },
    { id: "8-civ-rn", title: "Class 8 Civics - Revision Notes", subject: "Civics", chapter: "Chapter 3 & 4", grade: "Class 8", type: "Revision Notes", date: "07 Sep 2026", icon: "⚖️", bg: "#4F46E5", details: "Parliament functioning, law making, and judiciary structure summary." },
    { id: "8-civ-hn", title: "Class 8 Civics - Handwritten Notes", subject: "Civics", chapter: "Chapter 5", grade: "Class 8", type: "Handwritten Notes", date: "08 Sep 2026", icon: "⚖️", bg: "#4F46E5", details: "Handwritten notes on understanding marginalisation and Adivasi rights." },
    { id: "8-civ-iq", title: "Class 8 Civics - Important Questions", subject: "Civics", chapter: "Full Syllabus", grade: "Class 8", type: "Important Questions", date: "09 Sep 2026", icon: "⚖️", bg: "#4F46E5", details: "Important questions on public facilities and social justice." },

    { id: "8-cb-cn", title: "Class 8 Computer Basics - Chapter Notes", subject: "Computer Basics", chapter: "Chapter 1", grade: "Class 8", type: "Chapter Notes", date: "05 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Operating systems, utility software, and computer security basics." },
    { id: "8-cb-rn", title: "Class 8 Computer Basics - Revision Notes", subject: "Computer Basics", chapter: "Chapter 2", grade: "Class 8", type: "Revision Notes", date: "06 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Database management basics and html introduction." },
    { id: "8-cb-hn", title: "Class 8 Computer Basics - Handwritten Notes", subject: "Computer Basics", chapter: "Chapter 3", grade: "Class 8", type: "Handwritten Notes", date: "07 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Handwritten web browsing and cyber ethics notes." },
    { id: "8-cb-iq", title: "Class 8 Computer Basics - Important Questions", subject: "Computer Basics", chapter: "Full Syllabus", grade: "Class 8", type: "Important Questions", date: "08 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Important objective questions on computer networks." },


    // ==================== CLASS 9 ====================
    { id: "9-m-cn", title: "Class 9 Mathematics - Chapter Notes (Number Systems)", subject: "Mathematics", chapter: "Chapter 1 & 2", grade: "Class 9", type: "Chapter Notes", date: "01 Sep 2026", icon: "√x", bg: "#2563eb", details: "Irrational numbers, real numbers decimal expansions, polynomial zeroes, Factor Theorem, and algebraic identities." },
    { id: "9-m-rn", title: "Class 9 Mathematics - Revision Notes", subject: "Mathematics", chapter: "Chapter 3 & 4", grade: "Class 9", type: "Revision Notes", date: "02 Sep 2026", icon: "√x", bg: "#2563eb", details: "Coordinate geometry Cartesian plane plotting and linear equations in two variables." },
    { id: "9-m-hn", title: "Class 9 Mathematics - Handwritten Notes", subject: "Mathematics", chapter: "Chapter 6 & 7", grade: "Class 9", type: "Handwritten Notes", date: "03 Sep 2026", icon: "√x", bg: "#2563eb", details: "Handwritten geometry proofs for lines, angles, and triangle congruence criteria." },
    { id: "9-m-iq", title: "Class 9 Mathematics - Important Questions", subject: "Mathematics", chapter: "Full Syllabus", grade: "Class 9", type: "Important Questions", date: "04 Sep 2026", icon: "√x", bg: "#2563eb", details: "Important practice problems on surface areas, volumes, and statistics histograms." },

    { id: "9-ps-cn", title: "Class 9 Physical Science - Chapter Notes (Matter)", subject: "Physical Science", chapter: "Chapter 1 & 3", grade: "Class 9", type: "Chapter Notes", date: "03 Sep 2026", icon: "⚗️", bg: "#059669", details: "States of matter, evaporation, laws of chemical combination, Dalton's atomic theory, and molecular masses." },
    { id: "9-ps-rn", title: "Class 9 Physical Science - Revision Notes", subject: "Physical Science", chapter: "Chapter 4 & 5", grade: "Class 9", type: "Revision Notes", date: "04 Sep 2026", icon: "⚗️", bg: "#059669", details: "Atomic structure, isotopes, valency, and motion along a straight line summary." },
    { id: "9-ps-hn", title: "Class 9 Physical Science - Handwritten Notes", subject: "Physical Science", chapter: "Chapter 6 & 7", grade: "Class 9", type: "Handwritten Notes", date: "05 Sep 2026", icon: "⚗️", bg: "#059669", details: "Handwritten derivations of Newton's laws of motion and universal law of gravitation." },
    { id: "9-ps-iq", title: "Class 9 Physical Science - Important Questions", subject: "Physical Science", chapter: "Full Syllabus", grade: "Class 9", type: "Important Questions", date: "06 Sep 2026", icon: "⚗️", bg: "#059669", details: "Important numerical problems on work, energy, power, and sound echoes." },

    { id: "9-b-cn", title: "Class 9 Biology - Chapter Notes (The Cell)", subject: "Biology", chapter: "Chapter 10", grade: "Class 9", type: "Chapter Notes", date: "02 Sep 2026", icon: "🧬", bg: "#10B981", details: "Plasma membrane, cell wall, nucleus, cytoplasm, and functions of mitochondria and plastids." },
    { id: "9-b-rn", title: "Class 9 Biology - Revision Notes", subject: "Biology", chapter: "Chapter 11", grade: "Class 9", type: "Revision Notes", date: "03 Sep 2026", icon: "🧬", bg: "#10B981", details: "Plant tissues (meristematic and permanent) vs animal tissues summary." },
    { id: "9-b-hn", title: "Class 9 Biology - Handwritten Notes", subject: "Biology", chapter: "Chapter 12", grade: "Class 9", type: "Handwritten Notes", date: "04 Sep 2026", icon: "🧬", bg: "#10B981", details: "Handwritten notes on crop variety improvement and animal husbandry." },
    { id: "9-b-iq", title: "Class 9 Biology - Important Questions", subject: "Biology", chapter: "Full Syllabus", grade: "Class 9", type: "Important Questions", date: "05 Sep 2026", icon: "🧬", bg: "#10B981", details: "Important diagram-based questions on cell organelles." },

    { id: "9-t-cn", title: "Class 9 Telugu - Chapter Notes (Dharmabodha)", subject: "Telugu", chapter: "Poetry 1", grade: "Class 9", type: "Chapter Notes", date: "01 Sep 2026", icon: "🪶", bg: "#0284c7", details: "ధర్మబోధ పాఠ్యభాగ సారాంశం, పద్యాలు మరియు భావాలు." },
    { id: "9-t-rn", title: "Class 9 Telugu - Revision Notes", subject: "Telugu", chapter: "Vyakaran", grade: "Class 9", type: "Revision Notes", date: "02 Sep 2026", icon: "🪶", bg: "#0284c7", details: "సంధులు, సమాసాలు మరియు ఛందస్సు రివిజన్." },
    { id: "9-t-hn", title: "Class 9 Telugu - Handwritten Notes", subject: "Telugu", chapter: "Prose", grade: "Class 9", type: "Handwritten Notes", date: "03 Sep 2026", icon: "🪶", bg: "#0284c7", details: "గద్య భాగ పాఠాల ముఖ్యమైన అంశాలు हस्तलिखित नोट्स।" },
    { id: "9-t-iq", title: "Class 9 Telugu - Important Questions", subject: "Telugu", chapter: "Full Syllabus", grade: "Class 9", type: "Important Questions", date: "04 Sep 2026", icon: "🪶", bg: "#0284c7", details: "ముఖ్యమైన ప్రశ్నలు మరియు జవాబులు." },

    { id: "9-e-cn", title: "Class 9 English - Chapter Notes (Beehive Unit 1)", subject: "English", chapter: "Unit 1", grade: "Class 9", type: "Chapter Notes", date: "01 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Detailed prose summary and poem analysis for The Fun They Had & The Road Not Taken." },
    { id: "9-e-rn", title: "Class 9 English - Revision Notes", subject: "English", chapter: "Grammar", grade: "Class 9", type: "Revision Notes", date: "02 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Modals, tenses, reported speech, and active/passive voice review." },
    { id: "9-e-hn", title: "Class 9 English - Handwritten Notes", subject: "English", chapter: "Moments", grade: "Class 9", type: "Handwritten Notes", date: "03 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Handwritten character sketches from Moments supplementary reader." },
    { id: "9-e-iq", title: "Class 9 English - Important Questions", subject: "English", chapter: "Full Syllabus", grade: "Class 9", type: "Important Questions", date: "04 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Important extract-based and long answer questions." },

    { id: "9-h-cn", title: "Class 9 Hindi - Chapter Notes", subject: "Hindi", chapter: "पाठ 1", grade: "Class 9", type: "Chapter Notes", date: "01 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "कविता का सार, भावार्थ और महत्वपूर्ण प्रश्न उत्तर।" },
    { id: "9-h-rn", title: "Class 9 Hindi - Revision Notes", subject: "Hindi", chapter: "व्याकरण", grade: "Class 9", type: "Revision Notes", date: "02 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "कारक, उपसर्ग, प्रत्यय और समास।" },
    { id: "9-h-hn", title: "Class 9 Hindi - Handwritten Notes", subject: "Hindi", chapter: "लेखन", grade: "Class 9", type: "Handwritten Notes", date: "03 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "पत्र लेखन और अनुच्छेद हस्तलिखित।" },
    { id: "9-h-iq", title: "Class 9 Hindi - Important Questions", subject: "Hindi", chapter: "संपूर्ण पाठ्यक्रम", grade: "Class 9", type: "Important Questions", date: "04 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "महत्वपूर्ण प्रश्न और उत्तर।" },

    { id: "9-his-cn", title: "Class 9 History - Chapter Notes (French Revolution)", subject: "History", chapter: "Chapter 1", grade: "Class 9", type: "Chapter Notes", date: "04 Sep 2026", icon: "🏛️", bg: "#D97706", details: "18th century French society, outbreak of revolution, and declaration of rights." },
    { id: "9-his-rn", title: "Class 9 History - Revision Notes", subject: "History", chapter: "Chapter 2 & 3", grade: "Class 9", type: "Revision Notes", date: "05 Sep 2026", icon: "🏛️", bg: "#D97706", details: "Russian Revolution and rise of Nazism summary." },
    { id: "9-his-hn", title: "Class 9 History - Handwritten Notes", subject: "History", chapter: "Chapter 4", grade: "Class 9", type: "Handwritten Notes", date: "06 Sep 2026", icon: "🏛️", bg: "#D97706", details: "Handwritten notes on forest society and colonialism." },
    { id: "9-his-iq", title: "Class 9 History - Important Questions", subject: "History", chapter: "Full Syllabus", grade: "Class 9", type: "Important Questions", date: "07 Sep 2026", icon: "🏛️", bg: "#D97706", details: "Important questions on pastoralists and global history." },

    { id: "9-geo-cn", title: "Class 9 Geography - Chapter Notes (Size and Location)", subject: "Geography", chapter: "Chapter 1", grade: "Class 9", type: "Chapter Notes", date: "05 Sep 2026", icon: "🌍", bg: "#0D9488", details: "India's latitudinal and longitudinal extent, standard meridian, and neighbors." },
    { id: "9-geo-rn", title: "Class 9 Geography - Revision Notes", subject: "Geography", chapter: "Chapter 2 & 3", grade: "Class 9", type: "Revision Notes", date: "06 Sep 2026", icon: "🌍", bg: "#0D9488", details: "Physical features of India and drainage river systems summary." },
    { id: "9-geo-hn", title: "Class 9 Geography - Handwritten Notes", subject: "Geography", chapter: "Chapter 4", grade: "Class 9", type: "Handwritten Notes", date: "07 Sep 2026", icon: "🌍", bg: "#0D9488", details: "Handwritten notes on climate controls and monsoon." },
    { id: "9-geo-iq", title: "Class 9 Geography - Important Questions", subject: "Geography", chapter: "Full Syllabus", grade: "Class 9", type: "Important Questions", date: "08 Sep 2026", icon: "🌍", bg: "#0D9488", details: "Important questions on natural vegetation and population." },

    { id: "9-civ-cn", title: "Class 9 Civics - Chapter Notes (What is Democracy?)", subject: "Civics", chapter: "Chapter 1", grade: "Class 9", type: "Chapter Notes", date: "03 Sep 2026", icon: "⚖️", bg: "#4F46E5", details: "Defining democracy, features of a democratic state, and broader merits/demerits." },
    { id: "9-civ-rn", title: "Class 9 Civics - Revision Notes", subject: "Civics", chapter: "Chapter 2 & 3", grade: "Class 9", type: "Revision Notes", date: "04 Sep 2026", icon: "⚖️", bg: "#4F46E5", details: "Constitutional design and electoral politics summary." },
    { id: "9-civ-hn", title: "Class 9 Civics - Handwritten Notes", subject: "Civics", chapter: "Chapter 4", grade: "Class 9", type: "Handwritten Notes", date: "05 Sep 2026", icon: "⚖️", bg: "#4F46E5", details: "Handwritten notes on working of institutions and parliament." },
    { id: "9-civ-iq", title: "Class 9 Civics - Important Questions", subject: "Civics", chapter: "Full Syllabus", grade: "Class 9", type: "Important Questions", date: "06 Sep 2026", icon: "⚖️", bg: "#4F46E5", details: "Important questions on democratic rights." },

    { id: "9-eco-cn", title: "Class 9 Economics - Chapter Notes (Village Palampur)", subject: "Economics", chapter: "Chapter 1", grade: "Class 9", type: "Chapter Notes", date: "06 Sep 2026", icon: "📈", bg: "#EA580C", details: "Factors of production, farming activities, and non-farming activities in Palampur." },
    { id: "9-eco-rn", title: "Class 9 Economics - Revision Notes", subject: "Economics", chapter: "Chapter 2 & 3", grade: "Class 9", type: "Revision Notes", date: "07 Sep 2026", icon: "📈", bg: "#EA580C", details: "People as resource and poverty as a challenge summary." },
    { id: "9-eco-hn", title: "Class 9 Economics - Handwritten Notes", subject: "Economics", chapter: "Chapter 4", grade: "Class 9", type: "Handwritten Notes", date: "08 Sep 2026", icon: "📈", bg: "#EA580C", details: "Handwritten notes on food security in India." },
    { id: "9-eco-iq", title: "Class 9 Economics - Important Questions", subject: "Economics", chapter: "Full Syllabus", grade: "Class 9", type: "Important Questions", date: "09 Sep 2026", icon: "📈", bg: "#EA580C", details: "Important questions on unemployment and poverty alleviation." },

    { id: "9-cb-cn", title: "Class 9 Computer Basics - Chapter Notes", subject: "Computer Basics", chapter: "Chapter 1", grade: "Class 9", type: "Chapter Notes", date: "05 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Computer architecture, memory units, and software types." },
    { id: "9-cb-rn", title: "Class 9 Computer Basics - Revision Notes", subject: "Computer Basics", chapter: "Chapter 2", grade: "Class 9", type: "Revision Notes", date: "06 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Python basics and programming logic overview." },
    { id: "9-cb-hn", title: "Class 9 Computer Basics - Handwritten Notes", subject: "Computer Basics", chapter: "Chapter 3", grade: "Class 9", type: "Handwritten Notes", date: "07 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Handwritten flowcharts and pseudocode examples." },
    { id: "9-cb-iq", title: "Class 9 Computer Basics - Important Questions", subject: "Computer Basics", chapter: "Full Syllabus", grade: "Class 9", type: "Important Questions", date: "08 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Important questions on programming syntax and hardware." },


    // ==================== CLASS 10 ====================
    { id: "10-m-cn", title: "Class 10 Mathematics - Chapter Notes (Real Numbers & Trig)", subject: "Mathematics", chapter: "Chapter 1 & 8", grade: "Class 10", type: "Chapter Notes", date: "01 Sep 2026", icon: "√x", bg: "#2563eb", details: "Fundamental Theorem of Arithmetic, irrationality proofs, trigonometric ratios, and fundamental identities." },
    { id: "10-m-rn", title: "Class 10 Mathematics - Revision Notes (AP & Statistics)", subject: "Mathematics", chapter: "Chapter 5 & 13", grade: "Class 10", type: "Revision Notes", date: "03 Sep 2026", icon: "√x", bg: "#2563eb", details: "Arithmetic Progressions formulas (nth term & sum) along with Mean, Median, Mode shortcuts." },
    { id: "10-m-hn", title: "Class 10 Mathematics - Handwritten Formulas Compendium", subject: "Mathematics", chapter: "Full Syllabus", grade: "Class 10", type: "Handwritten Notes", date: "05 Sep 2026", icon: "√x", bg: "#2563eb", details: "Complete handwritten formula cheat sheet for board exam quick revision." },
    { id: "10-m-iq", title: "Class 10 Mathematics - Important Questions", subject: "Mathematics", chapter: "Full Syllabus", grade: "Class 10", type: "Important Questions", date: "06 Sep 2026", icon: "√x", bg: "#2563eb", details: "Most expected board exam questions on quadratic equations, triangles, and circles." },

    { id: "10-ps-cn", title: "Class 10 Physical Science - Chapter Notes (Reactions & Light)", subject: "Physical Science", chapter: "Chapter 1 & 5", grade: "Class 10", type: "Chapter Notes", date: "02 Sep 2026", icon: "⚗️", bg: "#059669", details: "Balancing chemical equations, oxidation-reduction, spherical mirrors, lens formulas, and refractive index." },
    { id: "10-ps-rn", title: "Class 10 Physical Science - Revision Notes", subject: "Physical Science", chapter: "Chapter 2 & 4", grade: "Class 10", type: "Revision Notes", date: "04 Sep 2026", icon: "⚗️", bg: "#059669", details: "Acids, bases, salts, and carbon compounds revision summary." },
    { id: "10-ps-hn", title: "Class 10 Physical Science - Handwritten Notes", subject: "Physical Science", chapter: "Chapter 7 & 8", grade: "Class 10", type: "Handwritten Notes", date: "05 Sep 2026", icon: "⚗️", bg: "#059669", details: "Handwritten circuit diagrams and magnetic field lines flowcharts." },
    { id: "10-ps-iq", title: "Class 10 Physical Science - Important Questions", subject: "Physical Science", chapter: "Full Syllabus", grade: "Class 10", type: "Important Questions", date: "06 Sep 2026", icon: "⚗️", bg: "#059669", details: "Important numerical problems on Ohm's law and lens power." },

    { id: "10-b-cn", title: "Class 10 Biology - Chapter Notes (Life Processes)", subject: "Biology", chapter: "Chapter 1", grade: "Class 10", type: "Chapter Notes", date: "03 Sep 2026", icon: "🧬", bg: "#10B981", details: "Nutrition, respiration, transportation, and excretion cycles in humans and plants." },
    { id: "10-b-rn", title: "Class 10 Biology - Revision Notes", subject: "Biology", chapter: "Chapter 4", grade: "Class 10", type: "Revision Notes", date: "05 Sep 2026", icon: "🧬", bg: "#10B981", details: "Mendel's laws of inheritance, monohybrid/dihybrid crosses, and sex determination." },
    { id: "10-b-hn", title: "Class 10 Biology - Handwritten Notes", subject: "Biology", chapter: "Chapter 2 & 3", grade: "Class 10", type: "Handwritten Notes", date: "04 Sep 2026", icon: "🧬", bg: "#10B981", details: "Handwritten diagrams of human brain, reflex arc, and reproductive systems." },
    { id: "10-b-iq", title: "Class 10 Biology - Important Questions", subject: "Biology", chapter: "Full Syllabus", grade: "Class 10", type: "Important Questions", date: "06 Sep 2026", icon: "🧬", bg: "#10B981", details: "Important board exam questions on nephrons and plant hormones." },

    { id: "10-t-cn", title: "Class 10 Telugu - Chapter Notes (Maatrubhavana)", subject: "Telugu", chapter: "Poetry 1", grade: "Class 10", type: "Chapter Notes", date: "01 Sep 2026", icon: "🪶", bg: "#0284c7", details: "మాతృభావన పాఠ్యభాగ భావాలు, ప్రతిపదార్థాలు మరియు వ్యాసరూప ప్రశ్నలు." },
    { id: "10-t-rn", title: "Class 10 Telugu - Revision Notes", subject: "Telugu", chapter: "Vyakaran", grade: "Class 10", type: "Revision Notes", date: "02 Sep 2026", icon: "🪶", bg: "#0284c7", details: "సంధులు, సమాసాలు, అలంకారాలు మరియు ఛందస్సు బోర్డు పరీక్ష రివిజన్." },
    { id: "10-t-hn", title: "Class 10 Telugu - Handwritten Notes", subject: "Telugu", chapter: "Prose", grade: "Class 10", type: "Handwritten Notes", date: "03 Sep 2026", icon: "🪶", bg: "#0284c7", details: "గద్య భాగ పాఠాల ముఖ్యమైన భావాలు हस्तलिखित नोट्स।" },
    { id: "10-t-iq", title: "Class 10 Telugu - Important Questions", subject: "Telugu", chapter: "Full Syllabus", grade: "Class 10", type: "Important Questions", date: "04 Sep 2026", icon: "🪶", bg: "#0284c7", details: "పబ్లిక్ పరీక్షల కొరకు ముఖ్యమైన పద్యాలు మరియు ప్రశ్నలు." },

    { id: "10-e-cn", title: "Class 10 English - Chapter Notes (First Flight Unit 1)", subject: "English", chapter: "Unit 1", grade: "Class 10", type: "Chapter Notes", date: "01 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "A Letter to God prose summary, dust of snow poem analysis, and important questions." },
    { id: "10-e-rn", title: "Class 10 English - Revision Notes", subject: "English", chapter: "Grammar & Writing", grade: "Class 10", type: "Revision Notes", date: "02 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Tenses, reported speech, analytical paragraphs, and formal letter formats." },
    { id: "10-e-hn", title: "Class 10 English - Handwritten Notes", subject: "English", chapter: "Footprints", grade: "Class 10", type: "Handwritten Notes", date: "03 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Handwritten character sketches from Footprints Without Feet." },
    { id: "10-e-iq", title: "Class 10 English - Important Questions", subject: "English", chapter: "Full Syllabus", grade: "Class 10", type: "Important Questions", date: "04 Sep 2026", icon: "📖", bg: "#8b5cf6", details: "Important extract-based and long answer questions for board exams." },

    { id: "10-h-cn", title: "Class 10 Hindi - Chapter Notes (Sparsh)", subject: "Hindi", chapter: "पाठ 1", grade: "Class 10", type: "Chapter Notes", date: "01 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "सुमित्रानंदन पंत की कविता 'बरसते बदल' का सार और महत्वपूर्ण प्रश्न।" },
    { id: "10-h-rn", title: "Class 10 Hindi - Revision Notes", subject: "Hindi", chapter: "व्याकरण", grade: "Class 10", type: "Revision Notes", date: "02 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "पदबंध, वाक्य भेद, समास और मुहावरे।" },
    { id: "10-h-hn", title: "Class 10 Hindi - Handwritten Notes", subject: "Hindi", chapter: "लेखन", grade: "Class 10", type: "Handwritten Notes", date: "03 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "औपचारिक पत्र और अनुच्छेद लेखन हस्तलिखित।" },
    { id: "10-h-iq", title: "Class 10 Hindi - Important Questions", subject: "Hindi", chapter: "संपूर्ण पाठ्यक्रम", grade: "Class 10", type: "Important Questions", date: "04 Sep 2026", icon: "🇮🇳", bg: "#e11d48", details: "बोर्ड परीक्षा हेतु महत्वपूर्ण प्रश्न।" },

    { id: "10-his-cn", title: "Class 10 History - Chapter Notes (Nationalism in Europe)", subject: "History", chapter: "Chapter 1", grade: "Class 10", type: "Chapter Notes", date: "04 Sep 2026", icon: "🏛️", bg: "#D97706", details: "French Revolution, the making of nationalism in Europe, and unification of Italy and Germany." },
    { id: "10-his-rn", title: "Class 10 History - Revision Notes", subject: "History", chapter: "Chapter 2 & 5", grade: "Class 10", type: "Revision Notes", date: "05 Sep 2026", icon: "🏛️", bg: "#D97706", details: "Nationalism in India and Print Culture summary." },
    { id: "10-his-hn", title: "Class 10 History - Handwritten Notes", subject: "History", chapter: "Chapter 3", grade: "Class 10", type: "Handwritten Notes", date: "06 Sep 2026", icon: "🏛️", bg: "#D97706", details: "Handwritten notes on the making of a global world." },
    { id: "10-his-iq", title: "Class 10 History - Important Questions", subject: "History", chapter: "Full Syllabus", grade: "Class 10", type: "Important Questions", date: "07 Sep 2026", icon: "🏛️", bg: "#D97706", details: "Important questions on non-cooperation movement and industrialisation." },

    { id: "10-geo-cn", title: "Class 10 Geography - Chapter Notes (Resources)", subject: "Geography", chapter: "Chapter 1", grade: "Class 10", type: "Chapter Notes", date: "05 Sep 2026", icon: "🌍", bg: "#0D9488", details: "Types of resources, resource planning in India, soil classification, and soil erosion conservation." },
    { id: "10-geo-rn", title: "Class 10 Geography - Revision Notes", subject: "Geography", chapter: "Chapter 3 & 4", grade: "Class 10", type: "Revision Notes", date: "06 Sep 2026", icon: "🌍", bg: "#0D9488", details: "Water resources, multi-purpose projects, and agriculture crop patterns summary." },
    { id: "10-geo-hn", title: "Class 10 Geography - Handwritten Notes", subject: "Geography", chapter: "Chapter 6", grade: "Class 10", type: "Handwritten Notes", date: "07 Sep 2026", icon: "🌍", bg: "#0D9488", details: "Handwritten notes on manufacturing industries and industrial pollution." },
    { id: "10-geo-iq", title: "Class 10 Geography - Important Questions", subject: "Geography", chapter: "Full Syllabus", grade: "Class 10", type: "Important Questions", date: "08 Sep 2026", icon: "🌍", bg: "#0D9488", details: "Important questions on lifelines of national economy and minerals." },

    { id: "10-civ-cn", title: "Class 10 Civics - Chapter Notes (Power Sharing)", subject: "Civics", chapter: "Chapter 1", grade: "Class 10", type: "Chapter Notes", date: "06 Sep 2026", icon: "⚖️", bg: "#4F46E5", details: "Case studies of Belgium and Sri Lanka, majoritarianism, and why power-sharing is desirable." },
    { id: "10-civ-rn", title: "Class 10 Civics - Revision Notes", subject: "Civics", chapter: "Chapter 2 & 4", grade: "Class 10", type: "Revision Notes", date: "07 Sep 2026", icon: "⚖️", bg: "#4F46E5", details: "Federalism and political parties summary notes." },
    { id: "10-civ-hn", title: "Class 10 Civics - Handwritten Notes", subject: "Civics", chapter: "Chapter 3", grade: "Class 10", type: "Handwritten Notes", date: "08 Sep 2026", icon: "⚖️", bg: "#4F46E5", details: "Handwritten notes on gender, religion, and caste in politics." },
    { id: "10-civ-iq", title: "Class 10 Civics - Important Questions", subject: "Civics", chapter: "Full Syllabus", grade: "Class 10", type: "Important Questions", date: "09 Sep 2026", icon: "⚖️", bg: "#4F46E5", details: "Important questions on outcomes of democracy." },

    { id: "10-eco-cn", title: "Class 10 Economics - Chapter Notes (Development)", subject: "Economics", chapter: "Chapter 1", grade: "Class 10", type: "Chapter Notes", date: "07 Sep 2026", icon: "📈", bg: "#EA580C", details: "Per capita income, public facilities, and sustainable development goals." },
    { id: "10-eco-rn", title: "Class 10 Economics - Revision Notes", subject: "Economics", chapter: "Chapter 2 & 3", grade: "Class 10", type: "Revision Notes", date: "08 Sep 2026", icon: "📈", bg: "#EA580C", details: "Sectors of Indian economy and money and credit summary." },
    { id: "10-eco-hn", title: "Class 10 Economics - Handwritten Notes", subject: "Economics", chapter: "Chapter 4", grade: "Class 10", type: "Handwritten Notes", date: "09 Sep 2026", icon: "📈", bg: "#EA580C", details: "Handwritten notes on globalization and the Indian economy." },
    { id: "10-eco-iq", title: "Class 10 Economics - Important Questions", subject: "Economics", chapter: "Full Syllabus", grade: "Class 10", type: "Important Questions", date: "10 Sep 2026", icon: "📈", bg: "#EA580C", details: "Important questions on consumer rights and formal credit sectors." },

    { id: "10-cb-cn", title: "Class 10 Computer Basics - Chapter Notes", subject: "Computer Basics", chapter: "Chapter 1", grade: "Class 10", type: "Chapter Notes", date: "05 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Internet security, HTML advanced tags, and database management." },
    { id: "10-cb-rn", title: "Class 10 Computer Basics - Revision Notes", subject: "Computer Basics", chapter: "Chapter 2", grade: "Class 10", type: "Revision Notes", date: "06 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Cyber ethics and IT applications summary notes." },
    { id: "10-cb-hn", title: "Class 10 Computer Basics - Handwritten Notes", subject: "Computer Basics", chapter: "Chapter 3", grade: "Class 10", type: "Handwritten Notes", date: "07 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Handwritten network topologies and protocol diagrams." },
    { id: "10-cb-iq", title: "Class 10 Computer Basics - Important Questions", subject: "Computer Basics", chapter: "Full Syllabus", grade: "Class 10", type: "Important Questions", date: "08 Sep 2026", icon: "💻", bg: "#06b6d4", details: "Important questions on internet safety and web development." }
  ];

  const filteredNotes = notesData.filter((item) => {
    const matchesClass = item.grade.toLowerCase() === selectedClass.toLowerCase();
    const matchesSubject =
      selectedSubject === "All Notes" ||
      item.subject.toLowerCase() === selectedSubject.toLowerCase();
    const matchesType =
      selectedType === "All Types" ||
      item.type.toLowerCase() === selectedType.toLowerCase();
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.subject.toLowerCase().includes(q) ||
      item.chapter.toLowerCase().includes(q) ||
      item.details.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q);

    return matchesClass && matchesSubject && matchesType && matchesSearch;
  });

  const handleDownload = (note) => {
    try {
      downloadStudyPdf({
        filename: `${note.grade}_${note.subject}_${note.type}_${note.title}`
          .replace(/[^a-zA-Z0-9_-]/g, "_") + ".pdf",
        title: note.title,
        subtitle: `${note.subject} • ${note.chapter} • ${note.type}`,
        metadata: [
          { label: "Class", value: note.grade },
          { label: "Subject", value: note.subject },
          { label: "Chapter", value: note.chapter },
          { label: "Category", value: note.type },
          { label: "Uploaded", value: note.date },
          { label: "Student", value: studentName },
          { label: "School", value: schoolName }
        ],
        sections: buildStudyPdfSections({
          subject: note.subject,
          title: note.title,
          summary: note.details
        })
      });
    } catch (error) {
      console.error("Could not create study notes PDF", error);
      window.alert("The PDF could not be created. Please try downloading it again.");
    }
  };

  return (
    <div className="ps-root">
      <style>{`
        .ps-root { display: flex; min-height: 100vh; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #F8FAFC; color: #0F172A; width: 100%; }
        .ps-root * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .ps-sidebar { width: 240px; background-color: #081B38; color: #94A3B8; display: flex; flex-direction: column; position: fixed; top: 0; bottom: 0; left: 0; z-index: 120; }
        .ps-brand { display: flex; align-items: center; gap: 12px; padding: 22px 20px 18px 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); }
        .ps-brand-badge { width: 38px; height: 38px; border-radius: 10px; background: #1E60F8; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #ffffff; }
        .ps-brand-text h2 { font-size: 15px; font-weight: 700; color: #FFFFFF; }
        .ps-brand-text p { font-size: 12px; color: #60A5FA; }
        .ps-nav { flex: 1; overflow-y: auto; padding: 14px 10px; display: flex; flex-direction: column; gap: 2px; }
        .ps-nav-item { display: flex; align-items: center; justify-content: space-between; width: 100%; background: transparent; border: none; color: #94A3B8; padding: 10px 14px; border-radius: 9px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; text-align: left; text-decoration: none; }
        .ps-nav-item:hover { background-color: rgba(255, 255, 255, 0.06); color: #FFFFFF; }
        .ps-nav-item.active { background-color: #1E60F8; color: #FFFFFF; font-weight: 600; }
        .ps-nav-item-left { display: flex; align-items: center; gap: 12px; }
        .ps-logout-wrap { padding: 14px 14px 18px 14px; border-top: 1px solid rgba(255, 255, 255, 0.07); }
        .ps-logout-btn { width: 100%; display: flex; align-items: center; gap: 12px; background: transparent; border: none; color: #EF4444; padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }

        .ps-main { flex: 1; margin-left: 240px; display: flex; flex-direction: column; min-width: 0; padding-bottom: 50px; }
        .ps-header { position: sticky; top: 0; z-index: 100; background: #FFFFFF; height: 64px; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; }
        .ps-header-left { display: flex; align-items: center; gap: 14px; }
        .ps-header-titles h1 { font-size: 15.5px; font-weight: 700; color: #0F172A; }
        .ps-header-titles p { font-size: 11.5px; color: #64748B; }
        .ps-header-right { display: flex; align-items: center; gap: 20px; }
        .ps-profile-chip { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .ps-avatar-circle { width: 38px; height: 38px; border-radius: 50%; background: #FED7AA; display: flex; align-items: center; justify-content: center; font-size: 18px; }
        .ps-profile-text strong { display: block; font-size: 13px; font-weight: 700; color: #0F172A; }
        .ps-profile-text span { font-size: 11px; color: #64748B; }

        .ps-content { padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; }

        .nt-banner { background: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between; }
        .nt-banner-left { display: flex; align-items: center; gap: 16px; }
        .nt-banner-icon { width: 46px; height: 46px; border-radius: 12px; background: #0284C7; display: flex; align-items: center; justify-content: center; font-size: 22px; color: #fff; }
        .nt-banner-art { font-size: 34px; }

        .nt-pills-row { display: flex; align-items: center; gap: 10px; overflow-x: auto; padding-bottom: 2px; }
        .nt-pill-btn { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 10px; padding: 8px 18px; font-size: 13px; font-weight: 600; color: #475569; cursor: pointer; display: flex; align-items: center; gap: 8px; white-space: nowrap; transition: all 0.15s; }
        .nt-pill-btn.active { background: #1E60F8; color: #FFFFFF; border-color: #1E60F8; box-shadow: 0 4px 10px rgba(30, 96, 248, 0.25); }

        .nt-layout { display: grid; grid-template-columns: 240px 1fr; gap: 22px; align-items: start; }

        .nt-filter-box { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 16px; margin-bottom: 18px; }
        .nt-filter-title { font-size: 13.5px; font-weight: 700; color: #0F172A; margin-bottom: 12px; }
        .nt-filter-item { display: flex; align-items: center; gap: 10px; width: 100%; padding: 9px 12px; border-radius: 8px; border: 1px solid transparent; background: transparent; font-size: 12.5px; font-weight: 600; color: #475569; cursor: pointer; text-align: left; transition: all 0.15s; margin-bottom: 4px; }
        .nt-filter-item:hover { background: #F1F5F9; color: #0F172A; }
        .nt-filter-item.active { background: #EFF6FF; border-color: #BFDBFE; color: #1E60F8; font-weight: 700; }

        .nt-list-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .nt-list-header h3 { font-size: 16px; font-weight: 700; color: #0F172A; }
        .nt-search-wrap { position: relative; width: 290px; }
        .nt-search-input { width: 100%; padding: 8px 14px 8px 34px; border-radius: 9px; border: 1px solid #CBD5E1; font-size: 12.5px; outline: none; background: #FFFFFF; transition: border-color 0.15s; }
        .nt-search-input:focus { border-color: #1E60F8; }
        .nt-search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); font-size: 13px; color: #94A3B8; }
        .nt-search-clear { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 14px; color: #94A3B8; cursor: pointer; }

        .nt-cards-col { display: flex; flex-direction: column; gap: 12px; }
        .nt-card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; transition: transform 0.15s, box-shadow 0.15s; }
        .nt-card:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(0, 0, 0, 0.03); border-color: #CBD5E1; }
        .nt-card-left { display: flex; align-items: center; gap: 16px; }
        .nt-sub-icon-box { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 17px; font-weight: 800; flex-shrink: 0; }
        .nt-card-info h4 { font-size: 15px; font-weight: 700; color: #0F172A; margin-bottom: 3px; }
        .nt-card-info p { font-size: 12px; color: #64748B; margin-bottom: 6px; }
        .nt-tag-row { display: flex; align-items: center; gap: 12px; font-size: 11px; color: #64748B; }
        .nt-type-badge { background: #F1F5F9; color: #334155; padding: 2px 8px; border-radius: 5px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; }
        .nt-download-btn { background: #1E60F8; color: #FFFFFF; border: none; padding: 8px 18px; border-radius: 8px; font-size: 12.5px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.15s; }
        .nt-download-btn:hover { background: #1D4ED8; }

        @media (max-width: 1024px) {
          .ps-sidebar { display: none; }
          .ps-main { margin-left: 0; }
          .nt-layout { grid-template-columns: 1fr; }
        }
      `}</style>

      <StudentSidebar onLogout={handleLogout} />

      <main className="ps-main">
        <header className="ps-header">
          <div className="ps-header-left">
            <div className="ps-header-titles">
              <h1>Digital Learning Platform</h1>
              <p>Online Learning Portal for Students</p>
            </div>
          </div>
          <div className="ps-header-right">
            <div className="ps-profile-chip" onClick={() => navigate("/settings")}>
              <div className="ps-avatar-circle">👩‍🎓</div>
              <div className="ps-profile-text">
                <strong>{studentName}</strong>
                <span>Class {studentClass}th</span>
              </div>
            </div>
          </div>
        </header>

        <div className="ps-content">
          <div className="nt-banner">
            <div className="nt-banner-left">
              <div className="nt-banner-icon">📝</div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700 }}>Notes ({selectedClass})</h2>
                <p style={{ fontSize: 12, color: "#64748B" }}>
                  Access Handwritten Notes, Chapter Notes, Revision Notes, and Important Questions for {selectedClass}.
                </p>
              </div>
            </div>
            <div className="nt-banner-art">📚✏️</div>
          </div>

          <div className="nt-pills-row">
            {subjectPills.map((sub) => (
              <button
                key={sub.label}
                className={`nt-pill-btn ${selectedSubject === sub.label ? "active" : ""}`}
                onClick={() => setSelectedSubject(sub.label)}
              >
                <span>{sub.icon}</span>
                <span>{sub.label}</span>
              </button>
            ))}
          </div>

          <div className="nt-layout">
            <aside>
              <div className="nt-filter-box">
                <h4 className="nt-filter-title">Filter by Class</h4>
                {classFilters.map((grade) => (
                  <button
                    key={grade}
                    className={`nt-filter-item ${selectedClass === grade ? "active" : ""}`}
                    onClick={() => setSelectedClass(grade)}
                  >
                    <span>📑</span>
                    <span>{grade}</span>
                  </button>
                ))}
              </div>

              <div className="nt-filter-box">
                <h4 className="nt-filter-title">Filter by Type</h4>
                {typeFilters.map((t) => (
                  <button
                    key={t.label}
                    className={`nt-filter-item ${selectedType === t.label ? "active" : ""}`}
                    onClick={() => setSelectedType(t.label)}
                  >
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </aside>

            <div>
              <div className="nt-list-header">
                <h3>Notes List ({filteredNotes.length})</h3>

                <div className="nt-search-wrap">
                  <span className="nt-search-icon">🔍</span>
                  <input
                    type="text"
                    className="nt-search-input"
                    placeholder="Search notes, chapters, topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="nt-search-clear"
                      onClick={() => setSearchQuery("")}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <div className="nt-cards-col">
                {filteredNotes.map((note) => (
                  <div className="nt-card" key={note.id}>
                    <div className="nt-card-left">
                      <div className="nt-sub-icon-box" style={{ background: note.bg }}>
                        {note.icon}
                      </div>
                      <div className="nt-card-info">
                        <h4>{note.title}</h4>
                        <p>{note.subject} • {note.chapter} ({note.grade})</p>
                        <div className="nt-tag-row">
                          <span className="nt-type-badge">
                            📄 {note.type}
                          </span>
                          <span>📅 {note.date}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      className="nt-download-btn"
                      onClick={() => handleDownload(note)}
                    >
                      <span>⬇</span>
                      <span>Download</span>
                    </button>
                  </div>
                ))}

                {filteredNotes.length === 0 && (
                  <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 14, padding: "34px", textAlign: "center" }}>
                    <span style={{ fontSize: 32, display: "block", marginBottom: 8 }}>🔍</span>
                    <strong style={{ fontSize: 14, color: "#0F172A", display: "block" }}>No notes found</strong>
                    <p style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                      No notes available for {selectedClass} • {selectedSubject} • {selectedType}.
                    </p>
                    <button
                      style={{ marginTop: 14, background: "#1E60F8", color: "#FFF", border: "none", padding: "8px 18px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                      onClick={() => {
                        setSelectedClass(`Class ${studentClass}`);
                        setSelectedSubject("All Notes");
                        setSelectedType("All Types");
                        setSearchQuery("");
                      }}
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}