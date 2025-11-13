import React from 'react';
import {ManufacturerDetails} from '../../services/types';
import './DetailModal.css'


type Props = {
    onClose: () => void;
    details: ManufacturerDetails[];
}

export const DetailsModal = ({onClose, details}: Props) => {
    const manufacturer = details[0];

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>

                <h2 className={"label"}>Дополнительные данные</h2>

                {manufacturer ? (
                    <div className="modal-body">
                        <div className="info-row">
                            <span className="label">Тип производителя:</span>
                            <span className="value"> {manufacturer.ManufacturerTypes?.[0]?.Name || 'Не указано'}
                            </span>
                        </div>

                        <div className="info-row">
                            <span className="label">Адрес:</span>
                            <span className="value">{manufacturer.Address || 'Не указано'}</span>
                        </div>

                        <div className="info-row">
                            <span className="label">Страна:</span>
                            <span className="value">{manufacturer.Country || 'Не указано'}</span>
                        </div>

                        <div className="info-row">
                            <span className="label">Телефон:</span>
                            <span className="value">{manufacturer.ContactPhone || 'Не указано'}</span>
                        </div>

                        <div className="info-row">
                            <span className="label">Email:</span>
                            <span className="value">{manufacturer.ContactEmail || 'Не указано'}</span>
                        </div>
                    </div>

                ) : (
                    <p>Данные о производителе отсутствуют.</p>
                )}
            </div>
        </div>
    );
};