import { useState, useCallback } from 'react';
import { UseModalReturn } from '../types';

export const useModal = (): UseModalReturn => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<'view' | 'edit' | 'create' | null>(null);
    const [modalData, setModalData] = useState<any>(null);

    const openModal = useCallback((type: 'view' | 'edit' | 'create', data?: any): void => {
        setModalType(type);
        setModalData(data);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback((): void => {
        setIsOpen(false);
        setModalType(null);
        setModalData(null);
    }, []);

    return {
        isOpen,
        modalType,
        modalData,
        openModal,
        closeModal,
    };
};
