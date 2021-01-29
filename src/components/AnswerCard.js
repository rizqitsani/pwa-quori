import React, { useRef, useState } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
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

import { useDispatch, useSelector } from 'react-redux';
import { deleteReply, editReply } from '../store/actions/replyActions';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const schema = yup.object().shape({
  reply: yup.string().required('This field is required'),
});

const AnswerCard = ({ body, createdAt, id, userID, userName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();

  const { errors, formState, handleSubmit, register } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const firebase = useSelector((state) => state.firebase);
  const { auth } = firebase;

  const cardBg = useColorModeValue('gray.100', 'gray.700');

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleDeleteClick = () => {
    dispatch(deleteReply(id));
    setIsOpen(false);
  };

  const onSubmit = (editedData) => {
    if (editedData.reply !== body)
      dispatch(editReply({ ...editedData, replyID: id }));

    setIsEditing(false);
  };

  dayjs.extend(relativeTime);
  const formattedTime = dayjs(createdAt.toDate()).fromNow();

  return (
    <>
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
                onClick={onOpen}
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

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        motionPreset='slideInBottom'
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Reply
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='orange' onClick={handleDeleteClick} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AnswerCard;
