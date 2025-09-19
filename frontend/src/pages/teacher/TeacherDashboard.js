import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import TeacherSideBar from './TeacherSideBar';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';
import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';

const TeacherDashboard = () => {
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
            animation: 'float 6s ease-in-out infinite'
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
            left: open ? '280px' : '0',
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
            transition: 'background 0.3s ease',
            display: open ? 'none' : 'block'
        },
        title: {
            color: 'white',
            fontSize: '20px',
            fontWeight: '600',
            flexGrow: 1
        },
        sidebar: {
            position: 'fixed',
            top: 0,
            left: open ? '0' : '-280px',
            width: '280px',
            height: '100vh',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)',
            zIndex: 1300,
            transition: 'left 0.3s ease',
            display: 'flex',
            flexDirection: 'column'
        },
        sidebarHeader: {
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        },
        closeButton: {
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'background 0.3s ease'
        },
        sidebarContent: {
            flex: 1,
            padding: '16px 0'
        },
        mainContent: {
            flex: 1,
            marginLeft: open ? '280px' : '0',
            marginTop: '64px',
            padding: '24px',
            transition: 'margin-left 0.3s ease',
            position: 'relative',
            zIndex: 10,
            minHeight: 'calc(100vh - 64px)'
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1250,
            display: open ? 'block' : 'none'
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
                    .menu-button:hover, .close-button:hover {
                        background: rgba(255, 255, 255, 0.1) !important;
                    }
                    @media (max-width: 768px) {
                        .sidebar {
                            left: ${open ? '0' : '-280px'} !important;
                        }
                        .app-bar {
                            left: 0 !important;
                        }
                        .main-content {
                            margin-left: 0 !important;
                        }
                        .overlay {
                            display: ${open ? 'block' : 'none'} !important;
                        }
                    }
                    @media (min-width: 769px) {
                        .overlay {
                            display: none !important;
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
                    style={styles.overlay} 
                    className="overlay"
                    onClick={toggleDrawer}
                ></div>

                {/* App Bar */}
                <header style={styles.appBar} className="app-bar">
                    <button
                        style={styles.menuButton}
                        className="menu-button"
                        onClick={toggleDrawer}
                        aria-label="open drawer"
                    >
                        ☰
                    </button>
                    <h1 style={styles.title}>Teacher Dashboard</h1>
                    <AccountMenu />
                </header>

                {/* Sidebar */}
                <aside style={styles.sidebar} className="sidebar">
                    <div style={styles.sidebarHeader}>
                        <button
                            style={styles.closeButton}
                            className="close-button"
                            onClick={toggleDrawer}
                            aria-label="close drawer"
                        >
                            ←
                        </button>
                    </div>
                    <nav style={styles.sidebarContent}>
                        <TeacherSideBar />
                    </nav>
                </aside>

                {/* Main Content */}
                <main style={styles.mainContent} className="main-content">
                    <Routes>
                        <Route path="/" element={<TeacherHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
                        <Route path="/Teacher/profile" element={<TeacherProfile />} />
                        <Route path="/Teacher/complain" element={<TeacherComplain />} />
                        <Route path="/Teacher/class" element={<TeacherClassDetails />} />
                        <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />
                        <Route path="/Teacher/class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Teacher/class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </main>
            </div>
        </>
    );
};

export default TeacherDashboard;