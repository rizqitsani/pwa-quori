import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link,
  Input,
  Text,
} from '@chakra-ui/react';

const Register = () => {
  return (
    <Flex
      minHeight='100vh'
      width='100%'
      alignItems='center'
      justifyContent='center'
      p={20}
    >
      <Box
        width='full'
        maxWidth='40%'
        border='1px solid'
        borderRadius='4%'
        px={16}
        py={20}
      >
        <Heading fontSize='3xl' mb={16}>
          Join millions of developer sharing their knowledge!
        </Heading>
        <form>
          <FormControl name='name' mb={4}>
            <FormLabel>Name</FormLabel>
            <Input type='text' />
          </FormControl>
          <FormControl name='email' mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input type='email' />
          </FormControl>
          <FormControl name='password' mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type='password' />
          </FormControl>
          <FormControl name='confirmPassword'>
            <FormLabel>Confirm Password</FormLabel>
            <Input type='password' />
          </FormControl>
          <Button width='full' mt={6} colorScheme='orange' type='submit'>
            Share your knowledge
          </Button>
        </form>
        <Text fontSize='sm' textAlign='center' mt={4}>
          Already have an account?
          <Link as={RouterLink} to='/login' color='teal.500' href='#'>
            {' '}
            Sign in!
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Register;
