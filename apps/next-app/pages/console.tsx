import { Box, Flex, Text } from '@mantine/core';
import { ReactElement, useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const [deg, setDeg] = useState(0);
  const [step, setStep] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setDeg((v) => {
        return v + step;
      });
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [step]);

  return (
    <Box>
      <Flex h="60vh" justify="center" align="center">
        <Text>테스트콘솔</Text>
      </Flex>
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
