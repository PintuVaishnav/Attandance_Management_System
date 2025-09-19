import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { removeStuff, updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
import CustomBarChart from '../../../components/CustomBarChart';
import CustomPieChart from '../../../components/CustomPieChart';
import Popup from '../../../components/Popup';

const ViewStudent = () => {
    const [showTab, setShowTab] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { userDetails, response, loading, error } = useSelector((state) => state.user);

    const studentID = params.id;
    const address = "Student";

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [openStates, setOpenStates] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [value, setValue] = useState('1');
    const [selectedSection, setSelectedSection] = useState('table');

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const fields = password === ""
        ? { name, rollNum }
        : { name, rollNum, password };

    useEffect(() => {
        if (userDetails) {
            setName(userDetails.name || '');
            setRollNum(userDetails.rollNum || '');
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser(fields, studentID, address))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deleteHandler = () => {
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const removeHandler = (id, deladdress) => {
        dispatch(removeStuff(id, deladdress))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            });
    };

    const removeSubAttendance = (subId) => {
        dispatch(updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten"))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            });
    };

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    // Inline Styles
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative',
            overflow: 'hidden'
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
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto'
        },
        tabContainer: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '0',
            marginBottom: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        },
        tabList: {
            display: 'flex',
            borderRadius: '24px 24px 0 0',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '0',
            margin: '0',
            listStyle: 'none'
        },
        tab: {
            flex: 1,
            padding: '16px 24px',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            borderRadius: '24px 24px 0 0'
        },
        activeTab: {
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontWeight: '600'
        },
        tabContent: {
            padding: '32px',
            minHeight: '400px'
        },
        card: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '20px'
        },
        tableHeader: {
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            fontWeight: '600',
            padding: '16px',
            textAlign: 'left',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        },
        tableCell: {
            padding: '12px 16px',
            color: 'rgba(255, 255, 255, 0.9)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        },
        button: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            margin: '4px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        },
        buttonHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)'
        },
        deleteButton: {
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
            color: 'white'
        },
        detailsText: {
            color: 'white',
            fontSize: '18px',
            lineHeight: '1.6',
            marginBottom: '12px'
        },
        heading: {
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '20px',
            textAlign: 'center'
        },
        loadingContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            color: 'white',
            fontSize: '18px'
        },
        spinner: {
            width: '40px',
            height: '40px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginRight: '16px'
        },
        bottomNav: {
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            justifyContent: 'center',
            padding: '12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
        },
        navButton: {
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.7)',
            padding: '12px 24px',
            margin: '0 8px',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '14px'
        },
        activeNavButton: {
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white'
        }
    };

    const StudentAttendanceSection = () => {
        const renderTableSection = () => {
            return (
                <div style={styles.card}>
                    <h3 style={styles.heading}>Attendance Records</h3>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>Subject</th>
                                <th style={styles.tableHeader}>Present</th>
                                <th style={styles.tableHeader}>Total Sessions</th>
                                <th style={styles.tableHeader}>Attendance %</th>
                                <th style={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                                return (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td style={styles.tableCell}>{subName}</td>
                                            <td style={styles.tableCell}>{present}</td>
                                            <td style={styles.tableCell}>{sessions}</td>
                                            <td style={styles.tableCell}>{subjectAttendancePercentage}%</td>
                                            <td style={styles.tableCell}>
                                                <button 
                                                    style={styles.button}
                                                    onClick={() => handleOpen(subId)}
                                                >
                                                    {openStates[subId] ? '▲' : '▼'} Details
                                                </button>
                                                <button 
                                                    style={{...styles.button, ...styles.deleteButton}}
                                                    onClick={() => removeSubAttendance(subId)}
                                                >
                                                    Delete
                                                </button>
                                                <button 
                                                    style={styles.button}
                                                    onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}
                                                >
                                                    Change
                                                </button>
                                            </td>
                                        </tr>
                                        {openStates[subId] && (
                                            <tr>
                                                <td colSpan="5" style={{...styles.tableCell, padding: '0'}}>
                                                    <div style={{padding: '16px', background: 'rgba(255, 255, 255, 0.05)'}}>
                                                        <h4 style={{color: 'white', marginBottom: '12px'}}>Attendance Details</h4>
                                                        <table style={{...styles.table, margin: '0'}}>
                                                            <thead>
                                                                <tr>
                                                                    <th style={styles.tableHeader}>Date</th>
                                                                    <th style={styles.tableHeader}>Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {allData.map((data, idx) => {
                                                                    const date = new Date(data.date);
                                                                    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                    return (
                                                                        <tr key={idx}>
                                                                            <td style={styles.tableCell}>{dateString}</td>
                                                                            <td style={styles.tableCell}>{data.status}</td>
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
                    <div style={styles.detailsText}>
                        Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
                    </div>
                    <button 
                        style={{...styles.button, ...styles.deleteButton}}
                        onClick={() => removeHandler(studentID, "RemoveStudentAtten")}
                    >
                        Delete All
                    </button>
                    <button 
                        style={styles.button}
                        onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}
                    >
                        Add Attendance
                    </button>
                </div>
            );
        };

        const renderChartSection = () => {
            return (
                <div style={styles.card}>
                    <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
                </div>
            );
        };

        return (
            <>
                {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                    <>
                        {selectedSection === 'table' && renderTableSection()}
                        {selectedSection === 'chart' && renderChartSection()}
                        <div style={styles.bottomNav}>
                            <button
                                style={{
                                    ...styles.navButton,
                                    ...(selectedSection === 'table' ? styles.activeNavButton : {})
                                }}
                                onClick={() => setSelectedSection('table')}
                            >
                                📊 Table
                            </button>
                            <button
                                style={{
                                    ...styles.navButton,
                                    ...(selectedSection === 'chart' ? styles.activeNavButton : {})
                                }}
                                onClick={() => setSelectedSection('chart')}
                            >
                                📈 Chart
                            </button>
                        </div>
                    </>
                ) : (
                    <div style={styles.card}>
                        <button 
                            style={styles.button}
                            onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}
                        >
                            Add Attendance
                        </button>
                    </div>
                )}
            </>
        );
    };

    const StudentMarksSection = () => {
        const renderTableSection = () => {
            return (
                <div style={styles.card}>
                    <h3 style={styles.heading}>Subject Marks</h3>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>Subject</th>
                                <th style={styles.tableHeader}>Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjectMarks.map((result, index) => {
                                if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                return (
                                    <tr key={index}>
                                        <td style={styles.tableCell}>{result.subName.subName}</td>
                                        <td style={styles.tableCell}>{result.marksObtained}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <button 
                        style={styles.button}
                        onClick={() => navigate("/Admin/students/student/marks/" + studentID)}
                    >
                        Add Marks
                    </button>
                </div>
            );
        };

        const renderChartSection = () => {
            return (
                <div style={styles.card}>
                    <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
                </div>
            );
        };

        return (
            <>
                {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
                    <>
                        {selectedSection === 'table' && renderTableSection()}
                        {selectedSection === 'chart' && renderChartSection()}
                        <div style={styles.bottomNav}>
                            <button
                                style={{
                                    ...styles.navButton,
                                    ...(selectedSection === 'table' ? styles.activeNavButton : {})
                                }}
                                onClick={() => setSelectedSection('table')}
                            >
                                📊 Table
                            </button>
                            <button
                                style={{
                                    ...styles.navButton,
                                    ...(selectedSection === 'chart' ? styles.activeNavButton : {})
                                }}
                                onClick={() => setSelectedSection('chart')}
                            >
                                📈 Chart
                            </button>
                        </div>
                    </>
                ) : (
                    <div style={styles.card}>
                        <button 
                            style={styles.button}
                            onClick={() => navigate("/Admin/students/student/marks/" + studentID)}
                        >
                            Add Marks
                        </button>
                    </div>
                )}
            </>
        );
    };

    const StudentDetailsSection = () => {
        return (
            <div style={styles.card}>
                <h3 style={styles.heading}>Student Details</h3>
                <div style={styles.detailsText}>
                    <strong>Name:</strong> {userDetails.name}
                </div>
                <div style={styles.detailsText}>
                    <strong>Roll Number:</strong> {userDetails.rollNum}
                </div>
                <div style={styles.detailsText}>
                    <strong>Class:</strong> {sclassName.sclassName}
                </div>
                <div style={styles.detailsText}>
                    <strong>School:</strong> {studentSchool.schoolName}
                </div>
                {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
                    <div style={{marginTop: '20px'}}>
                        <CustomPieChart data={chartData} />
                    </div>
                )}
                <button 
                    style={{...styles.button, ...styles.deleteButton}}
                    onClick={deleteHandler}
                >
                    Delete Student
                </button>
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
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
                    }
                `}
            </style>
            <div style={styles.container}>
                {/* Floating Elements */}
                <div style={{...styles.floatingElement, ...styles.floatingElement1}}></div>
                <div style={{...styles.floatingElement, ...styles.floatingElement2}}></div>
                <div style={{...styles.floatingElement, ...styles.floatingElement3}}></div>
                <div style={{...styles.floatingElement, ...styles.floatingElement4}}></div>

                {loading ? (
                    <div style={styles.loadingContainer}>
                        <div style={styles.spinner}></div>
                        Loading student details...
                    </div>
                ) : (
                    <div style={styles.mainContent}>
                        <div style={styles.tabContainer}>
                            <div style={styles.tabList}>
                                <button
                                    style={{
                                        ...styles.tab,
                                        ...(value === '1' ? styles.activeTab : {})
                                    }}
                                    onClick={() => setValue('1')}
                                >
                                    Details
                                </button>
                                <button
                                    style={{
                                        ...styles.tab,
                                        ...(value === '2' ? styles.activeTab : {})
                                    }}
                                    onClick={() => setValue('2')}
                                >
                                    Attendance
                                </button>
                                <button
                                    style={{
                                        ...styles.tab,
                                        ...(value === '3' ? styles.activeTab : {})
                                    }}
                                    onClick={() => setValue('3')}
                                >
                                    Marks
                                </button>
                            </div>
                            <div style={styles.tabContent}>
                                {value === '1' && <StudentDetailsSection />}
                                {value === '2' && <StudentAttendanceSection />}
                                {value === '3' && <StudentMarksSection />}
                            </div>
                        </div>
                    </div>
                )}
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </div>
        </>
    );
};

export default ViewStudent;