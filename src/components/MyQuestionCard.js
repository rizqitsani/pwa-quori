import React from 'react';

import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import CategoriesLabel from './CategoriesLabel';

const MyQuestionCard = ({ categories, title }) => {
  const cardBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box bg={cardBg} borderRadius='md' p={6} shadow='base'>
      <Heading fontSize='2xl' mb={4}>
        {title}
      </Heading>
      {categories ? <CategoriesLabel categories={categories} mb={0} /> : null}
    </Box>
  );
};

export default MyQuestionCard;
