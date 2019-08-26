import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';

export const PROFILE_QUERY = gql`
  query ProfileQuery {
    currentUser {
      id
      username
      postsCount
    }
  }
`;

export default function Profile() {
  const { data, loading, error } = useQuery(PROFILE_QUERY);

  if (error) {
    throw error;
  }

  if (loading) {
    return 'Loading';
  }

  if (!(data && data.currentUser)) {
    throw new Error('Cannot fetch data');
  }

  const { currentUser } = data;

  return (
    <div>
      <p>Username: {currentUser.id}</p>
      <p>Posts count: {currentUser.postsCount}</p>
    </div>
  );
}
