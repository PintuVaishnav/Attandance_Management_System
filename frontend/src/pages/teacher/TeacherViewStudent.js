import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';

const TeacherViewStudent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student";
    const studentID = params.id;
    const teachSubject = currentUser.teachSubject?.subName;
    const teachSubjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    // Simple Pie Chart Component
    const SimplePieChart = ({ data }) => {
        const presentPercentage = data[0]?.value || 0;
        const absentPercentage = data[1]?.value || 0;
        
        return (
            <div style={styles.chartContainer}>
                <div style={styles.chartTitle}>Attendance Overview</div>
                <div style={styles.pieChart}>
                    <div 
                        style={{
                            ...styles.pieSlice,
                            background: `conic-gradient(#51cf66 0deg ${presentPercentage * 3.6}deg, #ff6b6b ${presentPercentage * 3.6}deg 360deg)`
                        }}
                    ></div>
                </div>
                <div style={styles.chartLegend}>
                    <div style={styles.legendItem}>
                        <div style={{...styles.legendColor, background: '#51cf66'}}></div>
                        <span>Present: {presentPercentage.toFixed(1)}%</span>
                    </div>
                    <div style={styles.legendItem}>
                        <div style={{...styles.legendColor, background: '#ff6b6b'}}></div>
                        <span>Absent: {absentPercentage.toFixed(1)}%</span>
                    </div>
                </div>
            </div>
        );
    };

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
        studentInfo: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            marginBottom: '32px'
        },
        infoItem: {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        },
        infoLabel: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '4px'
        },
        infoValue: {
            color: 'white',
            fontSize: '16px',
            fontWeight: '600'
        },
        sectionTitle: {
            color: 'white',
            fontSize: '22px',
            fontWeight: '600',
            marginBottom: '20px'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '16px'
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
        button: {
            background: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(81, 207, 102, 0.3)',
            marginRight: '12px',
            marginBottom: '12px'
        },
        detailsButton: {
            background: 'rgba(59, 130, 246, 0.8)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        collapsibleContent: {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '16px',
            marginTop: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        },
        loadingText: {
            color: 'white',
            fontSize: '18px',
            fontWeight: '500',
            textAlign: 'center'
        },
        chartContainer: {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px',
            marginTop: '20px',
            textAlign: 'center'
        },
        chartTitle: {
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px'
        },
        pieChart: {
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            margin: '0 auto 16px',
            position: 'relative'
        },
        pieSlice: {
            width: '100%',
            height: '100%',
            borderRadius: '50%'
        },
        chartLegend: {
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap'
        },
        legendItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '14px'
        },
        legendColor: {
            width: '12px',
            height: '12px',
            borderRadius: '50%'
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
                    .table-row:hover {
                        background: rgba(255, 255, 255, 0.1) !important;
                    }
                    .button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(81, 207, 102, 0.4) !important;
                    }
                    .details-button:hover {
                        background: rgba(59, 130, 246, 1) !important;
                    }
                    @media (max-width: 768px) {
                        .student-info {
                            grid-template-columns: 1fr !important;
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
                            <div style={styles.contentCard}>
                                <h1 style={styles.heading}>Student Details</h1>
                                
                                {/* Student Basic Information */}
                                <div className="student-info" style={styles.studentInfo}>
                                    <div style={styles.infoItem}>
                                        <div style={styles.infoLabel}>Name</div>
                                        <div style={styles.infoValue}>{userDetails.name}</div>
                                    </div>
                                    <div style={styles.infoItem}>
                                        <div style={styles.infoLabel}>Roll Number</div>
                                        <div style={styles.infoValue}>{userDetails.rollNum}</div>
                                    </div>
                                    <div style={styles.infoItem}>
                                        <div style={styles.infoLabel}>Class</div>
                                        <div style={styles.infoValue}>{sclassName.sclassName}</div>
                                    </div>
                                    <div style={styles.infoItem}>
                                        <div style={styles.infoLabel}>School</div>
                                        <div style={styles.infoValue}>{studentSchool.schoolName}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Attendance Section */}
                            <div style={styles.contentCard}>
                                <h3 style={styles.sectionTitle}>Attendance</h3>
                                {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
                                    <>
                                        {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                            if (subName === teachSubject) {
                                                const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                                                return (
                                                    <div key={index}>
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
                                                                <tr style={styles.tableRow} className="table-row">
                                                                    <td style={styles.tableCell}>{subName}</td>
                                                                    <td style={styles.tableCell}>{present}</td>
                                                                    <td style={styles.tableCell}>{sessions}</td>
                                                                    <td style={styles.tableCell}>{subjectAttendancePercentage}%</td>
                                                                    <td style={styles.tableCell}>
                                                                        <button
                                                                            style={styles.detailsButton}
                                                                            className="details-button"
                                                                            onClick={() => handleOpen(subId)}
                                                                        >
                                                                            {openStates[subId] ? '▲' : '▼'} Details
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        
                                                        {openStates[subId] && (
                                                            <div style={styles.collapsibleContent}>
                                                                <h4 style={{color: 'white', marginBottom: '16px'}}>Attendance Details</h4>
                                                                <table style={styles.table}>
                                                                    <thead style={styles.tableHeader}>
                                                                        <tr>
                                                                            <th style={styles.tableHeaderCell}>Date</th>
                                                                            <th style={styles.tableHeaderCell}>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {allData.map((data, index) => {
                                                                            const date = new Date(data.date);
                                                                            const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                            return (
                                                                                <tr key={index} style={styles.tableRow} className="table-row">
                                                                                    <td style={styles.tableCell}>{dateString}</td>
                                                                                    <td style={styles.tableCell}>
                                                                                        <span style={{
                                                                                            color: data.status === 'Present' ? '#51cf66' : '#ff6b6b',
                                                                                            fontWeight: '600'
                                                                                        }}>
                                                                                            {data.status}
                                                                                        </span>
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                        
                                        <div style={{color: 'white', fontSize: '18px', fontWeight: '600', marginTop: '20px'}}>
                                            Overall Attendance: {overallAttendancePercentage.toFixed(2)}%
                                        </div>

                                        <SimplePieChart data={[
                                            { name: 'Present', value: overallAttendancePercentage },
                                            { name: 'Absent', value: overallAbsentPercentage }
                                        ]} />
                                    </>
                                )}
                                
                                <button
                                    style={styles.button}
                                    className="button"
                                    onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}
                                >
                                    Add Attendance
                                </button>
                            </div>

                            {/* Subject Marks Section */}
                            <div style={styles.contentCard}>
                                <h3 style={styles.sectionTitle}>Subject Marks</h3>
                                {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 && (
                                    <>
                                        {subjectMarks.map((result, index) => {
                                            if (result.subName.subName === teachSubject) {
                                                return (
                                                    <table key={index} style={styles.table}>
                                                        <thead style={styles.tableHeader}>
                                                            <tr>
                                                                <th style={styles.tableHeaderCell}>Subject</th>
                                                                <th style={styles.tableHeaderCell}>Marks</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr style={styles.tableRow} className="table-row">
                                                                <td style={styles.tableCell}>{result.subName.subName}</td>
                                                                <td style={styles.tableCell}>
                                                                    <span style={{color: '#51cf66', fontWeight: '600'}}>
                                                                        {result.marksObtained}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                );
                                            }
                                            return null;
                                        })}
                                    </>
                                )}
                                
                                <button
                                    style={styles.button}
                                    className="button"
                                    onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}
                                >
                                    Add Marks
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default TeacherViewStudent;