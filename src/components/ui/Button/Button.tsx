import React from 'react';
import { ButtonProps } from '../../../types';
import './Button.css';

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  onClick,
                                                  type = 'button',
                                                  variant = 'primary',
                                                  size = 'md',
                                                  disabled = false,
                                                  loading = false,
                                                  className = '',
                                              }) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClass = `btn-${size}`;
    const disabledClass = disabled || loading ? 'btn-disabled' : '';
    const loadingClass = loading ? 'btn-loading' : '';

    const classes = [baseClass, variantClass, sizeClass, disabledClass, loadingClass, className]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading && <span className="btn-spinner"></span>}
            {children}
        </button>
    );
};