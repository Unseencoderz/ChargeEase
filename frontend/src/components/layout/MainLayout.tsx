// src/components/layout/MainLayout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 animated-gradient opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-purple-900/40"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Main Content Structure */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow relative">
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          <div className="relative z-10">
            {children}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
