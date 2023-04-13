import { Box, Button, Flex, NumberInput, Text } from '@mantine/core';
import { nanoid } from 'nanoid';
import { ReactElement, useEffect, useRef, useState } from 'react';
import DefaultLayout from '../../components/DefaultLayout';
import { CHANNEL_ID, useCometD } from '../../lib/useCometD';
import { getCircleXY } from '../../lib/utils';
import { NextPageWithLayout } from '../_app';

const Home: NextPageWithLayout = () => {
  const [period, setPeriod] = useState(50);
  const [tempPeriod, setTempPeriod] = useState(50);
  const [periodBeforeStop, setPeriodBeforeStop] = useState(-1);
  const { cometd } = useCometD();
  const radianRef = useRef<number>(0);
  const [producerId] = useState(nanoid(12));

  useEffect(() => {
    if (!cometd) {
      return;
    }
    const interval = setInterval(() => {
      radianRef.current++;
      if (radianRef.current >= 360) {
        radianRef.current = 0;
      }

      const { x, y } = getCircleXY({
        degree: radianRef.current,
        radius: 200,
      });

      const message = {
        x,
        y,
        producerId,
        time: new Date(),
      };
      cometd.publish(CHANNEL_ID, message);
    }, period);

    return () => {
      clearInterval(interval);
    };
  }, [cometd, period, producerId]);

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
          <Flex gap="md">
            <Button
              disabled={periodBeforeStop !== -1}
              onClick={() => {
                setPeriodBeforeStop(period);
                const INFINITE = 99999999999;
                setTempPeriod(INFINITE);
                setPeriod(INFINITE);
              }}
            >
              Stop
            </Button>
            {periodBeforeStop !== -1 && (
              <Button
                onClick={() => {
                  setTempPeriod(periodBeforeStop);
                  setPeriod(periodBeforeStop);
                  setPeriodBeforeStop(-1);
                }}
              >
                Resume
              </Button>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
