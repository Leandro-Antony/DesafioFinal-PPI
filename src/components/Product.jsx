import styles from "./Product.module.css";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../services/CartContext.jsx";

export default function Product({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <>
      <div className={styles.card}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.productImage}
        />

        <h2 className={styles.productTitle}>{product.title}</h2>
        <p className={styles.productDescription}>{product.description}</p>

        <p className={styles.productPrice}>${product.price}</p>
        <button
          className={styles.productBuy}
          onClick={() => {
            addToCart(product);
          }}>
            <ShoppingCart />
          Adicionar ao Carrinho
        </button>
      </div>
    </>
  );
}
