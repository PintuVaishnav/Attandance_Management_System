import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomBarChart from '../../components/CustomBarChart';

const ViewStdAttendance = () => {
    const dispatch = useDispatch();

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance)

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

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
            maxWidth: '1200px',
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
            marginBottom: '24px'
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
            border: '1px solid rgba(255, 255, 255, 0.2)'
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
        detailsButton: {
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        collapsibleRow: {
            background: 'rgba(255, 255, 255, 0.02)'
        },
        collapsibleContent: {
            padding: '0',
            border: 'none'
        },
        detailsContainer: {
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            margin: '8px'
        },
        detailsTitle: {
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px'
        },
        detailsTable: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        detailsTableCell: {
            padding: '12px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '14px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        },
        overallAttendance: {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            textAlign: 'center',
            marginTop: '16px'
        },
        loadingText: {
            color: 'white',
            fontSize: '18px',
            fontWeight: '500',
            textAlign: 'center'
        },
        noDataText: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '18px',
            fontWeight: '500',
            textAlign: 'center'
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
                <h1 style={styles.heading}>Attendance</h1>
                <table style={styles.table}>
                    <thead style={styles.tableHeader}>
                        <tr>
                            <th style={styles.tableHeaderCell}>Subject</th>
                            <th style={styles.tableHeaderCell}>Present</th>
                            <th style={styles.tableHeaderCell}>Total Sessions</th>
                            <th style={styles.tableHeaderCell}>Attendance %</th>
                            <th style={styles.tableHeaderCell}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                            const isOpen = openStates[subId];

                            return (
                                <React.Fragment key={index}>
                                    <tr style={styles.tableRow} className="table-row">
                                        <td style={styles.tableCell}>{subName}</td>
                                        <td style={styles.tableCell}>{present}</td>
                                        <td style={styles.tableCell}>{sessions}</td>
                                        <td style={styles.tableCell}>{subjectAttendancePercentage}%</td>
                                        <td style={styles.tableCell}>
                                            <button
                                                style={styles.detailsButton}
                                                onClick={() => handleOpen(subId)}
                                                className="details-button"
                                            >
                                                <span>{isOpen ? '▲' : '▼'}</span>
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                    {isOpen && (
                                        <tr style={styles.collapsibleRow}>
                                            <td style={styles.collapsibleContent} colSpan={5}>
                                                <div style={styles.detailsContainer}>
                                                    <h3 style={styles.detailsTitle}>Attendance Details</h3>
                                                    <table style={styles.detailsTable}>
                                                        <thead>
                                                            <tr>
                                                                <th style={styles.detailsTableCell}>Date</th>
                                                                <th style={styles.detailsTableCell}>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {allData.map((data, detailIndex) => {
                                                                const date = new Date(data.date);
                                                                const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                return (
                                                                    <tr key={detailIndex}>
                                                                        <td style={styles.detailsTableCell}>{dateString}</td>
                                                                        <td style={styles.detailsTableCell}>{data.status}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
                <div style={styles.overallAttendance}>
                    Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
                </div>
            </div>
        );
    };

    const renderChartSection = () => {
        return (
            <div style={styles.contentCard}>
                <h1 style={styles.heading}>Attendance Chart</h1>
                <div style={styles.chartContainer}>
                    <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
                </div>
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
                    .details-button:hover {
                        background: rgba(255, 255, 255, 0.2) !important;
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
                        table {
                            font-size: 12px !important;
                        }
                        th, td {
                            padding: 8px !important;
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
                            {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
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
                                <div style={styles.contentCard}>
                                    <div style={styles.noDataText}>
                                        Currently You Have No Attendance Details
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ViewStdAttendance;