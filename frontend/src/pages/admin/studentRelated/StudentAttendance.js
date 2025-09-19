"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getUserDetails } from "../../../redux/userRelated/userHandle"
import { getSubjectList } from "../../../redux/sclassRelated/sclassHandle"
import { updateStudentFields } from "../../../redux/studentRelated/studentHandle"
import Popup from "../../../components/Popup"

const StudentAttendance = ({ situation }) => {
  const dispatch = useDispatch()
  const { currentUser, userDetails, loading } = useSelector((state) => state.user)
  const { subjectsList } = useSelector((state) => state.sclass)
  const { response, error, statestatus } = useSelector((state) => state.student)
  const params = useParams()

  const [studentID, setStudentID] = useState("")
  const [subjectName, setSubjectName] = useState("")
  const [chosenSubName, setChosenSubName] = useState("")
  const [status, setStatus] = useState("")
  const [date, setDate] = useState("")

  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (situation === "Student") {
      setStudentID(params.id)
      const stdID = params.id
      dispatch(getUserDetails(stdID, "Student"))
    } else if (situation === "Subject") {
      const { studentID, subjectID } = params
      setStudentID(studentID)
      dispatch(getUserDetails(studentID, "Student"))
      setChosenSubName(subjectID)
    }
  }, [situation])

  useEffect(() => {
    if (userDetails && userDetails.sclassName && situation === "Student") {
      dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"))
    }
  }, [dispatch, userDetails])

  const changeHandler = (event) => {
    const selectedSubject = subjectsList.find((subject) => subject.subName === event.target.value)
    setSubjectName(selectedSubject.subName)
    setChosenSubName(selectedSubject._id)
  }

  const fields = { subName: chosenSubName, status, date }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(updateStudentFields(studentID, fields, "StudentAttendance"))
  }

  useEffect(() => {
    if (response) {
      setLoader(false)
      setShowPopup(true)
      setMessage(response)
    } else if (error) {
      setLoader(false)
      setShowPopup(true)
      setMessage("error")
    } else if (statestatus === "added") {
      setLoader(false)
      setShowPopup(true)
      setMessage("Done Successfully")
    }
  }, [response, statestatus, error])

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  }

  const floatingElementsStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    zIndex: 1,
  }

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "48px",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 32px 64px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    position: "relative",
    zIndex: 2,
  }

  const headerStyle = {
    textAlign: "center",
    marginBottom: "40px",
  }

  const titleStyle = {
    fontSize: "32px",
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: "16px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }

  const subtitleStyle = {
    fontSize: "18px",
    color: "#718096",
    fontWeight: "500",
  }

  const formGroupStyle = {
    marginBottom: "32px",
  }

  const labelStyle = {
    display: "block",
    fontSize: "16px",
    fontWeight: "600",
    color: "#4a5568",
    marginBottom: "12px",
  }

  const inputStyle = {
    width: "100%",
    padding: "16px 20px",
    fontSize: "16px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    background: "#ffffff",
    color: "#2d3748",
    transition: "all 0.3s ease",
    outline: "none",
    fontFamily: "inherit",
  }

  const inputFocusStyle = {
    borderColor: "#667eea",
    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
    transform: "translateY(-2px)",
  }

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: "right 12px center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "16px",
    paddingRight: "48px",
  }

  const submitButtonStyle = {
    width: "100%",
    padding: "18px 32px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#ffffff",
    background: loader ? "#a0aec0" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    borderRadius: "12px",
    cursor: loader ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginTop: "24px",
    boxShadow: loader ? "none" : "0 8px 32px rgba(102, 126, 234, 0.3)",
  }

  const loadingSpinnerStyle = {
    width: "24px",
    height: "24px",
    border: "3px solid rgba(255, 255, 255, 0.3)",
    borderTop: "3px solid #ffffff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  }

  const loadingStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontSize: "24px",
    color: "#ffffff",
    fontWeight: "600",
  }

  return (
    <>
      <style>
        {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        33% { transform: translateY(-30px) rotate(120deg); }
                        66% { transform: translateY(-20px) rotate(240deg); }
                    }
                    .floating-element {
                        position: absolute;
                        opacity: 0.1;
                        animation: float 20s ease-in-out infinite;
                    }
                    .floating-element:nth-child(1) {
                        top: 10%;
                        left: 10%;
                        width: 80px;
                        height: 80px;
                        background: linear-gradient(45deg, #667eea, #764ba2);
                        border-radius: 50%;
                        animation-delay: 0s;
                    }
                    .floating-element:nth-child(2) {
                        top: 20%;
                        right: 10%;
                        width: 120px;
                        height: 120px;
                        background: linear-gradient(45deg, #764ba2, #667eea);
                        border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
                        animation-delay: 5s;
                    }
                    .floating-element:nth-child(3) {
                        bottom: 20%;
                        left: 15%;
                        width: 100px;
                        height: 100px;
                        background: linear-gradient(45deg, #667eea, #764ba2);
                        border-radius: 20px;
                        animation-delay: 10s;
                    }
                    .floating-element:nth-child(4) {
                        bottom: 30%;
                        right: 20%;
                        width: 60px;
                        height: 60px;
                        background: linear-gradient(45deg, #764ba2, #667eea);
                        border-radius: 50%;
                        animation-delay: 15s;
                    }
                `}
      </style>
      {loading ? (
        <div style={loadingStyle}>
          <div style={loadingSpinnerStyle}></div>
          <span style={{ marginLeft: "16px" }}>Loading student details...</span>
        </div>
      ) : (
        <div style={containerStyle}>
          <div style={floatingElementsStyle}>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
            <div className="floating-element"></div>
          </div>

          <div style={cardStyle}>
            <div style={headerStyle}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 style={titleStyle}>Mark Attendance</h1>
              <p style={subtitleStyle}>Student: {userDetails?.name}</p>
              {currentUser.teachSubject && <p style={subtitleStyle}>Subject: {currentUser.teachSubject?.subName}</p>}
            </div>

            <form onSubmit={submitHandler}>
              {situation === "Student" && (
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Select Subject</label>
                  <select
                    style={selectStyle}
                    value={subjectName}
                    onChange={changeHandler}
                    required
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) =>
                      Object.assign(e.target.style, {
                        borderColor: "#e2e8f0",
                        boxShadow: "none",
                        transform: "translateY(0)",
                      })
                    }
                  >
                    <option value="">Choose a subject</option>
                    {subjectsList ? (
                      subjectsList.map((subject, index) => (
                        <option key={index} value={subject.subName}>
                          {subject.subName}
                        </option>
                      ))
                    ) : (
                      <option value="">Add Subjects For Attendance</option>
                    )}
                  </select>
                </div>
              )}

              <div style={formGroupStyle}>
                <label style={labelStyle}>Attendance Status</label>
                <select
                  style={selectStyle}
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  required
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) =>
                    Object.assign(e.target.style, {
                      borderColor: "#e2e8f0",
                      boxShadow: "none",
                      transform: "translateY(0)",
                    })
                  }
                >
                  <option value="">Select status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Select Date</label>
                <input
                  type="date"
                  style={inputStyle}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) =>
                    Object.assign(e.target.style, {
                      borderColor: "#e2e8f0",
                      boxShadow: "none",
                      transform: "translateY(0)",
                    })
                  }
                />
              </div>

              <button
                type="submit"
                style={submitButtonStyle}
                disabled={loader}
                onMouseEnter={(e) => {
                  if (!loader) {
                    e.target.style.transform = "translateY(-2px)"
                    e.target.style.boxShadow = "0 12px 40px rgba(102, 126, 234, 0.4)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loader) {
                    e.target.style.transform = "translateY(0)"
                    e.target.style.boxShadow = "0 8px 32px rgba(102, 126, 234, 0.3)"
                  }
                }}
              >
                {loader ? (
                  <>
                    <div style={loadingSpinnerStyle}></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Submit Attendance
                  </>
                )}
              </button>
            </form>
          </div>
          <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
      )}
    </>
  )
}

export default StudentAttendance
