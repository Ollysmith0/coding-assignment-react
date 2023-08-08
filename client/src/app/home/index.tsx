import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  console.log('render');
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate('/users')}>To User Page</Button>
    </div>
  );
};

export default Home;
