import React from 'react';

import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdDelete, MdModeEdit } from 'react-icons/md';

const AnswerCard = () => {
  const cardBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box bg={cardBg} borderRadius='md' p={{ base: 6, md: 10 }} shadow='base'>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify='space-between'
        mb={4}
      >
        <Flex align='center'>
          <Avatar
            name='Muhammad Rizqi Tsani'
            src='https://bit.ly/ryan-florence'
            mr={4}
          />
          <Flex direction='column'>
            <Text fontSize='xs' fontWeight='bold'>
              Muhammad Rizqi Tsani
            </Text>
            <Text fontSize='xs'>1 hour ago</Text>
          </Flex>
        </Flex>
        <Box mt={{ base: 6, md: 0 }}>
          <IconButton
            variant='outline'
            colorScheme='green'
            icon={<MdModeEdit />}
            mr={2}
          />
          <IconButton variant='outline' colorScheme='red' icon={<MdDelete />} />
        </Box>
      </Flex>
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

export default AnswerCard;
