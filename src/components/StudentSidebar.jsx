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
        @media (max-width: 1024px) {
          .shared-student-sidebar { display: none !important; }
        }
      `}</style>
      <aside className="shared-student-sidebar" style={{ width: "240px", background: "#081B38", color: "#94A3B8", display: "flex", flexDirection: "column", position: "fixed", top: 0, bottom: 0, left: 0, padding: "22px 14px", zIndex: 120 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 0 18px 8px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "18px" }}>
          <div style={{ width: "38px", height: "38px", background: "#2563EB", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            <BookOpen size={20} aria-hidden="true" />
          </div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>Digital Learning</h3>
            <span style={{ fontSize: "11px", color: "#60A5FA" }}>Student Portal</span>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, overflowY: "auto" }}>
          {menuItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 14px",
                background: isActive ? "#2563EB" : "transparent",
                color: isActive ? "#FFFFFF" : "#94A3B8",
                textDecoration: "none",
                borderRadius: "9px",
                fontSize: "13px",
                fontWeight: isActive ? 600 : 500,
              })}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: "14px 0 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={handleLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", background: "transparent", border: "none", color: "#EF4444", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer", textAlign: "left" }}>
            <LogOut size={18} aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
