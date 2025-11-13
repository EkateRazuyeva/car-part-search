
import {GetParts} from './types'
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

