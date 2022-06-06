import styled from 'styled-components';

export const Container = styled.div`
  width: 2rem;
	height: 2rem;
	border-radius: 50%;
  background-color: ${props => props.color};;
  outline: solid 0.15rem #000;
  border: solid 0.1rem #fff;

  &+div{
    margin-left: 1rem;
  }
`;