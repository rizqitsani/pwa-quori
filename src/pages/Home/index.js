import React from 'react';

import { Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import {
  CategoriesList,
  MainContainer,
  Navbar,
  ThreadCard,
} from '../../components';

const Home = () => {
  useFirestoreConnect(['threads', 'users']);

  const threads = useSelector((state) => state.firestore.ordered.threads);

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
            <Heading>#Threads</Heading>
            <Stack spacing={8} my={8}>
              {threads &&
                Object.values(threads).map((thread) => (
                  <ThreadCard
                    key={thread.threadID}
                    categories={thread.categories}
                    createdAt={thread.createdAt}
                    title={thread.title}
                    userName={thread.userName}
                  />
                ))}
            </Stack>
          </GridItem>
          <GridItem colSpan={1} />
        </Grid>
      </MainContainer>
    </>
  );
};

export default Home;
