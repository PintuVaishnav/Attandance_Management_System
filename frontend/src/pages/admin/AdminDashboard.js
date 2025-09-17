"use client"

import { useState } from "react"
import { CssBaseline, Box, Toolbar, List, Typography, Divider, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import { Navigate, Route, Routes } from "react-router-dom"
import { AppBar, Drawer } from "../../components/styles"
import Logout from "../Logout"
import SideBar from "./SideBar"
import AdminProfile from "./AdminProfile"
import AdminHomePage from "./AdminHomePage"

import AddStudent from "./studentRelated/AddStudent"
import SeeComplains from "./studentRelated/SeeComplains"
import ShowStudents from "./studentRelated/ShowStudents"
import StudentAttendance from "./studentRelated/StudentAttendance"
import StudentExamMarks from "./studentRelated/StudentExamMarks"
import ViewStudent from "./studentRelated/ViewStudent"

import AddNotice from "./noticeRelated/AddNotice"
import ShowNotices from "./noticeRelated/ShowNotices"

import ShowSubjects from "./subjectRelated/ShowSubjects"
import SubjectForm from "./subjectRelated/SubjectForm"
import ViewSubject from "./subjectRelated/ViewSubject"

import AddTeacher from "./teacherRelated/AddTeacher"
import ChooseClass from "./teacherRelated/ChooseClass"
import ChooseSubject from "./teacherRelated/ChooseSubject"
import ShowTeachers from "./teacherRelated/ShowTeachers"
import TeacherDetails from "./teacherRelated/TeacherDetails"

import AddClass from "./classRelated/AddClass"
import ClassDetails from "./classRelated/ClassDetails"
import ShowClasses from "./classRelated/ShowClasses"
import AccountMenu from "../../components/AccountMenu"

const AdminDashboard = () => {
  const [open, setOpen] = useState(false)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          open={open}
          position="absolute"
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(102, 126, 234, 0.2)",
            zIndex: 1201,
          }}
        >
          <Toolbar
            sx={{
              pr: "24px",
              minHeight: "70px !important",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                padding: "12px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.2)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                },
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                flexGrow: 1,
                fontSize: "1.5rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              Admin Dashboard
            </Typography>
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                padding: "8px",
              }}
            >
              <AccountMenu />
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            ...(open
              ? {
                  width: 280,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: 280,
                    boxSizing: "border-box",
                    background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
                    backdropFilter: "blur(20px)",
                    border: "none",
                    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "8px 0 32px rgba(102, 126, 234, 0.2)",
                    overflow: "hidden",
                  },
                }
              : {
                  width: 72,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: 72,
                    boxSizing: "border-box",
                    background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
                    backdropFilter: "blur(20px)",
                    border: "none",
                    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "8px 0 32px rgba(102, 126, 234, 0.2)",
                    overflow: "hidden",
                    "@media (max-width: 600px)": {
                      display: "none",
                    },
                  },
                }),
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
              minHeight: "70px !important",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <IconButton
              onClick={toggleDrawer}
              sx={{
                color: "white",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                padding: "12px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.2)",
                  transform: "rotate(180deg)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider
            sx={{
              borderColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          />
          <List
            component="nav"
            sx={{
              padding: "16px 8px",
              "& .MuiListItem-root": {
                borderRadius: "12px",
                margin: "4px 0",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                  transform: "translateX(4px)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                },
              },
            }}
          >
            <SideBar />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            background: "linear-gradient(45deg, #f8fafc, #e2e8f0)",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                                radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 40% 40%, rgba(102, 126, 234, 0.05) 0%, transparent 50%)
                            `,
              pointerEvents: "none",
            },
          }}
        >
          <Toolbar />
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              padding: "24px",
              minHeight: "calc(100vh - 70px)",
            }}
          >
            <Routes>
              <Route path="/" element={<AdminHomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/Admin/dashboard" element={<AdminHomePage />} />
              <Route path="/Admin/profile" element={<AdminProfile />} />
              <Route path="/Admin/complains" element={<SeeComplains />} />

              {/* Notice */}
              <Route path="/Admin/addnotice" element={<AddNotice />} />
              <Route path="/Admin/notices" element={<ShowNotices />} />

              {/* Subject */}
              <Route path="/Admin/subjects" element={<ShowSubjects />} />
              <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
              <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />

              <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
              <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />

              <Route
                path="/Admin/subject/student/attendance/:studentID/:subjectID"
                element={<StudentAttendance situation="Subject" />}
              />
              <Route
                path="/Admin/subject/student/marks/:studentID/:subjectID"
                element={<StudentExamMarks situation="Subject" />}
              />

              {/* Class */}
              <Route path="/Admin/addclass" element={<AddClass />} />
              <Route path="/Admin/classes" element={<ShowClasses />} />
              <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
              <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

              {/* Student */}
              <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
              <Route path="/Admin/students" element={<ShowStudents />} />
              <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
              <Route
                path="/Admin/students/student/attendance/:id"
                element={<StudentAttendance situation="Student" />}
              />
              <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

              {/* Teacher */}
              <Route path="/Admin/teachers" element={<ShowTeachers />} />
              <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
              <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
              <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
              <Route
                path="/Admin/teachers/choosesubject/:classID/:teacherID"
                element={<ChooseSubject situation="Teacher" />}
              />
              <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />

              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AdminDashboard
