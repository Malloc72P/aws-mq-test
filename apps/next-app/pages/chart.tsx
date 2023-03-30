import { Box, Flex } from '@mantine/core';
import { Chart } from 'chart.js/auto';
import { ReactElement, useEffect, useRef, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { CHART } from '../lib/constants';
import { subscribeMessage, unsubscribe } from '../shared/mqtt';
import { ChartResult } from '../types/dto';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const ctrlRef = useRef(false);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
  const [chart, setChart] = useState<Chart | undefined>();

  const isSubscribed = useRef(false);

  useEffect(() => {
    if (isSubscribed.current) {
      return;
    }
    isSubscribed.current = true;
    subscribeMessage({
      targetTopic: CHART,
      onReceive: (topic: string, message: Buffer) => {
        console.log(message.toString());
        const { data: receivedData } = JSON.parse(
          message.toString()
        ) as ChartResult;

        // 이해할 수 없는 메시지인 경우 무시한다.
        if (!Array.isArray(receivedData)) {
          return;
        }

        setData(receivedData);
      },
    });

    return () => {
      unsubscribe({ topic: CHART });
    };
  }, []);

  useEffect(() => {
    if (ctrlRef.current) {
      return;
    }
    if (!chartRef.current) {
      return;
    }
    ctrlRef.current = true;

    const _chart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'],
        datasets: [
          {
            label: 'label',
            data: [],
          },
        ],
      },
    });

    setChart(_chart);
  }, []);

  useEffect(() => {
    if (!chart) {
      return;
    }

    chart.data.datasets = [
      {
        label: 'label',
        data,
      },
    ];
    chart.update();
  }, [chart, data]);

  return (
    <Box>
      <Flex h="60vh" justify="center" align="center">
        <canvas
          ref={chartRef}
          style={{ width: '640px', height: '480px' }}
        ></canvas>
      </Flex>
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
