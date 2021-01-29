import React, { useRef, useState } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

import { Link as RouterLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { deleteThread } from '../store/actions/threadActions';

import CategoriesLabel from './CategoriesLabel';

const MyQuestionCard = ({ categories, id, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();

  const dispatch = useDispatch();

  const cardBg = useColorModeValue('gray.100', 'gray.700');

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleDeleteClick = () => {
    dispatch(deleteThread(id));
    setIsOpen(false);
  };

  return (
    <>
      <Box bg={cardBg} borderRadius='md' p={6} shadow='base'>
        <Flex justify='space-between'>
          <Box>
            <Link as={RouterLink} to={`/thread/${id}`}>
              <Heading fontSize='2xl' mb={4}>
                {title}
              </Heading>
            </Link>
            {categories ? (
              <CategoriesLabel categories={categories} mb={0} />
            ) : null}
          </Box>
          <IconButton
            onClick={onOpen}
            variant='outline'
            colorScheme='red'
            icon={<MdDelete />}
          />
        </Flex>
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
              Delete Thread
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? All thoughts related to this will also be deleted.
              You can't undo this action afterwards.
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

export default MyQuestionCard;
