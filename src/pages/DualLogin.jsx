import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function DualLogin() {
  const navigate = useNavigate();

  // Student State
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [showStudentPass, setShowStudentPass] = useState(false);
  const [studentError, setStudentError] = useState("");

  // Teacher State
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [showTeacherPass, setShowTeacherPass] = useState(false);
  const [teacherError, setTeacherError] = useState("");

  // Student Login Handler
  const handleStudentLogin = (e) => {
    e.preventDefault();
    setStudentError("");

    if (studentPassword.length < 8) {
      setStudentError("your password is too small so try change it");
      return;
    }

    const allStudents = JSON.parse(localStorage.getItem("all_students") || "[]");
    const matchedUser = allStudents.find(
      (s) => s.email.trim().toLowerCase() === studentEmail.trim().toLowerCase() && s.password === studentPassword
    );

    if (matchedUser) {
      localStorage.setItem("current_user", JSON.stringify(matchedUser));
      localStorage.setItem("studentLoggedIn", "true");
      navigate("/student-dashboard");
    } else {
      setStudentError("Invalid student email or password.");
    }
  };

  // Teacher Login Handler
  const handleTeacherLogin = (e) => {
    e.preventDefault();
    setTeacherError("");

    if (teacherPassword.length < 8) {
      setTeacherError("your password is too small so try change it");
      return;
    }

    const allTeachers = JSON.parse(localStorage.getItem("all_teachers") || "[]");
    const matchedTeacher = allTeachers.find(
      (t) => t.email.trim().toLowerCase() === teacherEmail.trim().toLowerCase() && t.password === teacherPassword
    );

    if (matchedTeacher) {
      localStorage.setItem("current_teacher", JSON.stringify(matchedTeacher));
      localStorage.setItem("teacherLoggedIn", "true");
      navigate("/teacher-dashboard");
    } else {
      setTeacherError("Invalid teacher email or password.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#F8FAFC", fontFamily: "sans-serif", padding: "40px 20px", alignItems: "center" }}>
      
      {/* Header Branding */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#0F172A", marginBottom: "6px" }}>Digital Learning Platform</h1>
        <p style={{ fontSize: "14px", color: "#64748B" }}>Select your portal to sign in</p>
      </div>

      {/* Side-by-Side Container */}
      <div style={{ display: "flex", gap: "30px", width: "100%", maxWidth: "900px", flexWrap: "wrap", justifyContent: "center" }}>
        
        {/* Student Login Card */}
        <div style={{ background: "#FFFFFF", padding: "32px", borderRadius: "16px", border: "1px solid #E2E8F0", flex: "1", minWidth: "320px", maxWidth: "420px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{ fontSize: "32px" }}>🎓</div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0F172A" }}>Student Portal</h2>
            <p style={{ fontSize: "12px", color: "#64748B" }}>Access your classes and materials</p>
          </div>

          {studentError && <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "10px", borderRadius: "8px", fontSize: "12px", marginBottom: "14px" }}>{studentError}</div>}

          <form onSubmit={handleStudentLogin} autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Email</label>
              <input 
                type="email" 
                value={studentEmail} 
                onChange={(e) => setStudentEmail(e.target.value)} 
                placeholder="student@example.com" 
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }} 
                required 
              />
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Password</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type={showStudentPass ? "text" : "password"}
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: "100%", padding: "10px", paddingRight: "40px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowStudentPass(!showStudentPass)}
                  style={{ position: "absolute", right: "10px", background: "none", border: "none", cursor: "pointer", fontSize: "15px", padding: "0" }}
                >
                  {showStudentPass ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
            </div>

            <button type="submit" style={{ marginTop: "10px", width: "100%", background: "#1E60F8", color: "#FFFFFF", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
              Sign In as Student
            </button>
          </form>

          <p style={{ fontSize: "12px", color: "#64748B", textAlign: "center", marginTop: "18px" }}>
            Don't have an account? <Link to="/student-register" style={{ color: "#1E60F8", fontWeight: 600 }}>Register here</Link>
          </p>
        </div>

        {/* Teacher Login Card */}
        <div style={{ background: "#FFFFFF", padding: "32px", borderRadius: "16px", border: "1px solid #E2E8F0", flex: "1", minWidth: "320px", maxWidth: "420px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{ fontSize: "32px" }}>👩‍🏫</div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0F172A" }}>Teacher Portal</h2>
            <p style={{ fontSize: "12px", color: "#64748B" }}>Manage classes and review materials</p>
          </div>

          {teacherError && <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "10px", borderRadius: "8px", fontSize: "12px", marginBottom: "14px" }}>{teacherError}</div>}

          <form onSubmit={handleTeacherLogin} autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Email</label>
              <input 
                type="email" 
                value={teacherEmail} 
                onChange={(e) => setTeacherEmail(e.target.value)} 
                placeholder="teacher@example.com" 
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }} 
                required 
              />
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Password</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type={showTeacherPass ? "text" : "password"}
                  value={teacherPassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: "100%", padding: "10px", paddingRight: "40px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowTeacherPass(!showTeacherPass)}
                  style={{ position: "absolute", right: "10px", background: "none", border: "none", cursor: "pointer", fontSize: "15px", padding: "0" }}
                >
                  {showTeacherPass ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
            </div>

            <button type="submit" style={{ marginTop: "10px", width: "100%", background: "#059669", color: "#FFFFFF", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
              Sign In as Teacher
            </button>
          </form>

          <p style={{ fontSize: "12px", color: "#64748B", textAlign: "center", marginTop: "18px" }}>
            Don't have an account? <Link to="/teacher-register" style={{ color: "#059669", fontWeight: 600 }}>Register here</Link>
          </p>
        </div>

      </div>
    </div>
  );
}