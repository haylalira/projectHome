import { MdAddShoppingCart } from "react-icons/md";
import {Button , Span} from "./style";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {  
  cartItemsAmount: Number;
}

export const ButtonAddCart: React.FC<ButtonProps> = ({cartItemsAmount, ...rest})=>{
  return (
    <Button {...rest}>
      <div className="iconCard">
        <>
          <MdAddShoppingCart size={24} color="#FFF" />
          {cartItemsAmount}
        </>
      </div>
      <Span>Adicionar ao Carrinho</Span>
    </Button>
  )
}