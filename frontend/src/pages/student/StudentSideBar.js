import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const StudentSideBar = () => {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/' || path === '/Student/dashboard') {
            return location.pathname === '/' || location.pathname === '/Student/dashboard';
        }
        return location.pathname.startsWith(path);
    };

    // Inline Styles
    const styles = {
        sidebarContainer: {
            padding: '16px 0',
            height: '100%'
        },
        navList: {
            listStyle: 'none',
            padding: 0,
            margin: 0
        },
        navItem: {
            marginBottom: '8px'
        },
        navLink: {
            display: 'flex',
            alignItems: 'center',
            padding: '12px 20px',
            textDecoration: 'none',
            color: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '12px',
            margin: '0 12px',
            transition: 'all 0.3s ease',
            fontSize: '16px',
            fontWeight: '500',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            width: 'calc(100% - 24px)',
            boxSizing: 'border-box'
        },
        navLinkActive: {
            background: 'rgba(255, 255, 255, 0.15)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
        },
        navIcon: {
            fontSize: '20px',
            marginRight: '12px',
            minWidth: '20px',
            textAlign: 'center'
        },
        divider: {
            height: '1px',
            background: 'rgba(255, 255, 255, 0.1)',
            margin: '16px 20px',
            border: 'none'
        }
    };

    const navigationItems = [
        { path: '/', icon: '🏠', label: 'Home' },
        { path: '/Student/subjects', icon: '📚', label: 'Subjects' },
        { path: '/Student/attendance', icon: '📊', label: 'Attendance' },
        { path: '/Student/complain', icon: '📝', label: 'Complain' }
    ];

    const userItems = [
        { path: '/Student/profile', icon: '👤', label: 'Profile' },
        { path: '/logout', icon: '🚪', label: 'Logout' }
    ];

    return (
        <>
            <style>
                {`
                    .nav-link:hover {
                        background: rgba(255, 255, 255, 0.1) !important;
                        color: white !important;
                    }
                    .nav-link-active:hover {
                        background: rgba(255, 255, 255, 0.2) !important;
                    }
                `}
            </style>
            <div style={styles.sidebarContainer}>
                <nav>
                    <ul style={styles.navList}>
                        {navigationItems.map((item) => (
                            <li key={item.path} style={styles.navItem}>
                                <Link
                                    to={item.path}
                                    className={`nav-link ${isActive(item.path) ? 'nav-link-active' : ''}`}
                                    style={{
                                        ...styles.navLink,
                                        ...(isActive(item.path) ? styles.navLinkActive : {})
                                    }}
                                >
                                    <span style={styles.navIcon}>{item.icon}</span>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <hr style={styles.divider} />

                <nav>
                    <ul style={styles.navList}>
                        {userItems.map((item) => (
                            <li key={item.path} style={styles.navItem}>
                                <Link
                                    to={item.path}
                                    className={`nav-link ${isActive(item.path) ? 'nav-link-active' : ''}`}
                                    style={{
                                        ...styles.navLink,
                                        ...(isActive(item.path) ? styles.navLinkActive : {})
                                    }}
                                >
                                    <span style={styles.navIcon}>{item.icon}</span>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default StudentSideBar;