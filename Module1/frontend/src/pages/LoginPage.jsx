import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Orb({ style }) {
  return <div style={{ position:"fixed", borderRadius:"50%", filter:"blur(80px)", animation:"orbFloat 12s ease-in-out infinite", zIndex:0, pointerEvents:"none", ...style }} />;
}

export default function LoginPage() {
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);

  useEffect(() => { if (token) navigate("/dashboard"); }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("All fields are required"); return; }
    setLoading(true);
    try {
      await login(email, password);
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 900);
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Try again.");
    } finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        @keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(30px,-40px) scale(1.1);}66%{transform:translate(-20px,20px) scale(0.95);}}
        @keyframes gridShift{0%{background-position:0 0;}100%{background-position:60px 60px;}}
        @keyframes cardIn{from{opacity:0;transform:translateY(32px) scale(0.97);}to{opacity:1;transform:translateY(0) scale(1);}}
        @keyframes logoPulse{0%,100%{box-shadow:0 0 24px rgba(137,245,231,0.3);}50%{box-shadow:0 0 48px rgba(137,245,231,0.6);}}
        @keyframes shimmer{100%{transform:translateX(100%);}}
        @keyframes scan{0%{top:-2px;}100%{top:100vh;}}
        @keyframes shake{0%,100%{transform:translateX(0);}20%{transform:translateX(-6px);}40%{transform:translateX(6px);}60%{transform:translateX(-4px);}80%{transform:translateX(4px);}}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
        .login-root{min-height:100vh;background:#000d1f;display:flex;align-items:center;justify-content:center;font-family:'DM Sans',sans-serif;overflow:hidden;position:relative;}
        .grid-bg{position:fixed;inset:0;z-index:0;background-image:linear-gradient(rgba(137,245,231,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(137,245,231,0.04) 1px,transparent 1px);background-size:60px 60px;animation:gridShift 20s linear infinite;}
        .scan-line{position:fixed;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(137,245,231,0.4),transparent);animation:scan 7s linear infinite;z-index:1;pointer-events:none;}
        .card{position:relative;z-index:10;background:rgba(0,23,54,0.75);border:1px solid rgba(137,245,231,0.12);border-radius:20px;padding:48px 44px;width:100%;max-width:440px;backdrop-filter:blur(24px);box-shadow:0 0 0 1px rgba(137,245,231,0.04),0 32px 64px rgba(0,0,0,0.55),inset 0 1px 0 rgba(137,245,231,0.1);animation:cardIn 0.7s cubic-bezier(0.16,1,0.3,1) both;}
        .corner{position:absolute;width:22px;height:22px;pointer-events:none;}
        .corner-tl{top:-1px;left:-1px;border-top:2px solid rgba(137,245,231,0.7);border-left:2px solid rgba(137,245,231,0.7);border-radius:4px 0 0 0;}
        .corner-tr{top:-1px;right:-1px;border-top:2px solid rgba(137,245,231,0.7);border-right:2px solid rgba(137,245,231,0.7);border-radius:0 4px 0 0;}
        .corner-bl{bottom:-1px;left:-1px;border-bottom:2px solid rgba(137,245,231,0.7);border-left:2px solid rgba(137,245,231,0.7);border-radius:0 0 0 4px;}
        .corner-br{bottom:-1px;right:-1px;border-bottom:2px solid rgba(137,245,231,0.7);border-right:2px solid rgba(137,245,231,0.7);border-radius:0 0 4px 0;}
        .logo-mark{width:50px;height:50px;background:linear-gradient(135deg,#89f5e7,#405f91);border-radius:14px;display:flex;align-items:center;justify-content:center;font-family:'Manrope',sans-serif;font-weight:900;font-size:22px;color:#000d1f;margin-bottom:24px;animation:logoPulse 3s ease-in-out infinite;}
        .title{font-family:'Manrope',sans-serif;font-weight:800;font-size:27px;color:#fff;line-height:1.2;margin-bottom:6px;animation:fadeUp 0.6s 0.15s both;}
        .subtitle{font-size:13px;color:rgba(255,255,255,0.4);margin-bottom:36px;animation:fadeUp 0.6s 0.25s both;}
        .field-label{display:block;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(137,245,231,0.65);margin-bottom:8px;}
        .input-wrap{position:relative;margin-bottom:20px;}
        .input-wrap input{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(137,245,231,0.13);border-radius:10px;padding:13px 16px;color:#fff;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.25s,box-shadow 0.25s,background 0.25s;}
        .input-wrap input:focus{border-color:rgba(137,245,231,0.5);background:rgba(137,245,231,0.05);box-shadow:0 0 0 3px rgba(137,245,231,0.08);}
        .input-wrap input::placeholder{color:rgba(255,255,255,0.18);}
        .pw-toggle{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(137,245,231,0.5);font-size:16px;transition:color 0.2s;display:flex;align-items:center;}
        .pw-toggle:hover{color:#89f5e7;}
        .error-box{background:rgba(186,26,26,0.15);border:1px solid rgba(186,26,26,0.4);border-radius:10px;padding:12px 16px;color:#ff8a8a;font-size:13px;margin-bottom:18px;animation:shake 0.4s cubic-bezier(0.36,0.07,0.19,0.97);}
        .btn-submit{width:100%;padding:14px;background:linear-gradient(135deg,#89f5e7 0%,#405f91 100%);border:none;border-radius:10px;color:#000d1f;font-family:'Manrope',sans-serif;font-weight:800;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;position:relative;overflow:hidden;transition:opacity 0.2s,transform 0.15s,box-shadow 0.2s;}
        .btn-submit:hover:not(:disabled){opacity:0.9;transform:translateY(-1px);box-shadow:0 8px 24px rgba(137,245,231,0.25);}
        .btn-submit:active:not(:disabled){transform:translateY(0) scale(0.98);}
        .btn-submit:disabled{opacity:0.6;cursor:not-allowed;}
        .btn-submit .shimmer{position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);transform:translateX(-100%);animation:shimmer 2.2s infinite;}
        .btn-submit.success{background:linear-gradient(135deg,#00c896,#007a5e);}
        .footer-text{text-align:center;margin-top:28px;font-size:13px;color:rgba(255,255,255,0.35);}
        .footer-text a{color:#89f5e7;font-weight:600;text-decoration:none;transition:opacity 0.2s;}
        .footer-text a:hover{opacity:0.7;}
        .divider{display:flex;align-items:center;gap:12px;margin:28px 0;}
        .divider::before,.divider::after{content:'';flex:1;height:1px;background:rgba(137,245,231,0.08);}
        .divider span{font-size:11px;color:rgba(255,255,255,0.2);white-space:nowrap;}
        .spinner{width:16px;height:16px;border:2px solid rgba(0,13,31,0.4);border-top-color:#000d1f;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block;}
      `}</style>

      <div className="login-root">
        <div className="grid-bg" />
        <div className="scan-line" />
        <Orb style={{ width:500, height:500, top:"-10%",  left:"-10%",  background:"rgba(64,95,145,0.35)",    animationDelay:"0s"  }} />
        <Orb style={{ width:400, height:400, bottom:"-5%", right:"-5%",  background:"rgba(137,245,231,0.12)", animationDelay:"4s"  }} />
        <Orb style={{ width:300, height:300, top:"40%",   left:"60%",   background:"rgba(0,43,91,0.45)",      animationDelay:"8s"  }} />

        <div className="card">
          <div className="corner corner-tl" /><div className="corner corner-tr" />
          <div className="corner corner-bl" /><div className="corner corner-br" />

          <div className="logo-mark">N</div>
          <h1 className="title">Welcome back</h1>
          <p className="subtitle">Sign in to your Nexus Professional account</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="input-wrap">
              <label className="field-label">Email address</label>
              <input type="email" placeholder="you@domain.com" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email" />
            </div>
            <div className="input-wrap">
              <label className="field-label">Password</label>
              <input type={showPw?"text":"password"} placeholder="••••••••••" value={password} onChange={e=>setPassword(e.target.value)} style={{paddingRight:44}} autoComplete="current-password" />
              <button type="button" className="pw-toggle" onClick={()=>setShowPw(p=>!p)}>{showPw?"🙈":"👁"}</button>
            </div>
            {error && <div className="error-box">⚠ {error}</div>}
            <button type="submit" className={`btn-submit${success?" success":""}`} disabled={loading}>
              <span className="shimmer" />
              {loading ? <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}><span className="spinner"/>Authenticating...</span> : success ? "✓ Redirecting..." : "Sign In"}
            </button>
          </form>

          <div className="divider"><span>New to Nexus?</span></div>
          <p className="footer-text">Don't have an account? <Link to="/register">Create one now</Link></p>
        </div>
      </div>
    </>
  );
}