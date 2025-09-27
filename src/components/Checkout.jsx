import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function Checkout() {
  const { items, placeOrder } = useCart();
  const [form, setForm] = useState({ name:"", email:"", address:"", city:"", zip:"" });
  const [order, setOrder] = useState(null);

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value});
  }

  function handleSubmit(e){
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Please fill name and email");
      return;
    }
    const result = placeOrder(form);
    setOrder(result);
  }

  if (order) {
    return (
      <div className="container" style={{padding:20}}>
        <h2>Order confirmed</h2>
        <p>Order ID: <strong>{order.id}</strong></p>
        <p>Total: <strong>${order.total.toFixed(2)}</strong></p>
        <p>We sent a confirmation to {order.details.email} (mock)</p>
      </div>
    );
  }

  return (
    <div className="container" style={{padding:20}}>
      <h2>Checkout</h2>
      {items.length === 0 && <p>Your cart is empty. Go add something!</p>}
      <form onSubmit={handleSubmit} style={{maxWidth:600}}>
        <div style={{display:"grid",gap:8}}>
          <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
          <div style={{display:"flex",gap:8}}>
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
            <input name="zip" placeholder="ZIP" value={form.zip} onChange={handleChange} />
          </div>
          <button className="btn primary" type="submit">Place order</button>
        </div>
      </form>
    </div>
  );
}
