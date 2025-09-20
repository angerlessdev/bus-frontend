import React from 'react';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import {Navigate, Route, Routes} from "react-router-dom";
import {AuthGuard} from "./components/features/auth/AuthGuard/AuthGuard";
import {Dashboard, LoginPage} from "./pages";
import {BusesPage} from "./pages/Buses/BusesPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route
                        path="/"
                        element={
                            <AuthGuard>
                                <Navigate to="/dashboard" replace />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <AuthGuard>
                                <Dashboard />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/buses"
                        element={
                            <AuthGuard>
                                <BusesPage />
                            </AuthGuard>
                        }
                    />

                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;