import React, { useEffect, useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdComment } from 'react-icons/md';

import { Link as RouterLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import CategoriesLabel from './CategoriesLabel';

const ThreadCard = ({ categories, createdAt, id, title, userName }) => {
  const firestore = useFirestore();

  const [details, setDetails] = useState({});

  const firebase = useSelector((state) => state.firebase);
  const { name: currentUserName } = firebase.profile;

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
        <Heading fontSize='2xl' mb={details.body ? 4 : 0}>
          {title}
        </Heading>
      </Link>
      {details.body ? null : (
        <Text fontSize='sm' my={2}>{`Asked by ${userName} · ${dayjs(
          createdAt.toDate(),
        ).fromNow()}`}</Text>
      )}
      <CategoriesLabel categories={categories} />
      {details.body ? (
        <Text>{details.body}</Text>
      ) : userName !== currentUserName ? (
        <Link as={RouterLink} to={`/thread/${id}`}>
          <Button
            leftIcon={<MdComment />}
            colorScheme='orange'
            variant='outline'
            size='sm'
            mt={1}
          >
            Answer
          </Button>
        </Link>
      ) : null}
    </Box>
  );
};

export default ThreadCard;
