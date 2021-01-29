import React, { useEffect, useState } from 'react';

import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { MdComment } from 'react-icons/md';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { AnswerCard, MainContainer, Navbar } from '../../components';
import { addReply } from '../../store/actions/replyActions';

const schema = yup.object().shape({
  reply: yup.string().required('This field is required'),
});

const ThreadDetails = ({ match }) => {
  const firestore = useFirestore();

  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState({});
  const [replies, setReplies] = useState([]);

  const { errors, formState, handleSubmit, register, reset } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const { id: threadID } = match.params;

  const dispatch = useDispatch();

  const firebase = useSelector((state) => state.firebase);
  const { auth } = firebase;

  const handleAnswerClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onSubmit = (data) => {
    dispatch(addReply({ ...data, threadID }));
    reset();
  };

  useEffect(() => {
    const getThreadDetails = firestore
      .collection('threads')
      .doc(threadID)
      .onSnapshot((querySnapshot) => {
        const details = {};
        const promises = [];

        promises.push(
          firestore.collection('users').doc(querySnapshot.data().userID).get(),
        );

        details.categories = querySnapshot.data().categories;
        details.createdAt = querySnapshot.data().createdAt.toDate();
        details.title = querySnapshot.data().title;

        Promise.all(promises).then((snapshot) => {
          snapshot.forEach((user) => {
            details.userID = user.id;
            details.userName = user.data().name;
          });
          setDetails(details);
        });
      });

    const getReplies = firestore
      .collection('replies')
      .where('threadID', '==', threadID)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const replyList = [];
        const promises = [];

        querySnapshot.forEach((reply) => {
          promises.push(
            firestore.collection('users').doc(reply.data().userID).get(),
          );
          const details = {
            replyID: reply.id,
            body: reply.data().body,
            createdAt: reply.data().createdAt,
          };
          replyList.push(details);
        });

        Promise.all(promises).then((snapshot) => {
          snapshot.forEach((user, index) => {
            replyList[index].userID = user.id;
            replyList[index].userName = user.data().name;
          });
          setReplies(replyList);
        });
      });

    return () => {
      getThreadDetails();
      getReplies();
    };
  }, [firestore, threadID]);

  dayjs.extend(relativeTime);

  return (
    <>
      <Navbar />
      <MainContainer>
        <Grid h='200px' templateColumns='repeat(5, 1fr)' gap={4}>
          <GridItem colStart={{ base: 1, md: 2 }} colEnd={{ base: 6, md: 5 }}>
            <Heading>{`#${details.title}`}</Heading>
            <Text mt={4}>{`Asked by ${details.userName} · ${dayjs(
              details.createdAt,
            ).fromNow()}`}</Text>
            {details.userID !== auth.uid ? (
              <Button
                onClick={handleAnswerClick}
                leftIcon={<MdComment />}
                colorScheme='orange'
                variant='outline'
                my={6}
              >
                Answer
              </Button>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors?.reply?.message} mb={4}>
                <Textarea
                  name='reply'
                  ref={register}
                  display={{ base: isOpen ? 'block' : 'none' }}
                  placeholder='Write your thoughts here...'
                  size='sm'
                  resize='vertical'
                  mb={4}
                />
                <FormErrorMessage>{errors?.reply?.message}</FormErrorMessage>
              </FormControl>
              <Button
                type='submit'
                isLoading={formState.isSubmitting}
                display={{ base: isOpen ? 'block' : 'none' }}
                colorScheme='orange'
              >
                Share
              </Button>
            </form>
            <Divider my={4} />
            {replies.length > 0 ? (
              <Text fontSize='lg' fontWeight='bold'>
                {`${replies.length} Thoughts`}
              </Text>
            ) : null}
            <Text fontSize='lg' fontWeight='bold'></Text>
            <Stack spacing={8} my={8}>
              {replies.length > 0 ? (
                Object.values(replies).map((reply) => {
                  return (
                    <AnswerCard
                      key={reply.replyID}
                      id={reply.replyID}
                      body={reply.body}
                      createdAt={reply.createdAt}
                      userID={reply.userID}
                      userName={reply.userName}
                    />
                  );
                })
              ) : (
                <Alert status='info'>
                  <AlertIcon />
                  Nobody have shared their thoughts on this!
                </Alert>
              )}
            </Stack>
          </GridItem>
          <GridItem colSpan={1}></GridItem>
        </Grid>
      </MainContainer>
    </>
  );
};

export default ThreadDetails;
