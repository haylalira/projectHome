import styled from 'styled-components';
import Link from 'next/link';

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  img{
    cursor: pointer;
  }

  a {
    transition: opacity 0.2s;
    text-decoration: none;

    div {
    text-align: right;
    margin-right: 1rem;

    strong {
      display: block;
      color: #fff;
    }

    span {
      font-size: 12px;
      color: #999;
    }
  }

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;

 
`;
