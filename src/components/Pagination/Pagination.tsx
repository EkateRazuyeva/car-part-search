import React from 'react';
import './Pagination.css';

type Props = {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
};

export const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }: Props) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="pagination">
            <button
                className={"btn"}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>

            <span className="page-info">{currentPage} / {totalPages}</span>

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};
