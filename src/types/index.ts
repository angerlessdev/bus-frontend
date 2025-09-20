export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    type: string;
}

export interface User {
    username: string;
    authorities: string[];
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface DashboardStats {
    totalBuses: number;
    activeBuses: number;
    inactiveBuses: number;
    brands: number;
}

export interface BusBrand {
    id: number;
    name: string;
}

export interface Bus {
    id: number;
    busNumber: string;
    licensePlate: string;
    features: string;
    active: boolean;
    busBrand: BusBrand;
}

export interface CreateBusRequest {
    busNumber: string;
    licensePlate: string;
    features: string;
    brandId: number;
    active: boolean;
}


export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    size: number;
}

export interface PagedResponse<T> {
    content: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

export interface PaginationParams {
    page?: number;
    size?: number;
}


export interface ApiError {
    message: string;
    status: number;
    timestamp: string;
    path?: string;
    details?: string[];
}

export interface ApiResponse<T> {
    data?: T;
    error?: ApiError;
    success: boolean;
}

export interface LoadingState {
    isLoading: boolean;
    error: string | null;
}

export interface BusesState extends LoadingState {
    buses: Bus[];
    pagination: PaginationInfo | null;
    selectedBus: Bus | null;
}

export interface ModalState {
    isOpen: boolean;
    type: 'view' | 'edit' | 'create' | null;
    data?: any;
}

export interface FormField {
    name: string;
    value: string;
    error?: string;
    touched?: boolean;
}

export interface FormState {
    [key: string]: FormField;
}

export interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
}

export interface ValidationRules {
    [fieldName: string]: ValidationRule;
}

export interface TableColumn<T> {
    key: keyof T;
    header: string;
    render?: (value: any, item: T) => React.ReactNode;
    sortable?: boolean;
    width?: string;
}

export interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    loading?: boolean;
    onRowClick?: (item: T) => void;
    className?: string;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}

export interface UseAuthReturn {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

export interface UseBusesReturn {
    buses: Bus[];
    pagination: PaginationInfo | null;
    isLoading: boolean;
    error: string | null;
    fetchBuses: (params?: PaginationParams) => Promise<void>;
    getBusById: (id: number) => Promise<Bus | null>;
    createBus: (bus: CreateBusRequest) => Promise<void>;
    clearError: () => void;
}

export interface UseModalReturn {
    isOpen: boolean;
    modalType: 'view' | 'edit' | 'create' | null;
    modalData: any;
    openModal: (type: 'view' | 'edit' | 'create', data?: any) => void;
    closeModal: () => void;
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
    data: T | null;
    status: RequestStatus;
    error: string | null;
}
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
    },
    BUSES: {
        LIST: '/bus',
        BY_ID: (id: number) => `/bus/${id}`,
        CREATE: '/bus',
        UPDATE: (id: number) => `/bus/${id}`,
        DELETE: (id: number) => `/bus/${id}`,
    },
    BRANDS: {
        LIST: '/bus-brands',
    },
} as const;

export const STORAGE_KEYS = {
    TOKEN: 'auth_token',
    USER: 'auth_user',
} as const;

export const PAGINATION_DEFAULTS = {
    PAGE: 0,
    SIZE: 10,
} as const;