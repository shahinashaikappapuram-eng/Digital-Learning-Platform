import React, { useState, useEffect } from "react";
import StudentSidebar from "../components/StudentSidebar";
import { useNavigate } from "react-router-dom";

export default function StudentProgress() {
  const navigate = useNavigate();
  const [activeRange, setActiveRange] = useState("Term");
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const rawUser = localStorage.getItem("current_user");
    if (!rawUser) {
      navigate("/student-login");
      return;
    }
    try {
      setUser(JSON.parse(rawUser));
    } catch {
      navigate("/student-login");
    }
  }, [navigate]);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    localStorage.removeItem("studentLoggedIn");
    navigate("/student-login");
  };

  const studentName = user.name || "Student";
  const studentClass = user.class || "6";

  const mathPct = user.courseProgressMap?.math || 0;
  const sciencePct = user.courseProgressMap?.science || 0;
  const englishPct = user.courseProgressMap?.english || 0;
  const hindiPct = user.courseProgressMap?.hindi || 0;
  const teluguPct = user.courseProgressMap?.telugu || 0;
  const socialPct = user.courseProgressMap?.social || 0;
  const computerPct = user.courseProgressMap?.computer || 0;

  const subjectsWithProgress = [mathPct, sciencePct, englishPct, hindiPct, teluguPct, socialPct, computerPct];
  const enrolledCount = subjectsWithProgress.filter((p) => p > 0).length;

  const subjects = [
    { id: "math", name: "Mathematics", desc: `${Math.round((mathPct / 100) * 10)} of 10 chapters completed`, percent: mathPct, color: "#2563eb", bg: "#eff6ff", icon: "+-÷=" },
    { id: "science", name: "Science", desc: `${Math.round((sciencePct / 100) * 14)} of 14 chapters completed`, percent: sciencePct, color: "#10b981", bg: "#f0fdf4", icon: "🧪" },
    { id: "english", name: "English", desc: `${Math.round((englishPct / 100) * 5)} of 5 chapters completed`, percent: englishPct, color: "#9333ea", bg: "#faf5ff", icon: "📖" },
    { id: "hindi", name: "Hindi", desc: `${Math.round((hindiPct / 100) * 12)} of 12 chapters completed`, percent: hindiPct, color: "#e11d48", bg: "#fff1f2", icon: "🇮🇳" },
    { id: "telugu", name: "Telugu", desc: `${Math.round((teluguPct / 100) * 12)} of 12 chapters completed`, percent: teluguPct, color: "#0284c7", bg: "#f0f9ff", icon: "🪶" },
    { id: "social", name: "Social Studies", desc: `${Math.round((socialPct / 100) * 13)} of 13 chapters completed`, percent: socialPct, color: "#ea580c", bg: "#fff7ed", icon: "🌐" },
    { id: "computer", name: "Computer Basics", desc: `${Math.round((computerPct / 100) * 3)} of 3 chapters completed`, percent: computerPct, color: "#06b6d4", bg: "#f0fdfa", icon: "💻" },
  ];

  const chartConfigs = {
    Week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      xCoords: [70, 140, 210, 280, 350, 420, 490],
      mathPoints: [
        { cx: 70, cy: 190 },
        { cx: 140, cy: 190 },
        { cx: 210, cy: 170 },
        { cx: 280, cy: 155 },
        { cx: 350, cy: 150 },
        { cx: 420, cy: 148 },
        { cx: 490, cy: 147.5 }
      ],
      mathPath: "M 70 190 L 140 190 L 210 170 L 280 155 L 350 150 L 420 148 L 490 147.5"
    },
    Month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      xCoords: [90, 220, 350, 480],
      mathPoints: [
        { cx: 90, cy: 190 },
        { cx: 220, cy: 175 },
        { cx: 350, cy: 155 },
        { cx: 480, cy: 147.5 }
      ],
      mathPath: "M 90 190 Q 220 175, 350 155 T 480 147.5"
    },
    Term: {
      labels: ["Term 1", "Mid-Term", "Term 2", "Final"],
      xCoords: [90, 220, 350, 480],
      mathPoints: [
        { cx: 90, cy: 190 },
        { cx: 220, cy: 170 },
        { cx: 350, cy: 155 },
        { cx: 480, cy: 147.5 }
      ],
      mathPath: "M 90 190 Q 220 170, 350 155 T 480 147.5"
    }
  };

  const activeChart = chartConfigs[activeRange] || chartConfigs.Term;
  const overallProgress = user.overallProgress || 0;

  return (
    <div className="sp-wrapper">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .sp-wrapper { display: flex; min-height: 100vh; background: #f8fafc; color: #0f172a; width: 100%; }

        .sp-sidebar { width: 240px; background: #081B38; color: #94A3B8; display: flex; flex-direction: column; flex-shrink: 0; padding: 22px 14px; position: fixed; top: 0; bottom: 0; left: 0; z-index: 120; }
        .sp-brand { display: flex; align-items: center; gap: 12px; padding: 0 0 18px 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); margin-bottom: 18px; }
        .sp-brand-badge { width: 38px; height: 38px; border-radius: 10px; background: #1E60F8; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #ffffff; }
        .sp-brand-text h2 { font-size: 15px; font-weight: 700; color: #FFFFFF; }
        .sp-brand-text p { font-size: 12px; color: #60A5FA; display: block; }
        .sp-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; overflow-y: auto; }
        .sp-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; color: #94A3B8; text-decoration: none; border-radius: 9px; font-size: 13px; font-weight: 500; transition: all 0.15s; border: none; background: transparent; cursor: pointer; text-align: left; width: 100%; }
        .sp-link:hover { background-color: rgba(255, 255, 255, 0.06); color: #fff; }
        .sp-link.active { background-color: #1E60F8; color: #fff; font-weight: 600; box-shadow: 0 4px 12px rgba(30,96,248,0.3); }
        .sp-logout-wrap { padding: 14px 14px 18px 14px; border-top: 1px solid rgba(255, 255, 255, 0.07); margin-top: auto; }
        .sp-logout-btn { width: 100%; display: flex; align-items: center; gap: 12px; background: transparent; border: none; color: #EF4444; padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }

        .sp-main { flex: 1; margin-left: 250px; display: flex; flex-direction: column; overflow-y: auto; min-width: 0; padding-bottom: 50px; }
        .sp-header { height: 64px; background: #fff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; position: sticky; top: 0; z-index: 100; }
        .sp-header-title h2 { font-size: 15.5px; font-weight: 700; color: #0f172a; }
        .sp-header-title p { font-size: 11.5px; color: #64748b; }
        .sp-header-right { display: flex; align-items: center; gap: 20px; }
        .sp-notif-btn { position: relative; width: 36px; height: 36px; border-radius: 50%; border: 1px solid #e2e8f0; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .sp-notif-badge { position: absolute; top: -3px; right: -3px; background: #ef4444; color: #fff; border-radius: 50%; width: 16px; height: 16px; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
        .sp-user-badge { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .sp-avatar { width: 38px; height: 38px; border-radius: 50%; background: #fed7aa; display: flex; align-items: center; justify-content: center; font-size: 18px; }

        .sp-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; max-width: 1300px; margin: 0 auto; width: 100%; }

        .sp-hero { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; }
        .sp-hero-left { display: flex; align-items: center; gap: 16px; }
        .sp-hero-icon { width: 48px; height: 48px; border-radius: 12px; background: #2563eb; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .sp-hero-text h1 { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .sp-hero-text p { font-size: 13px; color: #64748b; }

        .sp-stats-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
        .sp-stat-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px; display: flex; align-items: center; gap: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .sp-stat-icon { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 19px; flex-shrink: 0; }
        .sp-stat-info small { font-size: 11px; color: #64748b; display: block; margin-bottom: 2px; }
        .sp-stat-info strong { font-size: 19px; font-weight: 800; color: #0f172a; }
        .sp-stat-info span { font-size: 11px; color: #94a3b8; margin-left: 4px; }

        .sp-grid-2col { display: grid; grid-template-columns: 1fr 1.25fr; gap: 20px; }
        .sp-panel { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 22px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .sp-panel-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .sp-panel-head h3 { font-size: 15.5px; font-weight: 700; color: #0f172a; }

        .sp-sub-list { display: flex; flex-direction: column; gap: 14px; max-height: 380px; overflow-y: auto; padding-right: 4px; }
        .sp-sub-item { display: flex; align-items: center; gap: 12px; }
        .sp-sub-badge { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; flex-shrink: 0; }
        .sp-sub-details { flex: 1; }
        .sp-sub-details h4 { font-size: 13.5px; font-weight: 700; margin-bottom: 2px; }
        .sp-sub-details p { font-size: 11px; color: #64748b; margin-bottom: 6px; }
        .sp-bar-bg { width: 100%; height: 6px; background: #e2e8f0; border-radius: 99px; overflow: hidden; }
        .sp-bar-fill { height: 100%; border-radius: 99px; transition: width 0.3s ease-out; }
        .sp-sub-pct { font-size: 13.5px; font-weight: 800; color: #0f172a; width: 42px; text-align: right; }

        .sp-tabs { display: flex; background: #f1f5f9; padding: 3px; border-radius: 8px; gap: 2px; }
        .sp-tab { padding: 4px 14px; border-radius: 6px; font-size: 11.5px; font-weight: 600; border: none; background: transparent; cursor: pointer; color: #64748b; }
        .sp-tab.active { background: #2563eb; color: #fff; font-weight: 700; }
        .sp-chart-svg { width: 100%; height: 210px; margin-top: 8px; }
        .sp-chart-legend { display: flex; justify-content: center; gap: 18px; margin-top: 14px; flex-wrap: wrap; }
        .sp-leg-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #475569; font-weight: 600; }
        .sp-dot { width: 8px; height: 8px; border-radius: 50%; }

        .sp-grid-bottom { display: grid; grid-template-columns: 1.15fr 1fr; gap: 20px; }
        .sp-act-list { display: flex; flex-direction: column; gap: 12px; }
        .sp-act-item { display: flex; align-items: center; justify-content: space-between; padding: 11px 13px; background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px; }
        .sp-act-left { display: flex; align-items: center; gap: 12px; }
        .sp-act-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; }
        .sp-act-title { font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .sp-act-sub { font-size: 11px; color: #64748b; }
        .sp-act-right { text-align: right; }
        .sp-act-time { font-size: 11px; color: #94a3b8; margin-bottom: 4px; display: block; }

        .sp-keepgoing { background: linear-gradient(135deg, #fdf4ff 0%, #faf5ff 100%); border: 1px solid #f3e8ff; border-radius: 16px; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; }
        .sp-kg-badges { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 20px; }
        .sp-kg-stat { background: #fff; border: 1px solid #f1f5f9; border-radius: 12px; padding: 12px 8px; text-align: center; }
        .sp-kg-stat-icon { font-size: 18px; margin-bottom: 4px; display: block; }
        .sp-kg-stat strong { font-size: 15px; font-weight: 800; color: #0f172a; display: block; }
        .sp-kg-stat span { font-size: 10.5px; color: #64748b; }

        @media (max-width: 1024px) {
          .sp-sidebar { display: none; }
          .sp-main { margin-left: 0; }
          .sp-stats-row { grid-template-columns: repeat(2, 1fr); }
          .sp-grid-2col { grid-template-columns: 1fr; }
          .sp-grid-bottom { grid-template-columns: 1fr; }
        }
      `}</style>

      <StudentSidebar onLogout={handleLogout} />

      <main className="sp-main">
        <header className="sp-header">
          <div className="sp-header-title">
            <h2>Digital Learning Platform</h2>
            <p>Online Learning Portal for Students</p>
          </div>
          <div className="sp-header-right">
            <button className="sp-notif-btn" onClick={() => navigate("/announcements")}>
              {renderSvgIcon("bell", 20, "#475569")}
              <div className="sp-notif-badge">3</div>
            </button>
            <div className="sp-user-badge" onClick={() => navigate("/settings")}>
              <div className="sp-avatar">👩‍🎓</div>
              <div>
                <strong style={{ fontSize: "13px", display: "block" }}>{studentName}</strong>
                <span style={{ fontSize: "11px", color: "#64748b" }}>Class {studentClass}th</span>
              </div>
            </div>
          </div>
        </header>

        <div className="sp-body">
          <div className="sp-hero">
            <div className="sp-hero-left">
              <div className="sp-hero-icon">📊</div>
              <div className="sp-hero-text">
                <h1>Progress</h1>
                <p>Track your real learning journey and see how far you've come!</p>
              </div>
            </div>
          </div>

          <div className="sp-stats-row">
            <div className="sp-stat-card">
              <div className="sp-stat-icon" style={{ background: "#f0fdf4", color: "#16a34a" }}>📖</div>
              <div className="sp-stat-info">
                <small>Total Subjects</small>
                <strong>{enrolledCount}</strong>
                <span>{enrolledCount === 1 ? "Subject Enrolled" : "Enrolled"}</span>
              </div>
            </div>

            <div className="sp-stat-card">
              <div className="sp-stat-icon" style={{ background: "#faf5ff", color: "#9333ea" }}>✓</div>
              <div className="sp-stat-info">
                <small>Completed Lessons</small>
                <strong>{user.lessonsCompleted || "0/42"}</strong>
              </div>
            </div>

            <div className="sp-stat-card">
              <div className="sp-stat-icon" style={{ background: "#fffbeb", color: "#d97706" }}>📄</div>
              <div className="sp-stat-info">
                <small>Assignments Done</small>
                <strong>
                  {user.assignmentStatuses
                    ? Object.values(user.assignmentStatuses).filter((s) => s === "Submitted").length
                    : 0}
                </strong>
                <span>of 5</span>
              </div>
            </div>

            <div className="sp-stat-card">
              <div className="sp-stat-icon" style={{ background: "#fef2f2", color: "#dc2626" }}>❓</div>
              <div className="sp-stat-info">
                <small>Quiz Score</small>
                <strong>{user.quizScore || "0%"}</strong>
              </div>
            </div>

            <div className="sp-stat-card">
              <div className="sp-stat-icon" style={{ background: "#f0fdfa", color: "#0d9488" }}>🏆</div>
              <div className="sp-stat-info">
                <small>Certificates Earned</small>
                <strong>{user.certificatesCount || 0}</strong>
              </div>
            </div>
          </div>

          <div className="sp-grid-2col">
            <div className="sp-panel">
              <div className="sp-panel-head">
                <h3>Subject Progress</h3>
                <span
                  style={{ fontSize: 12, color: "#2563EB", cursor: "pointer", fontWeight: 700 }}
                  onClick={() => navigate("/courses")}
                >
                  View All →
                </span>
              </div>
              <div className="sp-sub-list">
                {subjects.map((sub) => (
                  <div className="sp-sub-item" key={sub.id}>
                    <div className="sp-sub-badge" style={{ background: sub.bg, color: sub.color }}>
                      {sub.icon}
                    </div>
                    <div className="sp-sub-details">
                      <h4>{sub.name}</h4>
                      <p>{sub.desc}</p>
                      <div className="sp-bar-bg">
                        <div className="sp-bar-fill" style={{ width: `${sub.percent}%`, background: sub.color }}></div>
                      </div>
                    </div>
                    <span className="sp-sub-pct">{sub.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sp-panel">
              <div className="sp-panel-head">
                <h3>Performance Overview</h3>
                <div className="sp-tabs">
                  {["Week", "Month", "Term"].map((tab) => (
                    <button
                      key={tab}
                      className={`sp-tab ${activeRange === tab ? "active" : ""}`}
                      onClick={() => setActiveRange(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <svg className="sp-chart-svg" viewBox="0 0 540 210">
                <line x1="45" y1="20" x2="520" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="45" y1="65" x2="520" y2="65" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="45" y1="110" x2="520" y2="110" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="45" y1="155" x2="520" y2="155" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="45" y1="190" x2="520" y2="190" stroke="#e2e8f0" strokeWidth="1" />

                <text x="15" y="24" fontSize="10" fill="#94a3b8">100%</text>
                <text x="20" y="69" fontSize="10" fill="#94a3b8">75%</text>
                <text x="20" y="114" fontSize="10" fill="#94a3b8">50%</text>
                <text x="20" y="159" fontSize="10" fill="#94a3b8">25%</text>
                <text x="26" y="193" fontSize="10" fill="#94a3b8">0%</text>

                {activeChart.labels.map((lbl, idx) => (
                  <text
                    key={idx}
                    x={activeChart.xCoords[idx]}
                    y="206"
                    fontSize="10"
                    fill="#64748b"
                    textAnchor="middle"
                  >
                    {lbl}
                  </text>
                ))}

                <line x1="45" y1="190" x2="520" y2="190" stroke="#e2e8f0" strokeWidth="1.5" />

                {mathPct > 0 && (
                  <>
                    <path
                      d={activeChart.mathPath}
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                    {activeChart.mathPoints.map((pt, i) => (
                      <circle key={i} cx={pt.cx} cy={pt.cy} r="3.5" fill="#2563eb" />
                    ))}
                  </>
                )}
              </svg>

              <div className="sp-chart-legend">
                <span className="sp-leg-item">
                  <span className="sp-dot" style={{ background: "#2563eb" }}></span> Mathematics ({mathPct}%)
                </span>
                <span className="sp-leg-item" style={{ color: "#94a3b8" }}>
                  <span className="sp-dot" style={{ background: "#cbd5e1" }}></span> Other Subjects ({sciencePct}%)
                </span>
              </div>
            </div>
          </div>

          <div className="sp-grid-bottom">
            <div className="sp-panel">
              <div className="sp-panel-head">
                <h3>Recent Activity</h3>
              </div>
              <div className="sp-act-list">
                {(user.recentActivities || []).slice(0, 4).map((act, i) => (
                  <div className="sp-act-item" key={i}>
                    <div className="sp-act-left">
                      <div className="sp-act-icon" style={{ background: "#eff6ff", color: act.color || "#2563eb" }}>
                        {act.icon || "✓"}
                      </div>
                      <div>
                        <div className="sp-act-title">{act.title}</div>
                        <div className="sp-act-sub">{act.matter?.summary || "Academic progress update"}</div>
                      </div>
                    </div>
                    <div className="sp-act-right">
                      <span className="sp-act-time">{act.time || "Recently"}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: act.color || "#2563eb" }}>
                        {act.type || "Active"}
                      </span>
                    </div>
                  </div>
                ))}

                {(!user.recentActivities || user.recentActivities.length === 0) && (
                  <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", padding: "16px 0" }}>
                    No recent activity yet.
                  </p>
                )}
              </div>
            </div>

            <div className="sp-keepgoing">
              <h4>⭐ Keep Going!</h4>
              <p>Small steps every day lead to big results. You are making steady progress!</p>
              <div className="sp-kg-badges">
                <div className="sp-kg-stat">
                  <span className="sp-kg-stat-icon">📖</span>
                  <strong>{overallProgress}%</strong>
                  <span>Overall Progress</span>
                </div>
                <div className="sp-kg-stat">
                  <span className="sp-kg-stat-icon">📅</span>
                  <strong>{user.studyStreak || 1}</strong>
                  <span>Day Streak</span>
                </div>
                <div className="sp-kg-stat">
                  <span className="sp-kg-stat-icon">❓</span>
                  <strong>{user.quizScore || "0%"}</strong>
                  <span>Quiz Score</span>
                </div>
                <div className="sp-kg-stat">
                  <span className="sp-kg-stat-icon">🏆</span>
                  <strong>{user.certificatesCount || 0}</strong>
                  <span>Certificates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}