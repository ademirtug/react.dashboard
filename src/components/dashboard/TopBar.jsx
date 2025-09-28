import { useEffect, useRef } from 'react';
import '../../styles/TopBar.css';
import { useTheme } from '../context/ThemeContext';

const TopBar = ({
    leftContent = <span className="navbar-brand d-none d-md-inline ms-3">Dashboard</span>,
    centerContent = null,
    rightContent = null,
    sidebarWidth,
    showThemeToggle = true,
}) => {
    const { cycleTheme, getThemeIcon } = useTheme();
    const offcanvasRef = useRef(null);

    useEffect(() => {
        // Wait for Bootstrap to load
        const checkBootstrap = setInterval(() => {
            const offcanvasEl = document.getElementById('mobileSidebarOffcanvas');
            if (window.bootstrap && offcanvasEl) {
                clearInterval(checkBootstrap);
                // Bootstrap auto-initialization usually works now
                console.debug('Bootstrap Offcanvas ready');
            }
        }, 100);

        return () => clearInterval(checkBootstrap);
    }, []);

    return (
        <nav
            className="top-navbar shadow-sm"
            style={{
                position: 'fixed',
                top: 0,
                left: `${sidebarWidth}px`,
                right: 0,
                height: 'var(--top-navbar-height)',
                width: `calc(100% - ${sidebarWidth}px)`,
                zIndex: 1020,
            }}
        >
            <button
                ref={offcanvasRef}
                className="btn btn-outline-secondary d-md-none me-auto"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileSidebarOffcanvas"
                aria-controls="mobileSidebarOffcanvas"
                aria-expanded="false"
                aria-label="Toggle navigation menu"
            >
                <i className="material-symbols-rounded">menu</i>
            </button>

            <div className="topbar-left">{leftContent}</div>

            {centerContent && <div className="topbar-center">{centerContent}</div>}

            <div className="topbar-right ms-auto d-flex align-items-center">
                {showThemeToggle && (
                    <button
                        className="btn btn-outline-secondary btn-sm rounded-circle me-2 d-flex align-items-center justify-content-center"
                        type="button"
                        onClick={cycleTheme}
                        aria-label="Toggle theme"
                        style={{ width: '2rem', height: '2rem' }}
                    >
                        <i className="material-symbols-rounded">{getThemeIcon()}</i>
                    </button>
                )}
                {rightContent && <div className="topbar-right-content">{rightContent}</div>}
            </div>
        </nav>
    );
};

export default TopBar;
