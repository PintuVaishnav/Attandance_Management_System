"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Grid, Container, CircularProgress, Backdrop } from "@mui/material"
import { AccountCircle, School, Group } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../redux/userRelated/userHandle"
import Popup from "../components/Popup"

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const { status, currentUser, currentRole } = useSelector((state) => state.user)

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      } else {
        navigate("/Adminlogin")
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Dipesh Awasthi"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      } else {
        navigate("/Studentlogin")
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      } else {
        navigate("/Teacherlogin")
      }
    }
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
    } else if (status === "error") {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser])

  const containerStyle = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    position: "relative",
    overflow: "hidden",
  }

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)",
    pointerEvents: "none",
  }

  const titleStyle = {
    textAlign: "center",
    marginBottom: "3rem",
    color: "#ffffff",
    fontSize: "2.5rem",
    fontWeight: "700",
    textShadow: "0 4px 20px rgba(0,0,0,0.3)",
    letterSpacing: "-0.02em",
  }

  const subtitleStyle = {
    textAlign: "center",
    marginBottom: "4rem",
    color: "rgba(255,255,255,0.9)",
    fontSize: "1.1rem",
    fontWeight: "400",
    maxWidth: "600px",
    margin: "0 auto 4rem auto",
    lineHeight: "1.6",
  }

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "24px",
    padding: "2.5rem 2rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }

  const cardHoverStyle = {
    transform: "translateY(-8px) scale(1.02)",
    background: "rgba(255, 255, 255, 0.25)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  }

  const iconContainerStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.5rem",
    transition: "all 0.3s ease",
  }

  const roleNameStyle = {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "1rem",
    letterSpacing: "-0.01em",
  }

  const descriptionStyle = {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: "0.95rem",
    lineHeight: "1.5",
    fontWeight: "400",
  }

  const [hoveredCard, setHoveredCard] = useState(null)

  const userRoles = [
    {
      type: "Admin",
      icon: <AccountCircle style={{ fontSize: "2.5rem", color: "#ffffff" }} />,
      title: "Administrator",
      description:
        "Access the comprehensive dashboard to manage all system data, users, and configurations with full administrative privileges.",
    },
    {
      type: "Student",
      icon: <School style={{ fontSize: "2.5rem", color: "#ffffff" }} />,
      title: "Student",
      description:
        "Explore your personalized learning environment with access to course materials, assignments, and academic progress tracking.",
    },
    {
      type: "Teacher",
      icon: <Group style={{ fontSize: "2.5rem", color: "#ffffff" }} />,
      title: "Teacher",
      description:
        "Create and manage courses, assignments, and monitor student progress with powerful teaching tools and analytics.",
    },
  ]

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <Container maxWidth="lg" style={{ position: "relative", zIndex: 1 }}>
        <h1 style={titleStyle}>Choose Your Role</h1>
        <p style={subtitleStyle}>
          Select your role to access your personalized dashboard and begin your educational journey
        </p>

        <Grid container spacing={4} justifyContent="center">
          {userRoles.map((role, index) => (
            <Grid item xs={12} sm={6} md={4} key={role.type}>
              <div
                onClick={() => navigateHandler(role.type)}
                style={{
                  ...cardStyle,
                  ...(hoveredCard === index ? cardHoverStyle : {}),
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  style={{
                    ...iconContainerStyle,
                    transform: hoveredCard === index ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {role.icon}
                </div>
                <h2 style={roleNameStyle}>{role.title}</h2>
                <p style={descriptionStyle}>{role.description}</p>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(10px)",
          background: "rgba(0,0,0,0.7)",
        }}
        open={loader}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <CircularProgress color="inherit" size={50} thickness={4} />
          <span
            style={{
              fontSize: "1.1rem",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Please Wait...
          </span>
        </div>
      </Backdrop>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  )
}

export default ChooseUser
