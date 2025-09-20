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
        console.log('📡 Calling getBuses with params:', params);
        try {
            const queryParams = {
                page: params?.page || 0,
                size: params?.size || 10,
            };
            console.log('Calling getBuses with params:', queryParams, 'baseURL:', process.env.REACT_APP_API_BASE_URL);

            const response = await apiClient.get<PagedResponse<Bus>>(
                API_ENDPOINTS.BUSES.LIST,
                queryParams
            );

            console.log('Response from getBuses:', response);
            return response;
        } catch (error) {
            console.error('Error in getBuses:', error);
            throw error;
        }
    }

    async getBusById(id: number): Promise<Bus> {
        console.log('Calling getBusById with id:', id);
        try {
            const response = await apiClient.get<Bus>(API_ENDPOINTS.BUSES.BY_ID(id));
            console.log('Response from getBusById:', response);
            return response;
        } catch (error) {
            console.error('Error in getBusById:', error);
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
}

export const busService = new BusService();
