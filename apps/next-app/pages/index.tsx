import { Box, Flex } from '@mantine/core';
import { ReactElement, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { DivRotator } from '../components/DivRotator';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const [deg, setDeg] = useState(0);

  return (
    <Box>
      <Flex h="60vh" justify="center" align="center">
        <DivRotator w={100} h={100} bg="blue" rotationDegree={deg} />
      </Flex>
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
