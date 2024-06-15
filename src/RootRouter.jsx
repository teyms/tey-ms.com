import { Outlet, useNavigation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Loading from './components/Loader/Loading';

// import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <div className='wrapper'>
      {/* <MainNavigation /> */}
      <Header/>
      <main className='body-container'>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}

export default RootLayout;
