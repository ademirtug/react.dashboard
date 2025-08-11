import React from 'react';
import '../../styles/UserDropdown.css';


const UserDropdown = ({
    items = [],
    avatar = null,
    username = "Account",
    alignEnd = true
}) => {
    return (
        <div className="dropdown">
            <button
                className="btn btn-outline-primary btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {avatar && <img src={avatar} className="rounded-circle me-1" width="20" height="20" alt="User" />}
                <i className="fas fa-user me-1"></i> {username}
            </button>
            <ul className={`dropdown-menu ${alignEnd ? 'dropdown-menu-end' : ''}`}>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        {item.divider ? (
                            <li><hr className="dropdown-divider" /></li>
                        ) : (
                            <li>
                                <a
                                    className="dropdown-item"
                                    href={item.href || '#'}
                                    onClick={(e) => {
                                        if (item.onClick) {
                                            e.preventDefault();
                                            item.onClick();
                                        }
                                    }}
                                >
                                    {item.icon && <i className={`fas fa-${item.icon} fa-fw me-2 text-muted`}></i>}
                                    {item.label}
                                    {item.badge && (
                                        <span className={`badge ${item.badge.variant || 'bg-primary'} float-end`}>
                                            {item.badge.text}
                                        </span>
                                    )}
                                </a>
                            </li>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};

export default UserDropdown;