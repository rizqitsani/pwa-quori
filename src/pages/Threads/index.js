import React from 'react';

import { Grid, GridItem } from '@chakra-ui/react';

import { MainContainer, Navbar, ThreadCard } from '../../components';

const Threads = () => {
  return (
    <>
      <Navbar />
      <MainContainer>
        <Grid h='200px' templateColumns='repeat(5, 1fr)' gap={4}>
          <GridItem colSpan={1} />
          <GridItem colSpan={3}>
            <ThreadCard />
            <ThreadCard />
          </GridItem>
          <GridItem colSpan={1} />
        </Grid>
      </MainContainer>
    </>
  );
};

export default Threads;
