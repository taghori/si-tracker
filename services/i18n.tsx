import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../locales/en.json';
import de from '../locales/de.json';

type Translations = typeof en;
const translations: Record<string, Translations> = { en, de };

type I18nContextType = {
    language: string;
    setLanguage: (lang: string) => void;
    t: (key: string, params?: Record<string, string | number>) => any;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState(() => {
        return localStorage.getItem('spirit-island-language') || 'en';
    });

    const setLanguage = (lang: string) => {
        setLanguageState(lang);
        localStorage.setItem('spirit-island-language', lang);
    };

    const t = (key: string, params?: Record<string, string | number>): any => {
        const keys = key.split('.');
        let result: any = translations[language];

        for (const k of keys) {
            if (result && result[k] !== undefined) {
                result = result[k];
            } else {
                // Fallback to English if key missing in current language
                let fallback: any = translations['en'];
                for (const fk of keys) {
                    if (fallback && fallback[fk] !== undefined) {
                        fallback = fallback[fk];
                    } else {
                        fallback = key;
                        break;
                    }
                }
                result = fallback;
                break;
            }
        }

        if (typeof result !== 'string') return result;

        if (params) {
            let replaced = result;
            Object.entries(params).forEach(([k, v]) => {
                replaced = replaced.replace(`{${k}}`, String(v));
            });
            return replaced;
        }

        return result;
    };

    return (
        <I18nContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};
