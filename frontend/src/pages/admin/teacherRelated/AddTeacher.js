import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';

const AddTeacher = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subjectID = params.id;

  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const role = "Teacher";
  const school = subjectDetails && subjectDetails.school;
  const teachSubject = subjectDetails && subjectDetails._id;
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id;

  const fields = { name, email, password, role, school, teachSubject, teachSclass };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      navigate("/Admin/teachers");
    }
    else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    }
    else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
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
      padding: '40px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '500px',
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
    infoSection: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '24px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    infoLabel: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '16px',
      fontWeight: '500',
      marginBottom: '8px',
      display: 'block'
    },
    infoValue: {
      color: 'white',
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '12px'
    },
    inputGroup: {
      marginBottom: '20px'
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
        `}
      </style>
      <div style={styles.container}>
        {/* Floating Elements */}
        <div style={{...styles.floatingElement, ...styles.floatingElement1}}></div>
        <div style={{...styles.floatingElement, ...styles.floatingElement2}}></div>
        <div style={{...styles.floatingElement, ...styles.floatingElement3}}></div>
        <div style={{...styles.floatingElement, ...styles.floatingElement4}}></div>

        <div style={styles.formCard}>
          <h1 style={styles.heading}>Add Teacher</h1>
          
          <div style={styles.infoSection}>
            <label style={styles.infoLabel}>Subject:</label>
            <div style={styles.infoValue}>
              {subjectDetails && subjectDetails.subName}
            </div>
            <label style={styles.infoLabel}>Class:</label>
            <div style={styles.infoValue}>
              {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
            </div>
          </div>

          <form onSubmit={submitHandler}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Name</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Enter teacher's name..."
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                type="email"
                placeholder="Enter teacher's email..."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                type="password"
                placeholder="Enter teacher's password..."
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                required
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
                  Registering...
                </>
              ) : (
                'Register Teacher'
              )}
            </button>
          </form>
        </div>
        
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </div>
    </>
  );
};

export default AddTeacher;