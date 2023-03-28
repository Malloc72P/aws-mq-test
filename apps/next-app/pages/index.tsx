import { Box, Flex } from '@mantine/core';
import mqtt, { Client } from 'mqtt';
import { nanoid } from 'nanoid';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { DivRotator } from '../components/DivRotator';
import { ServerConfigs } from '../server/config';
import { RotateRectangleResult } from '../shared/dto/DTOS';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const [deg, setDeg] = useState(0);
  const [client, setClient] = useState<Client | null>(null);
  const { awsMqEndpoint, mqUsername, mqPw, queueName } = ServerConfigs.envs;
  const isSubscribed = useRef(false);

  const subscribe = useCallback(async () => {
    const client = mqtt.connect(awsMqEndpoint, {
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
        const { degree: receivedDegree } = JSON.parse(
          message.toString()
        ) as RotateRectangleResult;
        console.log(receivedDegree);

        setDeg(Number(receivedDegree));
      });

      setClient(client);
    });
  }, [awsMqEndpoint, mqPw, mqUsername, queueName]);

  useEffect(() => {
    if (isSubscribed.current) {
      return;
    }
    isSubscribed.current = true;
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
