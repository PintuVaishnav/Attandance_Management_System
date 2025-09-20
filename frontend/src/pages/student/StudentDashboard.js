import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import StudentSideBar from './StudentSideBar';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';

const StudentDashboard = () => {
    const [open, setOpen] = useState(true);
    
    const toggleDrawer = () => {
        setOpen(!open);
    };

    // Inline Styles
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex'
        },
        floatingElement: {
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            animation: 'float 6s ease-in-out infinite',
            zIndex: 1
        },
        floatingElement1: {
            width: '80px',
            height: '80px',
            top: '10%',
            left: '10%',
            animationDelay: '0s'
        },
        floatingElement2: {
            width: '120px',
            height: '120px',
            top: '20%',
            right: '10%',
            animationDelay: '2s'
        },
        floatingElement3: {
            width: '60px',
            height: '60px',
            bottom: '20%',
            left: '15%',
            animationDelay: '4s'
        },
        floatingElement4: {
            width: '100px',
            height: '100px',
            bottom: '10%',
            right: '20%',
            animationDelay: '1s'
        },
        appBar: {
            position: 'fixed',
            top: 0,
            left: open ? '280px' : '0px',
            right: 0,
            height: '64px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            zIndex: 1200,
            transition: 'left 0.3s ease'
        },
        menuButton: {
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            marginRight: '16px',
            transition: 'all 0.3s ease',
            display: !open ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center'
        },
        title: {
            color: 'white',
            fontSize: '20px',
            fontWeight: '600',
            flexGrow: 1,
            margin: 0
        },
        sidebar: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '280px',
            height: '100vh',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)',
            transform: open ? 'translateX(0)' : 'translateX(-280px)',
            transition: 'transform 0.3s ease',
            zIndex: 1300,
            overflow: 'hidden'
        },
        sidebarHeader: {
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        },
        sidebarTitle: {
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            margin: 0
        },
        closeButton: {
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            display: open ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center'
        },
        mainContent: {
            marginLeft: open ? '280px' : '0px',
            marginTop: '64px',
            width: open ? 'calc(100% - 280px)' : '100%',
            minHeight: 'calc(100vh - 64px)',
            padding: '24px',
            transition: 'margin-left 0.3s ease, width 0.3s ease',
            position: 'relative',
            zIndex: 10
        },
        contentCard: {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            minHeight: 'calc(100vh - 112px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'auto'
        },
        mobileOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1250,
            display: 'none'
        }
    };

    return (
        <>
            <style>
                {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        33% { transform: translateY(-20px) rotate(120deg); }
                        66% { transform: translateY(-10px) rotate(240deg); }
                    }
                    button:hover {
                        background: rgba(255, 255, 255, 0.1) !important;
                    }
                    @media (max-width: 768px) {
                        .app-bar {
                            left: 0 !important;
                        }
                        .main-content {
                            margin-left: 0 !important;
                            width: 100% !important;
                        }
                        .mobile-overlay {
                            display: ${open ? 'block' : 'none'} !important;
                        }
                    }
                `}
            </style>
            <div style={styles.container}>
                {/* Floating Elements */}
                <div style={{...styles.floatingElement, ...styles.floatingElement1}}></div>
                <div style={{...styles.floatingElement, ...styles.floatingElement2}}></div>
                <div style={{...styles.floatingElement, ...styles.floatingElement3}}></div>
                <div style={{...styles.floatingElement, ...styles.floatingElement4}}></div>

                {/* Mobile Overlay */}
                <div 
                    className="mobile-overlay"
                    style={styles.mobileOverlay}
                    onClick={toggleDrawer}
                ></div>

                {/* App Bar */}
                <header className="app-bar" style={styles.appBar}>
                    <button 
                        style={styles.menuButton}
                        onClick={toggleDrawer}
                        aria-label="Open navigation menu"
                    >
                        ☰
                    </button>
                    <h1 style={styles.title}>Student Dashboard</h1>
                    <AccountMenu />
                </header>

                {/* Sidebar */}
                <nav style={styles.sidebar}>
                    <div style={styles.sidebarHeader}>
                        <h2 style={styles.sidebarTitle}></h2>
                        <button 
                            style={styles.closeButton}
                            onClick={toggleDrawer}
                            aria-label="Close navigation menu"
                        >
                            ✕
                        </button>
                    </div>
                    <div style={{ padding: '16px 0' }}>
                        <StudentSideBar />
                    </div>
                </nav>

                {/* Main Content */}
                <main className="main-content" style={styles.mainContent}>
                    <div style={styles.contentCard}>
                        <Routes>
                            <Route path="/" element={<StudentHomePage />} />
                            <Route path='*' element={<Navigate to="/" />} />
                            <Route path="/Student/dashboard" element={<StudentHomePage />} />
                            <Route path="/Student/profile" element={<StudentProfile />} />
                            <Route path="/Student/subjects" element={<StudentSubjects />} />
                            <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                            <Route path="/Student/complain" element={<StudentComplain />} />
                            <Route path="/logout" element={<Logout />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </>
    );
};

export default StudentDashboard;