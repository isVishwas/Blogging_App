import React from 'react';

//import Scss
import './assets/scss/themes.scss';

//imoprt Route
import Route from './Routes';
import { useDispatch } from 'react-redux';
import { loadUser } from './slices/thunks';
import { getToken } from './helpers/api_helper';

function App() {

  const dispatch = useDispatch();
  if(getToken()) dispatch(loadUser());

  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
