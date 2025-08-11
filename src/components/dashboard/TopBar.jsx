import React from 'react';
import '../../styles/TopBar.css';
import { useTheme } from '../context/ThemeContext';

const TopBar = ({
    leftContent = <span className="navbar-brand d-none d-md-inline ms-3">Dashboard</span>,
    centerContent = null,
    rightContent = null,
    showThemeToggle = true
}) => {
    const { cycleTheme, getThemeIcon } = useTheme();

    return (
        <nav className="top-navbar shadow-sm">
            {/* Mobile Menu Toggle Button (only visible on mobile) */}
            <button
                className="btn btn-outline-secondary d-md-none me-auto"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileSidebarOffcanvas"
                aria-controls="mobileSidebarOffcanvas"
            >
                <i className="fas fa-bars"></i>
            </button>

            {/* Left Content Area */}
            <div className="topbar-left">
                {leftContent}
            </div>

            {/* Center Content Area */}
            {centerContent && (
                <div className="topbar-center">
                    {centerContent}
                </div>
            )}

            {/* Right Content Area */}
            <div className="topbar-right ms-auto d-flex align-items-center">
                {/* Theme Toggle Button */}
                {showThemeToggle && (
                    <button
                        className="btn btn-outline-secondary btn-sm rounded-circle me-2"
                        type="button"
                        onClick={cycleTheme}
                        aria-label="Toggle theme"
                    >
                        <i className={`fas fa-${getThemeIcon()}`}></i>
                    </button>
                )}

                {/* Custom Right Content OR Default Account Dropdown */}
                {rightContent && (
                    <div className="topbar-right-content">
                        {rightContent}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default TopBar;