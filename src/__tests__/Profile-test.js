import { MockedProvider } from '@apollo/react-testing';
import { act, render } from '@testing-library/react';
import React from 'react';

import Profile, { PROFILE_QUERY } from '../Profile';

const MOCKS = [
  {
    request: {
      query: PROFILE_QUERY,
    },
    result: {
      data: {
        currentUser: {
          id: '1',
          username: 'Johny',
          postsCount: 123,
        },
      },
    },
  },
];

async function wait(ms = 0) {
  await act(() => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
}

it('renders', async () => {
  const { container } = render(
    <MockedProvider addTypename={false} mocks={MOCKS}>
      <Profile />
    </MockedProvider>
  );
  expect(container.textContent).toBe('Loading');

  await wait();

  expect(container.textContent).toMatch('Username: 1');
  expect(container.textContent).toMatch('Posts count: 123');
});
