import React, { useEffect, useState } from 'react';

import { Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';

import { useFirestore } from 'react-redux-firebase';

import {
  CategoriesList,
  MainContainer,
  Navbar,
  ThreadCard,
} from '../../components';

const Home = () => {
  const firestore = useFirestore();

  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const getThreads = firestore
      .collection('threads')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const threadList = [];
        const promises = [];

        querySnapshot.forEach((thread) => {
          promises.push(
            firestore.collection('users').doc(thread.data().userID).get(),
          );
          const details = {
            threadID: thread.id,
            categories: thread.data().categories,
            createdAt: thread.data().createdAt,
            threadId: thread.id,
            title: thread.data().title,
          };
          threadList.push(details);
        });

        Promise.all(promises).then((snapshot) => {
          snapshot.forEach((user, index) => {
            threadList[index].userName = user.data().name;
          });
          setThreads(threadList);
        });
      });
    return () => {
      getThreads();
    };
  }, [firestore]);

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
                Object.values(threads).map((thread) => {
                  return (
                    <ThreadCard
                      key={thread.threadID}
                      id={thread.threadID}
                      categories={thread.categories}
                      createdAt={thread.createdAt}
                      title={thread.title}
                      userName={thread.userName}
                    />
                  );
                })}
            </Stack>
          </GridItem>
          <GridItem colSpan={1} />
        </Grid>
      </MainContainer>
    </>
  );
};

export default Home;
