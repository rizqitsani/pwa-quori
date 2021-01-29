import React from 'react';

import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';

import CategoriesLabel from './CategoriesLabel';

const MyAnswerCard = ({ body, categories, title }) => {
  const cardBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box bg={cardBg} borderRadius='md' p={{ base: 6, md: 10 }} shadow='base'>
      <Heading fontSize='2xl' mb={4}>
        {title}
      </Heading>
      {categories ? <CategoriesLabel categories={categories} mb={2} /> : null}
      <Text>{body}</Text>
    </Box>
  );
};

export default MyAnswerCard;
