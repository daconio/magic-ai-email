'use client';

import { useSettings, Theme } from '@/context/SettingsContext';
import { Moon, Sun, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function ThemeSwitcher() {
    const { theme, setTheme } = useSettings();

    const themes: { id: Theme; icon: any; label: string }[] = [
        { id: 'magic', icon: Sparkles, label: 'Magic' },
        { id: 'light', icon: Sun, label: 'Light' },
        { id: 'daker', icon: Moon, label: 'Daker' },
    ];

    return (
        <div className="flex bg-black/20 p-1 rounded-lg border border-white/10">
            {themes.map((t) => {
                const Icon = t.icon;
                const isActive = theme === t.id;

                return (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={clsx(
                            "relative flex-1 flex items-center justify-center p-2 rounded-md transition-all",
                            isActive ? "text-white" : "text-gray-400 hover:text-white"
                        )}
                        title={t.label}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeTheme"
                                className="absolute inset-0 bg-white/10 rounded-md"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <Icon size={16} />
                    </button>
                );
            })}
        </div>
    );
}
