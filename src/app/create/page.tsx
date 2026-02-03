'use client';

import { useState, useEffect } from 'react';
import { Contact } from '@/lib/contact-parser';
import { FileText, Video, Globe, Download, Play } from 'lucide-react';
import AnimationPreview from '@/components/AnimationPreview';
import { generatePDF } from '@/lib/pdf-generator';
import clsx from 'clsx'; // Assuming clsx is installed as I did earlier

export default function CreatePage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [activeTab, setActiveTab] = useState<'pdf' | 'animation' | 'web'>('pdf');

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
                <h1 className="text-4xl font-bold mb-2 text-white">Creative Studio</h1>
                <p className="text-gray-400">Transform your message into diverse formats.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[600px]">
                {/* Contact Selector */}
                <div className="md:col-span-3 glass-panel p-4 overflow-y-auto">
                    <h3 className="font-semibold text-gray-300 mb-4 sticky top-0 bg-[#111029] py-2 z-10">Select Target</h3>
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
                                <div className="font-medium text-white">{contact.name}</div>
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
                            className={clsx("flex items-center gap-2 px-4 py-2 rounded-lg transition-all", activeTab === 'pdf' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white")}
                        >
                            <FileText size={18} /> PDF Document
                        </button>
                        <button
                            onClick={() => setActiveTab('animation')}
                            className={clsx("flex items-center gap-2 px-4 py-2 rounded-lg transition-all", activeTab === 'animation' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white")}
                        >
                            <Video size={18} /> Animation
                        </button>
                        <button
                            onClick={() => setActiveTab('web')}
                            className={clsx("flex items-center gap-2 px-4 py-2 rounded-lg transition-all", activeTab === 'web' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white")}
                        >
                            <Globe size={18} /> Web Page
                        </button>
                    </div>

                    {/* Canvas */}
                    <div className="flex-1 glass-panel p-8 flex flex-col items-center justify-center bg-black/40 relative">
                        {!selectedContact ? (
                            <p className="text-gray-500">Select a contact from the left to start creating.</p>
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
                                            <Download size={18} /> Download PDF
                                        </button>
                                    </div>
                                )}

                                {activeTab === 'animation' && (
                                    <div className="w-full max-w-lg">
                                        <AnimationPreview contact={selectedContact} />
                                    </div>
                                )}

                                {activeTab === 'web' && (
                                    <div className="w-full h-full border border-gray-700 rounded-lg overflow-hidden bg-white relative group">
                                        <div className="bg-gray-100 p-2 border-b flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                        </div>
                                        <div className="p-8 text-center text-black">
                                            <h1 className="text-3xl font-bold mb-4">Welcome, {selectedContact.name}!</h1>
                                            <p className="text-gray-600 mb-8">We have created a personal landing page just for you.</p>
                                            <button className="bg-blue-600 text-white px-6 py-2 rounded">Check Offer</button>
                                        </div>
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                            <button className="bg-white text-black px-6 py-2 rounded-full font-bold">Preview Live</button>
                                        </div>
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
