import React, { useEffect, useState } from 'react';

import {
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';

import { useFirestore } from 'react-redux-firebase';

import {
  CategoriesList,
  MainContainer,
  Navbar,
  ThreadCard,
} from '../../components';

const Categories = ({ match }) => {
  const firestore = useFirestore();

  const [threads, setThreads] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  let title = '';

  switch (match.params.name) {
    case 'web-development':
      title = 'Web Development';
      break;
    case 'android-development':
      title = 'Android Development';
      break;
    case 'front-end':
      title = 'Front End';
      break;
    case 'back-end':
      title = 'Back End';
      break;
    case 'other':
      title = 'Other';
      break;
    default:
      title = '';
      break;
  }

  useEffect(() => {
    const getThreadsByCategory = firestore
      .collection('threads')
      .where('categories', 'array-contains', title)
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
            createdAt: thread.data().createdAt.toDate(),
            title: thread.data().title,
          };

          threadList.push(details);
        });

        Promise.all(promises).then((snapshot) => {
          snapshot.forEach((user, index) => {
            threadList[index].userName = user.data().name;
          });

          setThreads(threadList);
          setisLoading(false);
        });
      });
    return () => {
      getThreadsByCategory();
    };
  }, [firestore, title]);

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
            <Heading>{`#${title}`}</Heading>
            <Skeleton isLoaded={!isLoading}>
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
            </Skeleton>
          </GridItem>
          <GridItem colSpan={1} />
        </Grid>
      </MainContainer>
    </>
  );
};

export default Categories;
