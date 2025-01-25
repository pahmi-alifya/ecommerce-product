import { useEffect, useState } from 'react'
import { TProduct, TProductList } from '../types/product';

export default function useCart() {
    const cartData = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") || '') : []

    const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
    const [cart, setCart] = useState<TProductList>(
        () => cartData,
    );

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const handleAddToCart = (product: TProduct) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const handleRemoveFromCart = (index: number) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    return { handleAddToCart, handleRemoveFromCart, setSelectedProduct, selectedProduct, cart }
}
