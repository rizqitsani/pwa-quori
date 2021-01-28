import React from 'react';

import AddThreadModal from './AddThreadModal';
import MenuDropdown from './MenuDropdown';
import MenuItem from './MenuItem';

const SignedInLinks = () => {
  return (
    <>
      <MenuItem to='/mythreads'>My Threads</MenuItem>
      <AddThreadModal />
      <MenuDropdown />
    </>
  );
};

export default SignedInLinks;
