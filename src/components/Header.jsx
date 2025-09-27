import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import LoginModal from "./LoginModal";

export default function Header({ products, setQuery, setCategory, setSort }) {
  const { items, setIsOpen } = useCart();
  const [openLogin, setOpenLogin] = useState(false);
  const navigate = useNavigate();

  const cartCount = items.reduce((s,i)=>s + i.qty,0);

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <span>🛍️</span><span>MyShop</span>
          </Link>
        </div>

        <div className="search">
          <input placeholder="Search products..." onChange={(e)=> setQuery(e.target.value)} />
          <select onChange={(e)=> setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="accessories">Accessories</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="home">Home</option>
            <option value="footwear">Footwear</option>
          </select>
          <select onChange={(e)=> setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="title-asc">Name A→Z</option>
          </select>
        </div>

        <div className="actions">
          <button className="btn ghost" onClick={()=> setOpenLogin(true)}>Login</button>
          <button className="btn" onClick={()=> setIsOpen(true)}>
            Cart ({cartCount})
          </button>
        </div>
      </div>

      <LoginModal open={openLogin} onClose={()=> setOpenLogin(false)} />
    </header>
  );
}
