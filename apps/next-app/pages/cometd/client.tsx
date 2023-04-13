import { Button, Card, Flex, Text } from '@mantine/core';
import { ReactElement, useEffect, useRef, useState } from 'react';
import DefaultLayout from '../../components/DefaultLayout';
import { CANVAS_WIDTH } from '../../lib/constants';
import { CHANNEL_ID, useCometD } from '../../lib/useCometD';

export interface MessageType {
  x: number;
  y: number;
  time: string;
  producerId: string;
}

const Home = () => {
  const { cometd } = useCometD();
  const lock = useRef<boolean>(false);
  const canvasElelemnt = useRef<HTMLCanvasElement>(null);
  const counterRef = useRef<number>(0);
  const [mps, setMps] = useState<number>(0);
  const [unitMap] = useState<Map<string, { x: number; y: number }>>(new Map());

  useEffect(() => {
    const interval = setInterval(() => {
      const nextMPS = counterRef.current;
      counterRef.current = 0;
      setMps(nextMPS);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (lock.current) {
      return;
    }
    if (!cometd) {
      return;
    }
    lock.current = true;
    console.log(cometd);

    cometd.subscribe(
      CHANNEL_ID,
      (message) => {
        counterRef.current++;
        if (!canvasElelemnt.current) {
          return;
        }

        console.log('received >>> ', message);
        const { producerId, x, y } = message.data as MessageType;
        unitMap.set(producerId, { x, y });
        draw({ canvasElelemnt: canvasElelemnt.current, unitMap });
      },
      () => {
        console.log('start subscribe');
      }
    );
  }, [cometd, unitMap]);

  return (
    <Flex h="100%" justify="center">
      <Card w={300} h={370} shadow="md" withBorder radius="md">
        <Card.Section p="md" withBorder style={{ position: 'relative' }}>
          <canvas
            width={CANVAS_WIDTH}
            height={CANVAS_WIDTH}
            ref={canvasElelemnt}
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid lightgray',
              backgroundImage: 'url(/grid.png)',
              backgroundSize: '100%',
            }}
          />
        </Card.Section>
        <Card.Section p="md">
          <Flex justify="flex-end" align="center">
            <Text pr="sm">MPS: {mps}</Text>
            <Button
              onClick={() => {
                if (!canvasElelemnt.current) {
                  return;
                }
                const ctx = canvasElelemnt.current.getContext('2d');
                if (!ctx) {
                  return;
                }
                ctx.clearRect(
                  0,
                  0,
                  canvasElelemnt.current.width,
                  canvasElelemnt.current.height
                );
              }}
            >
              Clear
            </Button>
          </Flex>
        </Card.Section>
      </Card>
    </Flex>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;

export interface DrawProps {
  canvasElelemnt: HTMLCanvasElement;
  unitMap: Map<string, { x: number; y: number }>;
}

const draw = ({ canvasElelemnt, unitMap }: DrawProps) => {
  const ctx = canvasElelemnt.getContext('2d');
  if (!ctx) {
    return;
  }
  ctx.clearRect(0, 0, canvasElelemnt.width, canvasElelemnt.height);
  unitMap.forEach(({ x, y }, producerId) => {
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(x, y, 16, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  });
};
