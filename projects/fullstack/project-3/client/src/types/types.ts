export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  category: string;
}

export interface Order {
  id: number;
  ProductId: number;
  UserId: number;
  quantity: number;
  isPaid: boolean;
  totalPrice: number;
  User: {
    id: number;
    email: string;
  };
  Product: {
    id: number;
    name: string;
    category: string;
  };
}
