import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/", icon: "⌂" },
  { name: "My Courses", path: "/courses", icon: "▣" },
  { name: "Live Classes", path: "/live-classes", icon: "▣" },
  { name: "Assignments", path: "/assignments", icon: "▤" },
  { name: "Quizzes", path: "/quizzes", icon: "?" },
  { name: "Digital Library", path: "/digital-library", icon: "▥" },
  { name: "Notes", path: "/notes", icon: "▤" },
  { name: "Doubt Centre", path: "/doubt-centre", icon: "?" },
  { name: "AI Agent", path: "/ai-agent", icon: "🤖" },
  { name: "Progress", path: "/progress", icon: "▥" },
  { name: "Certificates", path: "/certificates", icon: "♢" },
  { name: "Announcements", path: "/announcements", icon: "📢" },
  { name: "Help & Support", path: "/help-support", icon: "?" },
  { name: "Settings", path: "/settings", icon: "⚙" }
];

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo-section">
        <div className="logo-icon">📖</div>

        <div>
          <h2>Smart Education</h2>
          <span>Digital Learning</span>
        </div>
      </div>

      <nav className="sidebar-menu">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span className="menu-icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      <div className="sidebar-bottom">
        <button
          onClick={() => {
            alert("You have been logged out.");
          }}
        >
          🔴 Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;