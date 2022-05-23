export interface IProduct {
  _id: string;
  colors: Array<string>;
  name: string;
  category: string;
  size: string
  images: Array<string>;
  price: number;
  amount: number;
  stock: number;
}

export interface IProps {
  products: Array<IProduct>;
}