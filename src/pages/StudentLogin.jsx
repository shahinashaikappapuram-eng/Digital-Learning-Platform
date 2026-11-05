import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { findAccountByCredentials, readAccountRoster } from "../utils/accountAuth";

const isValidEmail = (value) =>
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value.trim());

const isValidAccountId = (value, prefix) =>
  new RegExp(`^${prefix}-[A-Za-z0-9-]+$`, "i").test(value.trim());

const getIdentifierError = (value, accountType, prefix) => {
  const identifier = value.trim();
  if (!identifier) return `${accountType} ID or email is required.`;
  if (/^\d+$/.test(identifier)) return "Enter the correct name";
  if (!isValidEmail(identifier) && !isValidAccountId(identifier, prefix)) {
    return `Enter a valid ${accountType} ID or email.`;
  }
  return "";
};

export default function StudentLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  // Student State - explicitly initialized as empty strings
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [showStudentPass, setShowStudentPass] = useState(false);
  const [studentError, setStudentError] = useState("");
  const [studentIdentifierError, setStudentIdentifierError] = useState("");
  const [studentPasswordError, setStudentPasswordError] = useState("");

  // Teacher State - explicitly initialized as empty strings
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [showTeacherPass, setShowTeacherPass] = useState(false);
  const [teacherError, setTeacherError] = useState("");
  const [teacherIdentifierError, setTeacherIdentifierError] = useState("");
  const [teacherPasswordError, setTeacherPasswordError] = useState("");

  // Student Login Handler
  const handleStudentLogin = (e) => {
    e.preventDefault();
    setStudentError("");
    const identifierError = getIdentifierError(studentEmail, "student", "STU");
    const passwordError = studentPassword.length < 8
      ? "Password must be at least 8 characters"
      : "";
    setStudentIdentifierError(identifierError);
    setStudentPasswordError(passwordError);

    if (identifierError || passwordError) return;

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
      localStorage.removeItem("current_teacher");
      localStorage.removeItem("teacherLoggedIn");
      localStorage.setItem("current_user", JSON.stringify(matchedUser));
      localStorage.setItem("studentLoggedIn", "true");
      navigate("/student-dashboard");
    } else {
      setStudentPasswordError("Incorrect Student ID/email or password. Check your credentials and try again.");
    }
  };

  // Teacher Login Handler
  const handleTeacherLogin = (e) => {
    e.preventDefault();
    setTeacherError("");
    const identifierError = getIdentifierError(teacherEmail, "teacher", "TCH");
    const passwordError = teacherPassword.length < 8
      ? "Password must be at least 8 characters"
      : "";
    setTeacherIdentifierError(identifierError);
    setTeacherPasswordError(passwordError);

    if (identifierError || passwordError) return;

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
      localStorage.removeItem("current_user");
      localStorage.removeItem("studentLoggedIn");
      localStorage.setItem("current_teacher", JSON.stringify(matchedTeacher));
      localStorage.setItem("teacherLoggedIn", "true");
      navigate("/teacher-dashboard");
    } else {
      setTeacherPasswordError("Incorrect Teacher ID/email or password. Check your credentials and try again.");
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

          {studentError && <div role="alert" style={{ background: "#FEE2E2", color: "#DC2626", padding: "10px", borderRadius: "8px", fontSize: "12px", marginBottom: "14px", lineHeight: "1.4" }}>{studentError}</div>}

          <form onSubmit={handleStudentLogin} autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Student ID or Email</label>
              <input 
                type="text"
                value={studentEmail} 
                onChange={(e) => {
                  const value = e.target.value;
                  setStudentEmail(value);
                  setStudentError("");
                  setStudentIdentifierError(getIdentifierError(value, "student", "STU"));
                }}
                placeholder="Student ID or email"
                autoComplete="off"
                name="unique_student_email_field"
                aria-invalid={Boolean(studentIdentifierError)}
                aria-describedby={studentIdentifierError ? "student-identifier-error" : undefined}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: studentIdentifierError ? "1px solid #DC2626" : "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }} 
                required 
              />
              {studentIdentifierError && <span id="student-identifier-error" role="alert" style={{ color: "#DC2626", fontSize: "11px", marginTop: "3px", display: "block" }}>{studentIdentifierError}</span>}
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Password</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type={showStudentPass ? "text" : "password"}
                  value={studentPassword}
                  onChange={(e) => {
                    const value = e.target.value;
                    setStudentPassword(value);
                    setStudentError("");
                    setStudentPasswordError(value && value.length < 8 ? "Password must be at least 8 characters" : "");
                  }}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  name="unique_student_password_field"
                  aria-invalid={Boolean(studentPasswordError)}
                  aria-describedby={studentPasswordError ? "student-password-error" : undefined}
                  style={{ width: "100%", padding: "10px", paddingRight: "40px", borderRadius: "8px", border: studentPasswordError ? "1px solid #DC2626" : "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
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
              {studentPasswordError && <span id="student-password-error" role="alert" style={{ color: "#DC2626", fontSize: "11px", marginTop: "3px", display: "block" }}>{studentPasswordError}</span>}
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

          {teacherError && <div role="alert" style={{ background: "#FEE2E2", color: "#DC2626", padding: "10px", borderRadius: "8px", fontSize: "12px", marginBottom: "14px", lineHeight: "1.4" }}>{teacherError}</div>}

          <form onSubmit={handleTeacherLogin} autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Teacher ID or Email</label>
              <input 
                type="text"
                value={teacherEmail} 
                onChange={(e) => {
                  const value = e.target.value;
                  setTeacherEmail(value);
                  setTeacherError("");
                  setTeacherIdentifierError(getIdentifierError(value, "teacher", "TCH"));
                }}
                placeholder="Teacher ID or email"
                autoComplete="off"
                name="unique_teacher_email_field"
                aria-invalid={Boolean(teacherIdentifierError)}
                aria-describedby={teacherIdentifierError ? "teacher-identifier-error" : undefined}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: teacherIdentifierError ? "1px solid #DC2626" : "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }} 
                required 
              />
              {teacherIdentifierError && <span id="teacher-identifier-error" role="alert" style={{ color: "#DC2626", fontSize: "11px", marginTop: "3px", display: "block" }}>{teacherIdentifierError}</span>}
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Password</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type={showTeacherPass ? "text" : "password"}
                  value={teacherPassword}
                  onChange={(e) => {
                    const value = e.target.value;
                    setTeacherPassword(value);
                    setTeacherError("");
                    setTeacherPasswordError(value && value.length < 8 ? "Password must be at least 8 characters" : "");
                  }}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  name="unique_teacher_password_field"
                  aria-invalid={Boolean(teacherPasswordError)}
                  aria-describedby={teacherPasswordError ? "teacher-password-error" : undefined}
                  style={{ width: "100%", padding: "10px", paddingRight: "40px", borderRadius: "8px", border: teacherPasswordError ? "1px solid #DC2626" : "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
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
              {teacherPasswordError && <span id="teacher-password-error" role="alert" style={{ color: "#DC2626", fontSize: "11px", marginTop: "3px", display: "block" }}>{teacherPasswordError}</span>}
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