import { MdAddShoppingCart } from "react-icons/md"
import {Button , Span} from "./style"

export const ButtonAddCart = ()=>{
  return (
    <Button>
      <MdAddShoppingCart size={24} color="#FFF" />
      <Span>Adicionar ao Carrinho</Span>
    </Button>
  )
}