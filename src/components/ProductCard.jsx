import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function ProductCard({ product }) {
  const { add, favorites, toggleFavorite } = useCart();
  const fav = favorites.includes(product.id);

  return (
    <div className="card">
      <div className="media">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="body">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <Link to={`/product/${product.id}`} style={{textDecoration:"none",color:"inherit"}}>
            <div style={{fontWeight:700}}>{product.title}</div>
          </Link>
          <div className="meta">{product.category}</div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div className="price">${product.price.toFixed(2)}</div>
            <div className="meta" style={{fontSize:"0.85rem"}}>{product.description}</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end"}}>
            <button className="btn primary" onClick={()=> add(product,1)}>Add</button>
            <button className="btn ghost" onClick={()=> toggleFavorite(product.id)}>
              {fav ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
