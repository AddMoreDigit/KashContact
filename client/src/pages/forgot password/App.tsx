import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import CreateNewPasswordPage from './components/CreateNewPasswordPage';
import OtpVerificationPage from './components/OtpVerificationPage';
import SignUpPage from './components/SignUpPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/create-password" element={<CreateNewPasswordPage />} />
        <Route path="/otp-verification" element={<OtpVerificationPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}
