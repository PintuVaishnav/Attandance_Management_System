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
            borderRadius: "6px",
            padding: "6px 8px",
            color: "#ef4444",
            cursor: "pointer",
            fontSize: "12px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(239, 68, 68, 0.2)"
            e.target.style.transform = "translateY(-1px)"
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(239, 68, 68, 0.1)"
            e.target.style.transform = "translateY(0)"
          }}
        >
          🗑️ Delete
        </button>
        <button
          onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            borderRadius: "6px",
            padding: "6px 12px",
            color: "white",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "500",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-1px)"
            e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)"
          }}
          onMouseLeave={(e) => {
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
          <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <button
              onClick={() => navigate("/Admin/addsubject/" + classID)}
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
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
                e.target.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "none"
              }}
            >
              ➕ Add Subjects
            </button>
          </div>
        ) : (
          <>
            <h3
              style={{
                color: "white",
                marginBottom: "20px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              📚 Subjects List
            </h3>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr",
                  gap: "1px",
                  background: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: "16px",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Subject Name
                </div>
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: "16px",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Subject Code
                </div>
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: "16px",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Actions
                </div>

                {subjectRows &&
                  subjectRows.map((row, index) => (
                    <>
                      <div
                        key={`name-${index}`}
                        style={{
                          background: "rgba(0, 0, 0, 0.2)",
                          padding: "16px",
                          color: "#e5e7eb",
                          fontSize: "14px",
                        }}
                      >
                        {row.name}
                      </div>
                      <div
                        key={`code-${index}`}
                        style={{
                          background: "rgba(0, 0, 0, 0.2)",
                          padding: "16px",
                          color: "#e5e7eb",
                          fontSize: "14px",
                        }}
                      >
                        {row.code}
                      </div>
                      <div
                        key={`actions-${index}`}
                        style={{
                          background: "rgba(0, 0, 0, 0.2)",
                          padding: "16px",
                        }}
                      >
                        <SubjectsButtonHaver row={row} />
                      </div>
                    </>
                  ))}
              </div>
            </div>

            <div
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <button
                onClick={() => navigate("/Admin/addsubject/" + classID)}
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: "50px",
                  width: "56px",
                  height: "56px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                  boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)"
                  e.target.style.boxShadow = "0 8px 30px rgba(102, 126, 234, 0.6)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)"
                  e.target.style.boxShadow = "0 4px 20px rgba(102, 126, 234, 0.4)"
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
                  borderRadius: "50px",
                  width: "56px",
                  height: "56px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                  boxShadow: "0 4px 20px rgba(239, 68, 68, 0.4)",
                  transition: "all 0.3s ease",
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

  const studentRows = sclassStudents.map((student) => {
    return {
      name: student.name,
      rollNum: student.rollNum,
      id: student._id,
    }
  })

  const StudentsButtonHaver = ({ row }) => {
    return (
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => deleteHandler(row.id, "Student")}
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "6px",
            padding: "6px 8px",
            color: "#ef4444",
            cursor: "pointer",
            fontSize: "12px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(239, 68, 68, 0.2)"
            e.target.style.transform = "translateY(-1px)"
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(239, 68, 68, 0.1)"
            e.target.style.transform = "translateY(0)"
          }}
        >
          👤❌
        </button>
        <button
          onClick={() => navigate("/Admin/students/student/" + row.id)}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            borderRadius: "6px",
            padding: "6px 12px",
            color: "white",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "500",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-1px)"
            e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)"
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)"
            e.target.style.boxShadow = "none"
          }}
        >
          👁️ View
        </button>
        <button
          onClick={() => navigate("/Admin/students/student/attendance/" + row.id)}
          style={{
            background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
            border: "none",
            borderRadius: "6px",
            padding: "6px 12px",
            color: "white",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "500",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-1px)"
            e.target.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.4)"
          }}
          onMouseLeave={(e) => {
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
    return (
      <div style={{ padding: "20px" }}>
        {getresponse ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <button
              onClick={() => navigate("/Admin/class/addstudents/" + classID)}
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
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
                e.target.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "none"
              }}
            >
              ➕ Add Students
            </button>
          </div>
        ) : (
          <>
            <h3
              style={{
                color: "white",
                marginBottom: "20px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              👥 Students List
            </h3>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 2fr",
                  gap: "1px",
                  background: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: "16px",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Name
                </div>
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: "16px",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Roll Number
                </div>
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: "16px",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Actions
                </div>

                {studentRows &&
                  studentRows.map((row, index) => (
                    <>
                      <div
                        key={`name-${index}`}
                        style={{
                          background: "rgba(0, 0, 0, 0.2)",
                          padding: "16px",
                          color: "#e5e7eb",
                          fontSize: "14px",
                        }}
                      >
                        {row.name}
                      </div>
                      <div
                        key={`roll-${index}`}
                        style={{
                          background: "rgba(0, 0, 0, 0.2)",
                          padding: "16px",
                          color: "#e5e7eb",
                          fontSize: "14px",
                        }}
                      >
                        {row.rollNum}
                      </div>
                      <div
                        key={`actions-${index}`}
                        style={{
                          background: "rgba(0, 0, 0, 0.2)",
                          padding: "16px",
                        }}
                      >
                        <StudentsButtonHaver row={row} />
                      </div>
                    </>
                  ))}
              </div>
            </div>

            <div
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <button
                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: "50px",
                  width: "56px",
                  height: "56px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                  boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)"
                  e.target.style.boxShadow = "0 8px 30px rgba(102, 126, 234, 0.6)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)"
                  e.target.style.boxShadow = "0 4px 20px rgba(102, 126, 234, 0.4)"
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
                  borderRadius: "50px",
                  width: "56px",
                  height: "56px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                  boxShadow: "0 4px 20px rgba(239, 68, 68, 0.4)",
                  transition: "all 0.3s ease",
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
            fontSize: "48px",
            marginBottom: "16px",
          }}
        >
          👨‍🏫
        </div>
        <h3
          style={{
            color: "white",
            marginBottom: "8px",
            fontSize: "18px",
          }}
        >
          Teachers Section
        </h3>
        <p>Coming soon...</p>
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
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "8px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            📚 Class Details
          </h2>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "16px",
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
          {/* Class Name Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "24px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(102, 126, 234, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
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

          {/* Subjects Count Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "24px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(16, 185, 129, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
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
                color: "#10b981",
                fontSize: "32px",
                fontWeight: "700",
                margin: "0",
              }}
            >
              {numberOfSubjects}
            </p>
          </div>

          {/* Students Count Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "24px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(139, 92, 246, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
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

        {/* Action Buttons */}
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
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                border: "none",
                borderRadius: "12px",
                padding: "14px 28px",
                color: "white",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(16, 185, 129, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 8px 30px rgba(16, 185, 129, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "0 4px 20px rgba(16, 185, 129, 0.3)"
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Background Elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "100px",
          height: "100px",
          background: "radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "60%",
          right: "10%",
          width: "150px",
          height: "150px",
          background: "radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      ></div>

      <style>
        {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(180deg); }
                    }
                `}
      </style>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            color: "white",
            fontSize: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                border: "2px solid rgba(102, 126, 234, 0.3)",
                borderTop: "2px solid #667eea",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            ></div>
            Loading...
          </div>
          <style>
            {`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}
          </style>
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          {/* Tab Navigation */}
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              background: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(10px)",
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
                    background: value === tab.id ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "transparent",
                    border: "none",
                    borderBottom: value === tab.id ? "3px solid #667eea" : "3px solid transparent",
                    padding: "16px 24px",
                    color: value === tab.id ? "white" : "#9ca3af",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: value === tab.id ? "600" : "500",
                    transition: "all 0.3s ease",
                    borderRadius: value === tab.id ? "8px 8px 0 0" : "0",
                  }}
                  onMouseEnter={(e) => {
                    if (value !== tab.id) {
                      e.target.style.color = "white"
                      e.target.style.background = "rgba(255, 255, 255, 0.1)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (value !== tab.id) {
                      e.target.style.color = "#9ca3af"
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
            }}
          >
            {value === "1" && <ClassDetailsSection />}
            {value === "2" && <ClassSubjectsSection />}
            {value === "3" && <ClassStudentsSection />}
            {value === "4" && <ClassTeachersSection />}
          </div>
        </div>
      )}

      {/* Popup */}
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
