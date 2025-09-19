"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getUserDetails } from "../../../redux/userRelated/userHandle"
import { getSubjectList } from "../../../redux/sclassRelated/sclassHandle"
import { updateStudentFields } from "../../../redux/studentRelated/studentHandle"

import Popup from "../../../components/Popup"

const StudentExamMarks = ({ situation }) => {
  const dispatch = useDispatch()
  const { currentUser, userDetails, loading } = useSelector((state) => state.user)
  const { subjectsList } = useSelector((state) => state.sclass)
  const { response, error, statestatus } = useSelector((state) => state.student)
  const params = useParams()

  const [studentID, setStudentID] = useState("")
  const [subjectName, setSubjectName] = useState("")
  const [chosenSubName, setChosenSubName] = useState("")
  const [marksObtained, setMarksObtained] = useState("")

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

  const fields = { subName: chosenSubName, marksObtained }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"))
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

  return (
    <>
      <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-10px) rotate(1deg); }
                    66% { transform: translateY(5px) rotate(-1deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .floating-element {
                    animation: float 6s ease-in-out infinite;
                }
                
                .floating-element:nth-child(2) {
                    animation-delay: -2s;
                }
                
                .floating-element:nth-child(3) {
                    animation-delay: -4s;
                }
                
                .loading-spinner {
                    animation: spin 1s linear infinite;
                }
            `}</style>

      {loading ? (
        <div
          style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              padding: "40px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Loading...
          </div>
        </div>
      ) : (
        <div
          style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            position: "relative",
            overflow: "hidden",
            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          <div
            className="floating-element"
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: "100px",
              height: "100px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              opacity: "0.6",
            }}
          ></div>
          <div
            className="floating-element"
            style={{
              position: "absolute",
              top: "60%",
              right: "15%",
              width: "150px",
              height: "150px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "30px",
              opacity: "0.4",
            }}
          ></div>
          <div
            className="floating-element"
            style={{
              position: "absolute",
              bottom: "20%",
              left: "20%",
              width: "80px",
              height: "80px",
              background: "rgba(255, 255, 255, 0.08)",
              borderRadius: "50%",
              opacity: "0.5",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              padding: "20px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: "24px",
                padding: "48px",
                maxWidth: "500px",
                width: "100%",
                boxShadow: "0 32px 64px rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10,9 9,9 8,9" />
                  </svg>
                </div>
              </div>

              <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <h1
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#1a1a1a",
                    marginBottom: "8px",
                    lineHeight: "1.2",
                  }}
                >
                  Enter Exam Marks
                </h1>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    margin: "0",
                  }}
                >
                  Record student performance
                </p>
              </div>

              <div style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                    borderRadius: "16px",
                    padding: "20px",
                    marginBottom: "16px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      marginBottom: "4px",
                      fontWeight: "500",
                    }}
                  >
                    Student Name
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      color: "#1e293b",
                      fontWeight: "600",
                    }}
                  >
                    {userDetails.name}
                  </div>
                </div>

                {currentUser.teachSubject && (
                  <div
                    style={{
                      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                      borderRadius: "16px",
                      padding: "20px",
                      border: "1px solid #bae6fd",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#0369a1",
                        marginBottom: "4px",
                        fontWeight: "500",
                      }}
                    >
                      Subject
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        color: "#0c4a6e",
                        fontWeight: "600",
                      }}
                    >
                      {currentUser.teachSubject?.subName}
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={submitHandler}>
                <div style={{ marginBottom: "24px" }}>
                  {situation === "Student" && (
                    <div style={{ marginBottom: "24px" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#374151",
                          marginBottom: "8px",
                        }}
                      >
                        Select Subject *
                      </label>
                      <select
                        value={subjectName}
                        onChange={changeHandler}
                        required
                        style={{
                          width: "100%",
                          padding: "16px 20px",
                          fontSize: "16px",
                          border: "2px solid #e5e7eb",
                          borderRadius: "12px",
                          backgroundColor: "#ffffff",
                          color: "#374151",
                          outline: "none",
                          transition: "all 0.2s ease",
                          fontFamily: "inherit",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#667eea"
                          e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)"
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb"
                          e.target.style.boxShadow = "none"
                        }}
                      >
                        <option value="">Choose a subject</option>
                        {subjectsList ? (
                          subjectsList.map((subject, index) => (
                            <option key={index} value={subject.subName}>
                              {subject.subName}
                            </option>
                          ))
                        ) : (
                          <option value="">Add Subjects For Marks</option>
                        )}
                      </select>
                    </div>
                  )}

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "8px",
                      }}
                    >
                      Marks Obtained *
                    </label>
                    <input
                      type="number"
                      placeholder="Enter marks (0-100)"
                      value={marksObtained}
                      onChange={(e) => setMarksObtained(e.target.value)}
                      required
                      min="0"
                      max="100"
                      style={{
                        width: "100%",
                        padding: "16px 20px",
                        fontSize: "16px",
                        border: "2px solid #e5e7eb",
                        borderRadius: "12px",
                        backgroundColor: "#ffffff",
                        color: "#374151",
                        outline: "none",
                        transition: "all 0.2s ease",
                        fontFamily: "inherit",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#667eea"
                        e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e5e7eb"
                        e.target.style.boxShadow = "none"
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loader}
                  style={{
                    width: "100%",
                    padding: "16px 24px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "white",
                    background: loader ? "#9ca3af" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    borderRadius: "12px",
                    cursor: loader ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: loader ? "none" : "0 4px 16px rgba(102, 126, 234, 0.3)",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    if (!loader) {
                      e.target.style.transform = "translateY(-2px)"
                      e.target.style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.4)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loader) {
                      e.target.style.transform = "translateY(0)"
                      e.target.style.boxShadow = "0 4px 16px rgba(102, 126, 234, 0.3)"
                    }
                  }}
                >
                  {loader ? (
                    <>
                      <div
                        className="loading-spinner"
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "2px solid rgba(255, 255, 255, 0.3)",
                          borderTop: "2px solid white",
                          borderRadius: "50%",
                        }}
                      ></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      Submit Marks
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  )
}

export default StudentExamMarks
