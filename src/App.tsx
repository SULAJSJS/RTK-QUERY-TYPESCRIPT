import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import './index.css'
import Favoritespage from './pages/Favoritespage';
import Homepage from './pages/Homepage';

function App() {
  return (
    <>
    <Navigation />
    <Routes>
      <Route path='/' element={ <Homepage /> } />
      <Route path='/favorites' element={ <Favoritespage /> } />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
