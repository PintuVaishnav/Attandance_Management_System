"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Visibility, VisibilityOff, Lock, Person, Email } from "@mui/icons-material"
import bgpic from "../assets/designlogin.jpg"
import { loginUser } from "../redux/userRelated/userHandle"
import Popup from "../components/Popup"

const LoginPage = ({ role }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, currentUser, response, error, currentRole } = useSelector((state) => state.user)

  const [toggle, setToggle] = useState(false)
  const [guestLoader, setGuestLoader] = useState(false)
  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [rollNumberError, setRollNumberError] = useState(false)
  const [studentNameError, setStudentNameError] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (role === "Student") {
      const rollNum = event.target.rollNumber.value
      const studentName = event.target.studentName.value
      const password = event.target.password.value

      if (!rollNum || !studentName || !password) {
        if (!rollNum) setRollNumberError(true)
        if (!studentName) setStudentNameError(true)
        if (!password) setPasswordError(true)
        return
      }
      const fields = { rollNum, studentName, password }
      setLoader(true)
      dispatch(loginUser(fields, role))
    } else {
      const email = event.target.email.value
      const password = event.target.password.value

      if (!email || !password) {
        if (!email) setEmailError(true)
        if (!password) setPasswordError(true)
        return
      }

      const fields = { email, password }
      setLoader(true)
      dispatch(loginUser(fields, role))
    }
  }

  const handleInputChange = (event) => {
    const { name } = event.target
    if (name === "email") setEmailError(false)
    if (name === "password") setPasswordError(false)
    if (name === "rollNumber") setRollNumberError(false)
    if (name === "studentName") setStudentNameError(false)
  }

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      if (currentRole === "Admin") {
        navigate("/Admin/dashboard")
      } else if (currentRole === "Student") {
        navigate("/Student/dashboard")
      } else if (currentRole === "Teacher") {
        navigate("/Teacher/dashboard")
      }
    } else if (status === "failed") {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    } else if (status === "error") {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
      setGuestLoader(false)
    }
  }, [status, currentRole, navigate, error, response, currentUser])

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          boxShadow: "0 32px 64px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "600px",
        }}
      >
        {/* Left Side - Login Form */}
        <div
          style={{
            padding: "60px 50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
          }}
        >
          {/* Role Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 16px",
              background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              color: "white",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "32px",
              alignSelf: "flex-start",
              boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
            }}
          >
            {role === "Admin" && <Person style={{ marginRight: "8px", fontSize: "18px" }} />}
            {role === "Teacher" && <Person style={{ marginRight: "8px", fontSize: "18px" }} />}
            {role === "Student" && <Person style={{ marginRight: "8px", fontSize: "18px" }} />}
            {role} Portal
          </div>

          {/* Header */}
          <div style={{ marginBottom: "40px" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "8px",
                background: "linear-gradient(135deg, #1f2937 0%, #4b5563 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Welcome Back
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "#6b7280",
                fontWeight: "400",
              }}
            >
              Please sign in to your {role.toLowerCase()} account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            {role === "Student" ? (
              <>
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
                    Roll Number
                  </label>
                  <input
                    type="number"
                    name="rollNumber"
                    placeholder="Enter your roll number"
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      border: rollNumberError ? "2px solid #ef4444" : "2px solid #e5e7eb",
                      borderRadius: "12px",
                      fontSize: "16px",
                      background: "#ffffff",
                      transition: "all 0.3s ease",
                      outline: "none",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#8b5cf6"
                      e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)"
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = rollNumberError ? "#ef4444" : "#e5e7eb"
                      e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)"
                    }}
                  />
                  {rollNumberError && (
                    <p style={{ color: "#ef4444", fontSize: "14px", marginTop: "4px" }}>Roll Number is required</p>
                  )}
                </div>

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
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    placeholder="Enter your full name"
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      border: studentNameError ? "2px solid #ef4444" : "2px solid #e5e7eb",
                      borderRadius: "12px",
                      fontSize: "16px",
                      background: "#ffffff",
                      transition: "all 0.3s ease",
                      outline: "none",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#8b5cf6"
                      e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)"
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = studentNameError ? "#ef4444" : "#e5e7eb"
                      e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)"
                    }}
                  />
                  {studentNameError && (
                    <p style={{ color: "#ef4444", fontSize: "14px", marginTop: "4px" }}>Name is required</p>
                  )}
                </div>
              </>
            ) : (
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
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "16px 20px 16px 50px",
                      border: emailError ? "2px solid #ef4444" : "2px solid #e5e7eb",
                      borderRadius: "12px",
                      fontSize: "16px",
                      background: "#ffffff",
                      transition: "all 0.3s ease",
                      outline: "none",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#8b5cf6"
                      e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)"
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = emailError ? "#ef4444" : "#e5e7eb"
                      e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)"
                    }}
                  />
                  <Email
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                      fontSize: "20px",
                    }}
                  />
                </div>
                {emailError && (
                  <p style={{ color: "#ef4444", fontSize: "14px", marginTop: "4px" }}>Email is required</p>
                )}
              </div>
            )}

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
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={toggle ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "16px 50px 16px 50px",
                    border: passwordError ? "2px solid #ef4444" : "2px solid #e5e7eb",
                    borderRadius: "12px",
                    fontSize: "16px",
                    background: "#ffffff",
                    transition: "all 0.3s ease",
                    outline: "none",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#8b5cf6"
                    e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = passwordError ? "#ef4444" : "#e5e7eb"
                    e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)"
                  }}
                />
                <Lock
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                    fontSize: "20px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setToggle(!toggle)}
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9ca3af",
                    padding: "4px",
                  }}
                >
                  {toggle ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              {passwordError && (
                <p style={{ color: "#ef4444", fontSize: "14px", marginTop: "4px" }}>Password is required</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "32px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  color: "#6b7280",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    marginRight: "8px",
                    accentColor: "#8b5cf6",
                  }}
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => {
                  /* Handle forgot password */
                }}
                style={{
                  fontSize: "14px",
                  color: "#8b5cf6",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  textDecoration: "underline",
                }}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loader}
              style={{
                width: "100%",
                padding: "16px",
                background: loader ? "#9ca3af" : "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: loader ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (!loader) {
                  e.target.style.transform = "translateY(-2px)"
                  e.target.style.boxShadow = "0 8px 20px rgba(139, 92, 246, 0.4)"
                }
              }}
              onMouseLeave={(e) => {
                if (!loader) {
                  e.target.style.transform = "translateY(0)"
                  e.target.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.3)"
                }
              }}
            >
              {loader ? (
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid #ffffff",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Right Side - Background Image */}
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.8), rgba(124, 58, 237, 0.8)), url(${bgpic})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            padding: "60px 40px",
            position: "relative",
          }}
        >
          <div
            style={{
              textAlign: "center",
              zIndex: 2,
            }}
          >
            <h2
              style={{
                fontSize: "36px",
                fontWeight: "700",
                marginBottom: "16px",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              College Attendance System
            </h2>
            <p
              style={{
                fontSize: "18px",
                opacity: 0.9,
                lineHeight: "1.6",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Streamline attendance tracking and management for educational institutions
            </p>

            {/* Floating Elements */}
            <div
              style={{
                position: "absolute",
                top: "20%",
                right: "10%",
                width: "60px",
                height: "60px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                animation: "float 6s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "30%",
                left: "15%",
                width: "40px",
                height: "40px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                animation: "float 4s ease-in-out infinite reverse",
              }}
            />
          </div>
        </div>
      </div>

      {/* Loading Backdrop */}
      {guestLoader && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            color: "white",
            fontSize: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "4px solid rgba(255, 255, 255, 0.3)",
                borderTop: "4px solid white",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            Please Wait
          </div>
        </div>
      )}

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

      {/* CSS Animations */}
      <style>
        {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                    }
                    
                    @media (max-width: 768px) {
                        .login-container {
                            grid-template-columns: 1fr !important;
                            min-height: auto !important;
                        }
                        
                        .login-form {
                            padding: 40px 30px !important;
                        }
                        
                        .login-bg {
                            display: none !important;
                        }
                    }
                `}
      </style>
    </div>
  )
}

export default LoginPage
