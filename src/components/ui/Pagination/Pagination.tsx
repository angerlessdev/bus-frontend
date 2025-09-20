import React from 'react';
import { PaginationProps } from '../../../types';
import { Button } from '../Button/Button';
import './Pagination.css';

export const Pagination: React.FC<PaginationProps> = ({
                                                          currentPage,
                                                          totalPages,
                                                          totalItems,
                                                          onPageChange,
                                                          className = '',
                                                      }) => {
    const generatePageNumbers = (): number[] => {
        const pages: number[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            const startPage = Math.max(0, currentPage - 2);
            const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    const pageNumbers = generatePageNumbers();

    return (
        <div className={`pagination ${className}`}>
            <div className="pagination-info">
        <span>
          Total: {totalItems} elemento{totalItems !== 1 ? 's' : ''}
        </span>
            </div>

            <div className="pagination-controls">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Anterior
                </Button>

                <div className="pagination-numbers">
                    {pageNumbers.map((pageNum) => (
                        <Button
                            key={pageNum}
                            variant={pageNum === currentPage ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => onPageChange(pageNum)}
                        >
                            {pageNum + 1}
                        </Button>
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    );
};