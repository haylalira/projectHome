import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import Header from "../components/Header";
import { BodyContainer } from '../styles/home.styles';

import { ProductList } from './../styles/home.styles';
import { api } from './../services/api';
import { formatPrice } from './../util/format';
import { useCart } from './../hooks/useCart';
import { NextPage } from 'next/types';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

export const HomePage: NextPage = () => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart=[] } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = { ...sumAmount };
    newSumAmount[product.id] = product.amount;

    return newSumAmount;
  }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Product[]>('products');
      const data = response.data.map((product: Product) => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }))
      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id);
  }
  return (
    <BodyContainer>
      <Header />
      <ProductList>
      {products.map(product => (
        <li key = {product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(product.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {cartItemsAmount[product.id] || 0} 
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
    </BodyContainer>
  )
}