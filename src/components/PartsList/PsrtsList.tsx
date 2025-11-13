import {Part} from '../../services/types';
import './PartsList.css'
type Props ={
    parts: Part[];
}

export const PartsList = ({parts}:Props) => {
    return (<div className="parts-list">
            {parts.map((part, i) => (
                <div key={i} className="part-card">
                    <strong className="card-name">{part.Name}</strong>
                    {part.URL && (
                        <a
                            href={part.URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-link"
                        >
                            Детали
                        </a>
                    )}
                    <div className="card-manufacturer">{part.ManufacturerName}</div>
                </div>
            ))}
        </div>
    )
}