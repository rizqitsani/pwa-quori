import React, { useRef } from 'react';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

const AddThreadModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initRef = useRef();

  return (
    <>
      <Button leftIcon={<MdAdd />} onClick={onOpen}>
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
        <form>
          <ModalContent px={4} py={8}>
            <ModalHeader>Ask a Question</ModalHeader>
            <ModalCloseButton />
            <ModalBody my={2}>
              <FormControl name='title'>
                <FormLabel mb={4}>You're asking about...</FormLabel>
                <Input
                  type='text'
                  placeholder='Start it with "What", "Why", "How", etc.'
                  ref={initRef}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button variant='ghost' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type='submit' colorScheme='orange' onClick={onClose}>
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
