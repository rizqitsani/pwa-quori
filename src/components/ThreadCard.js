import React from 'react';

import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import CategoriesLabel from './CategoriesLabel';

const ThreadCard = ({ categories, createdAt, title, userName }) => {
  const cardBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box bg={cardBg} borderRadius='md' p={{ base: 6, md: 10 }} shadow='base'>
      <Flex align='center' mb={4}>
        <Avatar name={userName} mr={4} />
        <Flex direction='column'>
          <Text fontSize='xs' fontWeight='bold'>
            {userName}
          </Text>
          <Text fontSize='xs'>{'tes'}</Text>
        </Flex>
      </Flex>
      <CategoriesLabel categories={categories} />
      <Heading fontSize='2xl' mb={4}>
        {title}
      </Heading>
      <Text>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
        voluptate voluptatibus esse amet modi itaque dicta quasi soluta,
        necessitatibus sapiente beatae autem, ullam ex laudantium eligendi
        veritatis animi exercitationem quos consectetur? Tenetur, esse adipisci
        sapiente ex ab magni earum deserunt, facere, magnam modi omnis tempora
        aperiam ipsa voluptatum eaque nisi inventore numquam nesciunt. Pariatur
        officia porro, iure qui soluta doloribus perferendis similique in non,
        tempora cum? Eligendi provident ab, cupiditate debitis fuga magnam a
        reprehenderit perferendis voluptatibus vitae? Culpa voluptas accusantium
        cum quisquam delectus autem eaque doloribus doloremque repellendus
        temporibus, maiores repellat quidem quo assumenda praesentium quia nulla
        beatae consectetur.
      </Text>
    </Box>
  );
};

export default ThreadCard;
