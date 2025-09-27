import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../contexts/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { add } = useCart();

  if (!product) {
    return <div className="container" style={{padding:20}}>Product not found.</div>;
  }

  return (
    <div className="container" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,paddingTop:20}}>
      <div style={{background:"#fff",padding:16,borderRadius:12,boxShadow:"var(--shadow)"}}>
        <img src={product.image} alt={product.title} style={{width:"100%",objectFit:"contain"}} />
      </div>
      <div>
        <h1>{product.title}</h1>
        <div className="meta">{product.category}</div>
        <div className="price" style={{marginTop:8}}>${product.price.toFixed(2)}</div>
        <p style={{marginTop:12}}>{product.description}</p>
        <div style={{display:"flex",gap:8,marginTop:16}}>
          <button className="btn primary" onClick={()=> add(product,1)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
