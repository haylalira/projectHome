import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Image from 'next/image'

interface IPixProps {
  point_of_interaction: {
    transaction_data: {
      qr_code: string;
      qr_code_base64: string;
    }
  }
}

const PixCartComponent = ({ point_of_interaction }: IPixProps) => {
  console.log('resposta da api', point_of_interaction.transaction_data);

  async function copyTextToClipboard() {
    const text = point_of_interaction.transaction_data.qr_code;
    
    return await navigator.clipboard.writeText(text);
  }

  return (
    <Box sx={{display: 'flex' ,justifyContent: 'center', mt: 5, flexDirection: 'column'}} >
      <Image 
        layout='fixed' 
        height={300} 
        width={300} 
        src={`data:image/jpeg;base64,${point_of_interaction.transaction_data.qr_code_base64}`} alt="Imagem do QR code."
      />
      <Box sx={{display: 'flex', alignItems: 'center', mt: 3}}>
        <TextField
          disabled
          id="outlined"
          defaultValue={point_of_interaction.transaction_data.qr_code}
          sx={{mr: 2, width: '43ch'}}
        />
        <Button 
          size="large" 
          color="secondary" 
          variant="outlined"
          onClick={copyTextToClipboard}
        >
          Copiar
        </Button>
      </Box>

      
    </Box>
  )
}

export default PixCartComponent;