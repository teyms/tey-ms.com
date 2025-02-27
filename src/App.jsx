import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from './RootRouter'
import { useDispatch } from 'react-redux';

import Blog from './components/Blog/Blog'
import BlogPost from './components/Blog/BlogPost'
import ShortUrlCreate from './components/ShortUrl/ShortUrlCreate'
import ShortUrlManage from './components/ShortUrl/ShortUrlManage'
import ShortUrl from './components/ShortUrl/ShortUrl'
import EmailTemplate from './components/EmailTemplate/EmailTemplate'
import TngFileConvert from './components/TngFileConvert/TngFileConvert'
import Home from './components/Home/Home'
import GoogleAuth from './components/Auth/GoogleAuth'

import {hydrateAuthState} from './store/googleAuth-action'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      // { index: true, element: <Blog /> },
      { path: 'login', index: true, element: <GoogleAuth /> },
      // #BLOG
      {
        path: 'blog',
        children: [
          {
            index: true,
            element: <Blog/>,
            // action: ShortUrl.action,
            // loader: eventsLoader,
          }
          ,
          {
            path: '*',
            element: <BlogPost/>,
            // action: ShortUrl.action,
            // loader: eventsLoader,
          }
        ]
      },
      // #shorturl
      {
        path: 'shorturl',
        // element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <ShortUrlCreate/>,
            // action: ShortUrl.action,
            // loader: eventsLoader,
          },
          {
            path: 'manage',
            element: <ShortUrlManage/>,
          },
          {
            path: '*',
            element: <ShortUrl />,
            // action: manipulateEventAction,
          }
          // {
          //   path: ':eventId',
          //   id: 'event-detail',
          //   loader: eventDetailLoader,
          //   children: [
          //     {
          //       index: true,
          //       element: <EventDetailPage />,
          //       action: deleteEventAction,
          //     },
          //     {
          //       path: 'edit',
          //       element: <EditEventPage />,
          //       action: manipulateEventAction,
          //     },
          //   ],
          // },
        ],
      },
      // #tng
      {
        path: 'tng',
        children: [
          {
            index: true,
            element: <TngFileConvert/>,
            // action: ShortUrl.action,
            // loader: eventsLoader,
          }
        ]
      },
      // #emailTemplate
      {
        path: 'emailtemplate',
        children: [
          {
            index: true,
            element: <EmailTemplate/>,
            // action: ShortUrl.action,
            // loader: eventsLoader,
          }
        ]
      },
      // #*(ALL)
      { 
        path: "*", 
        // element: <Home /> 
        element: <Navigate to="/" replace />
      },
      // {
      //   path: 'events',
      //   element: <EventsRootLayout />,
      //   children: [
      //     {
      //       index: true,
      //       element: <EventsPage />,
      //       loader: eventsLoader,
      //     },
      //     {
      //       path: ':eventId',
      //       id: 'event-detail',
      //       loader: eventDetailLoader,
      //       children: [
      //         {
      //           index: true,
      //           element: <EventDetailPage />,
      //           action: deleteEventAction,
      //         },
      //         {
      //           path: 'edit',
      //           element: <EditEventPage />,
      //           action: manipulateEventAction,
      //         },
      //       ],
      //     },
      //     {
      //       path: 'new',
      //       element: <NewEventPage />,
      //       action: manipulateEventAction,
      //     },
      //   ],
      // },
      // {
      //   path: 'newsletter',
      //   element: <NewsletterPage />,
      //   action: newsletterAction,
      // },
    ],
  },
]);

function App() {
  // const [count, setCount] = useState(0)
  const dispatch = useDispatch();

  useEffect(() => {
    // Hydrate state from localStorage on app load
    dispatch(hydrateAuthState());
  }, [dispatch]);

  return (
    <>
      {/* <ShortUrl></ShortUrl> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App
