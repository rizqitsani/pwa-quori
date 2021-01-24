import React from 'react';

import { Box } from '@chakra-ui/react';

const MainContainer = ({ children, ...props }) => {
  return (
    <Box as='main' w='100%' mb={8} px={{ base: 8, md: 32 }} {...props}>
      {children}
    </Box>
  );
};

export default MainContainer;
