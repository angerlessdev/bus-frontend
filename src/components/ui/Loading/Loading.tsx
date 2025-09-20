import React from 'react';
import './Loading.css';

interface LoadingProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
                                                    message = 'Cargando...',
                                                    size = 'md',
                                                    className = '',
                                                }) => {
    return (
        <div className={`loading ${className}`}>
            <div className={`loading-spinner loading-${size}`}></div>
            {message && <p className="loading-message">{message}</p>}
        </div>
    );
};