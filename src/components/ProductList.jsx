import styles from "./ProductList.module.css";
import Product from "./Product.jsx";
import Header from "./Header.jsx";
import { CircularProgress } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { CartContext } from "../services/CartContext";

export default function ProductList() {
  const { products, loading, error } = useContext(CartContext);

  const searchInput = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch() {
    const term = searchInput.current.value.toLowerCase();
    setSearchTerm(term);
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <div className={styles.bg}></div>


      <div className={styles.container}>
      <Header />
        <input
          type="text"
          className={styles.searchInput}
          ref={searchInput}
          onChange={handleSearch}
          placeholder="Pesquise seu produto"
        />

        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        {loading && (
          <div>
            <CircularProgress
              thickness={5}
              style={{ margin: "2rem auto", display: "block" }}
              sx={{
                color: "var(--color-primary)",
              }}
            />
            <p>Carregando produtos...</p>
          </div>
        )}
        {error && <p>Erro ao carregar os produtos: {error.message}</p>}
      </div>
    </>
  );
}
