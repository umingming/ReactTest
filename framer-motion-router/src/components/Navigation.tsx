import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "홈" },
    { path: "/about", label: "소개" },
    { path: "/gallery", label: "갤러리" },
    { path: "/contact", label: "연락처" },
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <h2 className="logo">Motion Router</h2>
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                <span>{item.label}</span>
                {location.pathname === item.path && (
                  <div className="active-indicator" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
