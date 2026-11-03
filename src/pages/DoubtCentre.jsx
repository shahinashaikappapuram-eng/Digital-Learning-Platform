import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import { requestAiTutorAnswer } from "../utils/aiTutor";

const clearPlaceholderAnswers = (account) => {
  if (!Array.isArray(account.doubtsList)) return { account, changed: false };

  let changed = false;
  const doubtsList = account.doubtsList.map((doubt) => {
    if (!doubt.teacherResponse?.reply?.includes("Review the core rule in chapter notes and break it into steps.")) {
      return doubt;
    }

    changed = true;
    return { ...doubt, status: "Pending", teacherResponse: null };
  });

  return { account: changed ? { ...account, doubtsList } : account, changed };
};

export default function DoubtCentre() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [doubtText, setDoubtText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [aiServiceStatus, setAiServiceStatus] = useState("checking");

  const [myDoubtsFilter, setMyDoubtsFilter] = useState("All");

  const [selectedResponseDetail, setSelectedResponseDetail] = useState(null);
  const [showAllLiveSessionsModal, setShowAllLiveSessionsModal] = useState(false);
  const [showAllMyDoubtsModal, setShowAllMyDoubtsModal] = useState(false);
  const [showAllTeacherResponsesModal, setShowAllTeacherResponsesModal] = useState(false);

  useEffect(() => {
    const rawUser = localStorage.getItem("current_user");
    const rawTeacher = localStorage.getItem("current_teacher");
    const teacherLoggedInFlag = localStorage.getItem("teacherLoggedIn") === "true";

    if (rawTeacher || teacherLoggedInFlag) {
      setIsTeacher(true);
      try {
        const { account, changed } = clearPlaceholderAnswers(JSON.parse(rawTeacher || "{}"));
        setUser(account);
        if (changed) {
          localStorage.setItem("current_teacher", JSON.stringify(account));
        }
      } catch {
        setUser({ name: "Educator", class: "6", school: "Govt High School", doubtsList: [] });
      }
    } else if (rawUser) {
      setIsTeacher(false);
      try {
        const { account, changed } = clearPlaceholderAnswers(JSON.parse(rawUser));
        setUser(account);
        if (changed) {
          localStorage.setItem("current_user", JSON.stringify(account));
          const students = JSON.parse(localStorage.getItem("all_students") || "[]");
          if (Array.isArray(students)) {
            localStorage.setItem(
              "all_students",
              JSON.stringify(students.map((student) => student.id === account.id ? account : student))
            );
          }
        }
      } catch {
        navigate("/student-login");
      }
    } else {
      const fallbackTeacher = localStorage.getItem("teacherName");
      if (fallbackTeacher) {
        setIsTeacher(true);
        setUser({ name: fallbackTeacher, class: "6", school: "Private School", doubtsList: [] });
      } else {
        navigate("/student-login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    let isCurrent = true;

    fetch("/api/health")
      .then((response) => {
        if (!response.ok) throw new Error("AI API health check failed.");
        return response.json();
      })
      .then((status) => {
        if (isCurrent) setAiServiceStatus(status.configured ? "ready" : "missing-key");
      })
      .catch(() => {
        if (isCurrent) setAiServiceStatus("unavailable");
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  if (!user) return null;

  const userName = user.name || (isTeacher ? "Educator" : "Student");
  const userClass = user.class || "6";
  const userDoubts = user.doubtsList || [];
  const totalAsked = userDoubts.length;
  const answeredList = userDoubts.filter((d) => d.status === "Answered");
  const answeredCount = answeredList.length;
  const pendingCount = userDoubts.filter((d) => d.status === "Pending").length;
  const answeredPercentage = totalAsked > 0 ? Math.round((answeredCount / totalAsked) * 100) : 0;
  const pendingPercentage = totalAsked > 0 ? Math.round((pendingCount / totalAsked) * 100) : 0;
  const avgResponseTime = answeredCount > 0 ? "Instant" : "--";

  const persistUserDoubts = (doubtsList, account = user) => {
    const updatedUser = { ...account, doubtsList };
    const accountKey = isTeacher ? "current_teacher" : "current_user";
    const rosterKey = isTeacher ? "all_teachers" : "all_students";
    const roster = JSON.parse(localStorage.getItem(rosterKey) || "[]");

    if (!Array.isArray(roster)) {
      throw new Error("Unable to update your account records. Please try again.");
    }

    const matchingRecord = roster.some((record) => record.id === updatedUser.id);
    const updatedRoster = matchingRecord
      ? roster.map((record) => record.id === updatedUser.id ? updatedUser : record)
      : [...roster, updatedUser];

    localStorage.setItem(accountKey, JSON.stringify(updatedUser));
    localStorage.setItem(rosterKey, JSON.stringify(updatedRoster));
    setUser(updatedUser);
    return updatedUser;
  };

  const applyAiAnswer = (doubtId, answer, account = user) => {
    const answeredDoubts = (account.doubtsList || []).map((doubt) =>
      doubt.id === doubtId
        ? {
            ...doubt,
            status: "Answered",
            teacherResponse: {
              teacher: "Gemini AI Tutor",
              role: "AI Tutor",
              reply: answer,
              time: "Just now",
            },
          }
        : doubt
    );

    persistUserDoubts(answeredDoubts, account);
  };

  const handleRetryAnswer = async (doubt) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionError("");
    try {
      const answer = await requestAiTutorAnswer({
        subject: doubt.subject,
        question: doubt.text,
        classLevel: String(user.class || ""),
      });
      applyAiAnswer(doubt.id, answer);
    } catch (error) {
      setSubmissionError(`Your doubt is still pending. ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(isTeacher ? "/teacher-login" : "/student-login");
  };

  const renderSvgIcon = (name, size = 18, stroke = "currentColor") => {
    switch (name) {
      case "dashboard":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect></svg>;
      case "book-open":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
      case "video":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2"></rect></svg>;
      case "clipboard":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1"></rect></svg>;
      case "check-circle":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
      case "library":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="4" y1="18" x2="20" y2="18"></line></svg>;
      case "file-text":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>;
      case "doubt-center":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
      case "ai-agent":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="3"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="16" y1="16" x2="16.01" y2="16"></line></svg>;
      case "trending-up":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline></svg>;
      case "award":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"></path></svg>;
      case "bell":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
      case "life-buoy":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle></svg>;
      case "settings":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 -2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06-.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
      case "logout":
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
      default:
        return null;
    }
  };

  const liveSessions = [
    { id: "ls-1", subject: "Mathematics", time: "Today 11:00 AM", isLive: true, teacher: "Ms. Priya Sharma" },
    { id: "ls-2", subject: "Science", time: "Today 02:00 PM", isLive: true, teacher: "Mr. Rohit Verma" },
    { id: "ls-3", subject: "English", time: "Tomorrow 11:00 AM", isLive: false, teacher: "Ms. Neha Singh" },
    { id: "ls-4", subject: "Social Science", time: "Tomorrow 04:00 PM", isLive: false, teacher: "Mr. Amit Kumar" },
    { id: "ls-5", subject: "Computer Science", time: "Wednesday 10:00 AM", isLive: false, teacher: "Ms. Pooja Sharma" },
  ];

  const getSubjectIcon = (sub) => {
    switch (sub) {
      case "Mathematics": return "+-";
      case "Science": return "🧪";
      case "English": return "📖";
      case "Social Science":
      case "Social Studies": return "🌐";
      case "Computer Science":
      case "Computer Basics": return "💻";
      case "Hindi": return "🇮🇳";
      case "Telugu": return "🪶";
      default: return "❓";
    }
  };

  const getSubjectBg = (sub) => {
    switch (sub) {
      case "Mathematics": return "#2563eb";
      case "Science": return "#10b981";
      case "English": return "#8b5cf6";
      case "Social Science":
      case "Social Studies": return "#ea580c";
      case "Computer Science":
      case "Computer Basics": return "#06b6d4";
      case "Hindi": return "#e11d48";
      case "Telugu": return "#0284c7";
      default: return "#3b82f6";
    }
  };

  const handleAskDoubt = async (e) => {
    e.preventDefault();
    if (!doubtText.trim()) {
      setSubmissionError("Please describe your doubt clearly.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError("");
    const doubtId = `dbt-${crypto.randomUUID()}`;
    const newDoubt = {
      id: doubtId,
      subject: selectedSubject,
      text: doubtText.trim(),
      date: "Just now",
      status: "Pending",
      teacherResponse: null
    };

    const updatedDoubts = [newDoubt, ...userDoubts];
    let updatedUser;
    try {
      updatedUser = persistUserDoubts(updatedDoubts);
    } catch (error) {
      setIsSubmitting(false);
      setSubmissionError(error.message || "Unable to save your doubt. Please try again.");
      return;
    }

    const currentText = doubtText.trim();
    setDoubtText("");
    try {
      const answer = await requestAiTutorAnswer({
        subject: newDoubt.subject,
        question: currentText,
        classLevel: String(user.class || ""),
      });
      applyAiAnswer(doubtId, answer, updatedUser);
    } catch (error) {
      setSubmissionError(`Your doubt was saved as pending. ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredMyDoubts = userDoubts.filter((d) => {
    if (myDoubtsFilter === "All") return true;
    return d.status.toLowerCase() === myDoubtsFilter.toLowerCase();
  });

  return (
    <div className="dc-container">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .dc-container { display: flex; min-height: 100vh; background: #f8fafc; color: #0f172a; width: 100%; }

        .dc-sidebar { width: 240px; background: #081B38; color: #94A3B8; display: flex; flex-direction: column; flex-shrink: 0; padding: 22px 14px; position: fixed; top: 0; bottom: 0; left: 0; z-index: 120; }
        .dc-brand { display: flex; align-items: center; gap: 12px; padding: 0 0 18px 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); margin-bottom: 18px; }
        .dc-brand-badge { width: 38px; height: 38px; border-radius: 10px; background: ${isTeacher ? "#059669" : "#1E60F8"}; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; }
        .dc-brand h3 { font-size: 15px; font-weight: 700; color: #fff; }
        .dc-brand span { font-size: 12px; color: ${isTeacher ? "#34D399" : "#60A5FA"}; display: block; }
        .dc-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; overflow-y: auto; }
        .dc-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; color: #94A3B8; text-decoration: none; border-radius: 9px; font-size: 13px; font-weight: 500; transition: all 0.15s; border: none; background: transparent; cursor: pointer; width: 100%; text-align: left; }
        .dc-link:hover { background-color: rgba(255, 255, 255, 0.06); color: #fff; }
        .dc-link.active { background-color: ${isTeacher ? "#059669" : "#1E60F8"}; color: #fff; font-weight: 600; box-shadow: 0 4px 12px rgba(30,96,248,0.3); }
        .dc-logout-wrap { padding: 14px 14px 18px 14px; border-top: 1px solid rgba(255, 255, 255, 0.07); margin-top: auto; }
        .dc-logout-btn { width: 100%; display: flex; align-items: center; gap: 12px; background: transparent; border: none; color: #EF4444; padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }

        .dc-main { flex: 1; margin-left: 240px; display: flex; flex-direction: column; min-width: 0; padding-bottom: 60px; }
        .dc-header { height: 64px; background: #fff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; position: sticky; top: 0; z-index: 100; }
        .dc-header-title h2 { font-size: 15.5px; font-weight: 700; color: #0f172a; }
        .dc-header-title p { font-size: 11.5px; color: #64748b; }
        .dc-header-right { display: flex; align-items: center; gap: 18px; }
        .dc-notif-btn { position: relative; width: 36px; height: 36px; border-radius: 50%; border: 1px solid #e2e8f0; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .dc-notif-badge { position: absolute; top: -3px; right: -3px; background: #ef4444; color: #fff; border-radius: 50%; width: 16px; height: 16px; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
        .dc-user-badge { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .dc-avatar { width: 38px; height: 38px; border-radius: 50%; background: ${isTeacher ? "#a7f3d0" : "#fed7aa"}; display: flex; align-items: center; justify-content: center; font-size: 18px; }

        .dc-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; max-width: 1280px; margin: 0 auto; width: 100%; }

        .dc-hero { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; }
        .dc-hero-left { display: flex; align-items: center; gap: 16px; }
        .dc-hero-icon { width: 48px; height: 48px; border-radius: 12px; background: ${isTeacher ? "#059669" : "#2563eb"}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .dc-hero-left h1 { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .dc-hero-left p { font-size: 13px; color: #64748b; }
        .dc-hero-art { font-size: 34px; }

        .dc-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .dc-metric-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px 16px; display: flex; align-items: center; gap: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .dc-metric-icon { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .dc-metric-info small { font-size: 11px; color: #64748b; font-weight: 600; display: block; margin-bottom: 2px; }
        .dc-metric-info strong { font-size: 18px; font-weight: 800; color: #0f172a; }

        .dc-grid-2col { display: grid; grid-template-columns: 1.15fr 1fr; gap: 20px; align-items: start; }
        .dc-panel { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 22px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .dc-panel-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .dc-panel-head h3 { font-size: 16px; font-weight: 700; color: #0f172a; }
        .dc-view-link { font-size: 12px; color: ${isTeacher ? "#059669" : "#2563eb"}; font-weight: 700; cursor: pointer; text-decoration: none; }

        .dc-label { font-size: 12px; font-weight: 700; color: #334155; display: block; margin-bottom: 6px; }
        .dc-select { width: 100%; padding: 10px 14px; border-radius: 9px; border: 1px solid #cbd5e1; outline: none; font-size: 13px; margin-bottom: 14px; background: #fff; }
        .dc-textarea { width: 100%; height: 115px; border-radius: 9px; border: 1px solid #cbd5e1; padding: 12px; outline: none; font-size: 13px; font-family: inherit; resize: vertical; margin-bottom: 14px; }
        .dc-file-box { border: 1.5px dashed #cbd5e1; border-radius: 9px; padding: 12px; text-align: center; font-size: 12px; color: #64748b; margin-bottom: 14px; cursor: pointer; background: #f8fafc; }
        .dc-submit-btn { width: 100%; background: ${isTeacher ? "#059669" : "#2563eb"}; color: #fff; border: none; padding: 12px; border-radius: 9px; font-size: 13px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
        .dc-submit-btn:hover { background: ${isTeacher ? "#047857" : "#1d4ed8"}; }
        .dc-form-error { color: #b91c1c; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 12px; font-size: 12px; margin-bottom: 12px; line-height: 1.5; }
        .dc-form-error a { color: #991b1b; font-weight: 700; }
        .dc-retry-btn { border: 1px solid #2563eb; background: #eff6ff; color: #1d4ed8; border-radius: 6px; padding: 5px 9px; font-size: 11px; font-weight: 700; cursor: pointer; }

        .dc-session-item { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; border-radius: 12px; border: 1px solid #f1f5f9; background: #f8fafc; margin-bottom: 10px; }
        .dc-session-left { display: flex; align-items: center; gap: 12px; }
        .dc-sub-icon-box { width: 38px; height: 38px; border-radius: 10px; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; }
        .dc-session-info h4 { font-size: 13.5px; font-weight: 700; margin-bottom: 2px; }
        .dc-session-info p { font-size: 11.5px; color: #64748b; }
        .dc-session-right { display: flex; align-items: center; gap: 10px; }
        .dc-live-tag { background: #fee2e2; color: #dc2626; font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 4px; }
        .dc-upcoming-tag { background: #fef3c7; color: #b45309; font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 4px; }
        .dc-join-btn { background: ${isTeacher ? "#059669" : "#2563eb"}; color: #fff; border: none; padding: 6px 16px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; }

        .dc-sub-tabs { display: flex; gap: 8px; margin-bottom: 14px; }
        .dc-tab-pill { border: 1px solid #e2e8f0; background: #fff; color: #475569; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; }
        .dc-tab-pill.active { background: ${isTeacher ? "#059669" : "#2563eb"}; color: #fff; border-color: ${isTeacher ? "#059669" : "#2563eb"}; }

        .dc-doubt-row { display: flex; align-items: center; justify-content: space-between; padding: 11px 12px; border-radius: 10px; border: 1px solid #f1f5f9; background: #fff; margin-bottom: 8px; cursor: pointer; transition: all 0.15s; }
        .dc-doubt-row:hover { background: #f8fafc; border-color: #cbd5e1; }
        .dc-doubt-left { display: flex; align-items: center; gap: 12px; }
        .dc-status-pill { font-size: 10.5px; font-weight: 700; padding: 3px 9px; border-radius: 6px; }
        .dc-pill-pending { background: #fef3c7; color: #b45309; }
        .dc-pill-answered { background: #dcfce7; color: #15803d; }

        .dc-resp-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; margin-bottom: 10px; cursor: pointer; transition: all 0.15s; }
        .dc-resp-card:hover { border-color: ${isTeacher ? "#059669" : "#2563eb"}; background: #eff6ff; }
        .dc-resp-card strong { font-size: 13px; color: #0f172a; display: block; margin-bottom: 4px; }
        .dc-resp-card p { font-size: 12px; color: #475569; line-height: 1.4; margin-bottom: 6px; }
        .dc-resp-card small { font-size: 10.5px; color: #94a3b8; }

        .dc-banner-bottom { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between; }

        .dc-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .dc-modal-box { background: #fff; border-radius: 16px; width: 100%; max-width: 600px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2); }
        .dc-modal-head { padding: 16px 20px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; }
        .dc-modal-body { padding: 20px; max-height: 480px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }

        @media (max-width: 1024px) {
          .dc-sidebar { display: none; }
          .dc-main { margin-left: 0; }
          .dc-grid-2col { grid-template-columns: 1fr; }
          .dc-metrics-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {isTeacher ? <TeacherSidebar onLogout={handleLogout} width={240} /> : <StudentSidebar onLogout={handleLogout} />}

      <main className="dc-main">
        <header className="dc-header">
          <div className="dc-header-title">
            <h2>Digital Learning Platform</h2>
            <p>{isTeacher ? "Educator Control Center" : "Online Learning Portal for Students"}</p>
          </div>
          <div className="dc-header-right">
            <button className="dc-notif-btn" onClick={() => navigate("/announcements")}>
              {renderSvgIcon("bell", 20, "#475569")}
              <div className="dc-notif-badge">{pendingCount}</div>
            </button>
            <div className="dc-user-badge" onClick={() => navigate("/settings")}>
              <div className="dc-avatar">{isTeacher ? "👩‍🏫" : "👩‍🎓"}</div>
              <div>
                <strong style={{ fontSize: 13, display: "block" }}>{userName}</strong>
                <span style={{ fontSize: 11, color: "#64748b" }}>{isTeacher ? `Class ${userClass}th Educator` : `Class ${userClass}`}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dc-body">
          <div className="dc-hero">
            <div className="dc-hero-left">
              <div className="dc-hero-icon">❓</div>
              <div>
                <h1>Doubt Centre</h1>
                <p>{isTeacher ? "Manage student inquiries and review answered questions." : "Ask your doubts and get instant AI tutor guidance!"}</p>
              </div>
            </div>
            <div className="dc-hero-art">🙋‍♂️👨‍🏫</div>
          </div>

          <div className="dc-metrics-grid">
            <div className="dc-metric-card">
              <div className="dc-metric-icon" style={{ background: "#fee2e2", color: "#dc2626" }}>❓</div>
              <div className="dc-metric-info">
                <small>Total Doubts</small>
                <strong>{totalAsked} Asked</strong>
              </div>
            </div>

            <div className="dc-metric-card">
              <div className="dc-metric-icon" style={{ background: "#dcfce7", color: "#15803d" }}>✓</div>
              <div className="dc-metric-info">
                <small>Answered</small>
                <strong>{answeredCount} ({answeredPercentage}%)</strong>
              </div>
            </div>

            <div className="dc-metric-card">
              <div className="dc-metric-icon" style={{ background: "#fef3c7", color: "#b45309" }}>🕒</div>
              <div className="dc-metric-info">
                <small>Pending</small>
                <strong>{pendingCount} ({pendingPercentage}%)</strong>
              </div>
            </div>

            <div className="dc-metric-card">
              <div className="dc-metric-icon" style={{ background: "#f3e8ff", color: "#9333ea" }}>⚡</div>
              <div className="dc-metric-info">
                <small>Response Speed</small>
                <strong>{avgResponseTime}</strong>
              </div>
            </div>
          </div>

          <div className="dc-grid-2col">
            <div className="dc-panel">
              <div className="dc-panel-head">
                <h3>Ask a Doubt</h3>
                <span style={{ fontSize: 11, color: "#64748b" }}>Get instant AI tutor response</span>
              </div>

              {aiServiceStatus === "missing-key" && (
                <div className="dc-form-error" role="alert">
                  Gemini AI is not configured, so questions cannot receive real AI answers yet. In the project folder, run{" "}
                  <code>Copy-Item .env.example .env</code>, add your private Gemini API key to <code>.env</code> as{" "}
                  <code>GEMINI_API_KEY=your_key</code>, then restart the app with <code>npm run dev</code>.{" "}
                  <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">Get a Gemini API key</a>.
                  Saved pending doubts can be answered using Retry AI after setup.
                </div>
              )}
              {aiServiceStatus === "unavailable" && (
                <div className="dc-form-error" role="alert">
                  The AI service is unavailable. Restart the app with <code>npm run dev</code> and try again.
                </div>
              )}
              {submissionError && <div className="dc-form-error" role="alert">{submissionError}</div>}

              <form onSubmit={handleAskDoubt}>
                <label className="dc-label">Select Subject *</label>
                <select
                  className="dc-select"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English</option>
                  <option>Social Science</option>
                  <option>Computer Science</option>
                  <option>Hindi</option>
                  <option>Telugu</option>
                </select>

                <label className="dc-label">Your Doubt *</label>
                <textarea
                  className="dc-textarea"
                  placeholder="Type your doubt here... (Be specific and clear)"
                  value={doubtText}
                  onChange={(e) => setDoubtText(e.target.value)}
                  maxLength={2000}
                  required
                ></textarea>

                <div className="dc-file-box" onClick={() => alert("File attachment ready. You can attach JPEG/PNG/PDF.")}>
                  📎 Attach Image / File (Optional - Max 5MB)
                </div>

                <button type="submit" className="dc-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Getting AI answer..." : "Ask Gemini AI"}
                </button>
              </form>
            </div>

            <div className="dc-panel">
              <div className="dc-panel-head">
                <h3>Live Doubt Sessions</h3>
                <span className="dc-view-link" onClick={() => setShowAllLiveSessionsModal(true)}>
                  View All ›
                </span>
              </div>

              {liveSessions.slice(0, 4).map((sess) => (
                <div className="dc-session-item" key={sess.id}>
                  <div className="dc-session-left">
                    <div className="dc-sub-icon-box" style={{ background: getSubjectBg(sess.subject) }}>
                      {getSubjectIcon(sess.subject)}
                    </div>
                    <div className="dc-session-info">
                      <h4>{sess.subject}</h4>
                      <p>{sess.time}</p>
                    </div>
                  </div>

                  <div className="dc-session-right">
                    {sess.isLive ? (
                      <span className="dc-live-tag">Live</span>
                    ) : (
                      <span className="dc-upcoming-tag">Upcoming</span>
                    )}
                    <button className="dc-join-btn" onClick={() => navigate("/live-classes")}>
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dc-grid-2col">
            <div className="dc-panel">
              <div className="dc-panel-head">
                <h3>My Doubts</h3>
                <span className="dc-view-link" onClick={() => setShowAllMyDoubtsModal(true)}>
                  View All ›
                </span>
              </div>

              <div className="dc-sub-tabs">
                <button
                  className={`dc-tab-pill ${myDoubtsFilter === "All" ? "active" : ""}`}
                  onClick={() => setMyDoubtsFilter("All")}
                >
                  All ({userDoubts.length})
                </button>
                <button
                  className={`dc-tab-pill ${myDoubtsFilter === "Answered" ? "active" : ""}`}
                  onClick={() => setMyDoubtsFilter("Answered")}
                >
                  Answered ({answeredCount})
                </button>
                <button
                  className={`dc-tab-pill ${myDoubtsFilter === "Pending" ? "active" : ""}`}
                  onClick={() => setMyDoubtsFilter("Pending")}
                >
                  Pending ({pendingCount})
                </button>
              </div>

              <div>
                {filteredMyDoubts.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="dc-doubt-row"
                    onClick={() => setSelectedResponseDetail(item)}
                  >
                    <div className="dc-doubt-left">
                      <div className="dc-sub-icon-box" style={{ background: getSubjectBg(item.subject), width: 34, height: 34, fontSize: 14 }}>
                        {getSubjectIcon(item.subject)}
                      </div>
                      <div>
                        <strong style={{ fontSize: 13, color: "#0F172A", display: "block" }}>{item.text}</strong>
                        <span style={{ fontSize: 11, color: "#64748B" }}>{item.subject} • {item.date}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className={`dc-status-pill ${item.status === "Answered" ? "dc-pill-answered" : "dc-pill-pending"}`}>
                        {item.status}
                      </span>
                      {item.status === "Pending" && (
                        <button
                          className="dc-retry-btn"
                          type="button"
                          disabled={isSubmitting}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleRetryAnswer(item);
                          }}
                        >
                          Retry AI
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {filteredMyDoubts.length === 0 && (
                  <div style={{ textAlign: "center", padding: "24px 0", color: "#94a3b8", fontSize: 12 }}>
                    No {myDoubtsFilter.toLowerCase()} doubts yet.
                  </div>
                )}
              </div>
            </div>

            <div className="dc-panel">
              <div className="dc-panel-head">
                <h3>AI Tutor Responses</h3>
                <span className="dc-view-link" onClick={() => setShowAllTeacherResponsesModal(true)}>
                  View All ›
                </span>
              </div>
              <p style={{ fontSize: 11, color: "#64748b", marginBottom: 12 }}>
                Instant AI guidance for your academic questions.
              </p>

              <div>
                {answeredList.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="dc-resp-card"
                    onClick={() => setSelectedResponseDetail(item)}
                  >
                    <strong>{item.teacherResponse?.teacher || "AI Tutor"} ({item.subject})</strong>
                    <p>{item.teacherResponse?.reply}</p>
                    <small>{item.teacherResponse?.time || "Recently"}</small>
                  </div>
                ))}

                {answeredList.length === 0 && (
                  <div style={{ textAlign: "center", padding: "34px 0", color: "#94a3b8", fontSize: 12 }}>
                    AI tutor answers will appear here immediately after you ask a question.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedResponseDetail && (
        <div className="dc-modal-overlay" onClick={() => setSelectedResponseDetail(null)}>
          <div className="dc-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="dc-modal-head">
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Doubt Details & Answer</h3>
              <button onClick={() => setSelectedResponseDetail(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>
            <div className="dc-modal-body">
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 14 }}>
                <span style={{ fontSize: 11, color: isTeacher ? "#059669" : "#2563eb", fontWeight: 700 }}>{selectedResponseDetail.subject}</span>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginTop: 4, color: "#0f172a" }}>"{selectedResponseDetail.text}"</h4>
                <small style={{ fontSize: 10.5, color: "#94a3b8" }}>Posted {selectedResponseDetail.date}</small>
              </div>

              {selectedResponseDetail.status === "Answered" && selectedResponseDetail.teacherResponse ? (
                <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: 10, padding: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#15803d", display: "block", marginBottom: 4 }}>
                    🤖 AI Tutor Response:
                  </span>
                  <p style={{ fontSize: 12.5, color: "#166534", lineHeight: 1.5, whiteSpace: "pre-line" }}>
                    {selectedResponseDetail.teacherResponse.reply}
                  </p>
                  <small style={{ fontSize: 10, color: "#15803d", display: "block", marginTop: 8 }}>
                    Answered {selectedResponseDetail.teacherResponse.time}
                  </small>
                </div>
              ) : (
                <div style={{ background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 10, padding: 14, color: "#92400e", fontSize: 12 }}>
                  🕒 Your doubt is waiting for an answer. Click Retry AI to fetch the solution.
                </div>
              )}

              <button
                style={{ background: isTeacher ? "#059669" : "#2563eb", color: "#fff", border: "none", padding: "10px", borderRadius: 8, fontSize: 12.5, fontWeight: 700, cursor: "pointer", marginTop: 6 }}
                onClick={() => setSelectedResponseDetail(null)}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {showAllLiveSessionsModal && (
        <div className="dc-modal-overlay" onClick={() => setShowAllLiveSessionsModal(false)}>
          <div className="dc-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="dc-modal-head">
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>All Live Doubt Sessions</h3>
              <button onClick={() => setShowAllLiveSessionsModal(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>
            <div className="dc-modal-body">
              {liveSessions.map((sess) => (
                <div className="dc-session-item" key={sess.id}>
                  <div className="dc-session-left">
                    <div className="dc-sub-icon-box" style={{ background: getSubjectBg(sess.subject) }}>
                      {getSubjectIcon(sess.subject)}
                    </div>
                    <div>
                      <h4 style={{ fontSize: 13.5, fontWeight: 700 }}>{sess.subject}</h4>
                      <p style={{ fontSize: 11.5, color: "#64748b" }}>{sess.teacher} • {sess.time}</p>
                    </div>
                  </div>
                  <button
                    className="dc-join-btn"
                    onClick={() => {
                      setShowAllLiveSessionsModal(false);
                      navigate("/live-classes");
                    }}
                  >
                    Join Session
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showAllMyDoubtsModal && (
        <div className="dc-modal-overlay" onClick={() => setShowAllMyDoubtsModal(false)}>
          <div className="dc-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="dc-modal-head">
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>All My Doubts</h3>
              <button onClick={() => setShowAllMyDoubtsModal(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>
            <div className="dc-modal-body">
              {userDoubts.map((d) => (
                <div
                  key={d.id}
                  className="dc-doubt-row"
                  onClick={() => {
                    setShowAllMyDoubtsModal(false);
                    setSelectedResponseDetail(d);
                  }}
                >
                  <div className="dc-doubt-left">
                    <div className="dc-sub-icon-box" style={{ background: getSubjectBg(d.subject), width: 34, height: 34, fontSize: 14 }}>
                      {getSubjectIcon(d.subject)}
                    </div>
                    <div>
                      <strong style={{ fontSize: 13 }}>{d.text}</strong>
                      <span style={{ fontSize: 11, color: "#64748b" }}>{d.subject} • {d.date}</span>
                    </div>
                  </div>
                  <span className={`dc-status-pill ${d.status === "Answered" ? "dc-pill-answered" : "dc-pill-pending"}`}>
                    {d.status}
                  </span>
                </div>
              ))}
              {userDoubts.length === 0 && <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 12 }}>No doubts recorded yet.</p>}
            </div>
          </div>
        </div>
      )}

      {showAllTeacherResponsesModal && (
        <div className="dc-modal-overlay" onClick={() => setShowAllTeacherResponsesModal(false)}>
          <div className="dc-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="dc-modal-head">
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>All AI Tutor Responses</h3>
              <button onClick={() => setShowAllTeacherResponsesModal(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>
            <div className="dc-modal-body">
              {answeredList.map((item) => (
                <div
                  key={item.id}
                  className="dc-resp-card"
                  onClick={() => {
                    setShowAllTeacherResponsesModal(false);
                    setSelectedResponseDetail(item);
                  }}
                >
                  <strong>{item.teacherResponse?.teacher || "AI Tutor"} ({item.subject})</strong>
                  <p>{item.teacherResponse?.reply}</p>
                  <small>{item.teacherResponse?.time || "Recently"}</small>
                </div>
              ))}
              {answeredList.length === 0 && <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 12 }}>No AI tutor answers available yet.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}