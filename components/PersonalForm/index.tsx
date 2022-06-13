import { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../../hooks/useCart';
import { Control, Controller, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

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

interface IProps {
  handleSubmit: UseFormHandleSubmit<IFormProps>;
  onSubmit: (formData: IFormProps) => Promise<void>;
  register: UseFormRegister<IFormProps>;
  control: Control<IFormProps, any>;
  onSearchCEP: (event: any) => void;
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

export const PersonalForm = ({
  handleSubmit,
  onSubmit,
  register,
  onSearchCEP,
  control,
}: IProps) => {
  // const { cart } = useCart();
  // const { register, handleSubmit, setValue, getValues, setFocus } = useForm<IFormProps>();
  // const [uf, setUf] = useState('');
  // const [updatedAddress, setUpdatedAddress] = useState({address: {
  //   city: '',
  //   neighbourhood: '',
  //   address: '',
  // }});

  // const handleChange = (event: SelectChangeEvent) => {
  //   setUf(event.target.value as string);
  // };

  // const onSearchCEP = (event: any) => {
  //   if(event.target.value.length === 8){
  //     const cep = event.target.value.replaceAll(".","").replaceAll("-","");
  //     fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`).then(response => response.json()).then(data => {
  //       setUpdatedAddress({
  //         address: {
  //           city: data.city,
  //           neighbourhood: data.neighborhood,
  //           address: data.street,
  //         }
  //       })
  //     })
  //   }
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: '60rem' , justifyContent: 'center'}}>
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
        <Divider textAlign="center">
          <Chip label="ENDEREÇO DE ENTREGA" />
        </Divider>
      </FormControl>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: '60rem', mb: '3rem', justifyContent: 'center'}}>
        <Controller 
          name={"cep"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField 
              id="cep"  
              label="CEP" 
              helperText="Somente números"
              variant="outlined" 
              color="secondary"
              sx={{ m: 1, width: '40ch' }} 
              {...register("cep")}
              value={value}
              onChange={onSearchCEP}
            />
          )}
        />
        
          <Controller 
            name={"state"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl sx={{ m: 1, width: '40ch' }} >
                <InputLabel id="demo-simple-select-label">ESTADO</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="ESTADO"
                    onChange={onChange}
                  >
                    {UFs.map(uf => 
                      <MenuItem key={uf.value} value={uf.value}>{uf.label}</MenuItem>
                    )}
                  </Select>
              </FormControl>
            )}
          />
        
        
        <Controller 
          name={"address"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField 
              id="address"  
              label="ENDEREÇO" 
              variant="outlined" 
              color="secondary"
              sx={{ m: 1, width: '82ch' }} 
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller 
          name={"neighbourhood"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField 
              id="neighbourhood"  
              label="BAIRRO" 
              variant="outlined" 
              color="secondary"
              sx={{ m: 1, width: '43ch' }} 
              value={value}
              onChange={onChange}
            />
          )}
        />
        <TextField 
          id="addressNumber"  
          label="NÚMERO" 
          variant="outlined" 
          color="secondary"
          sx={{ m: 1, width: '15ch' }} 
          {...register("addressNumber")}
        />
        <Controller 
          name={"city"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField 
              id="city"  
              label="CIDADE" 
              variant="outlined" 
              color="secondary"
              sx={{ m: 1, width: '20ch' }} 
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Box>
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          maxWidth: '60rem', 
          mb: '3rem' , 
          mr: '6rem',
          justifyContent: 'end'
        }}>
        <Button 
          variant="outlined" 
          color='secondary'
          size="large"
          type="submit"
          endIcon={<SendIcon />}
        >
          Enviar
        </Button>
      </Box>
    </form>
  )
}

export default PersonalForm;