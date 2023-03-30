import { Box, Card, Flex, ScrollArea, Text } from '@mantine/core';
import { useEffect, useRef } from 'react';
import { useCommonStyles, useMessageDisplayerStyle } from '../lib/styles';
import { DTO } from '../types/dto';

interface ReceivedDataProps {
  data: DTO[];
}

export const ReceivedData = ({ data }: ReceivedDataProps) => {
  const viewport = useRef<HTMLDivElement>(null);
  const {
    classes: { header, message, timestamp },
  } = useMessageDisplayerStyle();
  const {
    classes: { spacer, zeroBasis, fullWidthHeight },
    cx,
  } = useCommonStyles();

  useEffect(() => {
    if (!viewport.current) {
      return;
    }

    viewport.current.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [data]);

  return (
    <Box pr="10vw" py="xl" className={fullWidthHeight}>
      <Card
        className={fullWidthHeight}
        withBorder
        p="lg"
        shadow="md"
        radius="md"
      >
        <Card.Section withBorder>
          <Text px="md" className={header}>
            Received Message
          </Text>
        </Card.Section>
        <Card.Section>
          <ScrollArea p="md" h={500} viewportRef={viewport}>
            {data.map(({ producerId, date, data }) => (
              <Flex
                key={`${producerId}-${date.getTime()}`}
                gap="xs"
                className={message}
                fz="xs"
              >
                <Text weight="bolder">{producerId}</Text>
                <Text>{JSON.stringify({ data })}</Text>
                <span className={cx(spacer, zeroBasis)}></span>
                <Text
                  className={timestamp}
                >{`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</Text>
              </Flex>
            ))}
          </ScrollArea>
        </Card.Section>
      </Card>
    </Box>
  );
};
