import axios from 'axios';
import { NextPage } from 'next/types';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { BodyContainer, ProductList } from '../styles/home.styles';
import { IProps } from '../types';

const Home: NextPage<IProps> = ({ products }) => {
  return (
    <BodyContainer>
      <ProductList>
      {products.map(product => (
        <Link href={`/produto/${product._id}`} key={product._id}>
        <li style={{cursor: 'pointer'}}>
            <Image height={250} width={150} src={product.images[0]} alt="Imagem do produto" className='imagem'/>
            <strong>{product.name}</strong>
            <p>{`R$ ${product.price}`}</p>
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
