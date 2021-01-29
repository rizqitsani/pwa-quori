import React, { useEffect, useState } from 'react';

import {
  Alert,
  AlertIcon,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

import {
  MyAnswerCard,
  CategoriesList,
  MainContainer,
  MyQuestionCard,
  Navbar,
} from '../../components';

const MyThreads = () => {
  const firestore = useFirestore();

  const [myQuestions, setMyQuestions] = useState([]);
  const [myAnswers, setMyAnswers] = useState([]);

  const firebase = useSelector((state) => state.firebase);
  const { auth } = firebase;

  // Get myQuestions
  useEffect(() => {
    const unsubscribe = firestore
      .collection('threads')
      .where('userID', '==', auth.uid)
      .onSnapshot((querySnapshot) => {
        const threadList = [];

        querySnapshot.forEach((thread) => {
          const details = {
            threadID: thread.id,
            categories: thread.data().categories,
            title: thread.data().title,
          };

          threadList.push(details);
        });

        setMyQuestions(threadList);
      });

    return () => {
      unsubscribe();
    };
  }, [auth.uid, firestore]);

  // Get myAnswers
  useEffect(() => {
    const unsubscribe = firestore
      .collection('replies')
      .where('userID', '==', auth.uid)
      .onSnapshot((querySnapshot) => {
        const replyList = [];
        const promises = [];

        querySnapshot.forEach((reply) => {
          promises.push(
            firestore.collection('threads').doc(reply.data().threadID).get(),
          );

          const details = {
            replyID: reply.id,
            body: reply.data().body,
          };

          replyList.push(details);
        });

        Promise.all(promises).then((snapshot) => {
          snapshot.forEach((thread, index) => {
            replyList[index].categories = thread.data().categories;
            replyList[index].title = thread.data().title;
          });
          setMyAnswers(replyList);
        });
      });

    return () => {
      unsubscribe();
    };
  }, [auth.uid, firestore]);

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
              {myQuestions.length ? (
                Object.values(myQuestions).map((thread) => {
                  console.log(thread.threadID);
                  return (
                    <MyQuestionCard
                      key={thread.threadID}
                      id={thread.threadID}
                      categories={thread.categories}
                      title={thread.title}
                    />
                  );
                })
              ) : (
                <Alert status='info'>
                  <AlertIcon />
                  You haven't asked any questions!
                </Alert>
              )}
            </Stack>
            <Heading>#My Thoughts</Heading>
            <Stack spacing={8} my={8}>
              {myAnswers.length ? (
                Object.values(myAnswers).map((reply) => {
                  return (
                    <MyAnswerCard
                      key={reply.replyID}
                      body={reply.body}
                      categories={reply.categories}
                      title={reply.title}
                    />
                  );
                })
              ) : (
                <Alert status='warning'>
                  <AlertIcon />
                  You haven't share your thoughts to others!
                </Alert>
              )}
            </Stack>
          </GridItem>
          <GridItem colSpan={1} />
        </Grid>
      </MainContainer>
    </>
  );
};

export default MyThreads;
