import type { Locale } from './markets';
import en from '@/data/locales/en.json';
export type Dictionary = typeof en;
const dictionaries = {
  en: async()=>en,
  fr: async()=>(await import('@/data/locales/fr.json')).default,
  de: async()=>(await import('@/data/locales/de.json')).default,
  nl: async()=>(await import('@/data/locales/nl.json')).default,
  da: async()=>(await import('@/data/locales/da.json')).default,
  sv: async()=>(await import('@/data/locales/sv.json')).default,
} satisfies Record<Locale,()=>Promise<Dictionary>>;
export async function getDictionary(locale: Locale): Promise<Dictionary> {return dictionaries[locale]();}
