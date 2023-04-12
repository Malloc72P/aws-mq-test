import { Box, Flex, NumberInput, Text } from '@mantine/core';
import { ReactElement, useEffect, useState } from 'react';
import DefaultLayout from '../../components/DefaultLayout';
import { CHANNEL_ID, useCometD } from '../../lib/useCometD';
import { NextPageWithLayout } from '../_app';

const Home: NextPageWithLayout = () => {
  const [period, setPeriod] = useState(1000);
  const [tempPeriod, setTempPeriod] = useState(1000);
  const { cometd } = useCometD();

  useEffect(() => {
    if (!cometd) {
      return;
    }
    const interval = setInterval(() => {
      cometd.publish(CHANNEL_ID, 'ping', () => console.log('published'));
    }, period);

    return () => {
      clearInterval(interval);
    };
  }, [cometd, period]);

  return (
    <Box>
      <Flex h="60vh" direction="column" px="20vw" py="xl">
        <Box maw={600}>
          <Text size="xl" mb="md">
            CometD 테스트콘솔
          </Text>

          <Box my="xl"></Box>

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
