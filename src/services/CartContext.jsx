import { useState, useEffect, createContext } from "react";
import { supabase } from "../utils/supabase";

export const CartContext = createContext({
  // Products and loading/error states
  products: [],
  loading: false,
  error: null,

  // Cart management
  cart: [],
  addToCart: () => {},
  updateQtyCart: () => {},
  clearCart: () => {},

  // User session management
  session: null,
  sessionLoading: false,
  sessionMessage: null,
  sessionError: null,
  handleSignUp: () => {},
  handleSignIn: () => {},
  handleSignOut: () => {},
});

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductsSupabase() {
      const { data, error } = await supabase.from("product_2v").select();
      if (error) {
        setError(`Fetching products failed! ${error}`);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProductsSupabase();

    // async function fetchProducts() {
    //   const category = "laptops";
    //   const limit = 20;
    //   const apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;
    //   try {
    //     const response = await fetch(apiUrl);
    //     const data = await response.json();
    //     setProducts(data.products);
    //   } catch (error) {
    //     setError(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // setTimeout(() => {
    //   fetchProducts();
    // }, 100);
  }, []);

  //Cart state management
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      updateQtyCart(product.id, existingProduct.quantity + 1);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  }

  function updateQtyCart(productId, quantity) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  }

  function clearCart(productId) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }

  //User session management
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionMessage, setSessionMessage] = useState(null);
  const [sessionError, setSessionError] = useState(null);

  async function handleSignUp(email, passwd, username) {
    setSessionLoading(true);
    setSessionError(null);
    setSessionMessage(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        passw,
        options: {
          data: {
            username: username,
            admin: false,
          },
          emailRedirectTo: `${window.location.origin}/signIn`,
        },
      });
      if (error) throw error;

      if (data?.user) {
        setSessionMessage(
          "Registration successful! Check your email for confimmation."
        );
      }
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  async function handleSignIn(email, passwd) {
    setSessionLoading(true);
    setSessionError(null);
    setSessionMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        passwd,
      });

      if (error) throw error;

      if (data.session) {
        setSession(data.session);
        setSessionMessage("Sign-in successful!");
      }
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  async function handleSignOut() {
    setSessionLoading(true);
    setSessionError(null);
    setSessionMessage(null);

    try {
      const {} = await supabase.auth.signOut();

      if (error) throw error;

      setSession(null);
      window.location.href = "/"; //Manda para a página inicial
    } catch (error) {
      console.log(error.message);
    } finally {
      setSessionLoading(false);
    }
  }
  const context = {
    //Products and loading/error states
    products: products,
    loading: loading,
    error: error,

    //cart management
    cart: cart,
    addToCart: addToCart,
    updateQtyCart: updateQtyCart,
    clearCart: clearCart,

    //User session management
    session: session,
    sessionLoading: sessionLoading,
    sessionMessage: sessionMessage,
    sessionError: sessionError,
    handleSignUp: handleSignUp,
    handleSignIn: handleSignIn,
    handleSignOut: handleSignOut,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
