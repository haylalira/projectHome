import Header from "../../components/Header";
import { BodyContainer } from "../../styles/home.styles";
import { Container, Headline, ImageContent  } from "./style";
import Image from 'next/image'
import { Col, Row } from "../../components/Header/styles";
import { ButtonAddCart } from "../../components/ButtonAddCart";

const Product = ()=>{
  return (
 <BodyContainer>
    <Header/>
    <Container>
      <ImageContent>
        <img  
          src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg"
          width={'450px'}
          height={'500px'}
        />
      </ImageContent>
      
      <Headline>
        <strong className="titulo">Tenis branco Top</strong>
        <Col>
          <Row>
            <strong className="corLabel">Cor:</strong>
            <p> Branco, Preto</p>
          </Row>
          <Row>
            <input type="radio"></input>
            <input type="radio"></input>
          </Row>
          <strong className="tamanho">tamanho (BR)</strong>
          <ButtonAddCart />
        </Col>
        
      </Headline>
     </Container>
    </BodyContainer>
    )
}

export default Product;