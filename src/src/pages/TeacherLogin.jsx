import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function TeacherLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Password length validation with exact error message requested
    if (password.length < 8) {
      setError("your password is too small so try change it");
      return;
    }

    const allTeachers = JSON.parse(
      localStorage.getItem("all_teachers") || "[]"
    );

    const matchedTeacher = allTeachers.find(
      (t) => t.email.trim().toLowerCase() === email.trim().toLowerCase() && t.password === password
    );

    if (matchedTeacher) {
      localStorage.setItem("current_teacher", JSON.stringify(matchedTeacher));
      localStorage.setItem("teacherLoggedIn", "true");
      navigate("/teacher-dashboard"); // Adjust route to your teacher dashboard if needed
    } else {
      setError("Invalid email or password. Please try again or register.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#F8FAFC", fontFamily: "sans-serif" }}>
      <div style={{ background: "#FFFFFF", padding: "32px", borderRadius: "16px", border: "1px solid #E2E8F0", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "32px" }}>👩‍🏫</div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0F172A" }}>Teacher Login</h2>
          <p style={{ fontSize: "13px", color: "#64748B" }}>Digital Learning Platform</p>
        </div>

        {error && <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "10px", borderRadius: "8px", fontSize: "12px", marginBottom: "14px", lineHeight: "1.4" }}>{error}</div>}

        <form onSubmit={handleLogin} autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="teacher@example.com" 
              autoComplete="off"
              name="teacher_login_email"
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
                name="teacher_login_pass"
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

          <button type="submit" style={{ marginTop: "10px", width: "100%", background: "#1E60F8", color: "#FFFFFF", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
            Sign In as Teacher
          </button>
        </form>

        <p style={{ fontSize: "12px", color: "#64748B", textAlign: "center", marginTop: "18px" }}>
          Don't have an account? <Link to="/teacher-register" style={{ color: "#1E60F8", fontWeight: 600 }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}