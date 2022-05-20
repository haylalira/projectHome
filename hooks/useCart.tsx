import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: string;
  amount: number;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  images: Array<string>;
  amount: number;
}

export interface Stock {
  id: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: string) => Promise<void>;
  removeProduct: (productId: string) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const storagedCart = localStorage.getItem('@RocketShoes:cart') || '';
      if (storagedCart) {
       return JSON.parse(storagedCart);
     }
    }
     
    return [];
  });

  const addProduct = async (productId: string) => {
    try {
      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product._id === productId);

      //const stock = await api.get(`/stock/${productId}`);

      //const stockAmount = stock.data.amount;  
      const currentAmount = productExists ? productExists.amount: 0;
      const amount =currentAmount +1;

      // if(amount > stockAmount){
      //   toast.error('quantidade solicitada fora de estoque');
      //   return;
      // }
      if (productExists){
        productExists.amount = amount;
      }
      else{
        //const product = await api.get (`/products/${productId}`);

        //const newProduct ={...product.data, amount:1}
      //updatedCart.push(newProduct);
      }

      setCart(updatedCart);
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
    } catch{
       toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: string) => {
    try { 
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(product => product._id === productId);
  if (productIndex >= 0){
    updatedCart.splice(productIndex, 1);
    setCart(updatedCart);
    localStorage.setItem('@rocketShoes:cart', JSON.stringify(updatedCart));
  }
  else{
    throw Error();
  }
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if( amount <= 0) {
      return;
      }
      
      //const stock = await api.get(`/stock/${productId}`);
      
      //const stockAmount = stock.data.amount;

      // if(amount > stockAmount) {
      //   toast.error('Quantidade solicitada fora de estoque');
      //  return;
      // }
     
      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product._id === productId);
     if(productExists){ productExists.amount =amount;
      setCart(updatedCart);
      localStorage.setItem(`@rocketShoes:cart`,JSON.stringify(updatedCart));

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
