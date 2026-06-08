import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Authenticated, Unauthenticated } from "convex/react";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import IncomePage from "./pages/IncomePage";
import ExpensesPage from "./pages/ExpensesPage";
import TaxesPage from "./pages/TaxesPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Unauthenticated><LoginPage /></Unauthenticated>} />
        <Route path="/signup" element={<Unauthenticated><SignUpPage /></Unauthenticated>} />
        <Route path="/dashboard" element={<Authenticated><Layout /></Authenticated>}><Route index element={<DashboardPage />} /></Route>
        <Route path="/income" element={<Authenticated><Layout /></Authenticated>}><Route index element={<IncomePage />} /></Route>
        <Route path="/expenses" element={<Authenticated><Layout /></Authenticated>}><Route index element={<ExpensesPage />} /></Route>
        <Route path="/taxes" element={<Authenticated><Layout /></Authenticated>}><Route index element={<TaxesPage />} /></Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;