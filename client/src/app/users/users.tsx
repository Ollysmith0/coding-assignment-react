import CustomTemplate from '../templates';
import { User } from '@acme/shared-models';

interface UsersProp {
  users: User[];
  refetch: () => void;
  status: string;
}

const Users = ({ users, refetch, status }: UsersProp) => {
  const Children = () => {
    return (
      <div>
        {users.map((item: User) => {
          return (
            <div>
              <span>{item.name} with ID: </span>
              <span>{item.id}</span>
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return <CustomTemplate children={<Children key={'Users'} />} />;
};

export default Users;
