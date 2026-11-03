import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const initialMaterials = [
  {
    id: 1,
    title: "Fractions – Chapter 4",
    subject: "Mathematics",
    className: "Class 6th",
    type: "PDF",
    topic: "Fractions",
    uploaded: "Today",
    icon: "📘",
  },
  {
    id: 2,
    title: "Light and Shadows",
    subject: "Science",
    className: "Class 6th",
    type: "Notes",
    topic: "Light",
    uploaded: "Yesterday",
    icon: "🔬",
  },
  {
    id: 3,
    title: "English Grammar Basics",
    subject: "English",
    className: "Class 6th",
    type: "PDF",
    topic: "Grammar",
    uploaded: "2 days ago",
    icon: "📕",
  },
  {
    id: 4,
    title: "Maps and Directions",
    subject: "Social Studies",
    className: "Class 6th",
    type: "Worksheet",
    topic: "Maps",
    uploaded: "3 days ago",
    icon: "🗺️",
  },
];

export default function TeacherNotes() {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [materials, setMaterials] = useState(initialMaterials);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All Subjects");
  const [type, setType] = useState("All Types");
  const [showUpload, setShowUpload] = useState(false);

  const [newMaterial, setNewMaterial] = useState({
    title: "",
    subject: "Mathematics",
    topic: "",
    type: "PDF",
    description: "",
  });

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

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(search.toLowerCase()) ||
      material.topic.toLowerCase().includes(search.toLowerCase());

    const matchesSubject =
      subject === "All Subjects" || material.subject === subject;

    const matchesType =
      type === "All Types" || material.type === type;

    return matchesSearch && matchesSubject && matchesType;
  });

  const handleUpload = (e) => {
    e.preventDefault();

    if (!newMaterial.title.trim()) {
      alert("Please enter material title");
      return;
    }

    const material = {
      id: Date.now(),
      title: newMaterial.title,
      subject: newMaterial.subject,
      className: "Class 6th",
      type: newMaterial.type,
      topic: newMaterial.topic || "General",
      uploaded: "Just now",
      icon:
        newMaterial.type === "PDF"
          ? "📕"
          : newMaterial.type === "Video"
          ? "🎥"
          : newMaterial.type === "Worksheet"
          ? "📝"
          : "📘",
    };

    setMaterials([material, ...materials]);

    setNewMaterial({
      title: "",
      subject: "Mathematics",
      topic: "",
      type: "PDF",
      description: "",
    });

    setShowUpload(false);
    alert("Material published successfully!");
  };

  const deleteMaterial = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this material?"
    );

    if (confirmDelete) {
      setMaterials(materials.filter((material) => material.id !== id));
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif", background: "#F8FAFC", color: "#0F172A", width: "100%", overflow: "hidden" }}>
      
      {/* TEACHER SIDEBAR */}
      <aside style={{ width: "250px", background: "#081B38", color: "#94A3B8", display: "flex", flexDirection: "column", position: "fixed", top: 0, bottom: 0, left: 0, padding: "22px 14px", zIndex: 120 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 0 18px 8px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "18px" }}>
          <div style={{ width: "38px", height: "38px", background: "#059669", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "#fff" }}>👩‍🏫</div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fff", margin: 0 }}>Digital Learning</h3>
            <span style={{ fontSize: "11px", color: "#34D399" }}>Teacher Portal</span>
          </div>
        </div>
        
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, overflowY: "auto" }}>
          <NavLink to="/teacher-dashboard" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>
            <span>🏠</span> Dashboard
          </NavLink>
          <NavLink to="/teacher-classes" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>
            <span>👥</span> My Classes
          </NavLink>
          <NavLink to="/teacher-assignments" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>
            <span>📚</span> Assignments & Grading
          </NavLink>
          <NavLink to="/live-classes" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>
            <span>📹</span> Live Classes
          </NavLink>
          <NavLink to="/teacher-notes" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", background: "#059669", color: "#fff", textDecoration: "none", borderRadius: "9px", fontSize: "13px", fontWeight: 600 }}>
            <span>📄</span> Notes & Materials
          </NavLink>
          <NavLink to="/doubt-centre" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>
            <span>❓</span> Doubt Centre
          </NavLink>
          <NavLink to="/announcements" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>
            <span>📢</span> Announcements
          </NavLink>
          <NavLink to="/settings" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>
            <span>⚙️</span> Settings
          </NavLink>
        </nav>

        <div style={{ padding: "14px 0 0 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={handleLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", background: "transparent", border: "none", color: "#EF4444", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, marginLeft: "250px", display: "flex", flexDirection: "column", height: "100vh", overflowY: "auto" }}>
        
        {/* HEADER */}
        <header style={{ height: "64px", background: "#fff", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 100, flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Notes & Study Materials</h2>
            <p style={{ fontSize: "11.5px", color: "#64748B", margin: 0 }}>Manage and publish learning resources for Class 6th students</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#F1F5F9", padding: "6px 12px", borderRadius: "20px" }}>
              <span style={{ width: "28px", height: "28px", background: "#059669", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" }}>👩‍🏫</span>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}>{teacher.name}</span>
            </div>
          </div>
        </header>

        {/* BODY */}
        <div style={{ padding: "30px 32px", display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* PAGE HEADER & UPLOAD BTN */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", padding: "20px 24px", borderRadius: "14px", border: "1px solid #E2E8F0" }}>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>Study Materials Library</h2>
              <p style={{ fontSize: "13px", color: "#64748B", margin: "4px 0 0 0" }}>Upload, organize and share learning materials with your students.</p>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              style={{ background: "#059669", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}
            >
              + Upload New Material
            </button>
          </div>

          {/* SEARCH AND FILTERS */}
          <div style={{ background: "#fff", padding: "16px 20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", gap: "12px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="🔍 Search notes, chapters or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", outline: "none" }}
            />
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", outline: "none" }}
            >
              <option>All Subjects</option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>English</option>
              <option>Social Studies</option>
              <option>Computer</option>
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", outline: "none" }}
            >
              <option>All Types</option>
              <option>PDF</option>
              <option>Notes</option>
              <option>Worksheet</option>
              <option>Video</option>
            </select>
          </div>

          {/* MATERIALS TABLE */}
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ padding: "18px 24px", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>Published Materials ({filteredMaterials.length})</h3>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#F8FAFC", color: "#64748B", borderBottom: "1px solid #E2E8F0" }}>
                  <th style={{ padding: "12px 24px" }}>Material</th>
                  <th style={{ padding: "12px 24px" }}>Subject</th>
                  <th style={{ padding: "12px 24px" }}>Class</th>
                  <th style={{ padding: "12px 24px" }}>Type</th>
                  <th style={{ padding: "12px 24px" }}>Uploaded</th>
                  <th style={{ padding: "12px 24px", textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#64748B" }}>
                      <div style={{ fontSize: "30px", marginBottom: "8px" }}>📂</div>
                      <strong>No materials found</strong>
                      <p style={{ fontSize: "12px", margin: "4px 0 0 0" }}>Try changing your search or filters.</p>
                    </td>
                  </tr>
                ) : (
                  filteredMaterials.map((material) => (
                    <tr key={material.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <td style={{ padding: "14px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "20px" }}>{material.icon}</span>
                        <div>
                          <strong style={{ display: "block", color: "#0F172A" }}>{material.title}</strong>
                          <small style={{ color: "#64748B" }}>{material.topic}</small>
                        </div>
                      </td>
                      <td style={{ padding: "14px 24px", fontWeight: 600 }}>{material.subject}</td>
                      <td style={{ padding: "14px 24px" }}>
                        <span style={{ background: "#E2E8F0", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 600 }}>{material.className}</span>
                      </td>
                      <td style={{ padding: "14px 24px" }}>
                        <span style={{ background: "#DCFCE7", color: "#15803D", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700 }}>{material.type}</span>
                      </td>
                      <td style={{ padding: "14px 24px", color: "#64748B" }}>{material.uploaded}</td>
                      <td style={{ padding: "14px 24px", textAlign: "center" }}>
                        <button onClick={() => alert(`Opening: ${material.title}`)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", marginRight: "8px" }} title="View">👁️</button>
                        <button onClick={() => alert(`Downloading: ${material.title}`)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", marginRight: "8px" }} title="Download">⬇️</button>
                        <button onClick={() => deleteMaterial(material.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px" }} title="Delete">🗑️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* UPLOAD MODAL */}
      {showUpload && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15,23,42,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300 }}>
          <div style={{ background: "#fff", borderRadius: "16px", width: "100%", maxWidth: "440px", padding: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Upload Study Material</h3>
              <button onClick={() => setShowUpload(false)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer" }}>✕</button>
            </div>
            
            <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Material Title</label>
                <input
                  type="text"
                  placeholder="Example: Fractions – Chapter 4"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", outline: "none" }}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Subject</label>
                  <select
                    value={newMaterial.subject}
                    onChange={(e) => setNewMaterial({ ...newMaterial, subject: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", outline: "none" }}
                  >
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>Social Studies</option>
                    <option>Computer</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Material Type</label>
                  <select
                    value={newMaterial.type}
                    onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", outline: "none" }}
                  >
                    <option>PDF</option>
                    <option>Notes</option>
                    <option>Worksheet</option>
                    <option>Video</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Chapter / Topic</label>
                <input
                  type="text"
                  placeholder="Example: Fractions"
                  value={newMaterial.topic}
                  onChange={(e) => setNewMaterial({ ...newMaterial, topic: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Description</label>
                <textarea
                  rows="2"
                  placeholder="Write a short description..."
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                <button type="button" onClick={() => setShowUpload(false)} style={{ background: "#E2E8F0", border: "none", padding: "10px 16px", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ background: "#059669", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}>Upload & Publish ✓</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}