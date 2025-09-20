import { useState, useEffect, useCallback } from 'react';
import {
    UseAuthReturn,
    LoginRequest,
    User,
    ApiError
} from '../types';
import { authService } from '../services';

export const useAuth = (): UseAuthReturn => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Inicializar estado desde localStorage al montar
    useEffect(() => {
        const initializeAuth = () => {
            try {
                const savedUser = authService.getCurrentUser();
                const savedToken = authService.getToken();

                if (savedUser && savedToken) {
                    setUser(savedUser);
                    setToken(savedToken);
                }
            } catch (err) {
                console.error('Error initializing auth:', err);
                // Limpiar localStorage corrupto
                authService.logout();
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = useCallback(async (credentials: LoginRequest): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.login(credentials);
            const newUser = authService.getCurrentUser();

            if (newUser) {
                setUser(newUser);
                setToken(response.token);
            }
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message || 'Error al iniciar sesión');
            throw err; // Re-throw para manejo en componentes
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback((): void => {
        authService.logout();
        setUser(null);
        setToken(null);
        setError(null);
    }, []);

    const clearError = useCallback((): void => {
        setError(null);
    }, []);

    return {
        user,
        token,
        isAuthenticated: !!(user && token),
        isLoading,
        error,
        login,
        logout,
        clearError,
    };
};