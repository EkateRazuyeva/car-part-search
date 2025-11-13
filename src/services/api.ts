
import {DetailsResponse, GetParts} from './types'
import axios from 'axios';

const API_BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

export const fetchPartsByName = async (partName: string): Promise<GetParts> => {
    try {
        const response = await axios.get<GetParts>(
            `${API_BASE_URL}/GetParts?name=${partName}&format=json`
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении запчастей:', error);
        throw error;
    }
};

export const fetchManufacturerDetails = async (id: number): Promise<DetailsResponse> => {
    try {
        const response = await axios.get<DetailsResponse>(
            `${API_BASE_URL}/getmanufacturerdetails/${id}?format=json`
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных о производителе:', error);
        return {
            Count: 0,
            Message: 'Ошибка запроса',
            SearchCriteria: null,
            Results: [],
        };
    }
};
