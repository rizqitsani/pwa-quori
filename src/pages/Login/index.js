import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Link,
  Input,
  Text,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';

import { ColorModeSwitcher } from '../../components';
import { signIn } from '../../store/actions/authActions';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please provide a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be 6-16 character long')
    .max(16, 'Password must be 6-16 character long')
    .required('Password is required'),
});

const Login = () => {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = (credentials) => {
    dispatch(signIn(credentials));
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     alert(JSON.stringify(data));
    //     resolve();
    //   }, 3000);
    // });
  };

  return (
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
        borderRadius='2xl'
        px={{ base: 4, md: 16 }}
        py={20}
      >
        <Flex justifyContent='space-between' mb={16}>
          <Heading>Sign In</Heading>
          <ColorModeSwitcher />
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors?.email?.message} mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input type='text' name='email' ref={register} />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.password?.message}>
            <FormLabel>Password</FormLabel>
            <Input type='password' name='password' ref={register} />
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>
          <Button
            type='submit'
            disabled={!!errors.email || !!errors.password}
            isLoading={formState.isSubmitting}
            mt={10}
            colorScheme='orange'
            isFullWidth
          >
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
