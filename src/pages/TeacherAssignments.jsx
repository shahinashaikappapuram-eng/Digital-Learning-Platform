import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeacherSidebar from "../components/TeacherSidebar";

export default function TeacherAssignments() {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [gradeMsg, setGradeMsg] = useState("");
  const [gradeError, setGradeError] = useState("");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const rawTeacher = localStorage.getItem("current_teacher") || localStorage.getItem("current_user");
    if (!rawTeacher) {
      navigate("/teacher-login");
      return;
    }

    try {
      const currentTeacher = JSON.parse(rawTeacher);
      setTeacher(currentTeacher);
      const allStudents = JSON.parse(localStorage.getItem("all_students") || "[]");
      if (!Array.isArray(allStudents)) {
        throw new Error("Student records must be a list.");
      }

      const assignedClass = String(currentTeacher.class || "").match(/\d+/)?.[0];
      const classStudents = allStudents.filter(
        (student) => assignedClass && student && String(student.class || "").match(/\d+/)?.[0] === assignedClass
      );
      const classSubmissions = classStudents.flatMap((student) =>
        Object.entries(student.assignmentStatuses || {})
          .filter(([assignmentId, status]) => status === "Submitted" && assignmentId.startsWith(`${assignedClass}-`))
          .map(([assignmentId]) => ({
            id: `${student.id}-${assignmentId}`,
            studentId: student.id,
            student: student.name || "Student",
            studentClass: student.class,
            assignmentId,
            title: student.assignmentSubmissionDetails?.[assignmentId]?.title || `Assignment ${assignmentId}`,
            subject: student.assignmentSubmissionDetails?.[assignmentId]?.subject || "",
            submittedOn: student.assignmentSubmissionDates?.[assignmentId] || "",
            answer: student.assignmentAnswers?.[assignmentId] || "",
            grade: student.assignmentGrades?.[assignmentId] || null,
          }))
      );
      setSubmissions(classSubmissions);
    } catch {
      setLoadError("Unable to load enrolled students' submissions. Please check the saved student records.");
    }
  }, [navigate]);

  if (!teacher) return null;

  const handleGrade = (submission) => {
    if (!gradeMsg.trim()) {
      setGradeError("Enter a grade or feedback before submitting.");
      return;
    }

    try {
      const allStudents = JSON.parse(localStorage.getItem("all_students") || "[]");
      if (!Array.isArray(allStudents)) {
        throw new Error("Student records must be a list.");
      }
      const student = allStudents.find((record) => record.id === submission.studentId);
      if (!student || String(student.class || "").match(/\d+/)?.[0] !== String(teacher.class || "").match(/\d+/)?.[0]) {
        throw new Error("The enrolled student could not be found in your assigned class.");
      }

      const grade = {
        feedback: gradeMsg.trim(),
        gradedAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        gradedBy: teacher.id,
      };
      const updatedStudent = {
        ...student,
        assignmentGrades: {
          ...(student.assignmentGrades || {}),
          [submission.assignmentId]: grade,
        },
      };
      localStorage.setItem("all_students", JSON.stringify(
        allStudents.map((record) => record.id === updatedStudent.id ? updatedStudent : record)
      ));

      const currentStudent = JSON.parse(localStorage.getItem("current_user") || "null");
      if (currentStudent?.id === updatedStudent.id) {
        localStorage.setItem("current_user", JSON.stringify(updatedStudent));
      }

      setSubmissions((previous) => previous.map((item) =>
        item.id === submission.id ? { ...item, grade } : item
      ));
      setSelectedSub(null);
      setGradeMsg("");
      setGradeError("");
    } catch (error) {
      setGradeError(error.message || "Unable to save the grade. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif", background: "#F8FAFC", color: "#0F172A", width: "100%" }}>
      <TeacherSidebar />

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, marginLeft: "250px", display: "flex", flexDirection: "column" }}>
        <header style={{ height: "64px", background: "#fff", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700 }}>
            Class {String(teacher.class || "").match(/\d+/)?.[0] || "—"} Assignments & Grading
          </h2>
        </header>

        <div style={{ padding: "30px 32px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {loadError ? (
            <div role="alert" style={{ background: "#FEF2F2", padding: "24px", borderRadius: "12px", color: "#B91C1C" }}>
              {loadError}
            </div>
          ) : submissions.length === 0 ? (
            <div style={{ background: "#fff", padding: "40px", textAlign: "center", borderRadius: "16px", border: "1px solid #E2E8F0", color: "#64748B" }}>
              No assignments have been submitted by enrolled students in your class yet.
            </div>
          ) : (
            submissions.map((sub) => (
              <div key={sub.id} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>{sub.title}</h3>
                  <p style={{ fontSize: "12.5px", color: "#64748B", marginBottom: "6px" }}>
                    {sub.subject && `${sub.subject} · `}Submitted by: <strong>{sub.student}</strong> (Class {sub.studentClass})
                  </p>
                  <span style={{ fontSize: "11px", background: sub.grade ? "#DBEAFE" : "#FEF3C7", color: sub.grade ? "#1D4ED8" : "#D97706", padding: "3px 8px", borderRadius: "6px", fontWeight: 700 }}>
                    {sub.grade ? "Graded" : "Pending Review"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedSub(sub);
                    setGradeMsg(sub.grade?.feedback || "");
                    setGradeError("");
                  }}
                  style={{ background: "#059669", color: "#fff", border: "none", padding: "9px 20px", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}
                >
                  {sub.grade ? "View / Update Grade ›" : "Review & Grade ›"}
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
              <p style={{ marginTop: "4px", color: "#334155", whiteSpace: "pre-wrap" }}>{selectedSub.answer || "No answer text was saved for this submission."}</p>
            </div>
            {selectedSub.submittedOn && <p style={{ fontSize: 12, color: "#64748B", marginBottom: 12 }}>Submitted: {selectedSub.submittedOn}</p>}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "6px" }}>Grade / Feedback *</label>
              <textarea
                value={gradeMsg}
                onChange={(e) => {
                  setGradeMsg(e.target.value);
                  setGradeError("");
                }}
                placeholder="Type grade (e.g. A+) or feedback notes..."
                style={{ width: "100%", height: "90px", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px" }}
              />
              {gradeError && <p role="alert" style={{ color: "#B91C1C", fontSize: 12, marginTop: 6 }}>{gradeError}</p>}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setSelectedSub(null)} style={{ background: "#F1F5F9", border: "1px solid #CBD5E1", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
              <button onClick={() => handleGrade(selectedSub)} style={{ background: "#059669", color: "#fff", border: "none", padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 700 }}>Save Grade ✓</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}