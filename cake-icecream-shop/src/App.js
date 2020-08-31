import React from 'react';
import { Provider } from 'react-redux'
import Cake from './components/CakeContiner'
import './App.css';
import store from './CakeStore'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Cake> </Cake>
      </div>
    </Provider>
  );
}

export default App;
