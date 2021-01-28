import React from 'react';

import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { MdPerson } from 'react-icons/md';

const MenuDropdown = () => {
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
        <MenuGroup title='Profile'>
          <MenuItem>My Account</MenuItem>
          <MenuItem>Payments </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title='Help'>
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default MenuDropdown;
