'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { ReactNode } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string |  ReactNode;
    confirmText: string;
    cancelText: string;
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Sim',
    cancelText = 'Não'
}: Props) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className='text-sm text-slate-500'>{description}</div>
                <div className='flex justify-end gap-2 pt-4'>
                    <button className='text-sm font-semibold text-red-500' onClick={onClose}>{cancelText}</button>
                    <button className='text-sm text-slate-900' onClick={onConfirm}>{confirmText}</button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
