import React, { useState, useEffect } from "react";



import { useNavigate } from "react-router-dom";







export default function StudentDashboard() {



  const navigate = useNavigate();



  const [activeNav, setActiveNav] = useState("Dashboard");



  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  const [user, setUser] = useState(null);







  // Modals for Streak, Lessons, and Achievements



  const [showStreakModal, setShowStreakModal] = useState(false);



  const [showLessonsModal, setShowLessonsModal] = useState(false);



  const [showAchievementsModal, setShowAchievementsModal] = useState(false);







  // AI Agent quick input search state



  const [aiQuickQuery, setAiQuickQuery] = useState("");







  useEffect(() => {



    const rawUser = localStorage.getItem("current_user");



    if (!rawUser) {



      navigate("/student-login");



      return;



    }



    try {



      setUser(JSON.parse(rawUser));



    } catch {



      navigate("/student-login");



    }



  }, [navigate]);







  if (!user) return null;







  const handleLogout = () => {



    localStorage.removeItem("current_user");



    localStorage.removeItem("studentLoggedIn");



    navigate("/student-login");



  };







  // Dynamic calculations based on real user activity



  const progressMap = user.courseProgressMap || { math: 0, science: 0, english: 0, social: 0, computer: 0 };



  const assignmentsSubmitted = user.assignmentStatuses ? Object.values(user.assignmentStatuses).filter((s) => s === "Submitted").length : 0;



  const quizzesTaken = user.quizSubmissions ? Object.keys(user.quizSubmissions).length : 0;







  let totalQuizScore = 0;



  let quizCount = 0;



  if (user.quizSubmissions) {



    Object.values(user.quizSubmissions).forEach((sub) => {



      if (sub && sub.score) {



        totalQuizScore += parseInt(sub.score, 10);



        quizCount++;



      }



    });



  }



  const hoursStudied = Math.round((user.overallProgress || 0) * 0.15 + (quizzesTaken * 0.5));



  const videosWatched = Math.round((user.overallProgress || 0) * 0.3 + (assignmentsSubmitted * 1));







  const navLinks = [



    { id: "Dashboard", label: "Dashboard", icon: "dashboard", path: "/student-dashboard" },



    { id: "My Courses", label: "My Courses", icon: "book-open", path: "/courses" },



    { id: "Live Classes", label: "Live Classes", icon: "video", path: "/live-classes" },



    { id: "Assignments", label: "Assignments", icon: "clipboard", path: "/assignments" },



    { id: "Quizzes", label: "Quizzes", icon: "check-circle", path: "/quizzes" },



    { id: "Digital Library", label: "Digital Library", icon: "library", path: "/digital-library" },



    { id: "Notes", label: "Notes", icon: "file-text", path: "/notes" },



    { id: "Doubt Center", label: "Doubt Centre", icon: "doubt-center", path: "/doubt-centre" },



    { id: "AI Agent", label: "AI Agent", icon: "ai-agent", path: "/ai-agent" },



    { id: "Progress", label: "Progress", icon: "trending-up", path: "/progress" },



    { id: "Certificates", label: "Certificates", icon: "award", path: "/certificates" },



    { id: "Announcements", label: "Announcements", icon: "bell", path: "/announcements" },



    { id: "Help & Support", label: "Help & Support", icon: "life-buoy", path: "/help-support" },



    { id: "Settings", label: "Settings", icon: "settings", path: "/settings" },



  ];







  const quickAccessItems = [



    { label: "Digital Library", color: "#3B82F6", icon: "library", path: "/digital-library" },



    { label: "Video Classes", color: "#EF4444", icon: "video", path: "/courses" },



    { label: "Live Classes", color: "#10B981", icon: "video", path: "/live-classes" },



    { label: "Assignments", color: "#8B5CF6", icon: "clipboard", path: "/assignments" },



    { label: "Quizzes", color: "#F97316", icon: "check-circle", path: "/quizzes" },



    { label: "Notes", color: "#06B6D4", icon: "file-text", path: "/notes" },



    { label: "Doubt Center", color: "#EC4899", icon: "doubt-center", path: "/doubt-centre" },



    { label: "AI Agent", color: "#14B8A6", icon: "ai-agent", path: "/ai-agent" },



    { label: "Progress Report", color: "#22C55E", icon: "trending-up", path: "/progress" },



    { label: "Certificates", color: "#EAB308", icon: "award", path: "/certificates" },



  ];







  const courseList = [



    { name: "Mathematics", id: "math", pct: progressMap.math || 0 },



    { name: "Science", id: "science", pct: progressMap.science || 0 },



    { name: "English", id: "english", pct: progressMap.english || 0 },



    { name: "Social Studies", id: "social", pct: progressMap.social || 0 },



    { name: "Computer Basics", id: "computer", pct: progressMap.computer || 0 },



  ];







  const detailedLessons = [



    { subject: "Mathematics", completed: Math.round(((progressMap.math || 0) / 100) * 6), total: 6, chapter: "Chapter 1: Real Numbers" },



    { subject: "Science", completed: Math.round(((progressMap.science || 0) / 100) * 6), total: 6, chapter: "Chapter 1: Chemical Reactions" },



    { subject: "English", completed: Math.round(((progressMap.english || 0) / 100) * 6), total: 6, chapter: "Chapter 1: Prose & Poetry" },



    { subject: "Social Studies", completed: Math.round(((progressMap.social || 0) / 100) * 6), total: 6, chapter: "Chapter 1: Resources & Development" },



    { subject: "Computer Basics", completed: Math.round(((progressMap.computer || 0) / 100) * 6), total: 6, chapter: "Chapter 1: Introduction to Computers" },



  ];







  const daysOfWeek = [



    { day: "Mon", active: true },



    { day: "Tue", active: false },



    { day: "Wed", active: false },



    { day: "Thu", active: false },



    { day: "Fri", active: false },



    { day: "Sat", active: false },



    { day: "Sun", active: false },



  ];







  const renderSvgIcon = (name, size = 18, stroke = "currentColor") => {



    switch (name) {



      case "dashboard":



        return (



          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">



            <rect x="3" y="3" width="7" height="7" rx="2"></rect>



            <rect x="14" y="3" width="7" height="7" rx="2"></rect>



            <rect x="14" y="14" width="7" height="7" rx="2"></rect>



            <rect x="3" y="14" width="7" height="7" rx="2"></rect>



          </svg>



        );



      case "book-open":



        return (



          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">



            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>



            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>



          </svg>



        );



      case "video":



        return (



          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">



            <polygon points="23 7 16 12 23 17 23 7"></polygon>



            <rect x="1" y="5" width="15" height="14" rx="2"></rect>



          </svg>



        );



      case "clipboard":



        return (



          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">



            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>



            <rect x="8" y="2" width="8" height="4" rx="1"></rect>



          </svg>



        );



      case "check-circle":



        return (



          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">



            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>



            <polyline points="22 4 12 14.01 9 11.01"></polyline>



          </svg>



        );



      case "library":



        return (



          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">



            <rect x="4" y="2" width="16" height="20" rx="2"></rect>



            <line x1="4" y1="18" x2="20" y2="18"></line>



          </svg>



        );



      case "file-text":



        return (



          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">



            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>



            <polyline points="14 2 14 8 20 8"></polyline>



          </svg>



        );



      case "doubt-center":



        return (



          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">



            <circle cx="12" cy="12" r="10"></circle>



            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>



            <line x1="12" y1="17" x2="12.01" y2="17"></line>



          </svg>



        );



      case "ai-agent":



        return (



          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">



            <rect x="3" y="11" width="18" height="10" rx="3"></rect>



            <circle cx="12" cy="5" r="2"></circle>



            <path d="M12 7v4"></path>



            <line x1="8" y1="16" x2="8.01" y2="16"></line>



            <line x1="16" y1="16" x2="16.01" y2="16"></line>



          </svg>



        );



      case "trending-up":



        return (



          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">



            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>



          </svg>



        );



      case "award":



        return (



          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">



            <circle cx="12" cy="8" r="6"></circle>



            <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"></path>



          </svg>



        );



      case "bell":



        return (



          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">



            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>



            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>



          </svg>



        );



      case "life-buoy":



        return (



          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">



            <circle cx="12" cy="12" r="10"></circle>



            <circle cx="12" cy="12" r="4"></circle>



          </svg>



        );



      case "settings":



        return (



          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">



            <circle cx="12" cy="12" r="3"></circle>



            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 -2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>



          </svg>



        );



      case "logout":



        return (



          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">



            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>



            <polyline points="16 17 21 12 16 7"></polyline>



            <line x1="21" y1="12" x2="9" y2="12"></line>



          </svg>



        );



      default:



        return null;



    }



  };







  return (



    <div className="ps-root">



      <style>{`



        .ps-root { display: flex; min-height: 100vh; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #F8FAFC; color: #0F172A; width: 100%; }



        .ps-root * { box-sizing: border-box; margin: 0; padding: 0; }



       



        /* Premium Dark Sidebar with Subtle Glow */



        .ps-sidebar { width: 250px; background: linear-gradient(180text, #061226 0%, #081B38 100%); background-color: #081B38; color: #94A3B8; display: flex; flex-direction: column; position: fixed; top: 0; bottom: 0; left: 0; z-index: 120; box-shadow: 6px 0 30px rgba(0,0,0,0.08); }



        .ps-brand { display: flex; align-items: center; gap: 14px; padding: 24px 20px 20px 22px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }



        .ps-brand-badge { width: 42px; height: 42px; border-radius: 14px; background: linear-gradient(135deg, #3B82F6, #1D4ED8); display: flex; align-items: center; justify-content: center; font-size: 22px; color: #ffffff; box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4); }



        .ps-brand-text h2 { font-size: 15.5px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.3px; }



        .ps-brand-text p { font-size: 11.5px; color: #60A5FA; font-weight: 600; margin-top: 2px; }



       



        .ps-nav { flex: 1; overflow-y: auto; padding: 16px 12px; display: flex; flex-direction: column; gap: 4px; }



        .ps-nav-item { display: flex; align-items: center; justify-content: space-between; width: 100%; background: transparent; border: none; color: #94A3B8; padding: 11px 14px; border-radius: 12px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); text-align: left; }



        .ps-nav-item:hover { background-color: rgba(255, 255, 255, 0.08); color: #FFFFFF; transform: translateX(3px); }



        .ps-nav-item.active { background: linear-gradient(135deg, #2563EB, #1D4ED8); color: #FFFFFF; font-weight: 700; box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4); }



        .ps-nav-item-left { display: flex; align-items: center; gap: 12px; }



       



        .ps-logout-wrap { padding: 16px 16px 20px 16px; border-top: 1px solid rgba(255, 255, 255, 0.08); }



        .ps-logout-btn { width: 100%; display: flex; align-items: center; gap: 12px; background: transparent; border: none; color: #F87171; padding: 11px 14px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; }



        .ps-logout-btn:hover { background: rgba(239, 68, 68, 0.15); color: #EF4444; }







        .ps-main { flex: 1; margin-left: 250px; display: flex; flex-direction: column; min-width: 0; padding-bottom: 60px; }



       



        /* Glassmorphism Header */



        .ps-header { position: sticky; top: 0; z-index: 100; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); height: 72px; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; padding: 0 36px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); }



        .ps-header-left { display: flex; align-items: center; gap: 14px; }



        .ps-hamburger { background: none; border: none; font-size: 24px; cursor: pointer; color: #334155; display: none; }



        .ps-header-titles h1 { font-size: 16.5px; font-weight: 800; color: #0F172A; letter-spacing: -0.2px; }



        .ps-header-titles p { font-size: 12px; color: #64748B; font-weight: 500; margin-top: 1px; }



       



        .ps-header-right { display: flex; align-items: center; gap: 20px; }



        .ps-bell-button { position: relative; background: #F8FAFC; border: 1px solid #E2E8F0; width: 42px; height: 42px; border-radius: 50%; cursor: pointer; color: #475569; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }



        .ps-bell-button:hover { background: #EFF6FF; border-color: #BFDBFE; color: #2563EB; transform: scale(1.05); }



        .ps-bell-dot { position: absolute; top: -2px; right: -2px; width: 18px; height: 18px; border-radius: 50%; background: #EF4444; color: #FFFFFF; font-size: 10px; font-weight: 900; display: flex; align-items: center; justify-content: center; border: 2px solid #FFFFFF; box-shadow: 0 2px 5px rgba(239,68,68,0.4); }



       



        .ps-profile-chip { display: flex; align-items: center; gap: 12px; cursor: pointer; background: #F8FAFC; padding: 6px 14px 6px 6px; border-radius: 99px; border: 1px solid #E2E8F0; transition: all 0.2s; }



        .ps-profile-chip:hover { border-color: #93C5FD; box-shadow: 0 4px 12px rgba(37,99,235,0.08); }



        .ps-avatar-circle { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #FED7AA, #FB923C); display: flex; align-items: center; justify-content: center; font-size: 19px; box-shadow: 0 3px 10px rgba(251,146,60,0.3); }



        .ps-profile-text strong { display: block; font-size: 13.5px; font-weight: 800; color: #0F172A; }



        .ps-profile-text span { font-size: 11px; color: #64748B; font-weight: 600; }







        .ps-content { padding: 32px 36px; display: flex; flex-direction: column; gap: 26px; max-width: 1400px; margin: 0 auto; width: 100%; }



       



        /* Ultra-Modern Bento Welcome Banner */



        .ps-banner { background: linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #3B82F6 100%); border-radius: 24px; padding: 32px 36px; position: relative; overflow: hidden; box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.35); color: #FFFFFF; }



        .ps-banner::before { content: ""; position: absolute; right: -50px; top: -50px; width: 280px; height: 280px; background: rgba(255, 255, 255, 0.08); border-radius: 50%; pointer-events: none; }



        .ps-banner::after { content: ""; position: absolute; right: 100px; bottom: -80px; width: 200px; height: 200px; background: rgba(255, 255, 255, 0.05); border-radius: 50%; pointer-events: none; }



        .ps-banner-title { font-size: 24px; font-weight: 900; display: flex; align-items: center; gap: 12px; margin-bottom: 6px; letter-spacing: -0.3px; }



        .ps-banner-desc { font-size: 14px; color: rgba(255, 255, 255, 0.85); margin-bottom: 24px; font-weight: 500; }



        .ps-banner-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }



        .ps-meta-card { background: rgba(255, 255, 255, 0.12); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border-radius: 16px; padding: 14px 18px; display: flex; align-items: center; gap: 16px; border: 1px solid rgba(255, 255, 255, 0.22); transition: all 0.25s ease; }



        .ps-meta-card:hover { transform: translateY(-3px); background: rgba(255, 255, 255, 0.18); box-shadow: 0 8px 20px rgba(0,0,0,0.1); }



        .ps-meta-label { font-size: 10px; color: rgba(255, 255, 255, 0.75); text-transform: uppercase; font-weight: 800; letter-spacing: 0.6px; }



        .ps-meta-value { font-size: 14.5px; font-weight: 900; color: #FFFFFF; }







        .ps-title-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }



        .ps-sec-heading { font-size: 17px; font-weight: 800; color: #0F172A; letter-spacing: -0.3px; }



        .ps-view-link { font-size: 13px; color: #2563EB; font-weight: 700; background: none; border: none; cursor: pointer; transition: color 0.15s; }



        .ps-view-link:hover { color: #1D4ED8; text-decoration: underline; }







        /* Bento Grid Metrics Cards */



        .ps-metrics-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 18px; }



        .ps-stat-card { background: #FFFFFF; border-radius: 20px; border: 1px solid #E2E8F0; padding: 20px 14px; display: flex; flex-direction: column; align-items: center; text-align: center; cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 16px rgba(0,0,0,0.02); }



        .ps-stat-card:hover { transform: translateY(-5px); box-shadow: 0 16px 30px -8px rgba(37, 99, 235, 0.15); border-color: #93C5FD; }



        .ps-stat-top { font-size: 12px; color: #64748B; font-weight: 700; margin-bottom: 12px; }



        .ps-donut-wrap { position: relative; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; }



        .ps-donut-text { font-size: 14.5px; font-weight: 900; color: #0F172A; position: absolute; }



        .ps-donut-footer { font-size: 11px; font-weight: 800; color: #16A34A; margin-top: 10px; }



        .ps-icon-square { width: 46px; height: 46px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 21px; margin-bottom: 10px; box-shadow: 0 6px 14px rgba(0,0,0,0.06); }



        .ps-stat-number { font-size: 19px; font-weight: 900; color: #0F172A; }



        .ps-stat-sub { font-size: 11.5px; color: #94A3B8; font-weight: 700; margin-top: 6px; }







        /* Quick Access Bento Grid */



        .ps-quick-grid { display: grid; grid-template-columns: repeat(10, 1fr); gap: 14px; }



        .ps-quick-box { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 18px; padding: 16px 8px; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 2px 10px rgba(0,0,0,0.02); }



        .ps-quick-box:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgba(37,99,235,0.12); border-color: #93C5FD; background: #FAFAFA; }



        .ps-quick-icon-wrap { width: 46px; height: 46px; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; margin-bottom: 10px; box-shadow: 0 6px 14px rgba(0,0,0,0.1); }



        .ps-quick-name { font-size: 11px; font-weight: 700; color: #334155; text-align: center; }







        /* Bento Grid Panels */



        .ps-card-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }



        .ps-panel { background: #FFFFFF; border-radius: 24px; border: 1px solid #E2E8F0; padding: 24px 26px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 6px 20px rgba(0,0,0,0.025); transition: all 0.2s ease; }



        .ps-panel:hover { border-color: #CBD5E1; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }



       



        .ps-lesson-badge { display: flex; align-items: center; gap: 14px; margin: 14px 0 16px 0; cursor: pointer; padding: 12px; background: #F8FAFC; border-radius: 14px; border: 1px solid #F1F5F9; transition: all 0.15s; }



        .ps-lesson-badge:hover { background: #F1F5F9; border-color: #E2E8F0; transform: translateY(-1px); }



        .ps-lesson-icon { width: 50px; height: 50px; background: #DCFCE7; color: #059669; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.15); }



        .ps-lesson-name { font-size: 15px; font-weight: 800; color: #0F172A; }



        .ps-lesson-ch { font-size: 12.5px; color: #64748B; font-weight: 500; margin-top: 2px; }



       



        .ps-track { width: 100%; height: 9px; background: #F1F5F9; border-radius: 99px; overflow: hidden; margin: 6px 0 18px 0; }



        .ps-track-fill { height: 100%; background: linear-gradient(90deg, #2563EB, #3B82F6); border-radius: 99px; transition: width 0.6s ease; }



       



        .ps-btn-blue { width: 100%; background: linear-gradient(135deg, #2563EB, #1D4ED8); color: #FFFFFF; border: none; padding: 12px; border-radius: 14px; font-size: 14px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 6px 18px rgba(37, 99, 235, 0.35); transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }



        .ps-btn-blue:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(37, 99, 235, 0.45); }



       



        .ps-sched-items { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; }



        .ps-sched-cell { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-radius: 12px; border: 1px solid #F1F5F9; background: #FAFAFA; cursor: pointer; transition: all 0.15s; }



        .ps-sched-cell:hover { background: #F8FAFC; border-color: #CBD5E1; transform: translateX(3px); }



        .ps-sched-left { display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 700; }



       



        .ps-status-pill { font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; }



        .ps-pill-blue { background: #DBEAFE; color: #1D4ED8; }



        .ps-pill-yellow { background: #FEF3C7; color: #B45309; }



        .ps-pill-green { background: #DCFCE7; color: #15803D; }







        .ps-course-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-bottom: 1px solid #F1F5F9; border-radius: 10px; transition: background 0.15s; }



        .ps-course-item:hover { background: #F8FAFC; }







        /* Bento Grid Ref Rows */



        .ps-grid-ref { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 24px; }



        .ps-sub-list-mini { display: flex; flex-direction: column; gap: 14px; }



        .ps-sub-progress-row { display: flex; flex-direction: column; gap: 6px; }



        .ps-sub-progress-info { display: flex; justify-content: space-between; font-size: 13px; font-weight: 800; color: #334155; }



        .ps-bar-bg { width: 100%; height: 8px; background: #E2E8F0; border-radius: 99px; overflow: hidden; }



        .ps-bar-fill { height: 100%; border-radius: 99px; transition: width 0.6s ease; }



       



        .ps-achieve-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; text-align: center; margin-top: 16px; }



        .ps-achieve-badge { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 14px 6px; display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }



        .ps-achieve-badge:hover { transform: translateY(-3px); border-color: #2563EB; background: #EFF6FF; box-shadow: 0 6px 16px rgba(37,99,235,0.15); }







        /* Modal Overlay & Box */



        .ps-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 250; display: flex; align-items: center; justify-content: center; padding: 20px; }



        .ps-modal-box { background: #FFFFFF; border-radius: 24px; width: 100%; max-width: 540px; overflow: hidden; box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.3); animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1); }



        @keyframes modalPop { from { opacity: 0; transform: scale(0.92) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }



        .ps-modal-header { padding: 20px 26px; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; background: #FAFAFA; }



        .ps-modal-body { padding: 26px; }







        @media (max-width: 1024px) {



          .ps-sidebar { transform: translateX(-100%); }



          .ps-main { margin-left: 0; padding-bottom: 75px; }



          .ps-hamburger { display: block; }



          .ps-metrics-grid { grid-template-columns: repeat(3, 1fr); }



          .ps-quick-grid { grid-template-columns: repeat(5, 1fr); }



          .ps-card-row { grid-template-columns: 1fr; }



          .ps-grid-ref { grid-template-columns: 1fr; }



          .ps-banner-cards { grid-template-columns: repeat(2, 1fr); }



        }



      `}</style>







      {/* SIDEBAR */}



      <aside className={`ps-sidebar ${mobileMenuOpen ? "open" : ""}`}>



        <div className="ps-brand">



          <div className="ps-brand-badge">🎓</div>



          <div className="ps-brand-text">



            <h2>Smart Education</h2>



            <p>{user.school || "Smart Learning Portal"}</p>



          </div>



        </div>







        <nav className="ps-nav">



          {navLinks.map((item) => (



            <button



              key={item.id}



              onClick={() => {



                setActiveNav(item.id);



                setMobileMenuOpen(false);



                if (item.path) navigate(item.path);



              }}



              className={`ps-nav-item ${activeNav === item.id ? "active" : ""}`}



            >



              <div className="ps-nav-item-left">



                {renderSvgIcon(item.icon, 18, activeNav === item.id ? "#FFFFFF" : "#94A3B8")}



                <span>{item.label}</span>



              </div>



            </button>



          ))}



        </nav>







        <div className="ps-logout-wrap">



          <button onClick={handleLogout} className="ps-logout-btn">



            {renderSvgIcon("logout", 18, "#EF4444")}



            <span>Logout</span>



          </button>



        </div>



      </aside>







      {/* MAIN CONTAINER */}



      <div className="ps-main">



        <header className="ps-header">



          <div className="ps-header-left">



            <button className="ps-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>



              ☰



            </button>



            <div className="ps-header-titles">



              <h1>Digital Learning Platform</h1>



              <p>Online Learning Portal for Students</p>



            </div>



          </div>







          <div className="ps-header-right">



            <button



              className="ps-bell-button"



              onClick={() => navigate("/announcements")}



              title="View Announcements"



            >



              {renderSvgIcon("bell", 20, "#475569")}



              <div className="ps-bell-dot">3</div>



            </button>







            <div className="ps-profile-chip" onClick={() => navigate("/settings")}>



              <div className="ps-avatar-circle">👩‍🎓</div>



              <div className="ps-profile-text">



                <strong>{user.name}</strong>



                <span>Class {user.class}th</span>



              </div>



            </div>



          </div>



        </header>







        <div className="ps-content">



          {/* User Welcome Banner with Premium Gradient */}



          <section className="ps-banner">



            <div className="ps-banner-title">



              <span>👋</span>



              <span>Welcome back, {user.name}!</span>



            </div>



            <p className="ps-banner-desc">Keep learning, keep growing. You're doing great today!</p>







            <div className="ps-banner-cards">



              <div className="ps-meta-card">



                <span style={{ fontSize: 20 }}>🆔</span>



                <div>



                  <div className="ps-meta-label">Student ID</div>



                  <div className="ps-meta-value">{user.id}</div>



                </div>



              </div>







              <div className="ps-meta-card">



                <span style={{ fontSize: 20 }}>🏫</span>



                <div>



                  <div className="ps-meta-label">School</div>



                  <div className="ps-meta-value">{user.school}</div>



                </div>



              </div>







              <div className="ps-meta-card">



                <span style={{ fontSize: 20 }}>🎓</span>



                <div>



                  <div className="ps-meta-label">Class</div>



                  <div className="ps-meta-value">{user.class}th</div>



                </div>



              </div>







              <div className="ps-meta-card">



                <span style={{ fontSize: 20 }}>📖</span>



                <div>



                  <div className="ps-meta-label">Medium</div>



                  <div className="ps-meta-value">English</div>



                </div>



              </div>



            </div>



          </section>







          {/* User Progress Overview */}



          <section>



            <div className="ps-title-row">



              <h3 className="ps-sec-heading">Progress Overview</h3>



            </div>







            <div className="ps-metrics-grid">



              <div className="ps-stat-card" onClick={() => navigate("/progress")}>



                <span className="ps-stat-top">Overall Progress</span>



                <div className="ps-donut-wrap">



                  <svg width="60" height="60" viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>



                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F1F5F9" strokeWidth="3.6" />



                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#2563EB" strokeWidth="3.6" strokeDasharray={`${user.overallProgress || 0} ${100 - (user.overallProgress || 0)}`} strokeLinecap="round" />



                  </svg>



                  <span className="ps-donut-text">{user.overallProgress || 0}%</span>



                </div>



                <span className="ps-donut-footer">Active Learner</span>



              </div>







              <div className="ps-stat-card" onClick={() => navigate("/courses")}>



                <span className="ps-stat-top">Courses Completed</span>



                <div className="ps-icon-square" style={{ background: "#DCFCE7", color: "#15803D" }}>📖</div>



                <span className="ps-stat-number">{user.coursesCompleted || "0/5"}</span>



                <span className="ps-stat-sub">Courses</span>



              </div>







              <div className="ps-stat-card" onClick={() => setShowLessonsModal(true)}>



                <span className="ps-stat-top">Lessons Completed</span>



                <div className="ps-icon-square" style={{ background: "#F3E8FF", color: "#9333EA" }}>🗂️</div>



                <span className="ps-stat-number">{user.lessonsCompleted || "0/30"}</span>



                <span className="ps-stat-sub" style={{ color: "#9333EA", fontWeight: 800 }}>Click to View ›</span>



              </div>







              <div className="ps-stat-card" onClick={() => navigate("/quizzes")}>



                <span className="ps-stat-top">Quiz Score</span>



                <div className="ps-icon-square" style={{ background: "#FFEDD5", color: "#EA580C" }}>🎯</div>



                <span className="ps-stat-number">{user.quizScore || "0%"}</span>



                <span className="ps-stat-sub">Average</span>



              </div>







              <div className="ps-stat-card" onClick={() => setShowStreakModal(true)}>



                <span className="ps-stat-top">Study Streak</span>



                <div className="ps-icon-square" style={{ background: "#FEF3C7", color: "#D97706" }}>🔥</div>



                <span className="ps-stat-number">{user.studyStreak || 1}</span>



                <span className="ps-stat-sub" style={{ color: "#D97706", fontWeight: 800 }}>Click to View ›</span>



              </div>







              <div className="ps-stat-card" onClick={() => navigate("/certificates")}>



                <span className="ps-stat-top">Certificates Earned</span>



                <div className="ps-icon-square" style={{ background: "#FEF9C3", color: "#CA8A04" }}>⭐</div>



                <span className="ps-stat-number">{user.certificatesCount || 0}</span>



                <span className="ps-stat-sub">Certificates</span>



              </div>



            </div>



          </section>







          {/* Quick Access Bento Grid */}



          <section>



            <div className="ps-title-row">



              <h3 className="ps-sec-heading">Quick Access</h3>



            </div>







            <div className="ps-quick-grid">



              {quickAccessItems.map((item, idx) => (



                <button



                  key={idx}



                  type="button"



                  className="ps-quick-box"



                  onClick={() => {



                    if (item.path) navigate(item.path);



                  }}



                >



                  <div className="ps-quick-icon-wrap" style={{ backgroundColor: item.color }}>



                    {renderSvgIcon(item.icon, 20, "#FFFFFF")}



                  </div>



                  <span className="ps-quick-name">{item.label}</span>



                </button>



              ))}



            </div>



          </section>







          {/* Card Row 1 */}



          <div className="ps-card-row">



            {/* Continue Learning */}



            <div className="ps-panel">



              <div>



                <div className="ps-title-row" style={{ marginBottom: 0 }}>



                  <h3 className="ps-sec-heading">Continue Learning</h3>



                  <button className="ps-view-link" onClick={() => navigate("/courses")}>



                    View All →



                  </button>



                </div>







                <div className="ps-lesson-badge" onClick={() => navigate("/courses")}>



                  <div className="ps-lesson-icon">📚</div>



                  <div>



                    <div className="ps-lesson-name">Mathematics</div>



                    <div className="ps-lesson-ch">{user.enrolledCourses?.[0]?.currentLesson || "Chapter 1: Real Numbers"}</div>



                  </div>



                </div>







                <div className="ps-track">



                  <div className="ps-track-fill" style={{ width: `${user.courseProgressMap?.math || 0}%` }}></div>



                </div>



              </div>







              <button className="ps-btn-blue" onClick={() => navigate("/courses")}>



                <span>▶</span>



                <span>{user.overallProgress > 0 ? "Continue Learning" : "Start Learning"}</span>



              </button>



            </div>







            {/* Today's Schedule */}



            <div className="ps-panel">



              <div>



                <div className="ps-title-row" style={{ marginBottom: 2 }}>



                  <h3 className="ps-sec-heading">Today's Schedule</h3>



                  <button className="ps-view-link" onClick={() => navigate("/live-classes")}>



                    View Calendar →



                  </button>



                </div>



                <p style={{ fontSize: 11.5, color: "#94A3B8", marginBottom: 12, fontWeight: 700 }}>Active Semester</p>







                <div className="ps-sched-items">



                  <div className="ps-sched-cell" onClick={() => navigate("/live-classes")}>



                    <div className="ps-sched-left">



                      <span>🕒</span>



                      <div>



                        <div style={{ fontSize: 10, color: "#94A3B8" }}>09:00 AM</div>



                        <div>Mathematics Live Class</div>



                      </div>



                    </div>



                    <span className="ps-status-pill ps-pill-blue">Live</span>



                  </div>







                  <div className="ps-sched-cell" onClick={() => navigate("/quizzes")}>



                    <div className="ps-sched-left">



                      <span>🕒</span>



                      <div>



                        <div style={{ fontSize: 10, color: "#94A3B8" }}>11:00 AM</div>



                        <div>Science Weekly Quiz</div>



                      </div>



                    </div>



                    <span className="ps-status-pill ps-pill-yellow">Quiz</span>



                  </div>







                  <div className="ps-sched-cell" onClick={() => navigate("/assignments")}>



                    <div className="ps-sched-left">



                      <span>🕒</span>



                      <div>



                        <div style={{ fontSize: 10, color: "#94A3B8" }}>02:00 PM</div>



                        <div>English Assignment Due</div>



                      </div>



                    </div>



                    <span className="ps-status-pill ps-pill-green">Assignment</span>



                  </div>



                </div>



              </div>







              <button className="ps-btn-blue" onClick={() => navigate("/live-classes")}>



                Join Live Class



              </button>



            </div>







            {/* Recent Announcements */}



            <div className="ps-panel">



              <div className="ps-title-row">



                <h3 className="ps-sec-heading">Recent Announcements</h3>



                <button className="ps-view-link" onClick={() => navigate("/announcements")}>



                  View All →



                </button>



              </div>







              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>



                <div style={{ padding: "8px 0", borderBottom: "1px solid #F8FAFC", cursor: "pointer" }} onClick={() => navigate("/announcements")}>



                  <strong style={{ fontSize: 13, color: "#0F172A", display: "block" }}>New Mathematics Notes Uploaded</strong>



                  <span style={{ fontSize: 11, color: "#64748B" }}>09 June 2024</span>



                </div>



                <div style={{ padding: "8px 0", borderBottom: "1px solid #F8FAFC", cursor: "pointer" }} onClick={() => navigate("/announcements")}>



                  <strong style={{ fontSize: 13, color: "#0F172A", display: "block" }}>Live Class on Science at 4 PM</strong>



                  <span style={{ fontSize: 11, color: "#64748B" }}>09 June 2024</span>



                </div>



                <div style={{ padding: "8px 0", cursor: "pointer" }} onClick={() => navigate("/announcements")}>



                  <strong style={{ fontSize: 13, color: "#0F172A", display: "block" }}>Quiz on English Grammar Tomorrow</strong>



                  <span style={{ fontSize: 11, color: "#64748B" }}>09 June 2024</span>



                </div>



              </div>







              <button className="ps-btn-blue" style={{ marginTop: 12 }} onClick={() => navigate("/announcements")}>



                See All Announcements



              </button>



            </div>



          </div>







          {/* Card Row 2: Doubt Center & AI Agent & Learning Stats */}



          <div className="ps-grid-ref">



            {/* Doubt Center Widget */}



            <div className="ps-panel">



              <div className="ps-title-row">



                <h3 className="ps-sec-heading">Doubt Center</h3>



                <button className="ps-view-link" onClick={() => navigate("/doubt-centre")}>View All →</button>



              </div>



              <p style={{ fontSize: 12.5, color: "#64748B", marginBottom: 14 }}>Stuck on a topic? Ask your doubt.</p>



             



              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>



                <div className="ps-sched-cell" onClick={() => navigate("/doubt-centre")}>



                  <span style={{ fontSize: 13, fontWeight: 700 }}>❓ Ask a Doubt</span>



                  <span style={{ fontSize: 11, color: "#64748B" }}>Get help</span>



                </div>



                <div className="ps-sched-cell" onClick={() => navigate("/doubt-centre")}>



                  <span style={{ fontSize: 13, fontWeight: 700 }}>📋 My Doubts</span>



                  <span style={{ fontSize: 11, color: "#64748B" }}>Track status</span>



                </div>



                <div className="ps-sched-cell" onClick={() => navigate("/doubt-centre")}>



                  <span style={{ fontSize: 13, fontWeight: 700 }}>💬 Live Doubt Sessions</span>



                  <span style={{ fontSize: 11, color: "#64748B" }}>Join live</span>



                </div>



              </div>







              <button className="ps-btn-blue" style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)" }} onClick={() => navigate("/doubt-centre")}>



                Ask a Doubt Now



              </button>



            </div>







            {/* AI Agent Quick Widget */}



            <div className="ps-panel">



              <div className="ps-title-row">



                <h3 className="ps-sec-heading">AI Agent</h3>



                <span style={{ fontSize: 10, background: "#DCFCE7", color: "#15803D", padding: "3px 8px", borderRadius: 6, fontWeight: 800 }}>New</span>



              </div>



              <p style={{ fontSize: 12.5, color: "#64748B", marginBottom: 12 }}>Your 24x7 AI Learning Assistant</p>







              <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 14, padding: 12, marginBottom: 14 }}>



                <strong style={{ fontSize: 13, display: "block", marginBottom: 2, color: "#0F172A" }}>Hi {user.name}! 👋</strong>



                <p style={{ fontSize: 12, color: "#64748B" }}>Type your question below for an instant AI response:</p>



              </div>







              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>



                <input



                  type="text"



                  placeholder="Ask a question..."



                  value={aiQuickQuery}



                  onChange={(e) => setAiQuickQuery(e.target.value)}



                  onKeyDown={(e) => {



                    if (e.key === "Enter" && aiQuickQuery.trim()) {



                      navigate("/ai-agent");



                    }



                  }}



                  style={{ flex: 1, padding: "9px 12px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "12.5px", outline: "none" }}



                />



                <button



                  onClick={() => {



                    if (aiQuickQuery.trim()) navigate("/ai-agent");



                  }}



                  style={{ background: "#2563EB", color: "#FFF", border: "none", padding: "9px 16px", borderRadius: "10px", fontSize: "12.5px", fontWeight: 700, cursor: "pointer" }}



                >



                  Ask



                </button>



              </div>







              <button className="ps-btn-blue" style={{ background: "linear-gradient(135deg, #10B981, #059669)" }} onClick={() => navigate("/ai-agent")}>



                Open Full AI Chat Room



              </button>



            </div>







            {/* Learning Statistics & Progress by Subject */}



            <div className="ps-panel">



              <div className="ps-title-row">



                <h3 className="ps-sec-heading">Learning Statistics</h3>



                <span style={{ fontSize: 11.5, color: "#64748B", fontWeight: 700 }}>This Week ▾</span>



              </div>







              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, textAlign: "center", marginBottom: 16 }}>



                <div style={{ background: "#F8FAFC", padding: "10px 4px", borderRadius: 12, border: "1px solid #F1F5F9" }}>



                  <span style={{ fontSize: 15, display: "block" }}>⏰</span>



                  <strong style={{ fontSize: 13.5, display: "block", fontWeight: 900 }}>{hoursStudied}</strong>



                  <span style={{ fontSize: 9.5, color: "#64748B", fontWeight: 700 }}>Hours</span>



                </div>



                <div style={{ background: "#F8FAFC", padding: "10px 4px", borderRadius: 12, border: "1px solid #F1F5F9" }}>



                  <span style={{ fontSize: 15, display: "block" }}>▶️</span>



                  <strong style={{ fontSize: 13.5, display: "block", fontWeight: 900 }}>{videosWatched}</strong>



                  <span style={{ fontSize: 9.5, color: "#64748B", fontWeight: 700 }}>Videos</span>



                </div>



                <div style={{ background: "#F8FAFC", padding: "10px 4px", borderRadius: 12, border: "1px solid #F1F5F9" }}>



                  <span style={{ fontSize: 15, display: "block" }}>📋</span>



                  <strong style={{ fontSize: 13.5, display: "block", fontWeight: 900 }}>{assignmentsSubmitted}</strong>



                  <span style={{ fontSize: 9.5, color: "#64748B", fontWeight: 700 }}>Done</span>



                </div>



                <div style={{ background: "#F8FAFC", padding: "10px 4px", borderRadius: 12, border: "1px solid #F1F5F9" }}>



                  <span style={{ fontSize: 15, display: "block" }}>🎯</span>



                  <strong style={{ fontSize: 13.5, display: "block", fontWeight: 900 }}>{quizzesTaken}</strong>



                  <span style={{ fontSize: 9.5, color: "#64748B", fontWeight: 700 }}>Quizzes</span>



                </div>



              </div>







              <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 12 }}>



                <span style={{ fontSize: 12, fontWeight: 800, color: "#64748B", display: "block", marginBottom: 10 }}>Progress by Subject</span>



                <div className="ps-sub-list-mini">



                  {courseList.slice(0, 3).map((sub, i) => (



                    <div key={i} className="ps-sub-progress-row">



                      <div className="ps-sub-progress-info">



                        <span>{sub.name}</span>



                        <span>{sub.pct}%</span>



                      </div>



                      <div className="ps-bar-bg">



                        <div className="ps-bar-fill" style={{ width: `${sub.pct}%`, backgroundColor: i === 0 ? "#2563EB" : i === 1 ? "#10B981" : "#8B5CF6" }}></div>



                      </div>



                    </div>



                  ))}



                </div>



              </div>



            </div>



          </div>







          {/* Card Row 3: My Courses & Upcoming Assignments & Achievements */}



          <div className="ps-grid-ref">



            {/* My Courses Catalog Widget */}



            <div className="ps-panel">



              <div className="ps-title-row">



                <h3 className="ps-sec-heading">My Courses</h3>



                <button className="ps-view-link" onClick={() => navigate("/courses")}>View All →</button>



              </div>



              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>



                {courseList.map((c, idx) => (



                  <div key={idx} className="ps-course-item" onClick={() => navigate("/courses")} style={{ cursor: "pointer" }}>



                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>



                      <span>📖</span>



                      <strong style={{ fontSize: 13, fontWeight: 700 }}>{c.name}</strong>



                    </div>



                    <span style={{ fontSize: 12, fontWeight: 800, color: "#1E60F8" }}>{c.pct > 0 ? `${c.pct}%` : "Start"}</span>



                  </div>



                ))}



              </div>



              <button className="ps-btn-blue" style={{ marginTop: 14 }} onClick={() => navigate("/courses")}>Open Courses</button>



            </div>







            {/* Upcoming Assignments */}



            <div className="ps-panel">



              <div className="ps-title-row">



                <h3 className="ps-sec-heading">Upcoming Assignments</h3>



                <button className="ps-view-link" onClick={() => navigate("/assignments")}>View All →</button>



              </div>



              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>



                <div className="ps-sched-cell" onClick={() => navigate("/assignments")}>



                  <div>



                    <strong style={{ fontSize: 13, display: "block", fontWeight: 700 }}>Mathematics</strong>



                    <span style={{ fontSize: 11, color: "#64748B" }}>Due: 15 July 2024</span>



                  </div>



                  <span className="ps-status-pill ps-pill-yellow">Pending</span>



                </div>



                <div className="ps-sched-cell" onClick={() => navigate("/assignments")}>



                  <div>



                    <strong style={{ fontSize: 13, display: "block", fontWeight: 700 }}>English</strong>



                    <span style={{ fontSize: 11, color: "#64748B" }}>Due: 17 July 2024</span>



                  </div>



                  <span className="ps-status-pill ps-pill-green">Submitted</span>



                </div>



                <div className="ps-sched-cell" onClick={() => navigate("/assignments")}>



                  <div>



                    <strong style={{ fontSize: 13, display: "block", fontWeight: 700 }}>Science</strong>



                    <span style={{ fontSize: 11, color: "#64748B" }}>Due: 18 July 2024</span>



                  </div>



                  <span className="ps-status-pill ps-pill-yellow">Pending</span>



                </div>



              </div>



              <button className="ps-btn-blue" style={{ marginTop: 14 }} onClick={() => navigate("/assignments")}>View All Assignments</button>



            </div>







            {/* Achievements Badges (Interactive Modal Trigger) */}



            <div className="ps-panel">



              <div className="ps-title-row">



                <h3 className="ps-sec-heading">Achievements</h3>



                <button className="ps-view-link" onClick={() => setShowAchievementsModal(true)}>View All →</button>



              </div>



              <p style={{ fontSize: 12, color: "#64748B", marginBottom: 4, fontWeight: 500 }}>Click badges for milestone perks.</p>







              <div className="ps-achieve-grid">



                <div className="ps-achieve-badge" onClick={() => setShowAchievementsModal(true)} title="Unlocked: 7-Day Streak">



                  <span style={{ fontSize: 20 }}>🔥</span>



                  <span style={{ fontSize: 10, fontWeight: 800 }}>7-Day Streak</span>



                </div>



                <div className="ps-achieve-badge" onClick={() => setShowAchievementsModal(true)} title="Unlocked: Quiz Champ">



                  <span style={{ fontSize: 20 }}>🏆</span>



                  <span style={{ fontSize: 10, fontWeight: 800 }}>Quiz Champ</span>



                </div>



                <div className="ps-achieve-badge" onClick={() => setShowAchievementsModal(true)} title="Unlocked: Top Performer">



                  <span style={{ fontSize: 20 }}>⭐</span>



                  <span style={{ fontSize: 10, fontWeight: 800 }}>Top Star</span>



                </div>



                <div className="ps-achieve-badge" onClick={() => setShowAchievementsModal(true)} title="Unlocked: First Course">



                  <span style={{ fontSize: 20 }}>📜</span>



                  <span style={{ fontSize: 10, fontWeight: 800 }}>First Course</span>



                </div>



                <div className="ps-achieve-badge" onClick={() => setShowAchievementsModal(true)} title="Unlocked: Consistent Learner">



                  <span style={{ fontSize: 20 }}>🛡️</span>



                  <span style={{ fontSize: 10, fontWeight: 800 }}>Consistent</span>



                </div>



              </div>







              <button className="ps-btn-blue" style={{ marginTop: 16 }} onClick={() => navigate("/certificates")}>



                View Certificates ({user.certificatesCount || 0})



              </button>



            </div>



          </div>



        </div>



      </div>







      {/* Streak Modal */}



      {showStreakModal && (



        <div className="ps-modal-overlay" onClick={() => setShowStreakModal(false)}>



          <div className="ps-modal-box" onClick={(e) => e.stopPropagation()}>



            <div className="ps-modal-header">



              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>



                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FEF3C7", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>



                  🔥



                </div>



                <div>



                  <h3 style={{ fontSize: 15.5, fontWeight: 800 }}>Study Streak Details</h3>



                  <span style={{ fontSize: 11.5, color: "#64748B" }}>Keep your learning habits consistent!</span>



                </div>



              </div>



              <button onClick={() => setShowStreakModal(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#64748B" }}>✕</button>



            </div>



            <div className="ps-modal-body">



              <div style={{ textAlign: "center", padding: "20px 0", background: "linear-gradient(180deg, #FFFBEB 0%, #FEF3C7 100%)", borderRadius: 16, marginBottom: 18, border: "1px solid #FDE68A" }}>



                <span style={{ fontSize: 44, display: "block" }}>🔥</span>



                <strong style={{ fontSize: 26, fontWeight: 900, color: "#92400E" }}>{user.studyStreak || 1} Day Streak</strong>



                <p style={{ fontSize: 12.5, color: "#B45309", marginTop: 4, fontWeight: 600 }}>You have logged in and studied today. Great dedication!</p>



              </div>







              <h4 style={{ fontSize: 12.5, fontWeight: 800, color: "#334155", marginBottom: 10 }}>This Week's Activity:</h4>



              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, textAlign: "center", marginBottom: 20 }}>



                {daysOfWeek.map((d, index) => (



                  <div key={index} style={{ padding: "10px 4px", borderRadius: 10, background: d.active ? "#DCFCE7" : "#F1F5F9", border: d.active ? "1px solid #86EFAC" : "1px solid #E2E8F0" }}>



                    <span style={{ fontSize: 10, fontWeight: 800, color: d.active ? "#15803D" : "#64748B", display: "block" }}>{d.day}</span>



                    <span style={{ fontSize: 14 }}>{d.active ? "✅" : "⚪"}</span>



                  </div>



                ))}



              </div>







              <button className="ps-btn-blue" onClick={() => { setShowStreakModal(false); navigate("/courses"); }}>



                Start Today's Lesson



              </button>



            </div>



          </div>



        </div>



      )}







      {/* Lessons Modal */}



      {showLessonsModal && (



        <div className="ps-modal-overlay" onClick={() => setShowLessonsModal(false)}>



          <div className="ps-modal-box" onClick={(e) => e.stopPropagation()}>



            <div className="ps-modal-header">



              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>



                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F3E8FF", color: "#9333EA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>



                  🗂️



                </div>



                <div>



                  <h3 style={{ fontSize: 15.5, fontWeight: 800 }}>Lessons Completed Breakdown</h3>



                  <span style={{ fontSize: 11.5, color: "#64748B" }}>Overall Progress: {user.lessonsCompleted || "0/30"} Lessons</span>



                </div>



              </div>



              <button onClick={() => setShowLessonsModal(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#64748B" }}>✕</button>



            </div>



            <div className="ps-modal-body">



              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 300, overflowY: "auto", marginBottom: 20 }}>



                {detailedLessons.map((item, idx) => (



                  <div key={idx} style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid #E2E8F0", background: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "space-between" }}>



                    <div>



                      <strong style={{ fontSize: 13, color: "#0F172A", display: "block", fontWeight: 800 }}>{item.subject}</strong>



                      <span style={{ fontSize: 11.5, color: "#64748B", fontWeight: 500 }}>{item.chapter}</span>



                    </div>



                    <div style={{ textAlign: "right" }}>



                      <span style={{ fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 6, background: item.completed > 0 ? "#DCFCE7" : "#F1F5F9", color: item.completed > 0 ? "#15803D" : "#64748B" }}>



                        {item.completed}/{item.total} Done



                      </span>



                    </div>



                  </div>



                ))}



              </div>







              <button className="ps-btn-blue" onClick={() => { setShowLessonsModal(false); navigate("/courses"); }}>



                Go to Lessons Catalog



              </button>



            </div>



          </div>



        </div>



      )}







      {/* Achievements Detail Modal */}



      {showAchievementsModal && (



        <div className="ps-modal-overlay" onClick={() => setShowAchievementsModal(false)}>



          <div className="ps-modal-box" onClick={(e) => e.stopPropagation()}>



            <div className="ps-modal-header">



              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>



                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FEF9C3", color: "#CA8A04", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>



                  🏆



                </div>



                <div>



                  <h3 style={{ fontSize: 15.5, fontWeight: 800 }}>Unlocked Achievements</h3>



                  <span style={{ fontSize: 11.5, color: "#64748B" }}>Badges earned through consistent studying!</span>



                </div>



              </div>



              <button onClick={() => setShowAchievementsModal(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#64748B" }}>✕</button>



            </div>



            <div className="ps-modal-body">



              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>



                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: 14, background: "#F8FAFC", borderRadius: 12, border: "1px solid #E2E8F0" }}>



                  <span style={{ fontSize: 26 }}>🔥</span>



                  <div>



                    <strong style={{ fontSize: 13.5, display: "block", fontWeight: 800 }}>7-Day Study Streak</strong>



                    <span style={{ fontSize: 11.5, color: "#64748B" }}>Maintained daily login for 7 consecutive days.</span>



                  </div>



                </div>



                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: 14, background: "#F8FAFC", borderRadius: 12, border: "1px solid #E2E8F0" }}>



                  <span style={{ fontSize: 26 }}>🏆</span>



                  <div>



                    <strong style={{ fontSize: 13.5, display: "block", fontWeight: 800 }}>Quiz Champion</strong>



                    <span style={{ fontSize: 11.5, color: "#64748B" }}>Achieved above 80% average across tests.</span>



                  </div>



                </div>



                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: 14, background: "#F8FAFC", borderRadius: 12, border: "1px solid #E2E8F0" }}>



                  <span style={{ fontSize: 26 }}>⭐</span>



                  <div>



                    <strong style={{ fontSize: 13.5, display: "block", fontWeight: 800 }}>Top Performer</strong>



                    <span style={{ fontSize: 11.5, color: "#64748B" }}>Completed weekly assignments on time.</span>



                  </div>



                </div>



              </div>







              <button className="ps-btn-blue" onClick={() => { setShowAchievementsModal(false); navigate("/certificates"); }}>



                View All Verified Certificates →



              </button>



            </div>



          </div>



        </div>



      )}



    </div>



  );



} 

