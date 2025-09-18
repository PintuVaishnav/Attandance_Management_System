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

  const ActionMenu = ({ classId, onClose }) => (
    <div
      style={{
        position: "absolute",
        top: "100%",
        right: "0",
        background: "rgba(20, 20, 20, 0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        padding: "8px",
        minWidth: "200px",
        zIndex: 1000,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        onClick={() => {
          navigate("/Admin/addsubject/" + classId)
          onClose()
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: "500",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(103, 126, 234, 0.1)"
          e.target.style.transform = "translateX(4px)"
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent"
          e.target.style.transform = "translateX(0)"
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
        Add Subjects
      </div>
      <div
        onClick={() => {
          navigate("/Admin/class/addstudents/" + classId)
          onClose()
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: "500",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(103, 126, 234, 0.1)"
          e.target.style.transform = "translateX(4px)"
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent"
          e.target.style.transform = "translateX(0)"
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
        Add Students
      </div>
    </div>
  )

  const ClassCard = ({ classData }) => (
    <div
      style={{
        background: "rgba(20, 20, 20, 0.8)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        padding: "24px",
        transition: "all 0.3s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)"
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(103, 126, 234, 0.2)"
        e.currentTarget.style.border = "1px solid rgba(103, 126, 234, 0.3)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "none"
        e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.1)"
      }}
    >
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
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: "700",
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
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
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
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
              e.target.style.transform = "translateY(-2px)"
              e.target.style.boxShadow = "0 8px 25px rgba(103, 126, 234, 0.4)"
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)"
              e.target.style.boxShadow = "none"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            View
          </button>

          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowActionMenu(showActionMenu === classData.id ? null : classData.id)}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "10px",
                padding: "10px 16px",
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
                e.target.style.background = "rgba(255, 255, 255, 0.15)"
                e.target.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)"
                e.target.style.transform = "translateY(0)"
              }}
            >
              Add
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </button>

            {showActionMenu === classData.id && (
              <ActionMenu classId={classData.id} onClose={() => setShowActionMenu(null)} />
            )}
          </div>

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
              e.target.style.background = "rgba(239, 68, 68, 0.2)"
              e.target.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(239, 68, 68, 0.1)"
              e.target.style.transform = "translateY(0)"
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

  const FloatingElements = () => (
    <>
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(103, 126, 234, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          zIndex: 0,
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "60%",
          right: "10%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(30px)",
          zIndex: 0,
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}
      </style>
    </>
  )

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        position: "relative",
        padding: "40px",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <FloatingElements />

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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "40px",
          }}
        >
          <div>
            <h1
              style={{
                color: "#ffffff",
                fontSize: "32px",
                fontWeight: "700",
                margin: "0 0 8px 0",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Classes Management
            </h1>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "16px",
                margin: "0",
                fontWeight: "400",
              }}
            >
              Manage your school classes and their configurations
            </p>
          </div>

          <button
            onClick={() => navigate("/Admin/addclass")}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "12px",
              padding: "14px 24px",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 4px 15px rgba(103, 126, 234, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px)"
              e.target.style.boxShadow = "0 8px 25px rgba(103, 126, 234, 0.4)"
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)"
              e.target.style.boxShadow = "0 4px 15px rgba(103, 126, 234, 0.3)"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add New Class
          </button>
        </div>

        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                border: "3px solid rgba(103, 126, 234, 0.3)",
                borderTop: "3px solid #667eea",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Loading classes...
            </p>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        ) : getresponse ? (
          <div
            style={{
              background: "rgba(20, 20, 20, 0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "60px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px auto",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <h2
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "600",
                margin: "0 0 12px 0",
              }}
            >
              No Classes Found
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "16px",
                margin: "0 0 32px 0",
                lineHeight: "1.5",
              }}
            >
              Get started by creating your first class to organize students and subjects.
            </p>
            <button
              onClick={() => navigate("/Admin/addclass")}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "12px",
                padding: "14px 28px",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 8px 25px rgba(103, 126, 234, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "none"
              }}
            >
              Create First Class
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
              gap: "24px",
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
        )}

        {Array.isArray(sclassesList) && sclassesList.length > 0 && (
          <button
            onClick={() => deleteHandler(adminID, "Sclasses")}
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              width: "60px",
              height: "60px",
              background: "rgba(239, 68, 68, 0.9)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "50%",
              color: "#ffffff",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1) translateY(-2px)"
              e.target.style.boxShadow = "0 12px 30px rgba(239, 68, 68, 0.4)"
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1) translateY(0)"
              e.target.style.boxShadow = "0 8px 25px rgba(239, 68, 68, 0.3)"
            }}
            title="Delete All Classes"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3,6 5,6 21,6" />
              <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
            </svg>
          </button>
        )}
      </div>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(20, 20, 20, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
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
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
