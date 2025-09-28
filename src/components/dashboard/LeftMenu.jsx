// LeftMenu.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/LeftMenu.css';

const LeftMenu = ({ icon, title, menuItems = [], isMobile = false }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [openMenus, setOpenMenus] = useState(() => {
        const initial = {};
        menuItems.forEach((item) => {
            if (item.subItems) {
                initial[item.id] = item.subItems.some(
                    (sub) => sub.path && sub.path === location.pathname
                );
            }
        });
        return initial;
    });

    useEffect(() => {
        const parent = menuItems.find((item) =>
            item.subItems?.some((sub) => sub.path === location.pathname)
        );
        if (parent && !openMenus[parent.id]) {
            setOpenMenus((prev) => ({ ...prev, [parent.id]: true }));
        }
    }, [location.pathname, menuItems]);

    const handleAction = (item, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const utils = {
            navigate,
            closeMenu: () => {
                if (isMobile) {
                    const offcanvas = document.getElementById('mobileSidebarOffcanvas');
                    if (offcanvas) {
                        const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvas);
                        bsOffcanvas?.hide();
                    }
                }
            },
            stopPropagation: (event) => event && event.stopPropagation(),
        };

        if (item.action) item.action(utils);
        else if (item.path) {
            navigate(item.path);
            utils.closeMenu();
        }
    };

    const toggleMenu = (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const isActive = (item) => {
        if (item.path && location.pathname === item.path) return true;
        if (item.subItems) {
            return item.subItems.some(
                (sub) => sub.path && sub.path === location.pathname
            );
        }
        return false;
    };

    const renderMenuItem = (item, level = 0) => {
        const active = isActive(item);
        const isOpen = openMenus[item.id];

        if (item.subItems?.length) {
            return (
                <li className="nav-item" key={item.id}>
                    <button
                        type="button"
                        className={`nav-link d-flex align-items-center w-100 text-start ${active ? 'active' : ''}`}
                        onClick={(e) => toggleMenu(item.id, e)}
                        aria-expanded={isOpen}
                    >
                        {item.icon && <i className="material-symbols-rounded me-2">{item.icon}</i>}
                        <span className="flex-grow-1">{item.label}</span>
                        <span className={`chevron ${isOpen ? 'open' : ''}`} aria-hidden="true">
                            <i className="material-symbols-rounded">arrow_drop_down</i>
                        </span>
                    </button>

                    <ul
                        className="nav flex-column ps-3"
                        style={{
                            maxHeight: isOpen ? '500px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.3s ease',
                            opacity: isOpen ? 1 : 0,
                        }}
                    >
                        {item.subItems
                            .filter((sub) => sub.visible !== false)
                            .map((subItem) => renderMenuItem(subItem, level + 1))}
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
                    {item.icon && <i className="material-symbols-rounded me-2">{item.icon}</i>}
                    <span>{item.label}</span>
                </a>
            </li>
        );
    };

    return (
        <>
            {/* Optional header only if needed */}
            {(icon || title) && !isMobile && (
                <h4 className="mb-4">
                    {icon && <i className="material-symbols-rounded me-2">{icon}</i>}
                    {title && <span className="sidebar-title-text">{title}</span>}
                </h4>
            )}

            <ul className="nav flex-column nav-pills">
                {menuItems.filter((item) => item.visible !== false).map((item) => renderMenuItem(item))}
            </ul>
        </>
    );
};

export default LeftMenu;

