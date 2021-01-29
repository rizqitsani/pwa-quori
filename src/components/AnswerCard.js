import React from 'react';

import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import { useSelector } from 'react-redux';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const AnswerCard = ({ body, createdAt, id, userID, userName }) => {
  const cardBg = useColorModeValue('gray.100', 'gray.700');

  const firebase = useSelector((state) => state.firebase);
  const { auth } = firebase;

  dayjs.extend(relativeTime);
  const formattedTime = dayjs(createdAt.toDate()).fromNow();

  return (
    <Box bg={cardBg} borderRadius='md' p={{ base: 6, md: 10 }} shadow='base'>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify='space-between'
        mb={4}
      >
        <Flex align='center'>
          <Avatar name={userName} mr={3} />
          <Flex direction='column'>
            <Text fontSize='md' fontWeight='bold'>
              {userName}
            </Text>
            <Text fontSize='xs'>{formattedTime}</Text>
          </Flex>
        </Flex>
        {userID === auth.uid ? (
          <Box mt={{ base: 6, md: 0 }}>
            <IconButton
              variant='outline'
              colorScheme='green'
              icon={<MdModeEdit />}
              mr={2}
            />
            <IconButton
              variant='outline'
              colorScheme='red'
              icon={<MdDelete />}
            />
          </Box>
        ) : null}
      </Flex>
      <Text>{body}</Text>
    </Box>
  );
};

export default AnswerCard;
