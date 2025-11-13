import React, {useCallback, useState} from 'react';
import './App.css';
import {SearchInput} from './components/SearchInput/SearchInput';
import {fetchPartsByName} from './services/api';
import {Part} from './services/types';

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
            console.error("Ошибка при поиске запчастей:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className="App">
            <SearchInput onSearch={handleSearch} />

            {loading ? (
                <p>Загрузка...</p>
            ) : (
                parts.map((part, i) => (
                    <div key={i}>
                        <strong>{part.Name}</strong>
                        <span>{part.URL}</span>
                        <div>{part.ManufacturerName}</div>

                    </div>
                ))
            )}
        </div>
    );
}

export default App;
