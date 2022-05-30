import type { VercelRequest, VercelResponse} from '@vercel/node';
import mercadoPago from 'mercadopago';

export default function async (req: VercelRequest, res: VercelResponse) {
  console.log(req.body.cartFormatted) // array
  const mercadoPagoPublicKey = `${process.env.MERCADO_PAGO_PUBLIC_KEY}`;
  const mercadoPagoAccessToken = `${process.env.MERCADO_PAGO_ACCESS_TOKEN}`;

  mercadoPago.configurations.setAccessToken(mercadoPagoAccessToken);

  if (req.method === 'POST') {
    // Process a POST request
    var payment_data = {
      transaction_amount: 100,
      description: 'Título do produto',
      payment_method_id: 'pix',
      installments: 0,
      payer: {
        email: 'test@test.com',
        first_name: 'Test',
        last_name: 'User',
        identification: {
            type: 'CPF',
            number: '19119119100'
        },
        address:  {
            zip_code: '06233200',
            street_name: 'Av. das Nações Unidas',
            street_number: '3003',
            neighborhood: 'Bonfim',
            city: 'Osasco',
            federal_unit: 'SP'
        }
      }
    };
    
    mercadoPago.payment.create(payment_data).then(function (data) {
      res.json(data.body);
    }).catch(function (error) {
      res.status(500).json({error});
    });
    
  } else {
    // Handle any other HTTP method
  }
}