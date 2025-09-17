"use client"
import { Link } from "react-router-dom"
import { Container, Grid, Box, Button } from "@mui/material"
import Students from "../assets/students.svg"

const Homepage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <Container
        maxWidth="lg"
        
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "24px",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
          backdropFilter: "blur(10px)",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Grid container spacing={0} style={{ minHeight: "70vh" }}>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(45deg, #f8fafc, #e2e8f0)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                width: "60px",
                height: "60px",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                borderRadius: "50%",
                opacity: "0.1",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: "40px",
                right: "40px",
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #764ba2, #667eea)",
                borderRadius: "50%",
                opacity: "0.1",
              }}
            ></div>
            <img
              src={Students || "/placeholder.svg"}
              alt="students"
              style={{
                width: "85%",
                maxWidth: "400px",
                filter: "drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1))",
                transform: "scale(1.05)",
                transition: "transform 0.3s ease",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "60px 40px",
            }}
          >
            <div
              style={{
                marginBottom: "40px",
              }}
            >
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: "800",
                  lineHeight: "1.2",
                  margin: "0 0 30px 0",
                  letterSpacing: "-0.02em",
                }}
              >
                Welcome to
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  College Attendance
                </span>
                <br />
                System
              </h1>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "1.1rem",
                  lineHeight: "1.7",
                  margin: "0 0 40px 0",
                  fontWeight: "400",
                }}
              >
                Simplify college management by organizing classes, tracking student attendance, and managing faculty
                efficiently. Monitor academic performance, generate reports, and provide timely feedback. Access student
                records, view marks, and communicate seamlessly across departments.
              </p>
            </div>

            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "20px",
              }}
            >
              <Link to="/choose" style={{ textDecoration: "none", width: "100%" }}>
                <Button
                  variant="contained"
                  fullWidth
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    borderRadius: "16px",
                    padding: "18px 40px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    textTransform: "none",
                    boxShadow: "0 10px 25px rgba(102, 126, 234, 0.4)",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)"
                    e.target.style.boxShadow = "0 15px 35px rgba(102, 126, 234, 0.5)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)"
                    e.target.style.boxShadow = "0 10px 25px rgba(102, 126, 234, 0.4)"
                  }}
                >
                  <span style={{ position: "relative", zIndex: 1 }}>Login to Dashboard</span>
                </Button>
              </Link>

              
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Homepage
