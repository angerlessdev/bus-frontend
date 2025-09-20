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
            withCredentials: true,
        });

        this.client.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                console.log('HTTP Request:', config.method?.toUpperCase(), config.url, 'Headers:', config.headers, 'Params:', config.params || config.data);
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.client.interceptors.response.use(
            (response) => {
                console.log('HTTP Response:', response.status, response.data);
                return response;
            },
            (error: AxiosError<ErrorResponse>) => {
                if (error.response?.status === 401) {
                    console.warn('401 Unauthorized, clearing session');
                    this.clearAuth();
                    window.location.href = '/login';
                }
                console.error('Error in response interceptor:', error.response?.data || error.message);
                return Promise.reject(this.formatError(error));
            }
        );
    }

    private formatError(error: AxiosError<ErrorResponse>): ApiError {
        const defaultError: ApiError = {
            message: 'An unexpected error occurred',
            status: 500,
            timestamp: new Date().toISOString(),
        };

        if (error.response) {
            const errorData = error.response.data;
            return {
                message: errorData?.message || errorData?.error || error.message || 'Server error',
                status: error.response.status,
                timestamp: errorData?.timestamp || new Date().toISOString(),
                path: errorData?.path || error.config?.url,
                details: errorData?.details,
            };
        } else if (error.request) {
            return {
                ...defaultError,
                message: 'Connection error. Please check your internet connection.',
                status: 0,
            };
        } else {
            return {
                ...defaultError,
                message: error.message || 'Error in request configuration',
            };
        }
    }

    private clearAuth(): void {
        console.log('Clearing token and user from localStorage');
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