import React from 'react';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import { useCart } from '../../hooks/useCart';
import { BodyContainer } from '../../styles/home.styles';
 import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from '../../styles/cart.styles';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: Array<string>;
  amount: number;
}

const Cart = (): JSX.Element => {
   const { cart, removeProduct, updateProductAmount } = useCart();

   const cartFormatted = cart.map(product => ({
    ...product,
    priceformatted:formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount)

   }))
   const total =
   formatPrice(
      cart.reduce((sumTotal, product) => {
       return sumTotal + product.price * product.amount
     }, 0)
    )

  function handleProductIncrement(product: Product) {
     updateProductAmount({ productId:product._id,amount:product.amount + 1});
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({ productId:product._id,amount:product.amount - 1});
  }

  function handleRemoveProduct(productId: string) {
     removeProduct(productId);
  }

  return (
    <BodyContainer>
      <Container>
        <ProductTable>
          <thead>
            <tr>
              <th aria-label="product image" />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th aria-label="delete icon" />
            </tr>
          </thead>
          <tbody>
          {cartFormatted.map(product =>
          
            <tr  key ={product._id}data-testid="product">
              <td>
                <img src= {product.images[0]} alt={product.name}/>
              </td>
              <td>
                <strong>{product.name}</strong>
                <span>{product.priceformatted}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-product"
                    disabled={product.amount <= 1}
                    onClick={() => handleProductDecrement(product)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={product.amount}
                  />
                  <button
                    type="button"
                    data-testid="increment-product"
                    onClick={() => handleProductIncrement(product)}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subTotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={() => handleRemoveProduct(product._id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          )}
          </tbody>
        </ProductTable>

        <footer>
          <button type="button">Finalizar pedido</button>

          <Total>
            <span>TOTAL</span>
            <strong>{total}</strong>
          </Total>
        </footer>
      </Container>
    </BodyContainer>
  );
};

export default Cart;
