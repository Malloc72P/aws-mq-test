import { Box, Flex } from '@mantine/core';
import { ReactElement, useEffect, useRef, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { DivRotator } from '../components/DivRotator';
import { RECTANGLE } from '../lib/constants';
import { RotateRectangleResult } from '../shared/dto/DTOS';
import { subscribeMessage, unsubscribe } from '../shared/mqtt';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const [deg, setDeg] = useState(0);
  const isSubscribed = useRef(false);

  useEffect(() => {
    if (isSubscribed.current) {
      return;
    }
    isSubscribed.current = true;
    subscribeMessage({
      targetTopic: RECTANGLE,
      onReceive: (topic: string, message: Buffer) => {
        console.log(message.toString());

        const { data: receivedDegree } = JSON.parse(
          message.toString()
        ) as RotateRectangleResult;

        // 이해할 수 없는 메시지인 경우 무시한다.
        if (typeof receivedDegree !== 'number') {
          return;
        }

        setDeg(Number(receivedDegree));
      },
    });

    return () => {
      unsubscribe({ topic: RECTANGLE });
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
