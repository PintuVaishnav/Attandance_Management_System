import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails]);

    useEffect(() => {
        if (subjectMarks === []) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (newSection) => {
        setSelectedSection(newSection);
    };

    // Inline Styles
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative',
            overflow: 'hidden',
            padding: '24px',
            paddingBottom: '100px'
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
            maxWidth: '1000px',
            margin: '0 auto'
        },
        contentCard: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            marginBottom: '24px'
        },
        heading: {
            color: 'white',
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '24px',
            textAlign: 'center'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '16px'
        },
        tableHeader: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
        },
        tableHeaderCell: {
            padding: '16px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            textAlign: 'left',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px 8px 0 0'
        },
        tableRow: {
            background: 'rgba(255, 255, 255, 0.05)',
            transition: 'background 0.3s ease'
        },
        tableCell: {
            padding: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '15px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        },
        loadingText: {
            color: 'white',
            fontSize: '18px',
            fontWeight: '500',
            textAlign: 'center'
        },
        classInfo: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '18px',
            fontWeight: '500',
            marginBottom: '16px'
        },
        subjectItem: {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '8px',
            color: 'white',
            fontSize: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        },
        bottomNavigation: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '16px',
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            zIndex: 1000
        },
        navButton: {
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            padding: '12px 24px',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
        },
        navButtonActive: {
            background: 'rgba(255, 255, 255, 0.15)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        },
        navIcon: {
            fontSize: '20px'
        },
        chartContainer: {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px'
        }
    };

    const renderTableSection = () => {
        return (
            <div style={styles.contentCard}>
                <h2 style={styles.heading}>Subject Marks</h2>
                <table style={styles.table}>
                    <thead style={styles.tableHeader}>
                        <tr>
                            <th style={styles.tableHeaderCell}>Subject</th>
                            <th style={styles.tableHeaderCell}>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjectMarks.map((result, index) => {
                            if (!result.subName || !result.marksObtained) {
                                return null;
                            }
                            return (
                                <tr key={index} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{result.subName.subName}</td>
                                    <td style={styles.tableCell}>{result.marksObtained}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderChartSection = () => {
        return (
            <div style={styles.contentCard}>
                <h2 style={styles.heading}>Marks Chart</h2>
                <div style={styles.chartContainer}>
                    <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
                </div>
            </div>
        );
    };

    const renderClassDetailsSection = () => {
        return (
            <div style={styles.contentCard}>
                <h2 style={styles.heading}>Class Details</h2>
                <p style={styles.classInfo}>
                    You are currently in Class {sclassDetails && sclassDetails.sclassName}
                </p>
                <p style={styles.classInfo}>
                    And these are the subjects:
                </p>
                {subjectsList &&
                    subjectsList.map((subject, index) => (
                        <div key={index} style={styles.subjectItem}>
                            {subject.subName} ({subject.subCode})
                        </div>
                    ))}
            </div>
        );
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
                    .table-row:hover {
                        background: rgba(255, 255, 255, 0.1) !important;
                    }
                    .nav-button:hover {
                        background: rgba(255, 255, 255, 0.1) !important;
                        color: white !important;
                    }
                    @media (max-width: 768px) {
                        .bottom-nav {
                            gap: 16px !important;
                        }
                        .nav-button {
                            padding: 8px 16px !important;
                            font-size: 12px !important;
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
                    {loading ? (
                        <div style={styles.contentCard}>
                            <div style={styles.loadingText}>Loading...</div>
                        </div>
                    ) : (
                        <>
                            {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
                                <>
                                    {selectedSection === 'table' && renderTableSection()}
                                    {selectedSection === 'chart' && renderChartSection()}

                                    <div className="bottom-nav" style={styles.bottomNavigation}>
                                        <button
                                            className="nav-button"
                                            style={{
                                                ...styles.navButton,
                                                ...(selectedSection === 'table' ? styles.navButtonActive : {})
                                            }}
                                            onClick={() => handleSectionChange('table')}
                                        >
                                            <span style={styles.navIcon}>📊</span>
                                            Table
                                        </button>
                                        <button
                                            className="nav-button"
                                            style={{
                                                ...styles.navButton,
                                                ...(selectedSection === 'chart' ? styles.navButtonActive : {})
                                            }}
                                            onClick={() => handleSectionChange('chart')}
                                        >
                                            <span style={styles.navIcon}>📈</span>
                                            Chart
                                        </button>
                                    </div>
                                </>
                            ) : (
                                renderClassDetailsSection()
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default StudentSubjects;