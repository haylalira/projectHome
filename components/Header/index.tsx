import React from 'react';
import Link from 'next/link';
import { IoCart } from 'react-icons/io5';
import Image from 'next/image';
import { Container } from './styles';
import { useCart } from '../../hooks/useCart';
import { NextPage } from 'next';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { useRouter } from 'next/router';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.primary}`,
    padding: '0 4px',
  },
}));

const Header: NextPage = () => {
  const { cart= [] } = useCart();
  const router = useRouter();
  const cartSize = cart.length;

  return (
    <Container>
      <Link href="/">
        <Image src="/images/logo.svg" alt="Maria Cereja" width={300}  height={180} />
      </Link>
            
      <IconButton aria-label="cart" onClick={() => router.push('/cart')}>
        <StyledBadge badgeContent={cartSize} color="secondary" >
          <IoCart size={36} color="#FFF" />
        </StyledBadge>
      </IconButton>
    </Container>
  );
};

export default Header;
