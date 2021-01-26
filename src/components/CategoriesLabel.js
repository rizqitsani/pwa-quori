import React from 'react';

import { HStack, Tag } from '@chakra-ui/react';

const CategoriesLabel = ({ categories, ...props }) => {
  return (
    <HStack mt={1} mb={3} wrap='wrap' {...props}>
      {categories?.map((c) => {
        let color = '';
        switch (c) {
          case 'Web Development':
            color = 'orange';
            break;
          case 'Android Development':
            color = 'green';
            break;
          case 'Front End':
            color = 'cyan';
            break;
          case 'Back End':
            color = 'pink';
            break;
          default:
            break;
        }
        return (
          <Tag size='sm' colorScheme={color}>
            {c}
          </Tag>
        );
      })}
    </HStack>
  );
};

export default CategoriesLabel;
