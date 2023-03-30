import { Box, Flex } from '@mantine/core';
import { ReactElement, useEffect, useRef, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { DivRotator } from '../components/DivRotator';
import { ReceivedData } from '../components/ReceivedData';
import { RECTANGLE } from '../lib/constants';
import { useCommonStyles } from '../lib/styles';
import { subscribeMessage, unsubscribe } from '../shared/mqtt';
import { DTO, RotateRectangleResult } from '../types/dto';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const [deg, setDeg] = useState(0);
  const isSubscribed = useRef(false);
  const [receivedData, setReceivedData] = useState<DTO[]>([]);

  const {
    classes: { spacer, zeroBasis },
    cx,
  } = useCommonStyles();

  useEffect(() => {
    if (isSubscribed.current) {
      return;
    }
    isSubscribed.current = true;
    subscribeMessage({
      targetTopic: RECTANGLE,
      onReceive: (topic: string, message: Buffer) => {
        console.log(message.toString());

        const parsedData = JSON.parse(
          message.toString()
        ) as RotateRectangleResult;
        parsedData.date = new Date(parsedData.date);
        const { data: receivedDegree } = parsedData;

        // 이해할 수 없는 메시지인 경우 무시한다.
        if (typeof receivedDegree !== 'number') {
          return;
        }
        setReceivedData((prevState) => [...prevState, parsedData]);
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
        <Box className={cx(spacer, zeroBasis)}></Box>
        <DivRotator w={100} h={100} bg="blue" rotationDegree={deg} />
        <Box className={cx(spacer, zeroBasis)} h="100%">
          <ReceivedData data={receivedData}></ReceivedData>
        </Box>
      </Flex>
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
