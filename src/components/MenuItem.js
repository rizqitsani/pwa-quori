import React from 'react';

import { Link, Text } from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

const MenuItem = ({ children, isLast, to = '/', ...rest }) => {
  return (
    <Link as={RouterLink} to={to}>
      <Text fontWeight='bold' display='block' {...rest}>
        {children}
      </Text>
    </Link>
  );
};

export default MenuItem;
