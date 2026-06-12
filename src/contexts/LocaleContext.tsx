import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, SupportedLocale, supportedLocales, getNestedTranslation, defaultLocale } from '../i18n';

interface LocaleContextType {
    locale: SupportedLocale;
    changeLocale: (newLocale: SupportedLocale) => void;
    t: (key: string) => string;
    supportedLocales: readonly SupportedLocale[];
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<SupportedLocale>(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang') as SupportedLocale;
        if (urlLang && supportedLocales.includes(urlLang)) {
            return urlLang;
        }

        const storedLang = localStorage.getItem('l1a1-locale') as SupportedLocale;
        if (storedLang && supportedLocales.includes(storedLang)) {
            return storedLang;
        }

        const browserLang = navigator.language.split('-')[0] as SupportedLocale;
        if (supportedLocales.includes(browserLang)) {
            return browserLang;
        }

        return defaultLocale; // 'de'
    });

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    const changeLocale = useCallback((newLocale: SupportedLocale) => {
        localStorage.setItem('l1a1-locale', newLocale);
        setLocale(newLocale);

        const url = new URL(window.location.href);
        url.searchParams.set('lang', newLocale);
        window.history.replaceState({}, '', url.toString());
    }, []);

    const t = useCallback((key: string): string => {
        const translationSet = translations[locale];
        return getNestedTranslation(translationSet, key);
    }, [locale]);

    return (
        <LocaleContext.Provider value={{ locale, changeLocale, t, supportedLocales }}>
            {children}
        </LocaleContext.Provider>
    );
}
