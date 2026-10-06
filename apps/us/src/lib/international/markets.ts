import { currencyByCountry } from './provider-markets.ts';

// Add a language here only when its complete public dictionary passes validation.
export const languages = { en:'English', fr:'Français', de:'Deutsch', nl:'Nederlands', da:'Dansk', sv:'Svenska' } as const;
export type Locale = keyof typeof languages;
export const localizedPaths = ['/', '/products/buudy-led-mask', '/pages/contact-us', '/pages/faqs', '/pages/about-us', '/policies/shipping-policy', '/policies/return-policy', '/cart'] as const;
export const indexedLocalizedPaths = localizedPaths.filter(path => path !== '/cart');
export function hasLocale(value: string): value is Locale { return Object.hasOwn(languages,value); }
export function localePath(locale: Locale, path = '/') {
  if (!path.startsWith('/') || path.startsWith('//')) throw new Error('Invalid local path.');
  return locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;
}
const countryLanguage: Record<string,Locale> = { FR:'fr', MC:'fr', BE:'fr', LU:'fr', CH:'de', DE:'de', AT:'de', LI:'de', NL:'nl', SR:'nl', DK:'da', SE:'sv', GF:'fr', GP:'fr', MQ:'fr', RE:'fr', YT:'fr', NC:'fr', PF:'fr', WF:'fr', MF:'fr', PM:'fr', CI:'fr', SN:'fr', GA:'fr', CG:'fr', CD:'fr', CM:'fr', BJ:'fr', BF:'fr', ML:'fr', NE:'fr', TD:'fr', TG:'fr', GN:'fr', DJ:'fr', KM:'fr', MG:'fr', HT:'fr', GL:'da', FO:'da' };
export function resolveLanguage(explicit?: string, acceptLanguage?: string, country?: string): Locale {
  if (explicit && hasLocale(explicit)) return explicit;
  const preferences = (acceptLanguage || '').split(',').map((part,index) => {
    const [tag,...params] = part.trim().split(';');
    const qValue = params.find(p=>p.trim().startsWith('q='))?.trim().slice(2);
    return {tag:tag.toLowerCase(), q:qValue === undefined ? 1 : Number(qValue), index};
  }).filter(p=>Number.isFinite(p.q) && p.q>0 && p.q<=1).sort((a,b)=>b.q-a.q || a.index-b.index);
  for (const {tag} of preferences) {
    const base=tag.split('-')[0];
    if(hasLocale(base)) return base;
  }
  return countryLanguage[country?.toUpperCase() || ''] || 'en';
}
export const currencies = [...new Set(Object.values(currencyByCountry))].sort();
export function resolveCurrency(explicit?: string | null, country?: string | null) {
  const code = explicit?.toUpperCase();
  return code && currencies.includes(code) ? code : currencyByCountry[country?.toUpperCase() || ''] || 'GBP';
}
export function languageAlternates(path: string) {
  return Object.fromEntries([...Object.keys(languages).map(locale=>[locale,`https://www.buudy.com${localePath(locale as Locale,path)}`]), ['x-default',`https://www.buudy.com${path === '/' ? '' : path}`]]);
}
