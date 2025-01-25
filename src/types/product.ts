export type TProduct = {
    category: string,
    description: string
    id: number
    image: string
    price: number
    rating: { rate: number, count: number }
    title: string
}

export type TProductList = TProduct[]