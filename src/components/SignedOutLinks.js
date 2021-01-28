import React from 'react';

import MenuButton from './MenuButton';

const SignedOutLinks = () => {
  return (
    <>
      <MenuButton to='/login' text='Login' colorScheme='orange' />
      <MenuButton
        to='/register'
        text='Register'
        variant={{ base: 'solid', md: 'ghost' }}
        colorScheme='orange'
      />
    </>
  );
};

export default SignedOutLinks;
