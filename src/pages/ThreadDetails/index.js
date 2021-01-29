import React, { useState } from 'react';

import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { MdComment } from 'react-icons/md';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';

import {
  AnswerCard,
  CategoriesList,
  MainContainer,
  Navbar,
} from '../../components';
import { addReply } from '../../store/actions/replyActions';

const schema = yup.object().shape({
  reply: yup.string().required('This field is required'),
});

const ThreadDetails = ({ match }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { errors, formState, handleSubmit, register, reset } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const { id: threadID } = match.params;

  const handleAnswerClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onSubmit = (data) => {
    dispatch(addReply({ ...data, threadID }));
    reset();
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     alert(JSON.stringify(data));
    //     resolve();
    //   }, 3000);
    // });
  };

  return (
    <>
      <Navbar />
      <MainContainer>
        <Grid h='200px' templateColumns='repeat(5, 1fr)' gap={4}>
          <GridItem colSpan={{ base: 5, md: 1 }}>
            <Text fontWeight='bold' mb={4}>
              Things you might be interested in
            </Text>
            <CategoriesList />
          </GridItem>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors?.reply?.message} mb={4}>
                <Textarea
                  name='reply'
                  ref={register}
                  display={{ base: isOpen ? 'block' : 'none' }}
                  placeholder='Write your thoughts here...'
                  size='sm'
                  resize='vertical'
                  mb={4}
                />
                <FormErrorMessage>{errors?.reply?.message}</FormErrorMessage>
              </FormControl>
              <Button
                type='submit'
                isLoading={formState.isSubmitting}
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
          <GridItem colSpan={1}></GridItem>
        </Grid>
      </MainContainer>
    </>
  );
};

export default ThreadDetails;
