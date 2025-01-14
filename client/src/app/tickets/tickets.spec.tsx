import { render, screen } from '@testing-library/react';
import Tickets from './tickets';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, useQueryClient } from 'react-query';

describe('Tickets', () => {
  const queryClient = useQueryClient();
  it('should render correctly', () => {
    const component = renderer.create(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Tickets
            tickets={
              [
                // {
                //   assigneeId: null,
                //   completed: false,
                //   description: 'Install a monitor arm',
                //   id: 1,
                // },
              ]
            }
            users={[]}
            refetch={jest.fn()}
            status=""
          />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
