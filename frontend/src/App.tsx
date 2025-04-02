// src/App.tsx
import React from 'react';
import MainLayout from './components/layout/MainLayout';
import Home from './components/Home';

const App: React.FC = () => {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
};

export default App;