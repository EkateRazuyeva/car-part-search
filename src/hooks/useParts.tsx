import {useCallback, useState} from 'react';
import {Part} from '../services/types';
import {fetchPartsByName} from '../services/api';


export const useParts = () => {
    const [parts, setParts] = useState<Part[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const searchParts = useCallback(async (term: string) => {
        if (!term.trim()) return;
        setLoading(true);

        try {
            const data = await fetchPartsByName(term);
            setParts(data.Results || []);

            const allTypes: (string | null)[] = data.Results.map(part => part.Type);
            const filteredTypes: string[] = allTypes.filter((type): type is string => type !== null);
            const uniqueTypes: string[] = [];

            filteredTypes.forEach(type => {
                if (!uniqueTypes.includes(type)) {
                    uniqueTypes.push(type);
                }
            });

            setTypes(uniqueTypes);
        } catch (error) {
            console.error('Ошибка при поиске запчастей:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { parts, types, loading, searchParts };
};
