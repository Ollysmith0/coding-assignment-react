import Users from './users';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, useQueryClient } from 'react-query';

describe('Tickets', () => {
  const queryClient = useQueryClient();
  it('should render correctly', () => {
    const component = renderer.create(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Users
            users={
              [
                // {
                //   assigneeId: null,
                //   completed: false,
                //   description: 'Install a monitor arm',
                //   id: 1,
                // },
              ]
            }
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
