import { useEffect, useState } from 'react';
import Popup from '../../components/Popup';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch();

    const { status, currentUser, error } = useSelector(state => state.user);

    const user = currentUser._id;
    const school = currentUser.school._id;
    const address = "Complain";

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("Done Successfully");
        }
        else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("Network Error");
        }
    }, [status, error]);

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
        formCard: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '550px',
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
        inputGroup: {
            marginBottom: '24px'
        },
        label: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '8px',
            display: 'block'
        },
        input: {
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '14px 16px',
            color: 'white',
            fontSize: '16px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            width: '100%',
            boxSizing: 'border-box'
        },
        textarea: {
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '14px 16px',
            color: 'white',
            fontSize: '16px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            width: '100%',
            boxSizing: 'border-box',
            minHeight: '120px',
            resize: 'vertical',
            fontFamily: 'inherit'
        },
        submitButton: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            marginTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
        },
        submitButtonDisabled: {
            opacity: 0.6,
            cursor: 'not-allowed'
        },
        spinner: {
            width: '20px',
            height: '20px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        },
        icon: {
            fontSize: '20px',
            marginRight: '8px'
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
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    button:hover:not(:disabled) {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
                    }
                    input:focus, textarea:focus {
                        border-color: rgba(255, 255, 255, 0.4);
                        background: rgba(255, 255, 255, 0.15);
                        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
                    }
                    input::placeholder, textarea::placeholder {
                        color: rgba(255, 255, 255, 0.5);
                    }
                    input[type="date"]::-webkit-calendar-picker-indicator {
                        filter: invert(1);
                        cursor: pointer;
                    }
                `}
            </style>
            <div style={styles.container}>
                {/* Floating Elements */}
                <div style={{...styles.floatingElement, ...styles.floatingElement1}}></div>
                <div style={{...styles.floatingElement, ...styles.floatingElement2}}></div>
                <div style={{...styles.floatingElement, ...styles.floatingElement3}}></div>
                <div style={{...styles.floatingElement, ...styles.floatingElement4}}></div>

                <div style={styles.formCard}>
                    <h1 style={styles.heading}>
                        <span style={styles.icon}>📝</span>
                        Submit Complaint
                    </h1>
                    
                    <form onSubmit={submitHandler}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Select Date</label>
                            <input
                                style={styles.input}
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                required
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Write your complaint</label>
                            <textarea
                                style={styles.textarea}
                                placeholder="Describe your complaint in detail..."
                                value={complaint}
                                onChange={(event) => setComplaint(event.target.value)}
                                required
                                rows={4}
                            />
                        </div>

                        <button
                            style={{
                                ...styles.submitButton,
                                ...(loader ? styles.submitButtonDisabled : {})
                            }}
                            type="submit"
                            disabled={loader}
                        >
                            {loader ? (
                                <>
                                    <div style={styles.spinner}></div>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <span style={styles.icon}>✉️</span>
                                    Submit Complaint
                                </>
                            )}
                        </button>
                    </form>
                </div>
                
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </div>
        </>
    );
};

export default StudentComplain;