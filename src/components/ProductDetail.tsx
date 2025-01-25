import { Image, Modal } from "antd";
import { TProduct } from "../types/product";

type TProductDetail = {
    selectedProduct: TProduct | null;
    isModalVisible: boolean;
    setIsModalVisible: (val: boolean) => void;
};

export default function ProductDetail({
    isModalVisible,
    selectedProduct,
    setIsModalVisible,
}: TProductDetail) {
    return selectedProduct ? (
        <Modal
            title={selectedProduct.title}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
        >
            <Image alt={selectedProduct.title} src={selectedProduct.image} />
            <p>{selectedProduct.description}</p>
            <p>
                <strong>Price:</strong> ${selectedProduct.price}
            </p>
            <p>
                <strong>Rating:</strong> {selectedProduct.rating.rate}
            </p>
        </Modal>
    ) : null;
}
