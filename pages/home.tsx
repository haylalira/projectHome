import React from 'react';

import Header from "../components/Header";
import { BodyContainer } from '../styles/home.styles';

import { ProductList } from './../styles/home.styles';
import { useCart } from './../hooks/useCart';
import { NextPage } from 'next/types';
import { Product } from './index';
import Link from 'next/link';

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

interface IProps {
  products: Array<Product>;
}

export const HomePage: NextPage<IProps> = ({products}: IProps) => {
  //const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart=[] } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = { ...sumAmount };
    //newSumAmount[product._id] = product.amount;

    return newSumAmount;
  }, {} as CartItemsAmount);

  function handleAddProduct(id: string) {
    addProduct(id);
  }
  return (
    <BodyContainer>
      <Header />
      <ProductList>
      {products.map(product => (
        <Link href={'/produto'} key={product._id}>
        <li style={{cursor: 'pointer'}}>
            <img src={product.images[0]} alt={product.category} />
            <strong>{product.name}</strong>
            <span>{`R$ ${product.price}`}</span>
        </li>
        </Link>
      ))}
    </ProductList>
    </BodyContainer>
  )
}