import React from 'react';

import { Box, Link, Stack, Text } from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

import ColorModeSwitcher from './ColorModeSwitcher';
import AddThreadModal from './AddThreadModal';

const MenuItem = ({ children, isLast, to = '/', ...rest }) => {
  return (
    <Link as={RouterLink} to={to}>
      <Text fontWeight='bold' display='block' {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpenMobile }) => {
  return (
    <Box
      display={{ base: isOpenMobile ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align='center'
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to='/mythreads'>My Threads</MenuItem>
        <AddThreadModal />
        <ColorModeSwitcher />
      </Stack>
    </Box>
  );
};

export default MenuLinks;
