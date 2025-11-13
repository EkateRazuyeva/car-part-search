import React, {useState} from 'react';
import './App.css';
import {SearchInput} from './components/SearchInput/SearchInput';
import {PartsList} from './components/PartsList/PsrtsList';
import {DetailsModal} from './components/DetailModal/DetailModal';
import {Filter} from './components/FilterType/FilterType';
import {Pagination} from './components/Pagination/Pagination';
import {useParts} from './hooks/useParts';
import {useModal} from './hooks/useModal';

function App() {

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12;
    const [selectedType, setSelectedType] = useState<string>('all');

    const {parts, types, loading, searchParts} = useParts();

    const {details, modal, openModal, closeModal} = useModal()

    const handlerFilterChange=(value:string)=>{
        setSelectedType(value)
        setCurrentPage(1)
    }

    const filteredParts = (selectedType === 'all')
        ? parts
        : parts.filter(p => p.Type === selectedType);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const paginatedParts = filteredParts.slice(firstIndex, lastIndex);

    return (
        <div className="App">
            <SearchInput onSearch={searchParts}/>
            <Filter types={types} selected={selectedType} onChange={(val)=>handlerFilterChange(val)}/>
            {loading ? <p>Загрузка...</p> : <PartsList parts={paginatedParts} onModal={openModal}/>}
            {modal && <DetailsModal details={details} onClose={closeModal}/>}
            <Pagination
                currentPage={currentPage}
                totalItems={filteredParts.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}/>
        </div>
    );
}

export default App;
