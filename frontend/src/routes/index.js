import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppMarkLoader from 'components/loader/AppMarkLoader';
import { routelist } from 'routes/routelist';

export default function Router() {

  const routeObject=createBrowserRouter(routelist);

  return (
    <RouterProvider router={routeObject} fallbackElement={<AppMarkLoader/>} />
  )
}
