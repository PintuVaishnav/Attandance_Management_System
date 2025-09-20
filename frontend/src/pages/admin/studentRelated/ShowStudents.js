"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllStudents } from "../../../redux/studentRelated/studentHandle"
import { deleteUser } from "../../../redux/userRelated/userHandle"
import Popup from "../../../components/Popup"
import * as React from "react"

const ShowStudents = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { studentsList, loading, error, response } = useSelector((state) => state.student)
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getAllStudents(currentUser._id))
  }, [currentUser._id, dispatch])

  if (error) {
    console.log(error)
  }

  const [showPopup, setShowPopup] = React.useState(false)
  const [message, setMessage] = React.useState("")

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID)
    console.log(address)
    dispatch(deleteUser(deleteID, address)).then(() => {
      dispatch(getAllStudents(currentUser._id))
    })
  }

  const StudentCard = ({ student }) => {
    const [dropdownOpen, setDropdownOpen] = React.useState(false)
    const [selectedAction, setSelectedAction] = React.useState("Take Attendance")

    const actions = ["Take Attendance", "Provide Marks"]

    const handleActionClick = (action) => {
      if (action === "Take Attendance") {
        navigate("/Admin/students/student/attendance/" + student._id)
      } else if (action === "Provide Marks") {
        navigate("/Admin/students/student/marks/" + student._id)
      }
      setDropdownOpen(false)
    }

    return (
      <div
        style={{
          // <CHANGE> Updated card background for consistency with glassmorphic theme
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "16px",
          transition: "all 0.3s ease",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)"
          e.currentTarget.style.boxShadow = "0 16px 48px rgba(255, 255, 255, 0.15)"
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)"
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = "none"
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
        }}
      >
        {/* <CHANGE> Updated background decoration to match white theme */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-50%",
            width: "100px",
            height: "100px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            filter: "blur(20px)",
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "16px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {student.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3
                    style={{
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "600",
                      margin: "0 0 4px 0",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {student.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      fontSize: "14px",
                      // <CHANGE> Updated text color to white with transparency
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    <span>Roll: {student.rollNum}</span>
                    <span>•</span>
                    <span>Class: {student.sclassName.sclassName}</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              {/* Delete Button */}
              <button
                onClick={() => deleteHandler(student._id, "Student")}
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: "8px",
                  padding: "8px",
                  color: "#ef4444",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(239, 68, 68, 0.2)"
                  e.target.style.transform = "scale(1.05)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(239, 68, 68, 0.1)"
                  e.target.style.transform = "scale(1)"
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>

              {/* View Button */}
              <button
                onClick={() => navigate("/Admin/students/student/" + student._id)}
                style={{
                  background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)"
                  e.target.style.boxShadow = "0 4px 12px rgba(81, 207, 102, 0.4)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)"
                  e.target.style.boxShadow = "none"
                }}
              >
                View Details
              </button>

              {/* Action Dropdown */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255, 255, 255, 0.15)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255, 255, 255, 0.1)"
                  }}
                >
                  {selectedAction}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{
                      transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: "0",
                      marginTop: "8px",
                      // <CHANGE> Updated dropdown background for consistency
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      padding: "8px",
                      minWidth: "180px",
                      zIndex: 1000,
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedAction(action)
                          handleActionClick(action)
                        }}
                        style={{
                          width: "100%",
                          background: "transparent",
                          border: "none",
                          padding: "12px 16px",
                          color: "white",
                          cursor: "pointer",
                          fontSize: "14px",
                          textAlign: "left",
                          borderRadius: "8px",
                          transition: "all 0.2s ease",
                          fontFamily: "system-ui, -apple-system, sans-serif",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "rgba(255, 255, 255, 0.1)"
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "transparent"
                        }}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Floating Action Button
  const [fabOpen, setFabOpen] = React.useState(false)

  const FloatingActionButton = () => (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "12px",
        }}
      >
        {/* Action Items */}
        {fabOpen && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                animation: "fadeInUp 0.3s ease",
              }}
            >
              <span
                style={{
                  // <CHANGE> Updated FAB label background for consistency
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                Add New Student
              </span>
              <button
                onClick={() => navigate("/Admin/addstudents")}
                style={{
                  width: "48px",
                  height: "48px",
                  background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                  border: "none",
                  borderRadius: "12px",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  boxShadow: "0 8px 32px rgba(81, 207, 102, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)"
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                animation: "fadeInUp 0.3s ease 0.1s both",
              }}
            >
              <span
                style={{
                  // <CHANGE> Updated FAB label background for consistency
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                Delete All Students
              </span>
              <button
                onClick={() => deleteHandler(currentUser._id, "Students")}
                style={{
                  width: "48px",
                  height: "48px",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  border: "none",
                  borderRadius: "12px",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  boxShadow: "0 8px 32px rgba(239, 68, 68, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)"
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* Main FAB */}
        <button
          onClick={() => setFabOpen(!fabOpen)}
          style={{
            width: "56px",
            height: "56px",
            // <CHANGE> Updated main FAB background to match purple theme
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            borderRadius: "16px",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 32px rgba(102, 126, 234, 0.4)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)"
            e.target.style.boxShadow = "0 12px 40px rgba(102, 126, 234, 0.5)"
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)"
            e.target.style.boxShadow = "0 8px 32px rgba(102, 126, 234, 0.4)"
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{
              transform: fabOpen ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
      </div>
    </div>
  )

  return (
    <div
      style={{
        minHeight: "100vh",
        // <CHANGE> Updated background to match purple gradient from previous components
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* <CHANGE> Updated floating elements to match previous components' style */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "80px",
          height: "80px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
          animationDelay: "0s"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "120px",
          height: "120px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
          animationDelay: "2s"
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "15%",
          width: "60px",
          height: "60px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
          animationDelay: "4s"
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: "100px",
          height: "100px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
          animationDelay: "1s"
        }}
      />

      <div
        style={{
          padding: "40px",
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "32px",
              fontWeight: "700",
              margin: "0 0 12px 0",
              fontFamily: "system-ui, -apple-system, sans-serif",
              background: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Students Management
          </h1>
          <p
            style={{
              // <CHANGE> Updated subtitle color to white with transparency
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "16px",
              margin: 0,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Manage student records, attendance, and academic performance
          </p>
        </div>

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                // <CHANGE> Updated loading spinner colors to white
                border: "3px solid rgba(255, 255, 255, 0.3)",
                borderTop: "3px solid white",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
          </div>
        ) : (
          <>
            {response ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 20px",
                }}
              >
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    fontSize: "48px",
                  }}
                >
                  👥
                </div>
                <h2
                  style={{
                    color: "white",
                    fontSize: "24px",
                    fontWeight: "600",
                    margin: "0 0 12px 0",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  No Students Found
                </h2>
                <p
                  style={{
                    // <CHANGE> Updated empty state text color to white with transparency
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "16px",
                    margin: "0 0 32px 0",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  Get started by adding your first student to the system
                </p>
                <button
                  onClick={() => navigate("/Admin/addstudents")}
                  style={{
                    background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                    border: "none",
                    borderRadius: "12px",
                    padding: "16px 32px",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    boxShadow: "0 8px 32px rgba(81, 207, 102, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)"
                    e.target.style.boxShadow = "0 12px 40px rgba(81, 207, 102, 0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)"
                    e.target.style.boxShadow = "0 8px 32px rgba(81, 207, 102, 0.3)"
                  }}
                >
                  Add Students
                </button>
              </div>
            ) : (
              <>
                {/* Statistics Cards */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "24px",
                    marginBottom: "40px",
                  }}
                >
                  <div
                    style={{
                      // <CHANGE> Updated statistics card background for consistency
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "16px",
                      padding: "24px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "32px",
                        fontWeight: "700",
                        // <CHANGE> Updated stat number color to white
                        color: "white",
                        marginBottom: "8px",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {Array.isArray(studentsList) ? studentsList.length : 0}
                    </div>
                    <div
                      style={{
                        // <CHANGE> Updated stat label color to white with transparency
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "14px",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      Total Students
                    </div>
                  </div>

                  <div
                    style={{
                      // <CHANGE> Updated statistics card background for consistency
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "16px",
                      padding: "24px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "32px",
                        fontWeight: "700",
                        // <CHANGE> Updated stat number color to white
                        color: "white",
                        marginBottom: "8px",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {Array.isArray(studentsList) ? new Set(studentsList.map((s) => s.sclassName.sclassName)).size : 0}
                    </div>
                    <div
                      style={{
                        // <CHANGE> Updated stat label color to white with transparency
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "14px",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      Active Classes
                    </div>
                  </div>
                </div>

                {/* Students List */}
                {Array.isArray(studentsList) && studentsList.length > 0 && (
                  <div>
                    {studentsList.map((student) => (
                      <StudentCard key={student._id} student={student} />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        <FloatingActionButton />
      </div>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default ShowStudents