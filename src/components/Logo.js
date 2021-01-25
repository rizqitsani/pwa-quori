import React from 'react';

import { Box, Link, Text } from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

const Logo = (props) => {
  return (
    <Box {...props}>
      <Text fontSize='lg' fontWeight='bold'>
        <Link as={RouterLink} to='/'>
          Quori
        </Link>
      </Text>
    </Box>
  );
};

export default Logo;
