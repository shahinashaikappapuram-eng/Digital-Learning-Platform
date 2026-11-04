import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { findAccountByCredentials, readAccountRoster } from "../utils/accountAuth";

export default function StudentLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  // Student State - explicitly initialized as empty strings
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [showStudentPass, setShowStudentPass] = useState(false);
  const [studentError, setStudentError] = useState("");

  // Teacher State - explicitly initialized as empty strings
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

    let matchedUser;
    try {
      matchedUser = findAccountByCredentials(
        readAccountRoster("all_students", "student"),
        studentEmail,
        studentPassword
      );
    } catch (error) {
      setStudentError(error.message);
      return;
    }

    if (matchedUser) {
      localStorage.setItem("current_user", JSON.stringify(matchedUser));
      localStorage.setItem("studentLoggedIn", "true");
      navigate("/student-dashboard");
    } else {
      setStudentError("Invalid student ID/email or password.");
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

    let matchedTeacher;
    try {
      matchedTeacher = findAccountByCredentials(
        readAccountRoster("all_teachers", "teacher"),
        teacherEmail,
        teacherPassword
      );
    } catch (error) {
      setTeacherError(error.message);
      return;
    }

    if (matchedTeacher) {
      localStorage.setItem("current_teacher", JSON.stringify(matchedTeacher));
      localStorage.setItem("teacherLoggedIn", "true");
      navigate("/teacher-dashboard");
    } else {
      setTeacherError("Invalid teacher ID/email or password.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#F8FAFC", fontFamily: "sans-serif", padding: "40px 20px", alignItems: "center", justifyContent: "center" }}>
      
      {/* Header Branding */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <div style={{ fontSize: "36px", marginBottom: "8px" }}>🎓</div>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", marginBottom: "4px" }}>Digital Learning Platform</h1>
        <p style={{ fontSize: "13.5px", color: "#64748B" }}>Select your portal to sign in</p>
        {location.state?.registrationMessage && (
          <div role="status" style={{ maxWidth: 560, margin: "14px auto 0", background: "#DCFCE7", color: "#166534", border: "1px solid #86EFAC", padding: "10px 14px", borderRadius: 8, fontSize: 13 }}>
            {location.state.registrationMessage}
          </div>
        )}
      </div>

      {/* Side-by-Side Container */}
      <div style={{ display: "flex", gap: "30px", width: "100%", maxWidth: "900px", flexWrap: "wrap", justifyContent: "center" }}>
        
        {/* Student Login Card */}
        <div style={{ background: "#FFFFFF", padding: "32px", borderRadius: "16px", border: "1px solid #E2E8F0", flex: "1", minWidth: "320px", maxWidth: "420px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0F172A" }}>Student Portal</h2>
            <p style={{ fontSize: "12px", color: "#64748B" }}>Access your classes and materials</p>
          </div>

          {studentError && <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "10px", borderRadius: "8px", fontSize: "12px", marginBottom: "14px", lineHeight: "1.4" }}>{studentError}</div>}

          <form onSubmit={handleStudentLogin} autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Student ID or Email</label>
              <input 
                type="text"
                value={studentEmail} 
                onChange={(e) => setStudentEmail(e.target.value)} 
                placeholder="Student ID or email"
                autoComplete="off"
                name="unique_student_email_field"
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
                  autoComplete="new-password"
                  name="unique_student_password_field"
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
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0F172A" }}>Teacher Portal</h2>
            <p style={{ fontSize: "12px", color: "#64748B" }}>Manage classes and review materials</p>
          </div>

          {teacherError && <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "10px", borderRadius: "8px", fontSize: "12px", marginBottom: "14px", lineHeight: "1.4" }}>{teacherError}</div>}

          <form onSubmit={handleTeacherLogin} autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Teacher ID or Email</label>
              <input 
                type="text"
                value={teacherEmail} 
                onChange={(e) => setTeacherEmail(e.target.value)} 
                placeholder="Teacher ID or email"
                autoComplete="off"
                name="unique_teacher_email_field"
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
                  autoComplete="new-password"
                  name="unique_teacher_password_field"
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

          {/* Fixed Register Link pointing to teacher-register */}
          <p style={{ fontSize: "12px", color: "#64748B", textAlign: "center", marginTop: "18px" }}>
            Don't have an account? <Link to="/teacher-register" style={{ color: "#059669", fontWeight: 600 }}>Register here</Link>
          </p>
        </div>

      </div>
    </div>
  );
}