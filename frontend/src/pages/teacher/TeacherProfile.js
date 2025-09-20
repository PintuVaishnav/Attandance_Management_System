import React from 'react';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
    const { currentUser, response, error } = useSelector((state) => state.user);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const teachSclass = currentUser.teachSclass;
    const teachSubject = currentUser.teachSubject;
    const teachSchool = currentUser.school;

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
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        },
        heading: {
            color: 'white',
            fontSize: '32px',
            fontWeight: '600',
            marginBottom: '32px',
            textAlign: 'center'
        },
        profileGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
        },
        infoSection: {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        },
        sectionTitle: {
            color: 'white',
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        infoItem: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '16px'
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
            fontWeight: '500'
        },
        avatarSection: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '32px'
        },
        avatar: {
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontWeight: '600',
            color: 'white',
            marginBottom: '16px',
            boxShadow: '0 8px 32px rgba(81, 207, 102, 0.3)'
        },
        userName: {
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '8px'
        },
        userRole: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '16px',
            fontWeight: '500'
        }
    };

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'T';
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
                        .profile-grid {
                            grid-template-columns: 1fr !important;
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
                    <div style={styles.profileCard}>
                        <h1 style={styles.heading}>Teacher Profile</h1>
                        
                        {/* Avatar Section */}
                        <div style={styles.avatarSection}>
                            <div style={styles.avatar}>
                                {getInitials(currentUser.name)}
                            </div>
                            <div style={styles.userName}>{currentUser.name}</div>
                            <div style={styles.userRole}>Teacher</div>
                        </div>

                        {/* Profile Information Grid */}
                        <div className="profile-grid" style={styles.profileGrid}>
                            {/* Personal Information */}
                            <div style={styles.infoSection}>
                                <h3 style={styles.sectionTitle}>
                                    <span>👤</span>
                                    Personal Information
                                </h3>
                                <div style={styles.infoItem}>
                                    <span style={styles.infoLabel}>Full Name</span>
                                    <span style={styles.infoValue}>{currentUser.name}</span>
                                </div>
                                <div style={styles.infoItem}>
                                    <span style={styles.infoLabel}>Email Address</span>
                                    <span style={styles.infoValue}>{currentUser.email}</span>
                                </div>
                            </div>

                            {/* Teaching Information */}
                            <div style={styles.infoSection}>
                                <h3 style={styles.sectionTitle}>
                                    <span>📚</span>
                                    Teaching Details
                                </h3>
                                <div style={styles.infoItem}>
                                    <span style={styles.infoLabel}>Class</span>
                                    <span style={styles.infoValue}>{teachSclass.sclassName}</span>
                                </div>
                                <div style={styles.infoItem}>
                                    <span style={styles.infoLabel}>Subject</span>
                                    <span style={styles.infoValue}>{teachSubject.subName}</span>
                                </div>
                            </div>

                            {/* School Information */}
                            <div style={styles.infoSection}>
                                <h3 style={styles.sectionTitle}>
                                    <span>🏫</span>
                                    School Information
                                </h3>
                                <div style={styles.infoItem}>
                                    <span style={styles.infoLabel}>School Name</span>
                                    <span style={styles.infoValue}>{teachSchool.schoolName}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherProfile;