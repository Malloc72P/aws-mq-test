import { Box, Flex, NumberInput, SegmentedControl, Text } from '@mantine/core';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { CHART, RECTANGLE } from '../lib/constants';
import { random } from '../lib/utils';
import { sendMessage } from '../shared/mqtt';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const [period, setPeriod] = useState(1000);
  const [tempPeriod, setTempPeriod] = useState(1000);
  const degreeRef = useRef(0);
  const [mode, setMode] = useState<string>(RECTANGLE);
  const modeRef = useRef<string>(RECTANGLE);

  const buildMessage = useCallback(() => {
    switch (modeRef.current) {
      case RECTANGLE:
        degreeRef.current = (degreeRef.current + 50) % 360;
        return {
          topic: RECTANGLE,
          data: degreeRef.current,
        };
      case CHART:
        return {
          topic: CHART,
          data: [
            random({ min: 1, max: 20 }),
            random({ min: 1, max: 20 }),
            random({ min: 1, max: 20 }),
            random({ min: 1, max: 20 }),
            random({ min: 1, max: 20 }),
            random({ min: 1, max: 20 }),
            random({ min: 1, max: 20 }),
          ],
        };
      default:
        throw new Error('unknown topic');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const { topic, data } = buildMessage();

      console.debug(`send[${topic}] : `, data);

      sendMessage({
        topic,
        data: JSON.stringify({ data }),
      });
    }, period);

    return () => {
      clearInterval(interval);
    };
  }, [buildMessage, period]);

  return (
    <Box>
      <Flex h="60vh" direction="column" px="20vw" py="xl">
        <Box maw={600}>
          <Text size="xl" mb="md">
            테스트콘솔
          </Text>
          <SegmentedControl
            value={mode}
            onChange={(value) => {
              setMode(value);
              modeRef.current = value;
            }}
            size="lg"
            color="blue"
            data={[
              { label: '사각형', value: RECTANGLE },
              { label: '차트', value: CHART },
            ]}
          />

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
