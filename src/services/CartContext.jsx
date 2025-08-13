import { useState, useEffect, createContext } from "react";

export const CartContext = createContext({
    // Products and loading/error states
    products: [],
    loading: false,
    error: null,

    // Cart management functions
    cart: [],
    addToCart: () => {},
    updateQtyCart: () => {},
    clearCart: () => {},
});

export function CartProvider({ children }) {
    const category = "laptops";
    const limit = 20;
    const apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try{ 
                const response = await fetch(apiUrl);
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        }
        setTimeout(() => {
            fetchProducts();
        }, 100);
    }, []);

    const [cart, setCart] = useState([]);

    function addToCart(poduct) {
        const existingProduct = cart.find((item) => item.id === products.id);
        if (existingProduct) {
            updateQtyCart(products.id, existingProduct.quantity + 1);
        } else {
            setCart((prevCart) => [...prevCart, {...product, quantity: 1}]);
        }
    }

}