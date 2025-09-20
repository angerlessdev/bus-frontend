import React, { useState } from 'react';
import { useAuth } from '../../../../hooks';
import './LoginForm.css';
import { Button } from '../../../ui/Button/Button';

export const LoginForm: React.FC = () => {
    const { login, isLoading, error } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({
        username: '',
        password: '',
    });

    const validateForm = (): boolean => {
        const errors = {
            username: '',
            password: '',
        };

        if (!formData.username.trim()) {
            errors.username = 'El usuario es requerido';
        }

        if (!formData.password.trim()) {
            errors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 3) {
            errors.password = 'La contraseña debe tener al menos 3 caracteres';
        }

        setFormErrors(errors);
        return !errors.username && !errors.password;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await login(formData);
        } catch (err) {
            // El error ya se maneja en el hook useAuth
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (formErrors[name as keyof typeof formErrors]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="login-form-container">
            <div className="login-form-card">
                <div className="login-form-header">
                    <h1>Bus Management System</h1>
                    <p>Inicia sesión para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`form-input ${formErrors.username ? 'form-input-error' : ''}`}
                            placeholder="Ingrese su usuario"
                            disabled={isLoading}
                        />
                        {formErrors.username && (
                            <span className="form-error">{formErrors.username}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-input ${formErrors.password ? 'form-input-error' : ''}`}
                            placeholder="Ingrese su contraseña"
                            disabled={isLoading}
                        />
                        {formErrors.password && (
                            <span className="form-error">{formErrors.password}</span>
                        )}
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={isLoading}
                        className="login-button"
                    >
                        Iniciar Sesión
                    </Button>
                </form>

                <div className="login-demo-info">
                    <p><strong>Credenciales de prueba:</strong></p>
                    <p>Usuario: admin</p>
                    <p>Contraseña: admin123</p>
                </div>
            </div>
        </div>
    );
};
