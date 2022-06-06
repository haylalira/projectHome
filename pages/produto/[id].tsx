import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import { BodyContainer } from "../../styles/home.styles";
import { Container, Headline, ImageContent  } from "../../styles/product.styles";
import { Col, Row } from "../../components/Header/styles";
import { ButtonAddCart } from "../../components/ButtonAddCart";
import { useEffect, useState } from 'react';
import { IProduct } from '../../types';
import { ColorCircle } from '../../components/ColorCircle';
import { useCart } from '../../hooks/useCart';
import ImageListSideBar from '../../components/ImageListSideBar';
import Box from '@mui/material/Box';

interface CartItemsAmount {
  [key: string]: number;
}

const Product = ()=>{
  const router = useRouter();
  const { addProduct, cart=[] } = useCart();
  
  const { id } = router.query;
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [isLoading, setIsLoading] = useState<Boolean>();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = { ...sumAmount };
    newSumAmount[product._id] = product.amount;

    return newSumAmount;
  }, {} as CartItemsAmount);
  
  function handleAddProduct(product: IProduct) {
    addProduct(product);
  }

  useEffect(()=> {
    async function getProduct(){
      const { data } = await axios.get(`/api/getProduct/${id}`);
      setProduct(data);
      setIsLoading(true)
    }
    getProduct();
  },[id]);

  return (
    <BodyContainer>
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
        {/* <Container> */}
          <ImageContent>
            <ImageListSideBar images={product.images} />
          </ImageContent>
          
          <Headline style={{color: '#000', backgroundColor: '#fff'}}>
            <strong className="titulo">{product.name}</strong>
            
            <Col>
              <strong className="tamanho">Tamanho (BR): {product.size}</strong>
              <Row>
                <strong className="corLabel">Cor:</strong>
                {product.colors?.map(color => <ColorCircle key={color} color={color} />)}
              </Row>
              <strong className="price">{`R$ ${product.price}`}</strong>
              <div style={{display: 'flex', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto'}}>
                <ButtonAddCart 
                  cartItemsAmount={cartItemsAmount[product._id] || 0} 
                  onClick={()=> handleAddProduct(product)} />
              </div>
              
            </Col>
          </Headline>
        </Box>
        // </Container>
      )}
    </BodyContainer>
    )
}

export default Product;