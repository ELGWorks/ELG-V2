import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import ViewFullBioPage from "./pages/ViewFullBioPage";

function App() {
  return (
    <div className="hidden sm:block max-w-5xl mx-auto px-15 xl:px-0">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/viewfullbio" element={<ViewFullBioPage />} />
      </Routes>
    </div>
  )
}

export default App