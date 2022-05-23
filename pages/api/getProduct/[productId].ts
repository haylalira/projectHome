import type { VercelRequest, VercelResponse} from '@vercel/node';
import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (
  req: VercelRequest,
  res: VercelResponse
) {
  const { productId } = req.query;

  if(productId){
    const data = JSON.stringify({
      "collection": "products",
      "database": "minhaloja",
      "dataSource": "development",
      "filter":  {"_id": {"$oid": `${productId}`}  }
    });

    const config = {
      method: 'post',
      url: 'https://data.mongodb-api.com/app/data-dtgvr/endpoint/data/beta/action/findOne',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': `${process.env.API_KEY}`
      },
      data : data
    };

    const response = await axios(config);
    return res.status(200).json(response.data.document)
  }
}

/*
  {
    _id: new ObjectId("5feb7d2d05d6861244d4cc0e"),
    photos: [ 'photo01.png', 'photo02.png' ],
    colors: [ 'preto', 'branco' ],
    name: 'calça',
    value: 150,
    category: 'lazer',
    size: 'P',
    createdAt: 2020-12-29T19:02:05.189Z,
    updatedAt: 2020-12-30T12:16:40.187Z,
    __v: 0
  }
*/