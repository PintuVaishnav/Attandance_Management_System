"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addStuff } from "../../../redux/userRelated/userHandle"
import { underControl } from "../../../redux/userRelated/userSlice"
import Popup from "../../../components/Popup"

const AddClass = () => {
  const [sclassName, setSclassName] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userState = useSelector((state) => state.user)
  const { status, currentUser, response, error, tempDetails } = userState

  const adminID = currentUser._id
  const address = "Sclass"

  const [loader, setLoader] = useState(false)
  const [message, setMessage] = useState("")
  const [showPopup, setShowPopup] = useState(false)

  const fields = {
    sclassName,
    adminID,
  }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(addStuff(fields, address))
  }

  useEffect(() => {
    if (status === "added" && tempDetails) {
      navigate("/Admin/classes/class/" + tempDetails._id)
      dispatch(underControl())
      setLoader(false)
    } else if (status === "failed") {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    } else if (status === "error") {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch, tempDetails])

  return (
    <>
      {/* Background with floating elements */}
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
        {/* Floating background elements */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "100px",
            height: "100px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "60%",
            right: "15%",
            width: "80px",
            height: "80px",
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: "50%",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "20%",
            width: "60px",
            height: "60px",
            background: "rgba(255, 255, 255, 0.06)",
            borderRadius: "50%",
            animation: "float 7s ease-in-out infinite",
          }}
        ></div>

        {/* Main form container */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "48px",
            maxWidth: "500px",
            width: "100%",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header section */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            {/* Classroom icon */}
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
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"
                  fill="white"
                />
              </svg>
            </div>

            <h1
              style={{
                fontSize: "32px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "12px",
                lineHeight: "1.2",
              }}
            >
              Create New Class
            </h1>

            <p
              style={{
                color: "#6b7280",
                fontSize: "16px",
                lineHeight: "1.5",
                margin: 0,
              }}
            >
              Add a new class to your educational system
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} style={{ width: "100%" }}>
            {/* Input field */}
            <div style={{ marginBottom: "32px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Class Name *
              </label>
              <input
                type="text"
                value={sclassName}
                onChange={(event) => setSclassName(event.target.value)}
                required
                placeholder="Enter class name (e.g., Grade 10-A)"
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  fontSize: "16px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  backgroundColor: "#ffffff",
                  boxSizing: "border-box",
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

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                flexDirection: "column",
              }}
            >
              {/* Create button */}
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
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: loader ? "none" : "0 10px 30px rgba(102, 126, 234, 0.3)",
                  transform: loader ? "none" : "translateY(0)",
                  opacity: loader ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loader) {
                    e.target.style.transform = "translateY(-2px)"
                    e.target.style.boxShadow = "0 15px 40px rgba(102, 126, 234, 0.4)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loader) {
                    e.target.style.transform = "translateY(0)"
                    e.target.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.3)"
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
                    Creating...
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
                    Create Class
                  </>
                )}
              </button>

              {/* Go back button */}
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#667eea",
                  background: "rgba(102, 126, 234, 0.1)",
                  border: "2px solid rgba(102, 126, 234, 0.2)",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(102, 126, 234, 0.15)"
                  e.target.style.borderColor = "rgba(102, 126, 234, 0.3)"
                  e.target.style.transform = "translateY(-1px)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(102, 126, 234, 0.1)"
                  e.target.style.borderColor = "rgba(102, 126, 234, 0.2)"
                  e.target.style.transform = "translateY(0)"
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 12H5M12 19L5 12L12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Go Back
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  )
}

export default AddClass
