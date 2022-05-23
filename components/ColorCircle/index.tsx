import { Container } from './styles';
import { IColor } from '../../types';

interface IProps {
  color:  IColor;
}

export const ColorCircle = ({ color }: IProps) => {
    const MapColor = {
      preto: '#000',
      branco: '#cdcdcd',
      violeta: '#8377D9',
      amarelo: '#f4f870'
    }
  return <Container color={MapColor[color]}/>
}