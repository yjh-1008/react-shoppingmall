import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import './scss/index.scss'
import { worker } from  './mocks/browser'
import { RecoilRoot } from 'recoil'
import ReactDOM from 'react-dom'

if(import.meta.env.DEV){
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
)
