import { useState, useCallback } from 'react';
import {
    UseBusesReturn,
    Bus,
    PaginationInfo,
    PaginationParams,
    CreateBusRequest,
    ApiError
} from '../types';
import { busService } from '../services';

export const useBuses = (): UseBusesReturn => {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBuses = useCallback(async (params?: PaginationParams): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await busService.getBuses(params);

            setBuses(response.content);
            setPagination({
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                totalItems: response.totalItems,
                size: params?.size || 10,
            });
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message || 'Error al cargar los buses');
            setBuses([]);
            setPagination(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getBusById = useCallback(async (id: number): Promise<Bus | null> => {
        setError(null);

        try {
            const bus = await busService.getBusById(id);
            return bus;
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message || 'Error al cargar el bus');
            return null;
        }
    }, []);

    const createBus = useCallback(async (busData: CreateBusRequest): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            await busService.createBus(busData);
            await fetchBuses();
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message || 'Error al crear el bus');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [fetchBuses]);

    const clearError = useCallback((): void => {
        setError(null);
    }, []);

    return {
        buses,
        pagination,
        isLoading,
        error,
        fetchBuses,
        getBusById,
        createBus,
        clearError,
    };
};