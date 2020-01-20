import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
/*
Biblioteca YellowBox -> é utilizada para ignorar os warnings
que aparecem na parte inferior do app

*/
import Routes from './src/Routes';

YellowBox.ignoreWarnings([ 
  'Unrecognized WebSocket' //warning que deve ser ignorado
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Routes />
    </>
  );
}

