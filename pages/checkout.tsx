import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../hooks/useCart';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

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
  cep: string;
  address: string;
  addressNumber: string;
  neighbourhood: string;
  city: string;
  state: string;
}

const UFs = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espirito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" }
];

export const Checkout = () => {
  const { cart } = useCart();
  const { register, handleSubmit, setValue, getValues, setFocus } = useForm<IFormProps>();
  const [uf, setUf] = useState('');
  const [updatedAddress, setUpdatedAddress] = useState({address: {
    city: '',
    neighbourhood: '',
    address: '',
  }});

  const handleChange = (event: SelectChangeEvent) => {
    setUf(event.target.value as string);
  };

  const onSearchCEP = (event: any) => {
    if(event.target.value.length === 8){
      const cep = event.target.value.replaceAll(".","").replaceAll("-","");
      fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`).then(response => response.json()).then(data => {
        setUpdatedAddress({
          address: {
            city: data.city,
            neighbourhood: data.neighborhood,
            address: data.street,
          }
        })
        // setValue("city", data.city);
        // setValue("neighbourhood", data.neighborhood)
        // setValue("address", data.street)
      })
    }
  }


  const onSubmit = async (formData: IFormProps) => {
    console.log('form', formData);
    
    const { data } = await axios.post('/api/checkout', {formData});

    console.log('resposta da api', data);
  }

  return (
    <Container>
      <h3>Finalizar compra</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: '60rem' }}>
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
          sx={{ m: 1, width: '50ch' }} 
          {...register("email")}
        />
      </Box>

      <FormControl fullWidth sx={{my: '3rem'}}>
        <Divider textAlign="left">
          <Chip label="ENDEREÇO DE ENTREGA" />
        </Divider>
      </FormControl>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: '60rem', mb: '3rem'}}>
        <TextField 
          id="cep"  
          label="CEP" 
          helperText="Somente números"
          variant="outlined" 
          color="secondary"
          sx={{ m: 1, width: '50ch' }} 
          {...register("cep")}
          onChange={onSearchCEP}
        />
        <FormControl sx={{ m: 1, width: '50ch' }} >
          <InputLabel id="demo-simple-select-label">ESTADO</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={uf}
              label="ESTADO"
              onChange={handleChange}
            >
              {UFs.map(uf => 
                <MenuItem key={uf.value} value={uf.value}>{uf.label}</MenuItem>
              )}
            </Select>
        </FormControl>
        <TextField 
          id="address"  
          label="ENDEREÇO" 
          variant="outlined" 
          color="secondary"
          sx={{ m: 1, width: '70ch' }} 
          value={updatedAddress.address.address}
          {...register("address")}
        />
        <TextField 
          id="addressNumber"  
          label="NÚMERO" 
          variant="outlined" 
          color="secondary"
          sx={{ m: 1, width: '30ch' }} 
          {...register("addressNumber")}
        />
        <TextField 
          id="neighbourhood"  
          label="BAIRRO" 
          variant="outlined" 
          color="secondary"
          sx={{ m: 1, width: '50ch' }} 
          value={updatedAddress.address.neighbourhood}
          {...register("neighbourhood")}
        />
        <TextField 
          id="city"  
          label="CIDADE" 
          variant="outlined" 
          color="secondary"
          sx={{ m: 1, width: '50ch' }} 
          value={updatedAddress.address.city}
          {...register("city")}
        />
        
      </Box>

      <Button variant="outlined" color='secondary'>Enviar</Button>
      </form>
    </Container>
  )
}

export default Checkout;