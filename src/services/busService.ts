import {
    Bus,
    PagedResponse,
    CreateBusRequest,
    PaginationParams,
    API_ENDPOINTS
} from '../types';
import { apiClient } from './api';

class BusService {
    async getBuses(params?: PaginationParams): Promise<PagedResponse<Bus>> {
        try {
            const queryParams = {
                page: params?.page || 0,
                size: params?.size || 10,
            };

            const response = await apiClient.get<PagedResponse<Bus>>(
                API_ENDPOINTS.BUSES.LIST,
                queryParams
            );

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getBusById(id: number): Promise<Bus> {
        try {
            const response = await apiClient.get<Bus>(
                API_ENDPOINTS.BUSES.BY_ID(id)
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async createBus(busData: CreateBusRequest): Promise<Bus> {
        try {
            const response = await apiClient.post<Bus>(
                API_ENDPOINTS.BUSES.CREATE,
                busData
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateBus(id: number, busData: Partial<CreateBusRequest>): Promise<Bus> {
        try {
            const response = await apiClient.put<Bus>(
                API_ENDPOINTS.BUSES.UPDATE(id),
                busData
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteBus(id: number): Promise<void> {
        try {
            await apiClient.delete<void>(API_ENDPOINTS.BUSES.DELETE(id));
        } catch (error) {
            throw error;
        }
    }

    // Método para buscar buses (filtros futuros)
    async searchBuses(
        query: string,
        params?: PaginationParams
    ): Promise<PagedResponse<Bus>> {
        try {
            const queryParams = {
                search: query,
                page: params?.page || 0,
                size: params?.size || 10,
            };

            const response = await apiClient.get<PagedResponse<Bus>>(
                API_ENDPOINTS.BUSES.LIST,
                queryParams
            );

            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const busService = new BusService();