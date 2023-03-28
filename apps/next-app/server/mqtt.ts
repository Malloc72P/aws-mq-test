import mqtt from 'mqtt';
import { nanoid } from 'nanoid';
import { ServerConfigs } from './config';

const { awsMqEndpoint, queueName, mqUsername, mqPw } = ServerConfigs.envs;
export const sendMessage = ({ message }: { message: string }) => {
  const client = mqtt.connect(awsMqEndpoint, {
    protocol: 'wss',
    username: mqUsername,
    password: mqPw,
    clientId: nanoid(6),
  });
  client.on('connect', () => {
    client.publish(queueName, message);
  });
};
