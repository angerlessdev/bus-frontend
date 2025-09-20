import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { ApiError, STORAGE_KEYS } from '../types';

interface ErrorResponse {
    message?: string;
    details?: string[];
    error?: string;
    timestamp?: string;
    path?: string;
    status?: number;
    [key: string]: any;
}

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.client.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError<ErrorResponse>) => {
                if (error.response?.status === 401) {
                    // Token expirado o inválido
                    this.clearAuth();
                    window.location.href = '/login';
                }
                return Promise.reject(this.formatError(error));
            }
        );
    }

    private formatError(error: AxiosError<ErrorResponse>): ApiError {
        const defaultError: ApiError = {
            message: 'Ocurrió un error inesperado',
            status: 500,
            timestamp: new Date().toISOString(),
        };

        if (error.response) {
            const errorData = error.response.data;
            return {
                message: errorData?.message || errorData?.error || error.message || 'Error del servidor',
                status: error.response.status,
                timestamp: errorData?.timestamp || new Date().toISOString(),
                path: errorData?.path || error.config?.url,
                details: errorData?.details,
            };
        } else if (error.request) {
            return {
                ...defaultError,
                message: 'Error de conexión. Verifique su conexión a internet.',
                status: 0,
            };
        } else {
            return {
                ...defaultError,
                message: error.message || 'Error en la configuración de la petición',
            };
        }
    }

    private clearAuth(): void {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
    }

    async get<T>(url: string, params?: any): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.client.get(url, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async post<T>(url: string, data?: any): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.client.post(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async put<T>(url: string, data?: any): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.client.put(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete<T>(url: string): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.client.delete(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    hasToken(): boolean {
        return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
    }

    getAuthHeaders(): { Authorization?: string } {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        return token ? { Authorization: `Bearer ${token}` } : {};
    }
}

export const apiClient = new ApiClient();