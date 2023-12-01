import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Departure from "./routes/Departure"
import SignUp from "./routes/SignUp"
import WindNote from './routes/WindNote';
import Home from './routes/Home';
import Detail from './routes/Detail';
import { UserProvider } from './routes/UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <UserProvider>
    <React.StrictMode>
      <BrowserRouter>
      <Routes>
          <Route index element={<App />} />
          <Route path='home'  element={<Home />} />
          <Route path="departure" element={<Departure />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="windNote" element={<WindNote />} />
          <Route path="windNote/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
