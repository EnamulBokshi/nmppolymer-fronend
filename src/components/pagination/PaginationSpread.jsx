import React from 'react';
import PropTypes from 'prop-types';

const PaginationSpread = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === currentPage ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            {renderPageNumbers()}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

PaginationSpread.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default PaginationSpread;