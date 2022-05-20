import type { VercelRequest, VercelResponse} from '@vercel/node';
import { MongoClient, Db } from 'mongodb';

//let cachedDb: Db = null;

async function connectToDatabase(uri: string){
  //if(cachedDb){
   // return cachedDb
  //}

  const client = await MongoClient.connect(uri,{});
  
  const db = client.db('minhaloja');
  
  return db;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (
  req: VercelRequest,
  res: VercelResponse
) {
  const db = await connectToDatabase('mongodb+srv://admin-dev-remote:t3t1ARHyXDY31cyK@development.7knus.mongodb.net/?retryWrites=true&w=majority');
  
  const products = await db.collection('products').find({}).toArray();

  res.status(200).json(products)
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