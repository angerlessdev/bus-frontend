import React, { useEffect } from "react";
import { Layout } from "../../components/layout/Layout/Layout";
import "./Dashboard.css";
import { useBuses } from "../../hooks/useBuses";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import { Loading } from "../../components/ui/Loading/Loading";

export const Dashboard: React.FC = () => {
    const { buses, fetchBuses, isLoading, error } = useBuses();

    const stats = useDashboardStats(buses);

    useEffect(() => {
        fetchBuses({ page: 0, size: 100 });
    }, [fetchBuses]);

    if (isLoading) {
        return (
            <Layout>
                <Loading message="Loading dashboard stats..." />
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="dashboard-error">
                    <p>Error loading stats: {error}</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="dashboard">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Welcome to the bus management system</p>
                </div>

                <div className="dashboard-stats">
                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-icon">🚌</div>
                        <div className="dashboard-stat-content">
                            <h3>Total Buses</h3>
                            <p className="dashboard-stat-number">{stats.totalBuses}</p>
                            <p className="dashboard-stat-description">Registered buses</p>
                        </div>
                    </div>

                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-icon">✅</div>
                        <div className="dashboard-stat-content">
                            <h3>Active Buses</h3>
                            <p className="dashboard-stat-number">{stats.activeBuses}</p>
                            <p className="dashboard-stat-description">In service</p>
                        </div>
                    </div>

                    <div className="dashboard-stat-card">
                        <div className="dashboard-stat-icon">🏭</div>
                        <div className="dashboard-stat-content">
                            <h3>Brands</h3>
                            <p className="dashboard-stat-number">{stats.brands}</p>
                            <p className="dashboard-stat-description">Different brands</p>
                        </div>
                    </div>
                </div>

                <div className="dashboard-actions">
                    <div className="dashboard-action-card">
                        <h3>Bus Management</h3>
                        <p>View, create, and manage the bus fleet</p>
                        <a href="/buses" className="dashboard-action-link">
                            Go to Buses →
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};