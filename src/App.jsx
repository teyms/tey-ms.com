import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './RootRouter'
import Blog from './components/Blog'
import ShortUrlCreate from './components/ShortUrl/ShortUrlCreate'
import { action as shortUrlCreateAction} from './components/ShortUrl/ShortUrlCreate'
import ShortUrl from './components/ShortUrl/ShortUrl'
import EmailTemplate from './components/EmailTemplate/EmailTemplate'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Blog /> },
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
            path: '*',
            element: <ShortUrl />,
            // action: manipulateEventAction,
          },
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

  return (
    <>
      {/* <div>okok</div> */}
      {/* <Blog></Blog> */}
      {/* <ShortUrl></ShortUrl> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App
