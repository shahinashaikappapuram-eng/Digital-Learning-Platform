import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeacherSidebar from "../components/TeacherSidebar";
import StudentSidebar from "../components/StudentSidebar";

export default function LiveClasses() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [inClass, setInClass] = useState(false);
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const [messages, setMessages] = useState([
    { sender: "System", text: "Welcome to the live interactive classroom!" },
    { sender: "Dr. Priya Sharma", text: "Hello students! Let's study Knowing Our Numbers concepts together." }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const rawTeacher = localStorage.getItem("current_teacher");
    const rawUser = localStorage.getItem("current_user");
    const teacherLoggedIn = localStorage.getItem("teacherLoggedIn") === "true";

    if (rawTeacher || teacherLoggedIn) {
      if (!rawTeacher) {
        navigate("/teacher-login");
        return;
      }
      setIsTeacher(true);
      setUser(JSON.parse(rawTeacher));
    } else if (rawUser) {
      setIsTeacher(false);
      setUser(JSON.parse(rawUser));
    } else {
      navigate("/student-login");
    }
  }, [navigate]);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.clear();
    navigate(isTeacher ? "/teacher-login" : "/student-login");
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    const newMessages = [...messages, { sender: user.name, text: userMsg }];
    setMessages(newMessages);
    setInputMessage("");

    // Auto reply from Dr. Priya Sharma based on user doubt
    setTimeout(() => {
      let replyText = "That's a great question! Let's break it down step-by-step on the whiteboard.";
      const lowerMsg = userMsg.toLowerCase();
      
      if (lowerMsg.includes("number") || lowerMsg.includes("place value")) {
        replyText = "Place value helps us determine the value of a digit based on its position in the number (e.g., units, tens, hundreds).";
      } else if (lowerMsg.includes("solve") || lowerMsg.includes("doubt")) {
        replyText = "Good observation! Always start solving numbers from the right-hand side placing them correctly.";
      } else {
        replyText = `Good question, ${user.name}! Let's focus on this concept as we proceed with Knowing Our Numbers.`;
      }

      setMessages((prev) => [...prev, { sender: "Dr. Priya Sharma", text: replyText }]);
    }, 1000);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif", background: "#F8FAFC", color: "#0F172A", width: "100%" }}>
      {isTeacher ? (
        <TeacherSidebar onLogout={handleLogout} />
      ) : (
        <StudentSidebar onLogout={handleLogout} />
      )}

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, marginLeft: "250px", display: "flex", flexDirection: "column" }}>
        <header style={{ height: "64px", background: "#fff", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700 }}>Live Classes Studio</h2>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#64748B" }}>{user.name} ({isTeacher ? "Educator" : "Student"})</span>
        </header>

        <div style={{ padding: "24px 32px" }}>
          {!inClass ? (
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "28px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Interactive Live Lectures</h3>
              <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "20px" }}>
                {isTeacher ? "Broadcast interactive lectures to your enrolled students in real time." : "Join ongoing virtual classrooms scheduled by your teachers."}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ border: "1px solid #E2E8F0", borderRadius: "12px", padding: "20px", background: "#FAFAFA" }}>
                  <span style={{ fontSize: "11px", background: "#DCFCE7", color: "#15803D", padding: "3px 8px", borderRadius: "6px", fontWeight: 700 }}>LIVE NOW</span>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, marginTop: "10px", marginBottom: "4px" }}>Mathematics: Knowing Our Numbers</h4>
                  <p style={{ fontSize: "12.5px", color: "#64748B", marginBottom: "16px" }}>Host: Educator Dr. Priya Sharma</p>
                  <button 
                    onClick={() => setInClass(true)} 
                    style={{ background: isTeacher ? "#059669" : "#1E60F8", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}
                  >
                    {isTeacher ? "Start Broadcast 📹" : "Join Class Room 🎥"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* REAL-LIFE VIRTUAL CLASSROOM UI WITH DYNAMIC CHAT AUTO-REPLY */
            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px", height: "calc(100vh - 140px)" }}>
              
              {/* Left Side: Video & Whiteboard Stage */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", height: "100%" }}>
                
                {/* Main Stage */}
                <div style={{ position: "relative", flex: 1, background: "#0B0F19", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", border: "1px solid #1E293B", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)" }}>
                  
                  {/* Top Bar inside Class */}
                  <div style={{ position: "absolute", top: "16px", left: "16px", right: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 10 }}>
                    <div style={{ background: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(8px)", color: "#fff", padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <span style={{ width: "8px", height: "8px", background: "#EF4444", borderRadius: "50%", boxShadow: "0 0 8px #EF4444" }}></span> 
                      LIVE | Mathematics: Knowing Our Numbers
                    </div>
                    <div style={{ background: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(8px)", color: "#94A3B8", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 500, border: "1px solid rgba(255,255,255,0.1)" }}>
                      👥 42 Students Connected
                    </div>
                  </div>

                  {/* Video Stage */}
                  <div style={{ flex: 1, width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {isVideoOff ? (
                      <div style={{ color: "#94A3B8", textAlign: "center" }}>
                        <span style={{ fontSize: "40px", display: "block", marginBottom: "10px" }}>📴</span>
                        <p style={{ fontSize: "14px", fontWeight: 600 }}>Video Stream Paused / Stopped</p>
                      </div>
                    ) : (
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/GMojx-QoeuM?autoplay=1&mute=0" 
                        title="Dr. Priya Sharma Live Math Lecture" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        style={{ border: "none", width: "100%", height: "100%" }}
                      ></iframe>
                    )}
                  </div>

                </div>

                {/* Bottom Control Bar */}
                <div style={{ height: "64px", background: "#fff", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button 
                      onClick={() => setIsMuted(!isMuted)} 
                      style={{ background: isMuted ? "#fee2e2" : "#F1F5F9", color: isMuted ? "#dc2626" : "#334155", border: "none", padding: "8px 14px", borderRadius: "8px", fontWeight: 600, fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                    >
                      {isMuted ? "🔇 Unmute" : "🎙️ Mute"}
                    </button>
                    <button 
                      onClick={() => setIsVideoOff(!isVideoOff)} 
                      style={{ background: isVideoOff ? "#fee2e2" : "#F1F5F9", color: isVideoOff ? "#dc2626" : "#334155", border: "none", padding: "8px 14px", borderRadius: "8px", fontWeight: 600, fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                    >
                      {isVideoOff ? "📹 Start Video" : "📹 Stop Video"}
                    </button>
                  </div>

                  <div style={{ fontSize: "13px", color: "#64748B", fontWeight: 600 }}>
                    Connected with Dr. Priya Sharma's live stream
                  </div>

                  <button 
                    onClick={() => setInClass(false)} 
                    style={{ background: "#EF4444", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer", boxShadow: "0 2px 6px rgba(239,68,68,0.3)" }}
                  >
                    Leave Class 🚪
                  </button>
                </div>

              </div>

              {/* Right Side: Live Class Chat Panel */}
              <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", display: "flex", flexDirection: "column", overflow: "hidden", height: "100%", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                <div style={{ padding: "16px", borderBottom: "1px solid #E2E8F0", fontWeight: 700, fontSize: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Live Class Chat</span>
                  <span style={{ fontSize: "11px", background: "#EFF6FF", color: "#1D4ED8", padding: "2px 6px", borderRadius: "4px", fontWeight: 600 }}>Q&A Active</span>
                </div>
                
                <div style={{ flex: 1, padding: "16px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", background: "#FAFAFA" }}>
                  {messages.map((msg, index) => (
                    <div key={index} style={{ background: msg.sender === "Dr. Priya Sharma" ? "#EFF6FF" : "#fff", padding: "10px 12px", borderRadius: "10px", border: "1px solid #E2E8F0", fontSize: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.01)" }}>
                      <strong style={{ color: msg.sender === "Dr. Priya Sharma" ? "#1D4ED8" : "#1E60F8", display: "block", marginBottom: "3px" }}>{msg.sender}</strong>
                      <span style={{ color: "#334155", lineHeight: "1.4" }}>{msg.text}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} style={{ padding: "12px", borderTop: "1px solid #E2E8F0", display: "flex", gap: "8px", background: "#fff" }}>
                  <input 
                    type="text" 
                    placeholder="Ask doubt to Madam..." 
                    value={inputMessage} 
                    onChange={(e) => setInputMessage(e.target.value)} 
                    style={{ flex: 1, padding: "10px 12px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "12px", outline: "none", background: "#F8FAFC" }}
                  />
                  <button type="submit" style={{ background: "#1E60F8", color: "#fff", border: "none", padding: "10px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>Send</button>
                </form>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}