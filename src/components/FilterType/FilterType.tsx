import './FilterType.css'

type Props = {
    types: string[];
    selected: string;
    onChange: (val: string) => void;
}

export const Filter = ({types, selected, onChange}: Props) => {
    return (
        <div className="filter-wrapper">
            <label className="filter-label">
                Фильтрация по типу
            </label>
                <select
                    className="filter-select"
                    value={selected}
                    onChange={(e) => onChange(e.target.value)}
                >
                    <option value="all">Все типы</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>

        </div>

    );
};
