'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '@/lib/i18n';

export type Theme = 'magic' | 'light' | 'daker';

interface SettingsContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    t: typeof translations['en'];
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');
    const [theme, setTheme] = useState<Theme>('magic');

    // Load settings from local storage
    useEffect(() => {
        const savedLang = localStorage.getItem('magic_lang') as Language;
        const savedTheme = localStorage.getItem('magic_theme') as Theme;

        if (savedLang) setLanguage(savedLang);
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            // Default
            document.documentElement.setAttribute('data-theme', 'magic');
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('magic_lang', lang);
    };

    const handleSetTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('magic_theme', newTheme);
    };

    return (
        <SettingsContext.Provider
            value={{
                language,
                setLanguage: handleSetLanguage,
                theme,
                setTheme: handleSetTheme,
                t: translations[language]
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
