import { useEffect, useState } from 'react';
import { NextPage } from 'next/types';
import axios from 'axios';
import { useCart } from '../hooks/useCart';
import { BodyContainer, ProductList } from '../styles/home.styles';
import Header from '../components/Header';
import Link from 'next/link';

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
  const { addProduct, cart=[] } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = { ...sumAmount };
    //newSumAmount[product._id] = product.amount;

    return newSumAmount;
  }, {} as CartItemsAmount);

  function handleAddProduct(id: string) {
    addProduct(id);
  }

  useEffect(() => {
    async function loadProducts() {
      const { data } = await axios.get('api/getProducts');
      setProducts(data)
    }

    loadProducts();
  }, []);

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
  );
}

export default Home
