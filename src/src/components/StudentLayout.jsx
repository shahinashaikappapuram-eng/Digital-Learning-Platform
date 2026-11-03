import React, { useState } from "react";

import {
  Home,
  BookOpen,
  Video,
  ClipboardList,
  HelpCircle,
  FileText,
  Library,
  Bot,
  BarChart3,
  Award,
  Megaphone,
  Settings as SettingsIcon,
  LifeBuoy,
  LogOut,
  Menu,
  X,
  Bell
} from "lucide-react";

import {
  NavLink,
  Outlet,
  useNavigate
} from "react-router-dom";

const StudentLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const studentData = JSON.parse(
    localStorage.getItem("studentData") || "{}"
  );

  const studentName =
    studentData.name || "Student";

  const handleLogout = () => {

    localStorage.removeItem("studentId");

    navigate("/student-login");
  };

  const menuItems = [

    {
      name: "Dashboard",
      path: "/student-dashboard",
      icon: Home
    },

    {
      name: "My Courses",
      path: "/courses",
      icon: BookOpen
    },

    {
      name: "Live Classes",
      path: "/live-classes",
      icon: Video
    },

    {
      name: "Assignments",
      path: "/assignments",
      icon: ClipboardList
    },

    {
      name: "Quizzes",
      path: "/quizzes",
      icon: HelpCircle
    },

    {
      name: "Digital Library",
      path: "/digital-library",
      icon: Library
    },

    {
      name: "Notes",
      path: "/notes",
      icon: FileText
    },

    {
      name: "Doubt Centre",
      path: "/doubt-centre",
      icon: HelpCircle
    },

    {
      name: "AI Agent",
      path: "/ai-agent",
      icon: Bot
    },

    {
      name: "Progress",
      path: "/progress",
      icon: BarChart3
    },

    {
      name: "Certificates",
      path: "/certificates",
      icon: Award
    },

    {
      name: "Announcements",
      path: "/announcements",
      icon: Megaphone
    },

    {
      name: "Help & Support",
      path: "/help-support",
      icon: LifeBuoy
    },

    {
      name: "Settings",
      path: "/settings",
      icon: SettingsIcon
    }

  ];

  return (
    <div className="app-shell">

      {/* Mobile menu */}

      <button
        className="mobile-menu-button"
        onClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
      >
        {sidebarOpen
          ? <X size={24} />
          : <Menu size={24} />
        }
      </button>


      {/* Sidebar */}

      <aside
        className={`sidebar ${
          sidebarOpen
            ? "sidebar-open"
            : ""
        }`}
      >

        {/* Logo */}

        <div className="sidebar-logo">

          <div className="logo-icon">
            <BookOpen size={28} />
          </div>

          <div>
            <h2>Smart Education</h2>
            <p>Digital Learning</p>
          </div>

        </div>


        {/* Navigation */}

        <nav className="sidebar-menu">

          {menuItems.map(
            (item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-link ${
                      isActive
                        ? "active"
                        : ""
                    }`
                  }
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                >

                  <Icon size={20} />

                  <span>
                    {item.name}
                  </span>

                </NavLink>
              );
            }
          )}

        </nav>


        {/* Logout */}

        <div className="sidebar-bottom">

          <button
            className="sidebar-link logout-link"
            onClick={handleLogout}
          >

            <LogOut size={20} />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>


      {/* Main */}

      <main className="main-area">

        {/* Header */}

        <header className="top-header">

          <div>

            <h2>
              Digital Learning Platform
            </h2>

            <p>
              For Rural School Students
            </p>

          </div>


          <div className="header-right">

            <button className="notification-button">

              <Bell size={22} />

              <span className="notification-count">
                3
              </span>

            </button>


            <div className="student-profile">

              <div className="profile-avatar">
                {studentName
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>

                <strong>
                  {studentName}
                </strong>

                <span>
                  Class 10
                </span>

              </div>

            </div>

          </div>

        </header>


        {/* Page changes here */}

        <Outlet />

      </main>

    </div>
  );
};

export default StudentLayout;