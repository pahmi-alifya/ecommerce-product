import { useEffect, useState } from 'react'
import { TProduct, TProductList } from '../types/product';

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState<TProductList>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);

                const uniqueCategories: any = [...new Set(data.map((item: TProduct) => item.category))];
                setCategories(uniqueCategories);
            });
    }, []);

    const handleFilterSort = (type: string, value: string) => {
        let sortedProducts: TProductList = [...products];
        if (type === "price") {
            sortedProducts.sort((a, b) => (value === "asc" ? a.price - b.price : b.price - a.price));
        } else if (type === "rating") {
            sortedProducts.sort((a, b) => (value === "asc" ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate));
        }
        setFilteredProducts(sortedProducts);
    };

    const handleFilterCategory = (category: string) => {
        if (category) {
            setFilteredProducts(products.filter((product: TProduct) => product.category === category));
        } else {
            setFilteredProducts(products);
        }
    };


    return { handleFilterCategory, handleFilterSort, filteredProducts, categories, products }
}
