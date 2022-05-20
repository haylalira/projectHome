import styled from "styled-components";

export const Container = styled.div`
  display:flex ;
`;

export const ImageContent = styled.div`
  display: flex;
  max-width: 563px;
  margin-right: 50px;
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
    margin-top: 48px ;
  }

  .titulo{
    margin-bottom:48px ;
    font-size: 32px ;
    text-transform:uppercase;
  }

  .corLabel{
    margin-right: 18px;
    margin-bottom:12px ;
  }

  input{
    width: 52px;
    height: 52px;
    margin: 0 12px;
  }
`;

