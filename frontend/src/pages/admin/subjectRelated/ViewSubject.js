import React, { useEffect, useState } from 'react';
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ViewSubject = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

    const { classID, subjectID } = params;

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    if (error) {
        console.log(error);
    }

    const [value, setValue] = useState('1');
    const [selectedSection, setSelectedSection] = useState('attendance');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const studentColumns = [
        { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
        { id: 'name', label: 'Name', minWidth: 170 },
    ];

    const studentRows = sclassStudents.map((student) => {
        return {
            rollNum: student.rollNum,
            name: student.name,
            id: student._id,
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
            margin: '0 auto',
            paddingBottom: '100px'
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
        heading: {
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '20px',
            textAlign: 'center'
        },
        detailsText: {
            color: 'white',
            fontSize: '18px',
            lineHeight: '1.6',
            marginBottom: '12px'
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
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            margin: '4px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
        },
        greenButton: {
            background: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
            color: 'white'
        },
        purpleButton: {
            background: 'linear-gradient(135deg, #9775fa 0%, #845ef7 100%)',
            color: 'white'
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
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            zIndex: 1000
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
            fontSize: '14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
        },
        activeNavButton: {
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white'
        },
        emptyState: {
            textAlign: 'center',
            color: 'white',
            fontSize: '18px',
            padding: '40px'
        }
    };

    const StudentsAttendanceButtonHaver = ({ row }) => {
        return (
            <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                    style={styles.button}
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                >
                    View
                </button>
                <button 
                    style={{...styles.button, ...styles.purpleButton}}
                    onClick={() => navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)}
                >
                    Take Attendance
                </button>
            </div>
        );
    };

    const StudentsMarksButtonHaver = ({ row }) => {
        return (
            <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                    style={styles.button}
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                >
                    View
                </button>
                <button 
                    style={{...styles.button, ...styles.purpleButton}}
                    onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}
                >
                    Provide Marks
                </button>
            </div>
        );
    };

    const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows }) => {
        return (
            <table style={styles.table}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.id} style={styles.tableHeader}>
                                {column.label}
                            </th>
                        ))}
                        <th style={styles.tableHeader}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={row.id || index}>
                            {columns.map((column) => (
                                <td key={column.id} style={styles.tableCell}>
                                    {row[column.id]}
                                </td>
                            ))}
                            <td style={styles.tableCell}>
                                <ButtonHaver row={row} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const SubjectStudentsSection = () => {
        return (
            <>
                {getresponse ? (
                    <div style={styles.card}>
                        <div style={styles.emptyState}>
                            <h3 style={styles.heading}>No Students Found</h3>
                            <p style={{ marginBottom: '24px', opacity: 0.8 }}>
                                Add students to this class to get started.
                            </p>
                            <button 
                                style={{...styles.button, ...styles.greenButton}}
                                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                            >
                                Add Students
                            </button>
                        </div>
                    </div>
                ) : (
                    <div style={styles.card}>
                        <h3 style={styles.heading}>Students List</h3>
                        
                        {selectedSection === 'attendance' && (
                            <TableTemplate 
                                buttonHaver={StudentsAttendanceButtonHaver} 
                                columns={studentColumns} 
                                rows={studentRows} 
                            />
                        )}
                        {selectedSection === 'marks' && (
                            <TableTemplate 
                                buttonHaver={StudentsMarksButtonHaver} 
                                columns={studentColumns} 
                                rows={studentRows} 
                            />
                        )}
                    </div>
                )}
            </>
        );
    };

    const SubjectDetailsSection = () => {
        const numberOfStudents = sclassStudents.length;

        return (
            <div style={styles.card}>
                <h3 style={styles.heading}>Subject Details</h3>
                <div style={styles.detailsText}>
                    <strong>Subject Name:</strong> {subjectDetails && subjectDetails.subName}
                </div>
                <div style={styles.detailsText}>
                    <strong>Subject Code:</strong> {subjectDetails && subjectDetails.subCode}
                </div>
                <div style={styles.detailsText}>
                    <strong>Subject Sessions:</strong> {subjectDetails && subjectDetails.sessions}
                </div>
                <div style={styles.detailsText}>
                    <strong>Number of Students:</strong> {numberOfStudents}
                </div>
                <div style={styles.detailsText}>
                    <strong>Class Name:</strong> {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
                </div>
                {subjectDetails && subjectDetails.teacher ? (
                    <div style={styles.detailsText}>
                        <strong>Teacher Name:</strong> {subjectDetails.teacher.name}
                    </div>
                ) : (
                    <div style={{ marginTop: '20px' }}>
                        <button 
                            style={{...styles.button, ...styles.greenButton}}
                            onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}
                        >
                            Add Subject Teacher
                        </button>
                    </div>
                )}
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

                {subloading ? (
                    <div style={styles.loadingContainer}>
                        <div style={styles.spinner}></div>
                        Loading subject details...
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
                                    Students
                                </button>
                            </div>
                            <div style={styles.tabContent}>
                                {value === '1' && <SubjectDetailsSection />}
                                {value === '2' && <SubjectStudentsSection />}
                            </div>
                        </div>

                        {/* Bottom Navigation - Only show on Students tab */}
                        {value === '2' && !getresponse && (
                            <div style={styles.bottomNav}>
                                <button
                                    style={{
                                        ...styles.navButton,
                                        ...(selectedSection === 'attendance' ? styles.activeNavButton : {})
                                    }}
                                    onClick={() => setSelectedSection('attendance')}
                                >
                                    <span>📊</span>
                                    <span>Attendance</span>
                                </button>
                                <button
                                    style={{
                                        ...styles.navButton,
                                        ...(selectedSection === 'marks' ? styles.activeNavButton : {})
                                    }}
                                    onClick={() => setSelectedSection('marks')}
                                >
                                    <span>📈</span>
                                    <span>Marks</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ViewSubject;