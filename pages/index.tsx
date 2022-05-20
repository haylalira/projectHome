import { useEffect, useState } from 'react';
import { NextPage } from 'next/types';
import { HomePage } from './home'
import axios from 'axios';
import { useCart } from '../hooks/useCart';
import {ObjectId} from 'mongodb'

export interface Product {
  _id: string;
  colors: Array<string>;
  name: string;
  category: string;
  size: string
  images: Array<string>;
  price: Number;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home: NextPage = () => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await axios.get('api/getProducts');
      setProducts(data)
    }

    loadProducts();
  }, []);

  return (
    <HomePage products={products}/>
  );
}

export default Home
