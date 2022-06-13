import { useRouter } from 'next/router';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import { Headline } from "../../styles/product.styles";
import { Col, Row } from "../../components/Header/styles";
import { ButtonAddCart } from "../../components/ButtonAddCart";
import { useEffect, useState } from 'react';
import { IProduct } from '../../types';
import { ColorCircle } from '../../components/ColorCircle';
import { useCart } from '../../hooks/useCart';
import ImageListSideBar from '../../components/ImageListSideBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

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
    <Box sx={{mx: { xs: 2, md: '3rem'}, minWidth: {xs: 400}}}>
      {isLoading && (
        <Paper 
          elevation={24} 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <ImageListSideBar images={product.images} />

          <Divider orientation="vertical" flexItem />

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
        </Paper>
      )}
    </Box>
    )
}

export default Product;