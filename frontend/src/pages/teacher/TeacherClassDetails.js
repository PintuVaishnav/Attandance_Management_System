import { useEffect, useState, useRef } from "react";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";

const TeacherClassDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);

    const { currentUser } = useSelector((state) => state.user);
    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getClassStudents(classID));
    }, [dispatch, classID])

    if (error) {
        console.log(error)
    }

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];

        const [open, setOpen] = useState(false);
        const [selectedIndex, setSelectedIndex] = useState(0);
        const dropdownRef = useRef(null);

        const handleClick = () => {
            console.info(`You clicked ${options[selectedIndex]}`);
            if (selectedIndex === 0) {
                handleAttendance();
            } else if (selectedIndex === 1) {
                handleMarks();
            }
        };

        const handleAttendance = () => {
            navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`)
        }
        const handleMarks = () => {
            navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`)
        };

        const handleMenuItemClick = (index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        // Close dropdown when clicking outside
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

        const buttonStyles = {
            viewButton: {
                background: 'rgba(59, 130, 246, 0.8)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                marginRight: '8px'
            },
            actionButton: {
                background: 'rgba(59, 130, 246, 0.8)',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '8px 0 0 8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
            },
            dropdownButton: {
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                border: 'none',
                padding: '8px 8px',
                borderRadius: '0 8px 8px 0',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'all 0.3s ease',
                borderLeft: '1px solid rgba(255, 255, 255, 0.2)'
            },
            dropdown: {
                position: 'absolute',
                top: '100%',
                left: '0',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                minWidth: '150px',
                marginTop: '4px'
            },
            dropdownItem: {
                padding: '12px 16px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'background 0.3s ease'
            },
            dropdownItemSelected: {
                background: 'rgba(255, 255, 255, 0.1)'
            }
        };

        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                    style={buttonStyles.viewButton}
                    onClick={() => navigate("/Teacher/class/student/" + row.id)}
                    className="view-button"
                >
                    View
                </button>
                <div style={{ position: 'relative', display: 'flex' }} ref={dropdownRef}>
                    <button
                        style={buttonStyles.actionButton}
                        onClick={handleClick}
                        className="action-button"
                    >
                        {options[selectedIndex]}
                    </button>
                    <button
                        style={buttonStyles.dropdownButton}
                        onClick={handleToggle}
                        className="dropdown-button"
                    >
                        {open ? '▲' : '▼'}
                    </button>
                    {open && (
                        <div style={buttonStyles.dropdown}>
                            {options.map((option, index) => (
                                <div
                                    key={option}
                                    style={{
                                        ...buttonStyles.dropdownItem,
                                        ...(index === selectedIndex ? buttonStyles.dropdownItemSelected : {}),
                                        ...(index === options.length - 1 ? { borderBottom: 'none' } : {})
                                    }}
                                    onClick={() => handleMenuItemClick(index)}
                                    className="dropdown-item"
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
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
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        },
        heading: {
            color: 'white',
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '24px',
            textAlign: 'center'
        },
        subHeading: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '20px',
            fontWeight: '500',
            marginBottom: '20px'
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
                    .view-button:hover {
                        background: rgba(59, 130, 246, 1) !important;
                        transform: translateY(-1px);
                    }
                    .action-button:hover {
                        background: rgba(59, 130, 246, 1) !important;
                    }
                    .dropdown-button:hover {
                        background: rgba(0, 0, 0, 1) !important;
                    }
                    .dropdown-item:hover {
                        background: rgba(255, 255, 255, 0.2) !important;
                    }
                    @media (max-width: 768px) {
                        table {
                            font-size: 12px !important;
                        }
                        th, td {
                            padding: 8px !important;
                        }
                        .view-button, .action-button {
                            padding: 6px 12px !important;
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
                        <div style={styles.contentCard}>
                            <h1 style={styles.heading}>Class Details</h1>
                            {getresponse ? (
                                <div style={styles.noDataText}>
                                    No Students Found
                                </div>
                            ) : (
                                <>
                                    <h2 style={styles.subHeading}>Students List:</h2>
                                    {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
                                        <table style={styles.table}>
                                            <thead style={styles.tableHeader}>
                                                <tr>
                                                    <th style={styles.tableHeaderCell}>Name</th>
                                                    <th style={styles.tableHeaderCell}>Roll Number</th>
                                                    <th style={styles.tableHeaderCell}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {studentRows.map((row, index) => (
                                                    <tr key={row.id} style={styles.tableRow} className="table-row">
                                                        <td style={styles.tableCell}>{row.name}</td>
                                                        <td style={styles.tableCell}>{row.rollNum}</td>
                                                        <td style={styles.tableCell}>
                                                            <StudentsButtonHaver row={row} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TeacherClassDetails;