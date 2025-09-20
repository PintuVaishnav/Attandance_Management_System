"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addStuff } from "../../../redux/userRelated/userHandle"
import { underControl } from "../../../redux/userRelated/userSlice"
import Popup from "../../../components/Popup"

const AddNotice = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, response, error } = useSelector((state) => state.user)
  const { currentUser } = useSelector((state) => state.user)

  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [date, setDate] = useState("")
  const adminID = currentUser._id

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")

  const fields = { title, details, date, adminID }
  const address = "Notice"

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(addStuff(fields, address))
  }

  useEffect(() => {
    if (status === "added") {
      navigate("/Admin/notices")
      dispatch(underControl())
    } else if (status === "error") {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch])

  const LoadingSpinner = () => (
    <div
      style={{
        width: "20px",
        height: "20px",
        border: "2px solid rgba(255, 255, 255, 0.3)",
        borderTop: "2px solid white",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    >
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
          borderRadius: "10px",
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
            maxWidth: "500px",
            margin: "0 auto",
            paddingTop: "4rem",
          }}
        >
          <div
            style={{
              // <CHANGE> Changed from white background to transparent glassmorphic background
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              padding: "3rem",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "2.5rem",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                  borderRadius: "16px",
                  margin: "0 auto 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 32px rgba(81, 207, 102, 0.3)",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
              </div>
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  // <CHANGE> Changed to white color for glassmorphic background
                  color: "white",
                  margin: "0 0 0.5rem 0",
                  background: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Add Notice
              </h1>
              <p
                style={{
                  // <CHANGE> Changed to white with transparency for glassmorphic background
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "1rem",
                  margin: 0,
                }}
              >
                Create a new notice for students and staff
              </p>
            </div>

            <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    // <CHANGE> Changed to white color for glassmorphic background
                    color: "white",
                    marginBottom: "0.5rem",
                  }}
                >
                  Notice Title
                </label>
                <input
                  type="text"
                  placeholder="Enter notice title..."
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1rem",
                    // <CHANGE> Updated input styling for glassmorphic theme
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.4)"
                    e.target.style.background = "rgba(255, 255, 255, 0.15)"
                    e.target.style.boxShadow = "0 0 0 3px rgba(255, 255, 255, 0.1)"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.2)"
                    e.target.style.background = "rgba(255, 255, 255, 0.1)"
                    e.target.style.boxShadow = "none"
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    // <CHANGE> Changed to white color for glassmorphic background
                    color: "white",
                    marginBottom: "0.5rem",
                  }}
                >
                  Notice Details
                </label>
                <textarea
                  placeholder="Enter notice details..."
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  required
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "0.875rem 1rem",
                    // <CHANGE> Updated textarea styling for glassmorphic theme
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    resize: "vertical",
                    minHeight: "100px",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.4)"
                    e.target.style.background = "rgba(255, 255, 255, 0.15)"
                    e.target.style.boxShadow = "0 0 0 3px rgba(255, 255, 255, 0.1)"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.2)"
                    e.target.style.background = "rgba(255, 255, 255, 0.1)"
                    e.target.style.boxShadow = "none"
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    // <CHANGE> Changed to white color for glassmorphic background
                    color: "white",
                    marginBottom: "0.5rem",
                  }}
                >
                  Notice Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "0.875rem 1rem",
                    // <CHANGE> Updated date input styling for glassmorphic theme
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.4)"
                    e.target.style.background = "rgba(255, 255, 255, 0.15)"
                    e.target.style.boxShadow = "0 0 0 3px rgba(255, 255, 255, 0.1)"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.2)"
                    e.target.style.background = "rgba(255, 255, 255, 0.1)"
                    e.target.style.boxShadow = "none"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loader}
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: loader ? "rgba(255, 255, 255, 0.2)" : "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: loader ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  marginTop: "1rem",
                  boxShadow: loader ? "none" : "0 4px 16px rgba(81, 207, 102, 0.3)",
                  transform: loader ? "none" : "translateY(0)",
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
                    e.target.style.transform = "translateY(0)"
                    e.target.style.boxShadow = "0 4px 16px rgba(81, 207, 102, 0.3)"
                  }
                }}
              >
                {loader ? (
                  <>
                    <LoadingSpinner />
                    Creating Notice...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add Notice
                  </>
                )}
              </button>
            </form>

            <button
              onClick={() => navigate("/Admin/notices")}
              style={{
                width: "100%",
                padding: "0.875rem",
                // <CHANGE> Updated back button styling for glassmorphic theme
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                fontSize: "0.95rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
                marginTop: "1rem",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)"
                e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
                e.target.style.transform = "translateY(-1px)"
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)"
                e.target.style.borderColor = "rgba(255, 255, 255, 0.2)"
                e.target.style.transform = "translateY(0)"
              }}
            >
              ← Back to Notices
            </button>
          </div>
        </div>

        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              33% { transform: translateY(-20px) rotate(120deg); }
              66% { transform: translateY(-10px) rotate(240deg); }
            }
          `}
        </style>
      </div>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  )
}

export default AddNotice