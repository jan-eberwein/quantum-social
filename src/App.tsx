import { Routes, Route } from 'react-router-dom';
import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
import { Home } from './_root/pages';
import SignupForm from './_auth/forms/SignupForm';

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* PUBLIC ROUTES - SIGNED OUT */}
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-un" element={<SignupForm />} />
        {/* PRIVATE ROUTES - SIGNED IN */}
        <Route index element={<Home />} />
      </Routes>
    </main>
  )
}

export default App
