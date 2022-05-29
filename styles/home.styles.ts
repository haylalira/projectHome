import styled from 'styled-components';
import { darken } from 'polished';

export const BodyContainer = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  padding: 20px 50px;

  @media only screen and (max-width: 600px) {
    padding: 0px;
  }
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  list-style: none;

  @media only screen and (max-width: 600px) {
    padding: 0px;
    margin: 0 2rem;
    grid-template-columns: repeat(1, 1fr);
  }

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
    }

    > strong {
      font-size: 24px;
      line-height: 20px;
      color: #333;
      padding: 12px 0;
      font-weight: 400;
      text-transform: uppercase;

      border-top-width: 1px;
      border-top-style: solid;
      border-top-color: #000;
    }

    > p {
      font-size: 24px;
      font-weight: bold;
      margin-left: auto;
      margin-top: 0.5rem;
    }

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, '#7159c1')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
