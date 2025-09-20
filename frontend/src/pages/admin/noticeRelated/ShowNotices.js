"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllNotices } from "../../../redux/noticeRelated/noticeHandle"
import { deleteUser } from "../../../redux/userRelated/userHandle"

const ShowNotices = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { noticesList, loading, error, response } = useSelector((state) => state.notice)
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getAllNotices(currentUser._id, "Notice"))
  }, [currentUser._id, dispatch])

  if (error) {
    console.log(error)
  }

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address)).then(() => {
      dispatch(getAllNotices(currentUser._id, "Notice"))
    })
  }

  const noticeRows =
    noticesList &&
    noticesList.length > 0 &&
    noticesList.map((notice) => {
      const date = new Date(notice.date)
      const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date"
      return {
        title: notice.title,
        details: notice.details,
        date: dateString,
        id: notice._id,
      }
    })

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
          // <CHANGE> Updated spinner colors to match white theme
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

  const NoticeCard = ({ notice, onDelete }) => (
    <div
      style={{
        // <CHANGE> Updated card background for consistency with glassmorphic theme
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "16px",
        transition: "all 0.3s ease",
        cursor: "pointer",
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
      {/* <CHANGE> Updated gradient overlay to match purple theme */}
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

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1, marginRight: "16px" }}>
          <h3
            style={{
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: "600",
              margin: "0 0 8px 0",
              lineHeight: "1.4",
            }}
          >
            {notice.title}
          </h3>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "14px",
              margin: "0 0 12px 0",
              lineHeight: "1.5",
            }}
          >
            {notice.details}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.6, color: "white" }}>
              <path
                d="M8 2v3m8-3v3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "13px",
              }}
            >
              {notice.date}
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(notice.id, "Notice")
          }}
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
            padding: "8px",
            color: "#ef4444",
            cursor: "pointer",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.5)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)"
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
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
        // <CHANGE> Updated background to match purple gradient from previous components
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "24px",
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

      <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-20px) rotate(120deg); }
                    66% { transform: translateY(-10px) rotate(240deg); }
                }
            `}</style>

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
            Notice Management
          </h1>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "16px",
              margin: 0,
            }}
          >
            Manage and organize all school notices
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {response ? (
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
                    // <CHANGE> Updated empty state background for consistency
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
                    <path
                      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="14,2 14,8 20,8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="16"
                      y1="13"
                      x2="8"
                      y2="13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="16"
                      y1="17"
                      x2="8"
                      y2="17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="10,9 9,9 8,9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3
                    style={{
                      color: "#ffffff",
                      fontSize: "20px",
                      fontWeight: "600",
                      margin: "0 0 8px 0",
                    }}
                  >
                    No Notices Found
                  </h3>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "14px",
                      margin: "0 0 24px 0",
                    }}
                  >
                    Get started by creating your first notice
                  </p>
                  <button
                    onClick={() => navigate("/Admin/addnotice")}
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
                    Add Notice
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
                    // <CHANGE> Updated header background for consistency
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
                      All Notices
                    </h2>
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "14px",
                        margin: 0,
                      }}
                    >
                      {Array.isArray(noticesList) ? noticesList.length : 0} notices found
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/Admin/addnotice")}
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
                    Add Notice
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: "16px",
                  }}
                >
                  {Array.isArray(noticesList) &&
                    noticesList.length > 0 &&
                    noticeRows.map((notice) => <NoticeCard key={notice.id} notice={notice} onDelete={deleteHandler} />)}
                </div>

                {Array.isArray(noticesList) && noticesList.length > 0 && (
                  <FloatingActionButton
                    onClick={() => deleteHandler(currentUser._id, "Notices")}
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
                    label="Delete All Notices"
                    color="#ef4444"
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ShowNotices