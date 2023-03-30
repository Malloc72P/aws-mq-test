import mqtt from 'mqtt';
import { nanoid } from 'nanoid';
import { DTO } from '../types/dto';
import { ServerConfigs } from './config';

const { awsMqEndpoint, mqUsername, mqPw } = ServerConfigs.envs;
const clientId = nanoid(6);

const client = mqtt.connect(awsMqEndpoint, {
  clientId,
  protocol: 'wss',
  username: mqUsername,
  password: mqPw,
});

export const sendMessage = ({
  topic,
  data,
}: {
  topic: string;
  data: unknown;
}) => {
  console.log('topic, data', topic, data);

  console.log('client.connected: ', client.connected);

  const dto: DTO = {
    producerId: clientId,
    data,
    date: new Date(),
  };

  client.publish(topic, JSON.stringify(dto));
};

export const subscribeMessage = ({
  targetTopic,
  onReceive,
}: {
  targetTopic: string;
  onReceive: (topic: string, message: Buffer) => void;
}) => {
  const client = mqtt.connect(awsMqEndpoint, {
    protocol: 'wss',
    username: mqUsername,
    password: mqPw,
    clientId: nanoid(6),
  });

  client.subscribe(targetTopic, (error) => {
    if (error) {
      console.error(error);
    }
    console.log('start subscribing');
  });

  client.on('message', (topic: string, message: Buffer) => {
    onReceive(topic, message);
  });
};

export const unsubscribe = ({ topic }: { topic: string }) => {
  client.unsubscribe(topic);
};
