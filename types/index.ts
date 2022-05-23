export interface IProduct {
  _id: string;
  colors: Array<string>;
  name: string;
  category: string;
  size: string
  images: Array<string>;
  price: Number;
}

export interface IProps {
  products: Array<IProduct>;
}