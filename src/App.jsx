import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Exercise from './Components/Exercise/Exercise';
import BMI from './Components/BMI/BMI';
import { Provider } from 'react-redux';
import { myStore } from './ReduxStore/MainRedux';
import ExerciseDetails from './Components/ExerciseDetails/ExerciseDetails';
import PlanLayout from './Components/PlanLayout/PlanLayout';
import { Toaster } from 'react-hot-toast';


const myRouter = createHashRouter( [
  { path: "/" , element: <Layout />, children: [
    { path: "", element: <Home /> },
    { path: "home", element: <Home /> },
    { path: "planStyle", element: <PlanLayout />},
    { path: "exercise", element: <Exercise /> },
    { path: "BMI", element: <BMI /> },
    { path: "exerciseDetails/:id", element: <ExerciseDetails /> },
  ] },
] ) 

function App() {
  return (
    <>
      <Provider store={myStore}>
        <RouterProvider router={ myRouter }  />
      </Provider>
      <Toaster position='top-center' />
    </>
  )
}

export default App;

