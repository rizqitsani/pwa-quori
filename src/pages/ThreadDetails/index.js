import React, { useState } from 'react';

import {
  Button,
  Divider,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { MdComment } from 'react-icons/md';

import {
  AnswerCard,
  CategoriesList,
  MainContainer,
  Navbar,
} from '../../components';

const ThreadDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAnswerClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Navbar />
      <MainContainer>
        <Grid h='200px' templateColumns='repeat(5, 1fr)' gap={4}>
          <GridItem colSpan={{ base: 5, md: 1 }} />
          <GridItem colSpan={{ base: 5, md: 3 }}>
            <Heading>#What is wrong with cat? </Heading>
            <Button
              onClick={handleAnswerClick}
              leftIcon={<MdComment />}
              colorScheme='orange'
              variant='outline'
              my={6}
            >
              Answer
            </Button>
            <form>
              <Textarea
                display={{ base: isOpen ? 'block' : 'none' }}
                placeholder='Write your thoughts here...'
                size='sm'
                resize='vertical'
                mb={4}
              />
              <Button
                type='submit'
                display={{ base: isOpen ? 'block' : 'none' }}
                colorScheme='orange'
              >
                Share
              </Button>
            </form>
            <Divider my={4} />
            <Text fontSize='lg' fontWeight='bold'>
              2 Thoughts
            </Text>
            <Stack spacing={8} my={8}>
              <AnswerCard />
              <AnswerCard />
            </Stack>
          </GridItem>
          <GridItem colSpan={{ base: 5, md: 1 }}>
            <Text fontWeight='bold' mb={4}>
              Things you might be interested in
            </Text>
            <CategoriesList />
          </GridItem>
        </Grid>
      </MainContainer>
    </>
  );
};

export default ThreadDetails;
