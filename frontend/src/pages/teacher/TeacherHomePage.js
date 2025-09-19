import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents && sclassStudents.length;
    const numberOfSessions = subjectDetails && subjectDetails.sessions;

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
        mainContent: {
            position: 'relative',
            zIndex: 10,
            maxWidth: '1200px',
            margin: '0 auto'
        },
        heading: {
            color: 'white',
            fontSize: '32px',
            fontWeight: '600',
            marginBottom: '32px',
            textAlign: 'center'
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
        },
        statCard: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '200px',
            justifyContent: 'space-between',
            transition: 'transform 0.3s ease'
        },
        statIcon: {
            width: '60px',
            height: '60px',
            marginBottom: '16px',
            filter: 'brightness(0) invert(1)',
            opacity: 0.9
        },
        statTitle: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '18px',
            fontWeight: '500',
            margin: '16px 0 8px 0'
        },
        statValue: {
            color: '#51cf66',
            fontSize: '36px',
            fontWeight: '700',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        },
        noticeCard: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }
    };

    const statsData = [
        {
            icon: Students,
            title: 'Class Students',
            value: numberOfStudents || 0,
            duration: 2.5,
            suffix: ''
        },
        {
            icon: Lessons,
            title: 'Total Lessons',
            value: numberOfSessions || 0,
            duration: 5,
            suffix: ''
        },
        {
            icon: Tests,
            title: 'Tests Taken',
            value: 24,
            duration: 4,
            suffix: ''
        },
        {
            icon: Time,
            title: 'Total Hours',
            value: 30,
            duration: 4,
            suffix: 'hrs'
        }
    ];

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
                        transform: translateY(-4px);
                    }
                    @media (max-width: 768px) {
                        .stats-grid {
                            grid-template-columns: 1fr !important;
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
                    <h1 style={styles.heading}>Teacher Dashboard</h1>
                    
                    <div className="stats-grid" style={styles.statsGrid}>
                        {statsData.map((stat, index) => (
                            <div key={index} className="stat-card" style={styles.statCard}>
                                <img 
                                    src={stat.icon || "/placeholder.svg"} 
                                    alt={stat.title} 
                                    style={styles.statIcon} 
                                />
                                <h3 style={styles.statTitle}>{stat.title}</h3>
                                <div style={styles.statValue}>
                                    <CountUp 
                                        start={0} 
                                        end={stat.value} 
                                        duration={stat.duration}
                                        suffix={stat.suffix ? ` ${stat.suffix}` : ''}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Notices Section */}
                    <div style={styles.noticeCard}>
                        <SeeNotice />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherHomePage;