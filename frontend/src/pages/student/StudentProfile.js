import React from 'react';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
    const { currentUser, response, error } = useSelector((state) => state.user);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const sclassName = currentUser.sclassName;
    const studentSchool = currentUser.school;

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
            maxWidth: '800px',
            margin: '0 auto'
        },
        profileCard: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            marginBottom: '24px',
            textAlign: 'center'
        },
        avatar: {
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '60px',
            fontWeight: '700',
            color: 'white',
            margin: '0 auto 24px auto',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        },
        studentName: {
            color: 'white',
            fontSize: '32px',
            fontWeight: '600',
            marginBottom: '16px'
        },
        studentInfo: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '18px',
            fontWeight: '500',
            marginBottom: '8px'
        },
        infoCard: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        },
        sectionTitle: {
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '24px',
            textAlign: 'center'
        },
        infoGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
        },
        infoItem: {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        },
        infoLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        },
        infoValue: {
            color: 'white',
            fontSize: '16px',
            fontWeight: '600'
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
                    @media (max-width: 768px) {
                        .info-grid {
                            grid-template-columns: 1fr !important;
                        }
                        .avatar {
                            width: 120px !important;
                            height: 120px !important;
                            font-size: 48px !important;
                        }
                        .student-name {
                            font-size: 24px !important;
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
                    {/* Profile Header Card */}
                    <div style={styles.profileCard}>
                        <div className="avatar" style={styles.avatar}>
                            {String(currentUser.name).charAt(0)}
                        </div>
                        <h1 className="student-name" style={styles.studentName}>
                            {currentUser.name}
                        </h1>
                        <p style={styles.studentInfo}>
                            Student Roll No: {currentUser.rollNum}
                        </p>
                        <p style={styles.studentInfo}>
                            Class: {sclassName.sclassName}
                        </p>
                        <p style={styles.studentInfo}>
                            School: {studentSchool.schoolName}
                        </p>
                    </div>

                    {/* Personal Information Card */}
                    <div style={styles.infoCard}>
                        <h2 style={styles.sectionTitle}>Personal Information</h2>
                        <div className="info-grid" style={styles.infoGrid}>
                            <div style={styles.infoItem}>
                                <div style={styles.infoLabel}>Date of Birth</div>
                                <div style={styles.infoValue}>January 1, 2000</div>
                            </div>
                            <div style={styles.infoItem}>
                                <div style={styles.infoLabel}>Gender</div>
                                <div style={styles.infoValue}>Male</div>
                            </div>
                            <div style={styles.infoItem}>
                                <div style={styles.infoLabel}>Email</div>
                                <div style={styles.infoValue}>john.doe@example.com</div>
                            </div>
                            <div style={styles.infoItem}>
                                <div style={styles.infoLabel}>Phone</div>
                                <div style={styles.infoValue}>(123) 456-7890</div>
                            </div>
                            <div style={styles.infoItem}>
                                <div style={styles.infoLabel}>Address</div>
                                <div style={styles.infoValue}>123 Main Street, City, Country</div>
                            </div>
                            <div style={styles.infoItem}>
                                <div style={styles.infoLabel}>Emergency Contact</div>
                                <div style={styles.infoValue}>(987) 654-3210</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentProfile;