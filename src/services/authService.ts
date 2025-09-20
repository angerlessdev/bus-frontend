import {
    LoginRequest,
    LoginResponse,
    User,
    API_ENDPOINTS,
    STORAGE_KEYS
} from '../types';
import { apiClient } from './api';

class AuthService {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await apiClient.post<LoginResponse>(
                API_ENDPOINTS.AUTH.LOGIN,
                credentials
            );

            if (response.token) {
                localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);

                const user: User = {
                    username: credentials.username,
                    authorities: ['USER'],
                };
                localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
            }

            return response;
        } catch (error) {
            throw error;
        }
    }

    logout(): void {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
    }

    getCurrentUser(): User | null {
        try {
            const userStr = localStorage.getItem(STORAGE_KEYS.USER);
            return userStr ? JSON.parse(userStr) : null;
        } catch {
            return null;
        }
    }

    getToken(): string | null {
        return localStorage.getItem(STORAGE_KEYS.TOKEN);
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        const user = this.getCurrentUser();
        return !!(token && user);
    }
}

export const authService = new AuthService();