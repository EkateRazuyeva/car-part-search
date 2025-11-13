import React, {useCallback, useState} from 'react';
import './App.css';
import {SearchInput} from './components/SearchInput/SearchInput';
import {fetchManufacturerDetails} from './services/api';
import {ManufacturerDetails} from './services/types';
import {PartsList} from './components/PartsList/PsrtsList';
import {DetailsModal} from './components/DetailModal/DetailModal';
import {Filter} from './components/FilterType/FilterType';
import {Pagination} from './components/Pagination/Pagination';
import {useParts} from './hooks/useParts';

function App() {
    const [details, setDetails] = useState<ManufacturerDetails[]>([]);
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12;
    const [selectedType, setSelectedType] = useState<string>('all');
    const [modal, setModal] = useState<boolean>(false);

    const { parts, types, loading, searchParts } = useParts();



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
            <SearchInput onSearch={searchParts}/>
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
