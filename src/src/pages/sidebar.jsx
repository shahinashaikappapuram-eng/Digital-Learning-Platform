import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    localStorage.removeItem("studentLoggedIn");
    navigate("/student-login");
  };

  const navLinks = [
    { id: "Dashboard", label: "Dashboard", icon: "dashboard", path: "/student-dashboard" },
    { id: "My Courses", label: "My Courses", icon: "book-open", path: "/courses" },
    { id: "Live Classes", label: "Live Classes", icon: "video", path: "/live-classes" },
    { id: "Assignments", label: "Assignments", icon: "clipboard", path: "/assignments" },
    { id: "Quizzes", label: "Quizzes", icon: "check-circle", path: "/quizzes" },
    { id: "Digital Library", label: "Digital Library", icon: "library", path: "/digital-library" },
    { id: "Notes", label: "Notes", icon: "file-text", path: "/notes" },
    { id: "Doubt Center", label: "Doubt Centre", icon: "doubt-center", path: "/doubt-centre" },
    { id: "AI Agent", label: "AI Agent", icon: "ai-agent", path: "/ai-agent" },
    { id: "Progress", label: "Progress", icon: "trending-up", path: "/progress" },
    { id: "Certificates", label: "Certificates", icon: "award", path: "/certificates" },
    { id: "Announcements", label: "Announcements", icon: "bell", path: "/announcements" },
    { id: "Help & Support", label: "Help & Support", icon: "life-buoy", path: "/help-support" },
    { id: "Settings", label: "Settings", icon: "settings", path: "/settings" },
  ];

  const renderSvgIcon = (name, size = 18, stroke = "currentColor") => {
    switch (name) {
      case "dashboard":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="2"></rect><rect x="14" y="3" width="7" height="7" rx="2"></rect><rect x="14" y="14" width="7" height="7" rx="2"></rect><rect x="3" y="14" width="7" height="7" rx="2"></rect></svg>;
      case "book-open":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
      case "video":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2"></rect></svg>;
      case "clipboard":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1"></rect></svg>;
      case "check-circle":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
      case "library":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="4" y1="18" x2="20" y2="18"></line></svg>;
      case "file-text":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>;
      case "doubt-center":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
      case "ai-agent":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="3"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="16" y1="16" x2="16.01" y2="16"></line></svg>;
      case "trending-up":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline></svg>;
      case "award":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"></path></svg>;
      case "bell":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
      case "life-buoy":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle></svg>;
      case "settings":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 -2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
      case "logout":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
      default:
        return null;
    }
  };

  return (
    <aside className={`ps-sidebar ${mobileMenuOpen ? "open" : ""}`}>
      <style>{`
        .ps-sidebar { width: 250px; background: linear-gradient(180deg, #061226 0%, #081B38 100%); background-color: #081B38; color: #94A3B8; display: flex; flex-direction: column; position: fixed; top: 0; bottom: 0; left: 0; z-index: 120; box-shadow: 6px 0 30px rgba(0,0,0,0.08); }
        .ps-brand { display: flex; align-items: center; gap: 14px; padding: 24px 20px 20px 22px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
        .ps-brand-badge { width: 42px; height: 42px; border-radius: 14px; background: linear-gradient(135deg, #3B82F6, #1D4ED8); display: flex; align-items: center; justify-content: center; font-size: 22px; color: #ffffff; box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4); }
        .ps-brand-text h2 { font-size: 15.5px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.3px; }
        .ps-brand-text p { font-size: 11.5px; color: #60A5FA; font-weight: 600; margin-top: 2px; }
        .ps-nav { flex: 1; overflow-y: auto; padding: 16px 12px; display: flex; flex-direction: column; gap: 4px; }
        .ps-nav-item { display: flex; align-items: center; justify-content: space-between; width: 100%; background: transparent; border: none; color: #94A3B8; padding: 11px 14px; border-radius: 12px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); text-align: left; }
        .ps-nav-item:hover { background-color: rgba(255, 255, 255, 0.08); color: #FFFFFF; transform: translateX(3px); }
        .ps-nav-item.active { background: linear-gradient(135deg, #2563EB, #1D4ED8); color: #FFFFFF; font-weight: 700; box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4); }
        .ps-nav-item-left { display: flex; align-items: center; gap: 12px; }
        .ps-logout-wrap { padding: 16px 16px 20px 16px; border-top: 1px solid rgba(255, 255, 255, 0.08); }
        .ps-logout-btn { width: 100%; display: flex; align-items: center; gap: 12px; background: transparent; border: none; color: #F87171; padding: 11px 14px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .ps-logout-btn:hover { background: rgba(239, 68, 68, 0.15); color: #EF4444; }
      `}</style>
      <div className="ps-brand">
        <div className="ps-brand-badge">🎓</div>
        <div className="ps-brand-text">
          <h2>Digital Learning Platform</h2>
          <p>Online Learning Portal</p>
        </div>
      </div>

      <nav className="ps-nav">
        {navLinks.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => {
                setMobileMenuOpen(false);
                if (item.path) navigate(item.path);
              }}
              className={`ps-nav-item ${isActive ? "active" : ""}`}
            >
              <div className="ps-nav-item-left">
                {renderSvgIcon(item.icon, 18, isActive ? "#FFFFFF" : "#94A3B8")}
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="ps-logout-wrap">
        <button onClick={handleLogout} className="ps-logout-btn">
          {renderSvgIcon("logout", 18, "#EF4444")}
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}