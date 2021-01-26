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

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^([^0-9]*)$/, 'Name cannot contain numbers'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please provide a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be 6-16 character long')
    .max(16, 'Password must be 6-16 character long'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password does not match'),
});

const Register = () => {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(data));
        resolve();
      }, 3000);
    });
  };

  return (
    <Flex
      minHeight='100vh'
      width='100%'
      alignItems='center'
      justifyContent='center'
      p={{ base: 0, md: 20 }}
    >
      <Box
        width='full'
        maxWidth={{ base: '90%', md: '40%' }}
        border={{ base: 'none', md: '1px solid' }}
        borderRadius='2xl'
        px={{ base: 4, md: 16 }}
        py={{ base: 14, md: 20 }}
      >
        <Heading fontSize='3xl' mb={16}>
          Join millions of developer sharing their knowledge!
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors?.name?.message} mb={4}>
            <FormLabel>Name</FormLabel>
            <Input type='text' name='name' ref={register} />
            <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.email?.message} mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input type='text' name='email' ref={register} />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.password?.message} mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type='password' name='password' ref={register} />
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors?.confirmPassword?.message}>
            <FormLabel>Confirm Password</FormLabel>
            <Input type='password' name='confirmPassword' ref={register} />
            <FormErrorMessage>
              {errors?.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type='submit'
            disabled={
              !!errors.name ||
              !!errors.email ||
              !!errors.password ||
              !!errors.confirmPassword
            }
            isLoading={formState.isSubmitting}
            mt={6}
            colorScheme='orange'
            isFullWidth
          >
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
