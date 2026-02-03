'use client';

import { motion } from 'framer-motion';
import { Contact } from '@/lib/contact-parser';

interface AnimationPreviewProps {
    contact: Contact | null;
}

export default function AnimationPreview({ contact }: AnimationPreviewProps) {
    if (!contact) {
        return (
            <div className="w-full h-64 flex items-center justify-center border border-dashed border-gray-700 rounded-xl bg-black/20 text-gray-500">
                Select a contact to preview animation
            </div>
        );
    }

    return (
        <div className="relative w-full h-80 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 border border-white/20 shadow-2xl flex items-center justify-center">
            {/* Background Particles (Simplified) */}
            <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/10 blur-xl"
                        style={{
                            width: Math.random() * 100 + 50,
                            height: Math.random() * 100 + 50,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="relative text-center z-10 p-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    <div className="text-sm font-medium text-pink-300 mb-2 tracking-widest uppercase">
                        Exclusive Invite
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                        Hello, {contact.name}
                    </h2>
                    {contact.company && (
                        <p className="text-xl text-purple-200 mb-6 border-b border-white/20 inline-block pb-1">
                            {contact.company}
                        </p>
                    )}
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full font-semibold shadow-xl hover:bg-white/20 transition-all"
                >
                    Unlock Experience
                </motion.button>
            </div>
        </div>
    );
}
