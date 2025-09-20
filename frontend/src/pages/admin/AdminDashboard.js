import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';

const AdminDashboard = () => {
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
            height: '70px',
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
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '12px',
            marginRight: '30px',
            transition: 'all 0.3s ease',
            display: open ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        title: {
            color: 'white',
            fontSize: '24px',
            fontWeight: '700',
            flexGrow: 1,
            background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        },
        accountMenuWrapper: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '8px'
        },
        sidebar: {
            position: 'fixed',
            top: 0,
            left: open ? '0' : '-280px',
            width: '280px',
            height: '100vh',
            background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '8px 0 32px rgba(102, 126, 234, 0.2)',
            zIndex: 1300,
            transition: 'left 0.3s ease',
            display: 'flex',
            flexDirection: 'column'
        },
        sidebarHeader: {
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        },
        closeButton: {
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '12px',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        sidebarContent: {
            flex: 1,
            padding: '16px 8px'
        },
        mainContent: {
            flex: 1,
            marginLeft: open ? '280px' : '0',
            marginTop: '70px',
            padding: '24px',
            transition: 'margin-left 0.3s ease',
            position: 'relative',
            zIndex: 10,
            minHeight: 'calc(100vh - 70px)'
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
                        background: rgba(255, 255, 255, 0.2) !important;
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3) !important;
                    }
                    .close-button:hover {
                        transform: rotate(180deg) !important;
                        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
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
                    <h1 style={styles.title}>Admin Dashboard</h1>
                    <div style={styles.accountMenuWrapper}>
                        <AccountMenu />
                    </div>
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
                        <SideBar />
                    </nav>
                </aside>

                {/* Main Content */}
                <main style={styles.mainContent} className="main-content">
                    <Routes>
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                        <Route path="/Admin/profile" element={<AdminProfile />} />
                        <Route path="/Admin/complains" element={<SeeComplains />} />

                        {/* Notice */}
                        <Route path="/Admin/addnotice" element={<AddNotice />} />
                        <Route path="/Admin/notices" element={<ShowNotices />} />

                        {/* Subject */}
                        <Route path="/Admin/subjects" element={<ShowSubjects />} />
                        <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />

                        <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                        <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />

                        <Route
                            path="/Admin/subject/student/attendance/:studentID/:subjectID"
                            element={<StudentAttendance situation="Subject" />}
                        />
                        <Route
                            path="/Admin/subject/student/marks/:studentID/:subjectID"
                            element={<StudentExamMarks situation="Subject" />}
                        />

                        {/* Class */}
                        <Route path="/Admin/addclass" element={<AddClass />} />
                        <Route path="/Admin/classes" element={<ShowClasses />} />
                        <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                        <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

                        {/* Student */}
                        <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                        <Route path="/Admin/students" element={<ShowStudents />} />
                        <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                        <Route
                            path="/Admin/students/student/attendance/:id"
                            element={<StudentAttendance situation="Student" />}
                        />
                        <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                        {/* Teacher */}
                        <Route path="/Admin/teachers" element={<ShowTeachers />} />
                        <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                        <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route
                            path="/Admin/teachers/choosesubject/:classID/:teacherID"
                            element={<ChooseSubject situation="Teacher" />}
                        />
                        <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </main>
            </div>
        </>
    );
};

export default AdminDashboard;