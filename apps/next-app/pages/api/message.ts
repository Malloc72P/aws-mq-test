// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { MessageDTO } from '../../shared/dto/MessageDTO';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MessageDTO>
) {
  res.status(200).json({
    message: 'ping',
    publishDate: new Date(),
  });
}
