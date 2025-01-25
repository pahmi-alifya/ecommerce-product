import { Button, Drawer, List } from "antd";
import { TProductList } from "../types/product";

type CartProps = {
    setIsDrawerVisible: (val: boolean) => void;
    isDrawerVisible: boolean;
    cart: TProductList;
    handleRemoveFromCart: (index: number) => void;
};

export default function Cart({
    setIsDrawerVisible,
    handleRemoveFromCart,
    cart,
    isDrawerVisible,
}: CartProps) {
    return (
        <Drawer
            title="Your Cart"
            placement="right"
            onClose={() => setIsDrawerVisible(false)}
            open={isDrawerVisible}
        >
            <List
                dataSource={cart}
                renderItem={(item, index) => (
                    <List.Item
                        key={index}
                        actions={[
                            <Button onClick={() => handleRemoveFromCart(index)}>
                                Remove
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={`$${item.price} | Rating: ${item.rating.rate}`}
                        />
                    </List.Item>
                )}
            />
        </Drawer>
    );
}
