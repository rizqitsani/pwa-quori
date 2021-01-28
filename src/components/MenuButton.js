import React from 'react';

import { Button } from '@chakra-ui/react';

import { Link } from 'react-router-dom';

const MenuButton = ({ text, to, ...rest }) => {
  return (
    <Link to={to}>
      <Button {...rest}>{text}</Button>
    </Link>
  );
};

export default MenuButton;
