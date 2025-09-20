"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteUser } from "../../../redux/userRelated/userHandle"
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle"

const ShowClasses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass)
  const { currentUser } = useSelector((state) => state.user)

  const adminID = currentUser._id

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"))
  }, [adminID, dispatch])

  if (error) {
    console.log(error)
  }

  const [showPopup, setShowPopup] = useState(false)
  const [message, setMessage] = useState("")
  const [showActionMenu, setShowActionMenu] = useState(null)

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID)
    console.log(address)
    dispatch(deleteUser(deleteID, address)).then(() => {
      dispatch(getAllSclasses(adminID, "Sclass"))
    })
  }

  const LoadingSpinner = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
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
        }}
      ></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )

  
  const ClassCard = ({ classData }) => (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "16px",
        transition: "all 0.3s ease",
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: "700",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {classData.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3
              style={{
                color: "#ffffff",
                fontSize: "20px",
                fontWeight: "600",
                margin: "0 0 4px 0",
              }}
            >
              {classData.name}
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "14px",
                margin: "0",
                fontWeight: "400",
              }}
            >
              Class ID: {classData.id.slice(-8)}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <button
            onClick={() => navigate("/Admin/classes/class/" + classData.id)}
            style={{
              background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
              border: "none",
              borderRadius: "10px",
              padding: "10px 20px",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(81, 207, 102, 0.4)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            View
          </button>

         

          <button
            onClick={() => deleteHandler(classData.id, "Sclass")}
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "10px",
              padding: "10px",
              color: "#ef4444",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3,6 5,6 21,6" />
              <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )

  const FloatingActionButton = ({ onClick, icon, label, color = "#ef4444" }) => (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
        border: "none",
        borderRadius: "50%",
        width: "56px",
        height: "56px",
        color: "white",
        cursor: "pointer",
        boxShadow: "0 4px 20px rgba(239, 68, 68, 0.3)",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)"
        e.currentTarget.style.boxShadow = "0 6px 25px rgba(239, 68, 68, 0.4)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)"
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(239, 68, 68, 0.3)"
      }}
      title={label}
    >
      {icon}
    </button>
  )

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating animated elements */}
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

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
      `}</style>

      {/* Overlay for action menu */}
      {showActionMenu && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setShowActionMenu(null)}
        />
      )}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "#ffffff",
              fontSize: "32px",
              fontWeight: "700",
              margin: "0 0 8px 0",
              background: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Classes Management
          </h1>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "16px",
              margin: 0,
            }}
          >
            Manage your school classes and their configurations
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : getresponse ? (
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
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                style={{ margin: "0 auto 16px", opacity: 0.6, color: "white" }}
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3
                style={{
                  color: "#ffffff",
                  fontSize: "20px",
                  fontWeight: "600",
                  margin: "0 0 8px 0",
                }}
              >
                No Classes Found
              </h3>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "14px",
                  margin: "0 0 24px 0",
                }}
              >
                Get started by creating your first class to organize students and subjects.
              </p>
              <button
                onClick={() => navigate("/Admin/addclass")}
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
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(81, 207, 102, 0.4)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                Create First Class
              </button>
            </div>
          </div>
        ) : (
          <div>
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
                <h2
                  style={{
                    color: "#ffffff",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 0 4px 0",
                  }}
                >
                  All Classes
                </h2>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "14px",
                    margin: 0,
                  }}
                >
                  {Array.isArray(sclassesList) ? sclassesList.length : 0} classes found
                </p>
              </div>
              <button
                onClick={() => navigate("/Admin/addclass")}
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
                  e.currentTarget.style.transform = "translateY(-1px)"
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(81, 207, 102, 0.4)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
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
                Add New Class
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gap: "16px",
              }}
            >
              {Array.isArray(sclassesList) &&
                sclassesList.length > 0 &&
                sclassesList.map((sclass) => (
                  <ClassCard
                    key={sclass._id}
                    classData={{
                      name: sclass.sclassName,
                      id: sclass._id,
                    }}
                  />
                ))}
            </div>

            {Array.isArray(sclassesList) && sclassesList.length > 0 && (
              <FloatingActionButton
                onClick={() => deleteHandler(adminID, "Sclasses")}
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                label="Delete All Classes"
                color="#ef4444"
              />
            )}
          </div>
        )}
      </div>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "16px",
            padding: "24px",
            zIndex: 2000,
            minWidth: "300px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#ffffff",
              fontSize: "16px",
              margin: "0 0 20px 0",
            }}
          >
            {message}
          </p>
          <button
            onClick={() => setShowPopup(false)}
            style={{
              background: "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

export default ShowClasses