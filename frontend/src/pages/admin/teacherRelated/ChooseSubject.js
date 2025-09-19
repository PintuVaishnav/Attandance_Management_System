import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false);

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

    useEffect(() => {
        if (situation === "Norm") {
            setClassID(params.id);
            const classID = params.id;
            dispatch(getTeacherFreeClassSubjects(classID));
        }
        else if (situation === "Teacher") {
            const { classID, teacherID } = params;
            setClassID(classID);
            setTeacherID(teacherID);
            dispatch(getTeacherFreeClassSubjects(classID));
        }
    }, [situation]);

    if (error) {
        console.log(error);
    }

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true);
        dispatch(updateTeachSubject(teacherId, teachSubject));
        navigate("/Admin/teachers");
    };

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
            maxWidth: '900px',
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
            textAlign: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '16px'
        },
        tableCell: {
            padding: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            fontSize: '15px',
            textAlign: 'center'
        },
        indexCell: {
            background: 'rgba(255, 255, 255, 0.05)',
            fontWeight: '600'
        },
        button: {
            background: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            margin: '0 auto'
        },
        buttonDisabled: {
            opacity: 0.6,
            cursor: 'not-allowed'
        },
        addButton: {
            background: 'linear-gradient(135deg, #9775fa 0%, #845ef7 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            display: 'block',
            margin: '0 auto'
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
            width: '20px',
            height: '20px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        },
        emptyState: {
            textAlign: 'center',
            color: 'white',
            fontSize: '18px',
            padding: '40px'
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '24px'
        }
    };

    if (loading) {
        return (
            <>
                <style>
                    {`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}
                </style>
                <div style={styles.container}>
                    <div style={styles.loadingContainer}>
                        <div style={styles.spinner}></div>
                        Loading subjects...
                    </div>
                </div>
            </>
        );
    }

    if (response) {
        return (
            <>
                <style>
                    {`
                        @keyframes float {
                            0%, 100% { transform: translateY(0px) rotate(0deg); }
                            33% { transform: translateY(-20px) rotate(120deg); }
                            66% { transform: translateY(-10px) rotate(240deg); }
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

                    <div style={styles.mainContent}>
                        <div style={styles.card}>
                            <div style={styles.emptyState}>
                                <h2 style={styles.heading}>All Subjects Assigned</h2>
                                <p style={{ marginBottom: '24px', opacity: 0.8 }}>
                                    Sorry, all subjects have teachers assigned already.
                                </p>
                                <div style={styles.buttonContainer}>
                                    <button 
                                        style={styles.addButton}
                                        onClick={() => navigate("/Admin/addsubject/" + classID)}
                                    >
                                        Add Subjects
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

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
                    button:hover:not(:disabled) {
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

                <div style={styles.mainContent}>
                    <div style={styles.card}>
                        <h1 style={styles.heading}>Choose a Subject</h1>
                        
                        {Array.isArray(subjectsList) && subjectsList.length > 0 && (
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.tableHeader}>#</th>
                                        <th style={styles.tableHeader}>Subject Name</th>
                                        <th style={styles.tableHeader}>Subject Code</th>
                                        <th style={styles.tableHeader}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjectsList.map((subject, index) => (
                                        <tr key={subject._id}>
                                            <td style={{...styles.tableCell, ...styles.indexCell}}>
                                                {index + 1}
                                            </td>
                                            <td style={styles.tableCell}>{subject.subName}</td>
                                            <td style={styles.tableCell}>{subject.subCode}</td>
                                            <td style={styles.tableCell}>
                                                {situation === "Norm" ? (
                                                    <button 
                                                        style={styles.button}
                                                        onClick={() => navigate("/Admin/teachers/addteacher/" + subject._id)}
                                                    >
                                                        Choose
                                                    </button>
                                                ) : (
                                                    <button 
                                                        style={{
                                                            ...styles.button,
                                                            ...(loader ? styles.buttonDisabled : {})
                                                        }}
                                                        disabled={loader}
                                                        onClick={() => updateSubjectHandler(teacherID, subject._id)}
                                                    >
                                                        {loader ? (
                                                            <>
                                                                <div style={styles.spinner}></div>
                                                                Loading...
                                                            </>
                                                        ) : (
                                                            'Choose Sub'
                                                        )}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChooseSubject;