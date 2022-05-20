import React from 'react';
import Link from 'next/link';
import { IoCart } from 'react-icons/io5';

//import logo from '../../assets/images/logo.svg';
import { Container, Cart, Col, Row } from './styles';
import { useCart } from '../../hooks/useCart';
import { NextPage } from 'next';

const Header: NextPage = () => {
  const { cart= [] } = useCart();
  const cartSize = cart.length;

  return (
    <Container>
      <Link href="/">
        <img src="/images/logo.svg" alt="Rocketshoes" />
      </Link>

      <Cart href="/cart">
        <a>
          <Row>
            <Col>
              <strong>Meu carrinho</strong>
              <span data-testid="cart-size">
              {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`} 
              </span>
            </Col>
            <IoCart size={36} color="#FFF" />
          </Row>
        </a>
      </Cart>
    </Container>
  );
};

export default Header;
