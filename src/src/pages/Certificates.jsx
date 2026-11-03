import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Certificates() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [previewCert, setPreviewCert] = useState(null);

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

  const studentName = user.name || "Student";
  const studentClass = user.class || "10";
  const studentSchool = user.school || "Govt. High School";

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    localStorage.removeItem("studentLoggedIn");
    navigate("/student-login");
  };

  const courseMeta = {
    math: { subject: "Mathematics", chapter: "Complete Class 10 Curriculum", iconBg: "#2563eb", certCode: "MAT" },
    science: { subject: "Science", chapter: "Complete Class 10 Curriculum", iconBg: "#10b981", certCode: "SCI" },
    english: { subject: "English", chapter: "Complete Class 10 Curriculum", iconBg: "#8b5cf6", certCode: "ENG" },
    hindi: { subject: "Hindi", chapter: "Complete Class 10 Curriculum", iconBg: "#e11d48", certCode: "HIN" },
    telugu: { subject: "Telugu", chapter: "Complete Class 10 Curriculum", iconBg: "#0284c7", certCode: "TEL" },
    social: { subject: "Social Science", chapter: "Complete Class 10 Curriculum", iconBg: "#ea580c", certCode: "SOC" },
    computer: { subject: "Computer Basics", chapter: "Complete Class 10 Curriculum", iconBg: "#06b6d4", certCode: "COM" }
  };

  const progressMap = user.courseProgressMap || {};

  const autoGeneratedCerts = Object.keys(courseMeta)
    .filter((courseId) => (progressMap[courseId] || 0) >= 100)
    .map((courseId) => {
      const info = courseMeta[courseId];
      return {
        id: `cert-${courseId}`,
        subject: info.subject,
        chapter: info.chapter,
        date: user.courseCompletionDates?.[courseId] || "Recently Completed",
        score: user.courseExamScores?.[courseId] || "95%",
        rating: "Excellent",
        ratingBg: "#dcfce7",
        ratingColor: "#15803d",
        iconBg: info.iconBg,
        certId: `NAB-${info.certCode}-${Math.floor(1000 + Math.random() * 9000)}`
      };
    });

  const earnedCertificates = user.certificatesList || autoGeneratedCerts;
  const completedCoursesCount = Object.values(progressMap).filter((pct) => pct >= 100).length;
  const totalCourses = 7;
  const latestCert = earnedCertificates.length > 0 ? earnedCertificates[0] : null;

  const handleDownload = (cert) => {
    const certText = `
================================================================================
                    SMART EDUCATION - DIGITAL PLATFORM
                          CERTIFICATE OF COMPLETION
================================================================================

This certificate is proudly presented to:

                              ${studentName.toUpperCase()}
                              Class ${studentClass}
                      ${studentSchool}

For successfully completing 100% of the curriculum and evaluations in:
${cert.subject} (${cert.chapter})

Certificate ID : ${cert.certId}
Date of Issue  : ${cert.date}
Score Achieved : ${cert.score}
================================================================================
`;
    const blob = new Blob([certText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Certificate_${cert.subject.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cert-container">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .cert-container { display: flex; min-height: 100vh; background: #f8fafc; color: #0f172a; width: 100%; }

        .cert-sidebar { width: 240px; background: #081B38; color: #94A3B8; display: flex; flex-direction: column; flex-shrink: 0; padding: 22px 14px; position: fixed; top: 0; bottom: 0; left: 0; z-index: 120; }
        .cert-brand { display: flex; align-items: center; gap: 12px; padding: 0 0 18px 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); margin-bottom: 18px; }
        .cert-brand-badge { width: 38px; height: 38px; border-radius: 10px; background: #1E60F8; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; }
        .cert-brand-text h2 { font-size: 15px; font-weight: 700; color: #fff; }
        .cert-brand-text p { font-size: 12px; color: #60A5FA; display: block; }
        .cert-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; overflow-y: auto; }
        .cert-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; color: #94A3B8; text-decoration: none; border-radius: 9px; font-size: 13px; font-weight: 500; transition: all 0.15s; border: none; background: transparent; cursor: pointer; width: 100%; text-align: left; }
        .cert-link:hover { background-color: rgba(255, 255, 255, 0.06); color: #fff; }
        .cert-link.active { background-color: #1E60F8; color: #fff; font-weight: 600; box-shadow: 0 4px 12px rgba(30,96,248,0.3); }
        .cert-logout-wrap { padding: 14px 14px 18px 14px; border-top: 1px solid rgba(255, 255, 255, 0.07); margin-top: auto; }
        .cert-logout-btn { width: 100%; display: flex; align-items: center; gap: 12px; background: transparent; border: none; color: #EF4444; padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }

        .cert-main { flex: 1; margin-left: 240px; display: flex; flex-direction: column; overflow-y: auto; padding-bottom: 60px; min-width: 0; }
        .cert-header { height: 64px; background: #fff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; position: sticky; top: 0; z-index: 100; }
        .cert-header-title h2 { font-size: 15.5px; font-weight: 700; color: #0f172a; }
        .cert-header-title p { font-size: 11.5px; color: #64748b; }
        .cert-header-right { display: flex; align-items: center; gap: 20px; }
        .cert-notif-btn { position: relative; width: 36px; height: 36px; border-radius: 50%; border: 1px solid #e2e8f0; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .cert-notif-badge { position: absolute; top: -3px; right: -3px; background: #ef4444; color: #fff; border-radius: 50%; width: 16px; height: 16px; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
        .cert-user-badge { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .cert-avatar { width: 38px; height: 38px; border-radius: 50%; background: #fed7aa; display: flex; align-items: center; justify-content: center; font-size: 18px; }

        .cert-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; max-width: 1200px; margin: 0 auto; width: 100%; }

        .cert-hero { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; }
        .cert-hero-left { display: flex; align-items: center; gap: 16px; }
        .cert-hero-icon { width: 48px; height: 48px; border-radius: 12px; background: #2563eb; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .cert-hero-left h1 { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .cert-hero-left p { font-size: 13px; color: #64748b; }
        .cert-hero-art { font-size: 38px; }

        .cert-metrics-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .cert-metric-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px 20px; display: flex; align-items: center; gap: 16px; }
        .cert-metric-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .cert-metric-info small { font-size: 11px; color: #64748b; display: block; margin-bottom: 2px; }
        .cert-metric-info strong { font-size: 20px; font-weight: 800; color: #0f172a; }
        .cert-metric-info span { font-size: 11px; color: #94a3b8; display: block; margin-top: 1px; }

        .cert-sec-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .cert-sec-head h3 { font-size: 16px; font-weight: 700; }
        .cert-grid-2x2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .cert-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .cert-card-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .cert-card-left { display: flex; gap: 14px; }
        .cert-card-icon { width: 44px; height: 44px; border-radius: 12px; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .cert-card-details h4 { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .cert-card-details p { font-size: 12px; color: #64748b; margin-bottom: 8px; }
        .cert-card-meta { display: flex; align-items: center; gap: 14px; font-size: 12px; color: #475569; }
        .cert-tag-status { background: #dcfce7; color: #15803d; font-size: 10.5px; font-weight: 700; padding: 3px 10px; border-radius: 6px; }
        
        .cert-actions { display: flex; gap: 10px; }
        .cert-btn-view { flex: 1; background: #2563eb; color: #fff; border: none; padding: 9px; border-radius: 8px; font-size: 12.5px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: background 0.15s; }
        .cert-btn-view:hover { background: #1d4ed8; }
        .cert-btn-download { flex: 1; background: #fff; color: #2563eb; border: 1px solid #bfdbfe; padding: 9px; border-radius: 8px; font-size: 12.5px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: background 0.15s; }
        .cert-btn-download:hover { background: #eff6ff; }

        .cert-featured-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; display: grid; grid-template-columns: 180px 1fr auto; gap: 20px; align-items: center; }
        .cert-preview-thumb { background: #fffbeb; border: 2px dashed #fcd34d; border-radius: 12px; height: 110px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 10px; }
        .cert-feat-badge { background: #fef3c7; color: #b45309; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; display: inline-block; margin-bottom: 6px; }
        .cert-feat-info h4 { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .cert-feat-info p { font-size: 12.5px; color: #64748b; margin-bottom: 6px; }
        .cert-feat-meta { font-size: 12px; color: #64748b; font-style: italic; }

        .cert-banner-bottom { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between; }
        .cert-bb-left { display: flex; align-items: center; gap: 14px; }
        .cert-bb-icon { font-size: 26px; }
        .cert-bb-left h4 { font-size: 14px; font-weight: 700; }
        .cert-bb-left p { font-size: 12px; color: #64748b; }
        .cert-bb-btn { background: #fff; border: 1px solid #2563eb; color: #2563eb; padding: 8px 18px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; }
        .cert-bb-btn:hover { background: #eff6ff; }

        .cert-empty-box { background: #fff; border: 1.5px dashed #cbd5e1; border-radius: 16px; padding: 40px 20px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }

        .cert-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); z-index: 999; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .cert-modal-box { background: #fff; border-radius: 18px; width: 100%; max-width: 780px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.3); display: flex; flex-direction: column; }
        .cert-modal-head { height: 50px; background: #0f172a; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; }
        .cert-modal-body { padding: 36px 40px; background: #fffdf5; display: flex; flex-direction: column; align-items: center; border: 8px double #d97706; margin: 16px; text-align: center; border-radius: 10px; position: relative; }
        .cert-seal { width: 68px; height: 68px; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #b45309); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); margin-bottom: 12px; }
        .cert-org { font-size: 14px; font-weight: 800; color: #b45309; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
        .cert-title { font-size: 26px; font-weight: 900; color: #0f172a; font-family: Georgia, serif; margin-bottom: 14px; }
        .cert-desc { font-size: 13px; color: #64748b; margin-bottom: 8px; }
        .cert-candidate { font-size: 24px; font-weight: 800; color: #1d4ed8; text-decoration: underline; margin-bottom: 6px; }
        .cert-subtext { font-size: 13px; color: #334155; max-width: 500px; line-height: 1.5; margin-bottom: 24px; }
        .cert-signatures { width: 100%; display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 18px; margin-top: 10px; }
        .cert-sig-box { text-align: center; }
        .cert-sig-line { font-family: cursive; font-size: 16px; color: #0f172a; font-weight: 700; margin-bottom: 2px; }
        .cert-sig-title { font-size: 11px; color: #64748b; text-transform: uppercase; }
        .cert-modal-foot { padding: 14px 20px; background: #f8fafc; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; gap: 10px; }

        @media (max-width: 1024px) {
          .cert-sidebar { display: none; }
          .cert-main { margin-left: 0; }
          .cert-metrics-row { grid-template-columns: 1fr; }
          .cert-grid-2x2 { grid-template-columns: 1fr; }
          .cert-featured-card { grid-template-columns: 1fr; }
        }
      `}</style>

      <aside className="cert-sidebar">
        <div className="cert-brand">
          <div className="cert-brand-badge">🎓</div>
          <div className="cert-brand-text">
            <h2>Digital Learning Platform</h2>
            <p></p>
          </div>
        </div>

        <nav className="cert-nav">
          <NavLink to="/student-dashboard" className="cert-link">
            {renderSvgIcon("dashboard", 18, "#94A3B8")}
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/courses" className="cert-link">
            {renderSvgIcon("book-open", 18, "#94A3B8")}
            <span>My Courses</span>
          </NavLink>
          <NavLink to="/live-classes" className="cert-link">
            {renderSvgIcon("video", 18, "#94A3B8")}
            <span>Live Classes</span>
          </NavLink>
          <NavLink to="/assignments" className="cert-link">
            {renderSvgIcon("clipboard", 18, "#94A3B8")}
            <span>Assignments</span>
          </NavLink>
          <NavLink to="/quizzes" className="cert-link">
            {renderSvgIcon("check-circle", 18, "#94A3B8")}
            <span>Quizzes</span>
          </NavLink>
          <NavLink to="/digital-library" className="cert-link">
            {renderSvgIcon("library", 18, "#94A3B8")}
            <span>Digital Library</span>
          </NavLink>
          <NavLink to="/notes" className="cert-link">
            {renderSvgIcon("file-text", 18, "#94A3B8")}
            <span>Notes</span>
          </NavLink>
          <NavLink to="/doubt-centre" className="cert-link">
            {renderSvgIcon("doubt-center", 18, "#94A3B8")}
            <span>Doubt Centre</span>
          </NavLink>
          <NavLink to="/ai-agent" className="cert-link">
            {renderSvgIcon("ai-agent", 18, "#94A3B8")}
            <span>AI Agent</span>
          </NavLink>
          <NavLink to="/progress" className="cert-link">
            {renderSvgIcon("trending-up", 18, "#94A3B8")}
            <span>Progress</span>
          </NavLink>
          <NavLink to="/certificates" className="cert-link active">
            {renderSvgIcon("award", 18, "#FFFFFF")}
            <span>Certificates</span>
          </NavLink>
          <button className="cert-link" onClick={() => navigate("/announcements")}>
            {renderSvgIcon("bell", 18, "#94A3B8")}
            <span>Announcements</span>
          </button>
          <button className="cert-link" onClick={() => navigate("/help-support")}>
            {renderSvgIcon("life-buoy", 18, "#94A3B8")}
            <span>Help & Support</span>
          </button>
          <button className="cert-link" onClick={() => navigate("/settings")}>
            {renderSvgIcon("settings", 18, "#94A3B8")}
            <span>Settings</span>
          </button>
        </nav>

        <div className="cert-logout-wrap">
          <button onClick={handleLogout} className="cert-logout-btn">
            {renderSvgIcon("logout", 18, "#EF4444")}
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="cert-main">
        <header className="cert-header">
          <div className="cert-header-title">
            <h2>Digital Learning Platform</h2>
            <p>Online Learning Portal for Students</p>
          </div>
          <div className="cert-header-right">
            <button className="cert-notif-btn" onClick={() => navigate("/announcements")}>
              {renderSvgIcon("bell", 20, "#475569")}
              <div className="cert-notif-badge">3</div>
            </button>
            <div className="cert-user-badge" onClick={() => navigate("/settings")}>
              <div className="cert-avatar">👩‍🎓</div>
              <div>
                <strong style={{ fontSize: 13, display: "block" }}>{studentName}</strong>
                <span style={{ fontSize: 11, color: "#64748b" }}>Class {studentClass}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="cert-body">
          <div className="cert-hero">
            <div className="cert-hero-left">
              <div className="cert-hero-icon">🏆</div>
              <div>
                <h1>Certificates</h1>
                <p>Complete courses to 100%, pass your lessons, and automatically earn verified certificates!</p>
              </div>
            </div>
            <div className="cert-hero-art">🎓📜⭐</div>
          </div>

          <div className="cert-metrics-row">
            <div className="cert-metric-card">
              <div className="cert-metric-icon" style={{ background: "#dcfce7", color: "#16a34a" }}>
                🏆
              </div>
              <div className="cert-metric-info">
                <small>Certificates Earned</small>
                <strong>{earnedCertificates.length}</strong>
                <span>out of {totalCourses} courses</span>
              </div>
            </div>

            <div className="cert-metric-card">
              <div className="cert-metric-icon" style={{ background: "#eff6ff", color: "#2563eb" }}>
                📖
              </div>
              <div className="cert-metric-info">
                <small>Completed Courses</small>
                <strong>{completedCoursesCount}</strong>
                <span>so far</span>
              </div>
            </div>

            <div
              className="cert-metric-card"
              style={{ cursor: latestCert ? "pointer" : "default" }}
              onClick={() => {
                if (latestCert) setPreviewCert(latestCert);
              }}
            >
              <div className="cert-metric-icon" style={{ background: "#fef3c7", color: "#d97706" }}>
                ⭐
              </div>
              <div className="cert-metric-info">
                <small>Latest Achievement</small>
                <strong>{latestCert ? latestCert.subject : "In Progress"}</strong>
                <span style={{ color: latestCert ? "#d97706" : "#94a3b8", fontWeight: 700 }}>
                  {latestCert ? "View Certificate ›" : "Complete a course to unlock"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="cert-sec-head">
              <h3>My Certificates ({earnedCertificates.length})</h3>
            </div>

            {earnedCertificates.length > 0 ? (
              <div className="cert-grid-2x2">
                {earnedCertificates.map((cert) => (
                  <div className="cert-card" key={cert.id}>
                    <div className="cert-card-top">
                      <div className="cert-card-left">
                        <div className="cert-card-icon" style={{ background: cert.iconBg }}>
                          📜
                        </div>
                        <div className="cert-card-details">
                          <h4>{cert.subject}</h4>
                          <p>{cert.chapter}</p>
                          <div className="cert-card-meta">
                            <span>📅 {cert.date}</span>
                            <span>Score: <strong>{cert.score}</strong></span>
                            <span
                              style={{
                                background: cert.ratingBg,
                                color: cert.ratingColor,
                                padding: "1px 8px",
                                borderRadius: "4px",
                                fontWeight: 700,
                                fontSize: 11
                              }}
                            >
                              {cert.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="cert-tag-status">Completed</span>
                    </div>

                    <div className="cert-actions">
                      <button
                        className="cert-btn-view"
                        onClick={() => setPreviewCert(cert)}
                      >
                        👁 View Certificate
                      </button>
                      <button
                        className="cert-btn-download"
                        onClick={() => handleDownload(cert)}
                      >
                        ⬇ Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="cert-empty-box">
                <span style={{ fontSize: 44 }}>🎓</span>
                <h4 style={{ fontSize: 16, fontWeight: 700 }}>No Certificates Earned Yet</h4>
                <p style={{ fontSize: 13, color: "#64748B", maxWidth: 440 }}>
                  You have not completed any courses yet. Once you complete all lessons in a course to 100%, your official certificate will automatically be generated here!
                </p>
                <button
                  style={{ background: "#2563EB", color: "#fff", border: "none", padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 6 }}
                  onClick={() => navigate("/courses")}
                >
                  Start Learning in My Courses →
                </button>
              </div>
            )}
          </div>

          {latestCert && (
            <div className="cert-featured-card">
              <div className="cert-preview-thumb">
                <span style={{ fontSize: 28 }}>🏅</span>
                <span style={{ fontSize: 10, color: "#92400e", fontWeight: 700 }}>Verified Certificate</span>
              </div>

              <div className="cert-feat-info">
                <span className="cert-feat-badge">⭐ Latest Unlocked Certificate</span>
                <h4>{latestCert.subject}</h4>
                <p>{latestCert.chapter}</p>
                <div className="cert-feat-meta">
                  📅 {latestCert.date} &nbsp;•&nbsp; Score: <strong>{latestCert.score}</strong>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  className="cert-btn-view"
                  style={{ padding: "8px 18px" }}
                  onClick={() => setPreviewCert(latestCert)}
                >
                  View Certificate
                </button>
                <button
                  className="cert-btn-download"
                  style={{ padding: "8px 18px" }}
                  onClick={() => handleDownload(latestCert)}
                >
                  ⬇ Download
                </button>
              </div>
            </div>
          )}

          <div className="cert-banner-bottom">
            <div className="cert-bb-left">
              <span className="cert-bb-icon">🏆</span>
              <div>
                <h4>Complete courses, earn certificates!</h4>
                <p>Complete all course modules to build your official verified academic portfolio.</p>
              </div>
            </div>
            <button
              className="cert-bb-btn"
              onClick={() => navigate("/courses")}
            >
              Explore My Courses
            </button>
          </div>
        </div>
      </main>

      {previewCert && (
        <div className="cert-modal-overlay" onClick={() => setPreviewCert(null)}>
          <div className="cert-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="cert-modal-head">
              <span style={{ fontWeight: 700 }}>Certificate Verification Preview</span>
              <button
                onClick={() => setPreviewCert(null)}
                style={{ background: "none", border: "none", color: "#fff", fontSize: 18, cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <div className="cert-modal-body">
              <div className="cert-seal">🏅</div>
              <div className="cert-org">Smart Education Platform</div>
              <div className="cert-title">Certificate of Completion</div>
              <div className="cert-desc">This is proudly awarded to:</div>
              <div className="cert-candidate">{studentName}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>
                Class {studentClass} • {studentSchool}
              </div>
              <p className="cert-subtext">
                For successfully completing 100% of the comprehensive learning modules and assessments in{" "}
                <strong>{previewCert.subject}</strong> with an outstanding score of{" "}
                <strong>{previewCert.score}</strong> on {previewCert.date}.
              </p>

              <div className="cert-signatures">
                <div className="cert-sig-box">
                  <div className="cert-sig-line">Priya Sharma</div>
                  <div className="cert-sig-title">Subject Lead Educator</div>
                </div>
                <div>
                  <span style={{ fontSize: 10, color: "#94a3b8" }}>
                    ID: {previewCert.certId || "NAB-CERT-2024"}
                  </span>
                </div>
                <div className="cert-sig-box">
                  <div className="cert-sig-line">Dr. H. S. Sharma</div>
                  <div className="cert-sig-title">District Coordinator</div>
                </div>
              </div>
            </div>

            <div className="cert-modal-foot">
              <button
                className="cert-btn-download"
                style={{ maxWidth: 160 }}
                onClick={() => handleDownload(previewCert)}
              >
                ⬇ Download File
              </button>
              <button
                className="cert-btn-view"
                style={{ maxWidth: 120 }}
                onClick={() => setPreviewCert(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}