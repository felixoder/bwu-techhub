import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {store, persistor} from './redux/store.js'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>


      <BrowserRouter>


          <App />
      </BrowserRouter>
    </Provider>
  </PersistGate>
)
