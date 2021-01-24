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

import { ColorModeSwitcher } from '../../components';

const Login = () => {
  return (
    <Flex
      minHeight='100vh'
      width='100%'
      alignItems='center'
      justifyContent='center'
    >
      <Box
        width='full'
        maxWidth='30%'
        border='1px solid'
        borderRadius='4%'
        px={16}
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
  );
};

export default Login;
