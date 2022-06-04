import styled from "styled-components";

export const Container = styled.div`
  display:flex ;
  
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
  }
`;

export const ImageContent = styled.div`
  display: flex;
  margin-right: 2rem;
  min-width: 600px;

  @media only screen and (max-width: 600px) {
    min-width: 12rem;
    margin-right: 0;
  }
`;

export const Headline = styled.div`
  display:flex;
  flex-direction: column;
  color: #fff;
  min-height: 45px ;
  min-width: 50%;
  padding: 3rem;
  font-size: 22px;

  @media only screen and (max-width: 600px) {
    padding: 1rem;
  }

  .tamanho {
    margin-bottom: 1rem ;
    font-weight: 400;
  }

  .titulo{
    margin-bottom:48px ;
    font-size: 2.6rem ;
    text-transform:uppercase;

    @media only screen and (max-width: 600px) {
      font-size: 1.6rem ;
      margin: 1rem 0 1.5rem 0;
    }
  }

  .corLabel{
    margin-right: 18px;
    margin-bottom: auto ;
    margin-top: auto;
    font-weight: 400;
  }

  .price {
    font-size: 32px ;
    margin-bottom:5rem ;
    margin-top: 1rem;
    font-weight: 400;
    @media only screen and (max-width: 600px) {
      margin-bottom: 1rem ;
    }
  }

  input{
    width: 52px;
    height: 52px;
    margin: 0 12px;
  }
`;
