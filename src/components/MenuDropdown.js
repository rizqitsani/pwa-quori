import React from 'react';

import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { MdPerson } from 'react-icons/md';

import { useDispatch } from 'react-redux';
import { signOut } from '../store/actions/authActions';

const MenuDropdown = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<MdPerson />}
        colorScheme='orange'
        variant={{ base: 'solid', md: 'ghost' }}
      />
      <MenuList>
        <MenuItem>Edit Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuDropdown;
