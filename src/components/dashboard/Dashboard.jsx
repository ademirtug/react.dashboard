import React, { useState } from 'react';
import TopBar from './TopBar';
import LeftMenu from './LeftMenu';
import { Outlet } from "react-router-dom";
import '../../styles/Dashboard.css';


const Dashboard = ({ children, menuItems, topBarConfig, company, icon, title, }) => {
    const [theme, setTheme] = useState('light');
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-bs-theme', newTheme);
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
        <div className="dashboard-wrapper">
            <LeftMenu menuItems={menuItems} icon={icon} title={ title } />
            <div id="content-wrapper">
                <TopBar {...topBarConfig} onToggleTheme={toggleTheme} mobileMenuToggle={toggleMobileMenu} />
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