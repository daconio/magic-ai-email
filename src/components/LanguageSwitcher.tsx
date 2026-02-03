'use client';

import { useSettings } from '@/context/SettingsContext';
import clsx from 'clsx';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useSettings();

    return (
        <div className="flex items-center text-xs font-bold border border-white/10 rounded-lg overflow-hidden">
            <button
                onClick={() => setLanguage('en')}
                className={clsx(
                    "px-3 py-1 transition-colors",
                    language === 'en'
                        ? "bg-white/20 text-white"
                        : "bg-black/20 text-gray-500 hover:text-gray-300"
                )}
            >
                EN
            </button>
            <div className="w-[1px] h-full bg-white/10" />
            <button
                onClick={() => setLanguage('ko')}
                className={clsx(
                    "px-3 py-1 transition-colors",
                    language === 'ko'
                        ? "bg-white/20 text-white"
                        : "bg-black/20 text-gray-500 hover:text-gray-300"
                )}
            >
                KO
            </button>
        </div>
    );
}
