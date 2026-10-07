"use client";

import { createContext, useContext, type ReactNode, type ComponentProps } from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';

type StoreLanguage = { locale: string; messages: Record<string, string> };
const StoreLanguageContext = createContext<StoreLanguage>({ locale: 'en', messages: {} });
const translatedPaths = new Set(['/products/buudy-led-mask', '/cart', '/policies/shipping-policy', '/policies/return-policy', '/policies/refund-policy', '/policies/privacy-policy', '/policies/terms-of-service', '/policies/cookies-policy']);
export function StoreLocaleProvider({ children, locale, messages }: StoreLanguage & { children: ReactNode }) {
  return <StoreLanguageContext.Provider value={{ locale, messages }}>{children}</StoreLanguageContext.Provider>;
}
export function normalizeCopy(value: string) { return value.replace(/\s+/g, ' ').trim(); }
export function useStoreLocale() {
  const { locale, messages } = useContext(StoreLanguageContext);
  function text(value: string) {
    if (locale === 'en') return value;
    const key = normalizeCopy(value);
    const translated = messages[key];
    if (translated !== undefined) return `${/^\s/.test(value) ? ' ' : ''}${translated}${/\s$/.test(value) ? ' ' : ''}`;
    if (locale === 'fr') {
      const patterns: [RegExp, (match: RegExpMatchArray) => string][] = [
        [/^Open cart with (\d+) items$/, m => `Ouvrir le panier : ${m[1]} article(s)`],
        [/^Show only (\d)-star reviews$/, m => `Afficher les avis ${m[1]} étoiles`],
        [/^(\d+) out of 5 stars$/, m => `${m[1]} sur 5 étoiles`],
        [/^([\d,]+) reviews$/, m => `${m[1]} avis`],
        [/^Add to cart \+ (\d+) free gifts$/, m => `Ajouter + ${m[1]} cadeaux offerts`],
        [/^ \+ (\d+) free gifts$/, m => ` + ${m[1]} cadeaux offerts`],
        [/^Learn more about (.+)$/, m => `En savoir plus sur ${text(m[1])}`],
        [/^Remove (.+)$/, m => `Supprimer ${text(m[1])}`],
        [/^View (.+)$/, m => `Voir ${text(m[1])}`],
        [/^Magnify (.+)$/, m => `Agrandir ${text(m[1])}`],
        [/^Open full review from (.+)$/, m => `Ouvrir l’avis de ${m[1]}`],
      ];
      for (const [pattern, render] of patterns) { const match = value.match(pattern); if (match) return render(match); }
    }
    return value;
  }
  function path(value: string) {
    if (locale === 'en' || !value.startsWith('/') || value.startsWith('//')) return value;
    const url = new URL(value, 'https://www.buudy.com');
    return translatedPaths.has(url.pathname) ? `/${locale}${url.pathname}${url.search}${url.hash}` : value;
  }
  return { locale, text, path, dateLocale: locale === 'en' ? 'en-US' : locale };
}
// Returns text only: every existing element, CSS class and interaction is retained.
export function StoreText({ children }: { children: ReactNode }) {
  const { text } = useStoreLocale();
  return typeof children === 'string' ? text(children) : children;
}
export function StoreLink(props: ComponentProps<typeof NextLink>) {
  const { text, path } = useStoreLocale();
  return <NextLink {...props} href={typeof props.href === 'string' ? path(props.href) : props.href} aria-label={props['aria-label'] ? text(props['aria-label']) : undefined} title={props.title ? text(props.title) : undefined}/>;
}
export function StoreAnchor(props: ComponentProps<'a'>) {
  const { text, path } = useStoreLocale();
  return <a {...props} href={props.href ? path(props.href) : undefined} aria-label={props['aria-label'] ? text(props['aria-label']) : undefined} title={props.title ? text(props.title) : undefined}/>;
}
export function StoreImage(props: ComponentProps<typeof NextImage>) {
  const { text } = useStoreLocale();
  return <NextImage {...props} alt={text(props.alt)}/>;
}
export function StoreImg(props: ComponentProps<'img'>) {
  const { text } = useStoreLocale();
  // Preserve the original gallery's native image delivery and event handlers.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={props.alt ? text(props.alt) : ''}/>;
}
export function StoreButton(props: ComponentProps<'button'>) {
  const { text } = useStoreLocale();
  return <button {...props} aria-label={props['aria-label'] ? text(props['aria-label']) : undefined} title={props.title ? text(props.title) : undefined}/>;
}
export function StoreInput(props: ComponentProps<'input'>) {
  const { text } = useStoreLocale();
  return <input {...props} placeholder={props.placeholder ? text(props.placeholder) : undefined} aria-label={props['aria-label'] ? text(props['aria-label']) : undefined}/>;
}
export function StoreTextarea(props: ComponentProps<'textarea'>) {
  const { text } = useStoreLocale();
  return <textarea {...props} placeholder={props.placeholder ? text(props.placeholder) : undefined} aria-label={props['aria-label'] ? text(props['aria-label']) : undefined}/>;
}
