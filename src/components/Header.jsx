import styles from "./Header.module.css";
import { CartContext } from "../services/CartContext";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import Cart from "../screens/Cart/Cart.jsx";

export default function Header() {
  const { cart } = useContext(CartContext);

  return (
    <>
      <header>
        <Link className={styles.link} to={"/"}>
          <h1 className={styles.title}>CoreOne</h1>
        </Link>
        <div className={styles.links}>
          <Link className={styles.link} to={"/login"}>
            <h2 className={styles.title1}>Login</h2>
          </Link>
          <Link className={styles.link} to={"/sign-in"}>
            <h2 className={styles.title1}>Sign In</h2>
          </Link>

          {cart.length > 0 ? (
            <>
              <div className={styles.cart}>
                <div>
                  <Link to={"/cart"} element={<Cart />}><ShoppingBag /></Link>
                  <span className={styles.qtt}>
                    {cart.reduce((qty, product) => qty + product.quantity, 0)}
                  </span>
                </div>
                <p className={styles.total}>
                  {cart
                    .reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
            </>
          ) : (
            <ShoppingBag />
          )}
        </div>
      </header>
    </>
  );
}
