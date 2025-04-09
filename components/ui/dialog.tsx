import React from 'react';
import { cn } from '@/lib/utils';

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    cancelText?: string;
    confirmText?: string;
    onConfirm?: () => void;
    className?: string;
}

export function Dialog({
    open,
    onOpenChange,
    title,
    description,
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    onConfirm,
    className
}: DialogProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className={cn(
                "bg-white rounded-lg shadow-lg p-6 w-full max-w-md",
                "transform transition-all",
                className
            )}>
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 mb-6">{description}</p>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => onOpenChange(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        {cancelText}
                    </button>
                    {onConfirm && (
                        <button
                            onClick={() => {
                                onConfirm();
                                onOpenChange(false);
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90"
                        >
                            {confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
} 