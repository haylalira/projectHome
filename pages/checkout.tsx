import styled from 'styled-components';
import { useCart } from '../hooks/useCart';
import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, TextField } from '@mui/material';
import axios from 'axios';

const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  text-transform: uppercase;
  margin: 0 2rem;

  @media only screen and (min-width: 768px) {
    margin: 0 18rem;
  }
  form {
    margin-top: 3rem;
  }
`;

interface IFormProps {
  name: string;
  lastName: string;
  email: string;
  cpf: string
}

export const Checkout = () => {
  const { cart } = useCart();
  const { register, handleSubmit } = useForm<IFormProps>();

  const onSubmit = async (formData: IFormProps) => {
    console.log('form', formData);
    
    const { data } = await axios.post('/api/checkout', {formData});

    console.log('resposta da api', data);
  }
  console.log(cart)
  return (
    <Container>
      <h3>Finalizar compra</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <TextField 
          id="firstName" 
          label="Nome" 
          variant="outlined" 
          color="secondary" 
          sx={{ m: 1, width: '50ch' }}
          {...register("name")}
        />
        <TextField 
          id="lastName"  
          label="Sobrenome" 
          variant="outlined" 
          color="secondary"
          sx={{ m: 1, width: '50ch' }}
          {...register("lastName")}
        />
        <TextField 
          id="cpf"  
          label="CPF" 
          variant="outlined" 
          color="secondary"
          sx={{ m: 1, width: '50ch' }}
          {...register("cpf")}
        />
        <TextField 
          id="email"  
          label="email" 
          variant="outlined" 
          color="secondary"
          sx={{ m: 1, width: '200ch' }} 
          {...register("email")}
        />
        
      </Box>
      <Button type='submit'>Enviar</Button>
      </form>
    </Container>
  )
}

export default Checkout;