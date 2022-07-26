import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';
import ShowMore from '../../components/showMore/ShowMore';

const Home = () => {
  

  return (
    <div>
      <Directory />
      <Outlet />
      {/* <ShowMore/> */}
    </div>
  );
};

export default Home;