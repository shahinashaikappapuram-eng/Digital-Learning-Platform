import {
  Award,
  Bell,
  BookOpen,
  Bot,
  CircleCheck,
  CircleHelp,
  ClipboardList,
  FileText,
  Library,
  LifeBuoy,
  LogOut,
  Settings,
  TrendingUp,
  Video,
  LayoutDashboard,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", path: "/student-dashboard", icon: LayoutDashboard },
  { label: "My Courses", path: "/courses", icon: BookOpen },
  { label: "Live Classes", path: "/live-classes", icon: Video },
  { label: "Assignments", path: "/assignments", icon: ClipboardList },
  { label: "Quizzes", path: "/quizzes", icon: CircleCheck },
  { label: "Digital Library", path: "/digital-library", icon: Library },
  { label: "Notes", path: "/notes", icon: FileText },
  { label: "Doubt Centre", path: "/doubt-centre", icon: CircleHelp },
  { label: "AI Agent", path: "/ai-agent", icon: Bot },
  { label: "Progress", path: "/progress", icon: TrendingUp },
  { label: "Certificates", path: "/certificates", icon: Award },
  { label: "Announcements", path: "/announcements", icon: Bell },
  { label: "Help & Support", path: "/help-support", icon: LifeBuoy },
  { label: "Settings", path: "/settings?portal=student", icon: Settings },
];

export default function StudentSidebar({ onLogout }) {
  const navigate = useNavigate();
  let schoolName = "Smart Learning Portal";
  try {
    const user = JSON.parse(localStorage.getItem("current_user") || "null");
    schoolName = user?.school || schoolName;
  } catch {
    schoolName = "Smart Learning Portal";
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      return;
    }

    localStorage.removeItem("current_user");
    localStorage.removeItem("studentLoggedIn");
    localStorage.removeItem("studentId");
    navigate("/student-login");
  };

  return (
    <>
      <style>{`
        .shared-student-sidebar {
          width: 250px;
          background: linear-gradient(180deg, #061226 0%, #081B38 100%);
          color: #94A3B8;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 120;
          box-shadow: 6px 0 30px rgba(0, 0, 0, 0.08);
        }
        .shared-student-brand {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 24px 20px 20px 22px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .shared-student-brand-badge {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          background: linear-gradient(135deg, #3B82F6, #1D4ED8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
        }
        .shared-student-brand-title {
          margin: 0;
          color: #FFFFFF;
          font-size: 15.5px;
          font-weight: 800;
          letter-spacing: 0.3px;
        }
        .shared-student-brand-school {
          display: block;
          margin-top: 2px;
          color: #60A5FA;
          font-size: 11.5px;
          font-weight: 600;
        }
        .shared-student-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow-y: auto;
          padding: 16px 12px;
        }
        .shared-student-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 12px;
          color: #94A3B8;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .shared-student-nav-link:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          transform: translateX(3px);
        }
        .shared-student-nav-link.active {
          background: linear-gradient(135deg, #2563EB, #1D4ED8);
          color: #FFFFFF;
          font-weight: 700;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
        }
        .shared-student-nav-link:focus-visible,
        .shared-student-logout:focus-visible {
          outline: 2px solid #93C5FD;
          outline-offset: 2px;
        }
        .shared-student-logout-wrap {
          padding: 16px 16px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .shared-student-logout {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border: 0;
          border-radius: 12px;
          background: transparent;
          color: #F87171;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
        }
        .shared-student-logout:hover {
          background: rgba(239, 68, 68, 0.15);
          color: #EF4444;
        }
        @media (max-width: 1024px) {
          .shared-student-sidebar { display: none !important; }
        }
      `}</style>
      <aside className="shared-student-sidebar">
        <div className="shared-student-brand">
          <div className="shared-student-brand-badge" aria-hidden="true">
            🎓
          </div>
          <div>
            <h3 className="shared-student-brand-title">Smart Education</h3>
            <span className="shared-student-brand-school">{schoolName}</span>
          </div>
        </div>

        <nav className="shared-student-nav">
          {menuItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `shared-student-nav-link${isActive ? " active" : ""}`
              }
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="shared-student-logout-wrap">
          <button onClick={handleLogout} className="shared-student-logout">
            <LogOut size={18} aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
