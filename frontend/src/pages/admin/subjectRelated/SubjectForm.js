import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const sclassName = params.id
    const adminID = currentUser._id
    const address = "Subject"

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    const handleSubjectNameChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subName = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSubjectCodeChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subCode = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSessionsChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].sessions = event.target.value || 0;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const fields = {
        sclassName,
        subjects: subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
        })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/subjects");
            dispatch(underControl())
            setLoader(false)
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

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
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '800px',
            position: 'relative',
            zIndex: 10
        },
        heading: {
            color: 'white',
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '32px',
            textAlign: 'center'
        },
        subjectRow: {
            display: 'grid',
            gridTemplateColumns: '2fr 1.5fr 1fr 1fr',
            gap: '16px',
            marginBottom: '20px',
            alignItems: 'end'
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column'
        },
        label: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '8px'
        },
        input: {
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '12px 16px',
            color: 'white',
            fontSize: '16px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
        },
        inputFocus: {
            borderColor: 'rgba(255, 255, 255, 0.4)',
            background: 'rgba(255, 255, 255, 0.15)',
            boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.1)'
        },
        button: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            height: 'fit-content'
        },
        addButton: {
            background: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
            color: 'white'
        },
        removeButton: {
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
            color: 'white'
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
        buttonContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '32px'
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
                    input:focus {
                        border-color: rgba(255, 255, 255, 0.4);
                        background: rgba(255, 255, 255, 0.15);
                        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
                    }
                    input::placeholder {
                        color: rgba(255, 255, 255, 0.5);
                    }
                    @media (max-width: 768px) {
                        .subject-row {
                            grid-template-columns: 1fr;
                            gap: 12px;
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

                <div style={styles.formCard}>
                    <h1 style={styles.heading}>Add Subjects</h1>
                    
                    <form onSubmit={submitHandler}>
                        {subjects.map((subject, index) => (
                            <div key={index} style={styles.subjectRow} className="subject-row">
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Subject Name</label>
                                    <input
                                        style={styles.input}
                                        type="text"
                                        placeholder="Enter subject name"
                                        value={subject.subName}
                                        onChange={handleSubjectNameChange(index)}
                                        required
                                    />
                                </div>
                                
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Subject Code</label>
                                    <input
                                        style={styles.input}
                                        type="text"
                                        placeholder="Enter subject code"
                                        value={subject.subCode}
                                        onChange={handleSubjectCodeChange(index)}
                                        required
                                    />
                                </div>
                                
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Sessions</label>
                                    <input
                                        style={styles.input}
                                        type="number"
                                        placeholder="0"
                                        min="0"
                                        value={subject.sessions}
                                        onChange={handleSessionsChange(index)}
                                        required
                                    />
                                </div>
                                
                                <div style={styles.inputGroup}>
                                    {index === 0 ? (
                                        <button
                                            type="button"
                                            style={{...styles.button, ...styles.addButton}}
                                            onClick={handleAddSubject}
                                        >
                                            + Add Subject
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            style={{...styles.button, ...styles.removeButton}}
                                            onClick={handleRemoveSubject(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        <button
                            type="submit"
                            style={{
                                ...styles.submitButton,
                                ...(loader ? styles.submitButtonDisabled : {})
                            }}
                            disabled={loader}
                        >
                            {loader ? (
                                <>
                                    <div style={styles.spinner}></div>
                                    Saving...
                                </>
                            ) : (
                                'Save Subjects'
                            )}
                        </button>
                    </form>
                </div>
                
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </div>
        </>
    );
}

export default SubjectForm;