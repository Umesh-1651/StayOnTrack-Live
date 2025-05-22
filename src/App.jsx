
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ThankYouPage from "./pages/ThankYouPage";
import HelpPage from "./pages/HelpPage";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
