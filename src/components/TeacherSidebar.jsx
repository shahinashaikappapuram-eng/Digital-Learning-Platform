import {
  Bell,
  BookOpen,
  CircleHelp,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  UsersRound,
  Video,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", path: "/teacher-dashboard", icon: LayoutDashboard },
  { label: "My Classes", path: "/teacher-classes", icon: UsersRound },
  { label: "Assignments & Grading", path: "/teacher-assignments", icon: ClipboardList },
  { label: "Live Classes", path: "/live-classes", icon: Video },
  { label: "Notes & Materials", path: "/teacher-notes", icon: FileText },
  { label: "Doubt Centre", path: "/doubt-centre", icon: CircleHelp },
  { label: "Announcements", path: "/announcements", icon: Bell },
  { label: "Settings", path: "/settings?portal=teacher", icon: Settings },
];

export default function TeacherSidebar({ onLogout, width = 250 }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      return;
    }

    localStorage.removeItem("current_teacher");
    localStorage.removeItem("current_user");
    localStorage.removeItem("teacherLoggedIn");
    navigate("/teacher-login");
  };

  return (
    <aside style={{ width: `${width}px`, background: "#081B38", color: "#94A3B8", display: "flex", flexDirection: "column", position: "fixed", top: 0, bottom: 0, left: 0, padding: "22px 14px", zIndex: 120 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 0 18px 8px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "18px" }}>
        <div style={{ width: "38px", height: "38px", background: "#059669", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <BookOpen size={20} aria-hidden="true" />
        </div>
        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>Digital Learning</h3>
          <span style={{ fontSize: "11px", color: "#34D399" }}>Teacher Portal</span>
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
              background: isActive ? "#059669" : "transparent",
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
  );
}
