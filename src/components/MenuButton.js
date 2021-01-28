import React from 'react';

import { Button, Link } from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

const MenuButton = ({ text, to, ...rest }) => {
  return (
    <Link as={RouterLink} to={to}>
      <Button {...rest}>{text}</Button>
    </Link>
  );
};

export default MenuButton;
