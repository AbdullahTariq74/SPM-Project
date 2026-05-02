import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const COUNTRIES = ["Pakistan","United States","United Kingdom","Canada","Australia","Germany","UAE","Saudi Arabia","India","Other"];

function Orb({ style }) {
  return <div style={{ position:"fixed", borderRadius:"50%", filter:"blur(90px)", animation:"orbFloat 14s ease-in-out infinite", zIndex:0, pointerEvents:"none", ...style }} />;
}

export default function RegisterPage() {
  const { register, token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ first_name:"", last_name:"", email:"", password:"", role:"freelancer", phone_number:"", country:"" });
  const [showPw,  setShowPw]  = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step,    setStep]    = useState(1);

  useEffect(() => { if (token) navigate("/dashboard"); }, [token]);

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleStep1 = (e) => {
    e.preventDefault();
    setError("");
    if (!form.first_name || !form.last_name) { setError("First and last name are required"); return; }
    if (!form.email) { setError("Email is required"); return; }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) { setError("Invalid email format"); return; }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.password || form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      await register(form);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Try again.");
    } finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        @keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(-30px,40px) scale(1.08);}66%{transform:translate(20px,-20px) scale(0.94);}}
        @keyframes gridShift{0%{background-position:0 0;}100%{background-position:60px 60px;}}
        @keyframes cardIn{from{opacity:0;transform:translateY(28px) scale(0.97);}to{opacity:1;transform:translateY(0) scale(1);}}
        @keyframes logoPulse{0%,100%{box-shadow:0 0 24px rgba(137,245,231,0.3);}50%{box-shadow:0 0 48px rgba(137,245,231,0.6);}}
        @keyframes shimmer{100%{transform:translateX(100%);}}
        @keyframes scan{0%{top:-2px;}100%{top:100vh;}}
        @keyframes shake{0%,100%{transform:translateX(0);}20%{transform:translateX(-6px);}40%{transform:translateX(6px);}60%{transform:translateX(-4px);}80%{transform:translateX(4px);}}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes slideIn{from{opacity:0;transform:translateX(30px);}to{opacity:1;transform:translateX(0);}}
        @keyframes successPop{0%{transform:scale(0.8);opacity:0;}60%{transform:scale(1.08);}100%{transform:scale(1);opacity:1;}}
        .reg-root{min-height:100vh;background:#000d1f;display:flex;align-items:center;justify-content:center;font-family:'DM Sans',sans-serif;overflow:hidden;position:relative;padding:24px 16px;}
        .grid-bg{position:fixed;inset:0;z-index:0;background-image:linear-gradient(rgba(137,245,231,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(137,245,231,0.04) 1px,transparent 1px);background-size:60px 60px;animation:gridShift 20s linear infinite;}
        .scan-line{position:fixed;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(137,245,231,0.4),transparent);animation:scan 7s linear infinite;z-index:1;pointer-events:none;}
        .card{position:relative;z-index:10;background:rgba(0,23,54,0.78);border:1px solid rgba(137,245,231,0.12);border-radius:20px;padding:44px 44px;width:100%;max-width:480px;backdrop-filter:blur(24px);box-shadow:0 0 0 1px rgba(137,245,231,0.04),0 32px 64px rgba(0,0,0,0.55),inset 0 1px 0 rgba(137,245,231,0.1);animation:cardIn 0.7s cubic-bezier(0.16,1,0.3,1) both;}
        .corner{position:absolute;width:22px;height:22px;pointer-events:none;}
        .corner-tl{top:-1px;left:-1px;border-top:2px solid rgba(137,245,231,0.7);border-left:2px solid rgba(137,245,231,0.7);border-radius:4px 0 0 0;}
        .corner-tr{top:-1px;right:-1px;border-top:2px solid rgba(137,245,231,0.7);border-right:2px solid rgba(137,245,231,0.7);border-radius:0 4px 0 0;}
        .corner-bl{bottom:-1px;left:-1px;border-bottom:2px solid rgba(137,245,231,0.7);border-left:2px solid rgba(137,245,231,0.7);border-radius:0 0 0 4px;}
        .corner-br{bottom:-1px;right:-1px;border-bottom:2px solid rgba(137,245,231,0.7);border-right:2px solid rgba(137,245,231,0.7);border-radius:0 0 4px 0;}
        .logo-mark{width:50px;height:50px;background:linear-gradient(135deg,#89f5e7,#405f91);border-radius:14px;display:flex;align-items:center;justify-content:center;font-family:'Manrope',sans-serif;font-weight:900;font-size:22px;color:#000d1f;margin-bottom:20px;animation:logoPulse 3s ease-in-out infinite;}
        .title{font-family:'Manrope',sans-serif;font-weight:800;font-size:26px;color:#fff;line-height:1.2;margin-bottom:4px;}
        .subtitle{font-size:13px;color:rgba(255,255,255,0.4);margin-bottom:30px;}
        .field-label{display:block;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(137,245,231,0.65);margin-bottom:7px;}
        .input-wrap{position:relative;margin-bottom:18px;}
        .input-wrap input,.input-wrap select{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(137,245,231,0.13);border-radius:10px;padding:12px 16px;color:#fff;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.25s,box-shadow 0.25s,background 0.25s;appearance:none;}
        .input-wrap select option{background:#001736;color:#fff;}
        .input-wrap input:focus,.input-wrap select:focus{border-color:rgba(137,245,231,0.5);background:rgba(137,245,231,0.05);box-shadow:0 0 0 3px rgba(137,245,231,0.08);}
        .input-wrap input::placeholder{color:rgba(255,255,255,0.18);}
        .pw-toggle{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(137,245,231,0.5);font-size:16px;display:flex;align-items:center;transition:color 0.2s;}
        .pw-toggle:hover{color:#89f5e7;}
        .row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .error-box{background:rgba(186,26,26,0.15);border:1px solid rgba(186,26,26,0.4);border-radius:10px;padding:12px 16px;color:#ff8a8a;font-size:13px;margin-bottom:16px;animation:shake 0.4s cubic-bezier(0.36,0.07,0.19,0.97);}
        .btn-submit{width:100%;padding:14px;background:linear-gradient(135deg,#89f5e7 0%,#405f91 100%);border:none;border-radius:10px;color:#000d1f;font-family:'Manrope',sans-serif;font-weight:800;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;position:relative;overflow:hidden;transition:opacity 0.2s,transform 0.15s,box-shadow 0.2s;}
        .btn-submit:hover:not(:disabled){opacity:0.9;transform:translateY(-1px);box-shadow:0 8px 24px rgba(137,245,231,0.2);}
        .btn-submit:active:not(:disabled){transform:scale(0.98);}
        .btn-submit:disabled{opacity:0.6;cursor:not-allowed;}
        .btn-submit .shimmer{position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);transform:translateX(-100%);animation:shimmer 2.2s infinite;}
        .btn-back{width:100%;padding:12px;background:transparent;border:1px solid rgba(137,245,231,0.2);border-radius:10px;color:rgba(137,245,231,0.7);font-family:'Manrope',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;transition:all 0.2s;margin-bottom:12px;}
        .btn-back:hover{border-color:rgba(137,245,231,0.5);color:#89f5e7;background:rgba(137,245,231,0.05);}
        .role-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;}
        .role-btn{padding:12px 8px;background:rgba(255,255,255,0.03);border:1px solid rgba(137,245,231,0.12);border-radius:10px;color:rgba(255,255,255,0.5);font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;cursor:pointer;transition:all 0.2s;text-align:center;}
        .role-btn.active{background:rgba(137,245,231,0.1);border-color:rgba(137,245,231,0.5);color:#89f5e7;font-weight:600;}
        .role-btn:hover:not(.active){border-color:rgba(137,245,231,0.25);color:rgba(255,255,255,0.75);}
        .step-indicator{display:flex;align-items:center;gap:8px;margin-bottom:28px;}
        .step-dot{width:8px;height:8px;border-radius:50%;background:rgba(137,245,231,0.2);transition:all 0.3s;}
        .step-dot.active{background:#89f5e7;box-shadow:0 0 8px rgba(137,245,231,0.5);width:24px;border-radius:4px;}
        .step2-form{animation:slideIn 0.4s cubic-bezier(0.16,1,0.3,1) both;}
        .footer-text{text-align:center;margin-top:24px;font-size:13px;color:rgba(255,255,255,0.35);}
        .footer-text a{color:#89f5e7;font-weight:600;text-decoration:none;transition:opacity 0.2s;}
        .footer-text a:hover{opacity:0.7;}
        .success-state{text-align:center;padding:20px 0;animation:successPop 0.5s cubic-bezier(0.16,1,0.3,1) both;}
        .success-icon{font-size:56px;margin-bottom:16px;}
        .success-title{font-family:'Manrope',sans-serif;font-weight:800;font-size:22px;color:#89f5e7;margin-bottom:8px;}
        .success-sub{font-size:13px;color:rgba(255,255,255,0.45);}
        .spinner{width:16px;height:16px;border:2px solid rgba(0,13,31,0.4);border-top-color:#000d1f;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block;}
      `}</style>

      <div className="reg-root">
        <div className="grid-bg" />
        <div className="scan-line" />
        <Orb style={{ width:500, height:500, top:"-15%",  right:"-10%",  background:"rgba(64,95,145,0.35)",    animationDelay:"0s"  }} />
        <Orb style={{ width:350, height:350, bottom:"-5%", left:"-5%",   background:"rgba(137,245,231,0.10)", animationDelay:"5s"  }} />
        <Orb style={{ width:280, height:280, top:"50%",   left:"50%",    background:"rgba(0,27,24,0.5)",       animationDelay:"9s"  }} />

        <div className="card">
          <div className="corner corner-tl" /><div className="corner corner-tr" />
          <div className="corner corner-bl" /><div className="corner corner-br" />

          {success ? (
            <div className="success-state">
              <div className="success-icon">✅</div>
              <h2 className="success-title">Account Created!</h2>
              <p className="success-sub">Redirecting you to login...</p>
            </div>
          ) : (
            <>
              <div className="logo-mark">N</div>
              <h1 className="title">Create your account</h1>
              <p className="subtitle">Join the Nexus Professional network</p>

              {/* step indicator */}
              <div className="step-indicator">
                <div className={`step-dot${step===1?" active":""}`} />
                <div className={`step-dot${step===2?" active":""}`} />
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <form onSubmit={handleStep1} noValidate>
                  <div className="row">
                    <div className="input-wrap">
                      <label className="field-label">First name</label>
                      <input type="text" placeholder="Alex" value={form.first_name} onChange={update("first_name")} />
                    </div>
                    <div className="input-wrap">
                      <label className="field-label">Last name</label>
                      <input type="text" placeholder="Sterling" value={form.last_name} onChange={update("last_name")} />
                    </div>
                  </div>
                  <div className="input-wrap">
                    <label className="field-label">Email address</label>
                    <input type="email" placeholder="you@domain.com" value={form.email} onChange={update("email")} />
                  </div>
                  <div className="input-wrap">
                    <label className="field-label">Phone number (optional)</label>
                    <input type="tel" placeholder="+92 300 0000000" value={form.phone_number} onChange={update("phone_number")} />
                  </div>
                  {error && <div className="error-box">⚠ {error}</div>}
                  <button type="submit" className="btn-submit">
                    <span className="shimmer" />
                    Continue →
                  </button>
                </form>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="step2-form">
                  <div className="input-wrap">
                    <label className="field-label">I am a</label>
                    <div className="role-grid">
                      {["freelancer","client","admin"].map(r => (
                        <button key={r} type="button" className={`role-btn${form.role===r?" active":""}`} onClick={()=>setForm(f=>({...f,role:r}))}>
                          {r==="freelancer"?"🧑‍💻 Freelancer":r==="client"?"🏢 Client":"⚙ Admin"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="input-wrap">
                    <label className="field-label">Country</label>
                    <select value={form.country} onChange={update("country")}>
                      <option value="">Select country</option>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="input-wrap">
                    <label className="field-label">Password</label>
                    <input type={showPw?"text":"password"} placeholder="Min 6 characters" value={form.password} onChange={update("password")} style={{paddingRight:44}} />
                    <button type="button" className="pw-toggle" onClick={()=>setShowPw(p=>!p)}>{showPw?"🙈":"👁"}</button>
                  </div>
                  {error && <div className="error-box">⚠ {error}</div>}
                  <button type="button" className="btn-back" onClick={()=>{setStep(1);setError("");}}>← Back</button>
                  <button type="button" className="btn-submit" onClick={handleSubmit} disabled={loading}>
                    <span className="shimmer" />
                    {loading ? <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}><span className="spinner"/>Creating account...</span> : "Create Account"}
                  </button>
                </div>
              )}

              <p className="footer-text">Already have an account? <Link to="/login">Sign in</Link></p>
            </>
          )}
        </div>
      </div>
    </>
  );
}