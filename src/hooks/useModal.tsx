import { useState, useCallback } from 'react';
import { fetchManufacturerDetails } from '../services/api';
import { ManufacturerDetails } from '../services/types';

export const useModal = () => {
    const [modal, setModal] = useState(false);
    const [details, setDetails] = useState<ManufacturerDetails[]>([]);

    const openModal = useCallback(async (id: number) => {
        try {
            const data = await fetchManufacturerDetails(id);
            if (data?.Results) {
                setDetails(data.Results);
                setModal(true);
            }
        } catch (error) {
            console.error('Ошибка при получении данных производителя:', error);
        }
    }, []);

    const closeModal = useCallback(() => setModal(false), []);

    return { modal, details, openModal, closeModal };
};
