import React from 'react';
import { Bus } from '../../../../types';
import './BusModal.css';
import { Button } from '../../../ui/Button/Button';
import { Modal } from '../../../ui/Modal/Modal';

interface BusModalProps {
    isOpen: boolean;
    onClose: () => void;
    bus: Bus | null;
}

export const BusModal: React.FC<BusModalProps> = ({
                                                      isOpen,
                                                      onClose,
                                                      bus,
                                                  }) => {
    if (!bus) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Bus Details"
            size="md"
        >
            <div className="bus-modal-content">
                <div className="bus-modal-section">
                    <h3>General Information</h3>
                    <div className="bus-modal-grid">
                        <div className="bus-modal-field">
                            <label>ID:</label>
                            <span>{bus.id}</span>
                        </div>
                        <div className="bus-modal-field">
                            <label>Bus Number:</label>
                            <span>{bus.busNumber}</span>
                        </div>
                        <div className="bus-modal-field">
                            <label>License Plate:</label>
                            <span>{bus.licensePlate}</span>
                        </div>
                        <div className="bus-modal-field">
                            <label>Status:</label>
                            <span className={`bus-status ${bus.active ? 'bus-active' : 'bus-inactive'}`}>
                                {bus.active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bus-modal-section">
                    <h3>Brand</h3>
                    <div className="bus-modal-grid">
                        <div className="bus-modal-field">
                            <label>Name:</label>
                            <span>{bus.busBrand.name}</span>
                        </div>
                    </div>
                </div>

                <div className="bus-modal-section">
                    <h3>Features</h3>
                    <div className="bus-modal-characteristics">
                        <p>{bus.features}</p>
                    </div>
                </div>

                <div className="bus-modal-actions">
                    <Button onClick={onClose} variant="secondary">
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};