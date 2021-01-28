import React, { useRef } from 'react';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('This field is required'),
});

const AddThreadModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initRef = useRef();

  const { register, handleSubmit, formState, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(data));
        resolve();
      }, 3000);
    });
  };

  return (
    <>
      <Button leftIcon={<MdAdd />} onClick={onOpen} colorScheme='orange'>
        Ask a Question
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
        closeOnOverlayClick={false}
        motionPreset='slideInBottom'
        scrollBehavior='outside'
        initialFocusRef={initRef}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent px={4} py={8}>
            <ModalHeader>Ask a Question</ModalHeader>
            <ModalCloseButton />
            <ModalBody my={2}>
              <FormControl isInvalid={!!errors?.title?.message} mb={4}>
                <FormLabel mb={4}>You're asking about...</FormLabel>
                <Input
                  type='text'
                  name='title'
                  placeholder='Start it with "What", "Why", "How", etc.'
                  ref={(e) => {
                    register(e);
                    initRef.current = e; // you can still assign to ref
                  }}
                />
                <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.category?.message}>
                <Select
                  name='category'
                  ref={register}
                  placeholder='Select a category...'
                >
                  <option value='Web Development'>Web Development</option>
                  <option value='Android Development'>
                    Android Development
                  </option>
                  <option value='Front End'>Front End</option>
                  <option value='Back End'>Back End</option>
                  <option value='Other'>Other</option>
                </Select>
                <FormErrorMessage>{errors?.category?.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                type='submit'
                disabled={!!errors.title}
                isLoading={formState.isSubmitting}
                colorScheme='orange'
                onClick={onClose}
              >
                Add Question
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default AddThreadModal;
