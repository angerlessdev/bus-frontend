import React, {JSX} from 'react';
import { TableProps } from '../../../types';
import { Loading } from '../Loading/Loading';
import './Table.css';

export const Table = <T extends Record<string, any>>({
                                                         data,
                                                         columns,
                                                         loading = false,
                                                         onRowClick,
                                                         className = '',
                                                     }: TableProps<T>): JSX.Element => {
    if (loading) {
        return <Loading />;
    }

    if (data.length === 0) {
        return (
            <div className="table-empty">
                <p>No hay datos disponibles</p>
            </div>
        );
    }

    return (
        <div className={`table-container ${className}`}>
            <table className="table">
                <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={String(column.key)}
                            style={{ width: column.width }}
                            className={column.sortable ? 'table-sortable' : ''}
                        >
                            {column.header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr
                        key={index}
                        onClick={() => onRowClick && onRowClick(item)}
                        className={onRowClick ? 'table-row-clickable' : ''}
                    >
                        {columns.map((column) => (
                            <td key={String(column.key)}>
                                {column.render
                                    ? column.render(item[column.key], item)
                                    : item[column.key]
                                }
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};