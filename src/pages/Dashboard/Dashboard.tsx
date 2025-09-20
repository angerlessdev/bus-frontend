import React from 'react';
import { Layout } from '../../components/layout/Layout/Layout';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
    return (
        <Layout>
            <div className="dashboard">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Bienvenido al sistema de gestión de buses</p>
                </div>

                <div className="dashboard-stats">
                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-icon">🚌</div>
                        <div className="dashboard-stat-content">
                            <h3>Total Buses</h3>
                            <p className="dashboard-stat-number">--</p>
                            <p className="dashboard-stat-description">Buses registrados</p>
                        </div>
                    </div>

                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-icon">✅</div>
                        <div className="dashboard-stat-content">
                            <h3>Buses Activos</h3>
                            <p className="dashboard-stat-number">--</p>
                            <p className="dashboard-stat-description">En servicio</p>
                        </div>
                    </div>

                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-icon">🏭</div>
                        <div className="dashboard-stat-content">
                            <h3>Marcas</h3>
                            <p className="dashboard-stat-number">--</p>
                            <p className="dashboard-stat-description">Diferentes marcas</p>
                        </div>
                    </div>
                </div>

                <div className="dashboard-actions">
                    <div className="dashboard-action-card">
                        <h3>Gestión de Buses</h3>
                        <p>Ver, crear y administrar la flota de buses</p>
                        <a href="/buses" className="dashboard-action-link">
                            Ir a Buses →
                        </a>
                    </div>

                    <div className="dashboard-action-card">
                        <h3>Reportes</h3>
                        <p>Generar reportes y estadísticas</p>
                        <span className="dashboard-action-disabled">
              Próximamente
            </span>
                    </div>
                </div>
            </div>
        </Layout>
    );
};