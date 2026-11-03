import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function TeacherRegister() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [teacherClass, setTeacherClass] = useState("");
  const [schoolType, setSchoolType] = useState("Govt High School");
  const [customSchool, setCustomSchool] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [classError, setClassError] = useState("");
  const [schoolError, setSchoolError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setPassError("");
    setClassError("");
    setSchoolError("");
    setGeneralError("");

    let isValid = true;

    // 1. FULL NAME VALIDATION
    const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;

    if (!nameRegex.test(fullName.trim())) {
      setNameError("Enter the correct name");
      isValid = false;
    }

    // 2. EMAIL VALIDATION
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email.trim())) {
      setEmailError("Enter the correct email ID");
      isValid = false;
    }

    // 3. PASSWORD VALIDATION
    if (password.length < 8) {
      setPassError("Password must be at least 8 characters");
      isValid = false;
    }

    // 4. CLASS VALIDATION
    if (!teacherClass) {
      setClassError("Please select your class assignment.");
      isValid = false;
    }

    // 5. SCHOOL VALIDATION
    if (schoolType === "Other" && !customSchool.trim()) {
      setSchoolError("Please enter your school name.");
      isValid = false;
    }

    // STOP INVALID REGISTRATION
    if (!isValid) {
      return;
    }

    // 6. GET EXISTING TEACHERS
    let allTeachers;

    try {
      const savedTeachers = localStorage.getItem("all_teachers");

      allTeachers = savedTeachers
        ? JSON.parse(savedTeachers)
        : [];

      if (!Array.isArray(allTeachers)) {
        setGeneralError("Invalid teacher records. Please try again.");
        return;
      }
    } catch {
      setGeneralError(
        "Unable to read teacher records. Please try again."
      );
      return;
    }

    // 7. CHECK DUPLICATE EMAIL
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = allTeachers.find(
      (teacher) =>
        teacher.email?.trim().toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      setGeneralError(
        "Teacher account already exists! Please login."
      );
      return;
    }

    // 8. GET SCHOOL NAME
    const finalSchool =
      schoolType === "Other"
        ? customSchool.trim()
        : schoolType;

    // 9. CREATE TEACHER ACCOUNT
    const newTeacher = {
      id: `TCH-${Date.now()}`,
      name: fullName.trim(),
      email: normalizedEmail,
      password: password,
      class: teacherClass,
      school: finalSchool,
      role: "Teacher"
    };

    // 10. SAVE TEACHER DETAILS
    try {
      allTeachers.push(newTeacher);

      localStorage.setItem(
        "all_teachers",
        JSON.stringify(allTeachers)
      );

      localStorage.setItem(
        "current_teacher",
        JSON.stringify(newTeacher)
      );

      // Teacher must login after registration
      localStorage.removeItem("teacherLoggedIn");

      // Navigate to Teacher Login
      navigate("/teacher-login");

    } catch {
      setGeneralError(
        "Unable to register. Please check your browser storage."
      );
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>

        {/* HEADER */}
        <div style={headerStyle}>
          <div style={{ fontSize: "32px" }}>👩‍🏫</div>

          <h2 style={{ fontSize: "20px", color: "#0F172A" }}>
            Create Teacher Account
          </h2>

          <p style={{ fontSize: "13px", color: "#64748B" }}>
            Digital Learning Platform
          </p>
        </div>

        {/* GENERAL ERROR */}
        {generalError && (
          <div style={generalErrorStyle}>
            {generalError}

            {generalError.includes("already exists") && (
              <Link
                to="/teacher-login"
                style={{
                  color: "#1E60F8",
                  fontWeight: 700,
                  marginLeft: "5px"
                }}
              >
                Login here
              </Link>
            )}
          </div>
        )}

        <form
          onSubmit={handleRegister}
          noValidate
          autoComplete="off"
          style={formStyle}
        >

          {/* FULL NAME */}
          <div>
            <label style={labelStyle}>Full Name</label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                const value = e.target.value;
                setFullName(value);
                setNameError(value && !/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(value.trim()) ? "Enter the correct name" : "");
              }}
              placeholder="e.g. Priya Sharma"
              style={inputStyle(nameError)}
            />

            {nameError && (
              <span style={errorStyle}>{nameError}</span>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label style={labelStyle}>
              Email / Teacher ID
            </label>

            <input
              type="text"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                setEmailError(value && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value.trim()) ? "Enter the correct email ID" : "");
                setGeneralError("");
              }}
              placeholder="teacher123@gmail.com"
              autoComplete="off"
              style={inputStyle(emailError)}
            />

            {emailError && (
              <span style={errorStyle}>{emailError}</span>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label style={labelStyle}>Password</label>

            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  setPassError(value && value.length < 8 ? "Password must be at least 8 characters" : "");
                }}
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                style={{
                  ...inputStyle(passError),
                  paddingRight: "40px"
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={eyeButtonStyle}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {passError && (
              <span style={errorStyle}>{passError}</span>
            )}
          </div>

          {/* CLASS AND SCHOOL */}
          <div style={gridStyle}>

            <div>
              <label style={labelStyle}>Class Assigned</label>

              <select
                value={teacherClass}
                onChange={(e) => {
                  setTeacherClass(e.target.value);
                  setClassError("");
                }}
                style={selectStyle}
              >
                <option value="">-- Select Class --</option>
                <option value="6">Class 6th</option>
                <option value="7">Class 7th</option>
                <option value="8">Class 8th</option>
                <option value="9">Class 9th</option>
                <option value="10">Class 10th</option>
              </select>

              {classError && (
                <span style={errorStyle}>{classError}</span>
              )}
            </div>

            <div>
              <label style={labelStyle}>School Type</label>

              <select
                value={schoolType}
                onChange={(e) => {
                  setSchoolType(e.target.value);
                  setSchoolError("");
                }}
                style={selectStyle}
              >
                <option value="Govt High School">
                  Govt High School
                </option>

                <option value="Private School">
                  Private School
                </option>

                <option value="Other">
                  Other School
                </option>
              </select>
            </div>

          </div>

          {/* CUSTOM SCHOOL */}
          {schoolType === "Other" && (
            <div>
              <label style={labelStyle}>
                Enter School Name
              </label>

              <input
                type="text"
                value={customSchool}
                onChange={(e) => {
                  setCustomSchool(e.target.value);
                  setSchoolError("");
                }}
                placeholder="Enter school name"
                style={inputStyle(schoolError)}
              />

              {schoolError && (
                <span style={errorStyle}>{schoolError}</span>
              )}
            </div>
          )}

          {/* REGISTER BUTTON */}
          <button type="submit" style={registerButtonStyle}>
            Register as Teacher
          </button>

        </form>

        {/* LOGIN LINK */}
        <p style={loginTextStyle}>
          Already registered?{" "}
          <Link
            to="/teacher-login"
            style={{
              color: "#1E60F8",
              fontWeight: 600
            }}
          >
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}

// COMMON STYLES

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "#F8FAFC",
  fontFamily: "sans-serif",
  padding: "20px"
};

