import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import TeacherSidebar from "../components/TeacherSidebar";

export default function Announcements() {
  const navigate = useNavigate();

  // Strictly check current_user first to avoid false teacher detection
  const currentUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("current_user") || "null")
      : null;

  const currentTeacher =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("current_teacher") || "null")
      : null;

  const isTeacher =
    !!currentTeacher || localStorage.getItem("teacherLoggedIn") === "true";
  const activeUser = isTeacher ? currentTeacher : currentUser;

  const studentName = activeUser?.name || localStorage.getItem(isTeacher ? "teacherName" : "studentName") || (isTeacher ? "Priya Sharma" : "Student");
  const studentClass = activeUser?.class || localStorage.getItem(isTeacher ? "teacherClass" : "studentClass") || "10";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate(isTeacher ? "/teacher-login" : "/student-login");
  };

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
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 -2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06-.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
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

  const categories = ["All", "Academic", "Events", "Exam Updates", "General", "Important"];

  const announcementsData = [
    {
      id: 1,
      title: "New Mathematics Notes Uploaded",
      category: "Academic",
      tag: "Important",
      tagColor: "#dc2626",
      tagBg: "#fee2e2",
      date: "09 Jun 2024 • 10:00 AM",
      desc: "New chapter-wise notes for Mathematics (Chapter 5 & 6) are now available in the Notes section.",
      fullDetails: "The Mathematics department has uploaded comprehensive revision notes and problem worksheets for Quadratic Equations and Arithmetic Progressions.",
      icon: "📢",
      iconBg: "#ea580c",
    },
    {
      id: 2,
      title: "Live Science Class at 4 PM",
      category: "Academic",
      tag: "Live Class",
      tagColor: "#15803d",
      tagBg: "#dcfce7",
      date: "08 Jun 2024 • 11:30 AM",
      desc: "Join the live Science class today at 4:00 PM. Don't miss it!",
      fullDetails: "Mr. Rohit Verma will cover Human Digestive & Circulatory systems interactively. All students are expected to join on time through the Live Classes tab.",
      icon: "📹",
      iconBg: "#10b981",
    },
    {
      id: 3,
      title: "English Quiz Tomorrow",
      category: "Exam Updates",
      tag: "Quiz",
      tagColor: "#7e22ce",
      tagBg: "#f3e8ff",
      date: "07 Jun 2024 • 02:00 PM",
      desc: "English quiz will be conducted tomorrow at 11:00 AM.",
      fullDetails: "A 20-minute timed quiz covering Poem Analysis, Metaphors, and Direct-Indirect Speech will be accessible under the Quizzes section.",
      icon: "📝",
      iconBg: "#8b5cf6",
    },
    {
      id: 4,
      title: "New Assignment Added – Social Science",
      category: "Academic",
      tag: "Assignment",
      tagColor: "#2563eb",
      tagBg: "#eff6ff",
      date: "06 Jun 2024 • 09:30 AM",
      desc: "A new assignment for Social Science (Chapter 3) has been uploaded. Please complete it before the due date.",
      fullDetails: "Students are requested to prepare an outline mapping the important historical rivers and resource distribution.",
      icon: "📄",
      iconBg: "#2563eb",
    }
  ];

  const filteredAnnouncements = announcementsData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory ||
      (selectedCategory === "Important" && item.tag === "Important");

    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.tag.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const displayedAnnouncements =
    showAll || searchTerm.trim() !== ""
      ? filteredAnnouncements
      : filteredAnnouncements.slice(0, 3);

  return (
    <div className="an-container">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .an-container { display: flex; min-height: 100vh; background: #f8fafc; color: #0f172a; width: 100%; }

        .an-sidebar { width: 240px; background: #081B38; color: #94A3B8; display: flex; flex-direction: column; flex-shrink: 0; padding: 22px 14px; position: fixed; top: 0; bottom: 0; left: 0; z-index: 120; }
        .an-brand { display: flex; align-items: center; gap: 12px; padding: 0 0 18px 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); margin-bottom: 18px; }
        .an-brand-badge { width: 38px; height: 38px; border-radius: 10px; background: ${isTeacher ? "#059669" : "#1E60F8"}; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; }
        .an-brand-text h2 { font-size: 15px; font-weight: 700; color: #fff; }
        .an-brand-text p { font-size: 12px; color: ${isTeacher ? "#34D399" : "#60A5FA"}; display: block; }
        .an-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; overflow-y: auto; }
        .an-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; color: #94A3B8; text-decoration: none; border-radius: 9px; font-size: 13px; font-weight: 500; transition: all 0.15s; border: none; background: transparent; cursor: pointer; width: 100%; text-align: left; }
        .an-link:hover { background-color: rgba(255, 255, 255, 0.06); color: #fff; }
        .an-link.active { background-color: ${isTeacher ? "#059669" : "#1E60F8"}; color: #fff; font-weight: 600; box-shadow: 0 4px 12px rgba(30,96,248,0.3); }
        .an-logout-wrap { padding: 14px 14px 18px 14px; border-top: 1px solid rgba(255, 255, 255, 0.07); margin-top: auto; }
        .an-logout-btn { width: 100%; display: flex; align-items: center; gap: 12px; background: transparent; border: none; color: #EF4444; padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }

        .an-main { flex: 1; margin-left: 240px; display: flex; flex-direction: column; overflow-y: auto; padding-bottom: 60px; min-width: 0; }
        .an-header { height: 64px; background: #fff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; position: sticky; top: 0; z-index: 100; }
        .an-header-title h2 { font-size: 15.5px; font-weight: 700; color: #0f172a; }
        .an-header-title p { font-size: 11.5px; color: #64748b; }
        .an-header-right { display: flex; align-items: center; gap: 20px; }
        .an-notif-btn { position: relative; width: 36px; height: 36px; border-radius: 50%; border: 1px solid #e2e8f0; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .an-notif-badge { position: absolute; top: -3px; right: -3px; background: #ef4444; color: #fff; border-radius: 50%; width: 16px; height: 16px; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
        .an-user-badge { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .an-avatar { width: 38px; height: 38px; border-radius: 50%; background: ${isTeacher ? "#a7f3d0" : "#fed7aa"}; display: flex; align-items: center; justify-content: center; font-size: 18px; }

        .an-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; max-width: 1200px; margin: 0 auto; width: 100%; }

        .an-hero { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; }
        .an-hero-left { display: flex; align-items: center; gap: 16px; }
        .an-hero-icon { width: 48px; height: 48px; border-radius: 12px; background: ${isTeacher ? "#059669" : "#2563eb"}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .an-hero-left h1 { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .an-hero-left p { font-size: 13px; color: #64748b; }
        .an-hero-art { font-size: 40px; }

        .an-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .an-stat-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px 20px; display: flex; align-items: center; gap: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .an-stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .an-stat-info small { font-size: 11px; color: #64748b; display: block; margin-bottom: 2px; }
        .an-stat-info strong { font-size: 20px; font-weight: 800; color: #0f172a; }
        .an-stat-info span { font-size: 11px; color: #94a3b8; display: block; margin-top: 1px; }

        .an-search-row { display: flex; gap: 12px; align-items: center; }
        .an-search-box { flex: 1; display: flex; align-items: center; gap: 10px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 8px 14px; font-size: 13px; }
        .an-search-box input { border: none; outline: none; background: transparent; width: 100%; font-size: 13px; color: #0f172a; }
        .an-search-clear { background: none; border: none; font-size: 14px; color: #94a3b8; cursor: pointer; }
        .an-dropdown { border: 1px solid #e2e8f0; border-radius: 12px; background: #fff; padding: 8px 14px; font-size: 12.5px; color: #475569; outline: none; }

        .an-category-row { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 2px; }
        .an-cat-pill { padding: 8px 20px; border-radius: 10px; font-size: 12.5px; font-weight: 600; border: 1px solid #e2e8f0; background: #fff; color: #475569; cursor: pointer; white-space: nowrap; transition: all 0.15s; }
        .an-cat-pill.active { background: ${isTeacher ? "#059669" : "#2563eb"}; color: #fff; border-color: ${isTeacher ? "#059669" : "#2563eb"}; box-shadow: 0 4px 10px rgba(37,99,235,0.25); }

        .an-list-wrap { display: flex; flex-direction: column; gap: 12px; }
        .an-sec-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
        .an-sec-head h3 { font-size: 16px; font-weight: 700; color: #0f172a; }
        .an-view-all-btn { background: none; border: none; font-size: 12.5px; color: ${isTeacher ? "#059669" : "#2563eb"}; font-weight: 700; cursor: pointer; padding: 4px 8px; border-radius: 6px; }

        .an-item-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: transform 0.15s, border-color 0.15s; }
        .an-item-card:hover { transform: translateY(-1px); border-color: #cbd5e1; }
        .an-item-left { display: flex; align-items: flex-start; gap: 16px; max-width: 80%; }
        .an-item-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; flex-shrink: 0; }
        .an-item-details h4 { font-size: 14.5px; font-weight: 700; color: #0f172a; margin-bottom: 3px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .an-pill-tag { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
        .an-item-meta { font-size: 11.5px; color: #94a3b8; margin-bottom: 6px; }
        .an-item-desc { font-size: 12.5px; color: #64748b; line-height: 1.4; }
        .an-details-btn { background: #fff; border: 1px solid ${isTeacher ? "#059669" : "#2563eb"}; color: ${isTeacher ? "#059669" : "#2563eb"}; padding: 8px 18px; border-radius: 8px; font-size: 12.5px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.15s; }
        .an-details-btn:hover { background: #eff6ff; }

        .an-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); z-index: 999; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .an-modal-card { background: #fff; border-radius: 16px; width: 100%; max-width: 580px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.25); display: flex; flex-direction: column; }
        .an-modal-head { height: 56px; background: #0f172a; color: #fff; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; }
        .an-modal-head h3 { font-size: 15px; font-weight: 700; }
        .an-modal-body { padding: 24px; display: flex; flex-direction: column; gap: 14px; }
        .an-modal-title { font-size: 18px; font-weight: 800; color: #0f172a; }
        .an-modal-meta { font-size: 12px; color: #94a3b8; }
        .an-modal-content { font-size: 13.5px; color: #334155; line-height: 1.6; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
        .an-modal-foot { padding: 14px 20px; background: #f8fafc; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; }
        .an-modal-close { background: ${isTeacher ? "#059669" : "#2563eb"}; color: #fff; border: none; padding: 8px 20px; border-radius: 8px; font-size: 12.5px; font-weight: 600; cursor: pointer; }

        @media (max-width: 1024px) {
          .an-sidebar { display: none; }
          .an-main { margin-left: 0; }
          .an-stats-grid { grid-template-columns: 1fr; }
          .an-item-card { flex-direction: column; align-items: flex-start; gap: 12px; }
          .an-details-btn { width: 100%; text-align: center; }
        }
      `}</style>

      {isTeacher ? <TeacherSidebar onLogout={handleLogout} width={240} /> : <StudentSidebar onLogout={handleLogout} />}

      <main className="an-main">
        <header className="an-header">
          <div className="an-header-title">
            <h2>Digital Learning Platform</h2>
            <p>{isTeacher ? "Educator Control Center" : "Online Learning Portal for Students"}</p>
          </div>
          <div className="an-header-right">
            <button className="an-notif-btn">
              {renderSvgIcon("bell", 20, "#475569")}
              <div className="an-notif-badge">3</div>
            </button>
            <div className="an-user-badge" onClick={() => navigate("/settings")}>
              <div className="an-avatar">{isTeacher ? "👩‍🏫" : "👨‍🎓"}</div>
              <div>
                <strong style={{ fontSize: 13, display: "block" }}>{studentName}</strong>
                <span style={{ fontSize: 11, color: "#64748b" }}>{isTeacher ? `Class ${studentClass}th Educator` : `Class ${studentClass}`}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="an-body">
          <div className="an-hero">
            <div className="an-hero-left">
              <div className="an-hero-icon">📢</div>
              <div>
                <h1>Announcements</h1>
                <p>Stay updated with the latest news, events and important information.</p>
              </div>
            </div>
            <div className="an-hero-art">📣📰</div>
          </div>

          <div className="an-stats-grid">
            <div className="an-stat-card">
              <div className="an-stat-icon" style={{ background: "#eff6ff", color: "#2563eb" }}>🔔</div>
              <div className="an-stat-info">
                <small>Total Announcements</small>
                <strong>{announcementsData.length}</strong>
                <span>active notices</span>
              </div>
            </div>

            <div className="an-stat-card">
              <div className="an-stat-icon" style={{ background: "#fef2f2", color: "#ef4444" }}>📢</div>
              <div className="an-stat-info">
                <small>Important</small>
                <strong>{announcementsData.filter((a) => a.tag === "Important").length}</strong>
                <span>high priority</span>
              </div>
            </div>

            <div className="an-stat-card">
              <div className="an-stat-icon" style={{ background: "#faf5ff", color: "#9333ea" }}>📅</div>
              <div className="an-stat-info">
                <small>Recent</small>
                <strong>5</strong>
                <span>last 7 days</span>
              </div>
            </div>
          </div>

          <div className="an-search-row">
            <div className="an-search-box">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="an-search-clear" onClick={() => setSearchTerm("")}>
                  ✕
                </button>
              )}
            </div>

            <select
              className="an-dropdown"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
              ))}
            </select>

            <select
              className="an-dropdown"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="All Time">All Time</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
          </div>

          <div className="an-category-row">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`an-cat-pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="an-list-wrap">
            <div className="an-sec-head">
              <h3>
                Recent Announcements ({displayedAnnouncements.length} of {filteredAnnouncements.length})
              </h3>
              <button
                className="an-view-all-btn"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less ▴" : "View All (" + filteredAnnouncements.length + ") ▾"}
              </button>
            </div>

            {displayedAnnouncements.map((item) => (
              <div className="an-item-card" key={item.id}>
                <div className="an-item-left">
                  <div className="an-item-icon" style={{ background: item.iconBg }}>
                    {item.icon}
                  </div>
                  <div className="an-item-details">
                    <h4>
                      {item.title}
                      <span
                        className="an-pill-tag"
                        style={{ color: item.tagColor, background: item.tagBg }}
                      >
                        {item.tag}
                      </span>
                    </h4>
                    <div className="an-item-meta">📅 {item.date}</div>
                    <p className="an-item-desc">{item.desc}</p>
                  </div>
                </div>

                <button
                  className="an-details-btn"
                  onClick={() => setActiveModalItem(item)}
                >
                  View Details ›
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {activeModalItem && (
        <div className="an-modal-overlay" onClick={() => setActiveModalItem(null)}>
          <div className="an-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="an-modal-head">
              <h3>Official Announcement</h3>
              <button
                onClick={() => setActiveModalItem(null)}
                style={{ background: "none", border: "none", color: "#fff", fontSize: 18, cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <div className="an-modal-body">
              <div className="an-modal-title">{activeModalItem.title}</div>
              <div className="an-modal-meta">
                <span>📅 {activeModalItem.date}</span> &nbsp;•&nbsp; Category:{" "}
                <strong>{activeModalItem.category}</strong>
              </div>
              <div className="an-modal-content">
                {activeModalItem.fullDetails}
              </div>
            </div>

            <div className="an-modal-foot">
              <button
                className="an-modal-close"
                onClick={() => setActiveModalItem(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}