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
            errors.username = 'Username is required';
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 3) {
            errors.password = 'Password must be at least 3 characters';
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
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (formErrors[name as keyof typeof formErrors]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="login-form-container">
            <div className="login-form-card">
                <div className="login-form-header">
                    <h1>Bus Management System</h1>
                    <p>Log in to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`form-input ${formErrors.username ? 'form-input-error' : ''}`}
                            placeholder="Enter your username"
                            disabled={isLoading}
                        />
                        {formErrors.username && (
                            <span className="form-error">{formErrors.username}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-input ${formErrors.password ? 'form-input-error' : ''}`}
                            placeholder="Enter your password"
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
                        Log In
                    </Button>
                </form>

                <div className="login-demo-info">
                    <p><strong>Demo credentials:</strong></p>
                    <p>Username: admin</p>
                    <p>Password: admin123</p>
                </div>
            </div>
        </div>
    );
};
