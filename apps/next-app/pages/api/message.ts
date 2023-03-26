// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import amqplib from 'amqplib';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ServerConfigs } from '../../server/config';
import { MessageDTO } from '../../shared/dto/MessageDTO';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MessageDTO>
) {
  try {
    const { awsMqEndpoint, queueName } = ServerConfigs.envs;
    const message = 'ping';

    const connection = await amqplib.connect(awsMqEndpoint);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    await channel.sendToQueue(queueName, Buffer.from(message));

    console.debug('API >>> message >>> publish message : ', message);

    await channel.close();
    await connection.close();

    res.status(200).json({
      message: 'ping',
      publishDate: new Date(),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: '몬가...몬가 잘못되었습니다...!',
      publishDate: new Date(),
    });
  }
}
