import { Box, Flex, NumberInput, Text } from '@mantine/core';
import axios from 'axios';
import { ReactElement, useEffect, useRef, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const [period, setPeriod] = useState(1000);
  const [tempPeriod, setTempPeriod] = useState(1000);
  const degreeRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(degreeRef.current);
      axios('/api/rotate', {
        method: 'post',
        data: {
          degree: degreeRef.current,
        },
      });
      degreeRef.current = (degreeRef.current + 10) % 360;
    }, period);

    return () => {
      clearInterval(interval);
    };
  }, [period]);

  return (
    <Box>
      <Flex h="60vh" direction="column" px="20vw" py="xl">
        <Box maw={600}>
          <Text size="xl" mb="md">
            테스트콘솔
          </Text>
          <NumberInput
            label="메세지 전송 주기"
            value={tempPeriod}
            onChange={(value) => setTempPeriod(value ?? 1000)}
            onBlurCapture={() => setPeriod(tempPeriod)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur();
              }
            }}
          ></NumberInput>
        </Box>
      </Flex>
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
