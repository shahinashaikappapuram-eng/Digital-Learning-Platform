import React, { useState, useEffect } from "react";
import StudentSidebar from "../components/StudentSidebar";
import { useNavigate } from "react-router-dom";
import { downloadStudyPdf } from "../utils/studyPdf";

export default function DigitalLibrary() {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("All");
  const [showAllSubjects, setShowAllSubjects] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [selectedClass, setSelectedClass] = useState("6");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const rawUser = JSON.parse(localStorage.getItem("current_user") || "null");
        if (rawUser) {
          setCurrentUser(rawUser);
          const userClass = String(rawUser.class || localStorage.getItem("studentClass") || "6");
          setSelectedClass(userClass);
        } else {
          const storedClass = localStorage.getItem("studentClass") || "6";
          setSelectedClass(String(storedClass));
        }
      } catch {
        setSelectedClass("6");
      }
    }
  }, []);

  const studentName =
    currentUser?.name ||
    (typeof window !== "undefined"
      ? localStorage.getItem("studentName") || "Student"
      : "Student");

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


  // Complete Library Database for Classes 6 to 10
  const libraryDatabase = {
    "6": {
      subjects: [
        { name: "Mathematics", icon: "√x", bg: "#2563eb" },
        { name: "Science", icon: "🧪", bg: "#10b981" },
        { name: "Telugu", icon: "🪶", bg: "#0284c7" },
        { name: "English", icon: "📖", bg: "#8b5cf6" },
        { name: "Social Science", icon: "🌐", bg: "#ea580c" },
        { name: "Hindi", icon: "अ", bg: "#ec4899" },
        { name: "Computer Basics", icon: "💻", bg: "#06b6d4" },
      ],
      resources: [
        { id: "6-m1", title: "Mathematics Textbook - Class 6 (Knowing Our Numbers)", subject: "Mathematics", type: "Textbooks", sub: "Mathematics • Textbook", size: "PDF • 5.2 MB", badgeColor: "#2563eb", content: "Class 6 Mathematics Chapter 1 & 2 Syllabus: Knowing Our Numbers, Number Systems, Whole Numbers, and Number Line Properties." },
        { id: "6-m2", title: "Playing with Numbers & Geometry Reference Guide", subject: "Mathematics", type: "Reference Books", sub: "Mathematics • Reference Book", size: "PDF • 3.4 MB", badgeColor: "#2563eb", content: "Class 6 Mathematics Chapter 3 & 4: Factors, Multiples, Prime/Composite numbers, HCF, LCM, and Basic Geometrical Ideas." },
        { id: "6-m3", title: "Fractions, Decimals & Algebra Study Notes", subject: "Mathematics", type: "Study Materials", sub: "Mathematics • Study Material", size: "PDF • 4.1 MB", badgeColor: "#2563eb", content: "Class 6 Mathematics Chapter 7, 8 & 11: Fractions, Decimals representation, and Introduction to Algebra." },
        { id: "6-m4", title: "Mathematics Half-Yearly Model Question Paper", subject: "Mathematics", type: "Question Papers", sub: "Mathematics • Question Paper", size: "PDF • 1.8 MB", badgeColor: "#2563eb", content: "Class 6 Mathematics Sample Question Paper with step-by-step scoring breakdown and answer keys." },

        { id: "6-s1", title: "Science Textbook - Class 6 (The Wonderful World of Science)", subject: "Science", type: "Textbooks", sub: "Science • Textbook", size: "PDF • 6.0 MB", badgeColor: "#10b981", content: "Class 6 Science Curiosity Syllabus: The Wonderful World of Science, Diversity in the Living World, and Mindful Eating." },
        { id: "6-s2", title: "Exploring Magnets & Motion Reference Book", subject: "Science", type: "Reference Books", sub: "Science • Reference Book", size: "PDF • 4.2 MB", badgeColor: "#10b981", content: "Class 6 Science Physics Chapter: Exploring Magnets, Measurement of Length, and Types of Motion." },
        { id: "6-s3", title: "States of Water & Separation Methods Study Material", subject: "Science", type: "Study Materials", sub: "Science • Study Material", size: "PDF • 3.5 MB", badgeColor: "#10b981", content: "Class 6 Science Chemistry Chapter: A Journey through States of Water and Methods of Separation in Everyday Life." },
        { id: "6-s4", title: "Science Practice Question Paper", subject: "Science", type: "Question Papers", sub: "Science • Question Paper", size: "PDF • 2.1 MB", badgeColor: "#10b981", content: "Class 6 Science Practice Question Paper covering Living Creatures, Nature's Treasures, and Beyond Earth." },

        { id: "6-t1", title: "Telugu Baata 6th Class Textbook (Full Syllabus)", subject: "Telugu", type: "Textbooks", sub: "Telugu • Textbook", size: "PDF • 7.1 MB", badgeColor: "#0284c7", content: "AP Class 6 Telugu Baata: Amma Odi (అమ్మ ఒడి), Trupti (తృప్తి), and Samayasphoorthi." },
        { id: "6-t2", title: "Telugu Vyakaran & Padya Bhaagam Reference", subject: "Telugu", type: "Reference Books", sub: "Telugu • Reference Book", size: "PDF • 3.9 MB", badgeColor: "#0284c7", content: "Class 6 Telugu Grammar, Shataka Madhurima (శతక మధురిమ), Pothana Baalyamu, and Uduta Saayam." },
        { id: "6-t3", title: "Telugu Poem Explanations & Study Notes", subject: "Telugu", type: "Study Materials", sub: "Telugu • Study Material", size: "PDF • 2.8 MB", badgeColor: "#0284c7", content: "Detailed meanings and summaries for Mana Mahaniyulu, Harivillu, and prose lessons." },
        { id: "6-t4", title: "Telugu Model Exam Question Paper", subject: "Telugu", type: "Question Papers", sub: "Telugu • Question Paper", size: "PDF • 1.5 MB", badgeColor: "#0284c7", content: "Class 6 Telugu Model Assessment Paper with reading comprehension and creative writing tasks." },

        { id: "6-e1", title: "English Textbook - Honeysuckle Class 6", subject: "English", type: "Textbooks", sub: "English • Textbook", size: "PDF • 5.5 MB", badgeColor: "#8b5cf6", content: "Class 6 English Honeysuckle: Unit 1 to Unit 5 including Who Did Patrick's Homework?, Taro's Reward, and Kalpana Chawla." },
        { id: "6-e2", title: "English Grammar & Composition Reference", subject: "English", type: "Reference Books", sub: "English • Reference Book", size: "PDF • 3.0 MB", badgeColor: "#8b5cf6", content: "Essential grammar rules: Tenses, Articles, Parts of Speech, and informal letter writing." },
        { id: "6-e3", title: "English Poem Summaries & Vocabulary Notes", subject: "English", type: "Study Materials", sub: "English • Study Material", size: "PDF • 2.2 MB", badgeColor: "#8b5cf6", content: "Detailed poetic devices and chapter summaries for Unit 6 to Unit 10 (The Banyan Tree, Fair Play)." },
        { id: "6-e4", title: "English Term Exam Question Paper", subject: "English", type: "Question Papers", sub: "English • Question Paper", size: "PDF • 1.6 MB", badgeColor: "#8b5cf6", content: "Class 6 English Examination Paper with section-wise grammar and writing practice." },

        { id: "6-so1", title: "Social Science Textbook - Exploring Society: India and Beyond", subject: "Social Science", type: "Textbooks", sub: "Social Science • Textbook", size: "PDF • 6.8 MB", badgeColor: "#ea580c", content: "Class 6 Social Science: Locating Places on the Earth, Oceans and Continents, and Landforms and Life." },
        { id: "6-so2", title: "History & Heritage Reference Guide", subject: "Social Science", type: "Reference Books", sub: "Social Science • Reference Book", size: "PDF • 4.6 MB", badgeColor: "#ea580c", content: "Timeline and Sources of History, India That Is Bharat, and The Beginnings of Indian Civilisation." },
        { id: "6-so3", title: "Civics & Economy Study Notes", subject: "Social Science", type: "Study Materials", sub: "Social Science • Study Material", size: "PDF • 3.3 MB", badgeColor: "#ea580c", content: "Grassroots Democracy (Governance, Rural & Urban Local Government) and Economic Activities Around Us." },
        { id: "6-so4", title: "Social Science Practice Test Paper", subject: "Social Science", type: "Question Papers", sub: "Social Science • Question Paper", size: "PDF • 2.0 MB", badgeColor: "#ea580c", content: "Class 6 Social Science assessment sheet with map work and conceptual questions." },

        { id: "6-h1", title: "Hindi Textbook - Vasant Class 6", subject: "Hindi", type: "Textbooks", sub: "Hindi • Textbook", size: "PDF • 5.8 MB", badgeColor: "#ec4899", content: "Class 6 Hindi Vasant: Vah Chidiya Jo (वह चिड़िया जो), Bachpan, Nadan Dost, and Aksharon Ka Mahatva." },
        { id: "6-h2", title: "Hindi Vyakaran & Sahitya Reference Book", subject: "Hindi", type: "Reference Books", sub: "Hindi • Reference Book", size: "PDF • 3.7 MB", badgeColor: "#ec4899", content: "Hindi grammar rules, Muhavare, and poem explanations from Jhansi Ki Rani to Lokgeet." },
        { id: "6-h3", title: "Hindi Chapter Summaries Notes", subject: "Hindi", type: "Study Materials", sub: "Hindi • Study Material", size: "PDF • 2.5 MB", badgeColor: "#ec4899", content: "Quick revision notes for Vasant chapters including Aise-Aise, Ticket-Album, and Naukar." },
        { id: "6-h4", title: "Hindi Model Test Paper", subject: "Hindi", type: "Question Papers", sub: "Hindi • Question Paper", size: "PDF • 1.7 MB", badgeColor: "#ec4899", content: "Class 6 Hindi practice paper with unseen passages and grammar exercises." },

        { id: "6-c1", title: "Computer Basics Practical Handbook - Class 6", subject: "Computer Basics", type: "Textbooks", sub: "Computer Basics • Textbook", size: "PDF • 3.2 MB", badgeColor: "#06b6d4", content: "Class 6 Computer Essentials: Introduction to Computers, Hardware & Software basics, and Operating Systems." },
        { id: "6-c2", title: "MS Word & Document Editing Reference Guide", subject: "Computer Basics", type: "Reference Books", sub: "Computer Basics • Reference Book", size: "PDF • 2.9 MB", badgeColor: "#06b6d4", content: "Step-by-step instructions on creating files, formatting text, saving documents, and basic keyboard shortcuts." },
        { id: "6-c3", title: "Computer Science Quick Study Notes", subject: "Computer Basics", type: "Study Materials", sub: "Computer Basics • Study Material", size: "PDF • 2.1 MB", badgeColor: "#06b6d4", content: "Summary of input/output devices, internet safety, and digital tool usage for students." },
        { id: "6-c4", title: "Computer Practical Question Paper", subject: "Computer Basics", type: "Question Papers", sub: "Computer Basics • Question Paper", size: "PDF • 1.3 MB", badgeColor: "#06b6d4", content: "Lab assignment sheets and objective questions." }
      ]
    },
    "7": {
      subjects: [
        { name: "Mathematics", icon: "√x", bg: "#2563eb" },
        { name: "Science", icon: "🧪", bg: "#10b981" },
        { name: "Telugu", icon: "🪶", bg: "#0284c7" },
        { name: "English", icon: "📖", bg: "#8b5cf6" },
        { name: "Social Science", icon: "🌐", bg: "#ea580c" },
        { name: "Hindi", icon: "अ", bg: "#ec4899" },
      ],
      resources: [
        { id: "7-m1", title: "Mathematics Textbook - Class 7", subject: "Mathematics", type: "Textbooks", sub: "Mathematics • Textbook", size: "PDF • 5.8 MB", badgeColor: "#2563eb", content: "Class 7 Mathematics: Integers, Fractions & Decimals, Simple Equations, Lines and Angles." },
        { id: "7-m2", title: "Advanced Mathematics Practice Book", subject: "Mathematics", type: "Reference Books", sub: "Mathematics • Reference Book", size: "PDF • 4.3 MB", badgeColor: "#2563eb", content: "Problem sets on data handling, exponents, symmetry, and perimeter." },
        { id: "7-m3", title: "Algebra & Geometry Formula Notes", subject: "Mathematics", type: "Study Materials", sub: "Mathematics • Study Material", size: "PDF • 3.1 MB", badgeColor: "#2563eb", content: "Quick revision formulas for triangles, areas, and algebraic expressions." },
        { id: "7-m4", title: "Mathematics Term Exam Question Paper", subject: "Mathematics", type: "Question Papers", sub: "Mathematics • Question Paper", size: "PDF • 1.8 MB", badgeColor: "#2563eb", content: "Sample paper covering rational numbers and visualising solids." },

        { id: "7-s1", title: "General Science Textbook - Class 7", subject: "Science", type: "Textbooks", sub: "Science • Textbook", size: "PDF • 6.2 MB", badgeColor: "#10b981", content: "Class 7 Science: Food for Health, Nutrition in Organisms, Respiration & Circulation." },
        { id: "7-s2", title: "Junior Science Lab Reference Guide", subject: "Science", type: "Reference Books", sub: "Science • Reference Book", size: "PDF • 4.1 MB", badgeColor: "#10b981", content: "Experiments on heat, electricity circuits, and plant reproduction." },
        { id: "7-s3", title: "Light & Heat Study Notes", subject: "Science", type: "Study Materials", sub: "Science • Study Material", size: "PDF • 2.9 MB", badgeColor: "#10b981", content: "Summary notes on mirrors, lenses, temperature, and climatic changes." },
        { id: "7-s4", title: "Science Practice Assessment Paper", subject: "Science", type: "Question Papers", sub: "Science • Question Paper", size: "PDF • 1.9 MB", badgeColor: "#10b981", content: "Exam model paper with objective and subjective questions." },

        { id: "7-t1", title: "Telugu Baata 7th Class Textbook", subject: "Telugu", type: "Textbooks", sub: "Telugu • Textbook", size: "PDF • 6.5 MB", badgeColor: "#0284c7", content: "Class 7 Telugu: Aksharam (అక్షరం), Sirimanotsavam, Maya Kambali." },
        { id: "7-t2", title: "Telugu Vyakaran & Alankaralu Reference", subject: "Telugu", type: "Reference Books", sub: "Telugu • Reference Book", size: "PDF • 3.2 MB", badgeColor: "#0284c7", content: "Sandhulu, Samasalu, and poetic meters." },
        { id: "7-t3", title: "Telugu Lesson Summary Notes", subject: "Telugu", type: "Study Materials", sub: "Telugu • Study Material", size: "PDF • 2.3 MB", badgeColor: "#0284c7", content: "Explanations for Padya Parimalam and festivals of Andhra Pradesh." },
        { id: "7-t4", title: "Telugu Half-Yearly Question Paper", subject: "Telugu", type: "Question Papers", sub: "Telugu • Question Paper", size: "PDF • 1.5 MB", badgeColor: "#0284c7", content: "Model question paper with grammar and reading passages." },

        { id: "7-e1", title: "English Textbook - Our World Through English Class 7", subject: "English", type: "Textbooks", sub: "English • Textbook", size: "PDF • 5.4 MB", badgeColor: "#8b5cf6", content: "Class 7 English: Town Mouse and Country Mouse, C.V. Raman, Puru the Brave." },
        { id: "7-e2", title: "English Grammar & Writing Handbook", subject: "English", type: "Reference Books", sub: "English • Reference Book", size: "PDF • 3.0 MB", badgeColor: "#8b5cf6", content: "Degrees of comparison, modal auxiliaries, and formal letter formats." },
        { id: "7-e3", title: "English Vocabulary & Notes", subject: "English", type: "Study Materials", sub: "English • Study Material", size: "PDF • 2.1 MB", badgeColor: "#8b5cf6", content: "Unit-wise word meanings and supplementary story summaries." },
        { id: "7-e4", title: "English Term Exam Paper", subject: "English", type: "Question Papers", sub: "English • Question Paper", size: "PDF • 1.6 MB", badgeColor: "#8b5cf6", content: "Comprehension test and creative writing exercises." },

        { id: "7-so1", title: "Social Studies Textbook - Class 7", subject: "Social Science", type: "Textbooks", sub: "Social Science • Textbook", size: "PDF • 7.0 MB", badgeColor: "#ea580c", content: "Class 7 Social Studies: Universe and Earth, Forests, Rain and Rivers, Kakatiyas." },
        { id: "7-so2", title: "Medieval Indian History Reference Guide", subject: "Social Science", type: "Reference Books", sub: "Social Science • Reference Book", size: "PDF • 4.8 MB", badgeColor: "#ea580c", content: "Detailed studies of Kakatiya dynasty and Vijayanagara empire." },
        { id: "7-so3", title: "Civics & Geography Revision Notes", subject: "Social Science", type: "Study Materials", sub: "Social Science • Study Material", size: "PDF • 3.2 MB", badgeColor: "#ea580c", content: "State assembly law-making process and district administration notes." },
        { id: "7-so4", title: "Social Studies Question Paper", subject: "Social Science", type: "Question Papers", sub: "Social Science • Question Paper", size: "PDF • 2.0 MB", badgeColor: "#ea580c", content: "Map work and history assessment sheet." },

        { id: "7-h1", title: "Hindi Textbook - Lahar-2 Class 7", subject: "Hindi", type: "Textbooks", sub: "Hindi • Textbook", size: "PDF • 5.1 MB", badgeColor: "#ec4899", content: "Class 7 Hindi Lahar-2: Gyan Hum Ko Deejiye, Hoshiyar Kauwa." },
        { id: "7-h2", title: "Hindi Vyakaran Reference Book", subject: "Hindi", type: "Reference Books", sub: "Hindi • Reference Book", size: "PDF • 3.1 MB", badgeColor: "#ec4899", content: "Sangya, Vachan, Vilom shabd, and letter writing." },
        { id: "7-h3", title: "Hindi Chapter Summaries", subject: "Hindi", type: "Study Materials", sub: "Hindi • Study Material", size: "PDF • 2.0 MB", badgeColor: "#ec4899", content: "Quick revision notes for semester 1 and 2 lessons." },
        { id: "7-h4", title: "Hindi Practice Question Paper", subject: "Hindi", type: "Question Papers", sub: "Hindi • Question Paper", size: "PDF • 1.4 MB", badgeColor: "#ec4899", content: "Sample test paper for second language Hindi." }
      ]
    },
    "8": {
      subjects: [
        { name: "Mathematics", icon: "√x", bg: "#2563eb" },
        { name: "Physical Science", icon: "⚗️", bg: "#059669" },
        { name: "Biology", icon: "🧬", bg: "#10B981" },
        { name: "Telugu", icon: "🪶", bg: "#0284c7" },
        { name: "English", icon: "📖", bg: "#8b5cf6" },
        { name: "History", icon: "🏛️", bg: "#D97706" },
        { name: "Geography", icon: "🌍", bg: "#0D9488" },
        { name: "Civics", icon: "⚖️", bg: "#4F46E5" },
        { name: "Hindi", icon: "अ", bg: "#ec4899" },
      ],
      resources: [
        { id: "8-m1", title: "Mathematics Textbook - Class 8", subject: "Mathematics", type: "Textbooks", sub: "Mathematics • Textbook", size: "PDF • 6.1 MB", badgeColor: "#2563eb", content: "Class 8 Mathematics: Rational Numbers, Linear Equations, Quadrilaterals, Squares & Roots." },
        { id: "8-m2", title: "Advanced Algebra & Mensuration Guide", subject: "Mathematics", type: "Reference Books", sub: "Mathematics • Reference Book", size: "PDF • 4.5 MB", badgeColor: "#2563eb", content: "Detailed solutions for compound interest, factorisation, and graphs." },
        { id: "8-m3", title: "Maths Formula Sheet & Notes", subject: "Mathematics", type: "Study Materials", sub: "Mathematics • Study Material", size: "PDF • 3.0 MB", badgeColor: "#2563eb", content: "Summary of algebraic identities and mensuration formulas." },
        { id: "8-m4", title: "Mathematics Annual Exam Question Paper", subject: "Mathematics", type: "Question Papers", sub: "Mathematics • Question Paper", size: "PDF • 2.0 MB", badgeColor: "#2563eb", content: "Full syllabus exam paper with answer key." },

        { id: "8-ps1", title: "Physical Science Textbook - Class 8", subject: "Physical Science", type: "Textbooks", sub: "Physical Science • Textbook", size: "PDF • 5.3 MB", badgeColor: "#059669", content: "Class 8 Physics & Chemistry: Force and Pressure, Friction, Coal and Petroleum." },
        { id: "8-ps2", title: "Physics & Chemistry Lab Reference", subject: "Physical Science", type: "Reference Books", sub: "Physical Science • Reference Book", size: "PDF • 3.9 MB", badgeColor: "#059669", content: "Combustion experiments, electroplating, and sound wave properties." },
        { id: "8-ps3", title: "Physical Science Revision Notes", subject: "Physical Science", type: "Study Materials", sub: "Science • Study Material", size: "PDF • 2.7 MB", badgeColor: "#059669", content: "Metals vs non-metals and chemical effects of electric current." },
        { id: "8-ps4", title: "Physical Science Practice Test Paper", subject: "Physical Science", type: "Question Papers", sub: "Science • Question Paper", size: "PDF • 1.8 MB", badgeColor: "#059669", content: "Numerical problems and reasoning questions." },

        { id: "8-b1", title: "Biology Textbook - Class 8", subject: "Biology", type: "Textbooks", sub: "Biology • Textbook", size: "PDF • 4.8 MB", badgeColor: "#10B981", content: "Class 8 Biology: Cell Structure and Functions, Microorganisms, Crop Production." },
        { id: "8-b2", title: "Advanced Botany & Zoology Reference", subject: "Biology", type: "Reference Books", sub: "Biology • Reference Book", size: "PDF • 3.7 MB", badgeColor: "#10B981", content: "Detailed study of adolescence, internal/external fertilization." },
        { id: "8-b3", title: "Biology Chapter Notes", subject: "Biology", type: "Study Materials", sub: "Biology • Study Material", size: "PDF • 2.4 MB", badgeColor: "#10B981", content: "Summary on biodiversity hotspots and agricultural practices." },
        { id: "8-b4", title: "Biology Model Question Paper", subject: "Biology", type: "Question Papers", sub: "Biology • Question Paper", size: "PDF • 1.6 MB", badgeColor: "#10B981", content: "Diagram-based exam paper for biology." },

        { id: "8-t1", title: "Telugu Baata 8th Class Textbook", subject: "Telugu", type: "Textbooks", sub: "Telugu • Textbook", size: "PDF • 6.9 MB", badgeColor: "#0284c7", content: "Class 8 Telugu: Andhra Vaibhavam, Shataka Saurabham, Matrubhoomi." },
        { id: "8-t2", title: "Telugu Vyakaran & Chandassu Reference", subject: "Telugu", type: "Reference Books", sub: "Telugu • Reference Book", size: "PDF • 3.5 MB", badgeColor: "#0284c7", content: "Sandhulu, Samasalu, Alankaralu, and Chandassu meters." },
        { id: "8-t3", title: "Telugu Poetry & Prose Notes", subject: "Telugu", type: "Study Materials", sub: "Telugu • Study Material", size: "PDF • 2.6 MB", badgeColor: "#0284c7", content: "Full explanations of non-detailed reader and poems." },
        { id: "8-t4", title: "Telugu Assessment Question Paper", subject: "Telugu", type: "Question Papers", sub: "Telugu • Question Paper", size: "PDF • 1.7 MB", badgeColor: "#0284c7", content: "Comprehension and creative writing evaluation sheet." },

        { id: "8-e1", title: "English Textbook - Honeysuckle Class 8", subject: "English", type: "Textbooks", sub: "English • Textbook", size: "PDF • 5.7 MB", badgeColor: "#8b5cf6", content: "Class 8 English: Honeydew Reader & It So Happened Supplementary." },
        { id: "8-e2", title: "English Grammar & Discourses Handbook", subject: "English", type: "Reference Books", sub: "English • Reference Book", size: "PDF • 3.3 MB", badgeColor: "#8b5cf6", content: "Active/Passive voice, reported speech, and formal letters." },
        { id: "8-e3", title: "English Literature Notes", subject: "English", type: "Study Materials", sub: "English • Study Material", size: "PDF • 2.5 MB", badgeColor: "#8b5cf6", content: "Summary of prose, poems, and supplementary tales." },
        { id: "8-e4", title: "English Practice Question Paper", subject: "English", type: "Question Papers", sub: "English • Question Paper", size: "PDF • 1.8 MB", badgeColor: "#8b5cf6", content: "Reading comprehension and grammar test paper." },

        { id: "8-his1", title: "History Textbook - Our Pasts III", subject: "History", type: "Textbooks", sub: "History • Textbook", size: "PDF • 6.4 MB", badgeColor: "#D97706", content: "Class 8 History: How, When and Where, Trade to Territory, 1857 Revolt." },
        { id: "8-geo1", title: "Geography Textbook - Resource and Development", subject: "Geography", type: "Textbooks", sub: "Geography • Textbook", size: "PDF • 5.2 MB", badgeColor: "#0D9488", content: "Class 8 Geography: Resources, Land, Soil, Water, Agriculture, Industries." },
        { id: "8-civ1", title: "Civics Textbook - Social and Political Life III", subject: "Civics", type: "Textbooks", sub: "Civics • Textbook", size: "PDF • 4.9 MB", badgeColor: "#4F46E5", content: "Class 8 Civics: The Indian Constitution, Secularism, Parliament, Judiciary." },
        { id: "8-h1", title: "Hindi Textbook - Vasant Bhag 3 Class 8", subject: "Hindi", type: "Textbooks", sub: "Hindi • Textbook", size: "PDF • 5.6 MB", badgeColor: "#ec4899", content: "Class 8 Hindi Vasant: Hum Honge Kamyab, Raja Badal Gaya, Pyara Gaon." }
      ]
    },
    "9": {
      subjects: [
        { name: "Mathematics", icon: "√x", bg: "#2563eb" },
        { name: "Physical Science", icon: "⚗️", bg: "#059669" },
        { name: "Biology", icon: "🧬", bg: "#10B981" },
        { name: "Telugu", icon: "🪶", bg: "#0284c7" },
        { name: "English", icon: "📖", bg: "#8b5cf6" },
        { name: "History", icon: "🏛️", bg: "#D97706" },
        { name: "Geography", icon: "🌍", bg: "#0D9488" },
        { name: "Civics", icon: "⚖️", bg: "#4F46E5" },
        { name: "Economics", icon: "📈", bg: "#EA580C" },
        { name: "Hindi", icon: "अ", bg: "#ec4899" },
      ],
      resources: [
        { id: "9-m1", title: "Mathematics Textbook - Class 9", subject: "Mathematics", type: "Textbooks", sub: "Mathematics • Textbook", size: "PDF • 6.5 MB", badgeColor: "#2563eb", content: "Class 9 Mathematics: Number Systems, Polynomials, Coordinate Geometry, Triangles, Circles." },
        { id: "9-m2", title: "Advanced Geometry & Algebra Reference", subject: "Mathematics", type: "Reference Books", sub: "Mathematics • Reference Book", size: "PDF • 4.8 MB", badgeColor: "#2563eb", content: "Advanced theorems, proofs, and Heron's formula applications." },
        { id: "9-m3", title: "Maths Quick Revision Notes", subject: "Mathematics", type: "Study Materials", sub: "Mathematics • Study Material", size: "PDF • 3.2 MB", badgeColor: "#2563eb", content: "Summary of algebraic identities and statistics formulas." },
        { id: "9-m4", title: "Mathematics Model Exam Paper", subject: "Mathematics", type: "Question Papers", sub: "Mathematics • Question Paper", size: "PDF • 2.1 MB", badgeColor: "#2563eb", content: "Class 9 final exam practice paper with answer key." },

        { id: "9-ps1", title: "Physical Science Textbook - Class 9", subject: "Physical Science", type: "Textbooks", sub: "Physical Science • Textbook", size: "PDF • 5.9 MB", badgeColor: "#059669", content: "Class 9 Physics & Chemistry: Matter in Our Surroundings, Atoms & Molecules, Motion, Gravitation." },
        { id: "9-ps2", title: "Physics & Chemistry Advanced Guide", subject: "Physical Science", type: "Reference Books", sub: "Physical Science • Reference Book", size: "PDF • 4.2 MB", badgeColor: "#059669", content: "Numerical problems on laws of motion, work, energy, and sound." },
        { id: "9-ps3", title: "Science Chapter Revision Notes", subject: "Physical Science", type: "Study Materials", sub: "Science • Study Material", size: "PDF • 2.8 MB", badgeColor: "#059669", content: "Structure of atom, isotopes, and Archimedes' principle notes." },
        { id: "9-ps4", title: "Physical Science Question Paper", subject: "Physical Science", type: "Question Papers", sub: "Science • Question Paper", size: "PDF • 1.9 MB", badgeColor: "#059669", content: "Practice test covering chemistry and physics modules." },

        { id: "9-b1", title: "Biology Textbook - Class 9", subject: "Biology", type: "Textbooks", sub: "Biology • Textbook", size: "PDF • 5.1 MB", badgeColor: "#10B981", content: "Class 9 Biology: The Fundamental Unit of Life, Tissues, Improvement in Food Resources." },
        { id: "9-b2", title: "Cell Biology & Plant Tissues Reference", subject: "Biology", type: "Reference Books", sub: "Biology • Reference Book", size: "PDF • 3.6 MB", badgeColor: "#10B981", content: "Detailed guide on organelle functions and meristematic tissues." },
        { id: "9-b3", title: "Biology Revision Notes", subject: "Biology", type: "Study Materials", sub: "Biology • Study Material", size: "PDF • 2.2 MB", badgeColor: "#10B981", content: "Summary notes on animal tissues and crop protection management." },
        { id: "9-b4", title: "Biology Assessment Question Paper", subject: "Biology", type: "Question Papers", sub: "Biology • Question Paper", size: "PDF • 1.5 MB", badgeColor: "#10B981", content: "Exam practice sheet with diagrams." },

        { id: "9-t1", title: "Telugu Textbook - Telugu Parimalam Class 9", subject: "Telugu", type: "Textbooks", sub: "Telugu • Textbook", size: "PDF • 7.3 MB", badgeColor: "#0284c7", content: "Class 9 Telugu: Dharmabodha, Chaitanyam, Illalaka Gaane, Rangasthalam." },
        { id: "9-t2", title: "Telugu Vyakaran & Chandassu Guide", subject: "Telugu", type: "Reference Books", sub: "Telugu • Reference Book", size: "PDF • 3.8 MB", badgeColor: "#0284c7", content: "Sandhulu, Samasalu, Alankaralu, and Gana Vibhajana." },
        { id: "9-t3", title: "Telugu Poetry & Prose Notes", subject: "Telugu", type: "Study Materials", sub: "Telugu • Study Material", size: "PDF • 2.7 MB", badgeColor: "#0284c7", content: "Detailed line-by-line meanings of Class 9 Telugu lessons." },
        { id: "9-t4", title: "Telugu Model Question Paper", subject: "Telugu", type: "Question Papers", sub: "Telugu • Question Paper", size: "PDF • 1.6 MB", badgeColor: "#0284c7", content: "Grammar and creative writing assessment paper." },

        { id: "9-e1", title: "English Textbook - Beehive & Moments Class 9", subject: "English", type: "Textbooks", sub: "English • Textbook", size: "PDF • 6.0 MB", badgeColor: "#8b5cf6", content: "Class 9 English: Beehive Reader and Moments Supplementary." },
        { id: "9-e2", title: "English Grammar & Writing Reference", subject: "English", type: "Reference Books", sub: "English • Reference Book", size: "PDF • 3.4 MB", badgeColor: "#8b5cf6", content: "Modals, reported speech, subject-verb concord, and diary writing." },
        { id: "9-e3", title: "English Literature Study Notes", subject: "English", type: "Study Materials", sub: "English • Study Material", size: "PDF • 2.5 MB", badgeColor: "#8b5cf6", content: "Summary of Beehive prose and poetry units." },
        { id: "9-e4", title: "English Term Exam Paper", subject: "English", type: "Question Papers", sub: "English • Question Paper", size: "PDF • 1.7 MB", badgeColor: "#8b5cf6", content: "Reading comprehension and writing skills sample paper." },

        { id: "9-his1", title: "History Textbook - India and the Contemporary World I", subject: "History", type: "Textbooks", sub: "History • Textbook", size: "PDF • 6.8 MB", badgeColor: "#D97706", content: "Class 9 History: The French Revolution, Russian Revolution, Nazism." },
        { id: "9-geo1", title: "Geography Textbook - Contemporary India I", subject: "Geography", type: "Textbooks", sub: "Geography • Textbook", size: "PDF • 5.5 MB", badgeColor: "#0D9488", content: "Class 9 Geography: India Size & Location, Physical Features, Drainage, Climate." },
        { id: "9-civ1", title: "Civics Textbook - Democratic Politics I", subject: "Civics", type: "Textbooks", sub: "Civics • Textbook", size: "PDF • 4.8 MB", badgeColor: "#4F46E5", content: "Class 9 Civics: What is Democracy? Constitutional Design, Electoral Politics." },
        { id: "9-eco1", title: "Economics Textbook - Understanding Economic Development", subject: "Economics", type: "Textbooks", sub: "Economics • Textbook", size: "PDF • 4.2 MB", badgeColor: "#EA580C", content: "Class 9 Economics: Village Palampur, People as Resource, Poverty as a Challenge." }
      ]
    },
    "10": {
      subjects: [
        { name: "Mathematics", icon: "√x", bg: "#2563eb" },
        { name: "Physical Science", icon: "⚗️", bg: "#059669" },
        { name: "Biology", icon: "🧬", bg: "#10B981" },
        { name: "Telugu", icon: "🪶", bg: "#0284c7" },
        { name: "English", icon: "📖", bg: "#8b5cf6" },
        { name: "History", icon: "🏛️", bg: "#D97706" },
        { name: "Geography", icon: "🌍", bg: "#0D9488" },
        { name: "Civics", icon: "⚖️", bg: "#4F46E5" },
        { name: "Economics", icon: "📈", bg: "#EA580C" },
        { name: "Hindi", icon: "अ", bg: "#ec4899" },
      ],
      resources: [
        { id: "10-m1", title: "Mathematics Textbook - Class 10 (AP SCERT / NCERT)", subject: "Mathematics", type: "Textbooks", sub: "Mathematics • Textbook", size: "PDF • 7.2 MB", badgeColor: "#2563eb", content: "Class 10 Mathematics: Real Numbers, Polynomials, Quadratic Equations, Trigonometry, Statistics." },
        { id: "10-m2", title: "Board Exam Mathematics Master Guide", subject: "Mathematics", type: "Reference Books", sub: "Mathematics • Reference Book", size: "PDF • 5.1 MB", badgeColor: "#2563eb", content: "Important theorems, previous year questions, and model answers." },
        { id: "10-m3", title: "Class 10 Maths Formula Handbook", subject: "Mathematics", type: "Study Materials", sub: "Mathematics • Study Material", size: "PDF • 3.5 MB", badgeColor: "#2563eb", content: "Comprehensive formula sheet for surface areas, probability, and AP." },
        { id: "10-m4", title: "Mathematics Pre-Final Question Paper", subject: "Mathematics", type: "Question Papers", sub: "Mathematics • Question Paper", size: "PDF • 2.4 MB", badgeColor: "#2563eb", content: "Full-length board pattern model paper with solutions." },

        { id: "10-ps1", title: "Physical Science Textbook - Class 10", subject: "Physical Science", type: "Textbooks", sub: "Physical Science • Textbook", size: "PDF • 6.4 MB", badgeColor: "#059669", content: "Class 10 Physics & Chemistry: Chemical Reactions, Light Reflection & Refraction, Electricity." },
        { id: "10-ps2", title: "Physical Science Board Exam Reference", subject: "Physical Science", type: "Reference Books", sub: "Physical Science • Reference Book", size: "PDF • 4.7 MB", badgeColor: "#059669", content: "Numerical problem-solving guide for optics and electricity." },
        { id: "10-ps3", title: "Physics & Chemistry Revision Notes", subject: "Physical Science", type: "Study Materials", sub: "Science • Study Material", size: "PDF • 3.1 MB", badgeColor: "#059669", content: "Summary of carbon compounds, periodic table trends, and Ohm's law." },
        { id: "10-ps4", title: "Physical Science Model Question Paper", subject: "Physical Science", type: "Question Papers", sub: "Science • Question Paper", size: "PDF • 2.0 MB", badgeColor: "#059669", content: "Board pattern physics and chemistry practice paper." },

        { id: "10-b1", title: "Biology Textbook - Class 10", subject: "Biology", type: "Textbooks", sub: "Biology • Textbook", size: "PDF • 5.8 MB", badgeColor: "#10B981", content: "Class 10 Biology: Life Processes, Control & Co-ordination, Heredity & Environment." },
        { id: "10-b2", title: "Advanced Biology Reference Handbook", subject: "Biology", type: "Reference Books", sub: "Biology • Reference Book", size: "PDF • 4.1 MB", badgeColor: "#10B981", content: "Detailed diagrams of human brain, heart, and nephron." },
        { id: "10-b3", title: "Biology Quick Revision Notes", subject: "Biology", type: "Study Materials", sub: "Biology • Study Material", size: "PDF • 2.6 MB", badgeColor: "#10B981", content: "Mendel's laws, ecosystem dynamics, and hormone functions." },
        { id: "10-b4", title: "Biology Board Exam Question Paper", subject: "Biology", type: "Question Papers", sub: "Biology • Question Paper", size: "PDF • 1.8 MB", badgeColor: "#10B981", content: "Standard question paper for biology board practice." },

        { id: "10-t1", title: "Telugu Textbook - Class 10 (Full Syllabus)", subject: "Telugu", type: "Textbooks", sub: "Telugu • Textbook", size: "PDF • 7.8 MB", badgeColor: "#0284c7", content: "Class 10 Telugu: Maatrubhavana, Sataka Madhurimma, Ramayanam Upavachakam." },
        { id: "10-t2", title: "Telugu SSC Board Exam Guide", subject: "Telugu", type: "Reference Books", sub: "Telugu • Reference Book", size: "PDF • 4.2 MB", badgeColor: "#0284c7", content: "Grammar, essay templates, and comprehension passages." },
        { id: "10-t3", title: "Telugu Prati Padartham Notes", subject: "Telugu", type: "Study Materials", sub: "Telugu • Study Material", size: "PDF • 3.0 MB", badgeColor: "#0284c7", content: "Line-by-line word meanings for poetry lessons." },
        { id: "10-t4", title: "Telugu Pre-Final Question Paper", subject: "Telugu", type: "Question Papers", sub: "Mathematics • Question Paper", size: "PDF • 1.9 MB", badgeColor: "#0284c7", content: "SSC board model paper for Telugu language." },

        { id: "10-e1", title: "English Textbook - First Flight & Footprints Class 10", subject: "English", type: "Textbooks", sub: "English • Textbook", size: "PDF • 6.5 MB", badgeColor: "#8b5cf6", content: "Class 10 English: First Flight Reader and Footprints Without Feet." },
        { id: "10-e2", title: "English Board Exam Writing & Grammar Guide", subject: "English", type: "Reference Books", sub: "English • Reference Book", size: "PDF • 3.9 MB", badgeColor: "#8b5cf6", content: "Analytical paragraphs, formal letters, and grammar editing rules." },
        { id: "10-e3", title: "English Literature Summary Notes", subject: "English", type: "Study Materials", sub: "English • Study Material", size: "PDF • 2.8 MB", badgeColor: "#8b5cf6", content: "Character sketches and poem summaries." },
        { id: "10-e4", title: "English Board Model Question Paper", subject: "English", type: "Question Papers", sub: "English • Question Paper", size: "PDF • 2.0 MB", badgeColor: "#8b5cf6", content: "Complete English exam practice paper." },

        { id: "10-his1", title: "History Textbook - India and the Contemporary World II", subject: "History", type: "Textbooks", sub: "History • Textbook", size: "PDF • 7.0 MB", badgeColor: "#D97706", content: "Class 10 History: Nationalism in Europe, Nationalism in India, Print Culture." },
        { id: "10-geo1", title: "Geography Textbook - Contemporary India II", subject: "Geography", type: "Textbooks", sub: "Geography • Textbook", size: "PDF • 6.1 MB", badgeColor: "#0D9488", content: "Class 10 Geography: Resources & Development, Agriculture, Manufacturing Industries." },
        { id: "10-civ1", title: "Civics Textbook - Democratic Politics II", subject: "Civics", type: "Textbooks", sub: "Civics • Textbook", size: "PDF • 5.2 MB", badgeColor: "#4F46E5", content: "Class 10 Civics: Power Sharing, Federalism, Political Parties, Outcomes of Democracy." },
        { id: "10-eco1", title: "Economics Textbook - Understanding Economic Development", subject: "Economics", type: "Textbooks", sub: "Economics • Textbook", size: "PDF • 4.8 MB", badgeColor: "#EA580C", content: "Class 10 Economics: Development, Sectors of Economy, Money and Credit, Consumer Rights." }
      ]
    }
  };

  const currentLibraryData = libraryDatabase[selectedClass] || libraryDatabase["6"];
  const allResources = currentLibraryData.resources;
  const subjects = currentLibraryData.subjects;

  const categoryCounts = {
    All: `${allResources.length} items`,
    Textbooks: `${allResources.filter(r => r.type === "Textbooks").length} items`,
    "Reference Books": `${allResources.filter(r => r.type === "Reference Books").length} items`,
    "Study Materials": `${allResources.filter(r => r.type === "Study Materials").length} items`,
    "Question Papers": `${allResources.filter(r => r.type === "Question Papers").length} items`,
  };

  const getSubjectCountText = (subjName) => {
    const count = allResources.filter(r => r.subject.toLowerCase() === subjName.toLowerCase()).length;
    return `${count > 0 ? count : 1} books`;
  };

  const categories = [
    { label: "All", count: categoryCounts.All, icon: "⊞" },
    { label: "Textbooks", count: categoryCounts.Textbooks, icon: "📘" },
    { label: "Reference Books", count: categoryCounts["Reference Books"], icon: "📗" },
    { label: "Study Materials", count: categoryCounts["Study Materials"], icon: "📙" },
    { label: "Question Papers", count: categoryCounts["Question Papers"], icon: "📑" },
  ];

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setActiveSearchTerm(searchQuery.trim().toLowerCase());
  };

  const handleDownloadPDF = (resource) => {
    try {
      downloadStudyPdf({
        filename: `${resource.title.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`,
        title: resource.title,
        subtitle: `${resource.subject} • ${resource.type}`,
        metadata: [
          { label: "Class", value: `Class ${selectedClass}` },
          { label: "Student", value: studentName },
          { label: "School", value: schoolName },
          { label: "Date", value: new Date().toLocaleDateString("en-GB") }
        ],
        sections: [{ heading: "Subject content", content: resource.content }]
      });
    } catch (error) {
      console.error("Could not create Digital Library PDF", error);
      window.alert("The PDF could not be created. Please try downloading it again.");
    }
  };

  const filteredResources = allResources.filter((item) => {
    const matchesCategory =
      activeType === "All" || item.type.toLowerCase() === activeType.toLowerCase();

    const matchesSubject =
      selectedSubjectFilter === "All" ||
      item.subject.toLowerCase() === selectedSubjectFilter.toLowerCase();

    const query = activeSearchTerm;
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.sub.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query) ||
      item.subject.toLowerCase().includes(query);

    return matchesCategory && matchesSubject && matchesSearch;
  });

  const displayedSubjects = showAllSubjects ? subjects : subjects.slice(0, 2);

  return (
    <div className="dl-container">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .dl-container { display: flex; min-height: 100vh; background: #f8fafc; color: #0f172a; width: 100%; }

        .dl-sidebar { width: 240px; background: #081B38; color: #94A3B8; display: flex; flex-direction: column; flex-shrink: 0; padding: 22px 14px; position: fixed; top: 0; bottom: 0; left: 0; z-index: 120; }
        .dl-brand { display: flex; align-items: center; gap: 12px; padding: 0 0 18px 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); margin-bottom: 18px; }
        .dl-brand-badge { width: 38px; height: 38px; border-radius: 10px; background: #1E60F8; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; }
        .dl-brand-text h2 { font-size: 15px; font-weight: 700; color: #fff; }
        .dl-brand-text p { font-size: 12px; color: #60A5FA; display: block; }
        .dl-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; overflow-y: auto; }
        .dl-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; color: #94A3B8; text-decoration: none; border-radius: 9px; font-size: 13px; font-weight: 500; transition: all 0.15s; border: none; background: transparent; cursor: pointer; width: 100%; text-align: left; }
        .dl-link:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .dl-link.active { background: #1E60F8; color: #fff; font-weight: 600; box-shadow: 0 4px 12px rgba(30,96,248,0.3); }
        .dl-logout-wrap { padding: 14px 14px 18px 14px; border-top: 1px solid rgba(255, 255, 255, 0.07); margin-top: auto; }
        .dl-logout-btn { width: 100%; display: flex; align-items: center; gap: 12px; background: transparent; border: none; color: #EF4444; padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }

        .dl-main { flex: 1; margin-left: 240px; display: flex; flex-direction: column; overflow-y: auto; padding-bottom: 60px; min-width: 0; }
        .dl-header { height: 64px; background: #fff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; position: sticky; top: 0; z-index: 100; }
        .dl-header-title h2 { font-size: 15.5px; font-weight: 700; color: #0f172a; }
        .dl-header-title p { font-size: 11.5px; color: #64748b; }
        .dl-header-right { display: flex; align-items: center; gap: 20px; }
        .dl-notif-btn { position: relative; width: 36px; height: 36px; border-radius: 50%; border: 1px solid #e2e8f0; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .dl-notif-badge { position: absolute; top: -3px; right: -3px; background: #ef4444; color: #fff; border-radius: 50%; width: 16px; height: 16px; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
        .dl-user-badge { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .dl-avatar { width: 38px; height: 38px; border-radius: 50%; background: #fed7aa; display: flex; align-items: center; justify-content: center; font-size: 18px; }

        .dl-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; max-width: 1200px; margin: 0 auto; width: 100%; }

        .dl-class-tabs { display: flex; gap: 8px; align-items: center; background: #fff; border: 1px solid #e2e8f0; padding: 8px 12px; border-radius: 12px; }
        .dl-class-btn { padding: 6px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 700; border: 1px solid #cbd5e1; background: #f8fafc; color: #475569; cursor: pointer; transition: all 0.15s; }
        .dl-class-btn.active { background: #2563eb; color: #fff; border-color: #2563eb; }

        .dl-hero { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; display: flex; flex-direction: column; gap: 16px; }
        .dl-hero-top { display: flex; align-items: center; justify-content: space-between; }
        .dl-hero-left { display: flex; align-items: center; gap: 16px; }
        .dl-hero-icon { width: 48px; height: 48px; border-radius: 12px; background: #2563eb; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .dl-hero-left h1 { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .dl-hero-left p { font-size: 13px; color: #64748b; }
        .dl-hero-books-art { font-size: 38px; }
        
        .dl-search-bar { display: flex; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 6px 12px; }
        .dl-search-bar input { border: none; outline: none; background: transparent; flex: 1; font-size: 13px; color: #0f172a; }
        .dl-search-btn { background: #2563eb; color: #fff; border: none; padding: 8px 24px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
        .dl-search-btn:hover { background: #1d4ed8; }

        .dl-types-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
        .dl-type-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: all 0.15s; }
        .dl-type-card:hover { border-color: #2563eb; }
        .dl-type-card.active { border-color: #2563eb; background: #eff6ff; }
        .dl-type-icon { font-size: 18px; }
        .dl-type-info strong { display: block; font-size: 13px; font-weight: 700; color: #0f172a; }
        .dl-type-info small { font-size: 11px; color: #64748b; }

        .dl-sec-head { display: flex; align-items: center; justify-content: space-between; }
        .dl-sec-head h3 { font-size: 16px; font-weight: 700; }
        .dl-sec-head a { font-size: 12px; color: #2563eb; font-weight: 600; text-decoration: none; cursor: pointer; }
        
        .dl-sub-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
        .dl-sub-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px 14px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .dl-sub-icon { width: 40px; height: 40px; border-radius: 10px; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 17px; font-weight: 700; }
        .dl-sub-body h4 { font-size: 13px; font-weight: 700; margin-bottom: 2px; }
        .dl-sub-body p { font-size: 11px; color: #64748b; }
        .dl-explore-btn { display: flex; align-items: center; justify-content: space-between; border: 1px solid #e2e8f0; background: #f8fafc; padding: 7px 10px; border-radius: 8px; font-size: 11.5px; font-weight: 600; color: #2563eb; cursor: pointer; transition: background 0.15s; }
        .dl-explore-btn:hover { background: #eff6ff; border-color: #bfdbfe; }

        .dl-res-list { display: flex; flex-direction: column; gap: 10px; }
        .dl-res-item { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; transition: transform 0.15s; }
        .dl-res-item:hover { transform: translateY(-1px); border-color: #cbd5e1; }
        .dl-res-left { display: flex; align-items: center; gap: 14px; }
        .dl-pdf-badge { width: 38px; height: 38px; border-radius: 8px; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; flex-shrink: 0; }
        .dl-res-info h4 { font-size: 13.5px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .dl-res-info p { font-size: 11.5px; color: #64748b; }
        .dl-res-right { display: flex; align-items: center; gap: 16px; }
        .dl-res-size { font-size: 11.5px; color: #94a3b8; font-weight: 500; }
        .dl-down-btn { background: #2563eb; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.15s; }
        .dl-down-btn:hover { background: #1d4ed8; }

        .dl-bottom-box { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px 22px; display: flex; align-items: center; justify-content: space-between; }
        .dl-box-left { display: flex; align-items: center; gap: 14px; }
        .dl-box-icon { font-size: 30px; }
        .dl-box-text h4 { font-size: 14px; font-weight: 700; }
        .dl-box-text p { font-size: 12px; color: #64748b; }
        .dl-box-btn { background: #2563eb; color: #fff; border: none; padding: 9px 20px; border-radius: 8px; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
        .dl-box-btn:hover { background: #1d4ed8; }

        @media (max-width: 1024px) {
          .dl-sidebar { display: none; }
          .dl-main { margin-left: 0; }
          .dl-types-grid { grid-template-columns: repeat(3, 1fr); }
          .dl-sub-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <StudentSidebar onLogout={handleLogout} />

      <main className="dl-main">
        <header className="dl-header">
          <div className="dl-header-title">
            <h2>Digital Library</h2>
            <p>Online E-Books and Study Materials Portal</p>
          </div>
          <div className="dl-header-right">
            <button className="dl-notif-btn" onClick={() => navigate("/announcements")}>
              🔔<span className="dl-notif-badge">3</span>
            </button>
            <div className="dl-user-badge" onClick={() => navigate("/settings")}>
              <div className="dl-avatar">👨‍🎓</div>
              <div>
                <strong style={{ fontSize: 13, display: "block" }}>{studentName}</strong>
                <span style={{ fontSize: 11, color: "#64748b" }}>Class {selectedClass}th</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dl-body">
          {/* Class Switcher Toolbar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>Digital Library - Class {selectedClass}</h2>
              <p style={{ fontSize: 12, color: "#64748B" }}>Switch between classes (6th to 10th) to explore all available syllabi and textbooks</p>
            </div>
            <div className="dl-class-tabs">
              <span style={{ fontSize: 11, fontWeight: 700, color: "#64748B", marginRight: 4 }}>CLASS:</span>
              {["6", "7", "8", "9", "10"].map((clsNum) => (
                <button
                  key={clsNum}
                  className={`dl-class-btn ${selectedClass === clsNum ? "active" : ""}`}
                  onClick={() => {
                    setSelectedClass(clsNum);
                    setSelectedSubjectFilter("All");
                    setActiveType("All");
                    setShowAllSubjects(false);
                  }}
                >
                  Class {clsNum}
                </button>
              ))}
            </div>
          </div>

          <div className="dl-hero">
            <div className="dl-hero-top">
              <div className="dl-hero-left">
                <div className="dl-hero-icon">📚</div>
                <div>
                  <h1>Class {selectedClass} Library</h1>
                  <p>Access official textbooks, reference books, study materials and question papers.</p>
                </div>
              </div>
              <div className="dl-hero-books-art">📚🎓</div>
            </div>

            <form className="dl-search-bar" onSubmit={handleSearchSubmit}>
              <span style={{ fontSize: 16 }}>🔍</span>
              <input
                type="text"
                placeholder={`Search for Class ${selectedClass} books, topics, or subjects...`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveSearchTerm(e.target.value.trim().toLowerCase());
                }}
              />
              {activeSearchTerm && (
                <button
                  type="button"
                  style={{ background: "none", border: "none", color: "#64748B", fontSize: 14, cursor: "pointer", marginRight: 8 }}
                  onClick={() => {
                    setSearchQuery("");
                    setActiveSearchTerm("");
                  }}
                >
                  ✕
                </button>
              )}
              <button type="submit" className="dl-search-btn">
                Search
              </button>
            </form>
          </div>

          {/* Categories with Real-time Item Counts */}
          <div className="dl-types-grid">
            {categories.map((cat, i) => (
              <div
                key={i}
                className={`dl-type-card ${activeType === cat.label ? "active" : ""}`}
                onClick={() => {
                  setActiveType(cat.label);
                  setSelectedSubjectFilter("All");
                }}
              >
                <span className="dl-type-icon">{cat.icon}</span>
                <div className="dl-type-info">
                  <strong>{cat.label}</strong>
                  <small>{cat.count}</small>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="dl-sec-head" style={{ marginBottom: 12 }}>
              <h3>Class {selectedClass} Subjects</h3>
              <a onClick={() => setShowAllSubjects(!showAllSubjects)}>
                {showAllSubjects ? "Show Less <" : "View All Subjects >"}
              </a>
            </div>
            <div className="dl-sub-grid">
              {displayedSubjects.map((sub, i) => (
                <div className="dl-sub-card" key={i}>
                  <div className="dl-sub-icon" style={{ background: sub.bg }}>
                    {sub.icon}
                  </div>
                  <div className="dl-sub-body">
                    <h4>{sub.name}</h4>
                    <p>{getSubjectCountText(sub.name)}</p>
                  </div>
                  <button
                    className="dl-explore-btn"
                    onClick={() => {
                      setSelectedSubjectFilter(sub.name);
                      setActiveType("All");
                      const target = document.getElementById("books-resources-section");
                      if (target) target.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <span>Explore Syllabus</span>
                    <span>›</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div id="books-resources-section">
            <div className="dl-sec-head" style={{ marginBottom: 12 }}>
              <h3>
                {selectedSubjectFilter !== "All"
                  ? `Class ${selectedClass} ${selectedSubjectFilter} Resources`
                  : activeType !== "All"
                  ? `${activeType}`
                  : `Latest Class ${selectedClass} Books & Resources`}
                {activeSearchTerm ? ` (Filtered by "${activeSearchTerm}")` : ""}
              </h3>
              <a
                onClick={() => {
                  setActiveType("All");
                  setSelectedSubjectFilter("All");
                  setSearchQuery("");
                  setActiveSearchTerm("");
                  setShowAllSubjects(false); // Collapses subjects list back to 2 or 3 items on reset
                }}
              >
                Reset All Filters ▾
              </a>
            </div>

            <div className="dl-res-list">
              {filteredResources.map((item) => (
                <div className="dl-res-item" key={item.id}>
                  <div className="dl-res-left">
                    <div className="dl-pdf-badge" style={{ background: item.badgeColor }}>
                      PDF
                    </div>
                    <div className="dl-res-info">
                      <h4>{item.title}</h4>
                      <p>{item.sub}</p>
                    </div>
                  </div>
                  <div className="dl-res-right">
                    <span className="dl-res-size">{item.size}</span>
                    <button className="dl-down-btn" onClick={() => handleDownloadPDF(item)}>
                      <span>⬇</span> Download
                    </button>
                  </div>
                </div>
              ))}

              {filteredResources.length === 0 && (
                <div style={{ background: "#FFF", border: "1px solid #E2E8F0", borderRadius: 12, padding: "30px", textAlign: "center" }}>
                  <span style={{ fontSize: 32, display: "block", marginBottom: 8 }}>🔍</span>
                  <strong style={{ fontSize: 14, color: "#0F172A", display: "block" }}>No books or materials found</strong>
                  <p style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>
                    Try searching with another keyword or reset the category filter.
                  </p>
                  <button
                    style={{ marginTop: 14, background: "#2563EB", color: "#FFF", border: "none", padding: "7px 16px", borderRadius: 6, fontSize: 12, cursor: "pointer" }}
                    onClick={() => {
                      setActiveType("All");
                      setSelectedSubjectFilter("All");
                      setSearchQuery("");
                      setActiveSearchTerm("");
                      setShowAllSubjects(false);
                    }}
                  >
                    View All Books
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="dl-bottom-box">
            <div className="dl-box-left">
              <div className="dl-box-icon">📚</div>
              <div className="dl-box-text">
                <h4>Build Your Knowledge</h4>
                <p>A library of Class {selectedClass} textbooks, question papers and notes to help you succeed.</p>
              </div>
            </div>
            <button
              className="dl-box-btn"
              onClick={() => {
                setActiveType("All");
                setSelectedSubjectFilter("All");
                setSearchQuery("");
                setActiveSearchTerm("");
                setShowAllSubjects(false);
              }}
            >
              Explore All Resources
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}