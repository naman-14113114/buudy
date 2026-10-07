import { currencyByCountry } from './provider-markets.ts';
import { plannedCountryLanguage } from './country-languages.ts';
import { additionalLegalPaths, hasCompleteLegalTranslation } from './legal-registry.ts';
import { localizedStorefrontEnabled, publishedLocalizedPaths } from './rollout.ts';

// Add a language here only when its complete public dictionary passes validation.
export const languages = {"en":"English","fr":"Français","de":"Deutsch","nl":"Nederlands","da":"Dansk","sv":"Svenska","es":"Español","it":"Italiano","pt":"Português","ca":"Català","pl":"Polski","nb":"Norsk bokmål","fi":"Suomi","cs":"Čeština","sk":"Slovenčina","hu":"Magyar","ro":"Română","bg":"Български","el":"Ελληνικά","hr":"Hrvatski","sl":"Slovenščina","et":"Eesti","lv":"Latviešu","lt":"Lietuvių","is":"Íslenska","sq":"Shqip","sr":"Српски","mk":"Македонски","bs":"Bosanski","mt":"Malti","ar":"العربية","he":"עברית","tr":"Türkçe","ru":"Русский","uk":"Українська","ka":"ქართული","hy":"Հայերեն","az":"Azərbaycan","kk":"Қазақша","uz":"O‘zbekcha","fa":"فارسی","sw":"Kiswahili","af":"Afrikaans","am":"አማርኛ","zh":"简体中文","zh-Hant":"繁體中文","ja":"日本語","ko":"한국어","id":"Bahasa Indonesia","ms":"Bahasa Melayu","th":"ไทย","vi":"Tiếng Việt","tl":"Filipino","hi":"हिन्दी","bn":"বাংলা","ta":"தமிழ்","te":"తెలుగు","ur":"اردو","ne":"नेपाली","si":"සිංහල","km":"ខ្មែរ","lo":"ລາວ","my":"မြန်မာ","mn":"Монгол","so":"Soomaali","tg":"Тоҷикӣ","ky":"Кыргызча"} as const;
export type Locale = keyof typeof languages;
export const localizedPaths = ['/', '/products/buudy-led-mask', '/pages/contact-us', '/pages/faqs', '/pages/about-us', '/policies/shipping-policy', '/policies/return-policy', '/cart'] as const;
export const indexedLocalizedPaths = localizedPaths.filter(path => path !== '/cart');
export function pathsForLocale(locale:string): readonly string[]{return hasCompleteLegalTranslation(locale)?[...localizedPaths,...additionalLegalPaths]:localizedPaths;}
export function indexedPathsForLocale(locale:string){return pathsForLocale(locale).filter(path=>path!=='/cart');}
export function hasLocale(value: string): value is Locale { return Object.hasOwn(languages,value); }
export function localePath(locale: Locale, path = '/') {
  if (!path.startsWith('/') || path.startsWith('//')) throw new Error('Invalid local path.');
  return locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`;
}
export function resolveLanguage(explicit?: string, acceptLanguage?: string, country?: string): Locale {
  if (explicit && hasLocale(explicit)) return explicit;
  const preferences = (acceptLanguage || '').split(',').map((part,index) => {
    const [tag,...params] = part.trim().split(';');
    const qValue = params.find(p=>p.trim().startsWith('q='))?.trim().slice(2);
    return {tag:tag.toLowerCase(), q:qValue === undefined ? 1 : Number(qValue), index};
  }).filter(p=>Number.isFinite(p.q) && p.q>0 && p.q<=1).sort((a,b)=>b.q-a.q || a.index-b.index);
  for (const {tag} of preferences) {
    const exact=Object.keys(languages).find(locale=>locale.toLowerCase()===tag);
    if(exact&&hasLocale(exact))return exact;
    const base=tag.split('-')[0];
    const alias=({no:'nb',fil:'tl',iw:'he',in:'id'} as Record<string,string>)[base]||base;
    // A script/region preference selects Traditional Chinese when it exists.
    const match=base==='zh'&&/-(?:hant|tw|hk|mo)(?:-|$)/.test(tag)?'zh-Hant':alias;
    if(hasLocale(match))return match;
    if(hasLocale(alias))return alias;
  }
  const planned=plannedCountryLanguage[country?.toUpperCase() || ''];
  return planned&&hasLocale(planned)?planned:'en';
}
export const currencies = [...new Set(Object.values(currencyByCountry))].sort();
export function resolveCurrency(explicit?: string | null, country?: string | null) {
  const code = explicit?.toUpperCase();
  return code && currencies.includes(code) ? code : currencyByCountry[country?.toUpperCase() || ''] || 'GBP';
}
export function languageAlternates(path: string) {
  if(!localizedStorefrontEnabled)return Object.fromEntries([['en',`https://www.buudy.com${path==='/'?'':path}`],...Object.entries(publishedLocalizedPaths).filter(([,paths])=>paths.includes(path)).map(([locale])=>[locale,`https://www.buudy.com${localePath(locale as Locale,path)}`]),['x-default',`https://www.buudy.com${path==='/'?'':path}`]]);
  return Object.fromEntries([...Object.keys(languages).filter(locale=>pathsForLocale(locale).includes(path)).map(locale=>[locale,`https://www.buudy.com${localePath(locale as Locale,path)}`]), ['x-default',`https://www.buudy.com${path === '/' ? '' : path}`]]);
}
