import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const isValidPhoneNumber = (phone) => {
  return /^\d{10}$/.test(phone);
};

const updatePhoneNumber = (value, setPhone, setPhoneError) => {
  const containsNonDigits = /\D/.test(value);
  const digits = value.replace(/\D/g, "");
  setPhone(digits.slice(0, 10));
  setPhoneError(containsNonDigits || digits.length > 10 ? "Enter the correct number" : "");
};

export default function DualRegister() {
  const navigate = useNavigate();

  // Student State
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [showStudentPass, setShowStudentPass] = useState(false);
  const [studentClass, setStudentClass] = useState("");
  const [studentSchoolType, setStudentSchoolType] = useState("Govt High School");
  const [studentCustomSchool, setStudentCustomSchool] = useState("");
  const [studentError, setStudentError] = useState("");
  const [studentNameError, setStudentNameError] = useState("");
  const [studentEmailError, setStudentEmailError] = useState("");
  const [studentPhoneError, setStudentPhoneError] = useState("");
  const [studentPasswordError, setStudentPasswordError] = useState("");

  // Teacher State
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [showTeacherPass, setShowTeacherPass] = useState(false);
  const [teacherClass, setTeacherClass] = useState("");
  const [teacherSchoolType, setTeacherSchoolType] = useState("Govt High School");
  const [teacherCustomSchool, setTeacherCustomSchool] = useState("");
  const [teacherError, setTeacherError] = useState("");
  const [teacherNameError, setTeacherNameError] = useState("");
  const [teacherEmailError, setTeacherEmailError] = useState("");
  const [teacherPhoneError, setTeacherPhoneError] = useState("");
  const [teacherPasswordError, setTeacherPasswordError] = useState("");

  // Student Registration Handler
  const handleStudentRegister = (e) => {
    e.preventDefault();
    setStudentError("");

    let isValid = true;
    if (!/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(studentName.trim())) {
      setStudentNameError("Enter the correct name");
      isValid = false;
    }
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(studentEmail.trim())) {
      setStudentEmailError("Enter the correct email");
      isValid = false;
    }
    if (!isValidPhoneNumber(studentPhone)) {
      setStudentPhoneError("Enter the correct number (10 digits required)");
      isValid = false;
    }
    if (studentPassword.length < 8) {
      setStudentPasswordError("Password must be at least 8 characters");
      isValid = false;
    }
    if (!isValid) return;

    if (!studentClass) {
      setStudentError("Please select your class.");
      return;
    }

    const allStudents = JSON.parse(localStorage.getItem("all_students") || "[]");
    const existingUser = allStudents.find(
      (s) => s.email.trim().toLowerCase() === studentEmail.trim().toLowerCase()
    );

    if (existingUser) {
      setStudentError("Account already exists! Please login.");
      return;
    }

    const finalSchool = studentSchoolType === "Other" ? (studentCustomSchool.trim() || "Private School") : studentSchoolType;

    const newUser = {
      id: `STU-${Date.now().toString().slice(-4)}`,
      name: studentName.trim(),
      email: studentEmail.trim().toLowerCase(),
      phone: studentPhone.trim(),
      password: studentPassword,
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

  // Teacher Registration Handler
  const handleTeacherRegister = (e) => {
    e.preventDefault();
    setTeacherError("");

    let isValid = true;
    if (!/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(teacherName.trim())) {
      setTeacherNameError("Enter the correct name");
      isValid = false;
    }
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(teacherEmail.trim())) {
      setTeacherEmailError("Enter the correct email");
      isValid = false;
    }
    if (!isValidPhoneNumber(teacherPhone)) {
      setTeacherPhoneError("Enter the correct number (10 digits required)");
      isValid = false;
    }
    if (teacherPassword.length < 8) {
      setTeacherPasswordError("Password must be at least 8 characters");
      isValid = false;
    }
    if (!isValid) return;

    if (!teacherClass) {
      setTeacherError("Please select your class assignment.");
      return;
    }

    const allTeachers = JSON.parse(localStorage.getItem("all_teachers") || "[]");
    const existingTeacher = allTeachers.find(
      (t) => t.email.trim().toLowerCase() === teacherEmail.trim().toLowerCase()
    );

    if (existingTeacher) {
      setTeacherError("Teacher account already exists! Please login.");
      return;
    }

    const finalSchool = teacherSchoolType === "Other" ? (teacherCustomSchool.trim() || "Private School") : teacherSchoolType;

    const newTeacher = {
      id: `TCH-${Date.now().toString().slice(-4)}`,
      name: teacherName.trim(),
      email: teacherEmail.trim().toLowerCase(),
      phone: teacherPhone.trim(),
      password: teacherPassword,
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
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#F8FAFC", fontFamily: "sans-serif", padding: "40px 20px", alignItems: "center", justifyContent: "center" }}>
      
      {/* Header Branding */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <div style={{ fontSize: "36px", marginBottom: "8px" }}>🎓</div>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", marginBottom: "4px" }}>Digital Learning Platform</h1>
        <p style={{ fontSize: "13.5px", color: "#64748B" }}>Select your account type to register</p>
      </div>

      {/* Side-by-Side Container */}
      <div style={{ display: "flex", gap: "30px", width: "100%", maxWidth: "960px", flexWrap: "wrap", justifyContent: "center" }}>
        
        {/* Student Registration Card */}
        <div style={{ background: "#FFFFFF", padding: "32px", borderRadius: "16px", border: "1px solid #E2E8F0", flex: "1", minWidth: "320px", maxWidth: "450px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0F172A" }}>Create Student Account</h2>
            <p style={{ fontSize: "12px", color: "#64748B" }}>Join the student portal</p>
          </div>

          {studentError && <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "10px", borderRadius: "8px", fontSize: "12px", marginBottom: "14px", lineHeight: "1.4" }}>{studentError}</div>}

          <form onSubmit={handleStudentRegister} noValidate autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Full Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => {
                  const value = e.target.value;
                  setStudentName(value);
                  setStudentNameError(value && !/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(value.trim()) ? "Enter the correct name" : "");
                }}
                placeholder="e.g. Rahul Sharma"
                autoComplete="off"
                name="unique_student_reg_name"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: studentNameError ? "1px solid #DC2626" : "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                required
              />
              {studentNameError && <span style={{ color: "#DC2626", fontSize: "11px", marginTop: "3px", display: "block" }}>{studentNameError}</span>}
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Email / Student ID</label>
              <input
                type="email"
                value={studentEmail}
                onChange={(e) => {
                  const value = e.target.value;
                  setStudentEmail(value);
                  setStudentEmailError(value && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value.trim()) ? "Enter the correct email" : "");
                }}
                placeholder="student@example.com"
                autoComplete="off"
                name="unique_student_reg_email"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: studentEmailError ? "1px solid #DC2626" : "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                required
              />
              {studentEmailError && <span style={{ color: "#DC2626", fontSize: "11px", marginTop: "3px", display: "block" }}>{studentEmailError}</span>}
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Phone Number</label>
              <input
                type="tel"
                value={studentPhone}
                onChange={(e) => {
                  updatePhoneNumber(e.target.value, setStudentPhone, setStudentPhoneError);
                }}
                placeholder="Enter 10 digits"
                autoComplete="tel"
                inputMode="numeric"
                maxLength={10}
                pattern="[0-9]{10}"
                title="Enter exactly 10 digits"
                name="unique_student_reg_phone"
                aria-invalid={Boolean(studentPhoneError)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: studentPhoneError ? "1px solid #DC2626" : "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                required
              />
              {studentPhoneError && <span style={{ color: "#DC2626", fontSize: "11px", marginTop: "3px", display: "block" }}>{studentPhoneError}</span>}
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
                    setStudentPasswordError(value && value.length < 8 ? "Password must be at least 8 characters" : "");
                  }}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  name="unique_student_reg_pass"
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
              {studentPasswordError && <span style={{ color: "#DC2626", fontSize: "11px", marginTop: "3px", display: "block" }}>{studentPasswordError}</span>}
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
                  value={studentSchoolType}
                  onChange={(e) => setStudentSchoolType(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", background: "#FFF", boxSizing: "border-box" }}
                >
                  <option value="Govt High School">Govt High School</option>
                  <option value="Private School">Private School</option>
                  <option value="Other">Other School</option>
                </select>
              </div>
            </div>

            {studentSchoolType === "Other" && (
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Enter School Name</label>
                <input
                  type="text"
                  value={studentCustomSchool}
                  onChange={(e) => setStudentCustomSchool(e.target.value)}
                  placeholder="e.g. St. Xavier's Public School"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                  required
                />
              </div>
            )}

            <button type="submit" style={{ marginTop: "10px", width: "100%", background: "#1E60F8", color: "#FFFFFF", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
              Register as Student
            </button>
          </form>

          <p style={{ fontSize: "12px", color: "#64748B", textAlign: "center", marginTop: "18px" }}>
            Already registered? <Link to="/student-login" style={{ color: "#1E60F8", fontWeight: 600 }}>Login here</Link>
          </p>
        </div>

        {/* Teacher Registration Card */}
        <div style={{ background: "#FFFFFF", padding: "32px", borderRadius: "16px", border: "1px solid #E2E8F0", flex: "1", minWidth: "320px", maxWidth: "450px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0F172A" }}>Create Teacher Account</h2>
            <p style={{ fontSize: "12px", color: "#64748B" }}>Join the teacher portal</p>
          </div>

          {teacherError && <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "10px", borderRadius: "8px", fontSize: "12px", marginBottom: "14px", lineHeight: "1.4" }}>{teacherError}</div>}

          <form onSubmit={handleTeacherRegister} noValidate autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Full Name</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => {
                  const value = e.target.value;
                  setTeacherName(value);
                  setTeacherNameError(value && !/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(value.trim()) ? "Enter the correct name" : "");
                }}
                placeholder="e.g. Priya Sharma"
                autoComplete="off"
                name="unique_teacher_reg_name"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: teacherNameError ? "1px solid #DC2626" : "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                required
              />
              {teacherNameError && <span style={{ color: "#DC2626", fontSize: "11px", marginTop: "3px", display: "block" }}>{teacherNameError}</span>}
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Email / Teacher ID</label>
              <input
                type="email"
                value={teacherEmail}
                onChange={(e) => {
                  const value = e.target.value;
                  setTeacherEmail(value);
                  setTeacherEmailError(value && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value.trim()) ? "Enter the correct email" : "");
                }}
                placeholder="teacher@example.com"
                autoComplete="off"
                name="unique_teacher_reg_email"
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: teacherEmailError ? "1px solid #DC2626" : "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                required
              />
              {teacherEmailError && <span style={{ color: "#DC2626", fontSize: "11px", marginTop: "3px", display: "block" }}>{teacherEmailError}</span>}
            </div>

            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Phone Number</label>
              <input
                type="tel"
                value={teacherPhone}
                onChange={(e) => {
                  updatePhoneNumber(e.target.value, setTeacherPhone, setTeacherPhoneError);
                }}
                placeholder="Enter 10 digits"
                autoComplete="tel"
                inputMode="numeric"
                maxLength={10}
                pattern="[0-9]{10}"
                title="Enter exactly 10 digits"
                name="unique_teacher_reg_phone"
                aria-invalid={Boolean(teacherPhoneError)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: teacherPhoneError ? "1px solid #DC2626" : "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                required
              />
              {teacherPhoneError && <span style={{ color: "#DC2626", fontSize: "11px", marginTop: "3px", display: "block" }}>{teacherPhoneError}</span>}
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
                    setTeacherPasswordError(value && value.length < 8 ? "Password must be at least 8 characters" : "");
                  }}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  name="unique_teacher_reg_pass"
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
              {teacherPasswordError && <span style={{ color: "#DC2626", fontSize: "11px", marginTop: "3px", display: "block" }}>{teacherPasswordError}</span>}
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
                  value={teacherSchoolType}
                  onChange={(e) => setTeacherSchoolType(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", background: "#FFF", boxSizing: "border-box" }}
                >
                  <option value="Govt High School">Govt High School</option>
                  <option value="Private School">Private School</option>
                  <option value="Other">Other School</option>
                </select>
              </div>
            </div>

            {teacherSchoolType === "Other" && (
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#475569", display: "block", marginBottom: "4px" }}>Enter School Name</label>
                <input
                  type="text"
                  value={teacherCustomSchool}
                  onChange={(e) => setTeacherCustomSchool(e.target.value)}
                  placeholder="e.g. St. Xavier's Public School"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                  required
                />
              </div>
            )}

            <button type="submit" style={{ marginTop: "10px", width: "100%", background: "#059669", color: "#FFFFFF", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
              Register as Teacher
            </button>
          </form>

          <p style={{ fontSize: "12px", color: "#64748B", textAlign: "center", marginTop: "18px" }}>
            Already registered? <Link to="/teacher-login" style={{ color: "#059669", fontWeight: 600 }}>Login here</Link>
          </p>
        </div>

      </div>
    </div>
  );
}