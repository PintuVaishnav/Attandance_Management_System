import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass;
    const location = useLocation();

    // Inline Styles
    const styles = {
        sidebarContainer: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 0'
        },
        navSection: {
            marginBottom: '24px'
        },
        navItem: {
            display: 'flex',
            alignItems: 'center',
            padding: '12px 20px',
            margin: '4px 12px',
            borderRadius: '12px',
            textDecoration: 'none',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            border: '1px solid transparent'
        },
        navItemActive: {
            background: 'rgba(255, 255, 255, 0.15)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 16px rgba(255, 255, 255, 0.1)'
        },
        navItemHover: {
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white'
        },
        navIcon: {
            fontSize: '20px',
            marginRight: '12px',
            minWidth: '20px'
        },
        divider: {
            height: '1px',
            background: 'rgba(255, 255, 255, 0.1)',
            margin: '16px 20px',
            borderRadius: '1px'
        }
    };

    const isActive = (path) => {
        if (path === '/' || path === '/Teacher/dashboard') {
            return location.pathname === '/' || location.pathname === '/Teacher/dashboard';
        }
        return location.pathname.startsWith(path);
    };

    const NavItem = ({ to, icon, children, exact = false }) => {
        const active = exact ? location.pathname === to : isActive(to);
        
        return (
            <Link
                to={to}
                style={{
                    ...styles.navItem,
                    ...(active ? styles.navItemActive : {})
                }}
                className="nav-item"
            >
                <span style={styles.navIcon}>{icon}</span>
                {children}
            </Link>
        );
    };

    return (
        <>
            <style>
                {`
                    .nav-item:hover {
                        background: rgba(255, 255, 255, 0.1) !important;
                        color: white !important;
                    }
                `}
            </style>
            <div style={styles.sidebarContainer}>
                <div style={styles.navSection}>
                    <NavItem to="/" icon="🏠">
                        Home
                    </NavItem>
                    <NavItem to="/Teacher/class" icon="🎓">
                        Class {sclassName.sclassName}
                    </NavItem>
                    <NavItem to="/Teacher/complain" icon="📢">
                        Complain
                    </NavItem>
                </div>

                <div style={styles.divider}></div>

                <div style={styles.navSection}>
                    <NavItem to="/Teacher/profile" icon="👤">
                        Profile
                    </NavItem>
                    <NavItem to="/logout" icon="🚪">
                        Logout
                    </NavItem>
                </div>
            </div>
        </>
    );
};

export default TeacherSideBar;