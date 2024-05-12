import React from 'react';
import ReactDOM from 'react-dom/client';
import './public.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // is the client id a secret? 
  <GoogleOAuthProvider clientId='200123904344-oa3l2e22aaca2ki4blfrbcbvoe8th0p8.apps.googleusercontent.com'>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
