import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { IProduct } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  product: IProduct;
  amount: number;
}

export interface Stock {
  id: number;
  amount: number;
}

interface CartContextData {
  cart: IProduct[];
  addProduct: (product: IProduct) => Promise<void>;
  removeProduct: (product: IProduct) => void;
  updateProductAmount: ({ product, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<IProduct[]>([] as IProduct[]);

  const addProduct = async (product: IProduct) => {
    try {
      const productId = product._id;
      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product._id === productId);
      const stockAmount = product.stock;

      const currentAmount = productExists ? productExists.amount: 0;
      const amount =currentAmount +1;
      
      if(amount > stockAmount){
         toast.error('quantidade solicitada fora de estoque');
         return;
       }
      if (productExists){
        productExists.amount = amount;
      }
      else{
        const newProduct ={...product, amount:1}
        updatedCart.push(newProduct);
      }

      setCart(updatedCart);
    } catch{
       toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (product: IProduct) => {
    try { 
      const updatedCart = [...cart];
      const productId = product._id;

      const productIndex = updatedCart.findIndex(product => product._id === productId);
      
      if (productIndex >= 0){
        updatedCart.splice(productIndex, 1);
        setCart(updatedCart);
      }
      else{
        throw Error();
      }
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    product,
    amount,
  }: UpdateProductAmount) => {
    try {
      if( amount <= 0) {
      return;
      }
      
      const stockAmount = product.stock;

      if(amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
       return;
      }
     
      const updatedCart = [...cart];
      const productId = product._id;

      const productExists = updatedCart.find(product => product._id === productId);

      if(productExists){ productExists.amount =amount;
        setCart(updatedCart);

      } else{
        throw Error();
      }
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
