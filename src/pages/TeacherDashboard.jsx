import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TeacherSidebar from "../components/TeacherSidebar";

const loadTeacherDashboardData = () => {
  const rawTeacher = localStorage.getItem("current_teacher");
  if (!rawTeacher) {
    return { teacher: null, stats: null, error: "" };
  }

  let teacher;
  try {
    teacher = JSON.parse(rawTeacher);
    if (!teacher || typeof teacher !== "object" || Array.isArray(teacher)) {
      throw new Error("Invalid teacher account.");
    }
  } catch {
    return {
      teacher: null,
      stats: null,
      error: "Unable to load your teacher account. Please sign in again.",
    };
  }

  try {
    const assignedClass = String(teacher.class || "").match(/\d+/)?.[0];
    const allStudents = JSON.parse(localStorage.getItem("all_students") || "[]");
    if (!Array.isArray(allStudents)) {
      throw new Error("Student records must be a list.");
    }

    const enrolledStudents = assignedClass
      ? allStudents.filter((student) =>
          student && String(student.class || "").match(/\d+/)?.[0] === assignedClass
        )
      : [];
    const pendingAssignments = enrolledStudents.reduce((count, student) =>
      count + Object.entries(student.assignmentStatuses || {}).filter(
        ([assignmentId, status]) =>
          assignmentId.startsWith(`${assignedClass}-`) &&
          status === "Submitted" &&
          !student.assignmentGrades?.[assignmentId]
      ).length, 0
    );
    const quizScores = enrolledStudents.flatMap((student) =>
      Object.values(student.quizSubmissions || {})
        .map((submission) => Number(submission?.score))
        .filter((score) => Number.isFinite(score) && score >= 0 && score <= 100)
    );
    const averageQuizScore = quizScores.length
      ? Math.round(quizScores.reduce((total, score) => total + score, 0) / quizScores.length)
      : null;

    return {
      teacher,
      stats: {
        enrolledStudents: enrolledStudents.length,
        pendingAssignments,
        averageQuizScore,
      },
      error: "",
    };
  } catch {
    return {
      teacher,
      stats: null,
      error: "Unable to load dashboard data. Please check the saved student records.",
    };
  }
};

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [dashboardData] = useState(loadTeacherDashboardData);
  const { teacher, stats: dashboardStats, error: dashboardError } = dashboardData;

  useEffect(() => {
    const rawTeacher = localStorage.getItem("current_teacher");
    if (!rawTeacher || !teacher) {
      navigate("/teacher-login");
    }
  }, [navigate, teacher]);

  if (!teacher) return null;

  const handleLogout = () => {
    localStorage.removeItem("current_teacher");
    localStorage.removeItem("current_user");
    localStorage.removeItem("teacherLoggedIn");
    navigate("/teacher-login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif", background: "#F8FAFC", color: "#0F172A", width: "100%" }}>
      <style>{`
        .teacher-dashboard-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
        .teacher-dashboard-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
        @media (max-width: 1000px) {
          .teacher-dashboard-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          .teacher-dashboard-stats, .teacher-dashboard-actions { grid-template-columns: 1fr; }
        }
      `}</style>
      <TeacherSidebar onLogout={handleLogout} />

      {/* MAIN CONTAINER */}
      <div style={{ flex: 1, marginLeft: "250px", display: "flex", flexDirection: "column" }}>
        <header style={{ height: "64px", background: "#fff", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 100 }}>
          <div>
            <h2 style={{ fontSize: "15px", fontWeight: 700 }}>Digital Learning Platform</h2>
            <p style={{ fontSize: "11.5px", color: "#64748B" }}>Educator Control Center</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button onClick={() => navigate("/announcements")} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bell size={18} color="#475569" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => navigate("/settings?portal=teacher")} aria-label="Open teacher settings" style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", border: 0, background: "transparent", textAlign: "left" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#A7F3D0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>👩‍🏫</div>
              <div>
                <strong style={{ fontSize: "13px", display: "block" }}>{teacher.name}</strong>
                <span style={{ fontSize: "11px", color: "#059669", fontWeight: 600 }}>Class {String(teacher.class || "").match(/\d+/)?.[0] || "—"} Educator</span>
              </div>
            </button>
          </div>
        </header>

        <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: "24px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          {/* Welcome Banner */}
          <div style={{ background: "linear-gradient(135deg, #059669 0%, #10B981 100%)", borderRadius: "16px", padding: "24px 28px", color: "#fff", boxShadow: "0 10px 25px rgba(5, 150, 105, 0.2)" }}>
            <h1 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "4px" }}>👋 Welcome back, {teacher.name}!</h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.9)", marginBottom: "20px" }}>Ready to inspire and empower your students today?</p>
            <div className="teacher-dashboard-stats">
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
                <div style={{ fontSize: "13px", fontWeight: 700 }}>Class {String(teacher.class || "").match(/\d+/)?.[0] || "—"}</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.15)", padding: "10px 14px", borderRadius: "10px" }}>
                <small style={{ fontSize: "10px", textTransform: "uppercase", opacity: 0.8 }}>Status</small>
                <div style={{ fontSize: "13px", fontWeight: 700 }}>Active Faculty</div>
              </div>
            </div>
          </div>

          {dashboardError && (
            <div role="alert" style={{ padding: 14, borderRadius: 10, background: "#FEF2F2", border: "1px solid #FECACA", color: "#B91C1C" }}>
              {dashboardError}
            </div>
          )}

          {/* Metrics */}
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>Class Overview</h3>
            <div className="teacher-dashboard-stats">
              <div style={{ background: "#fff", border: "1px solid #E2E8F0", padding: "18px", borderRadius: "14px" }}>
                <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>Enrolled Students</span>
                <div style={{ fontSize: "22px", fontWeight: 800, marginTop: "4px" }}>{dashboardStats?.enrolledStudents ?? "—"}</div>
                <span style={{ fontSize: "11px", color: "#059669", fontWeight: 600 }}>Registered in Class {String(teacher.class || "").match(/\d+/)?.[0] || "—"}</span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E2E8F0", padding: "18px", borderRadius: "14px" }}>
                <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>Assignments Pending Review</span>
                <div style={{ fontSize: "22px", fontWeight: 800, marginTop: "4px" }}>{dashboardStats?.pendingAssignments ?? "—"}</div>
                <button type="button" style={{ fontSize: "11px", color: "#D97706", fontWeight: 600, cursor: "pointer", border: 0, background: "none", padding: 0 }} onClick={() => navigate("/teacher-assignments")}>Needs Grading →</button>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E2E8F0", padding: "18px", borderRadius: "14px" }}>
                <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>Live Classes Today</span>
                <div style={{ fontSize: "22px", fontWeight: 800, marginTop: "4px" }}>0</div>
                <button type="button" style={{ fontSize: "11px", color: "#2563EB", fontWeight: 600, cursor: "pointer", border: 0, background: "none", padding: 0 }} onClick={() => navigate("/live-classes")}>No sessions scheduled · Open Studio →</button>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E2E8F0", padding: "18px", borderRadius: "14px" }}>
                <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>Average Quiz Score</span>
                <div style={{ fontSize: "22px", fontWeight: 800, marginTop: "4px" }}>{dashboardStats?.averageQuizScore == null ? "—" : `${dashboardStats.averageQuizScore}%`}</div>
                <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 600 }}>{dashboardStats?.averageQuizScore == null ? "No quiz results yet" : "Class Performance"}</span>
              </div>
            </div>
          </div>

          {/* Elevated Action Buttons */}
          <div className="teacher-dashboard-actions">
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", padding: "22px", borderRadius: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>Upload Study Notes & Material</h3>
                <p style={{ fontSize: "12.5px", color: "#64748B", marginBottom: "16px" }}>Publish notes, revision sheets, or chapter materials for your assigned class.</p>
              </div>
              <button
                onClick={() => navigate("/teacher-notes")}
                style={{ background: "#059669", color: "#fff", border: "none", padding: "11px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", boxShadow: "0 4px 12px rgba(5,150,105,0.3)" }}
              >
                + Manage / Upload Material
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

    </div>
  );
}