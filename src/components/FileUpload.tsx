'use client';

import { useState, useCallback } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    isProcessing?: boolean;
}

export default function FileUpload({ onFileSelect, isProcessing }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const { t } = useSettings();

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file.type.includes('sheet') || file.type.includes('csv') || file.name.endsWith('.xlsx')) {
                onFileSelect(file);
            } else {
                alert('Please upload an Excel or CSV file.');
            }
        }
    }, [onFileSelect]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={clsx(
                "relative group cursor-pointer border-2 border-dashed rounded-xl p-12 transition-all duration-300 text-center",
                isDragging
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-gray-700 hover:border-purple-400 hover:bg-white/5"
            )}
        >
            <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept=".xlsx, .xls, .csv"
                disabled={isProcessing}
            />

            <div className="flex flex-col items-center gap-4">
                <div className={clsx(
                    "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
                    isDragging ? "bg-purple-500 text-white" : "bg-gray-800 text-gray-400 group-hover:bg-gray-700"
                )}>
                    {isProcessing ? (
                        <Loader2 className="w-8 h-8 animate-spin" />
                    ) : (
                        <Upload className="w-8 h-8" />
                    )}
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-1">
                        {isProcessing ? t.contacts.upload.processing : t.contacts.upload.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                        {t.contacts.upload.desc}
                    </p>
                </div>
            </div>

            {/* Visual background effect */}
            {isDragging && (
                <motion.div
                    layoutId="upload-active"
                    className="absolute inset-0 bg-purple-500/5 rounded-xl -z-10"
                />
            )}
        </div>
    );
}
