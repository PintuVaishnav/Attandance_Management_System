import { useSelector } from "react-redux";

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    // Inline Styles
    const styles = {
        container: {
            minHeight: "100vh",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: "relative",
            overflow: "hidden",
            padding: "24px"
        },
        floatingElement: {
            position: "absolute",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            animation: "float 6s ease-in-out infinite"
        },
        floatingElement1: {
            width: "80px",
            height: "80px",
            top: "10%",
            left: "10%",
            animationDelay: "0s"
        },
        floatingElement2: {
            width: "120px",
            height: "120px",
            top: "20%",
            right: "10%",
            animationDelay: "2s"
        },
        floatingElement3: {
            width: "60px",
            height: "60px",
            bottom: "20%",
            left: "15%",
            animationDelay: "4s"
        },
        floatingElement4: {
            width: "100px",
            height: "100px",
            bottom: "10%",
            right: "20%",
            animationDelay: "1s"
        },
        mainContent: {
            position: "relative",
            zIndex: 10,
            maxWidth: "800px",
            margin: "0 auto"
        },
        heading: {
            color: "white",
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: "32px",
            textAlign: "center"
        },
        profileCard: {
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "40px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
        },
        avatarSection: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "32px"
        },
        avatar: {
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            fontWeight: "600",
            color: "white",
            marginBottom: "16px",
            boxShadow: "0 8px 32px rgba(81, 207, 102, 0.3)"
        },
        userName: {
            color: "white",
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "8px"
        },
        userRole: {
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "16px",
            fontWeight: "500",
            background: "rgba(255, 255, 255, 0.1)",
            padding: "8px 16px",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.2)"
        },
        infoGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "32px"
        },
        infoCard: {
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            transition: "all 0.3s ease"
        },
        infoHeader: {
            display: "flex",
            alignItems: "center",
            marginBottom: "12px"
        },
        infoIcon: {
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "16px",
            fontSize: "20px"
        },
        infoTitle: {
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            margin: 0
        },
        infoValue: {
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: "16px",
            fontWeight: "500",
            margin: 0
        },
        buttonGroup: {
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap"
        },
        primaryButton: {
            background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
            border: "none",
            borderRadius: "12px",
            padding: "12px 24px",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 16px rgba(81, 207, 102, 0.3)"
        },
        secondaryButton: {
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
            padding: "12px 24px",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)"
        }
    };

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'A';
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
                    .info-card:hover {
                        background: rgba(255, 255, 255, 0.1) !important;
                        transform: translateY(-2px);
                    }
                    .primary-button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(81, 207, 102, 0.4) !important;
                    }
                    .secondary-button:hover {
                        background: rgba(255, 255, 255, 0.2) !important;
                        transform: translateY(-2px);
                    }
                    @media (max-width: 768px) {
                        .info-grid {
                            grid-template-columns: 1fr !important;
                        }
                        .button-group {
                            flex-direction: column !important;
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
                    <h1 style={styles.heading}>Admin Profile</h1>
                    
                    <div style={styles.profileCard}>
                        {/* Avatar Section */}
                        <div style={styles.avatarSection}>
                            <div style={styles.avatar}>
                                {getInitials(currentUser?.name)}
                            </div>
                            <div style={styles.userName}>{currentUser?.name || "Admin User"}</div>
                            <div style={styles.userRole}>Administrator</div>
                        </div>

                        {/* Information Grid */}
                        <div className="info-grid" style={styles.infoGrid}>
                            <div style={styles.infoCard} className="info-card">
                                <div style={styles.infoHeader}>
                                    <div style={styles.infoIcon}>✉️</div>
                                    <h3 style={styles.infoTitle}>Email Address</h3>
                                </div>
                                <p style={styles.infoValue}>
                                    {currentUser?.email || "admin@school.edu"}
                                </p>
                            </div>

                            <div style={styles.infoCard} className="info-card">
                                <div style={styles.infoHeader}>
                                    <div style={styles.infoIcon}>🏫</div>
                                    <h3 style={styles.infoTitle}>Institution</h3>
                                </div>
                                <p style={styles.infoValue}>
                                    {currentUser?.schoolName || "Educational Institution"}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="button-group" style={styles.buttonGroup}>
                            <button
                                style={styles.primaryButton}
                                className="primary-button"
                            >
                                Edit Profile
                            </button>
                            <button
                                style={styles.secondaryButton}
                                className="secondary-button"
                            >
                                Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminProfile;