// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '../../mongoConnection';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const connection = await connectToDatabase();
  const db = connection.db;

  switch (req.method) {
    case "GET":
      break;

    case "POST":
        // console.log(req.boxdy);

        const cleanCards = req.body.cards.map((card: any, i: number) => {
          const newQuestion = card.frontText.replace(/\n/g, "");
          const newAnswer = card.backText.replace(/\n/g, "");
          return({
            frontText: newQuestion,
            backText: newAnswer
          })
        })  

        console.log(cleanCards);
        const insertManyResp = await db.collection('cards').insertMany(cleanCards)
        // console.log('resp: ', resp)
        res.status(200).json({message: 'working'})
      break;

    case "DELETE":

        const resp = await db.collection('cards').deleteMany({})

        res.status(200).json(resp);

      break;
  }
}
