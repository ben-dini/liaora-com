import de from './locales/de.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import it from './locales/it.json';
import sq from './locales/sq.json';

export type SupportedLocale = 'de' | 'en' | 'fr' | 'es' | 'it' | 'sq';

export const translations: Record<SupportedLocale, typeof de> = {
    de,
    en,
    fr,
    es,
    it,
    sq
};

export const defaultLocale: SupportedLocale = 'de';
export const supportedLocales: SupportedLocale[] = ['de', 'en', 'fr', 'es', 'it', 'sq'];

export type TranslationKey = keyof typeof de;

// Helper to get nested value "section.manifest.text"
export function getNestedTranslation(obj: any, path: string): string {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null;
    }, obj) || path;
}
