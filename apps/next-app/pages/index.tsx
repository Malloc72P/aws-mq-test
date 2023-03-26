import { Box, Flex } from '@mantine/core';
import mqtt from 'mqtt';
import { ReactElement, useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { DivRotator } from '../components/DivRotator';
import { ServerConfigs } from '../server/config';
import { NextPageWithLayout } from './_app';

const subscribe = async () => {
  const { awsMqttEndpoint, mqUsername, mqPw, queueName } = ServerConfigs.envs;
  const connection = mqtt.connect(awsMqttEndpoint, {
    protocol: 'mqtt',
    username: mqUsername,
    password: mqPw,
    clientId: crypto.randomUUID(),
  });

  connection.subscribe(queueName, (error) => {
    console.error(error);
  });
  connection.on(queueName, (topic: string, message: unknown) => {
    console.debug(`subscription >>> topic(${topic}) : `, message);
  });
};

const Home: NextPageWithLayout = () => {
  const [deg, setDeg] = useState(0);

  useEffect(() => {
    subscribe();
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
