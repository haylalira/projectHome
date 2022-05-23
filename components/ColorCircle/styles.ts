import styled from 'styled-components';

export const Container = styled.div`
  width: 50px;
	height: 50px;
	border-radius: 50%;
  background-color: ${props => props.color};;
  border: solid 0.4rem #FFF;

  &+div{
    margin-left: 1rem;
  }
`;