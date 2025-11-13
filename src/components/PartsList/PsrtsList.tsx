import {Part} from '../../services/types';
import './PartsList.css'

type Props = {
    parts: Part[];
    onModal: (id: number) => void;
}

export const PartsList = ({parts, onModal}: Props) => {
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
                    <div className="card-manufacturer"
                         onClick={() => {onModal(part.ManufacturerId)}}>
                        {part.ManufacturerName}
                    </div>
                </div>
            ))}
        </div>
    )
}