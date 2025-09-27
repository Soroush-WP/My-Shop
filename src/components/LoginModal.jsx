import React, { useState } from "react";
import PasswordRecoveryForm from "./PasswordRecoveryForm";

export default function LoginModal({ open, onClose }) {
  const [isRecover, setIsRecover] = useState(false);
  const [form, setForm] = useState({ email:"", password:"" });
  if (!open) return null;

  function handleChange(e){ setForm({...form, [e.target.name]: e.target.value}); }
  function handleSubmit(e){ e.preventDefault(); alert("Mock login: " + form.email); onClose(); }

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:70}}>
      <div style={{width:400,maxWidth:"90%",background:"#fff",padding:16,borderRadius:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3>{isRecover ? "Recover Password" : "Login"}</h3>
          <button className="btn" onClick={onClose}>Close</button>
        </div>

        {isRecover ? (
          <PasswordRecoveryForm onBack={()=> setIsRecover(false)} onRecover={(email)=> { alert("Mock recovery sent to " + email); setIsRecover(false); }} />
        ) : (
          <form onSubmit={handleSubmit} style={{display:"grid",gap:8}}>
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <button className="btn primary" type="submit">Login</button>
              <button type="button" className="btn ghost" onClick={()=> setIsRecover(true)}>Forgot?</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
