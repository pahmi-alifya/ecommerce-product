import React, { useEffect, useState } from 'react'
import { TProduct, TProductList } from '../types/product';

export default function useCart() {
    const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
    const [cart, setCart] = useState<TProductList>(
        () => JSON.parse(localStorage.getItem("cart") || '') || [],
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