const cardStyle = {
  background: "#FFFFFF",
  padding: "32px",
  borderRadius: "16px",
  border: "1px solid #E2E8F0",
  width: "100%",
  maxWidth: "440px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "20px"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const labelStyle = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#475569",
  display: "block",
  marginBottom: "4px"
};

const inputStyle = (hasError) => ({
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: hasError
    ? "1px solid #DC2626"
    : "1px solid #CBD5E1",
  fontSize: "13px",
  boxSizing: "border-box"
});

const selectStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #CBD5E1",
  fontSize: "13px",
  background: "#FFFFFF",
  boxSizing: "border-box"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px"
};

const errorStyle = {
  color: "#DC2626",
  fontSize: "11px",
  marginTop: "3px",
  display: "block"
};

const generalErrorStyle = {
  background: "#FEE2E2",
  color: "#DC2626",
  padding: "12px",
  borderRadius: "8px",
  fontSize: "12.5px",
  marginBottom: "14px",
  lineHeight: "1.5"
};

const eyeButtonStyle = {
  position: "absolute",
  right: "10px",
  top: "10px",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "15px"
};

const registerButtonStyle = {
  marginTop: "10px",
  width: "100%",
  background: "#1E60F8",
  color: "#FFFFFF",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer"
};

const loginTextStyle = {
  fontSize: "12px",
  color: "#64748B",
  textAlign: "center",
  marginTop: "18px"
};