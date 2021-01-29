import React from 'react';

import { Box, Heading, Link, useColorModeValue } from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

import CategoriesLabel from './CategoriesLabel';

const MyQuestionCard = ({ categories, id, title }) => {
  const cardBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box bg={cardBg} borderRadius='md' p={6} shadow='base'>
      <Link as={RouterLink} to={`/thread/${id}`}>
        <Heading fontSize='2xl' mb={4}>
          {title}
        </Heading>
      </Link>
      {categories ? <CategoriesLabel categories={categories} mb={0} /> : null}
    </Box>
  );
};

export default MyQuestionCard;
