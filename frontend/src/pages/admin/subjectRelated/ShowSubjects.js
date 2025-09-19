import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';

const ShowSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [showSpeedDial, setShowSpeedDial] = useState(false);

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getSubjectList(currentUser._id, "AllSubjects"));
            });
    };

    const subjectRows = subjectsList.map((subject) => {
        return {
            subName: subject.subName,
            sessions: subject.sessions,
            sclassName: subject.sclassName.sclassName,
            sclassID: subject.sclassName._id,
            id: subject._id,
        };
    });

    // Inline Styles
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative',
            overflow: 'hidden',
            padding: '20px'
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
        card: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '20px',
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
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '16px'
        },
        tableCell: {
            padding: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            fontSize: '15px'
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
        deleteButton: {
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
            color: 'white'
        },
        addButton: {
            background: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
            color: 'white',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600'
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
        emptyState: {
            textAlign: 'center',
            color: 'white',
            fontSize: '18px',
            padding: '40px'
        },
        speedDial: {
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1000
        },
        speedDialButton: {
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        speedDialActions: {
            position: 'absolute',
            bottom: '70px',
            right: '0',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        },
        speedDialAction: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap'
        },
        actionButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px'
        }
    };

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button 
                    style={{...styles.button, ...styles.deleteButton}}
                    onClick={() => deleteHandler(row.id, "Subject")}
                    title="Delete Subject"
                >
                    🗑️
                </button>
                <button 
                    style={styles.button}
                    onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}
                >
                    View
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
                    .speed-dial-action:hover {
                        background: rgba(255, 255, 255, 0.2);
                        transform: translateX(-4px);
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
                        Loading subjects...
                    </div>
                ) : (
                    <div style={styles.mainContent}>
                        {response ? (
                            <div style={styles.card}>
                                <div style={styles.emptyState}>
                                    <h2 style={styles.heading}>No Subjects Found</h2>
                                    <p style={{ marginBottom: '24px', opacity: 0.8 }}>
                                        Get started by adding your first subject to the system.
                                    </p>
                                    <button 
                                        style={{...styles.button, ...styles.addButton}}
                                        onClick={() => navigate("/Admin/subjects/chooseclass")}
                                    >
                                        ➕ Add Subjects
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div style={styles.card}>
                                <h1 style={styles.heading}>📚 Subjects Management</h1>
                                {Array.isArray(subjectsList) && subjectsList.length > 0 ? (
                                    <table style={styles.table}>
                                        <thead>
                                            <tr>
                                                <th style={styles.tableHeader}>Subject Name</th>
                                                <th style={styles.tableHeader}>Sessions</th>
                                                <th style={styles.tableHeader}>Class</th>
                                                <th style={styles.tableHeader}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subjectRows.map((row, index) => (
                                                <tr key={row.id || index}>
                                                    <td style={styles.tableCell}>{row.subName}</td>
                                                    <td style={styles.tableCell}>{row.sessions}</td>
                                                    <td style={styles.tableCell}>{row.sclassName}</td>
                                                    <td style={styles.tableCell}>
                                                        <SubjectsButtonHaver row={row} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div style={styles.emptyState}>
                                        <p>No subjects available. Add some subjects to get started.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Speed Dial */}
                <div style={styles.speedDial}>
                    {showSpeedDial && (
                        <div style={styles.speedDialActions}>
                            <div 
                                style={styles.speedDialAction}
                                className="speed-dial-action"
                                onClick={() => navigate("/Admin/subjects/chooseclass")}
                            >
                                <button style={styles.actionButton}>
                                    ➕ Add New Subject
                                </button>
                            </div>
                            <div 
                                style={styles.speedDialAction}
                                className="speed-dial-action"
                                onClick={() => deleteHandler(currentUser._id, "Subjects")}
                            >
                                <button style={styles.actionButton}>
                                    🗑️ Delete All Subjects
                                </button>
                            </div>
                        </div>
                    )}
                    <button 
                        style={styles.speedDialButton}
                        onClick={() => setShowSpeedDial(!showSpeedDial)}
                        title="Actions"
                    >
                        {showSpeedDial ? '✕' : '⚡'}
                    </button>
                </div>

                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </div>
        </>
    );
};

export default ShowSubjects;