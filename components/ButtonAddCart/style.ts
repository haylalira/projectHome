import styled from "styled-components";

export const Button = styled.button`
  background-color: #9370DB;
  border: none;
  color: white;
  padding: 12px;
  margin: 48px 0;
  text-align: center;
  align-items: center;
  text-decoration: none;
  display: flex;
  font-size: 12px;
  width: 400px;

    .iconCard {
      display: flex;
      align-items: center;
      font-size: 1.3rem;
      
      svg {
        margin-right: 0.5rem;
      }
    }
`;

export const Span = styled.span`
  align-self: center ;
  font-size: 2em;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: solid 2px #FFF;
`;