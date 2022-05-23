import styled from 'styled-components';

export const Container = styled.div`
  width: 2rem;
	height: 2rem;
	border-radius: 50%;
  background-color: ${props => props.color};;
  border: solid 0.2rem #FFF;

  &+div{
    margin-left: 1rem;
  }
`;