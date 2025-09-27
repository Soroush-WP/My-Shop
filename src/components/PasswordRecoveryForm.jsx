import React, { useState } from "react";

export default function PasswordRecoveryForm({ onBack, onRecover }) {
  const [email, setEmail] = useState("");
  function handleSubmit(e){
    e.preventDefault();
    if(!email) { alert("Please enter your email"); return; }
    onRecover(email);
  }
  return (
    <form onSubmit={handleSubmit} style={{display:"grid",gap:8}}>
      <input placeholder="Your account email" value={email} onChange={(e)=> setEmail(e.target.value)} />
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <button type="button" className="btn ghost" onClick={onBack}>Back</button>
        <button className="btn primary" type="submit">Send Recovery Link</button>
      </div>
    </form>
  );
}
