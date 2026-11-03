import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States & Trackers
  const [activeDetails, setActiveDetails] = useState(null);
  const [activeActivity, setActiveActivity] = useState(null);
  const [showAllActivities, setShowAllActivities] = useState(false);

  // Dynamic user details with safe initialization fallback (Defaults to Class 6)
  const [user, setUser] = useState(() => {
    try {
      const rawUser = localStorage.getItem("current_user");
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        if (!parsed.class) parsed.class = "6";
        return parsed;
      }
    } catch (e) {
      // ignore
    }
    return {
      name: "Student",
      class: "6",
      school: "Govt High School",
      courseProgressMap: { telugu: 0, hindi: 0, english: 0, math: 0, science: 0, social: 0, computer_basics: 0 },
      recentActivities: []
    };
  });

  const studentClass = String(user.class || "6");

  // ==================== CLASS 6 COMPLETE COURSE TEMPLATES ====================
  const class6CourseTemplates = [
    {
      id: "telugu",
      title: "Telugu",
      chapters: 10,
      lessons: 20,
      desc: "Telugu Thota / Telugu Baata-6: 1. అమ్మ ఒడి, 2. తృప్తి, 3. మాకొద్దీ తెల్లదొరతనము, 4. సమయస్ఫూర్తి, 5. శతక మధురిమ, 6. పోతన బాల్యము, 7. ఉడుత సాయం, 8. చెరువు, 9. నిజాయితీ, 10. ఎలుక - సింహం.",
      color: "#0284c7",
      directUrl: "https://www.youtube.com/watch?v=Um7KWrJCSoU",
      currentTopic: "Lesson 2: తృప్తి (Trupti)",
      subtitle: "Video 2 of 20",
      formulaLeft: "Telugu Thota-6",
      formulaRight: "పద్య & గద్య భాగాలు",
      syllabusList: [
        { name: "Lesson 1: అమ్మ ఒడి (Amma Odi)", direct: "https://www.youtube.com/watch?v=Um7KWrJCSoU" },
        { name: "Lesson 2: తృప్తి (Trupti)", direct: "https://www.youtube.com/watch?v=-rcp7sS7Jy4" },
        { name: "Lesson 3: మాకొద్దీ తెల్లదొరతనము", direct: "https://www.youtube.com/watch?v=aM_h74c6Z-Y" },
        { name: "Lesson 4: సమయస్ఫూర్తి", direct: "https://www.youtube.com/watch?v=y2Kg3MO81BU" },
        { name: "Lesson 5: శతక మధురిమ", direct: "https://www.youtube.com/watch?v=8bNokIs7JA8" }
      ]
    },
    {
      id: "hindi",
      title: "Hindi",
      chapters: 16,
      lessons: 32,
      desc: "Vasant Bhag 1: 1. वह चिड़िया जो, 2. बचपन, 3. नादान दोस्त, 4. चाँद से थोड़ी-सी गप्पें, 5. अक्षरों का महत्व, etc.",
      color: "#e11d48",
      directUrl: "https://www.youtube.com/watch?v=BLRkBJ0e0fo",
      currentTopic: "Chapter 1: वह चिड़िया जो",
      subtitle: "Video 1 of 32",
      formulaLeft: "Vasant Bhag 1",
      formulaRight: "Bal Ramkatha",
      syllabusList: [
        { name: "Chapter 1: वह चिड़िया जो", direct: "https://www.youtube.com/watch?v=19wEnmoplgI" },
        { name: "Chapter 2: बचपन", direct: "https://www.youtube.com/watch?v=5liIQ98_-pM" }
      ]
    },
    {
      id: "english",
      title: "English",
      chapters: 10,
      lessons: 20,
      desc: "Honeysuckle & A Pact with the Sun: 1. Who Did Patrick's Homework, 2. How the Dog Found Himself a New Master, etc.",
      color: "#8b5cf6",
      directUrl: "https://www.youtube.com/watch?v=Sdf8qkkRCeA",
      currentTopic: "Unit 1: Who Did Patrick's Homework?",
      subtitle: "Video 1 of 20",
      formulaLeft: "Honeysuckle",
      formulaRight: "A Pact with the Sun",
      syllabusList: [
        { name: "Unit 1: Who Did Patrick's Homework?", direct: "https://www.youtube.com/watch?v=MOzJXWf-Yps" }
      ]
    },
    {
      id: "math",
      title: "Mathematics",
      chapters: 12,
      lessons: 24,
      desc: "1. Knowing Our Numbers, 2. Whole Numbers, 3. Playing with Numbers, 4. Basic Geometrical Ideas, etc.",
      color: "#2563eb",
      directUrl: "https://www.youtube.com/watch?v=GMojx-QoeuM",
      currentTopic: "Chapter 1: Knowing Our Numbers",
      subtitle: "Video 1 of 24",
      formulaLeft: "Arithmetic & Geometry",
      formulaRight: "Algebra & Data",
      syllabusList: [
        { name: "Chapter 1: Knowing Our Numbers", direct: "https://www.youtube.com/watch?v=GMojx-QoeuM" }
      ]
    },
    {
      id: "science",
      title: "Science",
      chapters: 12,
      lessons: 24,
      desc: "Curiosity Textbook: 1. The Wonderful World of Science, 2. Diversity in Living World, 3. Mindful Eating, etc.",
      color: "#059669",
      directUrl: "https://www.youtube.com/watch?v=06SK5f_KPpo",
      currentTopic: "Chapter 1: The Wonderful World of Science",
      subtitle: "Video 1 of 24",
      formulaLeft: "Curiosity Textbook",
      formulaRight: "Physics, Chem & Bio",
      syllabusList: [
        { name: "Chapter 1: The Wonderful World of Science", direct: "https://www.youtube.com/watch?v=06SK5f_KPpo" }
      ]
    },
    {
      id: "social",
      title: "Social Science",
      chapters: 14,
      lessons: 28,
      desc: "Exploring Society: India and Beyond: Locating Places on Earth, Oceans & Continents, Landforms, etc.",
      color: "#D97706",
      directUrl: "https://www.youtube.com/watch?v=aM_h74c6Z-Y",
      currentTopic: "Chapter 1: Locating Places on the Earth",
      subtitle: "Video 1 of 28",
      formulaLeft: "Exploring Society",
      formulaRight: "History, Geo & Civics",
      syllabusList: [
        { name: "Chapter 1: Locating Places on the Earth", direct: "https://www.youtube.com/watch?v=aM_h74c6Z-Y" }
      ]
    },
    {
      id: "computer_basics",
      title: "Computer Basics",
      chapters: 6,
      lessons: 12,
      desc: "1. Introduction to Computers, 2. Computer Hardware & Software, 3. MS Word Basics, 4. Internet Fundamentals, 5. Digital Safety, 6. Paint Tools.",
      color: "#06B6D4",
      directUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      currentTopic: "Chapter 1: Introduction to Computers",
      subtitle: "Video 1 of 12",
      formulaLeft: "Computer Essentials",
      formulaRight: "Hardware & MS Word",
      syllabusList: [
        { name: "Chapter 1: Introduction to Computers", direct: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { name: "Chapter 2: Hardware and Software", direct: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { name: "Chapter 3: MS Word Basics", direct: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
      ]
    }
  ];

  // ==================== CLASS 7 COURSE TEMPLATES ====================
  const class7CourseTemplates = [
    {
      id: "telugu",
      title: "Telugu",
      chapters: 12,
      lessons: 24,
      desc: "Class 7 Telugu: 1. అక్షరం, 2. సిరిమానోత్సవం, 3. గుణదల మేరీమాత ఉత్సవం, etc.",
      color: "#0284c7",
      directUrl: "https://www.youtube.com/watch?v=Um7KWrJCSoU",
      currentTopic: "Lesson 1: అక్షరం (Aksharam)",
      subtitle: "Video 1 of 24",
      formulaLeft: "Telugu Baata-7",
      formulaRight: "సాంస్కృతిక పాఠాలు",
      syllabusList: [{ name: "Lesson 1: అక్షరం", direct: "https://www.youtube.com/watch?v=Um7KWrJCSoU" }]
    },
    {
      id: "hindi",
      title: "Hindi",
      chapters: 12,
      lessons: 24,
      desc: "Lahar-2: 1. ज्ञान हम को दीजिए, 2. होशियार कौआ, etc.",
      color: "#e11d48",
      directUrl: "https://www.youtube.com/watch?v=BLRkBJ0e0fo",
      currentTopic: "Chapter 1: ज्ञान हम को दीजिए",
      subtitle: "Video 1 of 24",
      formulaLeft: "Lahar-2",
      formulaRight: "Hindi Second Language",
      syllabusList: [{ name: "Chapter 1: ज्ञान हम को दीजिए", direct: "https://www.youtube.com/watch?v=19wEnmoplgI" }]
    },
    {
      id: "english",
      title: "English",
      chapters: 8,
      lessons: 16,
      desc: "Our World Through English: 1. Town Mouse and Country Mouse, 2. C.V. Raman, etc.",
      color: "#8b5cf6",
      directUrl: "https://www.youtube.com/watch?v=Sdf8qkkRCeA",
      currentTopic: "Unit 1: Town Mouse and Country Mouse",
      subtitle: "Video 1 of 16",
      formulaLeft: "Our World Through English",
      formulaRight: "Prose & Poems",
      syllabusList: [{ name: "Unit 1: Town Mouse and Country Mouse", direct: "https://www.youtube.com/watch?v=MOzJXWf-Yps" }]
    },
    {
      id: "math",
      title: "Mathematics",
      chapters: 12,
      lessons: 24,
      desc: "1. Integers, 2. Fractions & Decimals, 3. Simple Equations, etc.",
      color: "#2563eb",
      directUrl: "https://www.youtube.com/watch?v=GMojx-QoeuM",
      currentTopic: "Chapter 1: Integers",
      subtitle: "Video 1 of 24",
      formulaLeft: "Arithmetic & Algebra",
      formulaRight: "Geometry",
      syllabusList: [{ name: "Chapter 1: Integers", direct: "https://www.youtube.com/watch?v=GMojx-QoeuM" }]
    },
    {
      id: "science",
      title: "Science",
      chapters: 12,
      lessons: 24,
      desc: "General Science: Food for Health, Nutrition in Organisms, Respiration, etc.",
      color: "#059669",
      directUrl: "https://www.youtube.com/watch?v=06SK5f_KPpo",
      currentTopic: "Chapter 1: Food for Health",
      subtitle: "Video 1 of 24",
      formulaLeft: "Physics, Chem & Bio",
      formulaRight: "Sem 1 & 2",
      syllabusList: [{ name: "Chapter 1: Food for Health", direct: "https://www.youtube.com/watch?v=06SK5f_KPpo" }]
    },
    {
      id: "social",
      title: "Social Science",
      chapters: 14,
      lessons: 28,
      desc: "Social Studies: Universe & Earth, Forests, Maps, Rain & Rivers, etc.",
      color: "#D97706",
      directUrl: "https://www.youtube.com/watch?v=aM_h74c6Z-Y",
      currentTopic: "Chapter 1: The Universe and the Earth",
      subtitle: "Video 1 of 28",
      formulaLeft: "Social Studies Sem 1 & 2",
      formulaRight: "History, Geo & Civics",
      syllabusList: [{ name: "Chapter 1: The Universe and the Earth", direct: "https://www.youtube.com/watch?v=aM_h74c6Z-Y" }]
    },
    {
      id: "computer_basics",
      title: "Computer Basics",
      chapters: 6,
      lessons: 12,
      desc: "1. Computer Hardware & Software, 2. Spreadsheets & Presentations, 3. Internet Safety & Email, 4. Cyber Ethics.",
      color: "#06B6D4",
      directUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      currentTopic: "Chapter 1: Computer Hardware & Software",
      subtitle: "Video 1 of 12",
      formulaLeft: "Advanced IT Skills",
      formulaRight: "Software & Spreadsheets",
      syllabusList: [
        { name: "Chapter 1: Computer Hardware & Software", direct: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { name: "Chapter 2: Spreadsheets & Presentations", direct: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
      ]
    }
  ];

  // ==================== CLASS 8 COURSE TEMPLATES ====================
  const class8CourseTemplates = [
    {
      id: "telugu",
      title: "Telugu",
      chapters: 11,
      lessons: 22,
      desc: "Telugu Baata-8: ఆంధ్ర వైభవం, శతక సౌరభం, మాతృభూమి, నా యాత్ర, etc.",
      color: "#0284c7",
      directUrl: "https://www.youtube.com/watch?v=Um7KWrJCSoU",
      currentTopic: "Lesson 1: ఆంధ్ర వైభవం (Andhra Vaibhavam)",
      subtitle: "Video 1 of 22",
      formulaLeft: "Telugu Baata-8",
      formulaRight: "గద్య & పద్య భాగాలు",
      syllabusList: [{ name: "Lesson 1: ఆంధ్ర వైభవం", direct: "https://www.youtube.com/watch?v=Um7KWrJCSoU" }]
    },
    {
      id: "hindi",
      title: "Hindi",
      chapters: 12,
      lessons: 24,
      desc: "Class 8 Hindi Vasant Bhag 3: हम होंगे कामयाब, राजा बदल गया, etc.",
      color: "#e11d48",
      directUrl: "https://www.youtube.com/watch?v=BLRkBJ0e0fo",
      currentTopic: "Chapter 1: ہم होंगे कामयाब",
      subtitle: "Video 1 of 24",
      formulaLeft: "Vasant Bhag 3",
      formulaRight: "Kavita & Kahani",
      syllabusList: [{ name: "Chapter 1: हम होंगे कामयाब", direct: "https://www.youtube.com/watch?v=19wEnmoplgI" }]
    },
    {
      id: "english",
      title: "English",
      chapters: 8,
      lessons: 16,
      desc: "Honeydew & It So Happened: Best Christmas Present, The Tsunami, etc.",
      color: "#8b5cf6",
      directUrl: "https://www.youtube.com/watch?v=Sdf8qkkRCeA",
      currentTopic: "Unit 1: The Best Christmas Present in the World",
      subtitle: "Video 1 of 16",
      formulaLeft: "Honeydew Reader",
      formulaRight: "Prose & Poems",
      syllabusList: [{ name: "Unit 1: The Best Christmas Present", direct: "https://www.youtube.com/watch?v=MOzJXWf-Yps" }]
    },
    {
      id: "math",
      title: "Mathematics",
      chapters: 13,
      lessons: 26,
      desc: "Rational Numbers, Linear Equations, Quadrilaterals, Squares & Roots, etc.",
      color: "#2563eb",
      directUrl: "https://www.youtube.com/watch?v=GMojx-QoeuM",
      currentTopic: "Chapter 1: Rational Numbers",
      subtitle: "Video 1 of 26",
      formulaLeft: "Algebra & Arithmetic",
      formulaRight: "Geometry & Data",
      syllabusList: [{ name: "Chapter 1: Rational Numbers", direct: "https://www.youtube.com/watch?v=GMojx-QoeuM" }]
    },
    {
      id: "physical_science",
      title: "Physical Science",
      chapters: 11,
      lessons: 22,
      desc: "Force and Pressure, Friction, Coal and Petroleum, Combustion and Flame, etc.",
      color: "#059669",
      directUrl: "https://www.youtube.com/watch?v=06SK5f_KPpo",
      currentTopic: "Chapter 1: Force and Pressure",
      subtitle: "Video 1 of 22",
      formulaLeft: "Physics & Chemistry",
      formulaRight: "Forces & Energy",
      syllabusList: [{ name: "Chapter 1: Force and Pressure", direct: "https://www.youtube.com/watch?v=06SK5f_KPpo" }]
    },
    {
      id: "biology",
      title: "Biology",
      chapters: 7,
      lessons: 14,
      desc: "Cell Structure, Microorganisms, Crop Production, Animal Reproduction, etc.",
      color: "#10B981",
      directUrl: "https://www.youtube.com/watch?v=Svs7yP7VlNU",
      currentTopic: "Chapter 1: Cell - Structure and Functions",
      subtitle: "Video 1 of 14",
      formulaLeft: "Cellular Life",
      formulaRight: "Ecology & Agriculture",
      syllabusList: [{ name: "Chapter 1: Cell - Structure and Functions", direct: "https://www.youtube.com/watch?v=Svs7yP7VlNU" }]
    },
    {
      id: "history",
      title: "History",
      chapters: 8,
      lessons: 16,
      desc: "Our Pasts - III: How, When and Where, Trade to Territory, Revolt of 1857, etc.",
      color: "#D97706",
      directUrl: "https://www.youtube.com/watch?v=GMojx-QoeuM",
      currentTopic: "Chapter 1: How, When and Where",
      subtitle: "Video 1 of 16",
      formulaLeft: "Colonial India",
      formulaRight: "Freedom Movement",
      syllabusList: [{ name: "Chapter 1: How, When and Where", direct: "https://www.youtube.com/watch?v=GMojx-QoeuM" }]
    },
    {
      id: "geography",
      title: "Geography",
      chapters: 5,
      lessons: 10,
      desc: "Resource and Development: Resources, Land, Soil, Water, Agriculture, Industries.",
      color: "#0D9488",
      directUrl: "https://www.youtube.com/watch?v=aM_h74c6Z-Y",
      currentTopic: "Chapter 1: Resources",
      subtitle: "Video 1 of 10",
      formulaLeft: "Natural Assets",
      formulaRight: "Socio-Economic Life",
      syllabusList: [{ name: "Chapter 1: Resources", direct: "https://www.youtube.com/watch?v=aM_h74c6Z-Y" }]
    },
    {
      id: "civics",
      title: "Civics",
      chapters: 8,
      lessons: 16,
      desc: "Social and Political Life - III: The Constitution, Secularism, Parliament, Judiciary.",
      color: "#4F46E5",
      directUrl: "https://www.youtube.com/watch?v=Pj1G3E4S-gQ",
      currentTopic: "Chapter 1: The Indian Constitution",
      subtitle: "Video 1 of 16",
      formulaLeft: "Governance & Rights",
      formulaRight: "Social Justice",
      syllabusList: [{ name: "Chapter 1: The Indian Constitution", direct: "https://www.youtube.com/watch?v=Pj1G3E4S-gQ" }]
    },
    {
      id: "computer_basics",
      title: "Computer Basics",
      chapters: 6,
      lessons: 12,
      desc: "1. Operating Systems & Utility Software, 2. Database Management Basics, 3. Introduction to HTML, 4. Cyber Ethics.",
      color: "#06B6D4",
      directUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      currentTopic: "Chapter 1: Operating Systems & Utility Software",
      subtitle: "Video 1 of 12",
      formulaLeft: "Networking & HTML",
      formulaRight: "Database Management",
      syllabusList: [
        { name: "Chapter 1: Operating Systems & Utility Software", direct: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { name: "Chapter 2: Introduction to HTML", direct: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
      ]
    }
  ];

  // ==================== CLASS 9 COMPLETE COURSE TEMPLATES ====================
  const class9CourseTemplates = [
    {
      id: "telugu",
      title: "Telugu",
      chapters: 14,
      lessons: 28,
      desc: "Telugu Parimalam (Divvelu-1): 7 Poetry & 7 Prose lessons.",
      color: "#0284c7",
      directUrl: "https://www.youtube.com/watch?v=Um7KWrJCSoU",
      currentTopic: "Poetry 1: ధర్మబోధ (Dharmabodha)",
      subtitle: "Video 1 of 28",
      formulaLeft: "Telugu Parimalam",
      formulaRight: "పద్య & గద్య భాగాలు",
      syllabusList: [{ name: "Poetry 1: ధర్మబోధ", direct: "https://www.youtube.com/watch?v=Um7KWrJCSoU" }]
    },
    {
      id: "hindi",
      title: "Hindi",
      chapters: 9,
      lessons: 18,
      desc: "Hindi Vallari-1: 9 core chapters.",
      color: "#e11d48",
      directUrl: "https://www.youtube.com/watch?v=BLRkBJ0e0fo",
      currentTopic: "Chapter 1: जिस देश में गंगा बहती है",
      subtitle: "Video 1 of 18",
      formulaLeft: "Hindi Vallari-1",
      formulaRight: "Kavita & Kahani",
      syllabusList: [{ name: "Chapter 1: जिस देश में गंगा बहती है", direct: "https://www.youtube.com/watch?v=19wEnmoplgI" }]
    },
    {
      id: "english",
      title: "English",
      chapters: 9,
      lessons: 18,
      desc: "Beehive & Moments.",
      color: "#8b5cf6",
      directUrl: "https://www.youtube.com/watch?v=Sdf8qkkRCeA",
      currentTopic: "Unit 1: The Fun They Had",
      subtitle: "Video 1 of 18",
      formulaLeft: "Beehive Reader",
      formulaRight: "Prose & Moments",
      syllabusList: [{ name: "Unit 1: The Fun They Had", direct: "https://www.youtube.com/watch?v=MOzJXWf-Yps" }]
    },
    {
      id: "math",
      title: "Mathematics",
      chapters: 12,
      lessons: 24,
      desc: "Number Systems, Polynomials, Coordinate Geometry, Linear Equations, Triangles, Quadrilaterals, Circles, Statistics.",
      color: "#2563eb",
      directUrl: "https://www.youtube.com/watch?v=GMojx-QoeuM",
      currentTopic: "Chapter 1: Number Systems",
      subtitle: "Video 1 of 24",
      formulaLeft: "Algebra & Geometry",
      formulaRight: "Statistics & Mensuration",
      syllabusList: [{ name: "Chapter 1: Number Systems", direct: "https://www.youtube.com/watch?v=GMojx-QoeuM" }]
    },
    {
      id: "physical_science",
      title: "Physical Science",
      chapters: 9,
      lessons: 18,
      desc: "Matter, Atoms, Motion, Force, Gravitation, Sound.",
      color: "#059669",
      directUrl: "https://www.youtube.com/watch?v=06SK5f_KPpo",
      currentTopic: "Chapter 1: Matter in Our Surroundings",
      subtitle: "Video 1 of 18",
      formulaLeft: "Physics & Chemistry",
      formulaRight: "Atoms & Forces",
      syllabusList: [{ name: "Chapter 1: Matter in Our Surroundings", direct: "https://www.youtube.com/watch?v=06SK5f_KPpo" }]
    },
    {
      id: "biology",
      title: "Biology",
      chapters: 3,
      lessons: 6,
      desc: "The Fundamental Unit of Life, Tissues, Food Resources.",
      color: "#10B981",
      directUrl: "https://www.youtube.com/watch?v=Svs7yP7VlNU",
      currentTopic: "Chapter 10: The Fundamental Unit of Life",
      subtitle: "Video 1 of 6",
      formulaLeft: "Cellular Biology",
      formulaRight: "Tissues & Food",
      syllabusList: [{ name: "Chapter 10: The Fundamental Unit of Life", direct: "https://www.youtube.com/watch?v=Svs7yP7VlNU" }]
    },
    {
      id: "history",
      title: "History",
      chapters: 5,
      lessons: 10,
      desc: "India and the Contemporary World - I chapters.",
      color: "#D97706",
      directUrl: "https://www.youtube.com/watch?v=GMojx-QoeuM",
      currentTopic: "Chapter 1: The French Revolution",
      subtitle: "Video 1 of 10",
      formulaLeft: "World History",
      formulaRight: "Revolutions",
      syllabusList: [{ name: "Chapter 1: The French Revolution", direct: "https://www.youtube.com/watch?v=GMojx-QoeuM" }]
    },
    {
      id: "geography",
      title: "Geography",
      chapters: 6,
      lessons: 12,
      desc: "Contemporary India - I chapters.",
      color: "#0D9488",
      directUrl: "https://www.youtube.com/watch?v=aM_h74c6Z-Y",
      currentTopic: "Chapter 1: India – Size and Location",
      subtitle: "Video 1 of 12",
      formulaLeft: "Physical Geography",
      formulaRight: "Climate",
      syllabusList: [{ name: "Chapter 1: India – Size and Location", direct: "https://www.youtube.com/watch?v=aM_h74c6Z-Y" }]
    },
    {
      id: "civics",
      title: "Civics",
      chapters: 5,
      lessons: 10,
      desc: "Democratic Politics - I chapters.",
      color: "#4F46E5",
      directUrl: "https://www.youtube.com/watch?v=Pj1G3E4S-gQ",
      currentTopic: "Chapter 1: What is Democracy? Why Democracy?",
      subtitle: "Video 1 of 10",
      formulaLeft: "Political Science",
      formulaRight: "Democracy",
      syllabusList: [{ name: "Chapter 1: What is Democracy?", direct: "https://www.youtube.com/watch?v=Pj1G3E4S-gQ" }]
    },
    {
      id: "economics",
      title: "Economics",
      chapters: 4,
      lessons: 8,
      desc: "The Story of Village Palampur, People as Resource, Poverty, Food Security.",
      color: "#EA580C",
      directUrl: "https://www.youtube.com/watch?v=GMojx-QoeuM",
      currentTopic: "Chapter 1: The Story of Village Palampur",
      subtitle: "Video 1 of 8",
      formulaLeft: "Economic Development",
      formulaRight: "Resources",
      syllabusList: [{ name: "Chapter 1: Village Palampur", direct: "https://www.youtube.com/watch?v=GMojx-QoeuM" }]
    },
    {
      id: "computer_basics",
      title: "Computer Basics",
      chapters: 6,
      lessons: 12,
      desc: "1. Python Programming Basics, 2. Computer Architecture, 3. Flowcharts & Pseudocode, 4. Data Structures Intro.",
      color: "#06B6D4",
      directUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      currentTopic: "Chapter 1: Python Programming Basics",
      subtitle: "Video 1 of 12",
      formulaLeft: "Programming Logic",
      formulaRight: "Python & Algorithms",
      syllabusList: [
        { name: "Chapter 1: Python Programming Basics", direct: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { name: "Chapter 2: Flowcharts & Pseudocode", direct: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
      ]
    }
  ];

  // ==================== CLASS 10 COMPLETE COURSE TEMPLATES ====================
  const class10CourseTemplates = [
    {
      id: "telugu",
      title: "Telugu",
      chapters: 13,
      lessons: 26,
      desc: "Class 10 Telugu: Poetry, Prose & రామాయణం ఉపవాచకం.",
      color: "#0284c7",
      directUrl: "https://www.youtube.com/watch?v=Um7KWrJCSoU",
      currentTopic: "Poetry 1: మాతృభావన (Maatrubhavana)",
      subtitle: "Video 1 of 26",
      formulaLeft: "Class 10 Telugu",
      formulaRight: "పద్య, గద్య & రామాయణం",
      syllabusList: [{ name: "Poetry 1: మాతృభావన", direct: "https://www.youtube.com/watch?v=Um7KWrJCSoU" }]
    },
    {
      id: "hindi",
      title: "Hindi",
      chapters: 19,
      lessons: 38,
      desc: "Class 10 Hindi (19 Lessons): बरसते बदल, ईदगाह, etc.",
      color: "#e11d48",
      directUrl: "https://www.youtube.com/watch?v=BLRkBJ0e0fo",
      currentTopic: "Chapter 1: बरसते बदल (Baraste Badal)",
      subtitle: "Video 1 of 38",
      formulaLeft: "Class 10 Hindi",
      formulaRight: "Kavita & Kahani",
      syllabusList: [{ name: "1. बरसते बदल", direct: "https://www.youtube.com/watch?v=19wEnmoplgI" }]
    },
    {
      id: "english",
      title: "English",
      chapters: 18,
      lessons: 36,
      desc: "Class 10 English: First Flight & Footprints Without Feet.",
      color: "#8b5cf6",
      directUrl: "https://www.youtube.com/watch?v=Sdf8qkkRCeA",
      currentTopic: "Unit 1: A Letter to God",
      subtitle: "Video 1 of 36",
      formulaLeft: "First Flight & Footprints",
      formulaRight: "Prose & Poems",
      syllabusList: [{ name: "Unit 1: A Letter to God", direct: "https://www.youtube.com/watch?v=MOzJXWf-Yps" }]
    },
    {
      id: "math",
      title: "Mathematics",
      chapters: 14,
      lessons: 28,
      desc: "Real Numbers, Polynomials, Linear Equations, Quadratic Equations, Arithmetic Progressions, Triangles, Trigonometry, Statistics, Probability.",
      color: "#2563eb",
      directUrl: "https://www.youtube.com/watch?v=GMojx-QoeuM",
      currentTopic: "Chapter 1: Real Numbers",
      subtitle: "Video 1 of 28",
      formulaLeft: "Algebra & Trigonometry",
      formulaRight: "Statistics & Geometry",
      syllabusList: [{ name: "Chapter 1: Real Numbers", direct: "https://www.youtube.com/watch?v=GMojx-QoeuM" }]
    },
    {
      id: "physical_science",
      title: "Physical Science",
      chapters: 8,
      lessons: 16,
      desc: "Chemical Reactions, Acids & Bases, Metals, Carbon, Light, Human Eye, Electricity, Magnetism.",
      color: "#059669",
      directUrl: "https://www.youtube.com/watch?v=06SK5f_KPpo",
      currentTopic: "Unit 1: Chemical Reactions and Equations",
      subtitle: "Video 1 of 16",
      formulaLeft: "Physics & Chemistry",
      formulaRight: "Optics & Electricity",
      syllabusList: [{ name: "Unit 1: Chemical Reactions", direct: "https://www.youtube.com/watch?v=06SK5f_KPpo" }]
    },
    {
      id: "biology",
      title: "Biology",
      chapters: 5,
      lessons: 10,
      desc: "Life Processes, Control and Co-ordination, Reproduction, Heredity, Environment.",
      color: "#10B981",
      directUrl: "https://www.youtube.com/watch?v=Svs7yP7VlNU",
      currentTopic: "Unit 1: Life Processes",
      subtitle: "Video 1 of 10",
      formulaLeft: "Botany & Zoology",
      formulaRight: "Genetics & Environment",
      syllabusList: [{ name: "Unit 1: Life Processes", direct: "https://www.youtube.com/watch?v=Svs7yP7VlNU" }]
    },
    {
      id: "history",
      title: "History",
      chapters: 5,
      lessons: 10,
      desc: "India and the Contemporary World - II chapters.",
      color: "#D97706",
      directUrl: "https://www.youtube.com/watch?v=GMojx-QoeuM",
      currentTopic: "Chapter 1: The Rise of Nationalism in Europe",
      subtitle: "Video 1 of 10",
      formulaLeft: "Modern World History",
      formulaRight: "Nationalism & Print",
      syllabusList: [{ name: "Chapter 1: Nationalism in Europe", direct: "https://www.youtube.com/watch?v=GMojx-QoeuM" }]
    },
    {
      id: "geography",
      title: "Geography",
      chapters: 7,
      lessons: 14,
      desc: "Contemporary India - II chapters.",
      color: "#0D9488",
      directUrl: "https://www.youtube.com/watch?v=aM_h74c6Z-Y",
      currentTopic: "Chapter 1: Resources and Development",
      subtitle: "Video 1 of 14",
      formulaLeft: "Contemporary India",
      formulaRight: "Resources & Economy",
      syllabusList: [{ name: "Chapter 1: Resources and Development", direct: "https://www.youtube.com/watch?v=aM_h74c6Z-Y" }]
    },
    {
      id: "civics",
      title: "Civics",
      chapters: 5,
      lessons: 10,
      desc: "Democratic Politics - II chapters.",
      color: "#4F46E5",
      directUrl: "https://www.youtube.com/watch?v=Pj1G3E4S-gQ",
      currentTopic: "Chapter 1: Power Sharing",
      subtitle: "Video 1 of 10",
      formulaLeft: "Democratic Politics",
      formulaRight: "Federalism & Parties",
      syllabusList: [{ name: "Chapter 1: Power Sharing", direct: "https://www.youtube.com/watch?v=Pj1G3E4S-gQ" }]
    },
    {
      id: "economics",
      title: "Economics",
      chapters: 5,
      lessons: 10,
      desc: "Understanding Economic Development chapters.",
      color: "#EA580C",
      directUrl: "https://www.youtube.com/watch?v=GMojx-QoeuM",
      currentTopic: "Chapter 1: Development",
      subtitle: "Video 1 of 10",
      formulaLeft: "Economic Development",
      formulaRight: "Globalization",
      syllabusList: [{ name: "Chapter 1: Development", direct: "https://www.youtube.com/watch?v=GMojx-QoeuM" }]
    },
    {
      id: "computer_basics",
      title: "Computer Basics",
      chapters: 6,
      lessons: 12,
      desc: "1. Advanced HTML & Web Design, 2. Cyber Security & Internet Safety, 3. Database Management Systems, 4. IT Applications.",
      color: "#06B6D4",
      directUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      currentTopic: "Chapter 1: Advanced HTML & Web Design",
      subtitle: "Video 1 of 12",
      formulaLeft: "Web Development & IT",
      formulaRight: "Cyber Security",
      syllabusList: [
        { name: "Chapter 1: Advanced HTML & Web Design", direct: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { name: "Chapter 2: Cyber Security & Internet Safety", direct: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
      ]
    }
  ];

  // Dynamically select templates based on user class (supports 6, 7, 8, 9, 10)
  const defaultCourseTemplates =
    studentClass === "10"
      ? class10CourseTemplates
      : studentClass === "9"
      ? class9CourseTemplates
      : studentClass === "8"
      ? class8CourseTemplates
      : studentClass === "7"
      ? class7CourseTemplates
      : class6CourseTemplates;

  const coursesList = defaultCourseTemplates.map((template) => ({
    ...template,
    progress: (user.courseProgressMap && user.courseProgressMap[template.id]) || 0
  }));

  const overallProgressPercent = Math.round(
    Object.values(user.courseProgressMap || {}).reduce((sum, val) => sum + (val || 0), 0) /
      defaultCourseTemplates.length
  );

  // DIRECT REDIRECT METHOD: Opens YouTube link directly in a new browser tab
  const handleDirectOpenVideo = (directUrl, title, topic) => {
    if (directUrl) {
      window.open(directUrl, "_blank", "noopener,noreferrer");
    } else {
      window.open("https://www.youtube.com/results?search_query=" + encodeURIComponent(title + " " + topic), "_blank", "noopener,noreferrer");
    }
  };

  const handleMarkLessonCompleted = (courseId, courseTitle) => {
    const courseProgressMap = user.courseProgressMap || {};
    const currentProg = courseProgressMap[courseId] || 0;
    const newProg = Math.min(100, currentProg + 25);
    const updatedMap = { ...courseProgressMap, [courseId]: newProg };

    const updatedUser = {
      ...user,
      courseProgressMap: updatedMap,
      recentActivities: [
        {
          id: `act-${Date.now()}`,
          type: "Completed",
          title: `Completed Lesson in ${courseTitle}`,
          time: "Just now",
          icon: "✓",
          color: "#10B981",
          matter: {
            heading: `${courseTitle} Lesson Completed`,
            summary: `Progress in ${courseTitle} increased to ${newProg}%.`,
            score: `Course Progress: ${newProg}%`,
            actionPath: "/courses",
            actionText: "Keep Learning"
          }
        },
        ...(user.recentActivities || [])
      ]
    };

    setUser(updatedUser);
    localStorage.setItem("current_user", JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    localStorage.removeItem("studentLoggedIn");
    navigate("/student-login");
  };

  const courseCategories = [
    { id: "All Courses", label: "All Courses", icon: "▦" },
    { id: "Telugu", label: "Telugu", icon: "🪶" },
    { id: "Hindi", label: "Hindi", icon: "🇮🇳" },
    { id: "English", label: "English", icon: "📕" },
    { id: "Mathematics", label: "Mathematics", icon: "📖" },
    ...(studentClass === "6" || studentClass === "7" ? [{ id: "Science", label: "Science", icon: "🔬" }] : []),
    ...(studentClass === "8" || studentClass === "9" || studentClass === "10" ? [{ id: "Physical Science", label: "Physical Science", icon: "⚗️" }, { id: "Biology", label: "Biology", icon: "🧬" }] : []),
    ...(studentClass === "6" || studentClass === "7" ? [{ id: "Social Science", label: "Social Science", icon: "🌍" }] : []),
    ...(studentClass === "8" || studentClass === "9" || studentClass === "10" ? [{ id: "History", label: "History", icon: "🏛️" }, { id: "Geography", label: "Geography", icon: "🌍" }, { id: "Civics", label: "Civics", icon: "⚖️" }] : []),
    ...((studentClass === "9" || studentClass === "10") ? [{ id: "Economics", label: "Economics", icon: "📈" }] : []),
    { id: "Computer Basics", label: "Computer Basics", icon: "💻" }
  ];

  const activeHighlightedCourse =
    selectedCategory === "All Courses"
      ? coursesList[0]
      : coursesList.find((c) => c.title === selectedCategory) || coursesList[0];

  const filteredCourses = coursesList.filter((c) => {
    const matchesCategory =
      selectedCategory === "All Courses" || c.title === selectedCategory;
    const matchesQuery =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

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
        .ps-nav-item { display: flex; align-items: center; justify-content: space-between; width: 100%; background: transparent; border: none; color: #94A3B8; padding: 10px 14px; border-radius: 9px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; text-align: left; }
        .ps-nav-item:hover { background-color: rgba(255, 255, 255, 0.06); color: #FFFFFF; }
        .ps-nav-item.active { background-color: #1E60F8; color: #FFFFFF; font-weight: 600; }
        .ps-nav-item-left { display: flex; align-items: center; gap: 12px; }
        .ps-logout-wrap { padding: 14px 14px 18px 14px; border-top: 1px solid rgba(255, 255, 255, 0.07); }
        .ps-logout-btn { width: 100%; display: flex; align-items: center; gap: 12px; background: transparent; border: none; color: #EF4444; padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }

        .ps-main { flex: 1; margin-left: 240px; display: flex; flex-direction: column; min-width: 0; padding-bottom: 50px; }
        .ps-header { position: sticky; top: 0; z-index: 100; background: #FFFFFF; height: 64px; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; }
        .ps-header-left { display: flex; align-items: center; gap: 14px; }
        .ps-hamburger { background: none; border: none; font-size: 22px; cursor: pointer; color: #334155; display: none; }
        .ps-header-titles h1 { font-size: 15.5px; font-weight: 700; color: #0F172A; }
        .ps-header-titles p { font-size: 11.5px; color: #64748B; }
        .ps-header-right { display: flex; align-items: center; gap: 20px; }
        .ps-bell-button { position: relative; background: none; border: none; cursor: pointer; color: #475569; display: flex; }
        .ps-bell-dot { position: absolute; top: -5px; right: -5px; width: 16px; height: 16px; border-radius: 50%; background: #EF4444; color: #FFFFFF; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
        .ps-profile-chip { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .ps-avatar-circle { width: 38px; height: 38px; border-radius: 50%; background: #FED7AA; display: flex; align-items: center; justify-content: center; font-size: 18px; }
        .ps-profile-text strong { display: block; font-size: 13px; font-weight: 700; color: #0F172A; }
        .ps-profile-text span { font-size: 11px; color: #64748B; }

        .ps-content { padding: 24px 28px; display: flex; flex-direction: column; gap: 24px; }

        .ps-course-banner { background: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; }
        .ps-banner-info { display: flex; align-items: center; gap: 16px; }
        .ps-banner-icon { width: 48px; height: 48px; background: #2563EB; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #FFFFFF; }
        .ps-banner-stats { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 10px 18px; display: flex; align-items: center; gap: 16px; }

        .ps-filter-tabs { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .ps-tab-btn { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 10px; padding: 9px 16px; font-size: 13px; font-weight: 600; color: #475569; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.15s; }
        .ps-tab-btn.active { background: #2563EB; color: #FFFFFF; border-color: #2563EB; }

        .ps-layout-split { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }

        .ps-cont-card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 20px; margin-bottom: 24px; }
        .ps-cont-body { display: flex; align-items: center; gap: 20px; margin-top: 14px; flex-wrap: wrap; }
        .ps-cont-thumb { width: 220px; height: 110px; background: #0F172A; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; cursor: pointer; color: #FFFFFF; font-size: 12px; transition: opacity 0.15s; }
        .ps-cont-thumb:hover { opacity: 0.95; }
        .ps-play-circle { width: 40px; height: 40px; border-radius: 50%; background: rgba(255, 255, 255, 0.9); display: flex; align-items: center; justify-content: center; color: #2563EB; font-size: 18px; margin-bottom: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
        .ps-cont-info { flex: 1; min-width: 250px; }
        .ps-sub-pill { font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; display: inline-block; margin-bottom: 6px; }
        .ps-bar-bg { width: 100%; height: 7px; background: #F1F5F9; border-radius: 10px; overflow: hidden; margin: 12px 0 6px 0; }
        .ps-bar-fill { height: 100%; border-radius: 10px; transition: width 0.3s; }

        .ps-grid-heading-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .ps-search-box { position: relative; width: 260px; }
        .ps-search-box input { width: 100%; padding: 8px 12px 8px 34px; border-radius: 10px; border: 1px solid #CBD5E1; font-size: 12px; outline: none; }
        .ps-search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #94A3B8; }

        .ps-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; }
        .ps-course-card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.15s, box-shadow 0.15s; }
        .ps-course-card:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05); }
        .ps-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; }
        .ps-c-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #FFFFFF; }
        .ps-card-btns { display: flex; gap: 8px; margin-top: 16px; }
        .ps-btn-primary { flex: 1; background: #2563EB; color: #FFFFFF; border: none; padding: 9px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .ps-btn-secondary { flex: 1; background: #F8FAFC; color: #475569; border: 1px solid #CBD5E1; padding: 9px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; }

        .ps-need-card { background: #FFFFFF; border: 1.5px dashed #CBD5E1; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 10px; min-height: 240px; }
        .ps-need-btn { background: #EFF6FF; color: #2563EB; border: 1px solid #BFDBFE; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; }

        .ps-side-panel { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 20px; margin-bottom: 20px; }
        .ps-side-title { font-size: 14px; font-weight: 700; color: #0F172A; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; }
        
        .ps-q-item { display: flex; align-items: center; justify-content: space-between; padding: 12px 10px; border-radius: 10px; border: 1px solid #F1F5F9; margin-bottom: 8px; cursor: pointer; transition: all 0.15s; }
        .ps-q-item:hover { background: #F8FAFC; border-color: #E2E8F0; }
        .ps-q-left { display: flex; align-items: center; gap: 12px; }
        .ps-q-icon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }

        .ps-act-cell { display: flex; align-items: center; gap: 12px; padding: 10px 8px; border-radius: 8px; cursor: pointer; transition: background 0.15s; margin-bottom: 6px; }
        .ps-act-cell:hover { background: #F8FAFC; }
        .ps-act-icon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; }

        .ps-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .ps-modal-box { background: #FFFFFF; border-radius: 16px; width: 100%; max-width: 680px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15); }
        .ps-modal-header { padding: 16px 20px; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; }
        .ps-modal-body { padding: 20px; }

        @media (max-width: 1024px) {
          .ps-sidebar { transform: translateX(-100%); }
          .ps-main { margin-left: 0; }
          .ps-hamburger { display: block; }
          .ps-layout-split { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* SIDEBAR NAVIGATION */}
      <aside className={`ps-sidebar ${mobileMenuOpen ? "open" : ""}`}>
        <div className="ps-brand">
          <div className="ps-brand-badge">🎓</div>
          <div className="ps-brand-text">
            <h2>Smart Education</h2>
            <p>Nabha</p>
          </div>
        </div>

        <nav className="ps-nav">
          <button onClick={() => navigate("/student-dashboard")} className="ps-nav-item">
            <div className="ps-nav-item-left">
              {renderSvgIcon("dashboard", 18)}
              <span>Dashboard</span>
            </div>
          </button>
          <button onClick={() => navigate("/courses")} className="ps-nav-item active">
            <div className="ps-nav-item-left">
              {renderSvgIcon("book-open", 18, "#FFFFFF")}
              <span>My Courses</span>
            </div>
          </button>
          <button onClick={() => navigate("/live-classes")} className="ps-nav-item">
            <div className="ps-nav-item-left">
              {renderSvgIcon("video", 18)}
              <span>Live Classes</span>
            </div>
          </button>
          <button onClick={() => navigate("/assignments")} className="ps-nav-item">
            <div className="ps-nav-item-left">
              {renderSvgIcon("clipboard", 18)}
              <span>Assignments</span>
            </div>
          </button>
          <button onClick={() => navigate("/quizzes")} className="ps-nav-item">
            <div className="ps-nav-item-left">
              {renderSvgIcon("check-circle", 18)}
              <span>Quizzes</span>
            </div>
          </button>
          <button onClick={() => navigate("/digital-library")} className="ps-nav-item">
            <div className="ps-nav-item-left">
              {renderSvgIcon("library", 18)}
              <span>Digital Library</span>
            </div>
          </button>
          <button onClick={() => navigate("/notes")} className="ps-nav-item">
            <div className="ps-nav-item-left">
              {renderSvgIcon("file-text", 18)}
              <span>Notes</span>
            </div>
          </button>
          <button onClick={() => navigate("/doubt-centre")} className="ps-nav-item">
            <div className="ps-nav-item-left">
              {renderSvgIcon("help-circle", 18)}
              <span>Doubt Centre</span>
            </div>
          </button>
          <button onClick={() => navigate("/ai-agent")} className="ps-nav-item">
            <div className="ps-nav-item-left">
              {renderSvgIcon("bot", 18)}
              <span>AI Agent</span>
            </div>
          </button>
          <button onClick={() => navigate("/progress")} className="ps-nav-item">
            <div className="ps-nav-item-left">
              {renderSvgIcon("trending-up", 18)}
              <span>Progress</span>
            </div>
          </button>
          <button onClick={() => navigate("/certificates")} className="ps-nav-item">
            <div className="ps-nav-item-left">
              {renderSvgIcon("award", 18)}
              <span>Certificates</span>
            </div>
          </button>
          <button onClick={() => navigate("/announcements")} className="ps-nav-item">
            <div className="ps-nav-item-left">
              {renderSvgIcon("bell", 18)}
              <span>Announcements</span>
            </div>
          </button>
          <button onClick={() => navigate("/settings")} className="ps-nav-item">
            <div className="ps-nav-item-left">
              {renderSvgIcon("settings", 18)}
              <span>Settings</span>
            </div>
          </button>
        </nav>

        <div className="ps-logout-wrap">
          <button onClick={handleLogout} className="ps-logout-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="ps-main">
        <header className="ps-header">
          <div className="ps-header-left">
            <button className="ps-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              ☰
            </button>
            <div className="ps-header-titles">
              <h1>Digital Learning Platform</h1>
              <p>For Rural School Students in Nabha</p>
            </div>
          </div>

          <div className="ps-header-right">
            <button className="ps-bell-button" onClick={() => navigate("/announcements")}>
              {renderSvgIcon("bell", 20, "#475569")}
              <div className="ps-bell-dot">3</div>
            </button>

            <div className="ps-profile-chip" onClick={() => navigate("/settings")}>
              <div className="ps-avatar-circle">👩‍🎓</div>
              <div className="ps-profile-text">
                <strong>{user.name || "Student"}</strong>
                <span>Class {studentClass}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="ps-content">
          <div className="ps-course-banner">
            <div className="ps-banner-info">
              <div className="ps-banner-icon">📖</div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700 }}>My Courses (Class {studentClass})</h2>
                <p style={{ fontSize: 12, color: "#64748B" }}>Explore your enrolled Class {studentClass} subjects and continue learning</p>
              </div>
            </div>
            <div className="ps-banner-stats">
              <span style={{ fontSize: 22 }}>🗓️</span>
              <div>
                <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700 }}>Total Courses</div>
                <div style={{ fontSize: 14, fontWeight: 800 }}>{defaultCourseTemplates.length} Enrolled</div>
              </div>
              <span style={{ fontSize: 24 }}>📚🎓</span>
            </div>
          </div>

          {/* Subject Categories */}
          <div className="ps-filter-tabs">
            {courseCategories.map((cat) => (
              <button
                key={cat.id}
                className={`ps-tab-btn ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Main Body */}
          <div className="ps-layout-split">
            <div>
              {/* Continue Learning Featured Section */}
              <div className="ps-cont-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: activeHighlightedCourse.color, fontSize: 16 }}>▶</span>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700 }}>Continue Learning</h3>
                      <p style={{ fontSize: 11, color: "#64748B" }}>Pick up where you left off</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategory("All Courses");
                      setSearchQuery("");
                    }}
                    style={{ background: "none", border: "none", color: "#2563EB", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                  >
                    View All →
                  </button>
                </div>

                <div className="ps-cont-body">
                  <div
                    className="ps-cont-thumb"
                    onClick={() =>
                      handleDirectOpenVideo(
                        activeHighlightedCourse.directUrl,
                        activeHighlightedCourse.title,
                        activeHighlightedCourse.currentTopic
                      )
                    }
                  >
                    <span style={{ position: "absolute", top: 10, left: 12, fontSize: 11, fontWeight: 600 }}>
                      {activeHighlightedCourse.title}
                    </span>
                    <div className="ps-play-circle" style={{ color: activeHighlightedCourse.color }}>▶</div>
                    <span style={{ position: "absolute", bottom: 8, left: 12, color: "#94A3B8", fontSize: 10 }}>
                      {activeHighlightedCourse.formulaLeft}
                    </span>
                    <span style={{ position: "absolute", bottom: 8, right: 12, color: "#94A3B8", fontSize: 10 }}>
                      {activeHighlightedCourse.formulaRight}
                    </span>
                  </div>

                  <div className="ps-cont-info">
                    <span
                      className="ps-sub-pill"
                      style={{
                        color: activeHighlightedCourse.color,
                        background: `${activeHighlightedCourse.color}15`
                      }}
                    >
                      {activeHighlightedCourse.title}
                    </span>
                    <h4 style={{ fontSize: 15, fontWeight: 700 }}>{activeHighlightedCourse.currentTopic}</h4>
                    <p style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>{activeHighlightedCourse.subtitle}</p>
                    <div className="ps-bar-bg">
                      <div
                        className="ps-bar-fill"
                        style={{ width: `${activeHighlightedCourse.progress}%`, backgroundColor: activeHighlightedCourse.color }}
                      ></div>
                    </div>
                    <div style={{ textAlign: "right", fontSize: 11, fontWeight: 700, color: activeHighlightedCourse.color }}>
                      {activeHighlightedCourse.progress}%
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <button
                      className="ps-btn-primary"
                      style={{ backgroundColor: activeHighlightedCourse.color, padding: "10px 18px", width: "auto" }}
                      onClick={() =>
                        handleDirectOpenVideo(
                          activeHighlightedCourse.directUrl,
                          activeHighlightedCourse.title,
                          activeHighlightedCourse.currentTopic
                        )
                      }
                    >
                      <span>▶</span>
                      <span>{activeHighlightedCourse.progress === 0 ? "Start Learning" : "Continue Learning"}</span>
                    </button>
                    <button
                      onClick={() => handleMarkLessonCompleted(activeHighlightedCourse.id, activeHighlightedCourse.title)}
                      style={{ background: "#DCFCE7", color: "#15803D", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                    >
                      ✓ Mark Completed (+25%)
                    </button>
                  </div>
                </div>
              </div>

              {/* Enrolled Courses Grid */}
              <div id="enrolled-courses-section">
                <div className="ps-grid-heading-row">
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>Enrolled Courses (Class {studentClass})</h3>
                  <div className="ps-search-box">
                    <span className="ps-search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="ps-cards-grid">
                  {filteredCourses.map((c) => (
                    <div key={c.id} className="ps-course-card">
                      <div>
                        <div className="ps-card-top">
                          <div className="ps-c-icon" style={{ backgroundColor: c.color }}>
                            {c.title === "Mathematics"
                              ? "+-×÷"
                              : c.title === "Physical Science"
                              ? "⚗️"
                              : c.title === "Biology"
                              ? "🧬"
                              : c.title === "Science"
                              ? "🔬"
                              : c.title === "History"
                              ? "🏛️"
                              : c.title === "Geography"
                              ? "🌍"
                              : c.title === "Civics"
                              ? "⚖️"
                              : c.title === "Economics"
                              ? "📈"
                              : c.title === "Social Science"
                              ? "🌍"
                              : c.title === "English"
                              ? "📖"
                              : c.title === "Hindi"
                              ? "🇮🇳"
                              : c.title === "Computer Basics"
                              ? "💻"
                              : "🪶"}
                          </div>
                          <span style={{ color: "#CBD5E1", fontSize: 14 }}>›</span>
                        </div>
                        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{c.title}</h4>
                        <p style={{ fontSize: 11, color: "#94A3B8", marginBottom: 8 }}>{c.chapters} Chapters • {c.lessons} Lessons</p>
                        <p style={{ fontSize: 11.5, color: "#64748B", lineHeight: 1.4 }}>{c.desc}</p>
                      </div>

                      <div>
                        <div className="ps-bar-bg" style={{ marginTop: 14 }}>
                          <div className="ps-bar-fill" style={{ width: `${c.progress}%`, backgroundColor: c.color }}></div>
                        </div>
                        <div style={{ textAlign: "right", fontSize: 11, fontWeight: 700, color: "#0F172A", marginTop: 4 }}>
                          {c.progress}%
                        </div>

                        <div className="ps-card-btns">
                          <button
                            className="ps-btn-primary"
                            style={{ backgroundColor: c.color }}
                            onClick={() => handleDirectOpenVideo(c.directUrl, c.title, c.currentTopic)}
                          >
                            <span>▶</span>
                            <span>{c.progress === 0 ? "Start" : "Continue"}</span>
                          </button>
                          <button
                            className="ps-btn-secondary"
                            onClick={() => setActiveDetails(c)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Need Another Course CTA */}
                  <div className="ps-need-card">
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#2563EB", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                      +
                    </div>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 700 }}>Need Another Course?</h4>
                      <p style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>Explore more languages and subjects to expand your knowledge.</p>
                    </div>
                    <button
                      className="ps-need-btn"
                      onClick={() => {
                        setSelectedCategory("All Courses");
                        setSearchQuery("");
                        const target = document.getElementById("enrolled-courses-section");
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Browse All Courses
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar Section */}
            <div>
              <div className="ps-side-panel">
                <h4 className="ps-side-title">Your Learning Progress</h4>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ position: "relative", width: 85, height: 85 }}>
                    <svg width="85" height="85" viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F1F5F9" strokeWidth="4" />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="4"
                        strokeDasharray={`${overallProgressPercent} ${100 - overallProgressPercent}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                      <strong style={{ fontSize: 14, fontWeight: 800 }}>{overallProgressPercent}%</strong>
                      <span style={{ fontSize: 7.5, color: "#64748B", display: "block" }}>Overall</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, fontSize: 11, maxHeight: "180px", overflowY: "auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#0284C7" }}>● Telugu</span>
                      <strong>{user.courseProgressMap?.telugu || 0}%</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#E11D48" }}>● Hindi</span>
                      <strong>{user.courseProgressMap?.hindi || 0}%</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#8B5CF6" }}>● English</span>
                      <strong>{user.courseProgressMap?.english || 0}%</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#2563EB" }}>● Math</span>
                      <strong>{user.courseProgressMap?.math || 0}%</strong>
                    </div>
                    {(studentClass === "6" || studentClass === "7") && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#059669" }}>● Science</span>
                        <strong>{user.courseProgressMap?.science || 0}%</strong>
                      </div>
                    )}
                    {(studentClass === "8" || studentClass === "9" || studentClass === "10") && (
                      <>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "#059669" }}>● Phys. Science</span>
                          <strong>{user.courseProgressMap?.physical_science || 0}%</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "#10B981" }}>● Biology</span>
                          <strong>{user.courseProgressMap?.biology || 0}%</strong>
                        </div>
                      </>
                    )}
                    {(studentClass === "6" || studentClass === "7") && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#D97706" }}>● Social Science</span>
                        <strong>{user.courseProgressMap?.social || 0}%</strong>
                      </div>
                    )}
                    {(studentClass === "8" || studentClass === "9" || studentClass === "10") && (
                      <>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "#D97706" }}>● History</span>
                          <strong>{user.courseProgressMap?.history || 0}%</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "#0D9488" }}>● Geography</span>
                          <strong>{user.courseProgressMap?.geography || 0}%</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "#4F46E5" }}>● Civics</span>
                          <strong>{user.courseProgressMap?.civics || 0}%</strong>
                        </div>
                      </>
                    )}
                    {(studentClass === "9" || studentClass === "10") && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#EA580C" }}>● Economics</span>
                        <strong>{user.courseProgressMap?.economics || 0}%</strong>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#06B6D4" }}>● Computer Basics</span>
                      <strong>{user.courseProgressMap?.computer_basics || 0}%</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="ps-side-panel">
                <h4 className="ps-side-title">Quick Actions</h4>
                
                <div
                  className="ps-q-item"
                  onClick={() => {
                    setSelectedCategory("All Courses");
                    setSearchQuery("");
                    const target = document.getElementById("enrolled-courses-section");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <div className="ps-q-left">
                    <div className="ps-q-icon" style={{ background: "#EFF6FF", color: "#2563EB" }}>📖</div>
                    <div>
                      <strong style={{ fontSize: 12, display: "block" }}>View All Courses</strong>
                      <span style={{ fontSize: 10, color: "#94A3B8" }}>Browse complete course list</span>
                    </div>
                  </div>
                  <span style={{ color: "#CBD5E1" }}>›</span>
                </div>

                <div className="ps-q-item" onClick={() => navigate("/digital-library")}>
                  <div className="ps-q-left">
                    <div className="ps-q-icon" style={{ background: "#ECFDF5", color: "#10B981" }}>⬇</div>
                    <div>
                      <strong style={{ fontSize: 12, display: "block" }}>Download Study Materials</strong>
                      <span style={{ fontSize: 10, color: "#94A3B8" }}>Access PDFs and resources</span>
                    </div>
                  </div>
                  <span style={{ color: "#CBD5E1" }}>›</span>
                </div>

                <div className="ps-q-item" onClick={() => navigate("/certificates")}>
                  <div className="ps-q-left">
                    <div className="ps-q-icon" style={{ background: "#FEF3C7", color: "#D97706" }}>🏆</div>
                    <div>
                      <strong style={{ fontSize: 12, display: "block" }}>My Certificates</strong>
                      <span style={{ fontSize: 10, color: "#94A3B8" }}>View your earned certificates</span>
                    </div>
                  </div>
                  <span style={{ color: "#CBD5E1" }}>›</span>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="ps-side-panel">
                <div className="ps-side-title">
                  <span>Recent Activity</span>
                  <button
                    onClick={() => setShowAllActivities(true)}
                    style={{ background: "none", border: "none", color: "#2563EB", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                  >
                    View All
                  </button>
                </div>

                <div>
                  {(user.recentActivities || []).slice(0, 4).map((act) => (
                    <div
                      key={act.id}
                      className="ps-act-cell"
                      onClick={() => setActiveActivity(act)}
                    >
                      <div className="ps-act-icon" style={{ backgroundColor: act.color }}>
                        {act.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11.5, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {act.title}
                        </div>
                        <div style={{ fontSize: 10, color: "#94A3B8" }}>{act.time}</div>
                      </div>
                      <span style={{ color: "#CBD5E1" }}>›</span>
                    </div>
                  ))}
                  {(!user.recentActivities || user.recentActivities.length === 0) && (
                    <p style={{ fontSize: 11, color: "#94A3B8", textAlign: "center", padding: "10px 0" }}>No recent activity yet. Start a lesson!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. COURSE DETAILS & INTERACTIVE CHAPTER LESSON LIST MODAL */}
      {activeDetails && (
        <div className="ps-modal-overlay" onClick={() => setActiveDetails(null)}>
          <div className="ps-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="ps-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: activeDetails.color, color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  📖
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700 }}>{activeDetails.title} Curriculum</h3>
                  <span style={{ fontSize: 11, color: "#64748B" }}>Class {studentClass} Complete Syllabus</span>
                </div>
              </div>
              <button onClick={() => setActiveDetails(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>
                ✕
              </button>
            </div>
            <div className="ps-modal-body" style={{ maxHeight: "450px", overflowY: "auto" }}>
              <p style={{ fontSize: 13, color: "#475569", marginBottom: 14 }}>{activeDetails.desc}</p>
              
              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: 14, marginBottom: 16 }}>
                <h5 style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>Complete Chapter & Lesson List (Click to open on YouTube):</h5>
                <ul style={{ paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {activeDetails.syllabusList?.map((ch, idx) => (
                    <li
                      key={idx}
                      style={{ fontSize: "12.5px", color: "#2563EB", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
                      onClick={() => {
                        setActiveDetails(null);
                        handleDirectOpenVideo(ch.direct, activeDetails.title, ch.name);
                      }}
                    >
                      {ch.name} ↗
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
                <div style={{ background: "#EFF6FF", padding: 10, borderRadius: 8, textAlign: "center" }}>
                  <span style={{ fontSize: 11, color: "#1D4ED8" }}>Total Chapters</span>
                  <strong style={{ display: "block", fontSize: 16 }}>{activeDetails.chapters} Chapters</strong>
                </div>
                <div style={{ background: "#DCFCE7", padding: 10, borderRadius: 8, textAlign: "center" }}>
                  <span style={{ fontSize: 11, color: "#15803D" }}>Current Progress</span>
                  <strong style={{ display: "block", fontSize: 16 }}>{activeDetails.progress}%</strong>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  className="ps-btn-primary"
                  onClick={() => {
                    const c = activeDetails;
                    setActiveDetails(null);
                    handleDirectOpenVideo(c.directUrl, c.title, c.currentTopic);
                  }}
                >
                  <span>▶</span> Open Main Video in YouTube
                </button>
                <button className="ps-btn-secondary" onClick={() => setActiveDetails(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. RECENT ACTIVITY DETAIL MODAL */}
      {activeActivity && (
        <div className="ps-modal-overlay" onClick={() => setActiveActivity(null)}>
          <div className="ps-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="ps-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: activeActivity.color, color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {activeActivity.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700 }}>{activeActivity.matter?.heading}</h3>
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>{activeActivity.time}</span>
                </div>
              </div>
              <button onClick={() => setActiveActivity(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>
            <div className="ps-modal-body">
              <p style={{ fontSize: 13, color: "#334155", marginBottom: 14, lineHeight: 1.5 }}>
                {activeActivity.matter?.summary}
              </p>
              
              <div style={{ background: "#F1F5F9", padding: "10px 14px", borderRadius: 8, display: "inline-block", marginBottom: 18, fontWeight: 700, fontSize: 12, color: "#0F172A" }}>
                {activeActivity.matter?.score}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button className="ps-btn-primary" onClick={() => setActiveActivity(null)}>
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ALL ACTIVITIES MODAL */}
      {showAllActivities && (
        <div className="ps-modal-overlay" onClick={() => setShowAllActivities(false)}>
          <div className="ps-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="ps-modal-header">
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>All Recent Activities</h3>
              <button onClick={() => setShowAllActivities(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>
            <div className="ps-modal-body" style={{ maxHeight: "420px", overflowY: "auto" }}>
              {(user.recentActivities || []).map((act) => (
                <div
                  key={act.id}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 10px", borderBottom: "1px solid #F1F5F9", cursor: "pointer" }}
                  onClick={() => {
                    setShowAllActivities(false);
                    setActiveActivity(act);
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: act.color, color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {act.icon}
                    </div>
                    <div>
                      <strong style={{ fontSize: 12, display: "block" }}>{act.title}</strong>
                      <span style={{ fontSize: 10, color: "#94A3B8" }}>{act.time}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: "#2563EB", fontWeight: 700 }}>Open</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}