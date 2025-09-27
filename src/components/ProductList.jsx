import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  if (!products.length) {
    return <div style={{padding:"2rem",textAlign:"center"}}>No products found.</div>;
  }

  return (
    <div className="container" style={{paddingTop:16, paddingBottom:16}}>
      <div className="grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
