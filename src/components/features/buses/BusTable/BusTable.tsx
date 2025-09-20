import React, { useEffect } from 'react';
import { Bus, TableColumn } from '../../../../types';
import { useBuses, useModal } from '../../../../hooks';
import './BusTable.css';
import { Button } from '../../../ui/Button/Button';
import { Table } from '../../../ui/Table/Table';
import { Pagination } from '../../../ui/Pagination/Pagination';

interface BusTableProps {
    onBusSelect?: (bus: Bus) => void;
}

export const BusTable: React.FC<BusTableProps> = ({ onBusSelect }) => {
    const { buses, pagination, isLoading, error, fetchBuses } = useBuses();
    const { openModal } = useModal();

    useEffect(() => {
    }, [fetchBuses]);

    const handlePageChange = (page: number) => {
        fetchBuses({ page, size: pagination?.size || 10 });
    };

    const handleRowClick = (bus: Bus) => {
        if (onBusSelect) {
            onBusSelect(bus);
        } else {
            openModal('view', bus);
        }
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('es-PE');
    };

    const columns: TableColumn<Bus>[] = [
        {
            key: 'busNumber',
            header: 'Número de Bus',
            width: '120px',
        },
        {
            key: 'licensePlate',
            header: 'Placa',
            width: '100px',
        },
        {
            key: 'busBrand',
            header: 'Marca',
            width: '120px',
            render: (busBrand) => busBrand.name,
        },
        {
            key: 'features',
            header: 'Características',
            render: (features) => (
                <span title={features}>
        {features.length > 50
            ? `${features.substring(0, 50)}...`
            : features
        }
      </span>
            ),
        },
        {
            key: 'active',
            header: 'Estado',
            width: '100px',
            render: (active) => (
                <span className={`bus-status ${active ? 'bus-active' : 'bus-inactive'}`}>
        {active ? 'Activo' : 'Inactivo'}
      </span>
            ),
        },
    ];

    if (error) {
        return (
            <div className="bus-table-error">
                <p>Error al cargar los buses: {error}</p>
                <Button onClick={() => fetchBuses()}>
                    Reintentar
                </Button>
            </div>
        );
    }

    return (
        <div className="bus-table-container">
            <div className="bus-table-header">
                <h2>Lista de Buses</h2>
                <div className="bus-table-actions">
                    <Button onClick={() => fetchBuses()}>
                        Actualizar
                    </Button>
                </div>
            </div>

            <Table
                data={buses}
                columns={columns}
                loading={isLoading}
                onRowClick={handleRowClick}
                className="bus-table"
            />

            {pagination && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    totalItems={pagination.totalItems}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};