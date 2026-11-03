import React, { useState, useEffect } from "react";
import StudentSidebar from "../components/StudentSidebar";
import { useNavigate } from "react-router-dom";

export default function HelpSupport() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const [expandedFaqId, setExpandedFaqId] = useState(1);

  const [activeDetailCategory, setActiveDetailCategory] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAskQuestionModal, setShowAskQuestionModal] = useState(false);
  const [showLiveHelpModal, setShowLiveHelpModal] = useState(false);


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

  const studentName = user.name || "Student";
  const studentClass = user.class || "10";

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    localStorage.removeItem("studentLoggedIn");
    navigate("/student-login");
  };

  const allCategories = [
    {
      id: "account",
      title: "Account & Profile",
      sub: "Login, password, profile, credentials",
      icon: "👤",
      bg: "#faf5ff",
      content: {
        heading: "Account Login & Profile Guide",
        description: "How to log in, recover password, or update your profile details.",
        steps: [
          "• To log in: Enter your registered Student ID and Password on the login page.",
          "• Forgot password? Reach out to support or reset your password in Settings under Security.",
          "• Update your display name, medium, and profile picture directly in the Settings tab."
        ],
        actionText: "Open Settings",
        actionPath: "/settings"
      }
    },
    {
      id: "academic",
      title: "Academic Help",
      sub: "Courses, classes, assignments",
      icon: "🎓",
      bg: "#eff6ff",
      content: {
        heading: "Academic Support & Learning Assistance",
        description: "Need guidance with your Class 10 syllabus, assignments, or notes?",
        steps: [
          "• To clarify doubts directly with teachers, visit the Doubt Centre tab.",
          "• Video lectures and chapter syllabus notes are located in My Courses & Notes.",
          "• Submit your weekly homework directly in the Assignments portal before deadlines."
        ],
        actionText: "Go to Doubt Centre",
        actionPath: "/doubt-centre"
      }
    },
    {
      id: "technical",
      title: "Technical Issues",
      sub: "Login issues, platform, video buffering",
      icon: "⚙️",
      bg: "#f0fdf4",
      content: {
        heading: "Technical Support & Troubleshooting",
        description: "Facing video playback errors, webcam access issues, or login errors?",
        steps: [
          "• Unable to login? Check your caps lock key and verify your Student ID matches your registration.",
          "• Video unavailable? Click 'Watch in External Tab ↗' inside video modals to bypass network firewalls.",
          "• For webcam in Live Classes, ensure you click 'Allow' in your browser permissions prompt."
        ],
        actionText: "Test Live Class Feed",
        actionPath: "/live-classes"
      }
    },
    {
      id: "fees",
      title: "Fees & Payments",
      sub: "Payment, refunds, invoices, subsidies",
      icon: "💳",
      bg: "#fff7ed",
      content: {
        heading: "Fees, Scholarships & Subsidy Status",
        description: "Educational fee and scholarship overview for registered students.",
        steps: [
          "• Status: 100% Free Government Grant Scholarship applied.",
          "• Total Tuition Fees Payable: ₹0 (Fully Subsidised).",
          "• Digital books and examination certificates are provided free of cost."
        ],
        actionText: "View Certificates",
        actionPath: "/certificates"
      }
    },
    {
      id: "exams",
      title: "Exam & Assessment Support",
      sub: "Quizzes, timetables, test scores",
      icon: "📝",
      bg: "#fef2f2",
      content: {
        heading: "Examination & Assessment Support",
        description: "Information regarding weekly evaluations and pre-board examinations.",
        steps: [
          "• Weekly quizzes are graded automatically with detailed solutions in the Quizzes section.",
          "• Check your academic standing on the Progress tab.",
          "• Download model question papers in the Digital Library."
        ],
        actionText: "Go to Quizzes",
        actionPath: "/quizzes"
      }
    },
    {
      id: "library",
      title: "Digital Library Access",
      sub: "Textbooks, reference guides, syllabus",
      icon: "📚",
      bg: "#f0fdfa",
      content: {
        heading: "E-Books & Reading Material",
        description: "Access state board curriculum PDFs and downloadable offline resources.",
        steps: [
          "• Download high-definition textbooks for Math, Science, and Languages.",
          "• Question paper archives from 2020-2024 are available for practice."
        ],
        actionText: "Open Digital Library",
        actionPath: "/digital-library"
      }
    }
  ];

  const allFaqs = [
    {
      id: 0,
      q: "How to login to my account?",
      a: "To log in: Navigate to the Student Login page (/student-login). Enter your registered Student ID and password, then click 'Login to Dashboard'. If you do not have an account yet, click 'Register as Student' to create one."
    },
    {
      id: 1,
      q: "How do I join a live class?",
      a: "Go to the Live Classes section from your sidebar or today's schedule on the dashboard, find your subject with the 'Live' badge, and click 'Join' or 'Join Live Class Now' to enter the virtual room with real-time video and teacher chat."
    },
    {
      id: 2,
      q: "How can I download study materials?",
      a: "Navigate to the Digital Library or Notes section. Use the search bar or category filters to find your topic, then click the '⬇ Download' button to save the official PDF study notes directly to your device."
    },
    {
      id: 3,
      q: "Why does my progress show 0%?",
      a: "Progress starts at 0% for all new students. As you play lesson videos and click '✓ Mark Lesson Completed' or submit quiz assessments, your completion percentage updates dynamically across your dashboard."
    },
    {
      id: 4,
      q: "When will my certificates be generated?",
      a: "Your certificate is automatically generated and awarded as soon as you complete 100% of a course's lessons. You can view, verify, and download your certificates anytime under the Certificates tab."
    },
    {
      id: 5,
      q: "How do I ask a doubt to my teachers?",
      a: "Visit the Doubt Centre tab, select your subject, describe your question in the text box, and click 'Ask Doubt'. Your query will be assigned to the subject teacher, and you will receive an answer with explanations."
    }
  ];

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setActiveSearchTerm(searchQuery.trim().toLowerCase());
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setActiveSearchTerm("");
  };

  const isMatch = (text) => {
    if (!activeSearchTerm) return true;
    const tokens = activeSearchTerm.split(" ").filter(Boolean);
    const target = text.toLowerCase();
    return tokens.some((t) => target.includes(t));
  };

  const filteredCategories = allCategories.filter((cat) =>
    isMatch(`${cat.title} ${cat.sub} ${cat.content.heading} ${cat.content.description}`)
  );

  const displayedCategories =
    showAllCategories || activeSearchTerm !== ""
      ? filteredCategories
      : filteredCategories.slice(0, 4);

  const filteredFaqs = allFaqs.filter((faq) =>
    isMatch(`${faq.q} ${faq.a}`)
  );

  const displayedFaqs =
    showAllFaqs || activeSearchTerm !== ""
      ? filteredFaqs
      : filteredFaqs.slice(0, 2);

  return (
    <div className="hs-container">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .hs-container { display: flex; min-height: 100vh; background: #f8fafc; color: #0f172a; width: 100%; }

        .hs-sidebar { width: 240px; background: #081B38; color: #94A3B8; display: flex; flex-direction: column; flex-shrink: 0; padding: 22px 14px; position: fixed; top: 0; bottom: 0; left: 0; z-index: 100; }
        .hs-brand { display: flex; align-items: center; gap: 12px; padding: 0 0 18px 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); margin-bottom: 18px; }
        .hs-brand-badge { width: 38px; height: 38px; border-radius: 10px; background: #1E60F8; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; }
        .hs-brand-text h2 { font-size: 15px; font-weight: 700; color: #fff; }
        .hs-brand-text p { font-size: 12px; color: #60A5FA; display: block; }
        .hs-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; overflow-y: auto; }
        .hs-link { display: flex; align-items: center; gap: 12px; padding: 10px 14px; color: #94A3B8; text-decoration: none; border-radius: 9px; font-size: 13px; font-weight: 500; transition: all 0.15s; border: none; background: transparent; cursor: pointer; width: 100%; text-align: left; }
        .hs-link:hover { background-color: rgba(255, 255, 255, 0.06); color: #fff; }
        .hs-link.active { background-color: #1E60F8; color: #fff; font-weight: 600; box-shadow: 0 4px 12px rgba(30,96,248,0.3); }
        .hs-logout-wrap { padding: 14px 14px 18px 14px; border-top: 1px solid rgba(255, 255, 255, 0.07); margin-top: auto; }
        .hs-logout-btn { width: 100%; display: flex; align-items: center; gap: 12px; background: transparent; border: none; color: #EF4444; padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }

        .hs-main { flex: 1; margin-left: 240px; display: flex; flex-direction: column; min-width: 0; padding-bottom: 50px; }
        .hs-header { height: 64px; background: #fff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; }
        .hs-header-title h2 { font-size: 15.5px; font-weight: 700; color: #0f172a; }
        .hs-header-title p { font-size: 11.5px; color: #64748b; }
        .hs-header-right { display: flex; align-items: center; gap: 18px; }
        .hs-profile-chip { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .hs-avatar-circle { width: 38px; height: 38px; border-radius: 50%; background: #fed7aa; display: flex; align-items: center; justify-content: center; font-size: 18px; }

        .hs-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 22px; max-width: 1200px; margin: 0 auto; width: 100%; }

        .hs-hero { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px 24px; display: flex; flex-direction: column; gap: 18px; }
        .hs-hero-top { display: flex; align-items: center; justify-content: space-between; }
        .hs-hero-left { display: flex; align-items: center; gap: 16px; }
        .hs-hero-icon { width: 48px; height: 48px; border-radius: 12px; background: #2563eb; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .hs-hero-left h1 { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .hs-hero-left p { font-size: 13px; color: #64748b; }
        .hs-hero-art { font-size: 34px; }

        .hs-search-bar { display: flex; gap: 10px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 6px 12px; align-items: center; }
        .hs-search-bar input { border: none; outline: none; background: transparent; flex: 1; font-size: 13px; color: #0f172a; }
        .hs-clear-btn { background: none; border: none; font-size: 14px; color: #94a3b8; cursor: pointer; padding: 0 4px; }
        .hs-search-btn { background: #2563eb; color: #fff; border: none; padding: 8px 24px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
        .hs-search-btn:hover { background: #1d4ed8; }

        .hs-tiles-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .hs-tile-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px 14px; display: flex; flex-direction: column; align-items: center; text-align: center; cursor: pointer; transition: all 0.15s; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .hs-tile-card:hover { transform: translateY(-2px); border-color: #2563eb; box-shadow: 0 8px 18px rgba(37,99,235,0.08); }
        .hs-tile-icon { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 10px; }
        .hs-tile-card strong { font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
        .hs-tile-card span { font-size: 11px; color: #64748b; line-height: 1.3; }

        .hs-sec-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .hs-sec-head h3 { font-size: 16px; font-weight: 700; color: #0f172a; }
        .hs-view-all-btn { background: none; border: none; font-size: 12.5px; color: #2563eb; font-weight: 700; cursor: pointer; }
        .hs-view-all-btn:hover { text-decoration: underline; }

        .hs-categories-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .hs-cat-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px 14px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: all 0.15s; }
        .hs-cat-card:hover { border-color: #2563eb; background: #f8fafc; transform: translateY(-2px); }
        .hs-cat-left { display: flex; align-items: center; gap: 12px; }
        .hs-cat-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .hs-cat-card strong { font-size: 13.5px; font-weight: 700; color: #0f172a; display: block; margin-bottom: 2px; }
        .hs-cat-card span { font-size: 11px; color: #64748b; }

        .hs-faq-list { display: flex; flex-direction: column; gap: 10px; }
        .hs-faq-item { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; transition: border-color 0.15s; }
        .hs-faq-item:hover { border-color: #cbd5e1; }
        .hs-faq-question { padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; font-size: 13.5px; font-weight: 700; color: #0f172a; user-select: none; }
        .hs-faq-answer { padding: 0 20px 16px 20px; font-size: 12.5px; color: #475569; line-height: 1.6; border-top: 1px solid #f8fafc; }

        .hs-no-results { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px; text-align: center; color: #64748b; }
        .hs-reset-btn { background: #2563eb; color: #fff; border: none; padding: 6px 14px; border-radius: 6px; font-size: 12px; cursor: pointer; margin-top: 8px; font-weight: 600; }

        .hs-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .hs-modal-box { background: #fff; border-radius: 16px; width: 100%; max-width: 620px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2); }
        .hs-modal-head { padding: 16px 22px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; }
        .hs-modal-body { padding: 22px; max-height: 520px; overflow-y: auto; display: flex; flex-direction: column; gap: 14px; }
        .hs-modal-btn { background: #2563eb; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-size: 12.5px; font-weight: 700; cursor: pointer; }

        @media (max-width: 1024px) {
          .hs-sidebar { display: none; }
          .hs-main { margin-left: 0; }
          .hs-tiles-grid { grid-template-columns: repeat(2, 1fr); }
          .hs-categories-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <StudentSidebar onLogout={handleLogout} />

      <main className="hs-main">
        <header className="hs-header">
          <div className="hs-header-title">
            <h2>Digital Learning Platform</h2>
            <p>Online Learning Portal for Students</p>
          </div>
          <div className="hs-header-right">
            <div className="hs-profile-chip" onClick={() => navigate("/settings")}>
              <div className="hs-avatar-circle">👩‍🎓</div>
              <div>
                <strong style={{ fontSize: 13, display: "block" }}>{studentName}</strong>
                <span style={{ fontSize: 11, color: "#64748b" }}>Class {studentClass}th</span>
              </div>
            </div>
          </div>
        </header>

        <div className="hs-body">
          <div className="hs-hero">
            <div className="hs-hero-top">
              <div className="hs-hero-left">
                <div className="hs-hero-icon">🎧</div>
                <div>
                  <h1>Help & Support</h1>
                  <p>We're here to help you. Get answers, raise a query or contact us.</p>
                </div>
              </div>
              <div className="hs-hero-art">🙋‍♀️🤝</div>
            </div>

            <form className="hs-search-bar" onSubmit={handleSearch}>
              <span style={{ fontSize: 16 }}>🔍</span>
              <input
                type="text"
                placeholder="Search for help, FAQs, or type your question (e.g. how to login, live class, download)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!e.target.value) setActiveSearchTerm("");
                }}
              />
              {searchQuery && (
                <button type="button" className="hs-clear-btn" onClick={handleClearSearch}>
                  ✕
                </button>
              )}
              <button type="submit" className="hs-search-btn">
                Search
              </button>
            </form>
          </div>

          <div className="hs-tiles-grid">
            <div
              className="hs-tile-card"
              onClick={() => {
                setShowAllFaqs(true);
                const target = document.getElementById("faqs-section");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="hs-tile-icon" style={{ background: "#fef2f2", color: "#ef4444" }}>❓</div>
              <strong>FAQs</strong>
              <span>Find answers to common questions</span>
            </div>

            <div className="hs-tile-card" onClick={() => setShowAskQuestionModal(true)}>
              <div className="hs-tile-icon" style={{ background: "#f5f3ff", color: "#8b5cf6" }}>💬</div>
              <strong>Ask a Question</strong>
              <span>Get help from our support team</span>
            </div>

            <div className="hs-tile-card" onClick={() => setShowLiveHelpModal(true)}>
              <div className="hs-tile-icon" style={{ background: "#ecfdf5", color: "#10b981" }}>🟢</div>
              <strong>Live Help</strong>
              <span>Chat with support team online</span>
            </div>

            <div className="hs-tile-card" onClick={() => setShowContactModal(true)}>
              <div className="hs-tile-icon" style={{ background: "#fffbeb", color: "#f59e0b" }}>✉️</div>
              <strong>Contact Support</strong>
              <span>Email, phone & more</span>
            </div>
          </div>

          <div>
            <div className="hs-sec-head">
              <h3>Quick Help Categories</h3>
              <button
                className="hs-view-all-btn"
                onClick={() => setShowAllCategories(!showAllCategories)}
              >
                {showAllCategories ? "Show Less ▴" : "View All ›"}
              </button>
            </div>

            <div className="hs-categories-grid">
              {displayedCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="hs-cat-card"
                  onClick={() => setActiveDetailCategory(cat)}
                >
                  <div className="hs-cat-left">
                    <div className="hs-cat-icon" style={{ background: cat.bg }}>
                      {cat.icon}
                    </div>
                    <div>
                      <strong>{cat.title}</strong>
                      <span>{cat.sub}</span>
                    </div>
                  </div>
                  <span style={{ color: "#cbd5e1" }}>›</span>
                </div>
              ))}
            </div>

            {displayedCategories.length === 0 && (
              <div className="hs-no-results">
                No help categories matched "{activeSearchTerm}".
                <br />
                <button className="hs-reset-btn" onClick={handleClearSearch}>
                  Reset Search
                </button>
              </div>
            )}
          </div>

          <div id="faqs-section">
            <div className="hs-sec-head">
              <h3>Frequently Asked Questions</h3>
              <button
                className="hs-view-all-btn"
                onClick={() => setShowAllFaqs(!showAllFaqs)}
              >
                {showAllFaqs ? "Show Less ▴" : "View All ›"}
              </button>
            </div>

            <div className="hs-faq-list">
              {displayedFaqs.map((faq) => {
                const isOpen = expandedFaqId === faq.id;
                return (
                  <div className="hs-faq-item" key={faq.id}>
                    <div
                      className="hs-faq-question"
                      onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                    >
                      <span>{faq.q}</span>
                      <span style={{ fontSize: 18, color: "#2563eb" }}>
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                    {isOpen && <div className="hs-faq-answer">{faq.a}</div>}
                  </div>
                );
              })}

              {displayedFaqs.length === 0 && (
                <div className="hs-no-results">
                  No questions matched "{activeSearchTerm}".
                  <br />
                  <button className="hs-reset-btn" onClick={handleClearSearch}>
                    Reset Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {activeDetailCategory && (
        <div className="hs-modal-overlay" onClick={() => setActiveDetailCategory(null)}>
          <div className="hs-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="hs-modal-head">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{activeDetailCategory.icon}</span>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>{activeDetailCategory.title}</h3>
              </div>
              <button
                onClick={() => setActiveDetailCategory(null)}
                style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#64748b" }}
              >
                ✕
              </button>
            </div>

            <div className="hs-modal-body">
              <div>
                <strong style={{ fontSize: 14, color: "#0f172a", display: "block", marginBottom: 4 }}>
                  {activeDetailCategory.content.heading}
                </strong>
                <p style={{ fontSize: 12.5, color: "#64748b" }}>
                  {activeDetailCategory.content.description}
                </p>
              </div>

              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 14 }}>
                {activeDetailCategory.content.steps.map((step, i) => (
                  <p key={i} style={{ fontSize: 12.5, color: "#334155", marginBottom: 8, lineHeight: 1.5 }}>
                    {step}
                  </p>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button
                  style={{ background: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", padding: "9px 18px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                  onClick={() => setActiveDetailCategory(null)}
                >
                  Close
                </button>
                <button
                  className="hs-modal-btn"
                  onClick={() => {
                    navigate(activeDetailCategory.content.actionPath);
                  }}
                >
                  {activeDetailCategory.content.actionText} →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showContactModal && (
        <div className="hs-modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="hs-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="hs-modal-head">
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Contact Helpline & Support</h3>
              <button
                onClick={() => setShowContactModal(false)}
                style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
            <div className="hs-modal-body">
              <p style={{ fontSize: 13, color: "#64748b" }}>
                Reach out directly to our Educational Learning Support Desk:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ padding: 12, border: "1px solid #e2e8f0", borderRadius: 10, background: "#f8fafc" }}>
                  <span style={{ fontSize: 11, color: "#2563eb", fontWeight: 700 }}>📞 TOLL-FREE STUDENT HELPLINE</span>
                  <strong style={{ display: "block", fontSize: 15, color: "#0f172a", marginTop: 2 }}>1800-200-EDU (338)</strong>
                  <span style={{ fontSize: 11, color: "#64748b" }}>Available Mon - Sat from 08:00 AM to 06:00 PM</span>
                </div>

                <div style={{ padding: 12, border: "1px solid #e2e8f0", borderRadius: 10, background: "#f8fafc" }}>
                  <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 700 }}>💬 WHATSAPP SUPPORT DESK</span>
                  <strong style={{ display: "block", fontSize: 15, color: "#0f172a", marginTop: 2 }}>+91 98765 43210</strong>
                  <span style={{ fontSize: 11, color: "#64748b" }}>Instant query resolutions for homework and timetable</span>
                </div>

                <div style={{ padding: 12, border: "1px solid #e2e8f0", borderRadius: 10, background: "#f8fafc" }}>
                  <span style={{ fontSize: 11, color: "#9333ea", fontWeight: 700 }}>✉️ OFFICIAL EMAIL TICKETING</span>
                  <strong style={{ display: "block", fontSize: 14, color: "#0f172a", marginTop: 2 }}>support@smarteducation.gov.in</strong>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
                <button className="hs-modal-btn" onClick={() => setShowContactModal(false)}>
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAskQuestionModal && (
        <div className="hs-modal-overlay" onClick={() => setShowAskQuestionModal(false)}>
          <div className="hs-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="hs-modal-head">
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Submit Support Ticket</h3>
              <button onClick={() => setShowAskQuestionModal(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>
            <div className="hs-modal-body">
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 4 }}>Subject Category</label>
                <select style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13, outline: "none" }}>
                  <option>Account Login & Credentials Help</option>
                  <option>Academic & Courses Question</option>
                  <option>Video Player / Live Class Trouble</option>
                  <option>Assignment / Quiz Submission</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, display: "block", marginBottom: 4 }}>Describe Your Question</label>
                <textarea
                  style={{ width: "100%", height: 110, padding: 10, borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 13, outline: "none", resize: "vertical" }}
                  placeholder="Explain what help you need from our academic counselor or tech team..."
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button
                  style={{ background: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", padding: "8px 16px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                  onClick={() => setShowAskQuestionModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="hs-modal-btn"
                  onClick={() => {
                    alert("Your question has been logged successfully! An academic coordinator will follow up.");
                    setShowAskQuestionModal(false);
                  }}
                >
                  Submit Question ✓
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLiveHelpModal && (
        <div className="hs-modal-overlay" onClick={() => setShowLiveHelpModal(false)}>
          <div className="hs-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="hs-modal-head">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
                <h3 style={{ fontSize: 15, fontWeight: 700 }}>Live Academic Counselor Chat</h3>
              </div>
              <button onClick={() => setShowLiveHelpModal(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>
            <div className="hs-modal-body">
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 12 }}>
                <strong style={{ fontSize: 12, color: "#16a34a", display: "block" }}>Online Help Desk</strong>
                <p style={{ fontSize: 12, color: "#334155", marginTop: 4 }}>
                  "Hello {studentName}! Our support desk is active. For instant AI assistance with logging in, math, science, or notes, you can also launch the 24/7 AI Agent."
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
                <button
                  style={{ background: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", padding: "8px 16px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                  onClick={() => setShowLiveHelpModal(false)}
                >
                  Close
                </button>
                <button
                  className="hs-modal-btn"
                  onClick={() => {
                    setShowLiveHelpModal(false);
                    navigate("/ai-agent");
                  }}
                >
                  Launch 24/7 AI Agent →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}