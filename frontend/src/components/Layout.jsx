import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <Navbar />
      <main className="mt-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;