import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./style/main.scss";
import store from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom"
import {fetchProducts} from "./store/productsSlice";


store.dispatch(fetchProducts());

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

