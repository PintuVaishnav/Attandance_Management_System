import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    // Inline Styles
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative',
            overflow: 'hidden',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
        detailsCard: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '600px',
            position: 'relative',
            zIndex: 10
        },
        heading: {
            color: 'white',
            fontSize: '32px',
            fontWeight: '600',
            marginBottom: '32px',
            textAlign: 'center'
        },
        detailItem: {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        },
        detailLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        },
        detailValue: {
            color: 'white',
            fontSize: '20px',
            fontWeight: '600'
        },
        addButton: {
            background: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            width: '100%',
            marginTop: '24px'
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
        subjectSection: {
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '24px',
            marginTop: '20px',
            border: '1px solid rgba(255, 255, 255, 0.15)'
        },
        subjectHeading: {
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px',
            textAlign: 'center'
        },
        icon: {
            fontSize: '24px',
            marginRight: '12px'
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
                        Loading teacher details...
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

                <div style={styles.detailsCard}>
                    <h1 style={styles.heading}>
                        <span style={styles.icon}>👨‍🏫</span>
                        Teacher Details
                    </h1>
                    
                    <div style={styles.detailItem}>
                        <div style={styles.detailLabel}>Teacher Name</div>
                        <div style={styles.detailValue}>
                            {teacherDetails?.name || 'Not Available'}
                        </div>
                    </div>

                    <div style={styles.detailItem}>
                        <div style={styles.detailLabel}>Class Name</div>
                        <div style={styles.detailValue}>
                            {teacherDetails?.teachSclass?.sclassName || 'Not Assigned'}
                        </div>
                    </div>

                    {isSubjectNamePresent ? (
                        <div style={styles.subjectSection}>
                            <h3 style={styles.subjectHeading}>
                                <span style={styles.icon}>📚</span>
                                Subject Information
                            </h3>
                            
                            <div style={styles.detailItem}>
                                <div style={styles.detailLabel}>Subject Name</div>
                                <div style={styles.detailValue}>
                                    {teacherDetails?.teachSubject?.subName}
                                </div>
                            </div>

                            <div style={styles.detailItem}>
                                <div style={styles.detailLabel}>Subject Sessions</div>
                                <div style={styles.detailValue}>
                                    {teacherDetails?.teachSubject?.sessions} Sessions
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={styles.subjectSection}>
                            <h3 style={styles.subjectHeading}>No Subject Assigned</h3>
                            <p style={{ 
                                color: 'rgba(255, 255, 255, 0.8)', 
                                textAlign: 'center', 
                                marginBottom: '20px',
                                fontSize: '16px'
                            }}>
                                This teacher hasn't been assigned a subject yet. Click below to assign one.
                            </p>
                            <button 
                                style={styles.addButton}
                                onClick={handleAddSubject}
                            >
                                <span style={styles.icon}>➕</span>
                                Add Subject
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TeacherDetails;