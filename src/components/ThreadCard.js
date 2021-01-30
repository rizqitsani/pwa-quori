import React, { useEffect, useState } from 'react';

import {
  Avatar,
  Box,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

import { useFirestore } from 'react-redux-firebase';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import CategoriesLabel from './CategoriesLabel';

const ThreadCard = ({ categories, id, title }) => {
  const firestore = useFirestore();

  const [details, setDetails] = useState({});

  const cardBg = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    const getLatestReply = firestore
      .collection('replies')
      .where('threadID', '==', id)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .onSnapshot((querySnapshot) => {
        const replyDetails = {};
        const promises = [];

        querySnapshot.forEach((reply) => {
          promises.push(
            firestore.collection('users').doc(reply.data().userID).get(),
          );

          replyDetails.replyID = reply.id;
          replyDetails.body = reply.data().body;
          replyDetails.createdAt = reply.data().createdAt.toDate();
        });

        Promise.all(promises).then((snapshot) => {
          snapshot.forEach((user) => {
            replyDetails.userName = user.data().name;
          });

          setDetails(replyDetails);
        });
      });

    return () => {
      getLatestReply();
    };
  }, [firestore, id]);

  dayjs.extend(relativeTime);
  const formattedTime = dayjs(details.createdAt).fromNow();

  return (
    <Box bg={cardBg} borderRadius='md' p={{ base: 6, md: 10 }} shadow='base'>
      {details.body ? (
        <Flex align='center' mb={4}>
          <Avatar name={details.userName} mr={3} />
          <Flex direction='column'>
            <Text fontSize='md' fontWeight='bold'>
              {details.userName}
            </Text>
            <Text fontSize='xs'>{formattedTime}</Text>
          </Flex>
        </Flex>
      ) : null}
      <Link as={RouterLink} to={`/thread/${id}`}>
        <Heading fontSize='2xl' mb={4}>
          {title}
        </Heading>
      </Link>
      <CategoriesLabel categories={categories} />
      {details.body ? <Text>{details.body}</Text> : null}
    </Box>
  );
};

export default ThreadCard;
