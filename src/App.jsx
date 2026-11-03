import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import StudentLogin from "./pages/StudentLogin";
import DualRegister from "./pages/DualRegister";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherClasses from "./pages/TeacherClasses";
import TeacherAssignments from "./pages/TeacherAssignments";
import TeacherNotes from "./pages/NotesMaterials"; 
import StudentProgress from "./pages/Progress";
import MyCourses from "./pages/MyCourses";
import Assignments from "./pages/Assignments";
import Quizzes from "./pages/Quizzes";
import DigitalLibrary from "./pages/DigitalLibrary";
import Notes from "./pages/Notes";
import DoubtCentre from "./pages/DoubtCentre";
import AiAgent from "./pages/AiAgent";
import LiveClasses from "./pages/LiveClasses";
import HelpSupport from "./pages/HelpSupport";
import Certificates from "./pages/Certificates";
import Announcements from "./pages/Announcements";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/student-login" replace />} />
        
        {/* Authentication Routes */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<StudentLogin />} />
        <Route path="/student-register" element={<DualRegister />} />
        <Route path="/teacher-register" element={<DualRegister />} />

        {/* Dashboards */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-classes" element={<TeacherClasses />} />
        <Route path="/teacher-assignments" element={<TeacherAssignments />} />
        
        {/* 2. Teacher Notes ki separate route ikkada add cheyandi */}
        <Route path="/teacher-notes" element={<TeacherNotes />} />

        {/* Student Portal Pages */}
        <Route path="/progress" element={<StudentProgress />} />
        <Route path="/courses" element={<MyCourses />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/digital-library" element={<DigitalLibrary />} />
        <Route path="/notes" element={<Notes />} />

        {/* Shared / Common Portal Pages */}
        <Route path="/doubt-centre" element={<DoubtCentre />} />
        <Route path="/doubt-center" element={<DoubtCentre />} />
        <Route path="/live-classes" element={<LiveClasses />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/ai-agent" element={<AiAgent />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/certificates" element={<Certificates />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/student-login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;