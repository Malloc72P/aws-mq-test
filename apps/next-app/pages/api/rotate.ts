// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendMessage } from '../../server/mqtt';
import {
  RotateRectangleInput,
  RotateRectangleResult,
} from '../../shared/dto/DTOS';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RotateRectangleResult>
) {
  const { degree } = req.body as RotateRectangleInput;
  const publishDate = new Date();
  const message = JSON.stringify({
    degree,
    publishDate,
  });

  try {
    sendMessage({ message });

    res.status(200).json({
      degree,
      publishDate,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      degree: -1,
      publishDate,
    });
  }
}
