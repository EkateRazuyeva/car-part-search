import React, {useState} from 'react';
import './SearchInput.css'

type Props = {
    onSearch: (trim: string) => void;

}

export const SearchInput = ({onSearch}: Props) => {
    const [value, setValue] = useState('');


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(value);
        }
    };

    return (
        <div className={'search'}>
            <input
                type="text"
                placeholder="Введите название запчасти"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={() => onSearch(value)}>Поиск</button>
        </div>
    );
};

