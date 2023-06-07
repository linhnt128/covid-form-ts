import './App.css';
import React, { lazy, Suspense } from 'react';
import { 
  Route, 
  Navigate, 
  createBrowserRouter, 
  RouterProvider, 
  createRoutesFromElements 
} from 'react-router-dom';

//import utils
import SpinnerLoading from './utils/SpinnerLoading';
import PageNotFound from './utils/PageNotFound/PageNotFound';
import Table from './components/table/Table';
import Form from './components/form/Form';


const RootLayout = lazy(() => import("./components/RootLayout"));

type AppType = {};

const router = createBrowserRouter(
  createRoutesFromElements(
          <Route path="/" element=
            {
              // lazy load
              <Suspense
                fallback={<SpinnerLoading />}
              >
                <RootLayout />
              </Suspense>
            }>
              {/* index  */}
              <Route path="/" element={ <Navigate to="/table" /> } />
              {/* table  */}
              <Route path="/table" element={ <Table /> }/>
              {/* form  */}
              <Route path="/declaration" element={ <Form /> } />
              {/* edit  */}
              <Route path="/edit/:id" element={ <Form /> }/>
              <Route path="*" element={<PageNotFound />} />
          </Route>
  )
);


const App: React.FC<AppType> = () => {
  


  
  return (
    <RouterProvider router={router} />
  );
};

export default App;
