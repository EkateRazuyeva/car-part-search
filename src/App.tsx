import React, {useCallback, useState} from 'react';
import './App.css';
import {SearchInput} from './components/SearchInput/SearchInput';
import {fetchManufacturerDetails, fetchPartsByName} from './services/api';
import {ManufacturerDetails, Part} from './services/types';
import {PartsList} from './components/PartsList/PsrtsList';
import {DetailsModal} from './components/DetailModal/DetailModal';
import {Filter} from './components/FilterType/FilterType';
import {Pagination} from './components/Pagination/Pagination';

function App() {
    const [parts, setParts] = useState<Part[]>([]);
    const [details, setDetails] = useState<ManufacturerDetails[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12;
    const [selectedType, setSelectedType] = useState<string>('all');
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState<boolean>(false);


    const handleSearch = useCallback(async (term: string) => {
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


    const handleModal = useCallback(async (id: number) => {
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

    const filteredParts = (selectedType === 'all')
        ? parts
        : parts.filter(p => p.Type === selectedType);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const paginatedParts = filteredParts.slice(firstIndex, lastIndex);

    return (
        <div className="App">
            <SearchInput onSearch={handleSearch}/>
            <Filter types={types} selected={selectedType} onChange={setSelectedType}/>
            {loading ? <p>Загрузка...</p> : <PartsList parts={paginatedParts} onModal={handleModal}/>}
            {modal && <DetailsModal details={details} onClose={() => setModal(false)}/>}
            <Pagination
                currentPage={currentPage}
                totalItems={filteredParts.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}/>
        </div>
    );
}

export default App;
