import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/LeftMenu.css';

const LeftMenu = ({ icon, title, menuItems = [] }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // State to track open/closed status of each collapsible menu
    const [openMenus, setOpenMenus] = useState(() => {
        const initial = {};
        menuItems.forEach(item => {
            if (item.subItems) {
                initial[item.id] = item.subItems.some(sub =>
                    sub.path ? sub.path === location.pathname : false
                );
            }
        });
        return initial;
    });

    // Sync openMenus when route changes (keep parent open if sub-item is active)
    useEffect(() => {
        const parentMenuOfActiveItem = menuItems.find(item =>
            item.subItems?.some(sub => sub.path === location.pathname)
        );

        if (parentMenuOfActiveItem && !openMenus[parentMenuOfActiveItem.id]) {
            setOpenMenus(prev => ({
                ...prev,
                [parentMenuOfActiveItem.id]: true
            }));
        }
    }, [location.pathname, menuItems, openMenus]);

    const handleAction = (item, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const utils = {
            navigate,
            closeMenu: () => {
                const offcanvas = document.getElementById('mobileSidebarOffcanvas');
                if (offcanvas && offcanvas.classList.contains('show')) {
                    const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvas);
                    if (bsOffcanvas) bsOffcanvas.hide();
                }
            },
            stopPropagation: (event) => event && event.stopPropagation(),
        };

        if (item.action) {
            item.action(utils);
        } else if (item.path) {
            navigate(item.path);
            utils.closeMenu();
        }
    };

    const toggleMenu = (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenMenus(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const isActive = (item) => {
        if (item.path && location.pathname === item.path) return true;
        if (item.subItems) {
            return item.subItems.some(subItem =>
                subItem.path ? subItem.path === location.pathname : false
            );
        }
        return false;
    };

    // Reusable MenuItem component
    const renderMenuItem = (item, isMobile = false) => {
        const active = isActive(item);
        const isOpen = openMenus[item.id];

        if (item.subItems) {
            return (
                <li className="nav-item" key={item.id}>
                    <button
                        type="button"
                        className={`nav-link d-flex align-items-center w-100 text-start ${active ? 'active' : ''}`}
                        onClick={(e) => toggleMenu(item.id, e)}
                        aria-expanded={isOpen}
                    >
                        {/* Material Icon */}
                        {item.icon && (
                            <i className="material-symbols-rounded me-2">
                                {item.icon}
                            </i>
                        )}
                        <span className="flex-grow-1">{item.label}</span>
                        {/* Dropdown Chevron using Material Icons */}
                        <i
                            className="material-symbols-rounded"
                            style={{
                                fontSize: '1rem',
                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                                transition: 'transform 0.3s ease',
                            }}
                        >
                            expand_more
                        </i>
                    </button>

                    {/* Sub-items */}
                    <ul
                        className="nav flex-column ps-3"
                        style={{
                            maxHeight: isOpen ? '500px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out',
                            opacity: isOpen ? 1 : 0,
                            visibility: isOpen ? 'visible' : 'hidden',
                        }}
                    >
                        {item.subItems
                            .filter(sub => sub.visible !== false)
                            .map((subItem, idx) => (
                                <li className="nav-item" key={idx}>
                                    <a
                                        href={subItem.path || '#'}
                                        className={`nav-link sub-link d-flex align-items-center ${location.pathname === subItem.path ? 'active' : ''}`}
                                        onClick={(e) => handleAction(subItem, e)}
                                    >
                                        {subItem.icon && (
                                            <i className="material-symbols-rounded me-2">
                                                {subItem.icon}
                                            </i>
                                        )}
                                        <span>{subItem.label}</span>
                                    </a>
                                </li>
                            ))}
                    </ul>
                </li>
            );
        }

        return (
            <li className="nav-item" key={item.id}>
                <a
                    href={item.path || '#'}
                    className={`nav-link d-flex align-items-center ${active ? 'active' : ''}`}
                    onClick={(e) => handleAction(item, e)}
                >
                    {item.icon && (
                        <i className="material-symbols-rounded me-2">
                            {item.icon}
                        </i>
                    )}
                    <span>{item.label}</span>
                </a>
            </li>
        );
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <nav id="sidebar" className="p-3 d-none d-md-block">
                <h4 className="mb-4">
                    {icon && (
                        <i className="material-symbols-rounded me-2" style={{ fontSize: '1.5rem' }}>
                            {icon}
                        </i>
                    )}
                    {title && <span className="sidebar-title-text">{title}</span>}
                </h4>
                <ul className="nav flex-column nav-pills">
                    {menuItems
                        .filter(item => item.visible !== false)
                        .map((item, idx) => renderMenuItem(item))}
                </ul>
            </nav>

            {/* Mobile Offcanvas */}
            <div
                className="offcanvas offcanvas-start d-md-none"
                tabIndex="-1"
                id="mobileSidebarOffcanvas"
                aria-labelledby="mobileSidebarLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="mobileSidebarLabel">Menu</h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body p-3">
                    <ul className="nav flex-column nav-pills">
                        {menuItems
                            .filter(item => item.visible !== false)
                            .map((item, idx) => renderMenuItem(item, true))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default LeftMenu;