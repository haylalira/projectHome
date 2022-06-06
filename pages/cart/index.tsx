import React from 'react';
import axios from 'axios';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import { useCart } from '../../hooks/useCart';
import { BodyContainer } from '../../styles/home.styles';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from '../../styles/cart.styles';
import { IProduct } from '../../types';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const Cart = (): JSX.Element => {
   const { cart, removeProduct, updateProductAmount } = useCart();
   const router = useRouter()

   const cartFormatted = cart.map(product => ({
    ...product,
    priceformatted:formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount)

   }))
   const total = formatPrice(
      cart.reduce((sumTotal, product) => {
       return sumTotal + (product.price * product.amount)
     }, 0)
    )

  function handleProductIncrement(product: IProduct) {
     updateProductAmount({ product:product, amount:product.amount + 1});
  }

  function handleProductDecrement(product: IProduct) {
    updateProductAmount({ product:product, amount:product.amount - 1});
  }

  function handleRemoveProduct(product: IProduct) {
     removeProduct(product);
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
                  onClick={() => handleRemoveProduct(product)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          )}
          </tbody>
        </ProductTable>

        <footer>
          <Button variant="outlined" color='secondary' onClick={() => router.push('/checkout')}>Finalizar pedido</Button>

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
