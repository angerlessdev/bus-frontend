import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout/Layout';
import { useModal } from '../../hooks';
import { Bus } from '../../types';
import './BusesPage.css';
import { BusTable } from '../../components/features/buses/BusTable/BusTable';
import { BusModal } from '../../components/features/buses/BusModal/BusModal';

export const BusesPage: React.FC = () => {
    const { isOpen, modalType, modalData, openModal, closeModal } = useModal();
    const [selectedBus, setSelectedBus] = useState<Bus | null>(null);

    const handleBusSelect = (bus: Bus) => {
        setSelectedBus(bus);
        openModal('view', bus);
    };

    const handleCloseModal = () => {
        setSelectedBus(null);
        closeModal();
    };

    return (
        <Layout>
            <div className="buses-page">
                <div className="buses-header">
                    <h1>Bus Management</h1>
                    <p>Manage the system's bus fleet</p>
                </div>

                <BusTable onBusSelect={handleBusSelect} />

                <BusModal
                    isOpen={isOpen}
                    onClose={handleCloseModal}
                    bus={selectedBus}
                />
            </div>
        </Layout>
    );
};
