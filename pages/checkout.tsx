import { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../hooks/useCart';
import { useForm } from 'react-hook-form';
import PersonalForm from '../components/PersonalForm';
import axios from 'axios';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PixCartCompoment from '../components/PixCart';

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

interface IPixProps {
  transaction_data: {
    qr_code: string;
    qr_code_base64: string;
  }
}

const steps = [
  'Dados para pagamento e entrega',
  'Pagamento',
  'Finalizado a Compra',
];


export const Checkout = () => {
  const { cart } = useCart();
  const { register, handleSubmit, control, setValue } = useForm<IFormProps>();
  const [step, setStep] = useState(0);
  const [pixInfo, setPixInfo] = useState({} as IPixProps);

  const onSearchCEP = (event: any) => {
    if(event.target.value.length === 8){
      const cep = event.target.value.replaceAll(".","").replaceAll("-","");
      fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`).then(response => response.json()).then(data => {
        setValue('city', data.city)
        setValue('address', data.street)
        setValue('neighbourhood', data.neighborhood)
        setValue('state', data.state)
        setValue('cep', data.cep)
      });
    }
  }

  const HandleStepComponentPages = () => {
    switch(step){
      case 0: 
        return <PersonalForm 
                  handleSubmit={handleSubmit} 
                  onSearchCEP={onSearchCEP} 
                  onSubmit={onSubmit} 
                  register={register}
                  control={control}
                />
      case 1: return <PixCartCompoment point_of_interaction={pixInfo} />
      case 2: return <div>Status</div>
      default: 
        return <PersonalForm 
                handleSubmit={handleSubmit} 
                onSearchCEP={onSearchCEP} 
                onSubmit={onSubmit} 
                register={register}
                control={control}
              />
    }
  }

  const onSubmit = async (formData: IFormProps) => {
    const { data } = await axios.post('/api/checkout', {formData});
    console.log('form', formData);
    setPixInfo(data.point_of_interaction);
    setStep(step+1);
  }

  return (
    <Container>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <HandleStepComponentPages />
    </Container>
  )
}

export default Checkout;