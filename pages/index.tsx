import axios from 'axios';
import { NextPage } from 'next/types';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { useCart } from '../hooks/useCart';
import { BodyContainer, ProductList } from '../styles/home.styles';
import Header from '../components/Header';
import { IProps } from '../types';

interface CartItemsAmount {
  [key: number]: number;
}

const Home: NextPage<IProps> = ({ products }) => {
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
      <ProductList>
      {products.map(product => (
        <Link href={`/produto/${product._id}`} key={product._id}>
        <li style={{cursor: 'pointer'}}>
            <Image height={250} width={150} src={product.images[0]} alt="Imagem do produto" />
            <strong>{product.name}</strong>
            <span>{`R$ ${product.price}`}</span>
        </li>
        </Link>
      ))}
    </ProductList>
    </BodyContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try{
    const configData = JSON.stringify({
      "collection": "products",
      "database": "minhaloja",
      "dataSource": "development",
    });
  
    const config = {
      method: 'post',
      url: 'https://data.mongodb-api.com/app/data-dtgvr/endpoint/data/beta/action/find',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': `${process.env.API_KEY}`
      },
      data : configData
    };
  
    const { data } = await axios(config);

    if (!data.documents) {
      return {
        notFound: true,
      }
    }
    else {
      const products = data.documents;
      return {
        props: {
          products
        },
      }
    }
  }catch(e){
    return {
      notFound: true,
    }
  }
}

export default Home
