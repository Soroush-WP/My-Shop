import React, { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import productsData from "./data/products";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./components/Checkout";

export default function App(){
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const products = useMemo(()=>{
    let list = productsData.slice();

    if (query) {
      const q = query.trim().toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (category) {
      list = list.filter(p => p.category === category);
    }
    if (sort) {
      if (sort === "price-asc") list.sort((a,b)=>a.price-b.price);
      if (sort === "price-desc") list.sort((a,b)=>b.price-a.price);
      if (sort === "title-asc") list.sort((a,b)=> a.title.localeCompare(b.title));
    }
    return list;
  }, [query, category, sort]);

  return (
    <div>
      <Header products={products} setQuery={setQuery} setCategory={setCategory} setSort={setSort} />
      <CartDrawer />
      <main style={{paddingTop:16}}>
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<div className="container" style={{padding:20}}>Page not found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
