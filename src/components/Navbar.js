import React, { useState } from 'react';

import Logo from './Logo';
import MenuLinks from './MenuLinks';
import MenuToggle from './MenuToggle';
import NavbarContainer from './NavbarContainer';

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavbarContainer {...props}>
      <Logo
        w='100px'
        color={['orange.900', 'orange.900', 'orange.500', 'orange.500']}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpenMobile={isOpen} />
    </NavbarContainer>
  );
};

export default Navbar;
