import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import LeftMenu from './LeftMenu';
import { Outlet } from "react-router-dom";
import '../../styles/Dashboard.css';

const Dashboard = ({ menuItems, topBarConfig, company, icon, title }) => {
    const [theme, setTheme] = useState('light');
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const startResize = (e) => {
        const startX = e.clientX;
        const startWidth = sidebarWidth;

        const onMouseMove = (e) => {
            const newWidth = Math.max(150, startWidth + e.clientX - startX);
            setSidebarWidth(newWidth);
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-bs-theme', newTheme);
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    // Dashboard.js 
    return (
        <div className="dashboard-wrapper">

            {/* DESKTOP SIDEBAR */}
            {!isMobile && (
                <>
                    <nav
                        id="sidebar"
                        className="p-3 d-none d-md-block"
                        style={{ width: `${sidebarWidth}px`, flexShrink: 0 }}
                    >
                        <LeftMenu
                            menuItems={menuItems}
                            icon={icon}
                            title={title}
                            width={sidebarWidth}
                        />
                    </nav>

                    {/* RESIZER */}
                    <div
                        className="sidebar-resizer"
                        onMouseDown={startResize}
                        style={{ left: `${sidebarWidth}px` }}
                    />
                </>
            )}

            {/* MOBILE OFFCANVAS (ONLY ONE!) */}
            <div
                className="offcanvas offcanvas-start d-md-none"
                tabIndex="-1"
                id="mobileSidebarOffcanvas"
                aria-labelledby="mobileSidebarLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="mobileSidebarLabel">
                        {title || 'Menu'}
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body p-0">
                    <LeftMenu
                        menuItems={menuItems}
                        icon={icon}
                        title={title}
                        isMobile={true}  // optional hint
                    />
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div
                id="content-wrapper"
                style={{
                    marginLeft: isMobile ? 0 : `${sidebarWidth}px`,
                }}
            >
                <TopBar
                    {...topBarConfig}
                    onToggleTheme={toggleTheme}
                    mobileMenuToggle={toggleMobileMenu}
                    sidebarWidth={isMobile ? 0 : sidebarWidth}
                />

                <main>
                    <Outlet />
                </main>

                <footer className="p-3 mt-auto text-center">
                    {company && <small>&copy; {new Date().getFullYear()} {company}</small>}
                </footer>
            </div>
        </div>
    );
};

export default Dashboard;
