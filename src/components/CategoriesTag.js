import React from 'react';

import { Flex, Link, ListIcon, useColorModeValue } from '@chakra-ui/react';
import { MdLabel } from 'react-icons/md';

import { Link as RouterLink } from 'react-router-dom';

const CategoriesTag = ({ title, to }) => {
  const labelBg = useColorModeValue('orange.500', 'orange.200');

  return (
    <Link as={RouterLink} to={`/categories/${to}`}>
      <Flex align='center' _hover={{ ml: 1 }} _focus={{ bg: 'green' }}>
        <ListIcon as={MdLabel} color={labelBg} />
        {title}
      </Flex>
    </Link>
  );
};

export default CategoriesTag;
