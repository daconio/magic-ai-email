'use client';

import { useState, useEffect } from 'react';
import { Contact } from '@/lib/contact-parser';
import { FileText, Video, Globe, Download } from 'lucide-react';
import AnimationPreview from '@/components/AnimationPreview';
import { generatePDF } from '@/lib/pdf-generator';
import LandingPagePreview from '@/components/LandingPagePreview';
import clsx from 'clsx';
import { useSettings } from '@/context/SettingsContext';

export default function CreatePage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [activeTab, setActiveTab] = useState<'pdf' | 'animation' | 'web'>('pdf');
    const { t } = useSettings();

    useEffect(() => {
        const saved = localStorage.getItem('magic_contacts');
        if (saved) {
            try {
                setContacts(JSON.parse(saved));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const handleDownloadPDF = () => {
        if (selectedContact) {
            generatePDF(selectedContact, '');
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 h-full">
            <div>
                <h1 className="text-4xl font-bold mb-2">{t.create.title}</h1>
                <p className="text-gray-400">{t.create.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[600px]">
                {/* Contact Selector */}
                <div className="md:col-span-3 glass-panel p-4 overflow-y-auto">
                    <h3 className="font-semibold text-gray-300 mb-4 sticky top-0 bg-transparent py-2 z-10 backdrop-blur-md">{t.create.selectTarget}</h3>
                    <div className="space-y-2">
                        {contacts.length === 0 && <p className="text-sm text-gray-500">No contacts found.</p>}
                        {contacts.map((contact, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedContact(contact)}
                                className={clsx(
                                    "w-full text-left p-3 rounded-lg text-sm transition-colors",
                                    selectedContact === contact
                                        ? "bg-purple-500/20 text-purple-200 border border-purple-500/50"
                                        : "hover:bg-white/5 text-gray-400"
                                )}
                            >
                                <div className="font-medium">{contact.name}</div>
                                <div className="text-xs truncate">{contact.email}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Studio Area */}
                <div className="md:col-span-9 flex flex-col gap-6">
                    {/* Tabs */}
                    <div className="flex gap-4 border-b border-white/10 pb-4">
                        <button
                            onClick={() => setActiveTab('pdf')}
                            className={clsx("flex items-center gap-2 px-4 py-2 rounded-lg transition-all", activeTab === 'pdf' ? "bg-white/10" : "text-gray-400 hover:text-white")}
                        >
                            <FileText size={18} /> {t.create.tabs.pdf}
                        </button>
                        <button
                            onClick={() => setActiveTab('animation')}
                            className={clsx("flex items-center gap-2 px-4 py-2 rounded-lg transition-all", activeTab === 'animation' ? "bg-white/10" : "text-gray-400 hover:text-white")}
                        >
                            <Video size={18} /> {t.create.tabs.animation}
                        </button>
                        <button
                            onClick={() => setActiveTab('web')}
                            className={clsx("flex items-center gap-2 px-4 py-2 rounded-lg transition-all", activeTab === 'web' ? "bg-white/10" : "text-gray-400 hover:text-white")}
                        >
                            <Globe size={18} /> {t.create.tabs.web}
                        </button>
                    </div>

                    {/* Canvas */}
                    <div className="flex-1 glass-panel p-8 flex flex-col items-center justify-center bg-black/40 relative">
                        {!selectedContact ? (
                            <p className="text-gray-500">{t.create.preview.select}</p>
                        ) : (
                            <>
                                {activeTab === 'pdf' && (
                                    <div className="text-center space-y-4">
                                        <div className="w-32 h-44 bg-white mx-auto shadow-2xl flex flex-col p-2 items-start opacity-90">
                                            <div className="w-full h-2 bg-gray-200 mb-2"></div>
                                            <div className="w-3/4 h-2 bg-gray-200 mb-4"></div>
                                            <div className="text-[6px] text-left text-gray-800">
                                                Hello {selectedContact.name},<br /><br />
                                                This is a preview of your document...
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleDownloadPDF}
                                            className="btn-primary flex items-center gap-2 mx-auto"
                                        >
                                            <Download size={18} /> {t.create.preview.download}
                                        </button>
                                    </div>
                                )}

                                {activeTab === 'animation' && (
                                    <div className="w-full max-w-lg">
                                        <AnimationPreview contact={selectedContact} />
                                    </div>
                                )}

                                {activeTab === 'web' && (
                                    <div className="w-full h-full border border-gray-700 rounded-lg overflow-hidden relative shadow-2xl">
                                        <LandingPagePreview contact={selectedContact} />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
