import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

export default function LiveClasses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    // Only check current_user first if we are strictly in student flow, 
    // or check explicit flags. Here we ensure it checks current_user properly 
    // and doesn't force teacher redirect unless explicitly logged in as teacher.
    const rawUser = localStorage.getItem("current_user");
    const rawTeacher = localStorage.getItem("current_teacher");

    if (rawUser) {
      setIsTeacher(false);
      setUser(JSON.parse(rawUser));
    } else if (rawTeacher) {
      setIsTeacher(true);
      setUser(JSON.parse(rawTeacher));
    } else {
      navigate("/student-login");
    }
  }, [navigate]);

  if (!user) return null;

  const teacherNavLinks = [
    { id: "Dashboard", label: "Dashboard", path: "/teacher-dashboard" },
    { id: "My Classes", label: "My Classes", path: "/teacher-classes" },
    { id: "Assignments", label: "Assignments & Grading", path: "/teacher-assignments" },
    { id: "Live Classes", label: "Live Classes", path: "/live-classes" },
    { id: "Notes & Materials", label: "Notes & Materials", path: "/notes" },
    { id: "Doubt Centre", label: "Doubt Centre", path: "/doubt-centre" },
    { id: "Announcements", label: "Announcements", path: "/announcements" },
    { id: "Settings", label: "Settings", path: "/settings" },
  ];

  // Second image lo unna complete student navigation links ikkada update cheyadam jarigindi
  const studentNavLinks = [
    { id: "Dashboard", label: "Dashboard", path: "/student-dashboard" },
    { id: "My Courses", label: "My Courses", path: "/courses" },
    { id: "Live Classes", label: "Live Classes", path: "/live-classes" },
    { id: "Assignments", label: "Assignments", path: "/assignments" },
    { id: "Quizzes", label: "Quizzes", path: "/quizzes" },
    { id: "Digital Library", label: "Digital Library", path: "/digital-library" },
    { id: "Notes", label: "Notes", path: "/notes" },
    { id: "Doubt Centre", label: "Doubt Centre", path: "/doubt-centre" },
    { id: "AI Agent", label: "AI Agent", path: "/ai-agent" },
    { id: "Progress", label: "Progress", path: "/progress" },
    { id: "Certificates", label: "Certificates", path: "/certificates" },
    { id: "Announcements", label: "Announcements", path: "/announcements" },
    { id: "Help & Support", label: "Help & Support", path: "/help-support" },
    { id: "Settings", label: "Settings", path: "/settings" },
  ];

  const currentNav = isTeacher ? teacherNavLinks : studentNavLinks;

  const handleLogout = () => {
    localStorage.clear();
    navigate(isTeacher ? "/teacher-login" : "/student-login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif", background: "#F8FAFC", color: "#0F172A", width: "100%" }}>
      {/* SIDEBAR */}
      <aside style={{ width: "250px", background: isTeacher ? "#081B38" : "#1E293B", color: "#94A3B8", display: "flex", flexDirection: "column", position: "fixed", top: 0, bottom: 0, left: 0, padding: "22px 14px", zIndex: 120 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 0 18px 8px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "18px" }}>
          <div style={{ width: "38px", height: "38px", background: isTeacher ? "#059669" : "#1E60F8", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "#fff" }}>{isTeacher ? "👩‍🏫" : "🎓"}</div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>Digital Learning</h3>
            <span style={{ fontSize: "11px", color: isTeacher ? "#34D399" : "#60A5FA" }}>{isTeacher ? "Teacher Portal" : "Student Portal"}</span>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, overflowY: "auto" }}>
          {currentNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 14px",
                  background: isActive ? (isTeacher ? "#059669" : "#1E60F8") : "transparent",
                  color: isActive ? "#FFFFFF" : "#94A3B8",
                  textDecoration: "none",
                  borderRadius: "9px",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 500
                }}
              >
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div style={{ padding: "14px 0 0 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={handleLogout} style={{ width: "100%", background: "transparent", border: "none", color: "#EF4444", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer", textAlign: "left" }}>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, marginLeft: "250px", display: "flex", flexDirection: "column" }}>
        <header style={{ height: "64px", background: "#fff", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700 }}>Live Classes Studio</h2>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#64748B" }}>{user.name} ({isTeacher ? "Educator" : "Student"})</span>
        </header>

        <div style={{ padding: "30px 32px" }}>
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "28px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Interactive Live Lectures</h3>
            <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "20px" }}>
              {isTeacher ? "Broadcast interactive lectures to your enrolled students in real time." : "Join ongoing virtual classrooms scheduled by your teachers."}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ border: "1px solid #E2E8F0", borderRadius: "12px", padding: "20px", background: "#FAFAFA" }}>
                <span style={{ fontSize: "11px", background: "#DCFCE7", color: "#15803D", padding: "3px 8px", borderRadius: "6px", fontWeight: 700 }}>LIVE NOW</span>
                <h4 style={{ fontSize: "15px", fontWeight: 700, marginTop: "10px", marginBottom: "4px" }}>Mathematics: Advanced Algebra & Equations</h4>
                <p style={{ fontSize: "12.5px", color: "#64748B", marginBottom: "16px" }}>Host: Educator {isTeacher ? user.name : "Priya Sharma"}</p>
                <button onClick={() => alert(isTeacher ? "Broadcasting live session..." : "Joining live video classroom...")} style={{ background: isTeacher ? "#059669" : "#1E60F8", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>
                  {isTeacher ? "Start Broadcast 📹" : "Join Class Room 🎥"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}