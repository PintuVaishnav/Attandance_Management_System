import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';
import SeeNotice from '../../components/SeeNotice';
import Students from '../../assets/img1.png';
import Classes from '../../assets/img2.png';
import Teachers from '../../assets/img3.png';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    // Inline Styles
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative',
            overflow: 'hidden',
            padding: '24px'
        },
        floatingElement: {
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            animation: 'float 6s ease-in-out infinite'
        },
        floatingElement1: {
            width: '200px',
            height: '200px',
            top: '10%',
            right: '10%',
            animationDelay: '0s'
        },
        floatingElement2: {
            width: '150px',
            height: '150px',
            bottom: '20%',
            left: '5%',
            animationDelay: '3s'
        },
        floatingElement3: {
            width: '100px',
            height: '100px',
            top: '60%',
            right: '5%',
            animationDelay: '1.5s'
        },
        floatingElement4: {
            width: '80px',
            height: '80px',
            top: '30%',
            left: '8%',
            animationDelay: '4.5s'
        },
        mainContent: {
            position: 'relative',
            zIndex: 10,
            maxWidth: '1200px',
            margin: '0 auto'
        },
        heading: {
            color: 'white',
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '32px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
        },
        statCard: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            height: '280px',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
        },
        statImage: {
            width: '80px',
            height: '80px',
            objectFit: 'contain',
            marginBottom: '16px',
            filter: 'brightness(0) invert(1) drop-shadow(0 4px 8px rgba(255, 255, 255, 0.2))'
        },
        statTitle: {
            color: 'white',
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px'
        },
        statNumber: {
            color: 'white',
            fontSize: '48px',
            fontWeight: '700',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        },
        noticesSection: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        },
        noticesTitle: {
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '24px',
            textAlign: 'center'
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
                    .stat-card:hover {
                        transform: translateY(-8px) !important;
                        box-shadow: 0 16px 48px rgba(255, 255, 255, 0.15) !important;
                        background: rgba(255, 255, 255, 0.15) !important;
                    }
                    @media (max-width: 768px) {
                        .stats-grid {
                            grid-template-columns: 1fr !important;
                        }
                        .stat-card {
                            height: 240px !important;
                            padding: 24px !important;
                        }
                        .stat-number {
                            font-size: 36px !important;
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

                <div style={styles.mainContent}>
                    <h1 style={styles.heading}>Admin Dashboard Overview</h1>
                    
                    {/* Statistics Cards */}
                    <div className="stats-grid" style={styles.statsGrid}>
                        <div style={styles.statCard} className="stat-card">
                            <img 
                                src={Students || "/placeholder.svg?height=80&width=80&query=students icon"} 
                                alt="Students" 
                                style={styles.statImage} 
                            />
                            <div style={styles.statTitle}>Total Students</div>
                            <div style={styles.statNumber}>
                                {typeof numberOfStudents === "number" ? (
                                    <CountUp
                                        key={numberOfStudents}
                                        start={0}
                                        end={numberOfStudents}
                                        duration={2.5}
                                    />
                                ) : (
                                    0
                                )}
                            </div>
                        </div>

                        <div style={styles.statCard} className="stat-card">
                            <img 
                                src={Classes || "/placeholder.svg?height=80&width=80&query=classes icon"} 
                                alt="Classes" 
                                style={styles.statImage} 
                            />
                            <div style={styles.statTitle}>Total Classes</div>
                            <div style={styles.statNumber}>
                                {typeof numberOfClasses === "number" ? (
                                    <CountUp
                                        key={numberOfClasses}
                                        start={0}
                                        end={numberOfClasses}
                                        duration={3}
                                    />
                                ) : (
                                    0
                                )}
                            </div>
                        </div>

                        <div style={styles.statCard} className="stat-card">
                            <img 
                                src={Teachers || "/placeholder.svg?height=80&width=80&query=teachers icon"} 
                                alt="Teachers" 
                                style={styles.statImage} 
                            />
                            <div style={styles.statTitle}>Total Teachers</div>
                            <div style={styles.statNumber}>
                                {typeof numberOfTeachers === "number" ? (
                                    <CountUp
                                        key={numberOfTeachers}
                                        start={0}
                                        end={numberOfTeachers}
                                        duration={2.5}
                                    />
                                ) : (
                                    0
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Notices Section */}
                    <div style={styles.noticesSection}>
                        <h2 style={styles.noticesTitle}>Recent Notices</h2>
                        <SeeNotice />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHomePage;