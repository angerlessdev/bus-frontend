export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1',
    TIMEOUT: 10000,
} as const;

export const APP_CONFIG = {
    NAME: 'Bus Management System',
    VERSION: '1.0.0',
} as const;

export const DEMO_CREDENTIALS = {
    USERNAME: 'admin',
    PASSWORD: 'admin123',
} as const;