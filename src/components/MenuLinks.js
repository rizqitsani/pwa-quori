import React from 'react';

import { Box, Stack } from '@chakra-ui/react';

import { useSelector } from 'react-redux';

import ColorModeSwitcher from './ColorModeSwitcher';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const MenuLinks = ({ isOpenMobile }) => {
  const firebase = useSelector((state) => state.firebase);
  const { auth } = firebase;

  const menuLinks = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;

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
        {menuLinks}
        <ColorModeSwitcher />
      </Stack>
    </Box>
  );
};

export default MenuLinks;
