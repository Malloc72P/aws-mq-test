import { Box, Flex } from '@mantine/core';

import { ReactElement, useEffect, useRef } from 'react';
import DefaultLayout from '../../components/DefaultLayout';
import { useCommonStyles } from '../../lib/styles';
import { CHANNEL_ID, useCometD } from '../../lib/useCometD';
import { NextPageWithLayout } from '../_app';

const Home: NextPageWithLayout = () => {
  const { cometd } = useCometD();
  const lock = useRef<boolean>(false);

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
        console.log('received >>> ', message);
      },
      () => {
        console.log('start subscribe');
      }
    );
  }, [cometd]);

  const {
    classes: { spacer, zeroBasis },
    cx,
  } = useCommonStyles();

  return (
    <Box>
      <Flex h="60vh" justify="center" align="center">
        <Box className={cx(spacer, zeroBasis)}></Box>
      </Flex>
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
