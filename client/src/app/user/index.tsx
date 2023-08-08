import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const fetchUser = async () => {
    const res = await fetch(`/api/users/${id}`);
    return res.json();
  };
  const User = useQuery([['user'], fetchUser]);
  console.log(User);

  return (
    <div>
      {/* <div>User Name: {User.data.name}</div>
      <div>User ID: {User.data.id}</div> */}
    </div>
  );
};

export default UserDetail;
