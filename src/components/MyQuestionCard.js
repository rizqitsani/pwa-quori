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
  FormControl,
  FormErrorMessage,
  Heading,
  IconButton,
  Input,
  Link,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import { Link as RouterLink } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';
import { deleteThread, editThread } from '../store/actions/threadActions';

import CategoriesLabel from './CategoriesLabel';

const schema = yup.object().shape({
  title: yup.string().required('This field is required'),
});

const EditForm = ({
  categories,
  errors,
  formState,
  handleSubmit,
  onCloseDelete,
  onSubmit,
  register,
  title,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors?.title?.message} mb={4}>
        <Input
          type='text'
          name='title'
          defaultValue={title}
          placeholder='Start it with "What", "Why", "How", etc.'
          ref={register}
          autoComplete='off'
        />
        <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors?.category?.message}>
        <Select
          name='category'
          defaultValue={categories[0]}
          ref={register}
          placeholder='Select a category...'
        >
          <option value='Web Development'>Web Development</option>
          <option value='Android Development'>Android Development</option>
          <option value='Front End'>Front End</option>
          <option value='Back End'>Back End</option>
          <option value='Other'>Other</option>
        </Select>
        <FormErrorMessage>{errors?.category?.message}</FormErrorMessage>
      </FormControl>
      <Button
        type='submit'
        disabled={!!errors.title}
        isLoading={formState.isSubmitting}
        colorScheme='orange'
        onClick={onCloseDelete}
        my={4}
      >
        Edit
      </Button>
    </form>
  );
};

const MyQuestionCard = ({ categories, id, title }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [formValue, setFormValue] = useState({});
  const cancelRefDelete = useRef();
  const cancelRefEdit = useRef();

  const { errors, formState, handleSubmit, register } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const cardBg = useColorModeValue('gray.100', 'gray.700');

  const onCloseDelete = () => setIsOpenDelete(false);
  const onOpenDelete = () => setIsOpenDelete(true);

  const onCloseEdit = () => setIsOpenEdit(false);
  const onOpenEdit = () => setIsOpenEdit(true);

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleDeleteClick = () => {
    dispatch(deleteThread(id));
    setIsOpenDelete(false);
  };

  const handleSubmitEdit = () => {
    if (formValue.category !== categories[0] || formValue.title !== title)
      dispatch(editThread({ ...formValue, threadID: id }));

    setIsOpenEdit(false);
    setIsEditing(false);
  };

  const onSubmit = (editedData) => {
    setFormValue(editedData);
    onOpenEdit();
  };

  return (
    <>
      <Box bg={cardBg} borderRadius='md' p={6} shadow='base'>
        <Flex direction={isEditing ? 'column' : 'row'} justify='space-between'>
          {isEditing ? (
            <EditForm
              categories={categories}
              errors={errors}
              formState={formState}
              handleSubmit={handleSubmit}
              onCloseDelete={onCloseDelete}
              onSubmit={onSubmit}
              register={register}
              title={title}
            />
          ) : (
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
          )}
          <Box mt={isEditing ? 0 : 4}>
            <IconButton
              onClick={handleEditClick}
              variant='outline'
              colorScheme='green'
              icon={<MdModeEdit />}
              mr={2}
            />
            <IconButton
              onClick={onOpenDelete}
              variant='outline'
              colorScheme='red'
              icon={<MdDelete />}
            />
          </Box>
        </Flex>
      </Box>
      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRefDelete}
        onClose={onCloseDelete}
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
              <Button ref={cancelRefDelete} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button colorScheme='orange' onClick={handleDeleteClick} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog
        isOpen={isOpenEdit}
        leastDestructiveRef={cancelRefEdit}
        onClose={onCloseEdit}
        motionPreset='slideInBottom'
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Edit Thread
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? Since you are changing the topic, all thoughts
              related to this will be deleted. You can't undo this action
              afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRefEdit} onClick={onCloseEdit}>
                Cancel
              </Button>
              <Button colorScheme='orange' onClick={handleSubmitEdit} ml={3}>
                Yes, I'm sure
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default MyQuestionCard;
