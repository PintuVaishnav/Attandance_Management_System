"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../../../redux/userRelated/userHandle"
import Popup from "../../../components/Popup"
import { underControl } from "../../../redux/userRelated/userSlice"
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle"

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const userState = useSelector((state) => state.user)
  const { status, currentUser, response, error } = userState
  const { sclassesList } = useSelector((state) => state.sclass)

  const [name, setName] = useState("")
  const [rollNum, setRollNum] = useState("")
  const [password, setPassword] = useState("")
  const [className, setClassName] = useState("")
  const [sclassName, setSclassName] = useState("")

  const adminID = currentUser._id
  const role = "Student"
  const attendance = []

  useEffect(() => {
    if (situation === "Class") {
      setSclassName(params.id)
    }
  }, [params.id, situation])

  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"))
  }, [adminID, dispatch])

  const changeHandler = (event) => {
    if (event.target.value === "Select Class") {
      setClassName("Select Class")
      setSclassName("")
    } else {
      const selectedClass = sclassesList.find((classItem) => classItem.sclassName === event.target.value)
      setClassName(selectedClass.sclassName)
      setSclassName(selectedClass._id)
    }
  }

  const fields = { name, rollNum, password, sclassName, adminID, role, attendance }

  const submitHandler = (event) => {
    event.preventDefault()
    if (sclassName === "") {
      setMessage("Please select a classname")
      setShowPopup(true)
    } else {
      setLoader(true)
      dispatch(registerUser(fields, role))
    }
  }

  useEffect(() => {
    if (status === "added") {
      dispatch(underControl())
      navigate(-1)
    } else if (status === "failed") {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    } else if (status === "error") {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch])

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
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
            animationDelay: "2s"
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
            animationDelay: "4s"
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
            animationDelay: "1s"
          }}
        ></div>

        <div
          style={{
            // <CHANGE> Changed from white background to transparent glassmorphic background
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "48px",
            width: "100%",
            maxWidth: "500px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                boxShadow: "0 8px 32px rgba(81, 207, 102, 0.3)",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  fill="white"
                />
                <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="white" />
              </svg>
            </div>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "700",
                // <CHANGE> Changed to white color for glassmorphic background
                color: "white",
                margin: "0 0 8px 0",
                letterSpacing: "-0.5px",
              }}
            >
              Add Student
            </h1>
            <p
              style={{
                // <CHANGE> Changed to white with transparency for glassmorphic background
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "16px",
                margin: 0,
                fontWeight: "400",
              }}
            >
              Register a new student to the system
            </p>
          </div>

          <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  // <CHANGE> Changed to white color for glassmorphic background
                  color: "white",
                  marginBottom: "4px",
                }}
              >
                Student Name
              </label>
              <input
                type="text"
                placeholder="Enter student's full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
                style={{
                  padding: "16px 20px",
                  // <CHANGE> Updated input styling for glassmorphic theme
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.4)"
                  e.target.style.boxShadow = "0 0 0 3px rgba(255, 255, 255, 0.1)"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.2)"
                  e.target.style.boxShadow = "none"
                }}
              />
            </div>

            {situation === "Student" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    // <CHANGE> Changed to white color for glassmorphic background
                    color: "white",
                    marginBottom: "4px",
                  }}
                >
                  Class
                </label>
                <select
                  value={className}
                  onChange={changeHandler}
                  required
                  style={{
                    padding: "16px 20px",
                    // <CHANGE> Updated select styling for glassmorphic theme
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    outline: "none",
                    fontFamily: "inherit",
                    cursor: "pointer",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.4)"
                    e.target.style.boxShadow = "0 0 0 3px rgba(255, 255, 255, 0.1)"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.2)"
                    e.target.style.boxShadow = "none"
                  }}
                >
                  <option value="Select Class" style={{ background: "#374151", color: "white" }}>Select Class</option>
                  {sclassesList.map((classItem, index) => (
                    <option key={index} value={classItem.sclassName} style={{ background: "#374151", color: "white" }}>
                      {classItem.sclassName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  // <CHANGE> Changed to white color for glassmorphic background
                  color: "white",
                  marginBottom: "4px",
                }}
              >
                Roll Number
              </label>
              <input
                type="number"
                placeholder="Enter roll number"
                value={rollNum}
                onChange={(event) => setRollNum(event.target.value)}
                required
                style={{
                  padding: "16px 20px",
                  // <CHANGE> Updated input styling for glassmorphic theme
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.4)"
                  e.target.style.boxShadow = "0 0 0 3px rgba(255, 255, 255, 0.1)"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.2)"
                  e.target.style.boxShadow = "none"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  // <CHANGE> Changed to white color for glassmorphic background
                  color: "white",
                  marginBottom: "4px",
                }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                required
                style={{
                  padding: "16px 20px",
                  // <CHANGE> Updated input styling for glassmorphic theme
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.4)"
                  e.target.style.boxShadow = "0 0 0 3px rgba(255, 255, 255, 0.1)"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.2)"
                  e.target.style.boxShadow = "none"
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loader}
              style={{
                background: loader ? "rgba(255, 255, 255, 0.2)" : "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "18px 24px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: loader ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "8px",
                boxShadow: loader ? "none" : "0 4px 16px rgba(81, 207, 102, 0.3)",
                transform: loader ? "none" : "translateY(0px)",
                opacity: loader ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loader) {
                  e.target.style.transform = "translateY(-2px)"
                  e.target.style.boxShadow = "0 6px 20px rgba(81, 207, 102, 0.4)"
                }
              }}
              onMouseLeave={(e) => {
                if (!loader) {
                  e.target.style.transform = "translateY(0px)"
                  e.target.style.boxShadow = "0 4px 16px rgba(81, 207, 102, 0.3)"
                }
              }}
            >
              {loader ? (
                <>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                  Adding Student...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Add Student
                </>
              )}
            </button>
          </form>
        </div>

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
        `}</style>
      </div>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  )
}

export default AddStudent