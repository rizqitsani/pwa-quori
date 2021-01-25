import React from 'react';

import { Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';

import {
  AnswerCard,
  CategoriesList,
  MainContainer,
  Navbar,
  ThreadCard,
} from '../../components';

const MyThreads = () => {
  return (
    <>
      <Navbar />
      <MainContainer>
        <Grid h='200px' templateColumns='repeat(5, 1fr)' gap={4}>
          <GridItem colSpan={{ base: 5, md: 1 }}>
            <Text fontWeight='bold' mb={4}>
              Categories
            </Text>
            <CategoriesList />
          </GridItem>
          <GridItem colSpan={{ base: 5, md: 3 }}>
            <Heading>#I'm curious about</Heading>
            <Stack spacing={8} my={8}>
              <ThreadCard />
              <ThreadCard />
            </Stack>
            <Heading>#My Thoughts</Heading>
            <Stack spacing={8} my={8}>
              <AnswerCard />
              <AnswerCard />
            </Stack>
          </GridItem>
          <GridItem colSpan={1} />
        </Grid>
      </MainContainer>
    </>
  );
};

export default MyThreads;
