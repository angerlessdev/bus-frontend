import React from 'react';
import { useAuth } from '../../../../hooks';
import { LoginForm } from '../LoginForm/LoginForm';
import { Loading } from '../../../ui/Loading/Loading';

interface AuthGuardProps {
    children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <Loading message="Verificando autenticación..." />;
    }

    if (!isAuthenticated) {
        return <LoginForm />;
    }

    return <>{children}</>;
};