import React, { useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Flex,
  IconButton,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useSelector } from 'react-redux';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const schema = yup.object().shape({
  reply: yup.string().required('This field is required'),
});

const AnswerCard = ({ body, createdAt, id, userID, userName }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { errors, formState, handleSubmit, register } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const firebase = useSelector((state) => state.firebase);
  const { auth } = firebase;

  const cardBg = useColorModeValue('gray.100', 'gray.700');

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  const onSubmit = (data) => {
    setIsEditing(false);
  };

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
              onClick={handleEditClick}
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
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors?.reply?.message} mb={2}>
            <Textarea
              name='reply'
              defaultValue={body}
              ref={register}
              placeholder='Write your thoughts here...'
              size='sm'
              resize='vertical'
            />
            <FormErrorMessage>{errors?.reply?.message}</FormErrorMessage>
          </FormControl>
          <Button
            type='submit'
            isLoading={formState.isSubmitting}
            colorScheme='orange'
            size='sm'
          >
            Edit
          </Button>
        </form>
      ) : (
        <Text>{body}</Text>
      )}
    </Box>
  );
};

export default AnswerCard;
