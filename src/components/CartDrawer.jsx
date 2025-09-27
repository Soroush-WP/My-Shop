import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { items, remove, updateQty, isOpen, setIsOpen, placeOrder } = useCart();

  if (!isOpen) return null;

  const total = items.reduce((s,i)=> s + i.price * i.qty, 0);

  function handleCheckout() {
    // For demo, open checkout route
    setIsOpen(false);
    window.location.href = "/checkout";
  }

  return (
    <div className="cart-drawer" role="dialog" aria-modal>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h3>Cart</h3>
        <button className="btn" onClick={()=> setIsOpen(false)}>Close</button>
      </div>

      <div style={{maxHeight:320,overflowY:"auto",marginTop:8}}>
        {items.length===0 && <div style={{padding:16}}>Your cart is empty.</div>}
        {items.map(i => (
          <div className="cart-item" key={i.id}>
            <img src={i.image} alt={i.title} style={{width:60,height:60,objectFit:"cover",borderRadius:8}}/>
            <div style={{flex:1}}>
              <div style={{fontWeight:700}}>{i.title}</div>
              <div className="meta">${i.price.toFixed(2)}</div>
              <div className="qty" style={{marginTop:6}}>
                <button className="btn ghost" onClick={()=> updateQty(i.id, Math.max(1, i.qty - 1))}>-</button>
                <div style={{padding:"0 8px"}}>{i.qty}</div>
                <button className="btn ghost" onClick={()=> updateQty(i.id, i.qty + 1)}>+</button>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <button className="btn ghost" onClick={()=> remove(i.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div className="meta">Subtotal</div>
          <div className="price">${total.toFixed(2)}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <Link to="/checkout" className="btn primary" onClick={()=> setIsOpen(false)}>Checkout</Link>
          <button className="btn ghost" onClick={()=> { /* continue shopping */ setIsOpen(false);} }>Continue</button>
        </div>
      </div>
    </div>
  );
}
