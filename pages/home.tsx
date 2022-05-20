import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import Header from "../components/Header";
import { BodyContainer } from '../styles/home.styles';

import { ProductList } from './../styles/home.styles';
import { api } from './../services/api';
import { formatPrice } from './../util/format';
import { useCart } from './../hooks/useCart';
import { NextPage } from 'next/types';
import { Product } from './index';


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
        <li key = {product._id}>
          <img src={product.images[0]} alt={product.category} />
          <strong>{product.name}</strong>
          <span>{`${product.price}`}</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(product._id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {/*cartItemsAmount[product._id] ||*/ 0} 
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
    </BodyContainer>
  )
}