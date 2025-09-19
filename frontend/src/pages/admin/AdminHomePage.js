"use client"

import { Container, Grid } from "@mui/material"
import SeeNotice from "../../components/SeeNotice"
import Students from "../../assets/img1.png"
import Classes from "../../assets/img2.png"
import Teachers from "../../assets/img3.png"
import CountUp from "react-countup"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllSclasses } from "../../redux/sclassRelated/sclassHandle"
import { getAllStudents } from "../../redux/studentRelated/studentHandle"
import { getAllTeachers } from "../../redux/teacherRelated/teacherHandle"

const AdminHomePage = () => {
  const dispatch = useDispatch()
  const { studentsList } = useSelector((state) => state.student)
  const { sclassesList } = useSelector((state) => state.sclass)
  const { teachersList } = useSelector((state) => state.teacher)

  const { currentUser } = useSelector((state) => state.user)

  const adminID = currentUser._id

  useEffect(() => {
    dispatch(getAllStudents(adminID))
    dispatch(getAllSclasses(adminID, "Sclass"))
    dispatch(getAllTeachers(adminID))
  }, [adminID, dispatch])

  const numberOfStudents = studentsList && studentsList.length
  const numberOfClasses = sclassesList && sclassesList.length
  const numberOfTeachers = teachersList && teachersList.length

  const containerStyle = {
    // marginTop: "2rem",
    // marginBottom: "2rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "85vh",
    padding: "2rem 0",
    position: "relative",
    overflow: "hidden",
    borderRadius: "10px",
  }

  const floatingElementsStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    zIndex: 1,
  }

  const floatingCircle1Style = {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.1)",
    top: "10%",
    right: "10%",
    animation: "float 6s ease-in-out infinite",
  }

  const floatingCircle2Style = {
    position: "absolute",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.05)",
    bottom: "20%",
    left: "5%",
    animation: "float 8s ease-in-out infinite reverse",
  }

  const gridContainerStyle = {
    position: "relative",
    zIndex: 2,
  }

  const styledPaperStyle = {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    height: "280px",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  }

  const styledPaperHoverStyle = {
    transform: "translateY(-10px)",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.15)",
  }

  const imageStyle = {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    marginBottom: "1rem",
    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
  }

  const titleStyle = {
    fontSize: "1.4rem",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "1rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }

  const dataStyle = {
    fontSize: "3rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  }

  const noticesPaperStyle = {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    marginTop: "2rem",
  }

  const keyframes = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
    `

  return (
    <>
      <style>{keyframes}</style>
      <div style={containerStyle}>
        <div style={floatingElementsStyle}>
          <div style={floatingCircle1Style}></div>
          <div style={floatingCircle2Style}></div>
        </div>

        <Container maxWidth="lg" style={gridContainerStyle}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} lg={4}>
              <div
                style={styledPaperStyle}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styledPaperHoverStyle)
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0px)"
                  e.target.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
              >
                <img src={Students || "/placeholder.svg"} alt="Students" style={imageStyle} />
                <div style={titleStyle}>Total Students</div>
                <div style={dataStyle}>
                  {typeof numberOfStudents === "number" ? (
                    <CountUp
                      key={numberOfStudents}
                      start={0}
                      end={numberOfStudents}
                      duration={2.5}
                    />
                  ) : (
                    0
                  )}

                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <div
                style={styledPaperStyle}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styledPaperHoverStyle)
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0px)"
                  e.target.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
              >
                <img src={Classes || "/placeholder.svg"} alt="Classes" style={imageStyle} />
                <div style={titleStyle}>Total Classes</div>
                <div style={dataStyle}>
                  {typeof numberOfClasses === "number" ? (
                    <CountUp
                      key={numberOfClasses}
                      start={0}
                      end={numberOfClasses}
                      duration={5}
                    />
                  ) : (
                    0
                  )}

                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <div
                style={styledPaperStyle}
                onMouseEnter={(e) => {
                  Object.assign(e.target.style, styledPaperHoverStyle)
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0px)"
                  e.target.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
              >
                <img src={Teachers || "/placeholder.svg"} alt="Teachers" style={imageStyle} />
                <div style={titleStyle}>Total Teachers</div>
                <div style={dataStyle}>
                  {typeof numberOfTeachers === "number" ? (
                    <CountUp
                      key={numberOfTeachers}
                      start={0}
                      end={numberOfTeachers}
                      duration={2.5}
                    />
                  ) : (
                    0
                  )}

                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={noticesPaperStyle}>
                <SeeNotice />
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  )
}

export default AdminHomePage
