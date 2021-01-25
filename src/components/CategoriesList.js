import React from 'react';

import { List, ListItem } from '@chakra-ui/react';

import CategoriesTag from './CategoriesTag';

const CategoriesList = () => {
  return (
    <List spacing={2}>
      <ListItem>
        <CategoriesTag title='Web Development' to='web-development' />
      </ListItem>
      <ListItem>
        <CategoriesTag title='Android Development' to='android-development' />
      </ListItem>
      <ListItem>
        <CategoriesTag title='Front End' to='front-end' />
      </ListItem>
      <ListItem>
        <CategoriesTag title='Back End' to='back-end' />
      </ListItem>
    </List>
  );
};

export default CategoriesList;
