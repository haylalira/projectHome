export type IColor = 'preto' | 'branco' | 'violeta' | 'amarelo';

export interface IProduct {
  _id: string;
  colors: Array<IColor>;
  name: string;
  category: string;
  size: string
  images: Array<string>;
  price: Number;
}

export interface IProps {
  products: Array<IProduct>;
}