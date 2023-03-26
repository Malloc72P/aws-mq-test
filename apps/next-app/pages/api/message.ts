// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mqtt from 'mqtt';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ServerConfigs } from '../../server/config';
import { MessageDTO } from '../../shared/dto/MessageDTO';

const { awsMqttEndpoint, queueName, mqUsername, mqPw } = ServerConfigs.envs;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MessageDTO>
) {
  const publishDate = new Date();
  const message = JSON.stringify({
    message: nanoid(20),
    publishDate,
  });

  try {
    const client = mqtt.connect(awsMqttEndpoint, {
      protocol: 'wss',
      username: mqUsername,
      password: mqPw,
      clientId: nanoid(6),
    });
    client.on('connect', () => {
      console.log('do publish');
      client.publish(queueName, message);
    });

    res.status(200).json({
      message,
      publishDate,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: '몬가...몬가 잘못되었습니다...!',
      publishDate,
    });
  }
}
