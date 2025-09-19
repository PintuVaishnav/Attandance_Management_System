"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllComplains } from "../../../redux/complainRelated/complainHandle"

const SeeComplains = () => {
  const dispatch = useDispatch()
  const { complainsList, loading, error, response } = useSelector((state) => state.complain)
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"))
  }, [currentUser._id, dispatch])

  if (error) {
    console.log(error)
  }

  const complainRows =
    complainsList &&
    complainsList.length > 0 &&
    complainsList.map((complain) => {
      const date = new Date(complain.date)
      const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date"
      return {
        user: complain.user.name,
        complaint: complain.complaint,
        date: dateString,
        id: complain._id,
      }
    })

  const floatingAnimation = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-10px) rotate(1deg); }
      66% { transform: translateY(5px) rotate(-1deg); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
    padding: "2rem",
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    position: "relative",
    overflow: "hidden",
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

  const headerStyle = {
    position: "relative",
    zIndex: 10,
    marginBottom: "2rem",
    textAlign: "center",
  }

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "0.5rem",
    textShadow: "0 0 30px rgba(102, 126, 234, 0.3)",
  }

  const subtitleStyle = {
    color: "#94a3b8",
    fontSize: "1.1rem",
    fontWeight: "400",
  }

  const contentStyle = {
    position: "relative",
    zIndex: 10,
    maxWidth: "1200px",
    margin: "0 auto",
  }

  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "400px",
    color: "#667eea",
    fontSize: "1.2rem",
    fontWeight: "500",
  }

  const emptyStateStyle = {
    textAlign: "center",
    padding: "4rem 2rem",
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(148, 163, 184, 0.1)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    animation: "slideIn 0.6s ease-out",
  }

  const emptyIconStyle = {
    fontSize: "4rem",
    marginBottom: "1rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }

  const emptyTextStyle = {
    color: "#e2e8f0",
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
  }

  const emptySubtextStyle = {
    color: "#94a3b8",
    fontSize: "1rem",
  }

  const complaintsGridStyle = {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
  }

  const complaintCardStyle = {
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(20px)",
    borderRadius: "16px",
    border: "1px solid rgba(148, 163, 184, 0.1)",
    padding: "1.5rem",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
    animation: "slideIn 0.6s ease-out",
    cursor: "pointer",
  }

  const complaintCardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 20px 40px -10px rgba(102, 126, 234, 0.3)",
    borderColor: "rgba(102, 126, 234, 0.3)",
  }

  const complaintHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1rem",
  }

  const userInfoStyle = {
    flex: 1,
  }

  const userNameStyle = {
    color: "#e2e8f0",
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "0.25rem",
  }

  const dateStyle = {
    color: "#94a3b8",
    fontSize: "0.875rem",
    fontWeight: "400",
  }

  const checkboxContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
  }

  const customCheckboxStyle = {
    width: "20px",
    height: "20px",
    borderRadius: "4px",
    border: "2px solid #475569",
    background: "transparent",
    cursor: "pointer",
    transition: "all 0.2s ease",
    position: "relative",
  }

  const complaintTextStyle = {
    color: "#cbd5e1",
    fontSize: "1rem",
    lineHeight: "1.6",
    marginTop: "1rem",
    padding: "1rem",
    background: "rgba(30, 41, 59, 0.5)",
    borderRadius: "8px",
    border: "1px solid rgba(148, 163, 184, 0.1)",
  }

  const statsStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
  }

  const statCardStyle = {
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(20px)",
    borderRadius: "12px",
    border: "1px solid rgba(148, 163, 184, 0.1)",
    padding: "1.5rem 2rem",
    textAlign: "center",
    minWidth: "150px",
  }

  const statNumberStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "0.5rem",
  }

  const statLabelStyle = {
    color: "#94a3b8",
    fontSize: "0.875rem",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  }

  return (
    <>
      <style>{floatingAnimation}</style>
      <div style={containerStyle}>
        <div style={floatingElementsStyle}>
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: "100px",
              height: "100px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              borderRadius: "50%",
              opacity: "0.1",
              animation: "float 6s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "60%",
              right: "15%",
              width: "150px",
              height: "150px",
              background: "linear-gradient(135deg, #764ba2, #667eea)",
              borderRadius: "30%",
              opacity: "0.1",
              animation: "float 8s ease-in-out infinite reverse",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              left: "20%",
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              borderRadius: "40%",
              opacity: "0.1",
              animation: "float 7s ease-in-out infinite",
            }}
          />
        </div>

        <div style={headerStyle}>
          <h1 style={titleStyle}>📋 Complaints Management</h1>
          <p style={subtitleStyle}>Review and manage student complaints</p>
        </div>

        <div style={contentStyle}>
          {loading ? (
            <div style={loadingStyle}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "3px solid rgba(102, 126, 234, 0.3)",
                  borderTop: "3px solid #667eea",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginRight: "1rem",
                }}
              />
              Loading complaints...
            </div>
          ) : (
            <>
              {response ? (
                <div style={emptyStateStyle}>
                  <div style={emptyIconStyle}>🎉</div>
                  <div style={emptyTextStyle}>No Complaints Right Now</div>
                  <div style={emptySubtextStyle}>All students are happy! Check back later.</div>
                </div>
              ) : (
                <>
                  {Array.isArray(complainsList) && complainsList.length > 0 && (
                    <div style={statsStyle}>
                      <div style={statCardStyle}>
                        <div style={statNumberStyle}>{complainsList.length}</div>
                        <div style={statLabelStyle}>Total Complaints</div>
                      </div>
                      <div style={statCardStyle}>
                        <div style={statNumberStyle}>
                          {
                            complainsList.filter((c) => new Date(c.date).toDateString() === new Date().toDateString())
                              .length
                          }
                        </div>
                        <div style={statLabelStyle}>Today</div>
                      </div>
                    </div>
                  )}

                  {Array.isArray(complainsList) && complainsList.length > 0 && (
                    <div style={complaintsGridStyle}>
                      {complainRows.map((complaint, index) => (
                        <div
                          key={complaint.id}
                          style={{
                            ...complaintCardStyle,
                            animationDelay: `${index * 0.1}s`,
                          }}
                          onMouseEnter={(e) => {
                            Object.assign(e.target.style, complaintCardHoverStyle)
                          }}
                          onMouseLeave={(e) => {
                            Object.assign(e.target.style, complaintCardStyle)
                          }}
                        >
                          <div style={complaintHeaderStyle}>
                            <div style={userInfoStyle}>
                              <div style={userNameStyle}>👤 {complaint.user}</div>
                              <div style={dateStyle}>📅 {complaint.date}</div>
                            </div>
                            <div style={checkboxContainerStyle}>
                              <input
                                type="checkbox"
                                style={customCheckboxStyle}
                                onMouseEnter={(e) => {
                                  e.target.style.borderColor = "#667eea"
                                  e.target.style.boxShadow = "0 0 10px rgba(102, 126, 234, 0.3)"
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.borderColor = "#475569"
                                  e.target.style.boxShadow = "none"
                                }}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    e.target.style.background = "linear-gradient(135deg, #667eea, #764ba2)"
                                    e.target.style.borderColor = "#667eea"
                                  } else {
                                    e.target.style.background = "transparent"
                                    e.target.style.borderColor = "#475569"
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <div style={complaintTextStyle}>💬 {complaint.complaint}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  )
}

export default SeeComplains
