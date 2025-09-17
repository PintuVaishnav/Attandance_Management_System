"use client"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { authLogout } from "../redux/userRelated/userSlice"

const Logout = () => {
  const currentUser = useSelector((state) => state.user.currentUser)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(authLogout())
    navigate("/")
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.9) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(229, 231, 235, 0.3)",
        borderRadius: "24px",
        padding: "40px 32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        maxWidth: "420px",
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
        animation: "fadeInScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "100px",
          height: "100px",
          background: "linear-gradient(135deg, rgba(132, 204, 22, 0.1) 0%, rgba(21, 128, 61, 0.05) 100%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "float 6s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-30px",
          left: "-30px",
          width: "80px",
          height: "80px",
          background: "linear-gradient(135deg, rgba(21, 128, 61, 0.1) 0%, rgba(132, 204, 22, 0.05) 100%)",
          borderRadius: "50%",
          filter: "blur(30px)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "24px",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            background: "linear-gradient(135deg, #15803d 0%, #84cc16 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            boxShadow: "0 8px 16px rgba(21, 128, 61, 0.3)",
          }}
        >
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#374151",
            margin: "0",
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "-0.025em",
          }}
        >
          {currentUser.name}
        </h1>
      </div>

      <p
        style={{
          marginBottom: "32px",
          fontSize: "16px",
          textAlign: "center",
          color: "#6b7280",
          fontFamily: "system-ui, -apple-system, sans-serif",
          lineHeight: "1.6",
          fontWeight: "500",
          maxWidth: "280px",
        }}
      >
        Are you sure you want to log out of your account?
      </p>

      <div
        style={{
          display: "flex",
          gap: "16px",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            padding: "14px 28px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            color: "#ffffff",
            background: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 4px 12px rgba(220, 38, 38, 0.4)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)"
            e.target.style.boxShadow = "0 8px 20px rgba(220, 38, 38, 0.5)"
            e.target.style.background = "linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)"
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)"
            e.target.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.4)"
            e.target.style.background = "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)"
          }}
          onMouseDown={(e) => {
            e.target.style.transform = "translateY(0) scale(0.98)"
          }}
          onMouseUp={(e) => {
            e.target.style.transform = "translateY(-2px) scale(1)"
          }}
        >
          Log Out
        </button>

        <button
          onClick={handleCancel}
          style={{
            padding: "14px 28px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            color: "#374151",
            background: "rgba(240, 253, 244, 0.8)",
            border: "2px solid rgba(21, 128, 61, 0.2)",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(21, 128, 61, 0.1)"
            e.target.style.borderColor = "rgba(21, 128, 61, 0.3)"
            e.target.style.transform = "translateY(-1px)"
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(240, 253, 244, 0.8)"
            e.target.style.borderColor = "rgba(21, 128, 61, 0.2)"
            e.target.style.transform = "translateY(0)"
          }}
          onMouseDown={(e) => {
            e.target.style.transform = "translateY(0) scale(0.98)"
          }}
          onMouseUp={(e) => {
            e.target.style.transform = "translateY(-1px) scale(1)"
          }}
        >
          Cancel
        </button>
      </div>

      <style jsx>{`
                @keyframes fadeInScale {
                    0% {
                        opacity: 0;
                        transform: scale(0.9) translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                    }
                }
            `}</style>
    </div>
  )
}

export default Logout
