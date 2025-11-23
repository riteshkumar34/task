import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (

      <div className="min-h-screen bg-gray-100 text-gray-800 p-6">

        {/* Routes Section */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />

          {/* 👇 NEW ROUTE FOR GOOGLE LOGIN */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>

      </div>
    
  );
};

export default App;
