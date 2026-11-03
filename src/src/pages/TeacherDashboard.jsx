import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [teacher, setTeacher] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState("Notes");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadSubject, setUploadSubject] = useState("Mathematics");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const rawTeacher = localStorage.getItem("current_teacher") || localStorage.getItem("current_user");
    if (!rawTeacher) {
      navigate("/teacher-login");
      return;
    }
    try {
      setTeacher(JSON.parse(rawTeacher));
    } catch {
      navigate("/teacher-login");
    }
  }, [navigate]);

  if (!teacher) return null;

  const handleLogout = () => {
    localStorage.removeItem("current_teacher");
    localStorage.removeItem("current_user");
    localStorage.removeItem("teacherLoggedIn");
    navigate("/teacher-login");
  };

  const navLinks = [
    { id: "Dashboard", label: "Dashboard", icon: "dashboard", path: "/teacher-dashboard" },
    { id: "My Classes", label: "My Classes", icon: "book-open", path: "/teacher-classes" },
    { id: "Assignments", label: "Assignments & Grading", icon: "clipboard", path: "/teacher-assignments" },
    { id: "Live Classes", label: "Live Classes", icon: "video", path: "/live-classes" },
    { id: "Notes & Materials", label: "Notes & Materials", icon: "file-text", path: "/teacher-notes"  },
    { id: "Doubt Centre", label: "Doubt Centre", icon: "doubt-center", path: "/doubt-centre" },
    { id: "Announcements", label: "Announcements", icon: "bell", path: "/announcements" },
    { id: "Settings", label: "Settings", icon: "settings", path: "/settings" },
  ];

  const renderSvgIcon = (name, size = 18, stroke = "currentColor") => {
    switch (name) {
      case "dashboard":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2"><rect x="3" y="3" width="7" height="7" rx="2"></rect><rect x="14" y="3" width="7" height="7" rx="2"></rect><rect x="14" y="14" width="7" height="7" rx="2"></rect><rect x="3" y="14" width="7" height="7" rx="2"></rect></svg>;
      case "book-open":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
      case "video":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2"></rect></svg>;
      case "clipboard":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1"></rect></svg>;
      case "file-text":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>;
      case "doubt-center":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
      case "bell":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
      case "settings":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 -2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
      case "logout":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
      default:
        return null;
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setShowUploadModal(false);
      setUploadTitle("");
    }, 1200);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif", background: "#F8FAFC", color: "#0F172A", width: "100%" }}>
      {/* TEACHER SIDEBAR */}
      <aside style={{ width: "250px", background: "#081B38", color: "#94A3B8", display: "flex", flexDirection: "column", position: "fixed", top: 0, bottom: 0, left: 0, padding: "22px 14px", zIndex: 120 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 0 18px 8px", borderBottom: "1px solid rgba(255, 255, 255, 0.07)", marginBottom: "18px" }}>
          <div style={{ width: "38px", height: "38px", background: "#059669", borderRadius: "10px", display: "flex", alignItems: "center", justifyCenter: "center", fontSize: "20px", color: "#fff" }}>👩‍🏫</div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>Digital Learning</h3>
            <span style={{ fontSize: "11px", color: "#34D399" }}>Teacher Portal</span>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, overflowY: "auto" }}>
          {navLinks.map((item) => {
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
                  background: isActive ? "#059669" : "transparent",
                  color: isActive ? "#FFFFFF" : "#94A3B8",
                  textDecoration: "none",
                  borderRadius: "9px",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 500
                }}
              >
                {renderSvgIcon(item.icon, 18, isActive ? "#FFFFFF" : "#94A3B8")}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div style={{ padding: "14px 0 0 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={handleLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", background: "transparent", border: "none", color: "#EF4444", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
            {renderSvgIcon("logout", 18, "#EF4444")}
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div style={{ flex: 1, marginLeft: "250px", display: "flex", flexDirection: "column" }}>
        <header style={{ height: "64px", background: "#fff", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 100 }}>
          <div>
            <h2 style={{ fontSize: "15px", fontWeight: 700 }}>Digital Learning Platform</h2>
            <p style={{ fontSize: "11.5px", color: "#64748B" }}>Educator Control Center</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button onClick={() => navigate("/announcements")} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyCenter: "center" }}>
              {renderSvgIcon("bell", 18, "#475569")}
            </button>
            <div onClick={() => navigate("/settings")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#A7F3D0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>👩‍🏫</div>
              <div>
                <strong style={{ fontSize: "13px", display: "block" }}>{teacher.name}</strong>
                <span style={{ fontSize: "11px", color: "#059669", fontWeight: 600 }}>Class {teacher.class}th Educator</span>
              </div>
            </div>
          </div>
        </header>

        <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: "24px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          {/* Welcome Banner */}
          <div style={{ background: "linear-gradient(135deg, #059669 0%, #10B981 100%)", borderRadius: "16px", padding: "24px 28px", color: "#fff", boxShadow: "0 10px 25px rgba(5, 150, 105, 0.2)" }}>
            <h1 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "4px" }}>👋 Welcome back, {teacher.name}!</h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.9)", marginBottom: "20px" }}>Ready to inspire and empower your students today?</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
              <div style={{ background: "rgba(255,255,255,0.15)", padding: "10px 14px", borderRadius: "10px" }}>
                <small style={{ fontSize: "10px", textTransform: "uppercase", opacity: 0.8 }}>Teacher ID</small>
                <div style={{ fontSize: "13px", fontWeight: 700 }}>{teacher.id}</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.15)", padding: "10px 14px", borderRadius: "10px" }}>
                <small style={{ fontSize: "10px", textTransform: "uppercase", opacity: 0.8 }}>Institution</small>
                <div style={{ fontSize: "13px", fontWeight: 700 }}>{teacher.school}</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.15)", padding: "10px 14px", borderRadius: "10px" }}>
                <small style={{ fontSize: "10px", textTransform: "uppercase", opacity: 0.8 }}>Assigned Class</small>
                <div style={{ fontSize: "13px", fontWeight: 700 }}>Class {teacher.class}th</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.15)", padding: "10px 14px", borderRadius: "10px" }}>
                <small style={{ fontSize: "10px", textTransform: "uppercase", opacity: 0.8 }}>Status</small>
                <div style={{ fontSize: "13px", fontWeight: 700 }}>Active Faculty</div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>Class Overview</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
              <div style={{ background: "#fff", border: "1px solid #E2E8F0", padding: "18px", borderRadius: "14px" }}>
                <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>Enrolled Students</span>
                <div style={{ fontSize: "22px", fontWeight: 800, marginTop: "4px" }}>42</div>
                <span style={{ fontSize: "11px", color: "#059669", fontWeight: 600 }}>Active in Class {teacher.class}th</span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E2E8F0", padding: "18px", borderRadius: "14px" }}>
                <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>Assignments Pending Review</span>
                <div style={{ fontSize: "22px", fontWeight: 800, marginTop: "4px" }}>2</div>
                <span style={{ fontSize: "11px", color: "#D97706", fontWeight: 600, cursor: "pointer" }} onClick={() => navigate("/teacher-assignments")}>Needs Grading →</span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E2E8F0", padding: "18px", borderRadius: "14px" }}>
                <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>Live Classes Today</span>
                <div style={{ fontSize: "22px", fontWeight: 800, marginTop: "4px" }}>2</div>
                <span style={{ fontSize: "11px", color: "#2563EB", fontWeight: 600, cursor: "pointer" }} onClick={() => navigate("/live-classes")}>Join Studio →</span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E2E8F0", padding: "18px", borderRadius: "14px" }}>
                <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>Average Quiz Score</span>
                <div style={{ fontSize: "22px", fontWeight: 800, marginTop: "4px" }}>78%</div>
                <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 600 }}>Class Performance</span>
              </div>
            </div>
          </div>

          {/* Elevated Action Buttons (Working) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", padding: "22px", borderRadius: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>Upload Study Notes & Material</h3>
                <p style={{ fontSize: "12.5px", color: "#64748B", marginBottom: "16px" }}>Publish PDF notes, revision sheets, or chapter materials for Class {teacher.class} students instantly.</p>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                style={{ background: "#059669", color: "#fff", border: "none", padding: "11px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", boxShadow: "0 4px 12px rgba(5,150,105,0.3)" }}
              >
                + Upload New Material
              </button>
            </div>

            <div style={{ background: "#fff", border: "1px solid #E2E8F0", padding: "22px", borderRadius: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>Host Live Classroom</h3>
                <p style={{ fontSize: "12.5px", color: "#64748B", marginBottom: "16px" }}>Start an interactive video lecture or join scheduled sessions with students.</p>
              </div>
              <button
                onClick={() => navigate("/live-classes")}
                style={{ background: "#059669", color: "#fff", border: "none", padding: "11px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", boxShadow: "0 4px 12px rgba(5,150,105,0.3)" }}
              >
                📹 Launch Live Studio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15,23,42,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300 }}>
          <div style={{ background: "#fff", borderRadius: "16px", width: "100%", maxWidth: "440px", padding: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700 }}>Upload Study Material</h3>
              <button onClick={() => setShowUploadModal(false)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer" }}>✕</button>
            </div>
            {uploadSuccess ? (
              <div style={{ textAlign: "center", padding: "20px", color: "#059669", fontWeight: 700 }}>✓ Material Uploaded Successfully!</div>
            ) : (
              <form onSubmit={handleUploadSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Material Type</label>
                  <select value={uploadType} onChange={(e) => setUploadType(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px" }}>
                    <option value="Notes">Chapter Notes</option>
                    <option value="Assignment">Assignment Prompt</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Subject</label>
                  <select value={uploadSubject} onChange={(e) => setUploadSubject(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px" }}>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="Telugu">Telugu</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Title / Topic</label>
                  <input type="text" value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)} placeholder="e.g. Algebra Practice Sheet" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px" }} required />
                </div>
                <button type="submit" style={{ marginTop: "8px", background: "#059669", color: "#fff", border: "none", padding: "11px", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}>Publish Material ✓</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}