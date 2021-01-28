import React from 'react';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../store/actions/authActions';

import { MainContainer, Navbar } from '../../components';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^([^0-9]*)$/, 'Name cannot contain numbers'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please provide a valid email'),
  newPassword: yup.string(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Password does not match'),
});

const EditProfile = () => {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const firebase = useSelector((state) => state.firebase);
  const { auth, profile } = firebase;

  const onSubmit = (updatedData) => {
    dispatch(updateProfile(updatedData));
  };

  return (
    <>
      <Navbar />
      <MainContainer>
        <Grid h='200px' templateColumns='repeat(5, 1fr)'>
          <GridItem colStart={{ base: 1, md: 2 }} colEnd={{ base: 6, md: 5 }}>
            <Heading mb={10}>Edit Profile</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors?.name?.message} mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  type='text'
                  name='name'
                  defaultValue={profile.name}
                  ref={register}
                  autoComplete='off'
                />
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.email?.message} mb={4}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='text'
                  name='email'
                  defaultValue={auth.email}
                  ref={register}
                  autoComplete='off'
                />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.password?.message} mb={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  name='newPassword'
                  ref={register}
                  autoComplete='off'
                />
                <FormHelperText>
                  Leave it blank to keep the same.
                </FormHelperText>
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.confirmPassword?.message}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type='password'
                  name='confirmPassword'
                  ref={register}
                  autoComplete='off'
                />
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
                Update my profile
              </Button>
            </form>
          </GridItem>
        </Grid>
      </MainContainer>
    </>
  );
};

export default EditProfile;
