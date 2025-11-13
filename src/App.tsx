import React, {useCallback, useState} from 'react';
import './App.css';
import {SearchInput} from './components/SearchInput/SearchInput';
import {fetchPartsByName} from './services/api';
import {Part} from './services/types';
import {PartsList} from './components/PartsList/PsrtsList';

function App() {
    const [parts, setParts] = useState<Part[]>([]);
    const [loading, setLoading] = useState(false);

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

    return (
        <div className="App">
            <SearchInput onSearch={handleSearch}/>

            {loading ? <p>Загрузка...</p> : <PartsList parts={parts}/>}
        </div>
    );
}

export default App;
