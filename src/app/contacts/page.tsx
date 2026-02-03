'use client';

import { useState, useEffect } from 'react';
import FileUpload from '@/components/FileUpload';
import ContactTable from '@/components/ContactTable';
import { parseContactFile, Contact } from '@/lib/contact-parser';
import { Trash2 } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const { t } = useSettings();

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('magic_contacts');
        if (saved) {
            try {
                setContacts(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load contacts', e);
            }
        }
    }, []);

    // Save to local storage whenever contacts change
    useEffect(() => {
        localStorage.setItem('magic_contacts', JSON.stringify(contacts));
    }, [contacts]);

    const handleFileSelect = async (file: File) => {
        setIsProcessing(true);
        try {
            const parsedContacts = await parseContactFile(file);
            setContacts((prev) => [...prev, ...parsedContacts]);
        } catch (error) {
            console.error('Error parsing file:', error);
            alert('Failed to parse file. Please check the format.');
        } finally {
            setIsProcessing(false);
        }
    };

    const clearContacts = () => {
        if (confirm('Are you sure you want to delete all contacts?')) {
            setContacts([]);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold mb-2">{t.contacts.title}</h1>
                    <p className="text-gray-400">{t.contacts.subtitle}</p>
                </div>

                {contacts.length > 0 && (
                    <button
                        onClick={clearContacts}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium"
                    >
                        <Trash2 size={16} />
                        {t.contacts.clear}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 gap-8">
                <FileUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />

                {contacts.length > 0 ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                            {t.contacts.imported}
                        </h2>
                        <ContactTable contacts={contacts} />
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500 border border-dashed border-gray-800 rounded-xl">
                        {t.contacts.upload.desc}
                    </div>
                )}
            </div>
        </div>
    );
}
