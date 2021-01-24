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

import { ColorModeSwitcher, Navbar } from '../../components';

const Login = () => {
  return (
    <>
      <Navbar />
      <Flex
        minHeight='100vh'
        width='100%'
        alignItems='center'
        justifyContent='center'
      >
        <Box
          width='full'
          maxWidth={{ base: '90%', md: '30%' }}
          border={{ base: 'none', md: '1px solid' }}
          borderRadius='4%'
          px={{ base: 4, md: 16 }}
          py={20}
        >
          <Flex justifyContent='space-between' mb={16}>
            <Heading>Sign In</Heading>
            <ColorModeSwitcher />
          </Flex>
          <form>
            <FormControl name='email' mb={4}>
              <FormLabel>Email address</FormLabel>
              <Input type='email' />
            </FormControl>
            <FormControl name='password'>
              <FormLabel>Password</FormLabel>
              <Input type='password' />
            </FormControl>
            <Button width='full' mt={10} colorScheme='orange' type='submit'>
              Sign In
            </Button>
          </form>
          <Text fontSize='sm' textAlign='center' mt={4}>
            Don't have an account?
            <Link as={RouterLink} to='/register' color='teal.500' href='#'>
              {' '}
              Create one!
            </Link>
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
