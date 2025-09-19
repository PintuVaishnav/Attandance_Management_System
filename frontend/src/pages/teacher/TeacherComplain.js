import React, { useState } from 'react';

const TeacherComplain = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'General',
        priority: 'Medium',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Complaint submitted:', formData);
        // Handle form submission logic here
        alert('Complaint submitted successfully!');
        // Reset form
        setFormData({
            title: '',
            category: 'General',
            priority: 'Medium',
            description: '',
            date: new Date().toISOString().split('T')[0]
        });
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
            maxWidth: '800px',
            margin: '0 auto'
        },
        formCard: {
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
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        },
        label: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '16px',
            fontWeight: '500'
        },
        input: {
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '16px',
            color: 'white',
            fontSize: '16px',
            outline: 'none',
            transition: 'all 0.3s ease'
        },
        select: {
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '16px',
            color: 'white',
            fontSize: '16px',
            outline: 'none',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
        },
        textarea: {
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '16px',
            color: 'white',
            fontSize: '16px',
            outline: 'none',
            transition: 'all 0.3s ease',
            minHeight: '120px',
            resize: 'vertical',
            fontFamily: 'inherit'
        },
        formRow: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
        },
        submitButton: {
            background: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 32px',
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(81, 207, 102, 0.3)',
            marginTop: '16px'
        },
        resetButton: {
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '16px 32px',
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '16px',
            marginLeft: '16px'
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
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
                    .form-input:focus {
                        border-color: rgba(255, 255, 255, 0.4) !important;
                        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1) !important;
                    }
                    .form-input::placeholder {
                        color: rgba(255, 255, 255, 0.6);
                    }
                    .submit-button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(81, 207, 102, 0.4) !important;
                    }
                    .reset-button:hover {
                        background: rgba(255, 255, 255, 0.2) !important;
                    }
                    select option {
                        background: #4c1d95;
                        color: white;
                    }
                    @media (max-width: 768px) {
                        .form-row {
                            grid-template-columns: 1fr !important;
                        }
                        .button-container {
                            flex-direction: column !important;
                        }
                        .reset-button {
                            margin-left: 0 !important;
                            margin-top: 12px !important;
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
                    <div style={styles.formCard}>
                        <h1 style={styles.heading}>Submit Complaint</h1>
                        
                        <form style={styles.form} onSubmit={handleSubmit}>
                            <div style={styles.formGroup}>
                                <label style={styles.label} htmlFor="title">
                                    Complaint Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter complaint title"
                                    style={styles.input}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-row" style={styles.formRow}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label} htmlFor="category">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        style={styles.select}
                                        className="form-input"
                                    >
                                        <option value="General">General</option>
                                        <option value="Infrastructure">Infrastructure</option>
                                        <option value="Student Behavior">Student Behavior</option>
                                        <option value="Administrative">Administrative</option>
                                        <option value="Technical">Technical</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label} htmlFor="priority">
                                        Priority
                                    </label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleInputChange}
                                        style={styles.select}
                                        className="form-input"
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Urgent">Urgent</option>
                                    </select>
                                </div>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label} htmlFor="date">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    className="form-input"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label} htmlFor="description">
                                    Description *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Please provide detailed description of your complaint..."
                                    style={styles.textarea}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="button-container" style={styles.buttonContainer}>
                                <button
                                    type="submit"
                                    style={styles.submitButton}
                                    className="submit-button"
                                >
                                    Submit Complaint
                                </button>
                                <button
                                    type="button"
                                    style={styles.resetButton}
                                    className="reset-button"
                                    onClick={() => setFormData({
                                        title: '',
                                        category: 'General',
                                        priority: 'Medium',
                                        description: '',
                                        date: new Date().toISOString().split('T')[0]
                                    })}
                                >
                                    Reset Form
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherComplain;