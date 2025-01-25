import React, { lazy, useState } from "react";
import { Layout, Menu, Select } from "antd";
import "antd/dist/reset.css";
import ProductList from "./components/ProductList";
import useCart from "./hooks/useCart";
import useProducts from "./hooks/useProducts";

const ProductDetail = lazy(() => import("./components/ProductDetail"));
const CartDrawer = lazy(() => import("./components/Cart"));

const { Header, Content } = Layout;
const { Option } = Select;

function App() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    const {
        categories,
        filteredProducts,
        handleFilterCategory,
        handleFilterSort,
    } = useProducts();

    const {
        selectedProduct,
        cart,
        handleRemoveFromCart,
        handleAddToCart,
        setSelectedProduct,
    } = useCart();

    return (
        <Layout>
            <Header>
                <Menu
                    mode="horizontal"
                    items={[
                        {
                            key: "cart",
                            label: `Cart (${cart.length})`,
                            onClick: () => setIsDrawerVisible(true),
                        },
                    ]}
                />
            </Header>
            <Content style={{ padding: 24 }}>
                <div style={{ marginBottom: 16 }}>
                    <Select
                        placeholder="Filter by Category"
                        style={{ width: 200, marginRight: 16 }}
                        onChange={handleFilterCategory}
                        allowClear
                    >
                        {categories.map((category) => (
                            <Option key={category} value={category}>
                                {category.charAt(0).toUpperCase() +
                                    category.slice(1)}
                            </Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Sort by Price"
                        style={{ width: 200, marginRight: 16 }}
                        onChange={(value) => handleFilterSort("price", value)}
                    >
                        <Option value="asc">Low to High</Option>
                        <Option value="desc">High to Low</Option>
                    </Select>
                    <Select
                        placeholder="Sort by Rating"
                        style={{ width: 200 }}
                        onChange={(value) => handleFilterSort("rating", value)}
                    >
                        <Option value="asc">Low to High</Option>
                        <Option value="desc">High to Low</Option>
                    </Select>
                </div>

                <ProductList
                    filteredProducts={filteredProducts}
                    setIsModalVisible={setIsModalVisible}
                    handleAddToCart={handleAddToCart}
                    setSelectedProduct={setSelectedProduct}
                />
            </Content>

            <ProductDetail
                isModalVisible={isModalVisible}
                selectedProduct={selectedProduct}
                setIsModalVisible={setIsModalVisible}
            />

            <CartDrawer
                cart={cart}
                handleRemoveFromCart={handleRemoveFromCart}
                isDrawerVisible={isDrawerVisible}
                setIsDrawerVisible={setIsDrawerVisible}
            />
        </Layout>
    );
}

export default App;
