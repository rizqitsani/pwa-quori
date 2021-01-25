import React from 'react';

import { Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';

import {
  CategoriesList,
  MainContainer,
  Navbar,
  ThreadCard,
} from '../../components';

const Categories = (props) => {
  let title = '';

  switch (props.match.params.name) {
    case 'web-development':
      title = 'Web Development';
      break;
    case 'android-development':
      title = 'Android Development';
      break;
    case 'front-end':
      title = 'Front End';
      break;
    case 'back-end':
      title = 'Back End';
      break;
    default:
      title = '';
      break;
  }

  return (
    <>
      <Navbar />
      <MainContainer>
        <Grid h='200px' templateColumns='repeat(5, 1fr)' gap={4}>
          <GridItem colSpan={{ base: 5, md: 1 }}>
            <Text fontWeight='bold' mb={4}>
              Categories
            </Text>
            <CategoriesList />
          </GridItem>
          <GridItem colSpan={{ base: 5, md: 3 }}>
            <Heading>{`#${title}`}</Heading>
            <Stack spacing={8} my={8}>
              <ThreadCard
                categories={[
                  'Web Development',
                  'Android Development',
                  'Front End',
                  'Back End',
                ]}
              />
              <ThreadCard />
            </Stack>
          </GridItem>
          <GridItem colSpan={1} />
        </Grid>
      </MainContainer>
    </>
  );
};

export default Categories;
