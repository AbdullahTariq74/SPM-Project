import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function StatCard({ label, value, icon, delay }) {
  return (
    <div style={{
      background:"rgba(255,255,255,0.03)",
      border:"1px solid rgba(137,245,231,0.1)",
      borderRadius:14, padding:"24px 20px",
      animation:`fadeUp 0.6s ${delay}s both`,
    }}>
      <div style={{fontSize:28,marginBottom:10}}>{icon}</div>
      <p style={{fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(137,245,231,0.6)",marginBottom:6}}>{label}</p>
      <p style={{fontFamily:"'Manrope',sans-serif",fontWeight:800,fontSize:22,color:"#fff"}}>{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const roleColors = { freelancer:"#89f5e7", client:"#a9c7ff", admin:"#ffb86c" };
  const roleColor  = roleColors[user?.role] || "#89f5e7";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        @keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(20px,-30px) scale(1.05);}}
        @keyframes gridShift{0%{background-position:0 0;}100%{background-position:60px 60px;}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
        @keyframes scan{0%{top:-2px;}100%{top:100vh;}}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}
        .dash-root{min-height:100vh;background:#000d1f;font-family:'DM Sans',sans-serif;position:relative;overflow:hidden;}
        .grid-bg{position:fixed;inset:0;z-index:0;background-image:linear-gradient(rgba(137,245,231,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(137,245,231,0.03) 1px,transparent 1px);background-size:60px 60px;animation:gridShift 20s linear infinite;}
        .scan-line{position:fixed;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(137,245,231,0.3),transparent);animation:scan 8s linear infinite;z-index:1;pointer-events:none;}
        .orb{position:fixed;border-radius:50%;filter:blur(90px);animation:orbFloat 14s ease-in-out infinite;z-index:0;pointer-events:none;}
        .navbar{position:sticky;top:0;z-index:50;display:flex;justify-content:space-between;align-items:center;padding:0 40px;height:64px;background:rgba(0,13,31,0.85);backdrop-filter:blur(20px);border-bottom:1px solid rgba(137,245,231,0.08);}
        .nav-brand{font-family:'Manrope',sans-serif;font-weight:900;font-size:18px;color:#fff;letter-spacing:-0.02em;}
        .nav-brand span{color:#89f5e7;}
        .nav-actions{display:flex;align-items:center;gap:12px;}
        .btn-outline{padding:8px 18px;background:transparent;border:1px solid rgba(137,245,231,0.25);border-radius:8px;color:rgba(137,245,231,0.8);font-family:'Manrope',sans-serif;font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;transition:all 0.2s;text-decoration:none;display:inline-block;}
        .btn-outline:hover{border-color:rgba(137,245,231,0.6);color:#89f5e7;background:rgba(137,245,231,0.05);}
        .btn-danger{padding:8px 18px;background:rgba(186,26,26,0.15);border:1px solid rgba(186,26,26,0.35);border-radius:8px;color:#ff8a8a;font-family:'Manrope',sans-serif;font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;transition:all 0.2s;}
        .btn-danger:hover{background:rgba(186,26,26,0.25);border-color:rgba(186,26,26,0.6);}
        .content{position:relative;z-index:10;max-width:900px;margin:0 auto;padding:48px 24px;}
        .hero{background:rgba(0,23,54,0.7);border:1px solid rgba(137,245,231,0.1);border-radius:20px;padding:40px;margin-bottom:32px;backdrop-filter:blur(20px);animation:fadeUp 0.6s both;position:relative;overflow:hidden;}
        .hero::before{content:'';position:absolute;top:0;right:0;width:250px;height:100%;background:linear-gradient(90deg,transparent,rgba(137,245,231,0.03));pointer-events:none;}
        .hero-label{font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(137,245,231,0.5);margin-bottom:12px;}
        .hero-name{font-family:'Manrope',sans-serif;font-weight:900;font-size:36px;color:#fff;margin-bottom:8px;letter-spacing:-0.02em;}
        .hero-name span{color:#89f5e7;}
        .role-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:100px;border:1px solid;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:20px;}
        .hero-email{font-size:14px;color:rgba(255,255,255,0.4);display:flex;align-items:center;gap:8px;}
        .live-dot{width:7px;height:7px;border-radius:50%;background:#00c896;animation:pulse 2s infinite;}
        .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-bottom:32px;}
        .section-title{font-family:'Manrope',sans-serif;font-weight:800;font-size:14px;color:rgba(255,255,255,0.5);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:16px;}
        .info-card{background:rgba(0,23,54,0.6);border:1px solid rgba(137,245,231,0.08);border-radius:14px;padding:28px;animation:fadeUp 0.6s 0.4s both;}
        .info-row{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid rgba(137,245,231,0.06);}
        .info-row:last-child{border-bottom:none;padding-bottom:0;}
        .info-key{font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.35);}
        .info-val{font-size:14px;color:#fff;font-weight:500;}
      `}</style>

      <div className="dash-root">
        <div className="grid-bg" />
        <div className="scan-line" />
        <div className="orb" style={{ width:450, height:450, top:"-10%",  left:"-5%",   background:"rgba(64,95,145,0.3)",    animationDelay:"0s" }} />
        <div className="orb" style={{ width:350, height:350, bottom:"0%", right:"-5%",  background:"rgba(137,245,231,0.08)", animationDelay:"6s" }} />

        {/* navbar */}
        <nav className="navbar">
          <div className="nav-brand">Nexus <span>Pro</span></div>
          <div className="nav-actions">
            <Link to="/change-password" className="btn-outline">Change Password</Link>
            <button className="btn-danger" onClick={handleLogout}>Sign Out</button>
          </div>
        </nav>

        <div className="content">
          {/* hero */}
          <div className="hero">
            <p className="hero-label">Welcome back</p>
            <h1 className="hero-name">
              {user?.id ? `User #${user.id}` : "Loading..."}<br />
              <span style={{fontSize:28}}>Dashboard</span>
            </h1>
            <div className="role-badge" style={{ color: roleColor, borderColor: `${roleColor}40`, background: `${roleColor}10` }}>
              <span style={{width:6,height:6,borderRadius:"50%",background:roleColor,display:"inline-block"}} />
              {user?.role || "—"}
            </div>
            <div className="hero-email">
              <div className="live-dot" />
              <span>{user?.email || "—"}</span>
            </div>
          </div>

          {/* stats */}
          <p className="section-title">Account Overview</p>
          <div className="stats-grid">
            <StatCard label="User ID"     value={`#${user?.id || "—"}`} icon="🪪" delay={0.1} />
            <StatCard label="Role"        value={user?.role || "—"}      icon="🎭" delay={0.15} />
            <StatCard label="Status"      value="Active"                 icon="✅" delay={0.2} />
            <StatCard label="Session"     value="Authenticated"          icon="🔐" delay={0.25} />
          </div>

          {/* info */}
          <p className="section-title">Token Payload</p>
          <div className="info-card">
            <div className="info-row">
              <span className="info-key">User ID</span>
              <span className="info-val">{user?.id}</span>
            </div>
            <div className="info-row">
              <span className="info-key">Role</span>
              <span className="info-val" style={{color:roleColor}}>{user?.role}</span>
            </div>
            <div className="info-row">
              <span className="info-key">Email</span>
              <span className="info-val">{user?.email}</span>
            </div>
            <div className="info-row">
              <span className="info-key">Auth Method</span>
              <span className="info-val">JWT Bearer Token</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}