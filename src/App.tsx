import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import ViewFullBioPage from "./pages/ViewFullBioPage";
import ScrollToTop from "./components/ScrollToTop";
import MinggoyChat from "./components/MinggoyChat";

function App() {
  return (
    // No horizontal padding on mobile: each section already has its own.
    <div className="mx-auto max-w-5xl sm:px-15 xl:px-0">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/viewfullbio" element={<ViewFullBioPage />} />
      </Routes>

      <MinggoyChat />
    </div>
  )
}

export default App
