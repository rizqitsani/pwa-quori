import React from 'react';

import { Flex, useColorModeValue } from '@chakra-ui/react';

const NavbarContainer = ({ children, ...props }) => {
  const bg = useColorModeValue(
    ['orange.500', 'orange.500', 'transparent', 'transparent'],
    ['orange.200', 'orange.200', 'transparent', 'transparent'],
  );
  const color = useColorModeValue(
    ['white', 'white', 'orange.500', 'orange.500'],
    ['orange.900', 'orange.900', 'orange.200', 'orange.200'],
  );

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      w='100%'
      mb={8}
      px={{ base: 8, md: 32 }}
      py={8}
      bg={bg}
      color={color}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavbarContainer;
