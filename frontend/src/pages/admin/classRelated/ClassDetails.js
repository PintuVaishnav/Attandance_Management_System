"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle"

const ClassDetails = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector(
    (state) => state.sclass,
  )

  const classID = params.id

  useEffect(() => {
    dispatch(getClassDetails(classID, "Sclass"))
    dispatch(getSubjectList(classID, "ClassSubjects"))
    dispatch(getClassStudents(classID))
  }, [dispatch, classID])

  if (error) {
    console.log(error)
  }

  const [value, setValue] = useState("1")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID)
    console.log(address)
    setMessage("Sorry the delete function has been disabled for now.")
    setShowPopup(true)
  }

  const subjectColumns = [
    { id: "name", label: "Subject Name", minWidth: 170 },
    { id: "code", label: "Subject Code", minWidth: 100 },
  ]

  const subjectRows =
    subjectsList &&
    subjectsList.length > 0 &&
    subjectsList.map((subject) => {
      return {
        name: subject.subName,
        code: subject.subCode,
        id: subject._id,
      }
    })

  const SubjectsButtonHaver = ({ row }) => {
    return (
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button
          onClick={() => deleteHandler(row.id, "Subject")}
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "#ef4444",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "500",
            transition: "all 0.2s ease",
            backdropFilter: "blur(10px)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(239, 68, 68, 0.2)"
            e.target.style.transform = "translateY(-1px)"
            e.target.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.3)"
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(239, 68, 68, 0.1)"
            e.target.style.transform = "translateY(0)"
            e.target.style.boxShadow = "none"
          }}
        >
          🗑️ Delete
        </button>
        <button
          onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "white",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "500",
            transition: "all 0.2s ease",
            backdropFilter: "blur(10px)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.2)"
            e.target.style.transform = "translateY(-1px)"
            e.target.style.boxShadow = "0 4px 12px rgba(255, 255, 255, 0.2)"
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)"
            e.target.style.transform = "translateY(0)"
            e.target.style.boxShadow = "none"
          }}
        >
          👁️ View
        </button>
      </div>
    )
  }

  const ClassSubjectsSection = () => {
    return (
      <div style={{ padding: "20px" }}>
        {response ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "16px",
                padding: "40px",
                maxWidth: "400px",
              }}
            >
              <div style={{ fontSize: "64px", marginBottom: "16px" }}>📚</div>
              <h3
                style={{
                  color: "#ffffff",
                  fontSize: "20px",
                  fontWeight: "600",
                  margin: "0 0 8px 0",
                }}
              >
                No Subjects Found
              </h3>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "14px",
                  margin: "0 0 24px 0",
                }}
              >
                Get started by adding your first subject
              </p>
              <button
                onClick={() => navigate("/Admin/addsubject/" + classID)}
                style={{
                  background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)"
                  e.target.style.boxShadow = "0 8px 25px rgba(81, 207, 102, 0.4)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)"
                  e.target.style.boxShadow = "none"
                }}
              >
                ➕ Add Subjects
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
                padding: "20px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "16px",
              }}
            >
              <div>
                <h3
                  style={{
                    color: "white",
                    marginBottom: "4px",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 0 4px 0",
                  }}
                >
                  📚 Subjects List
                </h3>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "14px",
                    margin: 0,
                  }}
                >
                  {Array.isArray(subjectsList) ? subjectsList.length : 0} subjects found
                </p>
              </div>
              <button
                onClick={() => navigate("/Admin/addsubject/" + classID)}
                style={{
                  background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-1px)"
                  e.target.style.boxShadow = "0 4px 15px rgba(81, 207, 102, 0.4)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)"
                  e.target.style.boxShadow = "none"
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Add Subject
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gap: "16px",
              }}
            >
              {subjectRows &&
                subjectRows.map((row, index) => (
                  <div
                    key={index}
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "16px",
                      padding: "24px",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)"
                      e.currentTarget.style.boxShadow = "0 16px 48px rgba(255, 255, 255, 0.15)"
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "none"
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3))",
                        borderRadius: "16px 16px 0 0",
                      }}
                    ></div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1, marginRight: "16px" }}>
                        <h3
                          style={{
                            color: "#ffffff",
                            fontSize: "18px",
                            fontWeight: "600",
                            margin: "0 0 8px 0",
                            lineHeight: "1.4",
                          }}
                        >
                          {row.name}
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ opacity: 0.6, color: "white" }}
                          >
                            <path
                              d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <polyline
                              points="14,2 14,8 20,8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span
                            style={{
                              color: "rgba(255, 255, 255, 0.6)",
                              fontSize: "13px",
                            }}
                          >
                            Code: {row.code}
                          </span>
                        </div>
                      </div>

                      <SubjectsButtonHaver row={row} />
                    </div>
                  </div>
                ))}
            </div>

            <div
              style={{
                position: "fixed",
                bottom: "24px",
                right: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                zIndex: 1000,
              }}
            >
              <button
                onClick={() => navigate("/Admin/addsubject/" + classID)}
                style={{
                  background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                  border: "none",
                  borderRadius: "50%",
                  width: "56px",
                  height: "56px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                  boxShadow: "0 4px 20px rgba(81, 207, 102, 0.4)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)"
                  e.target.style.boxShadow = "0 8px 30px rgba(81, 207, 102, 0.6)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)"
                  e.target.style.boxShadow = "0 4px 20px rgba(81, 207, 102, 0.4)"
                }}
                title="Add New Subject"
              >
                ➕
              </button>
              <button
                onClick={() => deleteHandler(classID, "SubjectsClass")}
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  border: "none",
                  borderRadius: "50%",
                  width: "56px",
                  height: "56px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                  boxShadow: "0 4px 20px rgba(239, 68, 68, 0.4)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)"
                  e.target.style.boxShadow = "0 8px 30px rgba(239, 68, 68, 0.6)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)"
                  e.target.style.boxShadow = "0 4px 20px rgba(239, 68, 68, 0.4)"
                }}
                title="Delete All Subjects"
              >
                🗑️
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "rollNum", label: "Roll Number", minWidth: 100 },
  ]

  const StudentsButtonHaver = ({ row }) => {
    return (
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => deleteHandler(row.id, "Student")}
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "#ef4444",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "500",
            transition: "all 0.2s ease",
            backdropFilter: "blur(10px)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(239, 68, 68, 0.2)"
            e.target.style.transform = "translateY(-1px)"
            e.target.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.3)"
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(239, 68, 68, 0.1)"
            e.target.style.transform = "translateY(0)"
            e.target.style.boxShadow = "none"
          }}
        >
          👤❌
        </button>
        <button
          onClick={() => navigate("/Admin/students/student/" + row.id)}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "white",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "500",
            transition: "all 0.2s ease",
            backdropFilter: "blur(10px)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.2)"
            e.target.style.transform = "translateY(-1px)"
            e.target.style.boxShadow = "0 4px 12px rgba(255, 255, 255, 0.2)"
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)"
            e.target.style.transform = "translateY(0)"
            e.target.style.boxShadow = "none"
          }}
        >
          👁️ View
        </button>
        <button
          onClick={() => navigate("/Admin/students/student/attendance/" + row.id)}
          style={{
            background: "rgba(139, 92, 246, 0.2)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "#8b5cf6",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "500",
            transition: "all 0.2s ease",
            backdropFilter: "blur(10px)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(139, 92, 246, 0.3)"
            e.target.style.transform = "translateY(-1px)"
            e.target.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.4)"
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(139, 92, 246, 0.2)"
            e.target.style.transform = "translateY(0)"
            e.target.style.boxShadow = "none"
          }}
        >
          📊 Attendance
        </button>
      </div>
    )
  }

  const ClassStudentsSection = () => {
    const studentRows = sclassStudents.map((student) => {
      return {
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
      }
    })

    return (
      <div style={{ padding: "20px" }}>
        {getresponse ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "16px",
                padding: "40px",
                maxWidth: "400px",
              }}
            >
              <div style={{ fontSize: "64px", marginBottom: "16px" }}>👥</div>
              <h3
                style={{
                  color: "#ffffff",
                  fontSize: "20px",
                  fontWeight: "600",
                  margin: "0 0 8px 0",
                }}
              >
                No Students Found
              </h3>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "14px",
                  margin: "0 0 24px 0",
                }}
              >
                Get started by adding your first student
              </p>
              <button
                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                style={{
                  background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)"
                  e.target.style.boxShadow = "0 8px 25px rgba(81, 207, 102, 0.4)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)"
                  e.target.style.boxShadow = "none"
                }}
              >
                ➕ Add Students
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
                padding: "20px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "16px",
              }}
            >
              <div>
                <h3
                  style={{
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 0 4px 0",
                  }}
                >
                  👥 Students List
                </h3>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "14px",
                    margin: 0,
                  }}
                >
                  {Array.isArray(sclassStudents) ? sclassStudents.length : 0} students found
                </p>
              </div>
              <button
                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                style={{
                  background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-1px)"
                  e.target.style.boxShadow = "0 4px 15px rgba(81, 207, 102, 0.4)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)"
                  e.target.style.boxShadow = "none"
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Add Student
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gap: "16px",
              }}
            >
              {studentRows &&
                studentRows.map((row, index) => (
                  <div
                    key={index}
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "16px",
                      padding: "24px",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)"
                      e.currentTarget.style.boxShadow = "0 16px 48px rgba(255, 255, 255, 0.15)"
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "none"
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3))",
                        borderRadius: "16px 16px 0 0",
                      }}
                    ></div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1, marginRight: "16px" }}>
                        <h3
                          style={{
                            color: "#ffffff",
                            fontSize: "18px",
                            fontWeight: "600",
                            margin: "0 0 8px 0",
                            lineHeight: "1.4",
                          }}
                        >
                          {row.name}
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ opacity: 0.6, color: "white" }}
                          >
                            <path
                              d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle
                              cx="12"
                              cy="7"
                              r="4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span
                            style={{
                              color: "rgba(255, 255, 255, 0.6)",
                              fontSize: "13px",
                            }}
                          >
                            Roll: {row.rollNum}
                          </span>
                        </div>
                      </div>

                      <StudentsButtonHaver row={row} />
                    </div>
                  </div>
                ))}
            </div>

            <div
              style={{
                position: "fixed",
                bottom: "24px",
                right: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                zIndex: 1000,
              }}
            >
              <button
                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                style={{
                  background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                  border: "none",
                  borderRadius: "50%",
                  width: "56px",
                  height: "56px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                  boxShadow: "0 4px 20px rgba(81, 207, 102, 0.4)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)"
                  e.target.style.boxShadow = "0 8px 30px rgba(81, 207, 102, 0.6)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)"
                  e.target.style.boxShadow = "0 4px 20px rgba(81, 207, 102, 0.4)"
                }}
                title="Add New Student"
              >
                👤➕
              </button>
              <button
                onClick={() => deleteHandler(classID, "StudentsClass")}
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  border: "none",
                  borderRadius: "50%",
                  width: "56px",
                  height: "56px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                  boxShadow: "0 4px 20px rgba(239, 68, 68, 0.4)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)"
                  e.target.style.boxShadow = "0 8px 30px rgba(239, 68, 68, 0.6)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)"
                  e.target.style.boxShadow = "0 4px 20px rgba(239, 68, 68, 0.4)"
                }}
                title="Delete All Students"
              >
                👥🗑️
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  const ClassTeachersSection = () => {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: "#9ca3af",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "16px",
            padding: "40px",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              marginBottom: "16px",
            }}
          >
            👨‍🏫
          </div>
          <h3
            style={{
              color: "white",
              marginBottom: "8px",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Teachers Section
          </h3>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "14px",
              margin: 0,
            }}
          >
            Coming soon...
          </p>
        </div>
      </div>
    )
  }

  const ClassDetailsSection = () => {
    const numberOfSubjects = subjectsList.length
    const numberOfStudents = sclassStudents.length

    return (
      <div style={{ padding: "20px" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: "32px",
              fontWeight: "700",
              marginBottom: "8px",
              background: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            📚 Class Details
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "16px",
              margin: 0,
            }}
          >
            Comprehensive overview of class information
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "16px",
              padding: "24px",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(255, 255, 255, 0.2)"
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.3))",
                borderRadius: "16px 16px 0 0",
              }}
            ></div>
            <div
              style={{
                fontSize: "32px",
                marginBottom: "12px",
              }}
            >
              🏫
            </div>
            <h3
              style={{
                color: "white",
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Class Name
            </h3>
            <p
              style={{
                color: "#e5e7eb",
                fontSize: "24px",
                fontWeight: "700",
                margin: "0",
              }}
            >
              {sclassDetails && sclassDetails.sclassName}
            </p>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "16px",
              padding: "24px",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(81, 207, 102, 0.2)"
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, rgba(81, 207, 102, 0.6), rgba(81, 207, 102, 0.3))",
                borderRadius: "16px 16px 0 0",
              }}
            ></div>
            <div
              style={{
                fontSize: "32px",
                marginBottom: "12px",
              }}
            >
              📖
            </div>
            <h3
              style={{
                color: "white",
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Total Subjects
            </h3>
            <p
              style={{
                color: "#51cf66",
                fontSize: "32px",
                fontWeight: "700",
                margin: "0",
              }}
            >
              {numberOfSubjects}
            </p>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "16px",
              padding: "24px",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(139, 92, 246, 0.2)"
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, rgba(139, 92, 246, 0.6), rgba(139, 92, 246, 0.3))",
                borderRadius: "16px 16px 0 0",
              }}
            ></div>
            <div
              style={{
                fontSize: "32px",
                marginBottom: "12px",
              }}
            >
              👥
            </div>
            <h3
              style={{
                color: "white",
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Total Students
            </h3>
            <p
              style={{
                color: "#8b5cf6",
                fontSize: "32px",
                fontWeight: "700",
                margin: "0",
              }}
            >
              {numberOfStudents}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {getresponse && (
            <button
              onClick={() => navigate("/Admin/class/addstudents/" + classID)}
              style={{
                background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                border: "none",
                borderRadius: "12px",
                padding: "14px 28px",
                color: "white",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(81, 207, 102, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 8px 30px rgba(81, 207, 102, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "0 4px 20px rgba(81, 207, 102, 0.3)"
              }}
            >
              👤➕ Add Students
            </button>
          )}
          {response && (
            <button
              onClick={() => navigate("/Admin/addsubject/" + classID)}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "12px",
                padding: "14px 28px",
                color: "white",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 8px 30px rgba(102, 126, 234, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "0 4px 20px rgba(102, 126, 234, 0.3)"
              }}
            >
              📚➕ Add Subjects
            </button>
          )}
        </div>
      </div>
    )
  }

  const LoadingSpinner = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          padding: "32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid rgba(255, 255, 255, 0.3)",
            borderTop: "3px solid white",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px",
          }}
        ></div>
        <p
          style={{
            color: "white",
            fontSize: "16px",
            margin: 0,
          }}
        >
          Loading class details...
        </p>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
          animationDelay: "0s",
        }}
      ></div>
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
          animationDelay: "2s",
        }}
      ></div>
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
          animationDelay: "4s",
        }}
      ></div>
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
          animationDelay: "1s",
        }}
      ></div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
      `}</style>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div style={{ width: "100%" }}>
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              background: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              zIndex: 1000,
              padding: "0 20px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "0",
                maxWidth: "1200px",
                margin: "0 auto",
              }}
            >
              {[
                { id: "1", label: "📊 Details", icon: "📊" },
                { id: "2", label: "📚 Subjects", icon: "📚" },
                { id: "3", label: "👥 Students", icon: "👥" },
                { id: "4", label: "👨‍🏫 Teachers", icon: "👨‍🏫" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setValue(tab.id)}
                  style={{
                    background: value === tab.id ? "rgba(255, 255, 255, 0.2)" : "transparent",
                    border: "none",
                    borderBottom: value === tab.id ? "3px solid rgba(255, 255, 255, 0.8)" : "3px solid transparent",
                    padding: "16px 24px",
                    color: value === tab.id ? "white" : "rgba(255, 255, 255, 0.7)",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: value === tab.id ? "600" : "500",
                    transition: "all 0.3s ease",
                    borderRadius: value === tab.id ? "8px 8px 0 0" : "0",
                    backdropFilter: value === tab.id ? "blur(10px)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (value !== tab.id) {
                      e.target.style.color = "white"
                      e.target.style.background = "rgba(255, 255, 255, 0.1)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (value !== tab.id) {
                      e.target.style.color = "rgba(255, 255, 255, 0.7)"
                      e.target.style.background = "transparent"
                    }
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div
            style={{
              marginTop: "80px",
              padding: "20px",
              maxWidth: "1200px",
              margin: "80px auto 0",
              minHeight: "calc(100vh - 80px)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {value === "1" && <ClassDetailsSection />}
            {value === "2" && <ClassSubjectsSection />}
            {value === "3" && <ClassStudentsSection />}
            {value === "4" && <ClassTeachersSection />}
          </div>
        </div>
      )}

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: "16px",
              }}
            >
              ⚠️
            </div>
            <p
              style={{
                color: "white",
                fontSize: "16px",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              {message}
            </p>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                color: "white",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "none"
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClassDetails
