import { Outlet, useNavigation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

// import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      {/* <MainNavigation /> */}
      <Header/>
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default RootLayout;
