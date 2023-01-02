import logo from './logo.svg';
import React,{ Suspense, Component, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const Login = React.lazy(()=> import('./'))

function App() {
  return (
    <div className="App">
      React App
    </div>
  );
}

export default App;

