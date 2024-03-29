import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import Profile from './components/Profile/Profile';
import Products from './components/catelog/Products';
import Product from './components/catelog/Product';
import ForgetPasswordForm from './components/ForgetPasswordForm/ForgetPasswordForm';
import { Provider } from 'react-redux';
import store, { persistor } from './reduxstore/store';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Error from './components/404page/error';
import { PersistGate } from 'redux-persist/integration/react';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/home" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/cart" Component={Cart} />
            <Route path="/profile" Component={Profile} />
            <Route path="/products" Component={Products} />
            <Route path="/forgot-password" Component={ForgetPasswordForm} />
            <Route path="*" Component={Error} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
export default App