import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function TeacherAssignments() {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [submissions, setSubmissions] = useState([
    { id: "sub-1", student: "Rahul Sharma", title: "Knowing Our Numbers", status: "Pending Review", answer: "All questions solved and verified using Indian number systems." },
    { id: "sub-2", student: "Priya Varma", title: "Linear Equations", status: "Pending Review", answer: "x = 5, verified by substituting back into equation 1." }
  ]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [gradeMsg, setGradeMsg] = useState("");

  useEffect(() => {
    const rawTeacher = localStorage.getItem("current_teacher") || localStorage.getItem("current_user");
    if (!rawTeacher) {
      navigate("/teacher-login");
      return;
    }
    setTeacher(JSON.parse(rawTeacher));
  }, [navigate]);

  if (!teacher) return null;

  const handleGrade = (id) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
    setSelectedSub(null);
    alert("Assignment graded and feedback sent to student successfully!");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif", background: "#F8FAFC", color: "#0F172A", width: "100%" }}>
      {/* SIDEBAR */}
      <aside style={{ width: "250px", background: "#081B38", color: "#94A3B8", display: "flex", flexDirection: "column", position: "fixed", top: 0, bottom: 0, left: 0, padding: "22px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 0 18px 8px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "18px" }}>
          <div style={{ width: "38px", height: "38px", background: "#059669", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "#fff" }}>👩‍🏫</div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>Digital Learning</h3>
            <span style={{ fontSize: "11px", color: "#34D399" }}>Teacher Portal</span>
          </div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          <NavLink to="/teacher-dashboard" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>Dashboard</NavLink>
          <NavLink to="/teacher-classes" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>My Classes</NavLink>
          <NavLink to="/teacher-assignments" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", background: "#059669", color: "#fff", textDecoration: "none", borderRadius: "9px", fontSize: "13px", fontWeight: 600 }}>Assignments & Grading</NavLink>
          <NavLink to="/live-classes" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>Live Classes</NavLink>
          <NavLink to="/notes" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>Notes & Materials</NavLink>
          <NavLink to="/doubt-centre" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>Doubt Centre</NavLink>
          <NavLink to="/announcements" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>Announcements</NavLink>
          <NavLink to="/settings" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>Settings</NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, marginLeft: "250px", display: "flex", flexDirection: "column" }}>
        <header style={{ height: "64px", background: "#fff", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700 }}>Assignments Pending Review & Grading</h2>
        </header>

        <div style={{ padding: "30px 32px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {submissions.length === 0 ? (
            <div style={{ background: "#fff", padding: "40px", textAlign: "center", borderRadius: "16px", border: "1px solid #E2E8F0", color: "#64748B" }}>
              🎉 All student assignments have been reviewed and graded!
            </div>
          ) : (
            submissions.map((sub) => (
              <div key={sub.id} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>{sub.title}</h3>
                  <p style={{ fontSize: "12.5px", color: "#64748B", marginBottom: "6px" }}>Submitted by: <strong>{sub.student}</strong></p>
                  <span style={{ fontSize: "11px", background: "#FEF3C7", color: "#D97706", padding: "3px 8px", borderRadius: "6px", fontWeight: 700 }}>{sub.status}</span>
                </div>
                <button
                  onClick={() => setSelectedSub(sub)}
                  style={{ background: "#059669", color: "#fff", border: "none", padding: "9px 20px", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}
                >
                  Review & Grade ›
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      {/* GRADING MODAL */}
      {selectedSub && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15,23,42,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300 }}>
          <div style={{ background: "#fff", borderRadius: "16px", width: "100%", maxWidth: "500px", padding: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}>Review Submission: {selectedSub.title}</h3>
            <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "16px" }}>Student: <strong>{selectedSub.student}</strong></p>
            <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "12px", borderRadius: "8px", fontSize: "13px", marginBottom: "16px" }}>
              <strong>Student Answer:</strong>
              <p style={{ marginTop: "4px", color: "#334155" }}>"{selectedSub.answer}"</p>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "6px" }}>Educator Remarks / Grade</label>
              <textarea
                value={gradeMsg}
                onChange={(e) => setGradeMsg(e.target.value)}
                placeholder="Type grade (e.g. A+) or feedback notes..."
                style={{ width: "100%", height: "90px", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setSelectedSub(null)} style={{ background: "#F1F5F9", border: "1px solid #CBD5E1", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
              <button onClick={() => handleGrade(selectedSub.id)} style={{ background: "#059669", color: "#fff", border: "none", padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 700 }}>Submit Grade ✓</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}