import React from 'react';
import { useAuth } from '../../../hooks';
import { Button } from '../../ui/Button/Button';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="layout">
            <header className="layout-header">
                <div className="layout-header-content">
                    <div className="layout-logo">
                        <h1>Bus Management</h1>
                    </div>

                    <nav className="layout-nav">
            <span className="layout-user">
                Welcome, {user?.username}
            </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="layout-logout-btn"
                        >
                            Log Out
                        </Button>
                    </nav>
                </div>
            </header>

            <main className="layout-main">
                <div className="layout-container">
                    {children}
                </div>
            </main>

            <footer className="layout-footer">
                <div className="layout-container">
                    <p>&copy; 2025 Bus Management System. Developed for CIVA.</p>
                </div>
            </footer>
        </div>
    );
};