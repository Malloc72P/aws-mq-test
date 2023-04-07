import { Box, Flex } from '@mantine/core';
import { ReactElement } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useCommonStyles } from '../lib/styles';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
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
