"use client"

import { useSelector } from "react-redux"

const AdminProfile = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
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
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "200px",
          height: "200px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "float 6s ease-in-out infinite",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "60%",
          right: "15%",
          width: "150px",
          height: "150px",
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "50%",
          filter: "blur(30px)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "20%",
          width: "100px",
          height: "100px",
          background: "rgba(255, 255, 255, 0.06)",
          borderRadius: "50%",
          filter: "blur(20px)",
          animation: "float 10s ease-in-out infinite",
        }}
      ></div>

      <style>
        {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(180deg); }
                    }
                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes shimmer {
                        0% { background-position: -200px 0; }
                        100% { background-position: 200px 0; }
                    }
                `}
      </style>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            animation: "slideUp 0.8s ease-out",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "0.5rem",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Admin Profile
          </h1>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "1.1rem",
              fontWeight: "400",
            }}
          >
            Manage your administrative account
          </p>
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "3rem",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            animation: "slideUp 0.8s ease-out 0.2s both",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "-200px",
              width: "200px",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              animation: "shimmer 3s infinite",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "2.5rem",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "white",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                {currentUser?.name?.charAt(0)?.toUpperCase() || "A"}
              </span>
              <div
                style={{
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
                  animation: "shimmer 4s infinite",
                }}
              ></div>
            </div>
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "0.5rem",
                textAlign: "center",
              }}
            >
              {currentUser?.name || "Admin User"}
            </h2>
            <span
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                borderRadius: "20px",
                fontSize: "0.9rem",
                fontWeight: "500",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              }}
            >
              Administrator
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            {/* Email Card */}
            <div
              style={{
                background: "linear-gradient(45deg, #f8fafc, #e2e8f0)",
                padding: "1.5rem",
                borderRadius: "16px",
                border: "1px solid rgba(102, 126, 234, 0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 10px 25px rgba(102, 126, 234, 0.15)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "none"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "1rem",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                  }}
                >
                  <span style={{ color: "white", fontSize: "1.2rem" }}>✉</span>
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#374151",
                    margin: 0,
                  }}
                >
                  Email Address
                </h3>
              </div>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#64748b",
                  margin: 0,
                  fontWeight: "500",
                }}
              >
                {currentUser?.email || "admin@school.edu"}
              </p>
            </div>

            {/* School Card */}
            <div
              style={{
                background: "linear-gradient(45deg, #f8fafc, #e2e8f0)",
                padding: "1.5rem",
                borderRadius: "16px",
                border: "1px solid rgba(102, 126, 234, 0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 10px 25px rgba(102, 126, 234, 0.15)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "none"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "1rem",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                  }}
                >
                  <span style={{ color: "white", fontSize: "1.2rem" }}>🏫</span>
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#374151",
                    margin: 0,
                  }}
                >
                  Institution
                </h3>
              </div>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#64748b",
                  margin: 0,
                  fontWeight: "500",
                }}
              >
                {currentUser?.schoolName || "Educational Institution"}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <button
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                padding: "0.75rem 2rem",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)"
              }}
            >
              Edit Profile
            </button>
            <button
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                color: "#64748b",
                border: "1px solid rgba(102, 126, 234, 0.2)",
                padding: "0.75rem 2rem",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 1)"
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)"
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.8)"
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "none"
              }}
            >
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
