import { Button, Card, Image, List } from "antd";
import { TProduct, TProductList } from "../types/product";

type ProductListProps = {
    filteredProducts: TProductList;
    setIsModalVisible: (val: boolean) => void;
    setSelectedProduct: (item: TProduct) => void;
    handleAddToCart: (item: TProduct) => void;
};

export default function ProductList({
    filteredProducts,
    setIsModalVisible,
    setSelectedProduct,
    handleAddToCart,
}: ProductListProps) {
    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={filteredProducts}
            renderItem={(item, index) => (
                <List.Item key={index}>
                    <Card
                        hoverable
                        cover={
                            <Image
                                alt={item.title}
                                src={item.image}
                                height={200}
                                style={{ objectFit: "contain" }}
                            />
                        }
                        actions={[
                            <Button
                                type="link"
                                onClick={() => {
                                    setIsModalVisible(true);
                                    setSelectedProduct(item);
                                }}
                            >
                                Details
                            </Button>,
                            <Button
                                type="link"
                                onClick={() => handleAddToCart(item)}
                            >
                                Add to Cart
                            </Button>,
                        ]}
                    >
                        <Card.Meta
                            title={item.title}
                            description={`$${item.price} | Rating: ${item.rating.rate}`}
                        />
                    </Card>
                </List.Item>
            )}
        />
    );
}
