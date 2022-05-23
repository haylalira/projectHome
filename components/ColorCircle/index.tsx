import { Container } from './styles';

interface IProps {
  color:  string;
}

export const ColorCircle = ({ color }: IProps) => {
  return <Container color={color}/>
}