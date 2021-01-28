import React from 'react';

import { Box, Stack } from '@chakra-ui/react';

import ColorModeSwitcher from './ColorModeSwitcher';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

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
        <SignedInLinks />
        <SignedOutLinks />
        <ColorModeSwitcher />
      </Stack>
    </Box>
  );
};

export default MenuLinks;
