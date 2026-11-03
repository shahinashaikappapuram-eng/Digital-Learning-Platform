import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function TeacherRegister() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [teacherClass, setTeacherClass] = useState(""); // Blank default option
  const [schoolType, setSchoolType] = useState("Govt High School");
  const [customSchool, setCustomSchool] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (!teacherClass) {
      setError("Please select your class assignment.");
      return;
    }

    // Password length validation with exact error message requested
    if (password.length < 8) {
      setError("your password is too small so try change it");
      return;
    }

    const allTeachers = JSON.parse(localStorage.getItem("all_teachers") || "[]");

    // Check if teacher account already exists
    const existingUser = allTeachers.find(
      (t) => t.email.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (existingUser) {
      setError("Teacher account already exists! Please login.");
      return;
    }

    const finalSchool = schoolType === "Other" ? (customSchool.trim() || "Private School") : schoolType;

    const newTeacher = {
      id: `TCH-${Date.now().toString().slice(-4)}`,
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      class: teacherClass,
      school: finalSchool,
      role: "Teacher"
    };

    allTeachers.push(newTeacher);
    localStorage.setItem("all_teachers", JSON.stringify(allTeachers));
    localStorage.setItem("current_teacher", JSON.stringify(newTeacher));
    localStorage.setItem("teacherLoggedIn", "true");

    navigate("/teacher-login");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#F8FAFC", fontFamily: "sans-serif", padding: "20px" }}>
      <div style={{ background: "#FFFFFF", padding: "32px", borderRadius: "16px", border: "1px solid #E2E8F0", width: "100%", maxWidth: "440px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "32px" }}>👩‍🏫</div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0F172A" }}>Create Teacher Account</h2>
          <p style={{ fontSize: "13px", color: "#64748B" }}>Digital Learning Platform</p>
        </div>

        {error && (
          <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "12px", borderRadius: "8px", fontSize: "12.5px", marginBottom: "14px", lineHeight: "1.4", fontWeight: 500 }}>
            {error}{" "}
            {error.includes("already exists") && (
              <Link to="/teacher-login" style={{ color: "#1E60F8", fontWeight: 700, textDecoration: "underline" }}>
                Login here
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleRegister} autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Priya Sharma"
              autoComplete="off"
              name="teacher_fullname"
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Email / Teacher ID</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teacher@example.com"
              autoComplete="off"
              name="teacher_email_id"
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Password</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                name="teacher_secure_pass"
                data-lpignore="true"
                style={{ width: "100%", padding: "10px", paddingRight: "40px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "10px", background: "none", border: "none", cursor: "pointer", fontSize: "15px", padding: "0" }}
              >
                {showPassword ? "👁️‍🗨️" : "👁️"}
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Class Assigned</label>
              <select
                value={teacherClass}
                onChange={(e) => setTeacherClass(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", background: "#FFF", boxSizing: "border-box" }}
                required
              >
                <option value="" disabled>-- Select Class --</option>
                <option value="6">Class 6th</option>
                <option value="7">Class 7th</option>
                <option value="8">Class 8th</option>
                <option value="9">Class 9th</option>
                <option value="10">Class 10th</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>School Type</label>
              <select
                value={schoolType}
                onChange={(e) => setSchoolType(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", background: "#FFF", boxSizing: "border-box" }}
              >
                <option value="Govt High School">Govt High School</option>
                <option value="Private School">Private School</option>
                <option value="Other">Other School</option>
              </select>
            </div>
          </div>

          {schoolType === "Other" && (
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Enter School Name</label>
              <input
                type="text"
                value={customSchool}
                onChange={(e) => setCustomSchool(e.target.value)}
                placeholder="e.g. St. Xavier's Public School"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                required
              />
            </div>
          )}

          <button type="submit" style={{ marginTop: "10px", width: "100%", background: "#1E60F8", color: "#FFFFFF", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
            Register as Teacher
          </button>
        </form>

        <p style={{ fontSize: "12px", color: "#64748B", textAlign: "center", marginTop: "18px" }}>
          Already registered? <Link to="/teacher-login" style={{ color: "#1E60F8", fontWeight: 600 }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}