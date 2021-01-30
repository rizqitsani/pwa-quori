import React, { useRef, useState } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdPerson } from 'react-icons/md';

import { Link as RouterLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { deleteProfile, signOut } from '../store/actions/authActions';

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmValue, setConfirmValue] = useState('');
  const cancelRef = useRef();

  const menuItemColor = useColorModeValue('black', 'orange.200');

  const dispatch = useDispatch();

  const firebase = useSelector((state) => state.firebase);
  const { auth } = firebase;
  const id = auth.uid.substring(0, 7);

  const handleLogout = () => {
    dispatch(signOut());
  };

  const onClose = () => setIsOpen(false);

  const onOpen = () => setIsOpen(true);

  const onSubmit = (event) => {
    dispatch(deleteProfile());
    event.preventDefault();
    setConfirmValue('');
    onClose();
  };

  return (
    <>
      <Menu isLazy placement='auto'>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<MdPerson />}
          colorScheme='orange'
          variant={{ base: 'solid', md: 'ghost' }}
        />
        <MenuList>
          <Link as={RouterLink} to='/edit-profile'>
            <MenuItem color={menuItemColor}>Edit Profile</MenuItem>
          </Link>
          <MenuItem color={menuItemColor} onClick={onOpen}>
            Delete Profile
          </MenuItem>
          <MenuItem color={menuItemColor} onClick={handleLogout}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        motionPreset='slideInBottom'
      >
        <AlertDialogOverlay>
          <form onSubmit={onSubmit}>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Account
              </AlertDialogHeader>

              <AlertDialogBody>
                <FormControl mb={4}>
                  <Text mb={4}>
                    This action cannot be undone. This will permanently delete
                    your account, threads, and replies.
                  </Text>
                  <FormLabel
                    mb={4}
                  >{`Please type ${id} to confirm.`}</FormLabel>
                  <Input
                    type='text'
                    name='confirmation'
                    value={confirmValue}
                    onChange={(e) => setConfirmValue(e.target.value)}
                    placeholder={id}
                    autoComplete='off'
                  />
                </FormControl>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={confirmValue !== id}
                  colorScheme='orange'
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </form>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default MenuDropdown;
