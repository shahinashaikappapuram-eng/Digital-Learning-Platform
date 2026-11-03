import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function StudentRegister() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [studentClass, setStudentClass] = useState("");
  const [schoolType, setSchoolType] = useState("Govt High School");
  const [customSchool, setCustomSchool] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);

    if (value && !/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(value.trim())) {
      setNameError("Enter the correct name");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (val && !emailRegex.test(val)) {
      setEmailError("Enter the correct email");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (val && val.length < 8) {
      setPassError("Password must be at least 8 characters");
    } else {
      setPassError("");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setGeneralError("");

    const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    let isValid = true;

    if (!nameRegex.test(fullName.trim())) {
      setNameError("Enter the correct name");
      isValid = false;
    }
    if (!emailRegex.test(email.trim())) {
      setEmailError("Enter the correct email");
      isValid = false;
    }
    if (password.length < 8) {
      setPassError("Password must be at least 8 characters");
      isValid = false;
    }
    if (!studentClass) {
      setGeneralError("Please select your class.");
      isValid = false;
    }

    if (!isValid) return; // Errors unte ikkadike aagipothundi

    const allStudents = JSON.parse(localStorage.getItem("all_students") || "[]");
    const existingUser = allStudents.find(
      (s) => s.email.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (existingUser) {
      setGeneralError("Account already exists! Please login to open the dashboard.");
      return;
    }

    const finalSchool = schoolType === "Other" ? (customSchool.trim() || "Private School") : schoolType;

    const newUser = {
      id: `STU-${Date.now().toString().slice(-4)}`,
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      class: studentClass,
      school: finalSchool,
      overallProgress: 0,
      coursesCompleted: "0/7",
      lessonsCompleted: "0/35",
      quizScore: "0%",
      studyStreak: 1,
      certificatesCount: 0,
      courseProgressMap: { math: 0, science: 0, english: 0, hindi: 0, telugu: 0, social: 0, computer: 0 },
      recentActivities: []
    };

    allStudents.push(newUser);
    localStorage.setItem("all_students", JSON.stringify(allStudents));
    localStorage.setItem("current_user", JSON.stringify(newUser));
    localStorage.setItem("studentLoggedIn", "true");

    navigate("/student-login");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#F8FAFC", fontFamily: "sans-serif", padding: "20px" }}>
      <div style={{ background: "#FFFFFF", padding: "32px", borderRadius: "16px", border: "1px solid #E2E8F0", width: "100%", maxWidth: "440px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "32px" }}>🎓</div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0F172A" }}>Create Student Account</h2>
          <p style={{ fontSize: "13px", color: "#64748B" }}>Digital Learning Platform</p>
        </div>

        {generalError && (
          <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "12px", borderRadius: "8px", fontSize: "12.5px", marginBottom: "14px", lineHeight: "1.4", fontWeight: 500 }}>
            {generalError}{" "}
            {generalError.includes("Account already exists") && (
              <Link to="/student-login" style={{ color: "#1E60F8", fontWeight: 700, textDecoration: "underline" }}>
                Login here
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleRegister} noValidate autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={handleNameChange}
              placeholder="e.g. Rahul Sharma"
              autoComplete="off"
              name="student_fullname"
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: nameError ? "1px solid #DC2626" : "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
              required
            />
            {nameError && <span style={{ color: "#DC2626", fontSize: "11px", marginTop: "3px", display: "block" }}>{nameError}</span>}
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Email / Student ID</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="student@example.com"
              autoComplete="off"
              name="student_email_id"
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: emailError ? "1px solid #DC2626" : "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
              required
            />
            {emailError && <span style={{ color: "#DC2626", fontSize: "11px", marginTop: "3px", display: "block" }}>{emailError}</span>}
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Password</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="At least 8 chars (letters & numbers)"
                autoComplete="new-password"
                name="custom_secure_pass_field"
                data-lpignore="true"
                style={{ width: "100%", padding: "10px", paddingRight: "40px", borderRadius: "8px", border: passError ? "1px solid #DC2626" : "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
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
            {passError && <span style={{ color: "#DC2626", fontSize: "11px", marginTop: "3px", display: "block" }}>{passError}</span>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Class</label>
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
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
            Register
          </button>
        </form>

        <p style={{ fontSize: "12px", color: "#64748B", textAlign: "center", marginTop: "18px" }}>
          Already registered? <Link to="/student-login" style={{ color: "#1E60F8", fontWeight: 600 }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}