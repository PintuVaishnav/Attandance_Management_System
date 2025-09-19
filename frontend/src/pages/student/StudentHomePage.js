import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id;

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

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
        chartCard: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '240px',
            textAlign: 'center'
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
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            marginTop: '24px'
        },
        loadingText: {
            color: 'white',
            fontSize: '18px',
            fontWeight: '500'
        },
        noDataText: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '16px',
            fontWeight: '500'
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
                    <h1 style={styles.heading}>Student Dashboard</h1>
                    
                    <div className="stats-grid" style={styles.statsGrid}>
                        {/* Total Subjects Card */}
                        <div className="stat-card" style={styles.statCard}>
                            <img src={Subject || "/placeholder.svg"} alt="Subjects" style={styles.statIcon} />
                            <h3 style={styles.statTitle}>Total Subjects</h3>
                            <div style={styles.statValue}>
                                <CountUp start={0} end={numberOfSubjects || 0} duration={2.5} />
                            </div>
                        </div>

                        {/* Total Assignments Card */}
                        <div className="stat-card" style={styles.statCard}>
                            <img src={Assignment || "/placeholder.svg"} alt="Assignments" style={styles.statIcon} />
                            <h3 style={styles.statTitle}>Total Assignments</h3>
                            <div style={styles.statValue}>
                                <CountUp start={0} end={15} duration={4} />
                            </div>
                        </div>

                        {/* Attendance Chart Card */}
                        <div style={styles.chartCard}>
                            {response ? (
                                <div style={styles.noDataText}>No Attendance Found</div>
                            ) : (
                                <>
                                    {loading ? (
                                        <div style={styles.loadingText}>Loading...</div>
                                    ) : (
                                        <>
                                            {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                <>
                                                    <h3 style={{...styles.statTitle, marginBottom: '20px'}}>
                                                        Attendance Overview
                                                    </h3>
                                                    <CustomPieChart data={chartData} />
                                                </>
                                            ) : (
                                                <div style={styles.noDataText}>No Attendance Found</div>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
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

export default StudentHomePage;