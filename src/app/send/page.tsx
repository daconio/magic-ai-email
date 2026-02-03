'use client';

import { useState, useEffect } from 'react';
import { Contact } from '@/lib/contact-parser';
import { Send, Users, CheckCircle } from 'lucide-react';
import clsx from 'clsx';
import { useSettings } from '@/context/SettingsContext';

export default function SendPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [sentSuccess, setSentSuccess] = useState(false);
    const { t } = useSettings();

    useEffect(() => {
        const saved = localStorage.getItem('magic_contacts');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setContacts(parsed);
                // Select all by default
                setSelectedContacts(parsed.map((c: Contact) => c.email));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const toggleContact = (email: string) => {
        if (selectedContacts.includes(email)) {
            setSelectedContacts(selectedContacts.filter(e => e !== email));
        } else {
            setSelectedContacts([...selectedContacts, email]);
        }
    };

    const handleSend = async () => {
        setIsSending(true);
        try {
            await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipients: selectedContacts,
                    subject,
                    content
                }),
            });
            setSentSuccess(true);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSending(false);
        }
    };

    if (sentSuccess) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                    <CheckCircle size={48} />
                </div>
                <h1 className="text-4xl font-bold">{t.send.success.title}</h1>
                <p className="text-xl text-gray-400">{t.send.success.desc} {selectedContacts.length} recipients.</p>
                <button
                    onClick={() => {
                        setSentSuccess(false);
                        setSubject('');
                        setContent('');
                    }}
                    className="btn-primary mt-8"
                >
                    {t.send.success.more}
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-8rem)]">
            {/* Contact Selector */}
            <div className="lg:col-span-1 glass-panel p-4 flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-300 flex items-center gap-2">
                        <Users size={18} />
                        {t.send.recipients}
                    </h3>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                        {selectedContacts.length} {t.send.selected}
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                    {contacts.map((contact, i) => (
                        <div
                            key={i}
                            onClick={() => toggleContact(contact.email)}
                            className={clsx(
                                "p-3 rounded-lg border cursor-pointer transition-all flex items-center gap-3",
                                selectedContacts.includes(contact.email)
                                    ? "bg-purple-500/10 border-purple-500/50"
                                    : "bg-black/20 border-transparent opacity-50 hover:opacity-100"
                            )}
                        >
                            <div className={clsx(
                                "w-4 h-4 rounded border flex items-center justify-center",
                                selectedContacts.includes(contact.email) ? "bg-purple-500 border-purple-500" : "border-gray-600"
                            )}>
                                {selectedContacts.includes(contact.email) && <CheckCircle size={12} className="text-white" />}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium truncate">{contact.name}</p>
                                <p className="text-xs text-gray-500 truncate">{contact.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Composer */}
            <div className="lg:col-span-2 glass-panel p-6 flex flex-col h-full space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t.send.subject}</label>
                    <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="..."
                        className="text-lg font-medium"
                    />
                </div>

                <div className="flex-1 flex flex-col">
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t.send.content}</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="..."
                        className="flex-1 resize-none p-4 font-mono text-sm leading-relaxed"
                    />
                </div>

                <div className="flex justify-end pt-4 border-t border-white/10">
                    <button
                        onClick={handleSend}
                        disabled={isSending || selectedContacts.length === 0 || !subject}
                        className="btn-primary flex items-center gap-2 px-8"
                    >
                        {isSending ? (
                            <span className="animate-pulse">{t.send.button.sending}</span>
                        ) : (
                            <>
                                <Send size={18} />
                                {t.send.button.send}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
