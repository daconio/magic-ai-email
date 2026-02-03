'use client';

import { Contact } from '@/lib/contact-parser';
import { Mail, Phone, Building, User } from 'lucide-react';

interface ContactTableProps {
    contacts: Contact[];
}

export default function ContactTable({ contacts }: ContactTableProps) {
    if (contacts.length === 0) return null;

    return (
        <div className="w-full overflow-hidden rounded-xl border border-white/10 glass-panel">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-white/5">
                            <th className="text-left py-4 px-6">Name</th>
                            <th className="text-left py-4 px-6">Email</th>
                            <th className="text-left py-4 px-6">Company</th>
                            <th className="text-left py-4 px-6">Role</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {contacts.map((contact, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                                            {contact.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-medium text-white">{contact.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-gray-300 group-hover:text-purple-300 transition-colors">
                                    {contact.email}
                                </td>
                                <td className="py-4 px-6 text-gray-400">
                                    {contact.company || '-'}
                                </td>
                                <td className="py-4 px-6 text-gray-400">
                                    {contact.role || '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-white/10 text-sm text-gray-500 text-center">
                Showing {contacts.length} contacts
            </div>
        </div>
    );
}
