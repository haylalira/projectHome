import React from 'react';
import Link from 'next/link';
import { MdShoppingBasket } from 'react-icons/md';

import logo from '../../assets/images/logo.svg';
import { Container, Cart } from './styles';
import { useCart } from '../../hooks/useCart';
import { NextPage } from 'next';

const Header: NextPage = () => {
  const { cart= [] } = useCart();
  const cartSize = cart.length;

  return (
    <Container>
      <Link href="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart href="/cart">
        <>
          <div>
            <strong>Meu carrinho</strong>
            <span data-testid="cart-size">
            {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`} 
            </span>
          </div>
          <MdShoppingBasket size={36} color="#FFF" />
        </>
      </Cart>
    </Container>
  );
};

export default Header;
