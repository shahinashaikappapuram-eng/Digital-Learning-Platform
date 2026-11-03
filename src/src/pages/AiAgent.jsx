import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function AiAgent() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [queryInput, setQueryInput] = useState("");
  const [activeConversation, setActiveConversation] = useState(null);
  const [showAllModal, setShowAllModal] = useState(false);
  const [conversations, setConversations] = useState([]);

  const renderSvgIcon = (name, size = 18, stroke = "currentColor") => {
    switch (name) {
      case "dashboard":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
            <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
            <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
            <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
          </svg>
        );
      case "book-open":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        );
      case "video":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2"></rect>
          </svg>
        );
      case "clipboard":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1"></rect>
          </svg>
        );
      case "check-circle":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case "library":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2"></rect>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        );
      case "file-text":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        );
      case "doubt-center":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case "ai-agent":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="3"></rect>
            <circle cx="12" cy="5" r="2"></circle>
            <path d="M12 7v4"></path>
            <line x1="8" y1="16" x2="8.01" y2="16"></line>
            <line x1="16" y1="16" x2="16.01" y2="16"></line>
          </svg>
        );
      case "trending-up":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          </svg>
        );
      case "award":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6"></circle>
            <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"></path>
          </svg>
        );
      case "bell":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        );
      case "life-buoy":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="4"></circle>
          </svg>
        );
      case "settings":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 -2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        );
      case "logout":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  const presetTopics = {
    math: {
      title: "Math Formulas: Quadratic & Algebra",
      subject: "Math",
      time: "Just now",
      icon: "📐",
      iconBg: "#2563eb",
      chat: [
        { sender: "Student", text: "Explain important math formulas for Class 10." },
        {
          sender: "AI Agent",
          text: "Here are the core Class 10 Math Formulas:\n• Quadratic Equation: ax² + bx + c = 0, x = (-b ± √(b² - 4ac)) / 2a\n• Discriminant: D = b² - 4ac\n• Distance Formula: d = √((x₂ - x₁)² + (y₂ - y₁)²)"
        }
      ]
    },
    science: {
      title: "Science Concepts: Life Processes & Photosynthesis",
      subject: "Science",
      time: "Just now",
      icon: "🔬",
      iconBg: "#ea580c",
      chat: [
        { sender: "Student", text: "Explain key Science concepts: Photosynthesis & Human Respiration." },
        {
          sender: "AI Agent",
          text: "Here is your summary of Science Concepts:\n1. Photosynthesis: 6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂\n2. Cellular Respiration: Glucose breakdown producing ATP molecules in mitochondria."
        }
      ]
    },
    grammar: {
      title: "Grammar Help: Tenses & Active/Passive Voice",
      subject: "English",
      time: "Just now",
      icon: "📖",
      iconBg: "#8b5cf6",
      chat: [
        { sender: "Student", text: "Give me quick rules for Active & Passive Voice and Tenses." },
        {
          sender: "AI Agent",
          text: "Essential English Grammar Rules:\n• Active to Passive: Subject + Verb + Object → Object + be + V3 + by + Subject.\n• Present Continuous: is/am/are + being + V3."
        }
      ]
    },
    planner: {
      title: "Study Planner: Daily Class 10 Schedule",
      subject: "Study Routine",
      time: "Just now",
      icon: "📅",
      iconBg: "#10b981",
      chat: [
        { sender: "Student", text: "Create an effective daily study timetable for my exams." },
        {
          sender: "AI Agent",
          text: "Recommended Daily Study Routine:\n• 06:00 AM - 07:30 AM: Mathematics\n• 04:30 PM - 05:30 PM: Science Concepts\n• 06:00 PM - 07:00 PM: Social Science\n• 07:30 PM - 08:30 PM: Languages"
        }
      ]
    }
  };

  useEffect(() => {
    const rawUser = localStorage.getItem("current_user");
    if (!rawUser) {
      navigate("/student-login");
      return;
    }
    try {
      const parsed = JSON.parse(rawUser);
      setUser(parsed);
      setConversations(parsed.aiConversations || []);
    } catch {
      navigate("/student-login");
    }
  }, [navigate]);

  if (!user) return null;

  const studentName = user.name || "Student";
  const studentClass = user.class || "10";
  const schoolName = user.school || "Govt High School";

  const saveConversations = (newList) => {
    setConversations(newList);
    const updatedUser = {
      ...user,
      aiConversations: newList
    };
    setUser(updatedUser);
    localStorage.setItem("current_user", JSON.stringify(updatedUser));

    const allStudents = JSON.parse(localStorage.getItem("all_students") || "[]");
    localStorage.setItem("all_students", JSON.stringify(allStudents.map((s) => (s.id === user.id ? updatedUser : s))));
  };

  const handleSelectSuggestedTopic = (key) => {
    const topic = presetTopics[key];
    if (!topic) return;

    const existingIndex = conversations.findIndex((c) => c.title === topic.title);
    let updatedList;

    if (existingIndex !== -1) {
      const item = conversations[existingIndex];
      updatedList = [item, ...conversations.filter((_, idx) => idx !== existingIndex)];
    } else {
      const newEntry = {
        id: `conv-${Date.now()}`,
        title: topic.title,
        subject: topic.subject,
        time: "Just now",
        icon: topic.icon,
        iconBg: topic.iconBg,
        chat: topic.chat
      };
      updatedList = [newEntry, ...conversations];
    }

    saveConversations(updatedList);
    setActiveConversation(updatedList[0]);
  };

  const handleSendQuestion = (e) => {
    if (e) e.preventDefault();
    const q = queryInput.trim();
    if (!q) return;

    const newEntry = {
      id: `conv-${Date.now()}`,
      title: q.length > 35 ? `${q.substring(0, 35)}...` : q,
      subject: "AI Assistant",
      time: "Just now",
      icon: "🤖",
      iconBg: "#2563eb",
      chat: [
        { sender: "Student", text: q },
        {
          sender: "AI Agent",
          text: `Here is the explanation for "${q}":\n\n1. Review the core definitions in your syllabus.\n2. Break the problem into stepwise logical statements.\n3. Note down key formulas and examples for quick revision.`
        }
      ]
    };

    const updatedList = [newEntry, ...conversations];
    saveConversations(updatedList);
    setQueryInput("");
    setActiveConversation(newEntry);
  };

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    localStorage.removeItem("studentLoggedIn");
    navigate("/student-login");
  };

  return (
    <div className="ai-root">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .ai-root { display: flex; min-height: 100vh; background: #f8fafc; color: #0f172a; width: 100%; }

        .ai-sidebar { width: 240px; background: #081B38; color: #94A3B8; display: flex; flex-direction: column; flex-shrink: 0; padding: 22px 14px; position: fixed; top: 0; bottom: 0; left: 0; z-index: 120; }
        .ai-brand { display: flex; align-items: center; gap: 12px; padding: 0 0 18px 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); margin-bottom: 18px; }
        .ai-brand-badge { width: 38px; height: 38px; border-radius: 10px; background: #1E60F8; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; }
        .ai-brand h3 { font-size: 15px; font-weight: 700; color: #fff; }
        .ai-brand span { font-size: 12px; color: #60A5FA; display: block; }
        .ai-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; overflow-y: auto; }
        .ai-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; color: #94A3B8; text-decoration: none; border-radius: 9px; font-size: 13px; font-weight: 500; transition: all 0.15s; border: none; background: transparent; cursor: pointer; width: 100%; text-align: left; }
        .ai-link:hover { background-color: rgba(255, 255, 255, 0.06); color: #fff; }
        .ai-link.active { background-color: #1E60F8; color: #fff; font-weight: 600; box-shadow: 0 4px 12px rgba(30,96,248,0.3); }
        .ai-logout-wrap { padding: 14px 14px 18px 14px; border-top: 1px solid rgba(255, 255, 255, 0.07); margin-top: auto; }
        .ai-logout-btn { width: 100%; display: flex; align-items: center; gap: 12px; background: transparent; border: none; color: #EF4444; padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }

        .ai-main { flex: 1; margin-left: 240px; display: flex; flex-direction: column; min-width: 0; padding-bottom: 50px; }
        .ai-header { height: 64px; background: #fff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; position: sticky; top: 0; z-index: 100; }
        .ai-header-title h2 { font-size: 15.5px; font-weight: 700; color: #0f172a; }
        .ai-header-title p { font-size: 11.5px; color: #64748b; }
        .ai-header-right { display: flex; align-items: center; gap: 18px; }
        .ai-notif-btn { position: relative; width: 36px; height: 36px; border-radius: 50%; border: 1px solid #e2e8f0; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .ai-notif-badge { position: absolute; top: -3px; right: -3px; background: #ef4444; color: #fff; border-radius: 50%; width: 16px; height: 16px; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
        .ai-user-badge { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .ai-avatar { width: 38px; height: 38px; border-radius: 50%; background: #fed7aa; display: flex; align-items: center; justify-content: center; font-size: 18px; }

        .ai-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; max-width: 1200px; margin: 0 auto; width: 100%; }

        .ai-hero { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; }
        .ai-hero-left { display: flex; align-items: center; gap: 16px; }
        .ai-hero-icon { width: 48px; height: 48px; border-radius: 12px; background: #10b981; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .ai-hero-left h1 { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .ai-hero-left p { font-size: 13px; color: #64748b; }
        .ai-hero-art { font-size: 34px; }

        .ai-sec-title { font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
        .ai-topics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .ai-topic-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px 16px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 0.15s; }
        .ai-topic-card:hover { transform: translateY(-2px); border-color: #2563eb; box-shadow: 0 6px 14px rgba(37,99,235,0.08); }
        .ai-topic-icon { width: 42px; height: 42px; border-radius: 10px; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .ai-topic-info strong { display: block; font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .ai-topic-info span { font-size: 11px; color: #64748b; }

        .ai-search-bar { background: #fff; border: 1px solid #cbd5e1; border-radius: 14px; padding: 6px 10px 6px 16px; display: flex; align-items: center; gap: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .ai-search-bar input { flex: 1; border: none; outline: none; font-size: 13px; color: #0f172a; background: transparent; }
        .ai-bar-tools { display: flex; align-items: center; gap: 12px; font-size: 16px; color: #64748b; }
        .ai-send-btn { width: 38px; height: 38px; border-radius: 10px; background: #2563eb; color: #fff; border: none; display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer; transition: background 0.15s; }
        .ai-send-btn:hover { background: #1d4ed8; }

        .ai-conv-box { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; }
        .ai-conv-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .ai-conv-list { display: flex; flex-direction: column; gap: 10px; }
        .ai-conv-item { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; border-radius: 12px; border: 1px solid #f1f5f9; background: #f8fafc; cursor: pointer; transition: all 0.15s; }
        .ai-conv-item:hover { background: #eff6ff; border-color: #bfdbfe; transform: translateY(-1px); }
        .ai-conv-left { display: flex; align-items: center; gap: 12px; }
        .ai-conv-icon { width: 38px; height: 38px; border-radius: 10px; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
        .ai-conv-item h4 { font-size: 13.5px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .ai-conv-item span { font-size: 11px; color: #64748b; }
        .ai-conv-time { font-size: 11.5px; color: #94a3b8; font-weight: 500; }

        .ai-bottom-box { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 16px 22px; display: flex; align-items: center; justify-content: space-between; }
        .ai-bottom-left { display: flex; align-items: center; gap: 14px; }
        .ai-bot-avatar { font-size: 28px; }
        .ai-bottom-left strong { font-size: 13.5px; color: #0f172a; display: block; margin-bottom: 2px; }
        .ai-bottom-left p { font-size: 11.5px; color: #64748b; }
        .ai-start-btn { background: #eff6ff; border: 1px solid #bfdbfe; color: #2563eb; padding: 8px 18px; border-radius: 8px; font-size: 12.5px; font-weight: 700; cursor: pointer; }

        .ai-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .ai-modal-window { background: #fff; border-radius: 16px; width: 100%; max-width: 650px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2); }
        .ai-modal-top { padding: 16px 20px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; }
        .ai-modal-body { padding: 20px; max-height: 480px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
        .ai-bubble { padding: 12px 14px; border-radius: 12px; font-size: 12.5px; line-height: 1.5; white-space: pre-wrap; }
        .ai-bubble.student { background: #eff6ff; color: #1e40af; align-self: flex-end; max-width: 85%; }
        .ai-bubble.agent { background: #f8fafc; border: 1px solid #e2e8f0; color: #0f172a; align-self: flex-start; max-width: 90%; }

        @media (max-width: 1024px) {
          .ai-sidebar { display: none; }
          .ai-main { margin-left: 0; }
          .ai-topics-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <aside className="ai-sidebar">
        <div className="ai-brand">
          <div className="ai-brand-badge">🎓</div>
          <div>
            <h3>Digital Learning Platform</h3>
            <span></span>
          </div>
        </div>

        <nav className="ai-nav">
          <NavLink to="/student-dashboard" className="ai-link">
            {renderSvgIcon("dashboard", 18, "#94A3B8")}
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/courses" className="ai-link">
            {renderSvgIcon("book-open", 18, "#94A3B8")}
            <span>My Courses</span>
          </NavLink>
          <NavLink to="/live-classes" className="ai-link">
            {renderSvgIcon("video", 18, "#94A3B8")}
            <span>Live Classes</span>
          </NavLink>
          <NavLink to="/assignments" className="ai-link">
            {renderSvgIcon("clipboard", 18, "#94A3B8")}
            <span>Assignments</span>
          </NavLink>
          <NavLink to="/quizzes" className="ai-link">
            {renderSvgIcon("check-circle", 18, "#94A3B8")}
            <span>Quizzes</span>
          </NavLink>
          <NavLink to="/digital-library" className="ai-link">
            {renderSvgIcon("library", 18, "#94A3B8")}
            <span>Digital Library</span>
          </NavLink>
          <NavLink to="/notes" className="ai-link">
            {renderSvgIcon("file-text", 18, "#94A3B8")}
            <span>Notes</span>
          </NavLink>
          <NavLink to="/doubt-centre" className="ai-link">
            {renderSvgIcon("doubt-center", 18, "#94A3B8")}
            <span>Doubt Centre</span>
          </NavLink>
          <NavLink to="/ai-agent" className="ai-link active">
            {renderSvgIcon("ai-agent", 18, "#FFFFFF")}
            <span>AI Agent</span>
          </NavLink>
          <NavLink to="/progress" className="ai-link">
            {renderSvgIcon("trending-up", 18, "#94A3B8")}
            <span>Progress</span>
          </NavLink>
          <button className="ai-link" onClick={() => navigate("/certificates")}>
            {renderSvgIcon("award", 18, "#94A3B8")}
            <span>Certificates</span>
          </button>
          <button className="ai-link" onClick={() => navigate("/announcements")}>
            {renderSvgIcon("bell", 18, "#94A3B8")}
            <span>Announcements</span>
          </button>
          <button className="ai-link" onClick={() => navigate("/help-support")}>
            {renderSvgIcon("life-buoy", 18, "#94A3B8")}
            <span>Help & Support</span>
          </button>
          <button className="ai-link" onClick={() => navigate("/settings")}>
            {renderSvgIcon("settings", 18, "#94A3B8")}
            <span>Settings</span>
          </button>
        </nav>

        <div className="ai-logout-wrap">
          <button onClick={handleLogout} className="ai-logout-btn">
            {renderSvgIcon("logout", 18, "#EF4444")}
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="ai-main">
        <header className="ai-header">
          <div className="ai-header-title">
            <h2>Digital Learning Platform</h2>
            <p>Online Learning Portal for Students</p>
          </div>
          <div className="ai-header-right">
            <button className="ai-notif-btn" onClick={() => navigate("/announcements")}>
              {renderSvgIcon("bell", 20, "#475569")}
              <div className="ai-notif-badge">3</div>
            </button>
            <div className="ai-user-badge" onClick={() => navigate("/settings")}>
              <div className="ai-avatar">👩‍🎓</div>
              <div>
                <strong style={{ fontSize: 13, display: "block" }}>{studentName}</strong>
                <span style={{ fontSize: 11, color: "#64748b" }}>Class {studentClass}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="ai-body">
          <div className="ai-hero">
            <div className="ai-hero-left">
              <div className="ai-hero-icon">🤖</div>
              <div>
                <h1>AI Study Agent</h1>
                <p>Ask doubts, get concept explanations, and build your study plan 24/7.</p>
              </div>
            </div>
            <div className="ai-hero-art">📚💡</div>
          </div>

          <div>
            <h3 className="ai-sec-title">Suggested Topics</h3>
            <div className="ai-topics-grid">
              <div className="ai-topic-card" onClick={() => handleSelectSuggestedTopic("math")}>
                <div className="ai-topic-icon" style={{ background: "#2563eb" }}>📐</div>
                <div className="ai-topic-info">
                  <strong>Math Formulas</strong>
                  <span>Key formulas & concepts</span>
                </div>
              </div>

              <div className="ai-topic-card" onClick={() => handleSelectSuggestedTopic("science")}>
                <div className="ai-topic-icon" style={{ background: "#ea580c" }}>🔬</div>
                <div className="ai-topic-info">
                  <strong>Science Concepts</strong>
                  <span>Quick explanations</span>
                </div>
              </div>

              <div className="ai-topic-card" onClick={() => handleSelectSuggestedTopic("grammar")}>
                <div className="ai-topic-icon" style={{ background: "#8b5cf6" }}>📖</div>
                <div className="ai-topic-info">
                  <strong>Grammar Help</strong>
                  <span>Writing & grammar</span>
                </div>
              </div>

              <div className="ai-topic-card" onClick={() => handleSelectSuggestedTopic("planner")}>
                <div className="ai-topic-icon" style={{ background: "#10b981" }}>📅</div>
                <div className="ai-topic-info">
                  <strong>Study Planner</strong>
                  <span>Plan your study routine</span>
                </div>
              </div>
            </div>
          </div>

          <form className="ai-search-bar" onSubmit={handleSendQuestion}>
            <input
              type="text"
              placeholder="Type your question here..."
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
            />
            <div className="ai-bar-tools">
              <span title="Attach File" style={{ cursor: "pointer" }}>📎</span>
              <span title="Insert Image" style={{ cursor: "pointer" }}>🖼️</span>
              <span title="Voice Question" style={{ cursor: "pointer" }}>🎤</span>
            </div>
            <button type="submit" className="ai-send-btn" title="Send Question">
              ➤
            </button>
          </form>

          <div className="ai-conv-box">
            <div className="ai-conv-header">
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>Recent Conversations</h3>
              <button
                style={{ background: "none", border: "none", color: "#2563eb", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                onClick={() => setShowAllModal(true)}
              >
                View All
              </button>
            </div>

            <div className="ai-conv-list">
              {conversations.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="ai-conv-item"
                  onClick={() => setActiveConversation(item)}
                >
                  <div className="ai-conv-left">
                    <div className="ai-conv-icon" style={{ background: item.iconBg || "#2563eb" }}>
                      {item.icon || "💬"}
                    </div>
                    <div>
                      <h4>{item.title}</h4>
                      <span>{item.subject}</span>
                    </div>
                  </div>
                  <span className="ai-conv-time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ai-bottom-box">
            <div className="ai-bottom-left">
              <span className="ai-bot-avatar">🤖</span>
              <div>
                <strong>Need help anytime?</strong>
                <p>Ask your AI Agent 24/7 and get instant answers.</p>
              </div>
            </div>
            <button
              className="ai-start-btn"
              onClick={() => {
                const searchEl = document.querySelector(".ai-search-bar input");
                if (searchEl) searchEl.focus();
              }}
            >
              Start Chat →
            </button>
          </div>
        </div>
      </main>

      {activeConversation && (
        <div className="ai-modal-overlay" onClick={() => setActiveConversation(null)}>
          <div className="ai-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="ai-modal-top">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: activeConversation.iconBg || "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                  {activeConversation.icon || "🤖"}
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700 }}>{activeConversation.title}</h3>
                  <span style={{ fontSize: 11, color: "#64748b" }}>{activeConversation.subject} • {activeConversation.time}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveConversation(null)}
                style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>

            <div className="ai-modal-body">
              {activeConversation.chat?.map((msg, idx) => (
                <div key={idx} className={`ai-bubble ${msg.sender === "Student" ? "student" : "agent"}`}>
                  <strong style={{ fontSize: 11, display: "block", marginBottom: 3 }}>
                    {msg.sender === "Student" ? `${studentName} (You)` : "🤖 AI Agent"}
                  </strong>
                  <div>{msg.text}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: 14, borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end" }}>
              <button
                style={{ background: "#2563eb", color: "#fff", border: "none", padding: "8px 18px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                onClick={() => setActiveConversation(null)}
              >
                Close Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {showAllModal && (
        <div className="ai-modal-overlay" onClick={() => setShowAllModal(false)}>
          <div className="ai-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="ai-modal-top">
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>All Saved AI Conversations</h3>
              <button
                onClick={() => setShowAllModal(false)}
                style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <div className="ai-modal-body">
              {conversations.map((item) => (
                <div
                  key={item.id}
                  className="ai-conv-item"
                  onClick={() => {
                    setShowAllModal(false);
                    setActiveConversation(item);
                  }}
                >
                  <div className="ai-conv-left">
                    <div className="ai-conv-icon" style={{ background: item.iconBg || "#2563eb" }}>
                      {item.icon || "💬"}
                    </div>
                    <div>
                      <h4>{item.title}</h4>
                      <span>{item.subject}</span>
                    </div>
                  </div>
                  <span className="ai-conv-time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}