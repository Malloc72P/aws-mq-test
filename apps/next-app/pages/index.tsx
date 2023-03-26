import { Box, Flex } from '@mantine/core';
import { Client } from 'mqtt';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { DivRotator } from '../components/DivRotator';
import { ServerConfigs } from '../server/config';
import { NextPageWithLayout } from './_app';
import mqtt from 'mqtt';
import { nanoid } from 'nanoid';

const Home: NextPageWithLayout = () => {
  const [deg, setDeg] = useState(0);
  const [client, setClient] = useState<Client | null>(null);
  const { awsMqttEndpoint, mqUsername, mqPw, queueName } = ServerConfigs.envs;

  const subscribe = useCallback(async () => {
    const client = mqtt.connect(awsMqttEndpoint, {
      protocol: 'wss',
      username: mqUsername,
      password: mqPw,
      clientId: nanoid(6),
    });

    client.on('connect', () => {
      client.subscribe(queueName, (error) => {
        if (error) {
          console.error(error);
        }
        console.log('start subscribing');
      });

      client.on('message', (topic: string, message: Buffer) => {
        console.log(`[${topic}] message: `, message.toString());
      });

      setClient(client);
    });
  }, [awsMqttEndpoint, mqPw, mqUsername, queueName]);

  useEffect(() => {
    subscribe();

    return () => {
      if (client) {
        client.unsubscribe(queueName);
      }
    };
  }, []);

  return (
    <Box>
      <Flex h="60vh" justify="center" align="center">
        <DivRotator w={100} h={100} bg="blue" rotationDegree={deg} />
      </Flex>
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
