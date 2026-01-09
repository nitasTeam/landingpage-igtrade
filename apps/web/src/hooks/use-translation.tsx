import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations } from '../translations';

type Language = 'id' | 'en' | 'cn';

interface TranslationState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const useTranslation = create<TranslationState>()(
  persist(
    (set, get) => ({
      language: 'id',
      setLanguage: (lang) => set({ language: lang }),
      t: (key: string) => {
        const keys = key.split('.');
        let value: any = translations[get().language];

        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = value[k];
          } else {
            return key;
          }
        }

        return typeof value === 'string' ? value : key;
      },
    }),
    {
      name: 'language-storage',
    }
  )
);

