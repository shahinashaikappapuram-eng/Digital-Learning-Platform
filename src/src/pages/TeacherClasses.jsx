import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

export default function TeacherClasses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [teacher, setTeacher] = useState(null);

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

  const studentsList = [
    { id: 1, name: "Rahul Sharma", roll: "101", attendance: "95%", status: "Active", grade: "A" },
    { id: 2, name: "Priya Varma", roll: "102", attendance: "90%", status: "Active", grade: "B+" },
    { id: 3, name: "Amit Kumar", roll: "103", attendance: "85%", status: "Needs Attention", grade: "C" },
    { id: 4, name: "Sneha Reddy", roll: "104", attendance: "98%", status: "Active", grade: "A+" },
  ];

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
          <NavLink to="/teacher-dashboard" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>
            <span>🏠</span> Dashboard
          </NavLink>
          <NavLink to="/teacher-classes" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", background: "#059669", color: "#fff", textDecoration: "none", borderRadius: "9px", fontSize: "13px", fontWeight: 600 }}>
            <span>👥</span> My Classes
          </NavLink>
          <NavLink to="/teacher-assignments" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>
            <span>📚</span> Assignments & Grading
          </NavLink>
          <NavLink to="/live-classes" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>
            <span>📹</span> Live Classes
          </NavLink>
          <NavLink to="/teacher-notes" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", color: "#94A3B8", textDecoration: "none", borderRadius: "9px", fontSize: "13px" }}>
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
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, marginLeft: "250px", display: "flex", flexDirection: "column" }}>
        <header style={{ height: "64px", background: "#fff", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700 }}>Class {teacher.class}th Enrolled Students</h2>
          <span style={{ fontSize: "13px", color: "#64748B", fontWeight: 600 }}>{teacher.school}</span>
        </header>

        <div style={{ padding: "30px 32px" }}>
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
            <div style={{ padding: "18px 24px", borderBottom: "1px solid #E2E8F0", fontWeight: 700, fontSize: "14px" }}>Student Roster</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#F8FAFC", color: "#64748B", borderBottom: "1px solid #E2E8F0" }}>
                  <th style={{ padding: "12px 24px" }}>Roll No</th>
                  <th style={{ padding: "12px 24px" }}>Student Name</th>
                  <th style={{ padding: "12px 24px" }}>Attendance</th>
                  <th style={{ padding: "12px 24px" }}>Performance</th>
                  <th style={{ padding: "12px 24px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {studentsList.map((st) => (
                  <tr key={st.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "14px 24px", fontWeight: 600 }}>{st.roll}</td>
                    <td style={{ padding: "14px 24px" }}>{st.name}</td>
                    <td style={{ padding: "14px 24px", color: "#059669", fontWeight: 700 }}>{st.attendance}</td>
                    <td style={{ padding: "14px 24px", fontWeight: 600 }}>Grade {st.grade}</td>
                    <td style={{ padding: "14px 24px" }}>
                      <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, background: st.status === "Active" ? "#DCFCE7" : "#FEF3C7", color: st.status === "Active" ? "#15803D" : "#D97706" }}>
                        {st.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}