import React, {useCallback, useState} from 'react';
import './App.css';
import {SearchInput} from './components/SearchInput/SearchInput';
import {fetchManufacturerDetails, fetchPartsByName} from './services/api';
import {ManufacturerDetails, Part} from './services/types';
import {PartsList} from './components/PartsList/PsrtsList';
import {DetailsModal} from './components/DetailModal/DetailModal';

function App() {
    const [parts, setParts] = useState<Part[]>([]);
    const [details, setDetails] = useState<ManufacturerDetails[]>([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState<boolean>(false);


    const handleSearch = useCallback(async (term: string) => {
        if (!term.trim()) return;
        setLoading(true);

        try {
            const data = await fetchPartsByName(term);
            setParts(data.Results || []);
            console.log(data);
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

    return (
        <div className="App">
            <SearchInput onSearch={handleSearch}/>

            {loading ? <p>Загрузка...</p> : <PartsList parts={parts} onModal={handleModal}/>}
            {modal && <DetailsModal details={details} onClose={() => setModal(false)}/>}
        </div>
    );
}

export default App;
