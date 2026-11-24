import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Invite from './pages/Invite';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Invite />} />
        <Route path="/invite/:guestSlug" element={<Invite />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
