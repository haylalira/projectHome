import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import { BodyContainer } from "../../styles/home.styles";
import { Container, Headline, ImageContent  } from "../../styles/product.styles";
import { Col, Row } from "../../components/Header/styles";
import { ButtonAddCart } from "../../components/ButtonAddCart";
import { useEffect, useState } from 'react';
import { IProduct } from '../../types';
import { GetServerSideProps } from 'next';
import { ColorCircle } from '../../components/ColorCircle';

const Product = ()=>{
  const router = useRouter()
  const { id } = router.query;
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [isLoading, setIsLoading] = useState<Boolean>();

  useEffect(()=> {
    async function getProduct(){
      const { data } = await axios.get(`/api/getProduct/${id}`);
      setProduct(data);
      setIsLoading(true)
    }
    getProduct();
    
  },[id]);
  console.log(product.colors)
  return (
 <BodyContainer>
   {isLoading && (
    <Container>
      <ImageContent>
        <Image src={"https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg"} height={600} width={600} alt="Imagem do produto" />
      </ImageContent>
      
      <Headline>
        <strong className="titulo">{product.name}</strong>
        
        <Col>
          <strong className="tamanho">Tamanho (BR): {product.size}</strong>
          <Row>
            <strong className="corLabel">Cor:</strong>
            {product.colors?.map(color => <ColorCircle key={color} color={color} />)}
          </Row>
          <strong className="price">{`R$ ${product.price}`}</strong>
          <div style={{display: 'flex', marginBottom: 'auto'}}>
            <ButtonAddCart />
          </div>
          
        </Col>
      </Headline>
     </Container>
   )}
    
    </BodyContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default Product;