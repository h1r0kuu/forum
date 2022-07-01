import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Store from './services/store';
const root = ReactDOM.createRoot(document.getElementById('root'));

export const store = new Store();

export const Context = createContext(store)


root.render(
  <Context.Provider value={{store}}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={ <App /> }>
        </Route>
      </Routes>
    </BrowserRouter>
  </Context.Provider>
);