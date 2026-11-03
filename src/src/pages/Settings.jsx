import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const portal = new URLSearchParams(location.search).get("portal");

  // 1. Differentiate between Teacher and Student session
   const readUser = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch {
      return null;
    }
  };

  const currentUser =
    typeof window !== "undefined" ? readUser("current_user") : null;
  const currentTeacher =
    typeof window !== "undefined" ? readUser("current_teacher") : null;

  const studentLoggedIn =
    typeof window !== "undefined" &&
    (!!currentUser || localStorage.getItem("studentLoggedIn") === "true");

  const teacherLoggedIn =
    typeof window !== "undefined" &&
    (!!currentTeacher || localStorage.getItem("teacherLoggedIn") === "true");

  const isTeacher =
    portal === "teacher"
      ? true
      : portal === "student"
        ? false
        : teacherLoggedIn && !studentLoggedIn;

  const activeUser = isTeacher ? currentTeacher : currentUser;
  const [fullName, setFullName] = useState(
    () => activeUser?.name || localStorage.getItem(isTeacher ? "teacherName" : "studentName") || (isTeacher ? "Priya Sharma" : "ShaikAppapuramShahina")
  );
  const [studentId, setStudentId] = useState(
    () => activeUser?.id || localStorage.getItem(isTeacher ? "teacherId" : "studentId") || (isTeacher ? "TCH-9978" : "24471A05LP")
  );
  const [studentClass, setStudentClass] = useState(
    () => activeUser?.class || localStorage.getItem(isTeacher ? "teacherClass" : "studentClass") || "10"
  );
  const [schoolName, setSchoolName] = useState(
    () => activeUser?.school || localStorage.getItem(isTeacher ? "teacherSchool" : "studentSchool") || "Govt High School"
  );
  const [email, setEmail] = useState(
    () => activeUser?.email || localStorage.getItem(isTeacher ? "teacherEmail" : "studentEmail") || (isTeacher ? "teacher@example.com" : "akbervali@gmail.com")
  );
  const [phone, setPhone] = useState(
    () => activeUser?.phone || localStorage.getItem("studentPhone") || "+91 98765 43210"
  );
  const [username, setUsername] = useState(
    () => activeUser?.username || (fullName.toLowerCase().replace(/\s+/g, ""))
  );

  const [notifyAnnouncements, setNotifyAnnouncements] = useState(
    () => localStorage.getItem("notif_announcements") !== "false"
  );
  const [notifyAssignments, setNotifyAssignments] = useState(
    () => localStorage.getItem("notif_assignments") !== "false"
  );
  const [notifyLiveClass, setNotifyLiveClass] = useState(
    () => localStorage.getItem("notif_liveclass") !== "false"
  );
  const [notifyQuizResults, setNotifyQuizResults] = useState(
    () => localStorage.getItem("notif_quiz") !== "false"
  );
  const [notifyImportant, setNotifyImportant] = useState(
    () => localStorage.getItem("notif_important") !== "false"
  );

  const [language, setLanguage] = useState(
    () => localStorage.getItem("app_language") || "English"
  );
  const [theme, setTheme] = useState(
    () => localStorage.getItem("app_theme") || "Light"
  );
  const [fontSize, setFontSize] = useState(
    () => localStorage.getItem("app_fontSize") || "Normal"
  );

  const [saveMessage, setSaveMessage] = useState("");

  const [isEditUsernameOpen, setIsEditUsernameOpen] = useState(false);
  const [newUsernameInput, setNewUsernameInput] = useState(username);

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  // States to toggle password visibility (Show/Hide text)
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isManageEmailOpen, setIsManageEmailOpen] = useState(false);
  const [emailDigestOption, setEmailDigestOption] = useState("Weekly");
  const [backupEmailInput, setBackupEmailInput] = useState("");

  const renderSvgIcon = (name, size = 18, stroke = "currentColor") => {
    switch (name) {
      case "dashboard":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
            <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
            <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
            <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
          </svg>
        );
      case "book-open":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        );
      case "video":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2"></rect>
          </svg>
        );
      case "clipboard":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1"></rect>
          </svg>
        );
      case "check-circle":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case "library":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2"></rect>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        );
      case "file-text":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        );
      case "doubt-center":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case "ai-agent":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="3"></rect>
            <circle cx="12" cy="5" r="2"></circle>
            <path d="M12 7v4"></path>
            <line x1="8" y1="16" x2="8.01" y2="16"></line>
            <line x1="16" y1="16" x2="16.01" y2="16"></line>
          </svg>
        );
      case "trending-up":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          </svg>
        );
      case "award":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6"></circle>
            <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"></path>
          </svg>
        );
      case "bell":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        );
      case "life-buoy":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="4"></circle>
          </svg>
        );
      case "settings":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 -2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06-.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        );
      case "logout":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  const handleLogout = () => {
    if (isTeacher) {
      localStorage.removeItem("current_teacher");
      localStorage.removeItem("teacherLoggedIn");
      navigate("/teacher-login");
    } else {
      localStorage.removeItem("current_user");
      localStorage.removeItem("studentLoggedIn");
      localStorage.removeItem("studentId");
      localStorage.removeItem("studentName");
      localStorage.removeItem("studentClass");
      localStorage.removeItem("studentSchool");
      navigate("/student-login");
    }
  };

  const syncUserData = (extraFields = {}) => {
    const updatedUser = {
      ...activeUser,
      name: fullName.trim(),
      id: studentId.trim(),
      class: studentClass,
      school: schoolName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      username: username.trim(),
      ...extraFields,
    };

    if (isTeacher) {
      localStorage.setItem("current_teacher", JSON.stringify(updatedUser));
      const allTeachers = JSON.parse(localStorage.getItem("all_teachers") || "[]");
      const updatedRoster = allTeachers.map((t) => (t.id === updatedUser.id ? updatedUser : t));
      localStorage.setItem("all_teachers", JSON.stringify(updatedRoster));
    } else {
      localStorage.setItem("current_user", JSON.stringify(updatedUser));
      localStorage.setItem("studentName", updatedUser.name);
      localStorage.setItem("studentId", updatedUser.id);
      localStorage.setItem("studentClass", updatedUser.class);
      localStorage.setItem("studentSchool", updatedUser.school);
      localStorage.setItem("studentEmail", updatedUser.email);
      localStorage.setItem("studentPhone", updatedUser.phone);

      const allStudents = JSON.parse(localStorage.getItem("all_students") || "[]");
      const updatedRoster = allStudents.map((s) => (s.id === updatedUser.id ? updatedUser : s));
      localStorage.setItem("all_students", JSON.stringify(updatedRoster));
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    localStorage.setItem("notif_announcements", notifyAnnouncements);
    localStorage.setItem("notif_assignments", notifyAssignments);
    localStorage.setItem("notif_liveclass", notifyLiveClass);
    localStorage.setItem("notif_quiz", notifyQuizResults);
    localStorage.setItem("notif_important", notifyImportant);
    localStorage.setItem("app_language", language);
    localStorage.setItem("app_theme", theme);
    localStorage.setItem("app_fontSize", fontSize);

    syncUserData();

    setSaveMessage("✓ Details saved permanently! Redirecting to Dashboard...");
    setTimeout(() => {
      navigate(isTeacher ? "/teacher-dashboard" : "/student-dashboard");
    }, 1200);
  };

  const handleSaveUsername = (e) => {
    e.preventDefault();
    if (!newUsernameInput.trim()) {
      alert("Username cannot be empty.");
      return;
    }
    const cleanUsername = newUsernameInput.trim().toLowerCase().replace(/\s+/g, "");
    setUsername(cleanUsername);
    syncUserData({ username: cleanUsername });
    setIsEditUsernameOpen(false);
    alert("Username updated successfully!");
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!newPasswordInput || !confirmPasswordInput) {
      alert("Please fill in all password fields.");
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      alert("New password and confirm password do not match.");
      return;
    }
    syncUserData({ password: newPasswordInput });
    setIsChangePasswordOpen(false);
    setOldPasswordInput("");
    setNewPasswordInput("");
    setConfirmPasswordInput("");
    alert("✓ Password updated successfully!");
  };

  const handleSaveManageEmail = (e) => {
    e.preventDefault();
    syncUserData({ emailDigest: emailDigestOption, backupEmail: backupEmailInput.trim() });
    setIsManageEmailOpen(false);
    alert("✓ Email notification preferences saved!");
  };

  return (
    <div className="st-container">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .st-container { display: flex; min-height: 100vh; background: #f8fafc; color: #0f172a; width: 100%; }

        .st-sidebar { width: 240px; background: ${isTeacher ? "#081B38" : "#081B38"}; color: #94A3B8; display: flex; flex-direction: column; flex-shrink: 0; padding: 22px 14px; position: fixed; top: 0; bottom: 0; left: 0; z-index: 100; }
        .st-brand { display: flex; align-items: center; gap: 12px; padding: 0 0 18px 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); margin-bottom: 18px; }
        .st-brand-badge { width: 38px; height: 38px; border-radius: 10px; background: ${isTeacher ? "#059669" : "#1E60F8"}; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; }
        .st-brand-text h2 { font-size: 15px; font-weight: 700; color: #fff; }
        .st-brand-text p { font-size: 12px; color: ${isTeacher ? "#34D399" : "#60A5FA"}; display: block; }
        .st-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; overflow-y: auto; }
        .st-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; color: #94A3B8; text-decoration: none; border-radius: 9px; font-size: 13px; font-weight: 500; transition: all 0.15s; border: none; background: transparent; cursor: pointer; width: 100%; text-align: left; }
        .st-link:hover { background-color: rgba(255, 255, 255, 0.06); color: #fff; }
        .st-link.active { background-color: ${isTeacher ? "#059669" : "#1E60F8"}; color: #fff; font-weight: 600; box-shadow: 0 4px 12px rgba(30,96,248,0.3); }
        .st-logout-wrap { padding: 14px 14px 18px 14px; border-top: 1px solid rgba(255, 255, 255, 0.07); margin-top: auto; }
        .st-logout-btn { width: 100%; display: flex; align-items: center; gap: 12px; background: transparent; border: none; color: #EF4444; padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }

        .st-main { flex: 1; margin-left: 240px; display: flex; flex-direction: column; overflow-y: auto; padding-bottom: 60px; min-width: 0; }
        .st-header { height: 64px; background: #fff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; }
        .st-header-title h2 { font-size: 15.5px; font-weight: 700; color: #0f172a; }
        .st-header-title p { font-size: 11.5px; color: #64748b; }
        .st-header-right { display: flex; align-items: center; gap: 18px; }
        .st-user-badge { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .st-avatar { width: 36px; height: 36px; border-radius: 50%; background: ${isTeacher ? "#a7f3d0" : "#fed7aa"}; display: flex; align-items: center; justify-content: center; font-size: 18px; }

        .st-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; max-width: 1200px; margin: 0 auto; width: 100%; }

        .st-hero { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; }
        .st-hero-left { display: flex; align-items: center; gap: 16px; }
        .st-hero-icon { width: 48px; height: 48px; border-radius: 12px; background: ${isTeacher ? "#059669" : "#2563eb"}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .st-hero-left h1 { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .st-hero-left p { font-size: 13px; color: #64748b; }
        .st-hero-art { font-size: 34px; }

        .st-alert-success { background: #dcfce7; border: 1px solid #86efac; color: #15803d; padding: 12px 18px; border-radius: 12px; font-size: 13.5px; font-weight: 700; }

        .st-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; }
        .st-card-title { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 16px; }

        .st-profile-wrap { display: flex; gap: 28px; }
        .st-avatar-col { display: flex; flex-direction: column; align-items: center; gap: 10px; width: 130px; }
        .st-avatar-large { width: 84px; height: 84px; border-radius: 50%; background: ${isTeacher ? "#a7f3d0" : "#fed7aa"}; display: flex; align-items: center; justify-content: center; font-size: 44px; border: 3px solid #eff6ff; }
        .st-change-photo-btn { font-size: 12px; color: ${isTeacher ? "#059669" : "#2563eb"}; background: none; border: none; font-weight: 600; cursor: pointer; }
        
        .st-form-grid { flex: 1; display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .st-field { display: flex; flex-direction: column; gap: 6px; }
        .st-field label { font-size: 12px; font-weight: 600; color: #475569; }
        .st-input, .st-select { padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; color: #0f172a; outline: none; background: #fff; }
        .st-input:focus, .st-select:focus { border-color: ${isTeacher ? "#059669" : "#2563eb"}; }

        .st-acc-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #f1f5f9; }
        .st-acc-row:last-child { border-bottom: none; }
        .st-acc-left { display: flex; align-items: center; gap: 14px; }
        .st-acc-icon { width: 36px; height: 36px; border-radius: 9px; background: #eff6ff; color: ${isTeacher ? "#059669" : "#2563eb"}; display: flex; align-items: center; justify-content: center; font-size: 17px; }
        .st-acc-info strong { display: block; font-size: 13px; color: #0f172a; margin-bottom: 1px; }
        .st-acc-info span { font-size: 11.5px; color: #64748b; }
        .st-acc-action-btn { background: none; border: none; font-size: 12.5px; color: ${isTeacher ? "#059669" : "#2563eb"}; font-weight: 700; cursor: pointer; padding: 4px 8px; border-radius: 6px; transition: background 0.15s; }
        .st-acc-action-btn:hover { background: #eff6ff; text-decoration: underline; }

        .st-pref-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }

        .st-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f8fafc; font-size: 13px; font-weight: 500; color: #334155; }
        .st-toggle-row:last-child { border-bottom: none; }
        .st-toggle-left { display: flex; align-items: center; gap: 10px; }

        .st-switch { position: relative; display: inline-block; width: 40px; height: 22px; }
        .st-switch input { opacity: 0; width: 0; height: 0; }
        .st-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: 0.2s; border-radius: 34px; }
        .st-slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: white; transition: 0.2s; border-radius: 50%; }
        input:checked + .st-slider { background-color: ${isTeacher ? "#059669" : "#2563eb"}; }
        input:checked + .st-slider:before { transform: translateX(18px); }

        .st-radio-group { display: flex; gap: 20px; margin-top: 6px; }
        .st-radio-label { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #334155; cursor: pointer; }

        .st-actions-bar { display: flex; align-items: center; justify-content: space-between; margin-top: 20px; }
        .st-save-btn { background: ${isTeacher ? "#059669" : "#2563eb"}; color: #fff; border: none; padding: 10px 32px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; }
        .st-cancel-btn { background: #fff; border: 1px solid #cbd5e1; color: #475569; padding: 10px 24px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }

        .st-danger-zone { border-top: 1px solid #fee2e2; padding-top: 16px; margin-top: 20px; display: flex; align-items: center; justify-content: space-between; }
        .st-danger-text h5 { font-size: 13px; color: #dc2626; font-weight: 700; margin-bottom: 2px; }
        .st-danger-text p { font-size: 11.5px; color: #64748b; }
        .st-danger-btn { background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 8px 18px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; }

        .st-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .st-modal-box { background: #fff; border-radius: 16px; width: 100%; max-width: 480px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2); }
        .st-modal-head { padding: 16px 20px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; }
        .st-modal-body { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
        .st-modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 6px; }
        .st-modal-save { background: ${isTeacher ? "#059669" : "#2563eb"}; color: #fff; border: none; padding: 8px 20px; border-radius: 8px; font-size: 12.5px; font-weight: 700; cursor: pointer; }
        .st-modal-close { background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 8px 16px; border-radius: 8px; font-size: 12.5px; font-weight: 600; cursor: pointer; }

        @media (max-width: 1024px) {
          .st-sidebar { display: none; }
          .st-main { margin-left: 0; }
          .st-profile-wrap { flex-direction: column; align-items: center; }
          .st-pref-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <aside className="st-sidebar">
        <div className="st-brand">
          <div className="st-brand-badge">{isTeacher ? "👩‍🏫" : "🎓"}</div>
          <div className="st-brand-text">
            <h2>Digital Learning Platform</h2>
            <p>{isTeacher ? "Teacher Portal" : ""}</p>
          </div>
        </div>

        <nav className="st-nav">
          {isTeacher ? (
            <>
              <NavLink to="/teacher-dashboard" className="st-link">
                {renderSvgIcon("dashboard", 18, "#94A3B8")}
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/teacher-classes" className="st-link">
                {renderSvgIcon("book-open", 18, "#94A3B8")}
                <span>My Classes</span>
              </NavLink>
              <NavLink to="/teacher-assignments" className="st-link">
                {renderSvgIcon("clipboard", 18, "#94A3B8")}
                <span>Assignments & Grading</span>
              </NavLink>
              <NavLink to="/live-classes" className="st-link">
                {renderSvgIcon("video", 18, "#94A3B8")}
                <span>Live Classes</span>
              </NavLink>
              <NavLink to="/notes" className="st-link">
                {renderSvgIcon("file-text", 18, "#94A3B8")}
                <span>Notes & Materials</span>
              </NavLink>
              <NavLink to="/doubt-centre" className="st-link">
                {renderSvgIcon("doubt-center", 18, "#94A3B8")}
                <span>Doubt Centre</span>
              </NavLink>
              <button className="st-link" onClick={() => navigate("/announcements")}>
                {renderSvgIcon("bell", 18, "#94A3B8")}
                <span>Announcements</span>
              </button>
              <NavLink to="/settings" className="st-link active">
                {renderSvgIcon("settings", 18, "#FFFFFF")}
                <span>Settings</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/student-dashboard" className="st-link">
                {renderSvgIcon("dashboard", 18, "#94A3B8")}
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/courses" className="st-link">
                {renderSvgIcon("book-open", 18, "#94A3B8")}
                <span>My Courses</span>
              </NavLink>
              <NavLink to="/live-classes" className="st-link">
                {renderSvgIcon("video", 18, "#94A3B8")}
                <span>Live Classes</span>
              </NavLink>
              <NavLink to="/assignments" className="st-link">
                {renderSvgIcon("clipboard", 18, "#94A3B8")}
                <span>Assignments</span>
              </NavLink>
              <NavLink to="/quizzes" className="st-link">
                {renderSvgIcon("check-circle", 18, "#94A3B8")}
                <span>Quizzes</span>
              </NavLink>
              <NavLink to="/digital-library" className="st-link">
                {renderSvgIcon("library", 18, "#94A3B8")}
                <span>Digital Library</span>
              </NavLink>
              <NavLink to="/notes" className="st-link">
                {renderSvgIcon("file-text", 18, "#94A3B8")}
                <span>Notes</span>
              </NavLink>
              <NavLink to="/doubt-centre" className="st-link">
                {renderSvgIcon("doubt-center", 18, "#94A3B8")}
                <span>Doubt Centre</span>
              </NavLink>
              <NavLink to="/ai-agent" className="st-link">
                {renderSvgIcon("ai-agent", 18, "#94A3B8")}
                <span>AI Agent</span>
              </NavLink>
              <NavLink to="/progress" className="st-link">
                {renderSvgIcon("trending-up", 18, "#94A3B8")}
                <span>Progress</span>
              </NavLink>
              <button className="st-link" onClick={() => navigate("/certificates")}>
                {renderSvgIcon("award", 18, "#94A3B8")}
                <span>Certificates</span>
              </button>
              <button className="st-link" onClick={() => navigate("/announcements")}>
                {renderSvgIcon("bell", 18, "#94A3B8")}
                <span>Announcements</span>
              </button>
              <NavLink to="/help-support" className="st-link">
                {renderSvgIcon("life-buoy", 18, "#94A3B8")}
                <span>Help & Support</span>
              </NavLink>
              <NavLink to="/settings" className="st-link active">
                {renderSvgIcon("settings", 18, "#FFFFFF")}
                <span>Settings</span>
              </NavLink>
            </>
          )}
        </nav>

        <div className="st-logout-wrap">
          <button onClick={handleLogout} className="st-logout-btn">
            {renderSvgIcon("logout", 18, "#EF4444")}
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="st-main">
        <header className="st-header">
          <div className="st-header-title">
            <h2>Digital Learning Platform</h2>
            <p>{isTeacher ? "Educator Control Center" : "Online Learning Portal for Students"}</p>
          </div>
          <div className="st-header-right">
            <div className="st-user-badge">
              <div className="st-avatar">{isTeacher ? "👩‍🏫" : "👩‍🎓"}</div>
              <div>
                <strong style={{ fontSize: 13, display: "block" }}>{fullName}</strong>
                <span style={{ fontSize: 11, color: "#64748b" }}>{isTeacher ? `Class ${studentClass}th Educator` : `Class ${studentClass}th`}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="st-body">
          <div className="st-hero">
            <div className="st-hero-left">
              <div className="st-hero-icon">⚙️</div>
              <div>
                <h1>Settings</h1>
                <p>Manage your account settings and platform preferences</p>
              </div>
            </div>
            <div className="st-hero-art">{isTeacher ? "📚👩‍🏫" : "💻⚙️👤"}</div>
          </div>

          {saveMessage && <div className="st-alert-success">{saveMessage}</div>}

          <div className="st-card">
            <div className="st-card-title">Profile Settings</div>

            <form onSubmit={handleSaveChanges}>
              <div className="st-profile-wrap">
                <div className="st-avatar-col">
                  <div className="st-avatar-large">{isTeacher ? "👩‍🏫" : "👩‍🎓"}</div>
                  <button
                    type="button"
                    className="st-change-photo-btn"
                    onClick={() => alert("Photo selector ready. Selected photo will be saved to your profile.")}
                  >
                    Change Photo
                  </button>
                </div>

                <div className="st-form-grid">
                  <div className="st-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="st-input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="st-field">
                    <label>{isTeacher ? "Teacher ID" : "Student ID"}</label>
                    <input
                      type="text"
                      className="st-input"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required
                    />
                  </div>

                  <div className="st-field">
                    <label>Class</label>
                    <select
                      className="st-select"
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                    >
                      <option value="10">Class 10</option>
                      <option value="9">Class 9</option>
                      <option value="8">Class 8</option>
                      <option value="7">Class 7</option>
                      <option value="6">Class 6</option>
                    </select>
                  </div>

                  <div className="st-field">
                    <label>School / Institution</label>
                    <input
                      type="text"
                      className="st-input"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="st-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="st-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="st-field">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className="st-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 24, borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
                <div className="st-card-title">Account Settings</div>

                <div className="st-acc-row">
                  <div className="st-acc-left">
                    <div className="st-acc-icon">👤</div>
                    <div className="st-acc-info">
                      <strong>Username</strong>
                      <span>{username}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="st-acc-action-btn"
                    onClick={() => {
                      setNewUsernameInput(username);
                      setIsEditUsernameOpen(true);
                    }}
                  >
                    Edit ›
                  </button>
                </div>

                <div className="st-acc-row">
                  <div className="st-acc-left">
                    <div className="st-acc-icon">🔒</div>
                    <div className="st-acc-info">
                      <strong>Password</strong>
                      <span>••••••••••</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="st-acc-action-btn"
                    onClick={() => setIsChangePasswordOpen(true)}
                  >
                    Change
                  </button>
                </div>

                <div className="st-acc-row">
                  <div className="st-acc-left">
                    <div className="st-acc-icon">✉️</div>
                    <div className="st-acc-info">
                      <strong>Email Notifications</strong>
                      <span>{email}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="st-acc-action-btn"
                    onClick={() => setIsManageEmailOpen(true)}
                  >
                    Manage ›
                  </button>
                </div>
              </div>

              <div className="st-pref-grid">
                <div className="st-card">
                  <div className="st-card-title">Notifications</div>

                  <div className="st-toggle-row">
                    <div className="st-toggle-left">
                      <span>📢</span> New Announcements
                    </div>
                    <label className="st-switch">
                      <input
                        type="checkbox"
                        checked={notifyAnnouncements}
                        onChange={(e) => setNotifyAnnouncements(e.target.checked)}
                      />
                      <span className="st-slider"></span>
                    </label>
                  </div>

                  <div className="st-toggle-row">
                    <div className="st-toggle-left">
                      <span>📋</span> Assignment Reminders
                    </div>
                    <label className="st-switch">
                      <input
                        type="checkbox"
                        checked={notifyAssignments}
                        onChange={(e) => setNotifyAssignments(e.target.checked)}
                      />
                      <span className="st-slider"></span>
                    </label>
                  </div>

                  <div className="st-toggle-row">
                    <div className="st-toggle-left">
                      <span>📹</span> Live Class Notifications
                    </div>
                    <label className="st-switch">
                      <input
                        type="checkbox"
                        checked={notifyLiveClass}
                        onChange={(e) => setNotifyLiveClass(e.target.checked)}
                      />
                      <span className="st-slider"></span>
                    </label>
                  </div>

                  <div className="st-toggle-row">
                    <div className="st-toggle-left">
                      <span>🎯</span> Quiz Results
                    </div>
                    <label className="st-switch">
                      <input
                        type="checkbox"
                        checked={notifyQuizResults}
                        onChange={(e) => setNotifyQuizResults(e.target.checked)}
                      />
                      <span className="st-slider"></span>
                    </label>
                  </div>

                  <div className="st-toggle-row">
                    <div className="st-toggle-left">
                      <span>⭐</span> Important Updates
                    </div>
                    <label className="st-switch">
                      <input
                        type="checkbox"
                        checked={notifyImportant}
                        onChange={(e) => setNotifyImportant(e.target.checked)}
                      />
                      <span className="st-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="st-card">
                  <div className="st-card-title">Language & Appearance</div>

                  <div className="st-field" style={{ marginBottom: 12 }}>
                    <label>Language</label>
                    <select
                      className="st-select"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="English">English</option>
                      <option value="Telugu">Telugu (తెలుగు)</option>
                      <option value="Hindi">Hindi (हिन्दी)</option>
                      <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
                    </select>
                  </div>

                  <div className="st-field" style={{ marginBottom: 14 }}>
                    <label>Theme</label>
                    <div className="st-radio-group">
                      <label className="st-radio-label">
                        <input
                          type="radio"
                          name="theme"
                          value="Light"
                          checked={theme === "Light"}
                          onChange={() => setTheme("Light")}
                        />
                        Light
                      </label>
                      <label className="st-radio-label">
                        <input
                          type="radio"
                          name="theme"
                          value="Dark"
                          checked={theme === "Dark"}
                          onChange={() => setTheme("Dark")}
                        />
                        Dark
                      </label>
                    </div>
                  </div>

                  <div className="st-field">
                    <label>Font Size</label>
                    <div className="st-radio-group">
                      <label className="st-radio-label">
                        <input
                          type="radio"
                          name="fontSize"
                          value="Normal"
                          checked={fontSize === "Normal"}
                          onChange={() => setFontSize("Normal")}
                        />
                        Normal
                      </label>
                      <label className="st-radio-label">
                        <input
                          type="radio"
                          name="fontSize"
                          value="Large"
                          checked={fontSize === "Large"}
                          onChange={() => setFontSize("Large")}
                        />
                        Large
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="st-actions-bar">
                <button type="submit" className="st-save-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="st-cancel-btn"
                  onClick={() => navigate(isTeacher ? "/teacher-dashboard" : "/student-dashboard")}
                >
                  Cancel
                </button>
              </div>

              <div className="st-danger-zone">
                <div className="st-danger-text">
                  <h5>Danger Zone</h5>
                  <p>Logging out will end your session and redirect you to the login screen.</p>
                </div>
                <button type="button" className="st-danger-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {isEditUsernameOpen && (
        <div className="st-modal-overlay" onClick={() => setIsEditUsernameOpen(false)}>
          <div className="st-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="st-modal-head">
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Edit Username</h3>
              <button
                onClick={() => setIsEditUsernameOpen(false)}
                style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveUsername}>
              <div className="st-modal-body">
                <p style={{ fontSize: 12.5, color: "#64748b" }}>
                  Your username is visible in interactions and discussions.
                </p>
                <div className="st-field">
                  <label>New Username</label>
                  <input
                    type="text"
                    className="st-input"
                    value={newUsernameInput}
                    onChange={(e) => setNewUsernameInput(e.target.value)}
                    required
                  />
                </div>
                <div className="st-modal-actions">
                  <button type="button" className="st-modal-close" onClick={() => setIsEditUsernameOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="st-modal-save">
                    Save Username
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {isChangePasswordOpen && (
        <div className="st-modal-overlay" onClick={() => setIsChangePasswordOpen(false)}>
          <div className="st-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="st-modal-head">
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Change Account Password</h3>
              <button
                onClick={() => setIsChangePasswordOpen(false)}
                style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSavePassword}>
              <div className="st-modal-body">
                <div className="st-field">
                  <label>Current Password</label>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                      type={showOldPassword ? "text" : "password"}
                      className="st-input"
                      style={{ width: "100%", paddingRight: "40px" }}
                      placeholder="Enter current password"
                      value={oldPasswordInput}
                      onChange={(e) => setOldPasswordInput(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      style={{ position: "absolute", right: "10px", background: "none", border: "none", cursor: "pointer", fontSize: "15px" }}
                      title={showOldPassword ? "Hide password" : "Show password"}
                    >
                      {showOldPassword ? "👁️‍🗨️" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="st-field">
                  <label>New Password</label>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      className="st-input"
                      style={{ width: "100%", paddingRight: "40px" }}
                      placeholder="Enter new secure password"
                      value={newPasswordInput}
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{ position: "absolute", right: "10px", background: "none", border: "none", cursor: "pointer", fontSize: "15px" }}
                      title={showNewPassword ? "Hide password" : "Show password"}
                    >
                      {showNewPassword ? "👁️‍🗨️" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="st-field">
                  <label>Confirm New Password</label>
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="st-input"
                      style={{ width: "100%", paddingRight: "40px" }}
                      placeholder="Confirm new password"
                      value={confirmPasswordInput}
                      onChange={(e) => setConfirmPasswordInput(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ position: "absolute", right: "10px", background: "none", border: "none", cursor: "pointer", fontSize: "15px" }}
                      title={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? "👁️‍🗨️" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="st-modal-actions">
                  <button type="button" className="st-modal-close" onClick={() => setIsChangePasswordOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="st-modal-save">
                    Update Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {isManageEmailOpen && (
        <div className="st-modal-overlay" onClick={() => setIsManageEmailOpen(false)}>
          <div className="st-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="st-modal-head">
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Manage Email Notifications</h3>
              <button
                onClick={() => setIsManageEmailOpen(false)}
                style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveManageEmail}>
              <div className="st-modal-body">
                <div className="st-field">
                  <label>Primary Notification Email</label>
                  <input
                    type="email"
                    className="st-input"
                    value={email}
                    disabled
                    style={{ background: "#f1f5f9", cursor: "not-allowed" }}
                  />
                </div>
                <div className="st-field">
                  <label>Email Summary Frequency</label>
                  <select
                    className="st-select"
                    value={emailDigestOption}
                    onChange={(e) => setEmailDigestOption(e.target.value)}
                  >
                    <option value="Daily">Daily Homework & Class Digest</option>
                    <option value="Weekly">Weekly Progress Report (Recommended)</option>
                    <option value="ImportantOnly">Critical Announcements Only</option>
                  </select>
                </div>
                <div className="st-field">
                  <label>Alternate Email (Optional)</label>
                  <input
                    type="email"
                    className="st-input"
                    placeholder="alternate@gmail.com"
                    value={backupEmailInput}
                    onChange={(e) => setBackupEmailInput(e.target.value)}
                  />
                </div>
                <div className="st-modal-actions">
                  <button type="button" className="st-modal-close" onClick={() => setIsManageEmailOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="st-modal-save">
                    Save Preferences
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}