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
    } catch {
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

  const classMatch = String(user.class || "6").match(/\d+/);
  const requestedClass = classMatch ? classMatch[0] : "6";
  const studentClass = ["6", "7", "8", "9", "10"].includes(requestedClass)
    ? requestedClass
    : "6";

  // ==================== CLASS 6 COMPLETE COURSE TEMPLATES ====================
  const class6CourseTemplates = [
    {
      id: "telugu",
      title: "Telugu",
      chapters: 8,
      lessons: 20,
      desc: "Telugu Thota / Telugu Baata-6: 1. అమ్మ ఒడి, 2. తృప్తి, 3. మాకొద్దీ తెల్లదొరతనము, 4. సమయస్ఫూర్తి, 5. శతక మధురిమ, 6. పోతన బాల్యము, 7. ఉడుత సాయం, 8. చెరువు, 9. నిజాయితీ, 10. ఎలుక - సింహం.",
      color: "#0284c7",
      directUrl: "https://www.youtube.com/watch?v=Um7KWrJCSoU",
      currentTopic: "Lesson 2: తృప్తి (Trupti)",
      subtitle: "Video 2 of 20",
      formulaLeft: "Telugu Thota-6",
      formulaRight: "పద్య & గద్య భాగాలు",
      syllabusList: [
        { name: "Lesson 1: Amma Odi" },
        { name: "Lesson 2: Trupti" },
        { name: "Lesson 3: Maakoddee Tella Doratanamu" },
        { name: "Lesson 4: Samayasphoorthi" },
        { name: "Lesson 5: Mana Mahaniyulu" },
        { name: "Lesson 6: Shataka Madhurima" },
        { name: "Lesson 7: Pothana Baalyamu" },
        { name: "Lesson 8: Uduta Saayam" }
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
        { name: "Chapter 1: Vah Chidiya Jo" },
        { name: "Chapter 2: Bachpan" },
        { name: "Chapter 3: Nadan Dost" },
        { name: "Chapter 4: Chand Se Thodi Si Gappe" },
        { name: "Chapter 5: Aksharon Ka Mahatva" },
        { name: "Chapter 6: Paar Nazar Ke" },
        { name: "Chapter 7: Sathi Haath Badhana" },
        { name: "Chapter 8: Aise-Aise" },
        { name: "Chapter 9: Ticket-Album" },
        { name: "Chapter 10: Jhansi Ki Rani" },
        { name: "Chapter 11: Jo Dekhkar Bhi Nahi Dekhte" },
        { name: "Chapter 12: Sansar Pustak Hai" },
        { name: "Chapter 13: Main Sabse Choti Houn" },
        { name: "Chapter 14: Lokgeet" },
        { name: "Chapter 15: Naukar" },
        { name: "Chapter 16: Van Ke Marg Mein" }
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
        { name: "Unit 1: Who Did Patrick's Homework? (Prose) | A House, A Home (Poem)" },
        { name: "Unit 2: How the Dog Found Himself a New Master! (Prose) | The Kite (Poem)" },
        { name: "Unit 3: Taro's Reward (Prose) | The Quarrel (Poem)" },
        { name: "Unit 4: An Indian-American Woman in Space: Kalpana Chawla (Prose) | Beauty (Poem)" },
        { name: "Unit 5: A Different Kind of School (Prose) | Where Do All the Teachers Go? (Poem)" },
        { name: "Unit 6: Who I Am (Prose) | The Wonderful Words (Poem)" },
        { name: "Unit 7: Fair Play (Prose)" },
        { name: "Unit 8: A Game of Chance (Prose) | Vocation (Poem)" },
        { name: "Unit 9: Desert Animals (Prose) | Whatif (Poem)" },
        { name: "Unit 10: The Banyan Tree (Prose)" }
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
        { name: "Chapter 1: Knowing Our Numbers" },
        { name: "Chapter 2: Whole Numbers" },
        { name: "Chapter 3: Playing with Numbers" },
        { name: "Chapter 4: Basic Geometrical Ideas" },
        { name: "Chapter 5: Understanding Elementary Shapes" },
        { name: "Chapter 6: Integers" },
        { name: "Chapter 7: Fractions" },
        { name: "Chapter 8: Decimals" },
        { name: "Chapter 9: Data Handling" },
        { name: "Chapter 10: Mensuration" },
        { name: "Chapter 11: Algebra" },
        { name: "Chapter 12: Ratio and Proportion" }
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
        { name: "Chapter 1: The Wonderful World of Science" },
        { name: "Chapter 2: Diversity in the Living World" },
        { name: "Chapter 3: Mindful Eating: A Path to a Healthy Body" },
        { name: "Chapter 4: Exploring Magnets" },
        { name: "Chapter 5: Measurement of Length and Motion" },
        { name: "Chapter 6: Materials Around Us" },
        { name: "Chapter 7: Temperature and its Measurement" },
        { name: "Chapter 8: A Journey through States of Water" },
        { name: "Chapter 9: Methods of Separation in Everyday Life" },
        { name: "Chapter 10: Living Creatures: Exploring their Characteristics" },
        { name: "Chapter 11: Nature's Treasures" },
        { name: "Chapter 12: Beyond Earth" }
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
        { name: "Chapter 1: Locating Places on the Earth" },
        { name: "Chapter 2: Oceans and Continents" },
        { name: "Chapter 3: Landforms and Life" },
        { name: "Chapter 4: Timeline and Sources of History" },
        { name: "Chapter 5: India, That Is Bharat" },
        { name: "Chapter 6: The Beginnings of Indian Civilisation" },
        { name: "Chapter 7: India's Cultural Roots" },
        { name: "Chapter 8: Unity in Diversity, or 'Many in the One'" },
        { name: "Chapter 9: Family and Community" },
        { name: "Chapter 10: Grassroots Democracy - Part 1: Governance" },
        { name: "Chapter 11: Grassroots Democracy - Part 2: Local Government in Rural Areas" },
        { name: "Chapter 12: Grassroots Democracy - Part 3: Local Government in Urban Areas" },
        { name: "Chapter 13: The Value of Work" },
        { name: "Chapter 14: Economic Activities Around Us" }
      ]
    },
    {
      id: "computer_basics",
      title: "Computer Basics",
      chapters: 3,
      lessons: 12,
      desc: "1. Introduction to Computers (Hardware & Software), 2. Operating System Basics, 3. Introduction to Word Processing (MS Word / Docs).",
      color: "#06B6D4",
      directUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      currentTopic: "Chapter 1: Introduction to Computers",
      subtitle: "Video 1 of 12",
      formulaLeft: "Computer Essentials",
      formulaRight: "Hardware & MS Word",
      syllabusList: [
        { name: "Chapter 1: Introduction to Computers (Hardware & Software)" },
        { name: "Chapter 2: Operating System Basics" },
        { name: "Chapter 3: Introduction to Word Processing (MS Word / Docs)" }
      ]
    }
  ];

  // ==================== CLASS 7 COURSE TEMPLATES ====================
  const class7CourseTemplates = [
    {
      id: "telugu",
      title: "Telugu",
      chapters: 13,
      lessons: 24,
      desc: "Class 7 Telugu: 1. అక్షరం, 2. సిరిమానోత్సవం, 3. గుణదల మేరీమాత ఉత్సవం, etc.",
      color: "#0284c7",
      directUrl: "https://www.youtube.com/watch?v=Um7KWrJCSoU",
      currentTopic: "Lesson 1: అక్షరం (Aksharam)",
      subtitle: "Video 1 of 24",
      formulaLeft: "Telugu Baata-7",
      formulaRight: "సాంస్కృతిక పాఠాలు",
      syllabusList: [
        { name: "Lesson 1: Samsiddata Karyakramam" },
        { name: "Lesson 2: Aksharam" },
        { name: "Lesson 3: Sirimanotsavam" },
        { name: "Lesson 4: Gunadala Mary Matha Utsavam" },
        { name: "Lesson 5: Maya Kambali" },
        { name: "Lesson 6: Chinni Shishuvu" },
        { name: "Lesson 7: Kotappakonda Prabhalu" },
        { name: "Lesson 8: Rottela Panduga" },
        { name: "Lesson 9: Matti Chettu" },
        { name: "Lesson 10: Ahobilam Parveta Utsavam" },
        { name: "Lesson 11: Padya Parimalam" },
        { name: "Lesson 12: Lepakshi Utsavalu" },
        { name: "Lesson 13: Kapatalli Pelli" }
      ]
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
      syllabusList: [
        { name: "Chapter 1: Gyan Hum Ko Deejiye" },
        { name: "Chapter 2: Hoshiyar Kauwa" },
        { name: "Chapter 3: Adivasi Nritya - Dhimsa" },
        { name: "Chapter 4: Hum Nanhe Bacche" },
        { name: "Chapter 5: Eemandari Ka Phal" },
        { name: "Chapter 6: Patra-Lekhan" },
        { name: "Chapter 7: Koyal" },
        { name: "Chapter 8: Aao Hindi Seekhen" },
        { name: "Chapter 9: Sahasi Balak" },
        { name: "Chapter 10: Kabir Ki Vaani" },
        { name: "Chapter 11: Safalta Ka Mantra" },
        { name: "Chapter 12: Kondapalli Ki Yatra" }
      ]
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
      syllabusList: [
        { name: "Unit 1: The Town Mouse and the Country Mouse & The New Blue Dress" },
        { name: "Unit 2: C.V. Raman, the Pride of India & Susruta" },
        { name: "Unit 3: Puru, the Brave & The Magic of Silk" },
        { name: "Unit 4: Tenali Paints a Horse & The Emperor's New Clothes" },
        { name: "Unit 5: A Trip to Andaman & Sindbad, the Sailor" },
        { name: "Unit 6: A Hero by R.K. Narayan & Learn How to Climb Trees" },
        { name: "Unit 7: The Wonderful World of Chess & The Koneru Humpy Story" },
        { name: "Unit 8: Snakes in India & Towards a Green World" }
      ]
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
      syllabusList: [
        { name: "Chapter 1: Integers" },
        { name: "Chapter 2: Fractions, Decimals, and Rational Numbers" },
        { name: "Chapter 3: Simple Equations" },
        { name: "Chapter 4: Lines and Angles" },
        { name: "Chapter 5: Triangles and Its Properties" },
        { name: "Chapter 6: Ratio - Applications / Comparing Quantities" },
        { name: "Chapter 7: Data Handling" },
        { name: "Chapter 8: Algebraic Expressions" },
        { name: "Chapter 9: Exponents and Powers" },
        { name: "Chapter 10: Symmetry" },
        { name: "Chapter 11: Perimeter and Area" },
        { name: "Chapter 12: Visualising Solid Shapes" }
      ]
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
      syllabusList: [
        { name: "Chapter 1: Food for Health" },
        { name: "Chapter 2: Nature of Substances" },
        { name: "Chapter 3: Nutrition in Organisms" },
        { name: "Chapter 4: Respiration and Circulation" },
        { name: "Chapter 5: Motion and Time" },
        { name: "Chapter 6: Electricity" },
        { name: "Chapter 7: Reproduction in Plants" },
        { name: "Chapter 8: Wonders of Light" },
        { name: "Chapter 9: Heat, Temperature, and Climate" },
        { name: "Chapter 10: Changes Around Us" },
        { name: "Chapter 11: Fibres to Fabrics" },
        { name: "Chapter 12: Soil and Water" }
      ]
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
      syllabusList: [
        { name: "Chapter 1: The Universe and the Earth" },
        { name: "Chapter 2: Forests" },
        { name: "Chapter 3: Learning through Maps" },
        { name: "Chapter 4: Rain and Rivers" },
        { name: "Chapter 5: Tanks and Ground Water" },
        { name: "Chapter 6: New Kings and Kingdoms" },
        { name: "Chapter 7: The Kakatiyas - Emergence of a Regional Kingdom" },
        { name: "Chapter 8: Oceans and Fishing" },
        { name: "Chapter 9: The Kings of Vijayanagara" },
        { name: "Chapter 10: Mughal Empire" },
        { name: "Chapter 11: Making of Laws in the State Assembly" },
        { name: "Chapter 12: Implementation of Laws in the District" },
        { name: "Chapter 13: Caste Discrimination and the Struggle for Equality" },
        { name: "Chapter 14: Livelihood and Struggles of Urban Workers" }
      ]
    },
    {
      id: "computer_basics",
      title: "Computer Basics",
      chapters: 3,
      lessons: 12,
      desc: "1. Computer Hardware & Software, 2. Spreadsheets & Presentations, 3. Internet Safety & Email, 4. Cyber Ethics.",
      color: "#06B6D4",
      directUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      currentTopic: "Chapter 1: Computer Hardware & Software",
      subtitle: "Video 1 of 12",
      formulaLeft: "Advanced IT Skills",
      formulaRight: "Software & Spreadsheets",
      syllabusList: [
        { name: "Chapter 1: Advanced MS Excel & Tables" },
        { name: "Chapter 2: Internet Browsing & Safety" },
        { name: "Chapter 3: Introduction to Presentation Tools" }
      ]
    }
  ];

  // ==================== CLASS 8 COURSE TEMPLATES ====================
  const class8CourseTemplates = [
    {
      id: "telugu",
      title: "Telugu",
      chapters: 10,
      lessons: 22,
      desc: "Telugu Baata-8: ఆంధ్ర వైభవం, శతక సౌరభం, మాతృభూమి, నా యాత్ర, etc.",
      color: "#0284c7",
      directUrl: "https://www.youtube.com/watch?v=Um7KWrJCSoU",
      currentTopic: "Lesson 1: ఆంధ్ర వైభవం (Andhra Vaibhavam)",
      subtitle: "Video 1 of 22",
      formulaLeft: "Telugu Baata-8",
      formulaRight: "గద్య & పద్య భాగాలు",
      syllabusList: [
        { name: "Lesson 1: ఆంధ్ర వైభవం (Andhra Vaibhavam)" },
        { name: "Lesson 2: శతక సౌరభం (Shataka Saurabham)" },
        { name: "Lesson 3: మాతృభూమి (Matrubhoomi)" },
        { name: "Lesson 4: నా యాత్ర (Naa Yaatra)" },
        { name: "Lesson 5: సందేశం (Sandesham)" },
        { name: "Lesson 6: పయనం (Payanam)" },
        { name: "Lesson 7: చిర మాలిన్యం (Chira Maalinyam)" },
        { name: "Lesson 8: మేలు మలుపు (Melu Malupu)" },
        { name: "Lesson 9: భువన విజయం (Bhuvana Vijayam)" },
        { name: "Lesson 10: సమ దృష్టి (Sama Drushti)" }
      ]
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
      syllabusList: [
        { name: "Chapter 1: हम होंगे कामयाब (Hum Honge Kamyab)" },
        { name: "Chapter 2: राजा बदल गया (Raja Badal Gaya)" },
        { name: "Chapter 3: प्यारा गाँव (Pyara Gaon)" },
        { name: "Chapter 4: कौन? (Kaun?)" },
        { name: "Chapter 5: धरती की आँखें (Dharti Ki Aankhen)" },
        { name: "Chapter 6: दिल्ली से पत्र (Delhi Se Patra)" },
        { name: "Chapter 7: त्योहारों का देश (Tyoharon Ka Desh)" },
        { name: "Chapter 8: चावल के दाने (Chawal Ke Dane)" },
        { name: "Chapter 9: मैं सिनेमा हूँ... (Main Cinema Hoon...)" },
        { name: "Chapter 10: अनमोल रत्न (Anmol Ratna)" },
        { name: "Chapter 11: हार के आगे जीत है (Haar Ke Aage Jeet Hai)" },
        { name: "Chapter 12: बढ़ते कदम (Badhte Kadam)" }
      ]
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
      syllabusList: [
        { name: "Unit 1: The Best Christmas Present in the World (Prose) | The Ant and the Cricket (Poem)" },
        { name: "Unit 2: The Tsunami (Prose) | Geography Lesson (Poem)" },
        { name: "Unit 3: Glimpses of the Past (Prose) | Macavity: The Mystery Cat (Poem)" },
        { name: "Unit 4: Bepin Choudhury's Lapse of Memory (Prose) | The Last Bargain (Poem)" },
        { name: "Unit 5: The Summit Within (Prose) | The School Boy (Poem)" },
        { name: "Unit 6: This is Jody's Fawn (Prose) | When I set out for Lyonnesse (Poem)" },
        { name: "Unit 7: A Visit to Cambridge (Prose) | On the Grasshopper and Cricket (Poem)" },
        { name: "Unit 8: A Short Monsoon Diary (Prose) | The Great Stone Face (Poem)" }
      ]
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
      syllabusList: [
        { name: "Chapter 1: Rational Numbers" },
        { name: "Chapter 2: Linear Equations in One Variable" },
        { name: "Chapter 3: Understanding Quadrilaterals" },
        { name: "Chapter 4: Data Handling" },
        { name: "Chapter 5: Squares and Square Roots" },
        { name: "Chapter 6: Cubes and Cube Roots" },
        { name: "Chapter 7: Comparing Quantities" },
        { name: "Chapter 8: Algebraic Expressions and Identities" },
        { name: "Chapter 9: Mensuration" },
        { name: "Chapter 10: Exponents and Powers" },
        { name: "Chapter 11: Direct and Inverse Proportions" },
        { name: "Chapter 12: Factorization" },
        { name: "Chapter 13: Introduction to Graphs" }
      ]
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
      syllabusList: [
        { name: "Chapter 1: Force and Pressure (బలము మరియు పీడనము)" },
        { name: "Chapter 2: Friction (ఘర్షణ)" },
        { name: "Chapter 3: Coal and Petroleum (బొగ్గు మరియు పెట్రోలియం)" },
        { name: "Chapter 4: Combustion and Flame (దహనము మరియు జ్వాల)" },
        { name: "Chapter 5: Materials: Metals and Non-Metals (లోహాలు మరియు అధోహాలు)" },
        { name: "Chapter 6: Synthetic Fibres and Plastics (కృత్రిమ దారాలు మరియుప్లాస్టిక్స్)" },
        { name: "Chapter 7: Sound (ధ్వని)" },
        { name: "Chapter 8: Chemical Effects of Electric Current (విద్యుత్ ప్రవాహం యొక్క రసాయనిక ఫలితాలు)" },
        { name: "Chapter 9: Light (కాంతి)" },
        { name: "Chapter 10: Some Natural Phenomena (కొన్ని సహజ దృగ్విషయాలు)" },
        { name: "Chapter 11: Stars and the Solar System (నక్షత్రాలు మరియు సౌర కుటుంబం)" }
      ]
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
      syllabusList: [
        { name: "Chapter 1: Cell - Structure and Functions (కణము - నిర్మాణం మరియు విధులు)" },
        { name: "Chapter 2: Microorganisms: Friend and Foe (సూక్ష్మజీవులు: స్నేహితుడు మరియు శత్రువు)" },
        { name: "Chapter 3: Crop Production and Management (పంటల ఉత్పత్తి మరియు యాజమాన్యం)" },
        { name: "Chapter 4: Reproduction in Animals (జంతువులలో ప్రత్యుత్పత్తి)" },
        { name: "Chapter 5: Reaching the Age of Adolescence (కౌమార దశకు చేరుకోవడం)" },
        { name: "Chapter 6: Conservation of Plants and Animals (మొక్కలు మరియు జంతువుల సంరక్షణ)" },
        { name: "Chapter 7: Pollution of Air and Water (గాలి మరియు నీటి కాలుష్యం)" }
      ]
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
      syllabusList: [
        { name: "Chapter 1: How, When and Where" },
        { name: "Chapter 2: From Trade to Territory" },
        { name: "Chapter 3: Ruling the Countryside" },
        { name: "Chapter 4: Tribals, Dikus and the Vision of a Golden Age" },
        { name: "Chapter 5: When People Rebel - 1857 and After" },
        { name: "Chapter 6: Civilising the Native, Educating the Nation" },
        { name: "Chapter 7: Women, Caste and Reform" },
        { name: "Chapter 8: The Making of the National Movement: 1870s-1947" }
      ]
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
      syllabusList: [
        { name: "Chapter 1: Resources" },
        { name: "Chapter 2: Land, Soil, Water, Natural Vegetation and Wildlife Resources" },
        { name: "Chapter 3: Agriculture" },
        { name: "Chapter 4: Industries" },
        { name: "Chapter 5: Human Resources" }
      ]
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
      syllabusList: [
        { name: "Chapter 1: The Indian Constitution" },
        { name: "Chapter 2: Understanding Secularism" },
        { name: "Chapter 3: Parliament and the Making of Laws" },
        { name: "Chapter 4: Judiciary" },
        { name: "Chapter 5: Understanding Marginalisation" },
        { name: "Chapter 6: Confronting Marginalisation" },
        { name: "Chapter 7: Public Facilities" },
        { name: "Chapter 8: Law and Social Justice" }
      ]
    },
    {
      id: "computer_basics",
      title: "Computer Basics",
      chapters: 4,
      lessons: 8,
      desc: "1. Operating Systems & Utility Software, 2. Database Management Basics, 3. Introduction to HTML, 4. Cyber Ethics.",
      color: "#06B6D4",
      directUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      currentTopic: "Chapter 1: Operating Systems & Utility Software",
      subtitle: "Video 1 of 12",
      formulaLeft: "Networking & HTML",
      formulaRight: "Database Management",
      syllabusList: [
        { name: "Chapter 1: Operating Systems & Utility Software" },
        { name: "Chapter 2: Database Management Basics" },
        { name: "Chapter 3: Introduction to HTML" },
        { name: "Chapter 4: Cyber Ethics" }
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
      syllabusList: [
        { name: "పాఠం 1: ధర్మబోధ (Dharmabodha) - Poetry" },
        { name: "పాఠం 2: చైతన్యం (Chaitanyam) - Poetry" },
        { name: "పాఠం 3: హరివిల్లు (Harivillu) - Poetry" },
        { name: "పాఠం 4: ఆత్మకథ (Aathmakatha) - Poetry" },
        { name: "పాఠం 5: స్నేహం (Sneham) - Poetry" },
        { name: "పాఠం 6: తీర్పు (Teerpu) - Poetry" },
        { name: "పాఠం 7: మాట మహిమ (Maata Mahima) - Poetry" },
        { name: "పాఠం 8: ఇల్లా లకగానే... (Illalaka Gaane) - Prose" },
        { name: "పాఠం 9: రంగస్థలం (Rangasthalam) - Prose" },
        { name: "పాఠం 10: ప్రియమైన నాన్నకు (Priyamaina Nannaku) - Prose" },
        { name: "పాఠం 11: ఆశావాది (Aashaavadi) - Prose" },
        { name: "పాఠం 12: ఏ దేశమేగినా (E Desamegina) - Prose" },
        { name: "పాఠం 13: నా చదువు (Naa Chaduvu) - Prose" },
        { name: "పాఠం 14: ఆకుపచ్చ శోకం (Aakupachcha Shokam) - Prose" }
      ]
    },
    {
      id: "hindi",
      title: "Hindi",
      chapters: 8,
      lessons: 16,
      desc: "Class 9 Hindi: seven lessons and a grammar chapter.",
      color: "#e11d48",
      directUrl: "https://www.youtube.com/watch?v=BLRkBJ0e0fo",
      currentTopic: "Chapter 1: जिस देश में गंगा बहती है",
      subtitle: "Video 1 of 18",
      formulaLeft: "Hindi Vallari-1",
      formulaRight: "Kavita & Kahani",
      syllabusList: [
        { name: "पाठ 1: गाना बजाना (Gana Bajana)" },
        { name: "पाठ 2: बदल गई सुजाता (Badal Gayi Sujata)" },
        { name: "पाठ 3: उपभोक्तावाद की संस्कृति (Upabhoktavad Ki Sanskruti)" },
        { name: "पाठ 4: चेतना के वाहक : सी. वी. रामन (C.V. Raman)" },
        { name: "पाठ 5: तुम कब जाओगे, अतिथि (Tum Kab Jaoge, Atithi)" },
        { name: "पाठ 6: कीचड़ का काव्य (Keechad Ka Kavya)" },
        { name: "पाठ 7: वैज्ञानिक चेतना के प्रकाश पुंज (Vaigyanik Chetana)" },
        { name: "पाठ 8: व्याकरण (సందులు, విలోమ పదాలు, ముహావరే)" }
      ]
    },
    {
      id: "english",
      title: "English",
      chapters: 17,
      lessons: 34,
      desc: "Beehive: 9 prose-and-poetry units. Moments: 8 supplementary chapters.",
      color: "#8b5cf6",
      directUrl: "https://www.youtube.com/watch?v=Sdf8qkkRCeA",
      currentTopic: "Unit 1: The Fun They Had",
      subtitle: "Video 1 of 18",
      formulaLeft: "Beehive Reader",
      formulaRight: "Prose & Moments",
      syllabusList: [
        { name: "Beehive Unit 1: The Fun They Had (Prose) | The Road Not Taken (Poem)" },
        { name: "Beehive Unit 2: The Sound of Music (Prose) | Wind (Poem)" },
        { name: "Beehive Unit 3: The Little Girl (Prose) | Rain on the Roof (Poem)" },
        { name: "Beehive Unit 4: A Truly Beautiful Mind (Prose) | The Lake Isle of Innisfree (Poem)" },
        { name: "Beehive Unit 5: The Snake and the Mirror (Prose) | A Legend of the Northland (Poem)" },
        { name: "Beehive Unit 6: My Childhood (Prose) | No Men Are Foreign (Poem)" },
        { name: "Beehive Unit 7: Reach for the Top (Prose) | On Killing a Tree (Poem)" },
        { name: "Beehive Unit 8: Kathmandu (Prose) | A Slumber Did My Spirit Seal (Poem)" },
        { name: "Beehive Unit 9: If I Were You (Prose)" },
        { name: "Moments Chapter 1: The Lost Child" },
        { name: "Moments Chapter 2: The Adventures of Toto" },
        { name: "Moments Chapter 3: Iswaran the Storyteller" },
        { name: "Moments Chapter 4: In the Kingdom of Fools" },
        { name: "Moments Chapter 5: The Happy Prince" },
        { name: "Moments Chapter 6: The Last Leaf" },
        { name: "Moments Chapter 7: A House Is Not a Home" },
        { name: "Moments Chapter 8: The Beggar" }
      ]
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
      syllabusList: [
        { name: "చాప్టర్ 1: సంఖ్యా వ్యవస్థలు (Number Systems)" },
        { name: "చాప్టర్ 2: బహుపదులు మరియు కారణాంక విభజన (Polynomials and Factorisation)" },
        { name: "చాప్టర్ 3: నిరూపక రేఖాగణితం (Coordinate Geometry)" },
        { name: "చాప్టర్ 4: రెండు చరరాశులలో రేఖీయ సమీకరణాలు (Linear Equations in Two Variables)" },
        { name: "చాప్టర్ 5: యూక్లిడ్ రేఖాగణిత పరిచయం (Introduction to Euclid's Geometry)" },
        { name: "చాప్టర్ 6: రేఖలు మరియు కోణాలు (Lines and Angles)" },
        { name: "చాప్టర్ 7: త్రిభుజాలు (Triangles)" },
        { name: "చాప్టర్ 8: చతుర్భుజాలు (Quadrilaterals)" },
        { name: "చాప్టర్ 9: వృత్తాలు (Circles)" },
        { name: "చాప్టర్ 10: హెరాన్ సూత్రం (Heron's Formula)" },
        { name: "చాప్టర్ 11: ఉపరితల వైశాల్యాలు మరియు ఘనపరిమాణాలు (Surface Areas and Volumes)" },
        { name: "చాప్టర్ 12: సాంఖ్యక శాస్త్రం (Statistics)" }
      ]
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
      syllabusList: [
        { name: "చాప్టర్ 1: మన చుట్టూ ఉన్న పరిసరాలలోని ద్రవ్యం (Matter in Our Surroundings)" },
        { name: "చాప్టర్ 2: మన చుట్టూ ఉన్న ద్రవ్యం శుద్ధమైనదేనా? (Is Matter Around Us Pure?)" },
        { name: "చాప్టర్ 3: పరమాణువులు మరియు అణువులు (Atoms and Molecules)" },
        { name: "చాప్టర్ 4: పరమాణు నిర్మాణం (Structure of the Atom)" },
        { name: "చాప్టర్ 5: చలనం (Motion)" },
        { name: "చాప్టర్ 6: బలం మరియు చలన నియమాలు (Force and Laws of Motion)" },
        { name: "చాప్టర్ 7: గురుత్వాకర్షణ (Gravitation)" },
        { name: "చాప్టర్ 8: పని మరియు శక్తి (Work and Energy)" },
        { name: "చాప్టర్ 9: ధ్వని (Sound)" }
      ]
    },
    {
      id: "biology",
      title: "Biology",
      chapters: 6,
      lessons: 12,
      desc: "Class 9 Biological Science: cells, tissues, biodiversity, health, resources and food.",
      color: "#10B981",
      directUrl: "https://www.youtube.com/watch?v=Svs7yP7VlNU",
      currentTopic: "Chapter 1: The Fundamental Unit of Life",
      subtitle: "Video 1 of 6",
      formulaLeft: "Cellular Biology",
      formulaRight: "Tissues & Food",
      syllabusList: [
        { name: "చాప్టర్ 1: జీవక్రియల ప్రాథమిక ప్రమాణం - కణం (The Fundamental Unit of Life - Cell)" },
        { name: "చాప్టర్ 2: కణజాలాలు (Tissues)" },
        { name: "చాప్టర్ 3: జీవులలో వైవిధ్యం (Diversity in Living Organisms)" },
        { name: "చాప్టర్ 4: మనం ఎందుకు అనారోగ్యానికి గురవుతాం? (Why Do We Fall Ill?)" },
        { name: "చాప్టర్ 5: సహజ వనరులు (Natural Resources)" },
        { name: "చాప్టర్ 6: ఆహార వనరుల మెరుగుదల (Improvement in Food Resources)" }
      ]
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
      syllabusList: [
        { name: "పాఠం 1: ఫ్రెంచ్ విప్లవం (The French Revolution)" },
        { name: "పాఠం 2: ఐరోపాలో సోషలిజం మరియు రష్యన్ విప్లవం (Socialism in Europe & Russian Revolution)" },
        { name: "పాఠం 3: నాజీజం మరియు హిట్లర్ ఎదుగుదల (Nazism and the Rise of Hitler)" },
        { name: "పాఠం 4: అడవి సమాజం మరియు వలసవాదం (Forest Society and Colonialism)" },
        { name: "పాఠం 5: ఆధునిక ప్రపంచంలో పశుపాలకులు (Pastoralists in the Modern World)" }
      ]
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
      syllabusList: [
        { name: "పాఠం 1: భారతదేశం - పరిమాణం మరియు ఉనికి (India - Size and Location)" },
        { name: "పాఠం 2: భారతదేశ భౌగోళిక స్వరూపాలు (Physical Features of India)" },
        { name: "పాఠం 3: ప్రవాహ వ్యవస్థ (Drainage)" },
        { name: "పాఠం 4: శీతోష్ణస్థితి (Climate)" },
        { name: "పాఠం 5: సహజ వృక్షసంపద మరియు వన్యప్రాణులు (Natural Vegetation & Wildlife)" },
        { name: "పాఠం 6: జనాభా (Population)" }
      ]
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
      syllabusList: [
        { name: "పాఠం 1: ప్రజాస్వామ్యం అంటే ఏమిటి? ఎందుకు ప్రజాస్వామ్యం? (What is Democracy? Why Democracy?)" },
        { name: "పాఠం 2: రాజ్యాంగ రూపకల్పన (Constitutional Design)" },
        { name: "పాఠం 3: ఎన్నికల రాజకీయాలు (Electoral Politics)" },
        { name: "పాఠం 4: సంస్థల పనితీరు (Working of Institutions)" },
        { name: "పాఠం 5: ప్రజాస్వామ్య హక్కులు (Democratic Rights)" }
      ]
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
      syllabusList: [
        { name: "పాఠం 1: పాలంపూర్ గ్రామం కథ (The Story of Village Palampur)" },
        { name: "పాఠం 2: వనరుగా ప్రజలు (People as Resource)" },
        { name: "పాఠం 3: పేదరికం ఒక సవాలు (Poverty as a Challenge)" },
        { name: "పాఠం 4: భారతదేశంలో ఆహార భద్రత (Food Security in India)" }
      ]
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
      syllabusList: [
        { name: "పాఠం 1: మాతృభావన (పద్యభాగం)" },
        { name: "పాఠం 2: జానపదుని జాబు (వచనభాగం)" },
        { name: "పాఠం 3: ధన్యుడు (కథాంశం)" },
        { name: "పాఠం 4: శతక మధురిమ (పద్యభాగం)" },
        { name: "పాఠం 5: నగరగీతం (ఆధునిక కవిత్వం)" },
        { name: "పాఠం 6: భాగ్యోదయం (జీవిత చరిత్ర)" },
        { name: "పాఠం 7: సముద్ర లంఘనం (ప్రాచీన పద్యభాగం)" },
        { name: "ఉపవాచకం: రామాయణం - బాలకాండ" },
        { name: "ఉపవాచకం: రామాయణం - అయోధ్యకాండ" },
        { name: "ఉపవాచకం: రామాయణం - అరణ్యకాండ" },
        { name: "ఉపవాచకం: రామాయణం - కిష్కింధకాండ" },
        { name: "ఉపవాచకం: రామాయణం - సుందరకాండ" },
        { name: "ఉపవాచకం: రామాయణం - యుద్ధకాండ" }
      ]
    },
    {
      id: "hindi",
      title: "Hindi",
      chapters: 11,
      lessons: 22,
      desc: "Class 10 Hindi: 11 lessons.",
      color: "#e11d48",
      directUrl: "https://www.youtube.com/watch?v=BLRkBJ0e0fo",
      currentTopic: "Chapter 1: बरसते बदल (Baraste Badal)",
      subtitle: "Video 1 of 38",
      formulaLeft: "Class 10 Hindi",
      formulaRight: "Kavita & Kahani",
      syllabusList: [
        { name: "पाठ 1: बरसते बादल (Barasate Baadal)" },
        { name: "पाठ 2: ईदगाह (Eidgah)" },
        { name: "पाठ 3: माँ मुझे आने दे (Maa Mujhe Aane De)" },
        { name: "पाठ 4: कण-कण का अधिकारी (Kan-Kan Ka Adhikari)" },
        { name: "पाठ 5: लोकगीत (Lokgeet)" },
        { name: "पाठ 6: अंतर्राष्ट्रीय स्तर पर हिंदी (Antarrashtriya Star Par Hindi)" },
        { name: "पाठ 7: भक्ति पद (Bhakti Pad)" },
        { name: "पाठ 8: स्वराज की नींव (Swaraj Ki Neev)" },
        { name: "पाठ 9: दक्षिण गंगा गोदावरी (Dakshin Ganga Godavari)" },
        { name: "पाठ 10: अनोखा उपाय (Anokha Upay)" },
        { name: "पाठ 11: जल ही जीवन है (Jal Hi Jeevan Hai)" }
      ]
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
      syllabusList: [
        { name: "First Flight Unit 1: A Letter to God (Prose) | Dust of Snow, Fire and Ice (Poems)" },
        { name: "First Flight Unit 2: Nelson Mandela: Long Walk to Freedom (Prose) | A Tiger in the Zoo (Poem)" },
        { name: "First Flight Unit 3: Two Stories about Flying (Prose) | How to Tell Wild Animals, The Ball Poem (Poems)" },
        { name: "First Flight Unit 4: From the Diary of Anne Frank (Prose) | Amanda! (Poem)" },
        { name: "First Flight Unit 5: Glimpses of India (Prose) | The Trees (Poem)" },
        { name: "First Flight Unit 6: Mijbil the Otter (Prose) | Fog (Poem)" },
        { name: "First Flight Unit 7: Madam Rides the Bus (Prose) | The Tale of Custard the Dragon (Poem)" },
        { name: "First Flight Unit 8: The Sermon at Benares (Prose) | For Anne Gregory (Poem)" },
        { name: "First Flight Unit 9: The Proposal (Prose)" },
        { name: "Footprints Without Feet Chapter 1: A Triumph of Surgery" },
        { name: "Footprints Without Feet Chapter 2: The Thief's Story" },
        { name: "Footprints Without Feet Chapter 3: The Midnight Visitor" },
        { name: "Footprints Without Feet Chapter 4: A Question of Trust" },
        { name: "Footprints Without Feet Chapter 5: Footprints without Feet" },
        { name: "Footprints Without Feet Chapter 6: The Making of a Scientist" },
        { name: "Footprints Without Feet Chapter 7: The Necklace" },
        { name: "Footprints Without Feet Chapter 8: Bholi" },
        { name: "Footprints Without Feet Chapter 9: The Book That Saved the Earth" }
      ]
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
      syllabusList: [
        { name: "చాప్టర్ 1: వాస్తవ సంఖ్యలు (Real Numbers)" },
        { name: "చాప్టర్ 2: బహుపదులు (Polynomials)" },
        { name: "చాప్టర్ 3: రెండు చరరాశులలో రేఖీయ సమీకరణాల జత (Pair of Linear Equations in Two Variables)" },
        { name: "చాప్టర్ 4: వర్గ సమీకరణాలు (Quadratic Equations)" },
        { name: "చాప్టర్ 5: అంకశ్రేఢులు (Arithmetic Progressions)" },
        { name: "చాప్టర్ 6: త్రిభుజాలు (Triangles)" },
        { name: "చాప్టర్ 7: నిరూపక రేఖాగణితం (Coordinate Geometry)" },
        { name: "చాప్టర్ 8: త్రికోణమితి పరిచయం (Introduction to Trigonometry)" },
        { name: "చాప్టర్ 9: త్రికోణమితి అనువర్తనాలు (Some Applications of Trigonometry)" },
        { name: "చాప్టర్ 10: వృత్తాలు (Circles)" },
        { name: "చాప్టర్ 11: వృత్తాలకు సంబంధించిన వైశాల్యాలు (Areas Related to Circles)" },
        { name: "చాప్టర్ 12: ఉపరితల వైశాల్యాలు మరియు ఘనపరిమాణాలు (Surface Areas and Volumes)" },
        { name: "చాప్టర్ 13: సాంఖ్యక శాస్త్రం (Statistics)" },
        { name: "చాప్టర్ 14: సంభావ్యత (Probability)" }
      ]
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
      syllabusList: [
        { name: "చాప్టర్ 1: రసాయన చర్యలు - సమీకరణాలు (Chemical Reactions and Equations)" },
        { name: "చాప్టర్ 2: ఆమ్లాలు, క్షారాలు మరియు లవణాలు (Acids, Bases and Salts)" },
        { name: "చాప్టర్ 3: లోహాలు మరియు అలోహాలు (Metals and Non-metals)" },
        { name: "చాప్టర్ 4: కార్బన్ మరియు దాని సమ్మేళనాలు (Carbon and its Compounds)" },
        { name: "చాప్టర్ 5: కాంతి - పరావర్తనం మరియు వక్రీభవనం (Light - Reflection and Refraction)" },
        { name: "చాప్టర్ 6: మానవుని కన్ను మరియు రంగుల ప్రపంచం (The Human Eye and the Colorful World)" },
        { name: "చాప్టర్ 7: విద్యుచ్ఛక్తి (Electricity)" },
        { name: "చాప్టర్ 8: విద్యుత్ ప్రవాహ అయస్కాంత ఫలితాలు (Magnetic Effects of Electric Current)" }
      ]
    },
    {
      id: "biology",
      title: "Biology",
      chapters: 8,
      lessons: 16,
      desc: "Class 10 Biological Science: life processes, control, reproduction, heredity and the environment.",
      color: "#10B981",
      directUrl: "https://www.youtube.com/watch?v=Svs7yP7VlNU",
      currentTopic: "Unit 1: Life Processes",
      subtitle: "Video 1 of 10",
      formulaLeft: "Botany & Zoology",
      formulaRight: "Genetics & Environment",
      syllabusList: [
        { name: "చాప్టర్ 1: పోషణ - ఆహార సరఫరా వ్యవస్థ (Nutrition)" },
        { name: "చాప్టర్ 2: శ్వాసక్రియ - శక్తి ఉత్పాదక వ్యవస్థ (Respiration)" },
        { name: "చాప్టర్ 3: ప్రసరణ - పదార్థ రవాణా వ్యవస్థ (Transportation)" },
        { name: "చాప్టర్ 4: విసర్జన - వ్యర్థాల తొలగింపు వ్యవస్థ (Excretion)" },
        { name: "చాప్టర్ 5: నియంత్రణ మరియు సమన్వయం (Control and Coordination)" },
        { name: "చాప్టర్ 6: జీవులు ఎలా ప్రత్యుత్పత్తి జరుపుతాయి? (How do Organisms Reproduce?)" },
        { name: "చాప్టర్ 7: అనువంశికత మరియు పరిణామం (Heredity and Evolution)" },
        { name: "చాప్టర్ 8: మన పర్యావరణం (Our Environment)" }
      ]
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
      syllabusList: [
        { name: "పాఠం 1: ఐరోపాలో జాతీయవాదం ఆవిర్భావం (The Rise of Nationalism in Europe)" },
        { name: "పాఠం 2: భారతదేశంలో జాతీయవాదం (Nationalism in India)" },
        { name: "పాఠం 3: ప్రపంచీకరణ చెందిన ప్రపంచం ఏర్పాటు (The Making of a Global World)" },
        { name: "పాఠం 4: పారిశ్రామికీకరణ యుగం (The Age of Industrialisation)" },
        { name: "పాఠం 5: ముద్రణా సంస్కృతి - ఆధునిక ప్రపంచం (Print Culture and the Modern World)" }
      ]
    },
    {
      id: "geography",
      title: "Geography",
      chapters: 6,
      lessons: 14,
      desc: "Contemporary India - II chapters.",
      color: "#0D9488",
      directUrl: "https://www.youtube.com/watch?v=aM_h74c6Z-Y",
      currentTopic: "Chapter 1: Resources and Development",
      subtitle: "Video 1 of 14",
      formulaLeft: "Contemporary India",
      formulaRight: "Resources & Economy",
      syllabusList: [
        { name: "పాఠం 1: వనరులు మరియు అభివృద్ధి (Resources and Development)" },
        { name: "పాఠం 2: అడవి మరియు వన్యప్రాణి వనరులు (Forest and Wildlife Resources)" },
        { name: "పాఠం 3: జల వనరులు (Water Resources)" },
        { name: "పాఠం 4: వ్యవసాయం (Agriculture)" },
        { name: "పాఠం 5: ఖనిజాలు మరియు శక్తి వనరులు (Minerals and Energy Resources)" },
        { name: "పాఠం 6: ఉత్పాదక పరిశ్రమలు (Manufacturing Industries)" }
      ]
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
      syllabusList: [
        { name: "పాఠం 1: అధికార భాగస్వామ్యం (Power Sharing)" },
        { name: "పాఠం 2: సమాఖ్యవాదం (Federalism)" },
        { name: "పాఠం 3: లింగం, మతం మరియు కులం (Gender, Religion and Caste)" },
        { name: "పాఠం 4: రాజకీయ పార్టీలు (Political Parties)" },
        { name: "పాఠం 5: ప్రజాస్వామ్య ఫలితాలు (Outcomes of Democracy)" }
      ]
    },
    {
      id: "economics",
      title: "Economics",
      chapters: 4,
      lessons: 8,
      desc: "Understanding Economic Development chapters.",
      color: "#EA580C",
      directUrl: "https://www.youtube.com/watch?v=GMojx-QoeuM",
      currentTopic: "Chapter 1: Development",
      subtitle: "Video 1 of 10",
      formulaLeft: "Economic Development",
      formulaRight: "Globalization",
      syllabusList: [
        { name: "పాఠం 1: అభివృద్ధి (Development)" },
        { name: "పాఠం 2: భారతీయ ఆర్థిక వ్యవస్థ రంగాలు (Sectors of the Indian Economy)" },
        { name: "పాఠం 3: ద్రవ్యం మరియు పరపతి (Money and Credit)" },
        { name: "పాఠం 4: ప్రపంచీకరణ మరియు భారతీయ ఆర్థిక వ్యవస్థ (Globalization and the Indian Economy)" }
      ]
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

  const coursesList = defaultCourseTemplates.map((template) => {
    const listedLessons = template.syllabusList || [];
    const syllabusList = Array.from({ length: template.chapters }, (_, index) => {
      const lesson = listedLessons[index];
      const searchTerm = lesson?.name || `Chapter ${index + 1}`;
      const name = lesson?.name || `Chapter ${index + 1} (title not listed)`;
      const query = `Class ${studentClass} ${template.title} ${searchTerm}`;

      return {
        ...lesson,
        name,
        searchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
      };
    });

    const completedUnits = user.completedUnitsByCourse?.[template.id] || [];

    return {
      ...template,
      syllabusList,
      subtitle: `${template.chapters} chapters • search for lesson videos`,
      completedUnits,
      progress: Math.round((completedUnits.length / syllabusList.length) * 100)
    };
  });

  const overallProgressPercent = Math.round(
    coursesList.reduce((sum, course) => sum + course.progress, 0) /
      coursesList.length
  );

  const handleOpenYouTubeSearch = (title, topic) => {
    const query = `Class ${studentClass} ${title} ${topic}`;
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleMarkLessonCompleted = (courseId, courseTitle, unitName, totalUnits) => {
    const completedUnitsByCourse = user.completedUnitsByCourse || {};
    const currentUnits = completedUnitsByCourse[courseId] || [];
    if (currentUnits.includes(unitName)) return;

    const updatedUnits = [...currentUnits, unitName];
    const updatedUnitsByCourse = { ...completedUnitsByCourse, [courseId]: updatedUnits };
    const safeTotalUnits = Math.max(Number(totalUnits) || 1, 1);
    const newProg = Math.min(100, Math.round((updatedUnits.length / safeTotalUnits) * 100));
    const completionDate = new Date().toISOString();
    const courseUnitCompletionDates = user.courseUnitCompletionDates || {};

    const updatedUser = {
      ...user,
      courseProgressMap: { ...(user.courseProgressMap || {}), [courseId]: newProg },
      completedUnitsByCourse: updatedUnitsByCourse,
      courseUnitCounts: { ...(user.courseUnitCounts || {}), [courseId]: safeTotalUnits },
      certificatesCount: Object.values(updatedUnitsByCourse)
        .filter((units) => Array.isArray(units) && units.length > 0).length,
      courseUnitCompletionDates: {
        ...courseUnitCompletionDates,
        [courseId]: {
          ...(courseUnitCompletionDates[courseId] || {}),
          [unitName]: completionDate
        }
      },
      recentActivities: [
        {
          id: `act-${Date.now()}`,
          type: "Completed",
          title: `Completed ${unitName} in ${courseTitle}`,
          time: "Just now",
          icon: "✓",
          color: "#10B981",
          matter: {
            heading: `${courseTitle} Unit Completed`,
            summary: `Completed ${updatedUnits.length} of ${safeTotalUnits} units in ${courseTitle}.`,
            score: `Course Progress: ${newProg}%`,
            actionPath: "/courses",
            actionText: "Keep Learning"
          }
        },
        ...(user.recentActivities || [])
      ]
    };

    setActiveDetails((current) =>
      current?.id === courseId ? { ...current, completedUnits: updatedUnits, progress: newProg } : current
    );
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
        .ps-nav-item:focus { outline: none; }
        .ps-nav-item:focus-visible { outline: 2px solid #93C5FD; outline-offset: 2px; }
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
                      handleOpenYouTubeSearch(
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
                        handleOpenYouTubeSearch(
                          activeHighlightedCourse.title,
                          activeHighlightedCourse.currentTopic
                        )
                      }
                    >
                      <span>▶</span>
                      <span>Find Lessons</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMarkLessonCompleted(
                        activeHighlightedCourse.id,
                        activeHighlightedCourse.title,
                        activeHighlightedCourse.currentTopic,
                        activeHighlightedCourse.syllabusList.length
                      )}
                      disabled={activeHighlightedCourse.completedUnits.includes(activeHighlightedCourse.currentTopic)}
                      style={{ background: "#DCFCE7", color: "#15803D", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                    >
                      {activeHighlightedCourse.completedUnits.includes(activeHighlightedCourse.currentTopic)
                        ? "✓ Unit Completed"
                        : "✓ Mark Unit Completed"}
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
                        <p style={{ fontSize: 11, color: "#94A3B8", marginBottom: 8 }}>{c.chapters} Chapters</p>
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
                            onClick={() => handleOpenYouTubeSearch(c.title, c.currentTopic)}
                          >
                            <span>▶</span>
                            <span>Find Lessons</span>
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
                  <span style={{ fontSize: 11, color: "#64748B" }}>Class {studentClass} Syllabus</span>
                </div>
              </div>
              <button onClick={() => setActiveDetails(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>
                ✕
              </button>
            </div>
            <div className="ps-modal-body" style={{ maxHeight: "450px", overflowY: "auto" }}>
              <p style={{ fontSize: 13, color: "#475569", marginBottom: 14 }}>{activeDetails.desc}</p>
              
              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, padding: 14, marginBottom: 16 }}>
                <h5 style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                  Chapter & Lesson List ({activeDetails.syllabusList.length} chapters)
                </h5>
                <p style={{ fontSize: 11, color: "#64748B", marginBottom: 10 }}>
                  Links search YouTube for this class and subject. Chapters without a title in the course data are marked below.
                </p>
                <ul style={{ paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {activeDetails.syllabusList?.map((ch, idx) => {
                    const completedUnits = user.completedUnitsByCourse?.[activeDetails.id] || [];
                    const isUnitCompleted = completedUnits.includes(ch.name);
                    return (
                    <li
                      key={idx}
                      style={{ fontSize: "12.5px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}
                    >
                      <a
                        href={ch.searchUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#2563EB", textDecoration: "underline" }}
                      >
                        {ch.name} ↗
                      </a>
                      <button
                        type="button"
                        disabled={isUnitCompleted}
                        onClick={() => handleMarkLessonCompleted(
                          activeDetails.id,
                          activeDetails.title,
                          ch.name,
                          activeDetails.syllabusList.length
                        )}
                        style={{ flexShrink: 0, border: "1px solid #bbf7d0", borderRadius: 6, padding: "5px 8px", background: isUnitCompleted ? "#dcfce7" : "#fff", color: "#15803d", fontSize: 10, fontWeight: 700, cursor: isUnitCompleted ? "default" : "pointer" }}
                      >
                        {isUnitCompleted ? "✓ Completed" : "Mark complete"}
                      </button>
                    </li>
                    );
                  })}
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
                    handleOpenYouTubeSearch(c.title, c.currentTopic);
                  }}
                >
                  <span>▶</span> Search YouTube for this course
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