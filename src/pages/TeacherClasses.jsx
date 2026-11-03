import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeacherSidebar from "../components/TeacherSidebar";

const sampleStudentsByClass = {
  6: ["Aarav Mehta", "Diya Kapoor", "Ishaan Reddy"],
  7: ["Anaya Sharma", "Kabir Nair", "Meera Joshi"],
  8: ["Arjun Verma", "Saanvi Patel", "Vivaan Rao"],
  9: ["Aditi Kumar", "Reyansh Singh", "Tara Iyer"],
  10: ["Advik Das", "Myra Chawla", "Rohan Gupta"],
};

export default function TeacherClasses() {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [rosterError, setRosterError] = useState("");

  useEffect(() => {
    const rawTeacher = localStorage.getItem("current_teacher") || localStorage.getItem("current_user");
    if (!rawTeacher) {
      navigate("/teacher-login");
      return;
    }

    let currentTeacher;
    try {
      currentTeacher = JSON.parse(rawTeacher);
    } catch {
      navigate("/teacher-login");
      return;
    }

    setTeacher(currentTeacher);
    try {
      const rawStudents = localStorage.getItem("all_students") || "[]";
      const allStudents = JSON.parse(rawStudents);
      if (!Array.isArray(allStudents)) {
        throw new Error("Student records must be a list.");
      }

      const assignedClass = String(currentTeacher.class || "").match(/\d+/)?.[0];
      const sampleStudents = (sampleStudentsByClass[assignedClass] || []).map((name, index) => ({
        id: `sample-${assignedClass}-${index + 1}`,
        name,
        roll: `S-${String(index + 1).padStart(2, "0")}`,
        class: assignedClass,
        isSample: true,
      }));
      const registeredStudents = assignedClass
        ? allStudents.filter((student) => String(student?.class || "").match(/\d+/)?.[0] === assignedClass)
        : [];
      setStudents(
        [...sampleStudents, ...registeredStudents]
      );
    } catch {
      setRosterError("Unable to load the class roster. Please try again.");
    }
  }, [navigate]);

  if (!teacher) return null;

  const classNumber = String(teacher.class || "").match(/\d+/)?.[0];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif", background: "#F8FAFC", color: "#0F172A", width: "100%" }}>
      <TeacherSidebar />

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, marginLeft: "250px", display: "flex", flexDirection: "column" }}>
        <header style={{ height: "64px", background: "#fff", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700 }}>
            {classNumber ? `Class ${classNumber} Enrolled Students` : "Enrolled Students"}
          </h2>
          <span style={{ fontSize: "13px", color: "#64748B", fontWeight: 600 }}>{teacher.school}</span>
        </header>

        <div style={{ padding: "30px 32px" }}>
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
            <div style={{ padding: "18px 24px", borderBottom: "1px solid #E2E8F0", fontWeight: 700, fontSize: "14px" }}>
              Student Roster ({students.length})
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#F8FAFC", color: "#64748B", borderBottom: "1px solid #E2E8F0" }}>
                  <th style={{ padding: "12px 24px" }}>Roll No</th>
                  <th style={{ padding: "12px 24px" }}>Student Name</th>
                  <th style={{ padding: "12px 24px" }}>Email</th>
                  <th style={{ padding: "12px 24px" }}>Account</th>
                </tr>
              </thead>
              <tbody>
                {rosterError ? (
                  <tr>
                    <td colSpan="4" role="alert" style={{ padding: "24px", textAlign: "center", color: "#B91C1C" }}>
                      {rosterError}
                    </td>
                  </tr>
                ) : students.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ padding: "24px", textAlign: "center", color: "#64748B" }}>
                      {classNumber ? `No students are registered for Class ${classNumber} yet.` : "No class is assigned to this teacher account."}
                    </td>
                  </tr>
                ) : students.map((st, index) => (
                  <tr key={st.id || st.email || index} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "14px 24px", fontWeight: 600 }}>{st.roll || st.id || index + 1}</td>
                    <td style={{ padding: "14px 24px" }}>{st.name || "Unnamed student"}</td>
                    <td style={{ padding: "14px 24px" }}>{st.email || "—"}</td>
                    <td style={{ padding: "14px 24px" }}>
                      <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, background: st.isSample ? "#EDE9FE" : "#DCFCE7", color: st.isSample ? "#6D28D9" : "#15803D" }}>
                        {st.isSample ? "Sample" : "Registered"}
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