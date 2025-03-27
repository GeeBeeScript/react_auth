import { Outlet } from 'react-router-dom';
import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

export default Layout;
