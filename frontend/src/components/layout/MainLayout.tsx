// src/components/layout/MainLayout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;