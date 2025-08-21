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
                className="btn btn-outline-primary btn-sm dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {avatar && (
                    <img
                        src={avatar}
                        className="rounded-circle me-1"
                        width="20"
                        height="20"
                        alt="User"
                        style={{ objectFit: 'cover' }}
                    />
                )}
                <i className="material-symbols-rounded me-1">person</i>
                {username}
            </button>
            <ul className={`dropdown-menu ${alignEnd ? 'dropdown-menu-end' : ''}`}>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        {item.divider ? (
                            <li><hr className="dropdown-divider" /></li>
                        ) : (
                            <li>
                                <a
                                    className="dropdown-item d-flex align-items-center"
                                    href={item.href || '#'}
                                    onClick={(e) => {
                                        if (item.onClick) {
                                            e.preventDefault();
                                            item.onClick();
                                        }
                                    }}
                                >
                                    {item.icon && (
                                        <i className="material-symbols-rounded me-2 text-muted" >
                                            {item.icon}
                                        </i>
                                    )}
                                    <span className="flex-grow-1">{item.label}</span>
                                    {item.badge && (
                                        <span className={`badge ${item.badge.variant || 'bg-primary'} ms-2`}>
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