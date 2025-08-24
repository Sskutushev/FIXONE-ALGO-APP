import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';

// Dashboard Pages
import HomePage from './pages/dashboard/HomePage';
import FeedPage from './pages/dashboard/FeedPage';
import MarketplacePage from './pages/dashboard/MarketplacePage';
import ChartPage from './pages/dashboard/ChartPage';
import DesktopPage from './pages/dashboard/DesktopPage';
import FavoritesPage from './pages/dashboard/FavoritesPage';
import SupportPage from './pages/dashboard/SupportPage';
import HelpPage from './pages/dashboard/HelpPage';
import CreateBotPage from './pages/dashboard/CreateBotPage';

// Verification Pages
import VerificationPage from './pages/verification/VerificationPage';

// --- MOCK DATA ---
// In a real app, this would come from a global state (Context, Redux, etc.)
const MOCK_USER_STATE = {
    isAuthenticated: false,      // Is the user logged in?
  isVerified: false,      // Has the user completed verification?
};
// --- END MOCK DATA ---


/**
 * A wrapper for routes that require the user to be authenticated.
 * If not authenticated, redirects to the /auth page.
 */
const AuthGuard = ({ children }) => {
  return MOCK_USER_STATE.isAuthenticated ? children : <Navigate to="/auth" />;
};

/**
 * A wrapper for the CreateBotPage route that requires verification.
 * If authenticated but not verified, redirects to the /verify page.
 */
const VerificationGuard = () => {
    if (!MOCK_USER_STATE.isAuthenticated) {
        return <Navigate to="/auth" />;
    }
    return MOCK_USER_STATE.isVerified ? <CreateBotPage /> : <Navigate to="/verify" />;
};


function App() {
  return (
    <Router>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<LandingPage />} />
        <Route 
            path="/auth"
            element={MOCK_USER_STATE.isAuthenticated ? <Navigate to="/dashboard" /> : <AuthPage />}
        />

        {/* --- VERIFICATION ROUTE --- */}
        {/* Accessible only if logged in but not yet verified */}
        <Route 
            path="/verify"
            element={<AuthGuard><VerificationPage /></AuthGuard>}
        />

        {/* --- DASHBOARD ROUTES (PROTECTED) --- */}
        <Route 
            path="/dashboard"
            element={<AuthGuard><DashboardLayout /></AuthGuard>}
        >
            <Route index element={<Navigate to="home" replace />} /> 
            <Route path="home" element={<HomePage />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
            <Route path="chart" element={<ChartPage />} />
            <Route path="desktop" element={<DesktopPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="help" element={<HelpPage />} />
            
            {/* The create-bot route is now protected by the verification guard */}
            <Route path="create-bot" element={<VerificationGuard />} />
        </Route>

        {/* --- FALLBACK ROUTE --- */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
