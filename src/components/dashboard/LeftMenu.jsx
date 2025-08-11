import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/LeftMenu.css';

const LeftMenu = ({ icon, title, menuItems = [] }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleAction = (item) => {
        const utils = {
            navigate,
            closeMenu: () => {
                const offcanvas = document.getElementById('mobileSidebarOffcanvas');
                if (offcanvas && offcanvas.classList.contains('show')) {
                    offcanvas.classList.remove('show');
                }
            },
            stopPropagation: (e) => e.stopPropagation()
        };

        if (item.action) {
            item.action(utils);
        }
    };

    // Check if item or any sub-item matches current route
    const isActive = (item) => {
        if (item.subItems) {
            return item.subItems.some(subItem => {
                if (subItem.path) return location.pathname === subItem.path;
                if (subItem.action) {
                    const pathFromAction = subItem.action.toString().match(/navigate\(['"]([^'"]+)['"]/);
                    return pathFromAction && location.pathname === pathFromAction[1];
                }
                return false;
            });
        }

        if (item.path) return location.pathname === item.path;
        if (item.action) {
            const pathFromAction = item.action.toString().match(/navigate\(['"]([^'"]+)['"]/);
            return pathFromAction && location.pathname === pathFromAction[1];
        }
        return false;
    };

    const renderItemContent = (item) => (
        <>
            <i className={`fas fa-${item.icon} me-2`} />
            <span>{item.label}</span>
            {item.subItems && <i className="fas fa-chevron-down small" />}
        </>
    );

    const SubMenuItem = ({ item, isMobile = false }) => {
        const active = isActive(item);
        return (
            <li className="nav-item">
                <a
                    href="#"
                    className={`nav-link ${isMobile ? 'ps-4' : 'sub-link'} ${active ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAction(item);
                    }}
                    data-bs-dismiss={isMobile ? "offcanvas" : undefined}
                >
                    {item.icon && <i className={`fas fa-${item.icon} me-2`} />}
                    <span>{item.label}</span>
                </a>
            </li>
        );
    };

    const MenuItem = ({ item }) => {
        const active = isActive(item); // Only route-based active

        if (item.subItems) {
            return (
                <li className="nav-item">
                    <a
                        href="#"
                        className="nav-link d-flex align-items-center"
                        data-bs-toggle="collapse"
                        data-bs-target={`#desktop-collapse-${item.id}`}
                        aria-expanded="false"
                    >
                        {renderItemContent(item)}
                    </a>
                    <ul
                        className="nav flex-column collapse ps-3"
                        id={`desktop-collapse-${item.id}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {item.subItems.map((subItem, idx) => (
                            <SubMenuItem key={idx} item={subItem} />
                        ))}
                    </ul>
                </li>
            );
        }

        return (
            <li className="nav-item">
                <a
                    href="#"
                    className={`nav-link ${active ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handleAction(item);
                    }}
                >
                    {renderItemContent(item)}
                </a>
            </li>
        );
    };

    const MobileMenuItem = ({ item }) => {
        const active = isActive(item);

        if (item.subItems) {
            return (
                <li className="nav-item">
                    <a
                        href="#"
                        className="nav-link d-flex align-items-center"
                        data-bs-toggle="collapse"
                        data-bs-target={`#mobile-collapse-${item.id}`}
                        aria-expanded="false"
                    >
                        <i className={`fas fa-${item.icon} me-2`} />
                        <span className="flex-grow-1">{item.label}</span>
                        <i className="fas fa-chevron-down small" />
                    </a>
                    <div className="collapse" id={`mobile-collapse-${item.id}`}>
                        <ul className="nav flex-column">
                            {item.subItems.map((subItem, idx) => (
                                <SubMenuItem key={idx} item={subItem} isMobile />
                            ))}
                        </ul>
                    </div>
                </li>
            );
        }

        return (
            <li className="nav-item">
                <a
                    href="#"
                    className={`nav-link d-flex align-items-center ${active ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handleAction(item);
                    }}
                    data-bs-dismiss="offcanvas"
                >
                    <i className={`fas fa-${item.icon} me-2`} />
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
                    {icon && <i className={`${icon} me-2`} />}
                    {title && <span className="sidebar-title-text">{title}</span>}
                </h4>
                <ul className="nav flex-column nav-pills">
                    {menuItems.filter(item => item.visible !== false).map((item, idx) => (
                        <MenuItem key={`d-${idx}`} item={item} />
                    ))}
                </ul>
            </nav>

            {/* Mobile Offcanvas */}
            <div className="offcanvas offcanvas-start d-md-none" tabIndex="-1" id="mobileSidebarOffcanvas">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body p-3">
                    <ul className="nav flex-column nav-pills">
                        {menuItems.filter(item => item.visible !== false).map((item, idx) => (
                            <MobileMenuItem key={`m-${idx}`} item={item} />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default LeftMenu;