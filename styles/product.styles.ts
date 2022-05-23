import styled from "styled-components";

export const Container = styled.div`
  display:flex ;
`;

export const ImageContent = styled.div`
  display: flex;
  margin-right: 50px;
  min-width: 600px;
`;

export const Headline = styled.div`
  display:flex;
  flex-direction: column;
  color:white ;
  min-height: 45px ;
  min-width:90% ;
  padding: 12px;
  font-size:22px ;

  .tamanho {
    margin-bottom: 1rem ;
  }

  .titulo{
    margin-bottom:48px ;
    font-size: 32px ;
    text-transform:uppercase;
  }

  .corLabel{
    margin-right: 18px;
    margin-bottom: auto ;
    margin-top: auto;
  }

  .price {
    font-size: 32px ;
    margin-bottom:5rem ;
    margin-top: 2rem;
    font-weight: 400;
  }

  input{
    width: 52px;
    height: 52px;
    margin: 0 12px;
  }
`;
